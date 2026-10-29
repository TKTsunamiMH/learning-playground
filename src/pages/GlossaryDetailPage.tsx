import { Link, useParams } from 'react-router-dom';
import { FavoriteToggle } from '../components/FavoriteToggle';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { loadGlossary } from '../lib/content';

const glossaryTerms = loadGlossary();

export const GlossaryDetailPage = () => {
  const { slug } = useParams();
  const term = glossaryTerms.find((item) => item.slug === slug);

  if (!term) {
    return (
      <div className="page-card">
        <h1>Glossary term not found</h1>
        <Link className="secondary-btn" to="/glossary">
          Back to glossary
        </Link>
      </div>
    );
  }

  return (
    <article className="content-article">
      <div className="breadcrumbs">
        <Link to="/glossary">Glossary</Link>
        <span>›</span>
        <span>{term.term}</span>
      </div>
      <div className="meta-line">
        {term.date} · {term.category}
      </div>
      <h1>{term.term}</h1>
      <p className="page-subtitle" style={{ marginTop: 0 }}>{term.fullName}</p>
      <div className="tag-row">
        {term.tags.map((tag) => (
          <span key={`${term.slug}-${tag}`} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      <div className="inline-actions">
        <Link className="secondary-btn" to="/glossary">
          ← Back to glossary
        </Link>
        <FavoriteToggle slug={`glossary:${term.slug}`} label={term.term} />
      </div>
      <MarkdownRenderer markdown={term.content} />
    </article>
  );
};
