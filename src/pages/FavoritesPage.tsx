import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotePath, loadNotes } from '../lib/content';
import { readFavorites } from '../lib/favorites';

const notes = loadNotes();

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setFavorites(readFavorites());
    refresh();
    window.addEventListener('favorites:updated', refresh);

    return () => window.removeEventListener('favorites:updated', refresh);
  }, []);

  const favoriteNotes = notes.filter((note) => favorites.includes(note.slug));

  return (
    <div className="page-card">
      <h1 className="page-title">Favorites</h1>
      <p className="page-subtitle">Quick access to the notes you want to review again later.</p>

      {favoriteNotes.length === 0 ? (
        <div className="empty-state">No favorite notes yet. Add some from a note detail page.</div>
      ) : (
        <div className="article-list">
          {favoriteNotes.map((note) => (
            <article className="article-card" key={note.slug}>
              <div className="meta-line">
                {note.date} · {note.topic}
              </div>
              <h3>
                <Link to={getNotePath(note)}>{note.title}</Link>
              </h3>
              <div className="tag-row">
                {note.tags.map((tag: string) => (
                  <span key={`${note.slug}-${tag}`} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
