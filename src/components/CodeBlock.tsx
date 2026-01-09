import { Highlight, type Language } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language: "tsx" | "swift";
  title?: string;
}

const darkUtilitarianTheme = {
  plain: {
    color: "#c8c8c8",
    backgroundColor: "#0c0c0c",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#606060", fontStyle: "italic" as const },
    },
    { types: ["punctuation"], style: { color: "#888888" } },
    { types: ["property", "tag", "constant", "symbol", "deleted"], style: { color: "#d4a574" } },
    { types: ["boolean", "number"], style: { color: "#e0a870" } },
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
      style: { color: "#a8c490" },
    },
    { types: ["operator", "entity", "url"], style: { color: "#8ab4d0" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "#7aa2c4" } },
    { types: ["function"], style: { color: "#8cc8e8" } },
    { types: ["class-name"], style: { color: "#c4a8d8" } },
    { types: ["regex", "important", "variable"], style: { color: "#e8c078" } },
  ],
};

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const prismLang: Language = language === "swift" ? "typescript" : "tsx";

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      {title && (
        <div className="px-4 py-2 bg-bg-tertiary border-b border-border text-xs font-medium uppercase tracking-wide text-text-secondary">
          {title}
        </div>
      )}
      <Highlight theme={darkUtilitarianTheme} code={code.trim()} language={prismLang}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} m-0 p-3 sm:p-4 overflow-auto font-mono text-xs sm:text-sm leading-relaxed`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="inline-block w-6 sm:w-8 text-right pr-2 sm:pr-4 text-text-muted select-none text-[10px] sm:text-xs">
                  {i + 1}
                </span>
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
