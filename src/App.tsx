import { Routes, Route, useParams, useNavigate, Link } from "react-router-dom";
import { lessons } from "./data/lessons";
import { Sidebar } from "./components/Sidebar";
import { LessonView } from "./components/LessonView";
import { Welcome } from "./components/Welcome";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold text-text-primary mb-4">404</h1>
      <p className="text-text-secondary mb-6">Lesson not found</p>
      <Link
        to="/"
        className="px-4 py-2 bg-accent-warm text-bg-primary rounded-lg hover:opacity-90 transition-opacity"
      >
        Back to Home
      </Link>
    </div>
  );
}

function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return <NotFound />;
  }

  return <LessonView lesson={lesson} onBack={() => navigate("/")} />;
}

function WelcomePage() {
  const navigate = useNavigate();
  return <Welcome onGetStarted={() => navigate(`/lessons/${lessons[0].id}`)} />;
}

function App() {
  return (
    <div className="flex min-h-screen bg-bg-primary text-text-primary font-sans antialiased">
      <Sidebar lessons={lessons} />

      <main className="flex-1 ml-70 min-h-screen">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/lessons/:id" element={<LessonPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
