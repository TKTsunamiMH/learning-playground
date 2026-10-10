import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

import { useState, type ComponentPropsWithoutRef } from 'react';

const InlineCode = ({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) => (
  <code className={className} {...props}>
    {children}
  </code>
);

const BlockCode = ({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) => {
  const codeString = String(children).replace(/\n$/, '');
  const [copied, setCopied] = useState(false);

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
  const isBlockCode = typeof className === 'string' && className.startsWith('language-');

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
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={{ code: CodeBlock }}>
      {markdown}
    </ReactMarkdown>
  );
};
