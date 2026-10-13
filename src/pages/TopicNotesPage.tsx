import { Link, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { buildSearchIndex, getNotePath, getTagOptions, getTopicNameFromSlug, loadCheatSheets, loadNotes } from '../lib/content';

const notes = loadNotes();
const { index } = buildSearchIndex(notes, loadCheatSheets());

export const TopicNotesPage = () => {
  const { topic } = useParams();
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('all');

  const topicName = useMemo(() => (topic ? getTopicNameFromSlug(notes, topic) : undefined), [topic]);

  const topicNotes = useMemo(() => notes.filter((note) => note.topic === topicName), [topicName]);
  const topicTags = useMemo(() => getTagOptions(topicNotes), [topicNotes]);

  const filteredNotes = useMemo(() => {
    const baseNotes = topicNotes.filter((note) => (tag === 'all' ? true : note.tags.includes(tag)));

    if (!query.trim()) {
      return baseNotes;
    }

    const results = index.search(query, { fields: ['title', 'topic', 'tags', 'content'], prefix: true, fuzzy: 0.2 });
    const found = new Set(results.filter((result) => result.type === 'note').map((result) => result.slug));
    return baseNotes.filter((note) => found.has(note.slug));
  }, [query, tag, topicNotes]);

  if (!topicName) {
    return (
      <div className="page-card">
        <h1>Topic not found</h1>
        <Link className="secondary-btn" to="/notes">
          Back to topics
        </Link>
      </div>
    );
  }

  return (
    <div className="page-card">
      <div className="breadcrumbs">
        <Link to="/notes">Notes</Link>
        <span>›</span>
        <span>{topicName}</span>
      </div>

      <div className="inline-actions">
        <Link className="secondary-btn" to="/notes">
          ← Back to topics
        </Link>
      </div>

      <div style={{ marginTop: '1.5rem' }}></div>

      <h1 className="page-title">{topicName}</h1>
      <p className="page-subtitle">{topicNotes.length} note{topicNotes.length === 1 ? '' : 's'} in this topic.</p>

      <div className="search-panel">
        <div className="search-controls">
          <input
            aria-label={`Search ${topicName} notes`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${topicName} notes...`}
          />

          <select aria-label="Filter by tag" value={tag} onChange={(event) => setTag(event.target.value)}>
            <option value="all">All tags</option>
            {topicTags.map((option) => (
              <option key={option} value={option}>
                #{option}
              </option>
            ))}
          </select>
        </div>
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
              <div className="tag-row">
                {note.tags.map((noteTag) => (
                  <span key={`${note.slug}-${noteTag}`} className="tag">
                    #{noteTag}
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
