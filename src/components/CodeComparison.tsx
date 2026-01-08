import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { ArrowRight, ArrowLeftRight } from 'lucide-react';

interface CodeComparisonProps {
  react: { code: string };
  swiftui: { code: string };
}

export function CodeComparison({ react, swiftui }: CodeComparisonProps) {
  const [view, setView] = useState<'split' | 'react' | 'swift'>('split');

  return (
    <div className="code-comparison">
      <div className="code-comparison-tabs">
        <button
          className={`tab ${view === 'split' ? 'active' : ''}`}
          onClick={() => setView('split')}
        >
          <ArrowLeftRight size={16} />
          Side by Side
        </button>
        <button
          className={`tab ${view === 'react' ? 'active' : ''}`}
          onClick={() => setView('react')}
        >
          React
        </button>
        <button
          className={`tab ${view === 'swift' ? 'active' : ''}`}
          onClick={() => setView('swift')}
        >
          SwiftUI
        </button>
      </div>

      <div className={`code-panels ${view}`}>
        {(view === 'split' || view === 'react') && (
          <div className="code-panel react">
            <CodeBlock code={react.code} language="tsx" title="React / JSX" />
          </div>
        )}

        {view === 'split' && (
          <div className="arrow-container">
            <ArrowRight size={24} />
          </div>
        )}

        {(view === 'split' || view === 'swift') && (
          <div className="code-panel swift">
            <CodeBlock code={swiftui.code} language="swift" title="SwiftUI" />
          </div>
        )}
      </div>
    </div>
  );
}
