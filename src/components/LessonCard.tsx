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
      className={`lesson-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
      aria-label={`${lesson.title} - ${lesson.description}`}
    >
      <div className="lesson-card-content">
        <span className="lesson-category">{lesson.category}</span>
        <span className="lesson-title">{lesson.title}</span>
        <p>{lesson.description}</p>
        <span className="lesson-sections">{lesson.sections.length} sections</span>
      </div>
      <ChevronRight size={20} className="lesson-card-arrow" aria-hidden="true" />
    </button>
  );
}
