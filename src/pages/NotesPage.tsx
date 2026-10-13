import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { buildSearchIndex, getNotePath, getTagOptions, getTopicSummaries, loadCheatSheets, loadNotes } from '../lib/content';

const notes = loadNotes();
const { index } = buildSearchIndex(notes, loadCheatSheets());

export const NotesPage = () => {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('all');

  const topics = useMemo(() => getTopicSummaries(notes), []);
  const tags = useMemo(() => getTagOptions(notes), []);

  const isFiltering = query.trim() !== '' || tag !== 'all';

  const filteredNotes = useMemo(() => {
    const baseNotes = notes.filter((note) => (tag === 'all' ? true : note.tags.includes(tag)));

    if (!query.trim()) {
      return baseNotes;
    }

    const results = index.search(query, { fields: ['title', 'topic', 'tags', 'content'], prefix: true, fuzzy: 0.2 });
    const found = new Set(results.filter((result) => result.type === 'note').map((result) => result.slug));
    return baseNotes.filter((note) => found.has(note.slug));
  }, [query, tag]);

  const handleReset = () => {
    setQuery('');
    setTag('all');
  };

  return (
    <div className="page-card">
      <h1 className="page-title">Notes</h1>
      <p className="page-subtitle">Browse by topic or quickly search across all notes.</p>

      <div className="search-panel">
        <div className="search-controls">
          <input
            aria-label="Search notes"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, tag, or topic..."
          />

          <select aria-label="Filter by tag" value={tag} onChange={(event) => setTag(event.target.value)}>
            <option value="all">All tags</option>
            {tags.map((option) => (
              <option key={option} value={option}>
                #{option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isFiltering && (
        <div className="search-results-section">
          <div className="search-summary">
            {filteredNotes.length} result{filteredNotes.length === 1 ? '' : 's'} found
            {' '}
            <button onClick={handleReset} className="reset-filter-btn">Clear filter</button>
          </div>

          <div className="note-grid">
            {filteredNotes.length === 0 ? (
              <div className="empty-state">No notes matched your search.</div>
            ) : (
              filteredNotes.map((note) => (
                <article className="resource-card" key={note.slug}>
                  <div className="meta-line">{note.date}</div>
                  <h3>
                    <Link to={getNotePath(note)}>{note.title}</Link>
                  </h3>
                  <div className="meta-line">{note.topic}</div>
                  <div className="tag-row">
                    {note.tags.map((tag: string) => (
                      <span key={`${note.slug}-${tag}`} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      )}

      {!isFiltering && (
        <div className="topic-overview-grid">
          {topics.map((topic) => (
            <Link key={topic.slug} to={`/notes/${topic.slug}`} className="topic-card-link" aria-label={`Open ${topic.name} notes`}>
              <article className="topic-card">
                <div className="topic-card-header">
                  <h2>{topic.icon ? `${topic.icon} ${topic.name}` : topic.name}</h2>
                  <span className="topic-count">{topic.count}</span>
                </div>
                <p>{topic.description ?? `Browse ${topic.count} note${topic.count === 1 ? '' : 's'} in ${topic.name}.`}</p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
