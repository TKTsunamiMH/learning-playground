import { Link, useParams } from 'react-router-dom';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { loadNotes } from '../lib/content';

const notes = loadNotes();

export const NoteDetailPage = () => {
  const { slug } = useParams();
  const note = notes.find((item) => item.slug === slug);

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
      <div className="meta-line">
        {note.date} · {note.topic}
      </div>
      <h1>{note.title}</h1>
      <div className="tag-row">
        {note.tags.map((tag) => (
          <span key={`${note.slug}-${tag}`} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      <div className="inline-actions">
        <Link className="secondary-btn" to="/notes">
          ← Back to notes
        </Link>
      </div>
      <MarkdownRenderer markdown={note.content} />
    </article>
  );
};
