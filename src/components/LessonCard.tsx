import { Link } from "react-router-dom";
import type { Lesson } from "../types";
import { ChevronRight } from "lucide-react";

interface LessonCardProps {
  lesson: Lesson;
  isActive: boolean;
}

export function LessonCard({ lesson, isActive }: LessonCardProps) {
  return (
    <Link
      to={`/lessons/${lesson.id}`}
      className={`group w-full flex items-center justify-between py-2.5 px-3 text-left cursor-pointer transition-all duration-150 border-l-2 no-underline ${
        isActive
          ? "bg-bg-tertiary border-l-accent-warm text-text-primary"
          : "bg-transparent border-l-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary hover:border-l-accent-dim"
      }`}
      aria-label={`${lesson.title} - ${lesson.description}`}
    >
      <div className="flex-1">
        <span className="block text-[0.8125rem] font-normal">{lesson.title}</span>
        <span className="text-[0.6875rem] text-text-muted">{lesson.sections.length} sections</span>
      </div>
      <ChevronRight
        size={16}
        className="text-text-muted shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />
    </Link>
  );
}
