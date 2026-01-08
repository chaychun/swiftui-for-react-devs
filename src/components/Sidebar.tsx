import type { Lesson } from "../types";
import { LessonCard } from "./LessonCard";
import { categories } from "../data/lessons";

interface SidebarProps {
  lessons: Lesson[];
  activeLesson: string | null;
  onSelectLesson: (id: string) => void;
}

export function Sidebar({ lessons, activeLesson, onSelectLesson }: SidebarProps) {
  return (
    <aside
      className="w-70 bg-bg-secondary border-r border-border flex flex-col fixed h-screen overflow-y-auto"
      role="navigation"
      aria-label="Lesson navigation"
    >
      <div className="p-6 border-b border-border">
        <h1 className="text-sm font-medium tracking-widest uppercase mb-1 text-accent-warm">
          SwiftUI for React Devs
        </h1>
        <p className="text-xs text-text-secondary">Learn SwiftUI using concepts you already know</p>
      </div>

      <nav className="flex-1 p-4">
        {categories.map((category) => (
          <div key={category} className="mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted px-3 py-2">
              {category}
            </h2>
            {lessons
              .filter((lesson) => lesson.category === category)
              .map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isActive={activeLesson === lesson.id}
                  onClick={() => onSelectLesson(lesson.id)}
                />
              ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
