import { NavLink, Route, Routes } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { NotesPage } from './pages/NotesPage';
import { NoteDetailPage } from './pages/NoteDetailPage';
import { TopicNotesPage } from './pages/TopicNotesPage';
import { CheatSheetsPage } from './pages/CheatSheetsPage';
import { CheatSheetDetailPage } from './pages/CheatSheetDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { GlossaryDetailPage } from './pages/GlossaryDetailPage';
import { GlossaryPracticePage } from './pages/GlossaryPracticePage';
import type { Theme } from './lib/types';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/notes', label: 'Notes' },
  { to: '/cheatsheets', label: 'Cheat Sheets' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/favorites', label: 'Favorites' },
];

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('dev-playground-theme');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('dev-playground-theme', theme);
  }, [theme]);

  const themeLabel = useMemo(() => (theme === 'dark' ? 'Light mode' : 'Dark mode'), [theme]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">dev</div>
          <div>
            <div className="brand-name">dev-playground</div>
            <div className="brand-subtitle">Learning notes, cheat sheets & glossary</div>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          aria-label={themeLabel}
        >
          {theme === 'dark' ? '☀️' : '🌙'} {themeLabel}
        </button>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/:topic" element={<TopicNotesPage />} />
          <Route path="/notes/:topic/:slug" element={<NoteDetailPage />} />
          <Route path="/cheatsheets" element={<CheatSheetsPage />} />
          <Route path="/cheatsheets/:slug" element={<CheatSheetDetailPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/glossary/practice" element={<GlossaryPracticePage />} />
          <Route path="/glossary/:slug" element={<GlossaryDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
