import { useState } from 'react';
import { lessons } from './data/lessons';
import { Sidebar } from './components/Sidebar';
import { LessonView } from './components/LessonView';
import { Welcome } from './components/Welcome';

function App() {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const currentLesson = lessons.find(l => l.id === activeLesson);

  const handleGetStarted = () => {
    setActiveLesson(lessons[0].id);
  };

  return (
    <div className="flex min-h-screen bg-bg-primary text-text-primary font-sans antialiased">
      <Sidebar
        lessons={lessons}
        activeLesson={activeLesson}
        onSelectLesson={setActiveLesson}
      />

      <main className="flex-1 ml-70 min-h-screen">
        {currentLesson ? (
          <LessonView
            lesson={currentLesson}
            onBack={() => setActiveLesson(null)}
          />
        ) : (
          <Welcome onGetStarted={handleGetStarted} />
        )}
      </main>
    </div>
  );
}

export default App;
