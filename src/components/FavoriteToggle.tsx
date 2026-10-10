import { useEffect, useState } from 'react';
import { persistFavorites, readFavorites } from '../lib/favorites';

export const FavoriteToggle = ({ slug, label }: { slug: string; label?: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(readFavorites().includes(slug));

    const onUpdate = () => setIsFavorite(readFavorites().includes(slug));
    window.addEventListener('favorites:updated', onUpdate);

    return () => window.removeEventListener('favorites:updated', onUpdate);
  }, [slug]);

  const toggleFavorite = () => {
    const favorites = readFavorites();
    const nextFavorites = favorites.includes(slug) ? favorites.filter((item) => item !== slug) : [...favorites, slug];
    setIsFavorite(nextFavorites.includes(slug));
    persistFavorites(nextFavorites);
  };

  return (
    <button
      type="button"
      className={isFavorite ? 'favorite-toggle is-favorite' : 'favorite-toggle'}
      onClick={toggleFavorite}
      aria-label={isFavorite ? `Remove ${label ?? slug} from favorites` : `Add ${label ?? slug} to favorites`}
    >
      {isFavorite ? '★ Favorited' : '☆ Favorite'}
    </button>
  );
};
