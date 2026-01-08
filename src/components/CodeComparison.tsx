import { CodeBlock } from "./CodeBlock";
import { ArrowRight, ArrowDown } from "lucide-react";

interface CodeComparisonProps {
  react: { code: string };
  swiftui: { code: string };
  leftTitle?: string;
  rightTitle?: string;
}

export function CodeComparison({
  react,
  swiftui,
  leftTitle = "React / JSX",
  rightTitle = "SwiftUI",
}: CodeComparisonProps) {
  return (
    <div className="mb-6 max-w-[1440px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
        <div className="flex-1 min-w-0">
          <CodeBlock code={react.code} language="tsx" title={leftTitle} />
        </div>

        <div className="flex items-center justify-center text-text-muted py-2 lg:py-0">
          <ArrowDown size={20} className="lg:hidden" />
          <ArrowRight size={20} className="hidden lg:block" />
        </div>

        <div className="flex-1 min-w-0">
          <CodeBlock code={swiftui.code} language="swift" title={rightTitle} />
        </div>
      </div>
    </div>
  );
}
