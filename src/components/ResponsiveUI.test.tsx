import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { Sidebar } from "./Sidebar";
import { CodeComparison } from "./CodeComparison";
import { CodeBlock } from "./CodeBlock";
import { LessonView } from "./LessonView";
import { Welcome } from "./Welcome";
import { ThemeProvider } from "../context/ThemeContext";
import { lessons } from "../data/lessons";

afterEach(() => {
  cleanup();
});

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("Mobile Header", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("renders mobile header with menu button", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it("renders app title in mobile header", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    // The mobile header contains the app title in a span
    const mobileHeader = container.querySelector("header.lg\\:hidden");
    const headerTitle = mobileHeader?.querySelector("span");
    expect(headerTitle).toHaveTextContent("SwiftUI for React Devs");
  });

  it("toggles menu button aria-label when clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();
  });

  it("shows overlay when sidebar is open", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menuButton);

    // Overlay should be present - it's a div with fixed positioning and bg-black/50
    const overlay = container.querySelector("div.fixed.inset-0.bg-black\\/50");
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass("z-40", "lg:hidden");
  });

  it("closes sidebar when overlay is clicked", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    // Open sidebar
    const menuButton = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menuButton);

    // Click overlay
    const overlay = container.querySelector("div.fixed.inset-0.bg-black\\/50");
    fireEvent.click(overlay!);

    // Menu button should be back to "Open menu"
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });
});

describe("Sidebar responsive behavior", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("renders with isOpen=false having translate-x-full class", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Sidebar isOpen={false} onClose={vi.fn()} />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const sidebar = screen.getByRole("navigation", { name: /lesson navigation/i });
    expect(sidebar).toHaveClass("-translate-x-full");
  });

  it("renders with isOpen=true having translate-x-0 class", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Sidebar isOpen={true} onClose={vi.fn()} />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const sidebar = screen.getByRole("navigation", { name: /lesson navigation/i });
    expect(sidebar).toHaveClass("translate-x-0");
  });

  it("calls onClose when lesson card is clicked", () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Sidebar isOpen={true} onClose={onClose} />
        </ThemeProvider>
      </MemoryRouter>,
    );

    // Find and click a lesson link by its title
    const lessonLink = screen.getByRole("link", { name: /types & type inference/i });
    fireEvent.click(lessonLink);

    expect(onClose).toHaveBeenCalled();
  });

  it("has proper transition classes for smooth animation", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Sidebar isOpen={false} onClose={vi.fn()} />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const sidebar = screen.getByRole("navigation", { name: /lesson navigation/i });
    expect(sidebar).toHaveClass("transition-transform", "duration-300", "ease-in-out");
  });

  it("has lg:translate-x-0 class for desktop always-visible behavior", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Sidebar isOpen={false} onClose={vi.fn()} />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const sidebar = screen.getByRole("navigation", { name: /lesson navigation/i });
    expect(sidebar).toHaveClass("lg:translate-x-0");
  });
});

describe("CodeComparison responsive layout", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("renders with flex-col and lg:flex-row classes for responsive layout", () => {
    const { container } = render(
      <ThemeProvider>
        <CodeComparison react={{ code: "const x = 1;" }} swiftui={{ code: "let x = 1" }} />
      </ThemeProvider>,
    );

    const flexContainer = container.querySelector(".flex-col.lg\\:flex-row");
    expect(flexContainer).toBeInTheDocument();
  });

  it("renders down arrow for mobile (block lg:hidden)", () => {
    render(
      <ThemeProvider>
        <CodeComparison react={{ code: "const x = 1;" }} swiftui={{ code: "let x = 1" }} />
      </ThemeProvider>,
    );

    // Find the container with the arrows
    const arrowContainer = document.querySelector(".text-text-muted");
    expect(arrowContainer).toBeInTheDocument();

    // Check for down arrow (mobile) classes
    const downArrow = document.querySelector(".block.lg\\:hidden");
    expect(downArrow).toBeInTheDocument();
  });

  it("renders right arrow for desktop (hidden lg:block)", () => {
    render(
      <ThemeProvider>
        <CodeComparison react={{ code: "const x = 1;" }} swiftui={{ code: "let x = 1" }} />
      </ThemeProvider>,
    );

    // Check for right arrow (desktop) classes
    const rightArrow = document.querySelector(".hidden.lg\\:block");
    expect(rightArrow).toBeInTheDocument();
  });

  it("renders both code blocks with min-w-0 for proper flex behavior", () => {
    const { container } = render(
      <ThemeProvider>
        <CodeComparison react={{ code: "const x = 1;" }} swiftui={{ code: "let x = 1" }} />
      </ThemeProvider>,
    );

    const codeContainers = container.querySelectorAll(".flex-1.min-w-0");
    expect(codeContainers).toHaveLength(2);
  });
});

