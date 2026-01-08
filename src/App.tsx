import { useState } from 'react';
import { lessons } from './data/lessons';
import { Sidebar } from './components/Sidebar';
import { LessonView } from './components/LessonView';
import { Welcome } from './components/Welcome';
import './App.css';

function App() {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const currentLesson = lessons.find(l => l.id === activeLesson);

  const handleGetStarted = () => {
    setActiveLesson(lessons[0].id);
  };

  return (
    <div className="app">
      <Sidebar
        lessons={lessons}
        activeLesson={activeLesson}
        onSelectLesson={setActiveLesson}
      />

      <main className="main-content">
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
