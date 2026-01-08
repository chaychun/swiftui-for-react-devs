import type { Lesson } from '../types';
import { ChevronRight } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  onClick: () => void;
  isActive: boolean;
}

export function LessonCard({ lesson, onClick, isActive }: LessonCardProps) {
  return (
    <button
      className={`w-full flex items-center justify-between py-2.5 px-3 text-left cursor-pointer transition-all duration-150 border-l-2 ${
        isActive
          ? 'bg-bg-tertiary border-l-accent-warm text-text-primary'
          : 'bg-transparent border-l-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary hover:border-l-accent-dim'
      }`}
      onClick={onClick}
      aria-label={`${lesson.title} - ${lesson.description}`}
    >
      <div className="flex-1">
        <span className="block text-[0.8125rem] font-normal">{lesson.title}</span>
        <span className="text-[0.6875rem] text-text-muted">{lesson.sections.length} sections</span>
      </div>
      <ChevronRight size={16} className="text-text-muted shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
    </button>
  );
}