describe("CodeBlock responsive styling", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("has responsive padding classes on pre element", () => {
    const { container } = render(
      <ThemeProvider>
        <CodeBlock code="const x = 1;" language="tsx" />
      </ThemeProvider>,
    );

    const preElement = container.querySelector("pre");
    expect(preElement).toHaveClass("p-3", "sm:p-4");
  });

  it("has responsive font size classes on pre element", () => {
    const { container } = render(
      <ThemeProvider>
        <CodeBlock code="const x = 1;" language="tsx" />
      </ThemeProvider>,
    );

    const preElement = container.querySelector("pre");
    expect(preElement).toHaveClass("text-xs", "sm:text-sm");
  });

  it("has responsive line number width classes", () => {
    const { container } = render(
      <ThemeProvider>
        <CodeBlock code="const x = 1;" language="tsx" />
      </ThemeProvider>,
    );

    // Line numbers have responsive width
    const lineNumber = container.querySelector("span.w-6.sm\\:w-8");
    expect(lineNumber).toBeInTheDocument();
  });

  it("has responsive line number font size", () => {
    const { container } = render(
      <ThemeProvider>
        <CodeBlock code="const x = 1;" language="tsx" />
      </ThemeProvider>,
    );

    const lineNumber = container.querySelector('span[class*="text-\\[10px\\]"]');
    expect(lineNumber).toBeInTheDocument();
    expect(lineNumber).toHaveClass("sm:text-xs");
  });

  it("has responsive padding on line numbers", () => {
    const { container } = render(
      <ThemeProvider>
        <CodeBlock code="const x = 1;" language="tsx" />
      </ThemeProvider>,
    );

    const lineNumber = container.querySelector("span.pr-2.sm\\:pr-4");
    expect(lineNumber).toBeInTheDocument();
  });
});

describe("LessonView responsive layout", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  const testLesson = lessons[0];

  it("has responsive article padding", () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <LessonView lesson={testLesson} onBack={vi.fn()} />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const article = container.querySelector("article");
    expect(article).toHaveClass("p-4", "sm:p-6", "lg:p-8");
  });

  it("has responsive header margins", () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <LessonView lesson={testLesson} onBack={vi.fn()} />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const header = container.querySelector("header");
    expect(header).toHaveClass("mb-8", "lg:mb-12");
  });

  it("has responsive title font size", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <LessonView lesson={testLesson} onBack={vi.fn()} />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveClass("text-xl", "sm:text-2xl");
  });

  it("has responsive section margins and padding", () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <LessonView lesson={testLesson} onBack={vi.fn()} />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("mb-8", "sm:mb-12", "lg:mb-16");
    expect(section).toHaveClass("pb-6", "sm:pb-8", "lg:pb-12");
  });
});

describe("Welcome page responsive layout", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("has responsive container padding", () => {
    const { container } = render(
      <ThemeProvider>
        <Welcome onGetStarted={vi.fn()} />
      </ThemeProvider>,
    );

    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass("px-4", "sm:px-6", "lg:px-8");
    expect(mainDiv).toHaveClass("py-8", "sm:py-12", "lg:py-16");
  });

  it("has responsive header margins", () => {
    const { container } = render(
      <ThemeProvider>
        <Welcome onGetStarted={vi.fn()} />
      </ThemeProvider>,
    );

    const header = container.querySelector("header");
    expect(header).toHaveClass("mb-8", "lg:mb-12");
    expect(header).toHaveClass("pb-6", "lg:pb-8");
  });

  it("has responsive title font size", () => {
    render(
      <ThemeProvider>
        <Welcome onGetStarted={vi.fn()} />
      </ThemeProvider>,
    );

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveClass("text-xl", "sm:text-2xl");
  });

  it("has responsive feature grid layout", () => {
    render(
      <ThemeProvider>
        <Welcome onGetStarted={vi.fn()} />
      </ThemeProvider>,
    );

    const featureSection = screen.getByRole("region", { name: /key features/i });
    expect(featureSection).toHaveClass("grid-cols-1", "md:grid-cols-3");
  });

  it("has responsive section margins", () => {
    render(
      <ThemeProvider>
        <Welcome onGetStarted={vi.fn()} />
      </ThemeProvider>,
    );

    const featureSection = screen.getByRole("region", { name: /key features/i });
    expect(featureSection).toHaveClass("mb-8", "lg:mb-12");
  });
});

describe("Main content area responsive behavior", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("has pt-14 padding-top for mobile header space", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const main = container.querySelector("main");
    expect(main).toHaveClass("pt-14", "lg:pt-0");
  });

  it("has lg:ml-70 margin for desktop sidebar space", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const main = container.querySelector("main");
    expect(main).toHaveClass("ml-0", "lg:ml-70");
  });

  it("mobile header is hidden on large screens (lg:hidden)", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const mobileHeader = container.querySelector("header");
    expect(mobileHeader).toHaveClass("lg:hidden");
  });
});

describe("Sidebar z-index layering", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("mobile header has z-30", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const mobileHeader = container.querySelector("header");
    expect(mobileHeader).toHaveClass("z-30");
  });

  it("overlay has z-40", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    // Open sidebar to show overlay
    const menuButton = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menuButton);

    const overlay = container.querySelector("div.fixed.inset-0.bg-black\\/50");
    expect(overlay).toHaveClass("z-40");
  });

  it("sidebar has z-50", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Sidebar isOpen={true} onClose={vi.fn()} />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const sidebar = screen.getByRole("navigation", { name: /lesson navigation/i });
    expect(sidebar).toHaveClass("z-50");
  });
});
