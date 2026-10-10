export const FAVORITES_STORAGE_KEY = 'dev-playground-favorites';

export const readFavorites = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? '[]') as string[];
  } catch {
    return [];
  }
};

export const persistFavorites = (items: string[]) => {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('favorites:updated'));
};
