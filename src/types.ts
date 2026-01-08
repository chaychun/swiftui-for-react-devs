export interface Lesson {
  id: string;
  title: string;
  description: string;
  module: "swift-basics" | "swiftui";
  category: string;
  sections: LessonSection[];
}

export type LessonSection = ComparisonSection | SingleCodeSection;

interface BaseSection {
  title: string;
  explanation: string;
  tips?: string[];
}

export interface ComparisonSection extends BaseSection {
  format: "comparison";
  leftTitle?: string;
  rightTitle?: string;
  react: CodeExample;
  swiftui: CodeExample;
}

export interface SingleCodeSection extends BaseSection {
  format: "single";
  language: "swift" | "typescript";
  code: CodeExample;
}

export interface CodeExample {
  code: string;
  highlights?: number[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function isComparisonSection(section: LessonSection): section is ComparisonSection {
  return section.format === "comparison";
}

export function isSingleCodeSection(section: LessonSection): section is SingleCodeSection {
  return section.format === "single";
}
