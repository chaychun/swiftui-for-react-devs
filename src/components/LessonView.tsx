import type { Lesson } from '../types';
import { CodeComparison } from './CodeComparison';
import { Lightbulb, ArrowLeft } from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
}

export function LessonView({ lesson, onBack }: LessonViewProps) {
  return (
    <article className="lesson-view">
      <header className="lesson-header">
        <button className="back-button" onClick={onBack} aria-label="Back to lessons">
          <ArrowLeft size={20} aria-hidden="true" />
          Back
        </button>
        <span className="lesson-category-badge">{lesson.category}</span>
        <h1>{lesson.title}</h1>
        <p className="lesson-description">{lesson.description}</p>
      </header>

      <div className="lesson-content">
        {lesson.sections.map((section, index) => (
          <section key={index} className="lesson-section">
            <h2>{section.title}</h2>
            <div
              className="section-explanation"
              dangerouslySetInnerHTML={{
                __html: section.explanation
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/`([^`]+)`/g, '<code>$1</code>')
              }}
            />

            <CodeComparison react={section.react} swiftui={section.swiftui} />

            {section.tips && section.tips.length > 0 && (
              <div className="tips-box" role="complementary" aria-label="Tips">
                <div className="tips-header">
                  <Lightbulb size={18} aria-hidden="true" />
                  <span>Tips for React Devs</span>
                </div>
                <ul>
                  {section.tips.map((tip, tipIndex) => (
                    <li
                      key={tipIndex}
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
