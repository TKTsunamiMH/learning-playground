import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { buildSearchIndex, getGlossaryPath, loadGlossary } from '../lib/content';

const glossaryTerms = loadGlossary();
const { index } = buildSearchIndex([], [], glossaryTerms);

export const GlossaryPage = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(
    () => Array.from(new Set(glossaryTerms.map((item) => item.category))).sort((a, b) => a.localeCompare(b)),
    [],
  );

  const filteredTerms = useMemo(() => {
    const baseTerms = glossaryTerms.filter((item) => (category === 'all' ? true : item.category === category));

    if (!query.trim()) {
      return baseTerms;
    }

    const results = index.search(query, {
      fields: ['title', 'fullName', 'topic', 'tags', 'content'],
      prefix: true,
      fuzzy: 0.2,
    });
    const found = new Set(results.filter((result) => result.type === 'glossary').map((result) => result.slug));
    return baseTerms.filter((item) => found.has(item.slug));
  }, [category, query]);

  const letters = useMemo(
    () =>
      Array.from(new Set(filteredTerms.map((item) => item.term.charAt(0).toUpperCase())))
        .filter((item) => /[A-Z]/.test(item))
        .sort(),
    [filteredTerms],
  );

  return (
    <div className="page-card">
      <h1 className="page-title">Glossary</h1>
      <p className="page-subtitle">Fast definitions for technical terms used in .NET full stack development.</p>

      <div className="inline-actions">
        <Link className="secondary-btn" to="/glossary/practice">
          Practice mode
        </Link>
      </div>

      <div className="search-panel">
        <div className="search-controls">
          <input
            aria-label="Search glossary terms"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by term, full name, category, or explanation..."
          />
          <select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {letters.length > 1 && (
        <nav className="alphabet-nav" aria-label="Quick jump by letter">
          {letters.map((letter) => (
            <a key={letter} href={`#letter-${letter}`}>
              {letter}
            </a>
          ))}
        </nav>
      )}

      <div className="search-summary">{filteredTerms.length} term{filteredTerms.length === 1 ? '' : 's'} found</div>

      <div className="glossary-grid">
        {filteredTerms.length === 0 ? (
          <div className="empty-state">No glossary terms matched your search.</div>
        ) : (
          filteredTerms.map((item, index) => {
            const firstLetter = item.term.charAt(0).toUpperCase();
            const prevLetter = filteredTerms[index - 1]?.term.charAt(0).toUpperCase();
            const showAnchor = /[A-Z]/.test(firstLetter) && firstLetter !== prevLetter;

            return (
              <Link
                key={item.slug}
                to={getGlossaryPath(item)}
                className="glossary-card-link"
                aria-label={`Open glossary term ${item.term}`}
              >
                <article className="resource-card glossary-card">
                  {showAnchor && <span id={`letter-${firstLetter}`} className="letter-anchor" aria-hidden="true" />}
                  <h2>{item.term}</h2>
                  <div className="meta-line">{item.fullName}</div>
                  <p>{item.inShort || 'Open this term to read the short explanation.'}</p>
                  <div className="tag-row">
                    <span className="tag">{item.category}</span>
                  </div>
                </article>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};
