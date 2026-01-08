import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";
import { lessons } from "./data/lessons";

afterEach(() => {
  cleanup();
});

describe("App routing", () => {
  it("renders welcome page at root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("SwiftUI for React Developers")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders lesson page at /lessons/:id", () => {
    const firstLesson = lessons[0];
    render(
      <MemoryRouter initialEntries={[`/lessons/${firstLesson.id}`]}>
        <App />
      </MemoryRouter>,
    );

    // The lesson title should appear as the main heading
    expect(screen.getByRole("heading", { name: firstLesson.title })).toBeInTheDocument();
  });

  it.each(lessons)("renders lesson page for $title", (lesson) => {
    render(
      <MemoryRouter initialEntries={[`/lessons/${lesson.id}`]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: lesson.title })).toBeInTheDocument();
  });

  it("sidebar links navigate to lesson routes", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const firstLesson = lessons[0];
    const lessonLink = screen.getByRole("link", { name: new RegExp(firstLesson.title) });
    expect(lessonLink).toHaveAttribute("href", `/lessons/${firstLesson.id}`);
  });
});
