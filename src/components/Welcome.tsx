import { ArrowRight, Zap, RefreshCw, Layout } from "lucide-react";

interface WelcomeProps {
  onGetStarted: () => void;
}

export function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <div className="max-w-2xl mx-auto px-8 py-16">
      <header className="text-left mb-12 pb-8 border-b border-border">
        <h1 className="text-2xl font-normal tracking-tight mb-3 text-text-primary">
          SwiftUI for React Developers
        </h1>
        <p className="text-[0.9375rem] text-text-secondary mb-8">
          Learn SwiftUI fast by mapping it to React concepts you already know
        </p>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.8125rem] font-medium bg-accent-warm text-bg-primary border-0 rounded cursor-pointer transition-all duration-150 hover:brightness-110"
          onClick={onGetStarted}
        >
          Get Started
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12" aria-label="Key features">
        <div className="p-5 bg-bg-secondary border border-border rounded-lg">
          <div
            className="w-10 h-10 flex items-center justify-center bg-bg-tertiary rounded mb-3 text-accent-warm"
            aria-hidden="true"
          >
            <RefreshCw size={20} />
          </div>
          <h2 className="text-sm font-medium mb-1.5 text-text-primary">Side-by-Side Comparisons</h2>
          <p className="text-[0.8125rem] text-text-secondary leading-relaxed">
            See React and SwiftUI code side by side
          </p>
        </div>

        <div className="p-5 bg-bg-secondary border border-border rounded-lg">
          <div
            className="w-10 h-10 flex items-center justify-center bg-bg-tertiary rounded mb-3 text-accent-cool"
            aria-hidden="true"
          >
            <Zap size={20} />
          </div>
          <h2 className="text-sm font-medium mb-1.5 text-text-primary">React-First Explanations</h2>
          <p className="text-[0.8125rem] text-text-secondary leading-relaxed">
            Concepts explained through what you know
          </p>
        </div>

        <div className="p-5 bg-bg-secondary border border-border rounded-lg">
          <div
            className="w-10 h-10 flex items-center justify-center bg-bg-tertiary rounded mb-3 text-accent-warm"
            aria-hidden="true"
          >
            <Layout size={20} />
          </div>
          <h2 className="text-sm font-medium mb-1.5 text-text-primary">Practical Examples</h2>
          <p className="text-[0.8125rem] text-text-secondary leading-relaxed">
            Real-world patterns and best practices
          </p>
        </div>
      </section>

      <section
        className="bg-bg-secondary border border-border rounded-lg p-6"
        aria-labelledby="quick-ref-heading"
      >
        <h2 id="quick-ref-heading" className="text-sm font-medium mb-4 text-text-primary">
          Quick Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 px-3 border-b border-border text-xs uppercase tracking-wide text-accent-cool font-medium">
                  React
                </th>
                <th className="text-left py-2 px-3 border-b border-border text-xs uppercase tracking-wide text-accent-warm font-medium">
                  SwiftUI
                </th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              <tr>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    function Component()
                  </code>
                </td>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    struct View: View
                  </code>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    useState()
                  </code>
                </td>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    @State
                  </code>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    props
                  </code>
                </td>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    let properties
                  </code>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    useContext()
                  </code>
                </td>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    @Environment
                  </code>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    useEffect()
                  </code>
                </td>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    .task / .onAppear
                  </code>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    &lt;div&gt;
                  </code>
                </td>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    VStack / HStack
                  </code>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    className="..."
                  </code>
                </td>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    .modifier()
                  </code>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    .map()
                  </code>
                </td>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    ForEach
                  </code>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    {"key={id}"}
                  </code>
                </td>
                <td className="py-2 px-3 border-b border-border">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    Identifiable
                  </code>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    {"onChange={(e) => ..."}
                  </code>
                </td>
                <td className="py-2 px-3">
                  <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-xs font-mono">
                    $binding
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
