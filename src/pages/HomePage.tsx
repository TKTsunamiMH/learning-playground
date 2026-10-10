import { Link } from 'react-router-dom';
import { loadNotes, loadCheatSheets } from '../lib/content';

const notes = loadNotes();
const sheets = loadCheatSheets();

export const HomePage = () => {
  return (
    <div className="page-card hero">
      <div>
        <p className="meta-line">Personal learning hub</p>
        <h1>Build the habit of learning in public.</h1>
        <p>
          dev-playground is my interactive knowledge base for modern web and software development, covering frontend,
          backend, .NET, and practical coding workflows.
        </p>

        <div className="hero-links">
          <Link className="primary-btn" to="/notes">
            Browse notes
          </Link>
          <Link className="secondary-btn" to="/cheatsheets">
            View cheat sheets
          </Link>
        </div>
      </div>

      <div className="list-panel">
        <h3>At a glance</h3>
        <div className="card-list">
          <div className="feature-card">
            <strong>{notes.length}</strong>
            <div>notes</div>
          </div>
          <div className="feature-card">
            <strong>{sheets.length}</strong>
            <div>cheat sheets</div>
          </div>
          <div className="feature-card">
            <strong>Local</strong>
            <div>favorites stored in browser</div>
          </div>
        </div>
      </div>
    </div>
  );
};
