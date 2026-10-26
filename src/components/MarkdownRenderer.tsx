import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

import { useEffect, useState, useRef, type ComponentPropsWithoutRef } from 'react';

const InlineCode = ({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) => (
  <code className={className} {...props}>
    {children}
  </code>
);

const BlockCode = ({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) => {
  const codeString = String(children).replace(/\n$/, '');
  const [copied, setCopied] = useState(false);
  
  // Extract language from className, handling formats like:
  // "language-mermaid", "hljs language-mermaid", or just "mermaid"
  const classNameStr = className || '';
  let language = '';
  
  if (classNameStr.includes('language-')) {
    const match = classNameStr.match(/language-(\w+)/);
    language = match ? match[1] : '';
  } else if (classNameStr.includes('mermaid')) {
    language = 'mermaid';
  }
  
  const isMermaid = language === 'mermaid';
  const [mermaidError, setMermaidError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getTheme = (): 'dark' | 'default' =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'default';
  const [theme, setTheme] = useState<'dark' | 'default'>(getTheme);

  useEffect(() => {
    if (!isMermaid) return;

    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, [isMermaid]);

  useEffect(() => {
    if (!isMermaid) return;

    let cancelled = false;

    const renderMermaid = async () => {
      try {
        const { default: mermaid } = await import('mermaid');

        mermaid.initialize({ startOnLoad: false, theme });

        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const svg = await mermaid.render(id, codeString);

        if (!cancelled && containerRef.current) {
          setMermaidError(null);
          containerRef.current.innerHTML = svg.svg;
        }
      } catch (error) {
        if (!cancelled) {
          const errorMsg = error instanceof Error ? error.message : String(error);
          setMermaidError(`Mermaid diagram error: ${errorMsg}`);
        }
      }
    };

    renderMermaid();

    return () => {
      cancelled = true;
    };
  }, [codeString, isMermaid, theme]);

  if (isMermaid) {
    return (
      <div className="mermaid-container">
        {mermaidError ? (
          <div className="mermaid-error">
            <p>{mermaidError}</p>
            <details>
              <summary>Source code</summary>
              <pre><code>{codeString}</code></pre>
            </details>
          </div>
        ) : (
          <div ref={containerRef} className="mermaid-diagram" />
        )}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        className="copy-button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(codeString);
          } catch {
            const textarea = document.createElement('textarea');
            textarea.value = codeString;
            textarea.setAttribute('readonly', 'true');
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
          }
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        }}
      >
        {copied ? 'Copied!' : 'Copy code'}
      </button>
      <pre {...props}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};

const CodeBlock = ({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) => {
  const isBlockCode = typeof className === 'string' && /(^|\s)language-/.test(className);

  return isBlockCode ? (
    <BlockCode className={className} {...props}>
      {children}
    </BlockCode>
  ) : (
    <InlineCode className={className} {...props}>
      {children}
    </InlineCode>
  );
};

export const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        [
          rehypeHighlight,
          {
            // Exclude mermaid from syntax highlighting
            ignore: ['mermaid'],
          },
        ],
      ]}
      components={{ code: CodeBlock }}
    >
      {markdown}
    </ReactMarkdown>
  );
};
