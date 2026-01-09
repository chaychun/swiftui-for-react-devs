import { useState } from "react";
import { Routes, Route, useParams, useNavigate, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { lessons } from "./data/lessons";
import { Sidebar } from "./components/Sidebar";
import { LessonView } from "./components/LessonView";
import { Welcome } from "./components/Welcome";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-bg-primary text-text-primary font-sans antialiased">
      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-bg-primary border-b border-border flex items-center px-4 z-30 lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 -ml-2 text-text-secondary hover:text-text-primary transition-colors"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-3 text-sm font-medium text-accent-warm truncate">
          SwiftUI for React Devs
        </span>
      </header>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <main className="flex-1 ml-0 lg:ml-70 min-h-screen pt-14 lg:pt-0">
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
