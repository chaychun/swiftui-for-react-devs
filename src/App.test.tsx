import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { lessons } from "./data/lessons";

afterEach(() => {
  cleanup();
});

describe("App routing", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("renders welcome page at root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText("SwiftUI for React Developers")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders lesson page at /lessons/:id", () => {
    const firstLesson = lessons[0];
    render(
      <MemoryRouter initialEntries={[`/lessons/${firstLesson.id}`]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    // The lesson title should appear as the main heading
    expect(screen.getByRole("heading", { name: firstLesson.title })).toBeInTheDocument();
  });

  it.each(lessons)("renders lesson page for $title", (lesson) => {
    render(
      <MemoryRouter initialEntries={[`/lessons/${lesson.id}`]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: lesson.title })).toBeInTheDocument();
  });

  it("sidebar links navigate to lesson routes", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const firstLesson = lessons[0];
    const lessonLink = screen.getByRole("link", { name: new RegExp(firstLesson.title) });
    expect(lessonLink).toHaveAttribute("href", `/lessons/${firstLesson.id}`);
  });
});
