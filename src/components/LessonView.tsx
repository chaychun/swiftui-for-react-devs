import type { Lesson } from '../types';
import { CodeComparison } from './CodeComparison';
import { Lightbulb, ArrowLeft } from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
}

const explanationStyles = `text-[0.9375rem] text-text-secondary mb-6 leading-relaxed max-w-3xl mx-auto [&>strong]:text-text-primary [&>strong]:font-medium [&>code]:bg-bg-tertiary [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono [&>code]:text-accent-cool`;

export function LessonView({ lesson, onBack }: LessonViewProps) {
  return (
    <article className="p-8">
      <header className="mb-12 max-w-3xl mx-auto">
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-border rounded text-text-secondary text-sm cursor-pointer transition-all duration-150 mb-6 hover:bg-bg-tertiary hover:text-text-primary"
          onClick={onBack}
          aria-label="Back to lessons"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back
        </button>
        <div>
          <span className="inline-block px-3 py-1 bg-bg-tertiary text-accent-warm text-xs font-medium uppercase tracking-wide rounded mb-3">
            {lesson.category}
          </span>
        </div>
        <h1 className="text-2xl font-normal mb-3 text-text-primary">{lesson.title}</h1>
        <p className="text-base text-text-secondary">{lesson.description}</p>
      </header>

      <div>
        {lesson.sections.map((section, index) => (
          <section key={index} className="mb-16 pb-12 border-b border-border last:border-b-0">
            <h2 className="text-lg font-medium mb-4 text-text-primary max-w-3xl mx-auto">{section.title}</h2>
            <div
              className={explanationStyles}
              dangerouslySetInnerHTML={{
                __html: section.explanation
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/`([^`]+)`/g, '<code>$1</code>')
              }}
            />

            <CodeComparison react={section.react} swiftui={section.swiftui} />

            {section.tips && section.tips.length > 0 && (
              <div className="bg-bg-secondary border border-border border-l-2 border-l-accent-warm rounded-lg p-5 mt-6 max-w-3xl mx-auto" role="complementary" aria-label="Tips">
                <div className="flex items-center gap-2 font-medium text-accent-warm mb-3 text-sm">
                  <Lightbulb size={16} aria-hidden="true" />
                  <span>Tips for React Devs</span>
                </div>
                <ul className="list-none space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <li
                      key={tipIndex}
                      className="relative pl-5 text-sm text-text-secondary before:content-['→'] before:absolute before:left-0 before:text-accent-dim [&>code]:bg-bg-tertiary [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-xs [&>code]:font-mono [&>code]:text-accent-cool"
                      dangerouslySetInnerHTML={{
                        __html: tip
                          .replace(/`([^`]+)`/g, '<code>$1</code>')
                      }}
                    />
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
