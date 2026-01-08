import { Highlight, themes, type Language } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language: 'tsx' | 'swift';
  title?: string;
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  // prism-react-renderer doesn't have swift, use closest alternative
  const prismLang: Language = language === 'swift' ? 'typescript' : 'tsx';

  return (
    <div className="code-block">
      {title && <div className="code-block-header">{title}</div>}
      <Highlight
        theme={themes.nightOwl}
        code={code.trim()}
        language={prismLang}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, margin: 0, padding: '1rem', overflow: 'auto' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="line-number">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
