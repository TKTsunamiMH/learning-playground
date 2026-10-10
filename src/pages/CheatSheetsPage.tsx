import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { buildSearchIndex, getTopicOptions, loadCheatSheets, loadNotes } from '../lib/content';

const sheets = loadCheatSheets();
const { index } = buildSearchIndex(loadNotes(), sheets);

export const CheatSheetsPage = () => {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('all');

  const filteredSheets = useMemo(() => {
    const baseSheets = sheets.filter((sheet) => (topic === 'all' ? true : sheet.topic === topic));

    if (!query.trim()) {
      return baseSheets;
    }

    const results = index.search(query, { fields: ['title', 'topic', 'tags', 'content'], prefix: true, fuzzy: 0.2 });
    const found = new Set(results.filter((result) => result.type === 'cheatsheet').map((result) => result.slug));
    return baseSheets.filter((sheet) => found.has(sheet.slug));
  }, [query, topic]);

  const topics = useMemo(() => getTopicOptions(sheets), []);

  return (
    <div className="page-card">
      <h1 className="page-title">Cheat sheets</h1>
      <p className="page-subtitle">Compact references for the syntax and workflows I want to keep in memory.</p>

      <div className="search-panel">
        <div className="search-controls">
          <input
            aria-label="Search cheat sheets"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by command, topic, or tag..."
          />

          <select aria-label="Filter by topic" value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="all">All topics</option>
            {topics.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="cheat-grid">
        {filteredSheets.length === 0 ? (
          <div className="empty-state">No cheat sheets matched your search.</div>
        ) : (
          filteredSheets.map((sheet) => (
            <article className="resource-card" key={sheet.slug}>
              <div className="meta-line">{sheet.topic}</div>
              <h3>
                <Link to={`/cheatsheets/${sheet.slug}`}>{sheet.title}</Link>
              </h3>
              <div className="tag-row">
                {sheet.tags.map((tag: string) => (
                  <span key={`${sheet.slug}-${tag}`} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};
