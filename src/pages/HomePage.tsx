import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { buildSearchIndex, getNotePath, loadCheatSheets, loadGlossary, loadNotes } from '../lib/content';

const notes = loadNotes();
const sheets = loadCheatSheets();
const glossaryTerms = loadGlossary();
const { index } = buildSearchIndex(notes, sheets, glossaryTerms);

export const HomePage = () => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    return index.search(query, { fields: ['title', 'fullName', 'topic', 'tags', 'content'], prefix: true, fuzzy: 0.2 }).slice(0, 10);
  }, [query]);

  const getResultPath = (type: string, slug: string, topic: string) => {
    if (type === 'note') {
      return getNotePath({ slug, topic });
    }

    if (type === 'cheatsheet') {
      return `/cheatsheets/${slug}`;
    }

    return `/glossary/${slug}`;
  };

  const getResultLabel = (type: string) => {
    if (type === 'note') return 'Note';
    if (type === 'cheatsheet') return 'Cheat Sheet';
    return 'Glossary';
  };

  return (
    <div className="page-card hero">
      <div>
        <p className="meta-line">Personal learning hub</p>
        <h1>Build the habit of learning in public.</h1>
        <p>
          dev-playground is my interactive knowledge base for modern web and software development, covering frontend,
          backend, .NET, and practical coding workflows.
        </p>

        <div className="hero-links">
          <Link className="primary-btn" to="/notes">
            Browse notes
          </Link>
          <Link className="secondary-btn" to="/cheatsheets">
            View cheat sheets
          </Link>
          <Link className="secondary-btn" to="/glossary">
            Explore glossary
          </Link>
        </div>

        <div className="search-panel" style={{ marginTop: '18px' }}>
          <label htmlFor="global-search" className="meta-line">Global search</label>
          <div className="search-controls" style={{ marginTop: '8px' }}>
            <input
              id="global-search"
              aria-label="Search all content"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search notes, cheat sheets, and glossary..."
            />
          </div>
          {query.trim() && (
            <div className="article-list">
              {searchResults.length === 0 ? (
                <div className="empty-state">No results found.</div>
              ) : (
                searchResults.map((result) => (
                  <article className="article-card" key={result.id}>
                    <div className="meta-line">{getResultLabel(result.type)}</div>
                    <h3>
                      <Link to={getResultPath(result.type, result.slug, result.topic)}>{result.title}</Link>
                    </h3>
                    {result.fullName && <div className="meta-line">{result.fullName}</div>}
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="list-panel">
        <h3>At a glance</h3>
        <div className="card-list">
          <div className="feature-card">
            <strong>{notes.length}</strong>
            <div>notes</div>
          </div>
          <div className="feature-card">
            <strong>{sheets.length}</strong>
            <div>cheat sheets</div>
          </div>
          <div className="feature-card">
            <strong>{glossaryTerms.length}</strong>
            <div>glossary terms</div>
          </div>
          <div className="feature-card">
            <strong>Local</strong>
            <div>favorites stored in browser</div>
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <h3 style={{ marginBottom: '10px' }}>Glossary</h3>
          <p className="meta-line" style={{ marginTop: 0 }}>
            Abbreviations and terms explained for a .NET full stack workflow, plus flashcard practice mode.
          </p>
          <Link className="secondary-btn" to="/glossary">
            Open glossary
          </Link>
        </div>
      </div>
    </div>
  );
};
