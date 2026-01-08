import type { Lesson } from '../types';
import { LessonCard } from './LessonCard';
import { categories } from '../data/lessons';

interface SidebarProps {
  lessons: Lesson[];
  activeLesson: string | null;
  onSelectLesson: (id: string) => void;
}

export function Sidebar({ lessons, activeLesson, onSelectLesson }: SidebarProps) {
  return (
    <aside className="sidebar" role="navigation" aria-label="Lesson navigation">
      <div className="sidebar-header">
        <h1>SwiftUI for React Devs</h1>
        <p>Learn SwiftUI using concepts you already know</p>
      </div>

      <nav className="lesson-list">
        {categories.map(category => (
          <div key={category} className="lesson-category-group">
            <h2 className="category-title">{category}</h2>
            {lessons
              .filter(lesson => lesson.category === category)
              .map(lesson => (
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
