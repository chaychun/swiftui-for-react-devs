export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: LessonSection[];
}

export interface LessonSection {
  title: string;
  explanation: string;
  react: CodeExample;
  swiftui: CodeExample;
  tips?: string[];
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
