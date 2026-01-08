import { useState } from "react";
import { Routes, Route, useParams, useNavigate, Link } from "react-router-dom";
import { lessons } from "./data/lessons";
import { Sidebar } from "./components/Sidebar";
import { LessonView } from "./components/LessonView";
import { Welcome } from "./components/Welcome";
import { Menu, X } from "lucide-react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold text-text-primary mb-4">404</h1>
      <p className="text-text-secondary mb-6">Page not found</p>
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-bg-primary text-text-primary font-sans antialiased">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-bg-secondary border-b border-border px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 -ml-2 text-text-secondary hover:text-text-primary transition-colors"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="text-sm font-medium text-accent-warm">SwiftUI for React Devs</span>
        <div className="w-8" /> {/* Spacer for centering */}
      </header>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <main className="flex-1 lg:ml-70 min-h-screen pt-14 lg:pt-0">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/lessons/:id" element={<LessonPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
