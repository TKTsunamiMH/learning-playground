import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { loadGlossary } from '../lib/content';

type PracticeStatus = 'known' | 'missed';

const PRACTICE_STORAGE_KEY = 'dev-playground-glossary-practice';
const glossaryTerms = loadGlossary();

const readPracticeProgress = (): Record<string, PracticeStatus> => {
  try {
    const parsed = JSON.parse(localStorage.getItem(PRACTICE_STORAGE_KEY) ?? '{}') as Record<string, PracticeStatus>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const shuffleItems = <T,>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const GlossaryPracticePage = () => {
  const [category, setCategory] = useState('all');
  const [direction, setDirection] = useState<'term-first' | 'meaning-first'>('term-first');
  const [reviewMissedOnly, setReviewMissedOnly] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState<Record<string, PracticeStatus>>(() => readPracticeProgress());
  const [order, setOrder] = useState(() => glossaryTerms.map((item) => item.slug));

  useEffect(() => {
    localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const categories = useMemo(
    () => Array.from(new Set(glossaryTerms.map((item) => item.category))).sort((a, b) => a.localeCompare(b)),
    [],
  );

  const filteredTerms = useMemo(() => {
    let items = glossaryTerms.filter((item) => (category === 'all' ? true : item.category === category));
    if (reviewMissedOnly) {
      items = items.filter((item) => progress[item.slug] === 'missed');
    }
    const orderMap = new Map(order.map((slug, index) => [slug, index]));
    return [...items].sort((a, b) => (orderMap.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (orderMap.get(b.slug) ?? Number.MAX_SAFE_INTEGER));
  }, [category, order, progress, reviewMissedOnly]);

  useEffect(() => {
    setCurrentIndex(0);
    setRevealed(false);
  }, [category, direction, reviewMissedOnly]);

  useEffect(() => {
    if (currentIndex >= filteredTerms.length) {
      setCurrentIndex(Math.max(filteredTerms.length - 1, 0));
    }
  }, [currentIndex, filteredTerms.length]);

  const currentTerm = filteredTerms[currentIndex];
  const knownCount = filteredTerms.filter((item) => progress[item.slug] === 'known').length;

  const markAndNext = (status: PracticeStatus) => {
    if (!currentTerm) return;
    setProgress((current) => ({ ...current, [currentTerm.slug]: status }));
    setCurrentIndex((current) => (current + 1 < filteredTerms.length ? current + 1 : current));
    setRevealed(false);
  };

  const handleShuffle = () => {
    setOrder((currentOrder) => shuffleItems(currentOrder));
    setCurrentIndex(0);
    setRevealed(false);
  };

  return (
    <div className="page-card">
      <div className="breadcrumbs">
        <Link to="/glossary">Glossary</Link>
        <span>›</span>
        <span>Practice</span>
      </div>

      <h1 className="page-title">Glossary practice</h1>
      <p className="page-subtitle">Review terms with flashcards and track the ones you still want to revisit.</p>

      <div className="search-panel">
        <div className="search-controls">
          <select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            aria-label="Practice direction"
            value={direction}
            onChange={(event) => setDirection(event.target.value as 'term-first' | 'meaning-first')}
          >
            <option value="term-first">Term → explanation</option>
            <option value="meaning-first">Explanation → term</option>
          </select>
        </div>

        <div className="inline-actions">
          <button type="button" className="secondary-btn" onClick={handleShuffle}>
            Shuffle
          </button>
          <label className="practice-checkbox">
            <input
              type="checkbox"
              checked={reviewMissedOnly}
              onChange={(event) => setReviewMissedOnly(event.target.checked)}
            />
            Review only the ones I missed
          </label>
        </div>
      </div>

      <div className="search-summary">
        {filteredTerms.length === 0 ? 'No terms available for current filters.' : `${currentIndex + 1} / ${filteredTerms.length}`} · Known: {knownCount}
      </div>

      {currentTerm && (
        <button
          type="button"
          className="flashcard"
          onClick={() => setRevealed((current) => !current)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setRevealed((current) => !current);
            }
          }}
          aria-label={revealed ? 'Hide flashcard answer' : 'Reveal flashcard answer'}
        >
          <div className="meta-line">{currentTerm.category}</div>
          {!revealed ? (
            direction === 'term-first' ? (
              <h2>{currentTerm.term}</h2>
            ) : (
              <p className="flashcard-text">{currentTerm.inShort}</p>
            )
          ) : (
            <div>
              {direction === 'term-first' ? (
                <>
                  <h2>{currentTerm.fullName}</h2>
                  <p className="flashcard-text">{currentTerm.inShort}</p>
                </>
              ) : (
                <>
                  <h2>{currentTerm.term}</h2>
                  <p className="flashcard-text">{currentTerm.fullName}</p>
                </>
              )}
            </div>
          )}
          <div className="meta-line">Press Enter or Space to reveal/hide.</div>
        </button>
      )}

      <div className="inline-actions">
        <button type="button" className="primary-btn" onClick={() => markAndNext('known')} disabled={!currentTerm}>
          I knew it
        </button>
        <button type="button" className="secondary-btn" onClick={() => markAndNext('missed')} disabled={!currentTerm}>
          Review again
        </button>
      </div>
    </div>
  );
};
