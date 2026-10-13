import { Link, useParams } from 'react-router-dom';
import { FavoriteToggle } from '../components/FavoriteToggle';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { getTopicNameFromSlug, loadNotes } from '../lib/content';

const notes = loadNotes();

export const NoteDetailPage = () => {
  const { topic, slug } = useParams();
  const topicName = topic ? getTopicNameFromSlug(notes, topic) : undefined;
  const note = notes.find((item) => item.slug === slug && item.topic === topicName);

  if (!note) {
    return (
      <div className="page-card">
        <h1>Note not found</h1>
        <Link className="secondary-btn" to="/notes">
          Back to notes
        </Link>
      </div>
    );
  }

  return (
    <article className="content-article">
      <div className="breadcrumbs">
        <Link to="/notes">Notes</Link>
        <span>›</span>
        {topicName ? <Link to={`/notes/${topic}`}>{topicName}</Link> : <span>General</span>}
        <span>›</span>
        <span>{note.title}</span>
      </div>
      <div className="meta-line">
        {note.date} · {note.topic}
      </div>
      <h1>{note.title}</h1>
      <div className="tag-row">
        {note.tags.map((tag: string) => (
          <span key={`${note.slug}-${tag}`} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      <div className="inline-actions">
        <Link className="secondary-btn" to={topic ? `/notes/${topic}` : '/notes'}>
          ← Back to topic
        </Link>
        <FavoriteToggle slug={note.slug} label={note.title} />
      </div>
      <MarkdownRenderer markdown={note.content} />
    </article>
  );
};
