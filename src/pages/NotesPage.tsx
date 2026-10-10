import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { buildSearchIndex, getTopicOptions, loadCheatSheets, loadNotes } from '../lib/content';

const notes = loadNotes();
const { index } = buildSearchIndex(notes, loadCheatSheets());

export const NotesPage = () => {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('all');

  const filteredNotes = useMemo(() => {
    const baseNotes = notes.filter((note) => (topic === 'all' ? true : note.topic === topic));

    if (!query.trim()) {
      return baseNotes;
    }

    const results = index.search(query, { fields: ['title', 'topic', 'tags', 'content'], prefix: true, fuzzy: 0.2 });
    const found = new Set(results.filter((result) => result.type === 'note').map((result) => result.slug));
    return baseNotes.filter((note) => found.has(note.slug));
  }, [query, topic]);

  const topics = useMemo(() => getTopicOptions(notes), []);

  return (
    <div className="page-card">
      <h1 className="page-title">Notes</h1>
      <p className="page-subtitle">A collection of learning notes, organized by topic and easy to search.</p>

      <div className="search-panel">
        <div className="search-controls">
          <input
            aria-label="Search notes"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, tag, or topic..."
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

      <div className="article-list">
        {filteredNotes.length === 0 ? (
          <div className="empty-state">No notes matched your search.</div>
        ) : (
          filteredNotes.map((note) => (
            <article className="article-card" key={note.slug}>
              <div className="meta-line">
                {note.date} · {note.topic}
              </div>
              <h3>
                <Link to={`/notes/${note.slug}`}>{note.title}</Link>
              </h3>
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
  );
};
