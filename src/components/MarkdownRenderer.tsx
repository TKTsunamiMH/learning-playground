import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

import { useState } from 'react';

export const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  const [copied, setCopied] = useState<Record<number, boolean>>({});

  const CodeBlock = ({ children, className, ...props }: any) => {
    const codeString = String(children).replace(/\n$/, '');
    const codeIndex = Math.random();

    return (
      <div>
        <button
          type="button"
          className="copy-button"
          onClick={async () => {
            await navigator.clipboard.writeText(codeString);
            setCopied((current) => ({ ...current, [codeIndex]: true }));
            window.setTimeout(() => {
              setCopied((current) => ({ ...current, [codeIndex]: false }));
            }, 1200);
          }}
        >
          {copied[codeIndex] ? 'Copied!' : 'Copy code'}
        </button>
        <pre className={className} {...props}>
          <code>{children}</code>
        </pre>
      </div>
    );
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={{ code: CodeBlock }}>
      {markdown}
    </ReactMarkdown>
  );
};
