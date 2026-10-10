import { Link, useParams } from 'react-router-dom';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { loadCheatSheets } from '../lib/content';

const sheets = loadCheatSheets();

export const CheatSheetDetailPage = () => {
  const { slug } = useParams();
  const sheet = sheets.find((item) => item.slug === slug);

  if (!sheet) {
    return (
      <div className="page-card">
        <h1>Cheat sheet not found</h1>
        <Link className="secondary-btn" to="/cheatsheets">
          Back to cheat sheets
        </Link>
      </div>
    );
  }

  return (
    <article className="content-article">
      <div className="meta-line">
        {sheet.date} · {sheet.topic}
      </div>
      <h1>{sheet.title}</h1>
      <div className="tag-row">
        {sheet.tags.map((tag: string) => (
          <span key={`${sheet.slug}-${tag}`} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      <div className="inline-actions">
        <Link className="secondary-btn" to="/cheatsheets">
          ← Back to cheat sheets
        </Link>
      </div>
      <MarkdownRenderer markdown={sheet.content} />
    </article>
  );
};
