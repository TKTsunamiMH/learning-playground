import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGlossaryPath, getNotePath, loadGlossary, loadNotes } from '../lib/content';
import { readFavorites } from '../lib/favorites';

const notes = loadNotes();
const glossaryTerms = loadGlossary();

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setFavorites(readFavorites());
    refresh();
    window.addEventListener('favorites:updated', refresh);

    return () => window.removeEventListener('favorites:updated', refresh);
  }, []);

  const favoriteNotes = notes.filter((note) => favorites.includes(note.slug));
  const favoriteGlossary = glossaryTerms.filter((term) => favorites.includes(`glossary:${term.slug}`));

  return (
    <div className="page-card">
      <h1 className="page-title">Favorites</h1>
      <p className="page-subtitle">Quick access to notes and glossary terms you want to review again later.</p>

      {favoriteNotes.length === 0 && favoriteGlossary.length === 0 ? (
        <div className="empty-state">No favorites yet. Add them from note or glossary detail pages.</div>
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

          {favoriteGlossary.map((term) => (
            <article className="article-card" key={term.slug}>
              <div className="meta-line">
                {term.date} · Glossary
              </div>
              <h3>
                <Link to={getGlossaryPath(term)}>{term.term}</Link>
              </h3>
              <div className="meta-line">{term.fullName}</div>
              <div className="tag-row">
                <span className="tag">{term.category}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
