import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LessonCard } from "./LessonCard";
import { getCategoriesForModule, getLessonsByModule } from "../data/lessons";

type ModuleId = "swift-basics" | "swiftui";

interface ModuleTab {
  id: ModuleId;
  label: string;
}

const MODULE_TABS: ModuleTab[] = [
  { id: "swift-basics", label: "Swift Basics" },
  { id: "swiftui", label: "SwiftUI" },
];

export function Sidebar() {
  const location = useLocation();
  const activeLessonId = location.pathname.match(/^\/lessons\/([^/?]+)/)?.[1] ?? null;
  const [activeModule, setActiveModule] = useState<ModuleId>("swift-basics");

  const moduleLessons = getLessonsByModule(activeModule);
  const moduleCategories = getCategoriesForModule(activeModule);

  return (
    <aside
      className="w-70 bg-bg-secondary border-r border-border flex flex-col fixed h-screen overflow-y-auto"
      role="navigation"
      aria-label="Lesson navigation"
    >
      <Link
        to="/"
        className="block p-6 border-b border-border no-underline hover:bg-bg-tertiary transition-colors"
      >
        <h1 className="text-sm font-medium tracking-widest uppercase mb-1 text-accent-warm">
          SwiftUI for React Devs
        </h1>
        <p className="text-xs text-text-secondary">Learn SwiftUI using concepts you already know</p>
      </Link>

      <div className="flex border-b border-border" role="tablist" aria-label="Module selection">
        {MODULE_TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeModule === tab.id}
            aria-controls={`${tab.id}-panel`}
            onClick={() => setActiveModule(tab.id)}
            className={`flex-1 py-3 px-4 text-xs font-medium transition-colors ${
              activeModule === tab.id
                ? "bg-bg-tertiary text-accent-warm border-b-2 border-accent-warm"
                : "text-text-muted hover:text-text-secondary hover:bg-bg-tertiary/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <nav
        className="flex-1 p-4"
        id={`${activeModule}-panel`}
        role="tabpanel"
        aria-label={`${activeModule} lessons`}
      >
        {moduleCategories.length === 0 ? (
          <p className="text-xs text-text-muted px-3 py-2 italic">No lessons yet</p>
        ) : (
          moduleCategories.map((category) => (
            <div key={category} className="mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted px-3 py-2">
                {category}
              </h2>
              {moduleLessons
                .filter((lesson) => lesson.category === category)
                .map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    isActive={activeLessonId === lesson.id}
                  />
                ))}
            </div>
          ))
        )}
      </nav>
    </aside>
  );
}
