import { CodeBlock } from './CodeBlock';
import { ArrowRight } from 'lucide-react';

interface CodeComparisonProps {
  react: { code: string };
  swiftui: { code: string };
}

export function CodeComparison({ react, swiftui }: CodeComparisonProps) {
  return (
    <div className="mb-6 max-w-5xl mx-auto">
      <div className="flex gap-4 items-stretch">
        <div className="flex-1 min-w-0">
          <CodeBlock code={react.code} language="tsx" title="React / JSX" />
        </div>

        <div className="flex items-center text-text-muted">
          <ArrowRight size={20} />
        </div>

        <div className="flex-1 min-w-0">
          <CodeBlock code={swiftui.code} language="swift" title="SwiftUI" />
        </div>
      </div>
    </div>
  );
}
