import { ArrowRight, Zap, RefreshCw, Layout } from 'lucide-react';

interface WelcomeProps {
  onGetStarted: () => void;
}

export function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <div className="welcome">
      <header className="welcome-header">
        <h1>SwiftUI for React Developers</h1>
        <p className="tagline">
          Learn SwiftUI fast by mapping it to React concepts you already know
        </p>
        <button className="cta-button" onClick={onGetStarted}>
          Get Started
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </header>

      <section className="features" aria-label="Key features">
        <div className="feature-card">
          <div className="feature-icon" aria-hidden="true">
            <RefreshCw size={24} />
          </div>
          <h2>Side-by-Side Comparisons</h2>
          <p>See React and SwiftUI code side by side to understand the translation</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon" aria-hidden="true">
            <Zap size={24} />
          </div>
          <h2>React-First Explanations</h2>
          <p>Every concept explained through the lens of what you already know</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon" aria-hidden="true">
            <Layout size={24} />
          </div>
          <h2>Practical Examples</h2>
          <p>Real-world patterns from state management to navigation</p>
        </div>
      </section>

      <section className="quick-reference" aria-labelledby="quick-ref-heading">
        <h2 id="quick-ref-heading">Quick Reference</h2>
        <div className="reference-table-container">
          <table className="reference-table">
            <thead>
              <tr>
                <th scope="col">React</th>
                <th scope="col">SwiftUI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>function Component()</code></td>
                <td><code>struct View: View</code></td>
              </tr>
              <tr>
                <td><code>useState()</code></td>
                <td><code>@State</code></td>
              </tr>
              <tr>
                <td><code>props</code></td>
                <td><code>let properties</code></td>
              </tr>
              <tr>
                <td><code>useContext()</code></td>
                <td><code>@Environment</code></td>
              </tr>
              <tr>
                <td><code>useEffect()</code></td>
                <td><code>.task / .onAppear</code></td>
              </tr>
              <tr>
                <td><code>&lt;div&gt;</code></td>
                <td><code>VStack / HStack</code></td>
              </tr>
              <tr>
                <td><code>className="..."</code></td>
                <td><code>.modifier()</code></td>
              </tr>
              <tr>
                <td><code>.map()</code></td>
                <td><code>ForEach</code></td>
              </tr>
              <tr>
                <td><code>{"key={id}"}</code></td>
                <td><code>Identifiable</code></td>
              </tr>
              <tr>
                <td><code>{"onChange={(e) => ..."}</code></td>
                <td><code>$binding</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
