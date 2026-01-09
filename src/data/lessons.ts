import type { Lesson } from "../types";
import { swiftBasicsLessons } from "./swift-basics";

export const swiftuiLessons: Lesson[] = [
  {
    id: "basics",
    title: "Basic Components",
    description: "Learn how React components map to SwiftUI Views",
    module: "swiftui",
    category: "Fundamentals",
    sections: [
      {
        format: "comparison",
        title: "Functional Components → Structs",
        explanation: `In React, you create components as functions. In SwiftUI, you create **structs** that conform to the **View** protocol. The \`body\` property is like your return statement in React.`,
        react: {
          code: `function Greeting({ name }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to the app</p>
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct Greeting: View {
    let name: String

    var body: some View {
        VStack {
            Text("Hello, \\(name)!")
                .font(.title)
            Text("Welcome to the app")
        }
    }
}`,
        },
        tips: [
          '`some View` is like TypeScript\'s `ReactNode` - it means "some type that conforms to View"',
          "Props become struct properties (let or var)",
          "No explicit return needed for single expressions",
        ],
      },
      {
        format: "comparison",
        title: "JSX Elements → View Modifiers",
        explanation: `In React, you style with CSS classes or inline styles. In SwiftUI, you use **view modifiers** - chainable methods that transform views.`,
        react: {
          code: `<button
  className="primary-btn"
  style={{
    padding: '12px 24px',
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '8px'
  }}
>
  Click me
</button>`,
        },
        swiftui: {
          code: `Button("Click me") {
    // action
}
.padding(.horizontal, 24)
.padding(.vertical, 12)
.background(Color.blue)
.foregroundColor(.white)
.cornerRadius(8)`,
        },
        tips: [
          "Modifiers are applied in order - later modifiers wrap earlier ones",
          "Think of each modifier as wrapping the view in a new container",
          "Common gotcha: `.background()` before `.padding()` vs after gives different results!",
        ],
      },
      {
        format: "comparison",
        title: "Text & Typography",
        explanation: `SwiftUI's Text view is more powerful than you might expect - it handles rich text, AttributedString, and has built-in modifiers for fonts and styling.`,
        react: {
          code: `function Article() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 'bold' }}>
        Title
      </h1>
      <p style={{ fontSize: 16, color: '#666' }}>
        This is a paragraph with <strong>bold</strong> and
        <em> italic</em> text.
      </p>
      <p style={{ fontFamily: 'monospace' }}>
        Code: console.log('hello')
      </p>
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct Article: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Title")
                .font(.system(size: 28, weight: .bold))

            Text("This is a paragraph with **bold** and *italic* text.")
                .font(.body)
                .foregroundStyle(.secondary)

            Text("Code: console.log('hello')")
                .font(.system(.body, design: .monospaced))
        }
    }
}`,
        },
        tips: [
          "Text supports Markdown! Use **bold** and *italic* directly",
          ".font(.body), .font(.title), .font(.caption) are semantic sizes",
          ".foregroundStyle(.secondary) adapts to light/dark mode",
          ".monospaced() modifier adds monospace font family",
        ],
      },
      {
        format: "comparison",
        title: "Images & SF Symbols",
        explanation: `SwiftUI has Image for photos and a massive library of **SF Symbols** - Apple's icon set with 5000+ symbols that scale and theme automatically.`,
        react: {
          code: `import { FaHeart, FaUser } from 'react-icons/fa';

function Profile({ user }) {
  return (
    <div>
      <img
        src={user.avatarUrl}
        alt="Profile"
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <FaUser size={20} />
        <span>{user.name}</span>
      </div>
      <button>
        <FaHeart size={20} color="red" />
        Like
      </button>
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct Profile: View {
    let user: User

    var body: some View {
        VStack {
            AsyncImage(url: URL(string: user.avatarUrl)) { image in
                image
                    .resizable()
                    .scaledToFill()
            } placeholder: {
                ProgressView()
            }
            .frame(width: 100, height: 100)
            .clipShape(Circle())

            Label(user.name, systemImage: "person")

            Button {
                // like action
            } label: {
                Label("Like", systemImage: "heart.fill")
                    .foregroundStyle(.red)
            }
        }
    }
}`,
        },
        tips: [
          "AsyncImage loads remote images with automatic caching",
          "SF Symbols: 5000+ free icons that adapt to font weight and size",
          'Use Label("Text", systemImage: "name") for icon + text',
          ".resizable() required before .frame() on images",
        ],
      },
      {
        format: "comparison",
        title: "Buttons & Actions",
        explanation: `SwiftUI buttons have built-in styles, roles (like destructive), and support for confirmation dialogs without external libraries.`,
        react: {
          code: `function Actions() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Delete this item?')) {
      deleteItem();
    }
  };

  return (
    <div>
      <button className="primary">
        Save
      </button>
      <button
        className="destructive"
        onClick={handleDelete}
      >
        Delete
      </button>
      <button disabled>
        Loading...
      </button>
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct Actions: View {
    @State private var showConfirm = false

    var body: some View {
        VStack {
            Button("Save") {
                save()
            }
            .buttonStyle(.borderedProminent)

            Button("Delete", role: .destructive) {
                showConfirm = true
            }
            .buttonStyle(.bordered)
            .confirmationDialog("Delete this item?", isPresented: $showConfirm) {
                Button("Delete", role: .destructive) {
                    deleteItem()
                }
                Button("Cancel", role: .cancel) {}
            }

            Button("Loading...") {}
                .disabled(true)
        }
    }
}`,
        },
        tips: [
          "Button roles: .destructive, .cancel automatically style red/blue",
          ".buttonStyle(.borderedProminent) gives filled button appearance",
          ".confirmationDialog for action sheets (better than alert)",
          ".disabled(true) automatically dims and prevents interaction",
        ],
      },
    ],
  },
  {
    id: "state",
    title: "State Management",
    description: "useState, useEffect, and more → SwiftUI property wrappers",
    module: "swiftui",
    category: "Fundamentals",
    sections: [
      {
        format: "comparison",
        title: "useState → @State",
        explanation: `React's \`useState\` becomes SwiftUI's \`@State\` property wrapper. The key difference: SwiftUI automatically re-renders when @State changes - no setter function needed, just assign directly!`,
        react: {
          code: `function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct Counter: View {
    @State private var count = 0

    var body: some View {
        VStack {
            Text("Count: \\(count)")
            Button("Increment") {
                count += 1
            }
            Button("Reset") {
                count = 0
            }
        }
    }
}`,
        },
        tips: [
          "@State should be private - it's owned by this view only",
          "No destructuring needed - just use the variable directly",
          "Mutating @State automatically triggers a re-render",
        ],
      },
      {
        format: "comparison",
        title: "Props with Callbacks → @Binding",
        explanation: `When a child needs to modify parent state (like controlled inputs in React), use \`@Binding\`. It's like passing both the value AND the setter.`,
        react: {
          code: `// Parent
function Parent() {
  const [text, setText] = useState('');
  return <TextInput value={text} onChange={setText} />;
}

// Child
function TextInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}`,
        },
        swiftui: {
          code: `// Parent
struct Parent: View {
    @State private var text = ""

    var body: some View {
        TextInput(text: $text)
    }
}

// Child
struct TextInput: View {
    @Binding var text: String

    var body: some View {
        TextField("Enter text", text: $text)
    }
}`,
        },
        tips: [
          "The $ prefix creates a Binding from a @State property",
          "@Binding is like receiving both value and setValue in one",
          "Two-way data binding is built into SwiftUI!",
        ],
      },
      {
        format: "comparison",
        title: "useEffect → .onAppear / .onChange / .task",
        explanation: `SwiftUI doesn't have a direct useEffect equivalent. Instead, it has specific modifiers for different scenarios.`,
        react: {
          code: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // On mount
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []);

  // On dependency change
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  // Cleanup
  useEffect(() => {
    const sub = subscribe(userId);
    return () => sub.unsubscribe();
  }, [userId]);
}`,
        },
        swiftui: {
          code: `struct UserProfile: View {
    let userId: String
    @State private var user: User?

    var body: some View {
        Text(user?.name ?? "Loading...")
            // On mount (async supported!)
            .task {
                user = await fetchUser(userId)
            }
            // On dependency change (iOS 17+)
            .onChange(of: userId) { oldId, newId in
                Task {
                    user = await fetchUser(newId)
                }
            }
            // Cleanup: .task auto-cancels!
            .task {
                for await update in subscribe(userId) {
                    user = update
                }
            } // Cancelled when view disappears
    }
}`,
        },
        tips: [
          ".task is async by default and auto-cancels on view disappear",
          ".onAppear is for sync code, .task is for async",
          ".onChange watches specific values (like useEffect dependencies)",
          "No cleanup function needed - .task handles cancellation!",
        ],
      },
      {
        format: "comparison",
        title: "@StateObject vs @State",
        explanation: `Use \`@State\` for simple value types (Int, String, Bool). Use \`@StateObject\` when you need to create and own an **ObservableObject** class with complex logic.`,
        react: {
          code: `// Simple value - useState
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Complex object - useState with class
class Timer {
  constructor() {
    this.count = 0;
    this.interval = null;
  }
  start() {
    this.interval = setInterval(() => this.count++, 1000);
  }
  stop() {
    clearInterval(this.interval);
  }
}

function TimerView() {
  // Create instance once
  const [timer] = useState(() => new Timer());

  useEffect(() => {
    timer.start();
    return () => timer.stop();
  }, [timer]);

  return <div>{timer.count}</div>;
}`,
        },
        swiftui: {
          code: `// Simple value - @State
struct Counter: View {
    @State private var count = 0

    var body: some View {
        Button("\\(count)") { count += 1 }
    }
}

// Complex object - @StateObject
class TimerModel: ObservableObject {
    @Published var count = 0
    private var timer: Timer?

    func start() {
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
            self.count += 1
        }
    }

    func stop() {
        timer?.invalidate()
    }
}

struct TimerView: View {
    @StateObject private var timer = TimerModel()

    var body: some View {
        Text("\\(timer.count)")
            .onAppear { timer.start() }
            .onDisappear { timer.stop() }
    }
}`,
        },
        tips: [
          "@State for value types (structs), @StateObject for reference types (classes)",
          "@StateObject creates the instance once and keeps it alive",
          "ObservableObject + @Published is like a custom React hook",
          "Use @StateObject when you need complex lifecycle management",
        ],
      },
      {
        format: "comparison",
        title: "Derived State (Computed Properties)",
        explanation: `React's \`useMemo\` becomes simple **computed properties** in SwiftUI. No dependency array needed - Swift is smart enough to recalculate when needed.`,
        react: {
          code: `function ShoppingCart({ items }) {
  const [discountCode, setDiscountCode] = useState('');

  // Memoized derived values
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  const discount = useMemo(() => {
    return discountCode === 'SAVE20' ? 0.2 : 0;
  }, [discountCode]);

  const total = useMemo(() => {
    return subtotal * (1 - discount);
  }, [subtotal, discount]);

  return (
    <div>
      <p>Subtotal: \${subtotal}</p>
      <p>Discount: {discount * 100}%</p>
      <p>Total: \${total}</p>
      <input
        value={discountCode}
        onChange={e => setDiscountCode(e.target.value)}
      />
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct ShoppingCart: View {
    let items: [Item]
    @State private var discountCode = ""

    // Computed properties - no useMemo needed!
    var subtotal: Double {
        items.reduce(0) { $0 + $1.price }
    }

    var discount: Double {
        discountCode == "SAVE20" ? 0.2 : 0
    }

    var total: Double {
        subtotal * (1 - discount)
    }

    var body: some View {
        VStack {
            Text("Subtotal: $\\(subtotal, specifier: "%.2f")")
            Text("Discount: \\(discount * 100, specifier: "%.0f")%")
            Text("Total: $\\(total, specifier: "%.2f")")
            TextField("Discount code", text: $discountCode)
        }
    }
}`,
        },
        tips: [
          "Computed properties (var x: Type { }) are like useMemo",
          "No dependency arrays - Swift tracks usage automatically",
          "Only recalculated when the view re-renders",
          "Keep computed properties simple - complex logic goes in methods",
        ],
      },
      {
        format: "comparison",
        title: "@AppStorage",
        explanation: `SwiftUI's \`@AppStorage\` is like a reactive \`localStorage\` - changes automatically persist and sync across views. No JSON serialization needed for simple types.`,
        react: {
          code: `// Custom hook for localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function Settings() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16);
  const [username, setUsername] = useLocalStorage('username', '');

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={e => setDarkMode(e.target.checked)}
        />
        Dark Mode
      </label>
      <input
        type="range"
        min={12}
        max={24}
        value={fontSize}
        onChange={e => setFontSize(Number(e.target.value))}
      />
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct Settings: View {
    // Automatically persists to UserDefaults!
    @AppStorage("darkMode") private var darkMode = false
    @AppStorage("fontSize") private var fontSize = 16.0
    @AppStorage("username") private var username = ""

    var body: some View {
        Form {
            Toggle("Dark Mode", isOn: $darkMode)

            VStack {
                Slider(value: $fontSize, in: 12...24, step: 1)
                Text("Font size: \\(Int(fontSize))")
            }

            TextField("Username", text: $username)
        }
    }
}

// Changes automatically sync across all views using @AppStorage!
// No manual JSON serialization needed for String, Int, Bool, Double`,
        },
        tips: [
          "@AppStorage automatically persists to UserDefaults (like localStorage)",
          "Works with String, Int, Bool, Double out of the box",
          "Changes sync automatically across all views using the same key",
          "For complex types, use Codable + custom encoding",
        ],
      },
    ],
  },
  {
    id: "view-lifecycle",
    title: "View Lifecycle",
    description: "Understanding when SwiftUI views appear, update, and disappear",
    module: "swiftui",
    category: "Fundamentals",
    sections: [
      {
        format: "comparison",
        title: "onAppear / onDisappear",
        explanation: `SwiftUI's \`.onAppear\` and \`.onDisappear\` are like React's \`useEffect\` mount/unmount - they run when a view enters or leaves the view hierarchy.`,
        react: {
          code: `function Analytics({ screen }) {
  useEffect(() => {
    // Runs when component mounts
    console.log(\`Viewing: \${screen}\`);
    logAnalytics('screen_view', { screen });

    // Cleanup when component unmounts
    return () => {
      console.log(\`Left: \${screen}\`);
      logAnalytics('screen_exit', { screen });
    };
  }, []); // Empty array = mount/unmount only

  return <div>{screen} content</div>;
}

// With animation on mount
function FadeIn({ children }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div style={{ opacity, transition: 'opacity 0.3s' }}>
      {children}
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct Analytics: View {
    let screen: String

    var body: some View {
        Text("\\(screen) content")
            .onAppear {
                print("Viewing: \\(screen)")
                logAnalytics("screen_view", params: ["screen": screen])
            }
            .onDisappear {
                print("Left: \\(screen)")
                logAnalytics("screen_exit", params: ["screen": screen])
            }
    }
}

// With animation on appear
struct FadeIn<Content: View>: View {
    @State private var opacity = 0.0
    let content: Content

    var body: some View {
        content
            .opacity(opacity)
            .onAppear {
                withAnimation(.easeIn(duration: 0.3)) {
                    opacity = 1.0
                }
            }
    }
}`,
        },
        tips: [
          ".onAppear runs when view appears in hierarchy (like mount)",
          ".onDisappear runs when view leaves hierarchy (like unmount)",
          "Use for analytics, starting animations, or setup that doesn't need async",
          "For async work, use .task instead (auto-cancels!)",
        ],
      },
      {
        format: "comparison",
        title: "task modifier",
        explanation: `The \`.task\` modifier is for **async lifecycle work**. It automatically cancels when the view disappears - perfect for network requests and streams.`,
        react: {
          code: `function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await fetchPosts();
        if (!cancelled) {
          setPosts(data);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    // Manual cancellation
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{posts.map(p => <Post key={p.id} post={p} />)}</div>;
}`,
        },
        swiftui: {
          code: `struct Feed: View {
    @State private var posts: [Post] = []
    @State private var loading = true

    var body: some View {
        Group {
            if loading {
                ProgressView()
            } else {
                List(posts) { post in
                    PostRow(post: post)
                }
            }
        }
        .task {
            loading = true
            defer { loading = false }

            // Automatically cancelled if view disappears!
            posts = await fetchPosts()
        }
    }
}

// For long-running streams
struct LiveFeed: View {
    @State private var messages: [Message] = []

    var body: some View {
        List(messages) { msg in
            Text(msg.text)
        }
        .task {
            // Auto-cancelled when view disappears
            for await message in messageStream() {
                messages.append(message)
            }
        }
    }
}`,
        },
        tips: [
          ".task is like useEffect but async-first",
          "Automatically cancels async work when view disappears",
          "No manual cancellation tokens needed!",
          "Perfect for streams (for await) that run until view unmounts",
        ],
      },
      {
        format: "comparison",
        title: "onChange",
        explanation: `\`.onChange\` watches a specific value and runs when it changes - like \`useEffect\` with a dependency array, but more explicit.`,
        react: {
          code: `function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  // Runs when query changes
  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      return;
    }

    async function search() {
      const data = await searchAPI(query);
      setResults(data);
    }

    search();
  }, [query]);

  return (
    <div>
      {results.map(r => <div key={r.id}>{r.title}</div>)}
    </div>
  );
}

// Watch multiple values
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    console.log('Form changed:', { name, email });
    autosave({ name, email });
  }, [name, email]);

  return (/* form fields */);
}`,
        },
        swiftui: {
          code: `struct SearchResults: View {
    let query: String
    @State private var results: [Result] = []

    var body: some View {
        List(results) { result in
            Text(result.title)
        }
        .onChange(of: query) { oldValue, newValue in
            if newValue.isEmpty {
                results = []
                return
            }

            Task {
                results = await searchAPI(newValue)
            }
        }
    }
}

// Watch multiple values with separate onChange
struct Form: View {
    @State private var name = ""
    @State private var email = ""

    var body: some View {
        VStack {
            TextField("Name", text: $name)
            TextField("Email", text: $email)
        }
        .onChange(of: name) { old, new in
            print("Name changed: \\(new)")
            autosave()
        }
        .onChange(of: email) { old, new in
            print("Email changed: \\(new)")
            autosave()
        }
    }

    func autosave() {
        // Save with current name and email
    }
}`,
        },
        tips: [
          ".onChange(of: value) runs when that specific value changes",
          "Receives both old and new value",
          "More explicit than useEffect dependency arrays",
          "Can stack multiple .onChange for different values",
        ],
      },
      {
        format: "comparison",
        title: "View Identity",
        explanation: `SwiftUI tracks view identity to preserve state across updates. This is like React's \`key\` prop, but SwiftUI has implicit rules based on structure.`,
        react: {
          code: `function TodoList({ todos, sortBy }) {
  // Without key - React destroys and recreates on reorder
  return (
    <div>
      {todos.map(todo => (
        <TodoItem todo={todo} />  // Bad! No key
      ))}
    </div>
  );

  // With key - React preserves components
  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />  // Good!
      ))}
    </div>
  );
}

// Force remount with key change
function UserProfile({ userId }) {
  // Change key to force complete remount
  return <ProfileView key={userId} userId={userId} />;
}`,
        },
        swiftui: {
          code: `struct TodoList: View {
    let todos: [Todo]
    let sortBy: SortOption

    var body: some View {
        // ForEach automatically uses Identifiable.id
        List {
            ForEach(todos) { todo in
                TodoItem(todo: todo)
            }
        }
        // Identity preserved when todo reorders!
    }
}

// Explicit identity with id()
struct UserProfile: View {
    let userId: String

    var body: some View {
        ProfileView(userId: userId)
            .id(userId)  // Change userId = new identity = full reset
    }
}

// Transitions require stable identity
struct AnimatedList: View {
    let items: [Item]

    var body: some View {
        ForEach(items) { item in
            Text(item.name)
                .transition(.slide)
        }
        // SwiftUI uses item.id to track which items were added/removed
    }
}`,
        },
        tips: [
          "ForEach uses Identifiable.id automatically (like key)",
          ".id(value) explicitly sets identity - change it to reset view state",
          "SwiftUI infers identity from view structure (position matters!)",
          "Transitions and animations depend on stable identity",
        ],
      },
    ],
  },
  {
    id: "layout",
    title: "Layout & Flexbox",
    description: "Flexbox concepts → SwiftUI Stacks",
    module: "swiftui",
    category: "Layout",
    sections: [
      {
        format: "comparison",
        title: "Flexbox → Stacks",
        explanation: `SwiftUI uses **HStack**, **VStack**, and **ZStack** instead of flexbox. They're simpler but less flexible - you choose the main axis upfront.`,
        react: {
          code: `// Horizontal layout
<div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
  <span>Left</span>
  <span>Right</span>
</div>

// Vertical layout
<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
  <span>Top</span>
  <span>Bottom</span>
</div>

// Overlapping (position absolute)
<div style={{ position: 'relative' }}>
  <img src="photo.jpg" />
  <span style={{ position: 'absolute', bottom: 0 }}>
    Caption
  </span>
</div>`,
        },
        swiftui: {
          code: `// Horizontal layout
HStack(spacing: 8) {
    Text("Left")
    Text("Right")
}

// Vertical layout
VStack(spacing: 8) {
    Text("Top")
    Text("Bottom")
}

// Overlapping (ZStack)
ZStack(alignment: .bottom) {
    Image("photo")
    Text("Caption")
}`,
        },
        tips: [
          "HStack = flex-direction: row",
          "VStack = flex-direction: column",
          "ZStack = position: relative/absolute (layers on z-axis)",
          "spacing parameter = gap",
        ],
      },
      {
        format: "comparison",
        title: "justify-content & align-items → Stack Alignment",
        explanation: `Flexbox's justify-content and align-items become alignment parameters and Spacer views in SwiftUI.`,
        react: {
          code: `// Space between
<div style={{
  display: 'flex',
  justifyContent: 'space-between'
}}>
  <span>Left</span>
  <span>Right</span>
</div>

// Center both axes
<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}}>
  <span>Centered</span>
</div>

// Align to end
<div style={{
  display: 'flex',
  alignItems: 'flex-end'
}}>
  <span>Bottom aligned</span>
</div>`,
        },
        swiftui: {
          code: `// Space between
HStack {
    Text("Left")
    Spacer()
    Text("Right")
}

// Center both axes
VStack {
    Spacer()
    HStack {
        Spacer()
        Text("Centered")
        Spacer()
    }
    Spacer()
}

// Align to end (cross-axis)
HStack(alignment: .bottom) {
    Text("Bottom aligned")
}`,
        },
        tips: [
          "Spacer() expands to fill available space (like flex: 1)",
          "Stack alignment param controls cross-axis (like align-items)",
          "For main-axis distribution, use Spacer() strategically",
          ".frame(maxWidth: .infinity) makes a view expand",
        ],
      },
      {
        format: "comparison",
        title: "Grid Layouts",
        explanation: `SwiftUI has LazyVGrid and LazyHGrid for grid layouts, similar to CSS Grid but with a different mental model.`,
        react: {
          code: `// CSS Grid
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px'
}}>
  {items.map(item => (
    <div key={item.id}>{item.name}</div>
  ))}
</div>

// Or with auto-fill
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: '16px'
}}>
  {items.map(item => (
    <div key={item.id}>{item.name}</div>
  ))}
</div>`,
        },
        swiftui: {
          code: `// Fixed 3 columns
let columns = [
    GridItem(.flexible()),
    GridItem(.flexible()),
    GridItem(.flexible())
]

LazyVGrid(columns: columns, spacing: 16) {
    ForEach(items) { item in
        Text(item.name)
    }
}

// Adaptive (like auto-fill)
let adaptiveColumns = [
    GridItem(.adaptive(minimum: 150))
]

LazyVGrid(columns: adaptiveColumns, spacing: 16) {
    ForEach(items) { item in
        Text(item.name)
    }
}`,
        },
        tips: [
          "GridItem(.flexible()) = 1fr",
          "GridItem(.adaptive(minimum:)) = auto-fill with minmax",
          "GridItem(.fixed(100)) = fixed 100pt column",
          "LazyVGrid/LazyHGrid only render visible items (like virtualization)",
        ],
      },
      {
        format: "comparison",
        title: "Frame & Sizing",
        explanation: `SwiftUI's \`.frame()\` modifier is how you control view dimensions. Unlike CSS where width/height are set directly, frames can be flexible, fixed, or ideal.`,
        react: {
          code: `// Fixed size
<div style={{ width: 200, height: 100 }}>
  Fixed size
</div>

// Min/max constraints
<div style={{
  minWidth: 100,
  maxWidth: 500,
  width: '100%'
}}>
  Constrained width
</div>

// Aspect ratio
<img
  src="photo.jpg"
  style={{
    width: '100%',
    height: 'auto',
    aspectRatio: '16/9'
  }}
/>

// Content-based sizing
<div style={{ display: 'inline-block' }}>
  Fits content
</div>`,
        },
        swiftui: {
          code: `// Fixed size
Text("Fixed size")
    .frame(width: 200, height: 100)

// Min/max constraints
Text("Constrained width")
    .frame(minWidth: 100, maxWidth: 500)
    // Views expand to maxWidth if in expanding container

// Ideal size with min/max
Text("Flexible")
    .frame(minWidth: 0, idealWidth: 200, maxWidth: .infinity)

// Aspect ratio
Image("photo")
    .resizable()
    .aspectRatio(16/9, contentMode: .fit)
    .frame(maxWidth: .infinity)

// Content-based sizing (default!)
Text("Fits content")
    // No frame needed - views fit their content by default

// Force content size
VStack {
    Text("Long text that might wrap but won't")
}
.fixedSize() // Ignores parent constraints`,
        },
        tips: [
          ".frame(width:height:) sets exact dimensions",
          ".frame(maxWidth: .infinity) expands to fill available space",
          ".fixedSize() forces view to use its ideal/intrinsic size",
          "Views have intrinsic content size by default (unlike CSS which needs explicit sizing)",
        ],
      },
      {
        format: "comparison",
        title: "Safe Area & Padding",
        explanation: `SwiftUI respects device safe areas (notches, home indicators) automatically. You can control this behavior with modifiers.`,
        react: {
          code: `// CSS with safe area insets
<div style={{
  paddingTop: 'env(safe-area-inset-top)',
  paddingBottom: 'env(safe-area-inset-bottom)'
}}>
  Content respects notch
</div>

// Fixed header that ignores safe area
<header style={{
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  paddingTop: 'env(safe-area-inset-top)'
}}>
  Header
</header>

// Padding
<div style={{ padding: 16 }}>
  All sides
</div>
<div style={{
  paddingTop: 8,
  paddingBottom: 16,
  paddingLeft: 12,
  paddingRight: 12
}}>
  Per side
</div>`,
        },
        swiftui: {
          code: `// Safe area is respected by default
VStack {
    Text("Content respects notch")
}
// Automatically inset from safe area

// Ignore safe area
ZStack {
    Color.blue
        .ignoresSafeArea() // Extends under notch/home indicator

    VStack {
        Text("Content")
    }
    .padding() // Add padding manually if needed
}

// Safe area insets (like padding)
ScrollView {
    VStack {
        ForEach(items) { item in
            ItemRow(item: item)
        }
    }
    .safeAreaInset(edge: .bottom) {
        // Floats above scrolling content
        Button("Add Item") { }
            .padding()
            .background(.thinMaterial)
    }
}

// Padding
Text("All sides")
    .padding() // 16pt default

Text("Per side")
    .padding(.top, 8)
    .padding(.bottom, 16)
    .padding(.horizontal, 12)`,
        },
        tips: [
          "Views respect safe area by default (unlike CSS)",
          ".ignoresSafeArea() extends under notch/indicators",
          ".safeAreaInset adds floating content that scrolls respect",
          ".padding() with no args = 16pt; .padding(.horizontal) = left+right",
        ],
      },
    ],
  },
  {
    id: "alignment-positioning",
    title: "Alignment & Positioning",
    description: "Advanced layout with custom alignment and positioning",
    module: "swiftui",
    category: "Layout",
    sections: [
      {
        format: "comparison",
        title: "Alignment Guides",
        explanation: `Alignment guides let you customize how views align within stacks - like flexbox alignment but more powerful. You can create custom alignment rules.`,
        react: {
          code: `// CSS flexbox alignment
<div style={{ display: 'flex', alignItems: 'baseline' }}>
  <h1>Title</h1>
  <p>Subtitle</p>
</div>

// Custom alignment with margins
<div style={{ display: 'flex', alignItems: 'center' }}>
  <img
    src="avatar.jpg"
    style={{ marginRight: 8 }}
  />
  <div style={{ marginTop: 4 }}>
    <h3>Name</h3>
    <p>Description</p>
  </div>
</div>

// Aligning to specific element
<div style={{ display: 'flex' }}>
  <div style={{ alignSelf: 'flex-start' }}>A</div>
  <div style={{ alignSelf: 'center' }}>B</div>
  <div style={{ alignSelf: 'flex-end' }}>C</div>
</div>`,
        },
        swiftui: {
          code: `// Built-in alignments
HStack(alignment: .firstTextBaseline) {
    Text("Title")
        .font(.largeTitle)
    Text("Subtitle")
        .font(.body)
}

// Custom alignment guide
extension VerticalAlignment {
    private struct CustomAlignment: AlignmentID {
        static func defaultValue(in context: ViewDimensions) -> CGFloat {
            context[VerticalAlignment.center]
        }
    }
    static let custom = VerticalAlignment(CustomAlignment.self)
}

HStack(alignment: .custom) {
    Image("avatar")
        .alignmentGuide(.custom) { d in d[VerticalAlignment.center] }

    VStack(alignment: .leading) {
        Text("Name")
            .alignmentGuide(.custom) { d in d[VerticalAlignment.top] + 4 }
        Text("Description")
    }
}

// Per-view alignment override
HStack {
    Text("A")
        .alignmentGuide(.top) { d in d[.top] }
    Text("B")
        .alignmentGuide(.top) { d in d[VerticalAlignment.center] }
    Text("C")
        .alignmentGuide(.top) { d in d[.bottom] }
}`,
        },
        tips: [
          "HStack has VerticalAlignment (.top, .center, .bottom, .firstTextBaseline)",
          "VStack has HorizontalAlignment (.leading, .center, .trailing)",
          ".alignmentGuide lets you override alignment per view",
          "Custom AlignmentID for complex multi-view alignment scenarios",
        ],
      },
      {
        format: "comparison",
        title: "GeometryReader",
        explanation: `GeometryReader is like React's ResizeObserver or measuring APIs - it reads the size and position of its container and provides dimensions to child views.`,
        react: {
          code: `// Using ResizeObserver
function ResponsiveGrid() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      setWidth(entries[0].contentRect.width);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const columns = width > 600 ? 3 : width > 400 ? 2 : 1;

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: \`repeat(\${columns}, 1fr)\`
    }}>
      {items.map(item => <Card key={item.id} item={item} />)}
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct ResponsiveGrid: View {
    let items: [Item]

    var body: some View {
        GeometryReader { geometry in
            let width = geometry.size.width
            let columns = width > 600 ? 3 : width > 400 ? 2 : 1

            LazyVGrid(
                columns: Array(repeating: GridItem(.flexible()), count: columns),
                spacing: 16
            ) {
                ForEach(items) { item in
                    Card(item: item)
                }
            }
        }
    }
}

// Reading position and frame
struct PositionReader: View {
    var body: some View {
        GeometryReader { geometry in
            VStack {
                Text("Width: \\(geometry.size.width)")
                Text("Height: \\(geometry.size.height)")
                Text("Safe area top: \\(geometry.safeAreaInsets.top)")

                // Position relative to container
                Circle()
                    .fill(Color.blue)
                    .frame(width: 50, height: 50)
                    .position(
                        x: geometry.size.width / 2,
                        y: geometry.size.height / 2
                    )
            }
        }
    }
}`,
        },
        tips: [
          "GeometryReader expands to fill available space",
          "Provides size, safe area insets, and coordinate space info",
          "Use sparingly - can cause performance issues if overused",
          "Great for responsive layouts and custom positioning",
        ],
      },
      {
        format: "comparison",
        title: "Position vs Offset",
        explanation: `SwiftUI has two ways to move views: \`.position()\` uses absolute coordinates (like CSS absolute positioning), while \`.offset()\` is relative (like CSS transform: translate).`,
        react: {
          code: `// Absolute positioning
<div style={{ position: 'relative', height: 200 }}>
  <div style={{
    position: 'absolute',
    top: 50,
    left: 100
  }}>
    At (100, 50)
  </div>
</div>

// Relative positioning with transform
<div style={{
  transform: 'translate(20px, 10px)'
}}>
  Offset from natural position
</div>

// Sticky positioning
<div style={{
  position: 'sticky',
  top: 0,
  backgroundColor: 'white'
}}>
  Sticky header
</div>

// Badge overlay
<div style={{ position: 'relative' }}>
  <button>Notifications</button>
  <span style={{
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: '50%'
  }}>
    3
  </span>
</div>`,
        },
        swiftui: {
          code: `// Absolute positioning with .position()
ZStack {
    Color.gray.opacity(0.2)

    Text("At (100, 50)")
        .position(x: 100, y: 50)
        // Position in parent's coordinate space
}
.frame(height: 200)

// Relative offset with .offset()
Text("Offset from natural position")
    .offset(x: 20, y: 10)
    // Moved from where it would naturally be placed
    // Still occupies original layout space!

// The difference:
VStack {
    Text("Top")
    Text("Middle")
        .offset(x: 0, y: 20) // Doesn't affect other views' layout
    Text("Bottom")
}

// Badge overlay (using offset)
ZStack(alignment: .topTrailing) {
    Button("Notifications") { }

    Text("3")
        .font(.caption)
        .foregroundStyle(.white)
        .padding(4)
        .background(Circle().fill(.red))
        .offset(x: 5, y: -5)
}`,
        },
        tips: [
          ".position() places view at absolute coordinates (center point)",
          ".offset() shifts view from its natural position",
          ".offset() doesn't affect layout - view still occupies original space",
          "For overlays, prefer ZStack with alignment over absolute positioning",
        ],
      },
      {
        format: "comparison",
        title: "ZIndex & Overlays",
        explanation: `Control view layering with \`.zIndex()\` and add overlays/backgrounds with built-in modifiers.`,
        react: {
          code: `// z-index for layering
<div style={{ position: 'relative' }}>
  <div style={{ zIndex: 1 }}>Behind</div>
  <div style={{ zIndex: 10 }}>In front</div>
  <div style={{ zIndex: 5 }}>Middle</div>
</div>

// Overlay pattern
<div style={{ position: 'relative' }}>
  <img src="photo.jpg" />
  <div style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, black)',
    padding: 16
  }}>
    <h3 style={{ color: 'white' }}>Title</h3>
  </div>
</div>

// Badge on image
<div style={{ position: 'relative', display: 'inline-block' }}>
  <img src="avatar.jpg" />
  <span style={{
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    background: 'green',
    borderRadius: '50%',
    border: '2px solid white'
  }} />
</div>`,
        },
        swiftui: {
          code: `// zIndex for layering (within same container)
ZStack {
    Text("Behind")
        .zIndex(1)
    Text("In front")
        .zIndex(10)
    Text("Middle")
        .zIndex(5)
}
// Higher zIndex = drawn on top

// Overlay modifier (simpler than ZStack!)
Image("photo")
    .resizable()
    .aspectRatio(contentMode: .fill)
    .frame(height: 200)
    .overlay(alignment: .bottom) {
        LinearGradient(
            colors: [.clear, .black],
            startPoint: .top,
            endPoint: .bottom
        )
        .overlay(alignment: .bottomLeading) {
            Text("Title")
                .foregroundStyle(.white)
                .padding()
        }
    }

// Badge on image with overlay
Image("avatar")
    .resizable()
    .frame(width: 100, height: 100)
    .clipShape(Circle())
    .overlay(alignment: .bottomTrailing) {
        Circle()
            .fill(.green)
            .frame(width: 12, height: 12)
            .overlay(
                Circle()
                    .stroke(.white, lineWidth: 2)
            )
    }

// Background modifier (adds layer behind)
Text("Highlighted")
    .padding()
    .background {
        RoundedRectangle(cornerRadius: 8)
            .fill(.yellow.opacity(0.3))
    }`,
        },
        tips: [
          ".zIndex() controls draw order (higher = on top)",
          ".overlay() adds content on top - cleaner than ZStack",
          ".background() adds content behind",
          "Both .overlay() and .background() accept alignment parameter",
        ],
      },
    ],
  },
  {
    id: "scroll-advanced",
    title: "Scroll & Lists Advanced",
    description: "Advanced scrolling patterns and lazy loading",
    module: "swiftui",
    category: "Layout",
    sections: [
      {
        format: "comparison",
        title: "ScrollView",
        explanation: `SwiftUI's ScrollView is like a div with overflow: scroll, but with native scrolling performance and built-in scroll indicators.`,
        react: {
          code: `// Vertical scroll
<div style={{
  height: 400,
  overflowY: 'scroll'
}}>
  {items.map(item => (
    <div key={item.id}>{item.content}</div>
  ))}
</div>

// Horizontal scroll
<div style={{
  overflowX: 'scroll',
  display: 'flex',
  gap: 16
}}>
  {photos.map(photo => (
    <img
      key={photo.id}
      src={photo.url}
      style={{ width: 200, height: 200, flexShrink: 0 }}
    />
  ))}
</div>

// Hide scrollbars
<div style={{
  overflow: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none'
}}>
  {/* content */}
</div>`,
        },
        swiftui: {
          code: `// Vertical scroll (default)
ScrollView {
    VStack(spacing: 16) {
        ForEach(items) { item in
            Text(item.content)
        }
    }
}
.frame(height: 400)

// Horizontal scroll
ScrollView(.horizontal, showsIndicators: true) {
    HStack(spacing: 16) {
        ForEach(photos) { photo in
            AsyncImage(url: photo.url) { image in
                image
                    .resizable()
                    .frame(width: 200, height: 200)
            } placeholder: {
                ProgressView()
            }
        }
    }
}

// Both axes
ScrollView([.horizontal, .vertical]) {
    // Large content
    Color.blue
        .frame(width: 2000, height: 2000)
}

// Hide scroll indicators
ScrollView(showsIndicators: false) {
    // content
}`,
        },
        tips: [
          "ScrollView(.horizontal) for horizontal scrolling",
          "showsIndicators: false hides scroll bars",
          "ScrollView renders all content immediately - use Lazy stacks for performance",
          "Content inside ScrollView should not have explicit frames (it expands)",
        ],
      },
      {
        format: "comparison",
        title: "ScrollViewReader",
        explanation: `ScrollViewReader lets you programmatically scroll to specific views - like React's scrollIntoView or imperative scroll methods.`,
        react: {
          code: `// Scroll to element
function ChatMessages({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{ height: 400, overflowY: 'scroll' }}>
      {messages.map(msg => (
        <div key={msg.id}>{msg.text}</div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

// Jump to section
function TableOfContents({ sections }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <nav>
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
        >
          {section.title}
        </button>
      ))}
    </nav>
  );
}`,
        },
        swiftui: {
          code: `// Scroll to element
struct ChatMessages: View {
    let messages: [Message]

    var body: some View {
        ScrollViewReader { proxy in
            ScrollView {
                LazyVStack {
                    ForEach(messages) { message in
                        Text(message.text)
                            .id(message.id)
                    }
                }
            }
            .onChange(of: messages.count) { old, new in
                // Scroll to last message
                if let lastId = messages.last?.id {
                    withAnimation {
                        proxy.scrollTo(lastId, anchor: .bottom)
                    }
                }
            }
        }
    }
}

// Jump to section
struct TableOfContents: View {
    let sections: [Section]

    var body: some View {
        ScrollViewReader { proxy in
            VStack {
                // Navigation buttons
                ScrollView(.horizontal) {
                    HStack {
                        ForEach(sections) { section in
                            Button(section.title) {
                                withAnimation {
                                    proxy.scrollTo(section.id, anchor: .top)
                                }
                            }
                        }
                    }
                }

                // Content
                ScrollView {
                    VStack(alignment: .leading, spacing: 20) {
                        ForEach(sections) { section in
                            SectionView(section: section)
                                .id(section.id)
                        }
                    }
                }
            }
        }
    }
}`,
        },
        tips: [
          "ScrollViewReader provides a proxy with .scrollTo(id:anchor:)",
          "Views need .id() modifier to be scrollable-to",
          "anchor: .top/.bottom/.center controls scroll position",
          "Wrap scrollTo in withAnimation for smooth scrolling",
        ],
      },
      {
        format: "comparison",
        title: "Lazy Stacks",
        explanation: `LazyVStack and LazyHStack are like React's virtualization libraries (react-window, react-virtualized) - they only render visible views for performance.`,
        react: {
          code: `// Without virtualization - renders all 10,000 items
function BadList({ items }) {
  return (
    <div style={{ height: 600, overflowY: 'scroll' }}>
      {items.map(item => (
        <div key={item.id} style={{ height: 50 }}>
          {item.title}
        </div>
      ))}
    </div>
  );
}

// With virtualization - only renders visible items
import { FixedSizeList } from 'react-window';

function GoodList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].title}
        </div>
      )}
    </FixedSizeList>
  );
}`,
        },
        swiftui: {
          code: `// Regular VStack - renders all views immediately
ScrollView {
    VStack {
        ForEach(items) { item in
            ItemRow(item: item)
        }
    }
}
// Fine for small lists, but bad for 10,000 items!

// LazyVStack - only renders visible views
ScrollView {
    LazyVStack {
        ForEach(items) { item in
            ItemRow(item: item)
                .onAppear {
                    print("Item \\(item.id) appeared")
                }
        }
    }
}
// Great performance even with 10,000+ items

// LazyHStack for horizontal scrolling
ScrollView(.horizontal) {
    LazyHStack(spacing: 16) {
        ForEach(photos) { photo in
            PhotoCard(photo: photo)
                .frame(width: 200)
        }
    }
}

// Lazy grids are also available
ScrollView {
    LazyVGrid(columns: [
        GridItem(.adaptive(minimum: 150))
    ]) {
        ForEach(items) { item in
            ItemCard(item: item)
        }
    }
}`,
        },
        tips: [
          "LazyVStack/LazyHStack only create views as they scroll into view",
          "Use for lists with 100+ items or expensive views",
          "Regular VStack for small, simple lists (< 20 items)",
          ".onAppear on lazy views fires when view enters viewport",
        ],
      },
      {
        format: "comparison",
        title: "Pull to Refresh",
        explanation: `SwiftUI's \`.refreshable\` modifier adds native pull-to-refresh - no external libraries needed.`,
        react: {
          code: `// Pull to refresh (needs library or custom impl)
import PullToRefresh from 'react-simple-pull-to-refresh';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      isPullable={true}
    >
      <div>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </PullToRefresh>
  );
}`,
        },
        swiftui: {
          code: `struct Feed: View {
    @State private var posts: [Post] = []

    var body: some View {
        List(posts) { post in
            PostCard(post: post)
        }
        .refreshable {
            // This async block runs on pull-to-refresh
            posts = await fetchPosts()
        }
        .task {
            // Initial load
            posts = await fetchPosts()
        }
    }
}

// Works with ScrollView too
struct CustomFeed: View {
    @State private var items: [Item] = []

    var body: some View {
        ScrollView {
            LazyVStack {
                ForEach(items) { item in
                    ItemRow(item: item)
                }
            }
        }
        .refreshable {
            await loadItems()
        }
    }

    func loadItems() async {
        // Simulated network delay
        try? await Task.sleep(nanoseconds: 1_000_000_000)
        items = generateItems()
    }
}`,
        },
        tips: [
          ".refreshable adds native pull-to-refresh gesture",
          "Works on List, ScrollView, and other scrollable containers",
          "Takes an async closure - automatically shows loading indicator",
          "No manual loading state needed - system handles it",
        ],
      },
    ],
  },
  {
    id: "lists",
    title: "Lists & Iteration",
    description: "map() and keys → ForEach and Identifiable",
    module: "swiftui",
    category: "Data Display",
    sections: [
      {
        format: "comparison",
        title: "Array.map() → ForEach",
        explanation: `React's pattern of mapping arrays to elements becomes SwiftUI's \`ForEach\`. The key prop becomes the \`Identifiable\` protocol or an explicit id parameter.`,
        react: {
          code: `function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

// With index
{items.map((item, index) => (
  <div key={index}>{item}</div>
))}`,
        },
        swiftui: {
          code: `struct TodoList: View {
    let todos: [Todo]

    var body: some View {
        List {
            ForEach(todos) { todo in
                Text(todo.title)
            }
        }
    }
}

// Todo must conform to Identifiable
struct Todo: Identifiable {
    let id: UUID
    let title: String
}

// Or specify id explicitly
ForEach(items, id: \\.self) { item in
    Text(item)
}`,
        },
        tips: [
          "Identifiable protocol = automatic key extraction",
          "id: \\.self uses the item itself as the key (for simple types)",
          "List adds styling and scrolling automatically",
          "ForEach is just the iteration - can use anywhere, not just in List",
        ],
      },
      {
        format: "comparison",
        title: "Conditional Rendering",
        explanation: `SwiftUI supports if/else directly in view builders - no ternary operators or && needed!`,
        react: {
          code: `function UserStatus({ isLoggedIn, user }) {
  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>Please log in</p>
      )}

      {user.isAdmin && (
        <button>Admin Panel</button>
      )}

      {user.notifications.length > 0 && (
        <Badge count={user.notifications.length} />
      )}
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct UserStatus: View {
    let isLoggedIn: Bool
    let user: User?

    var body: some View {
        VStack {
            if isLoggedIn, let user = user {
                Text("Welcome, \\(user.name)!")
            } else {
                Text("Please log in")
            }

            if user?.isAdmin == true {
                Button("Admin Panel") { }
            }

            if let count = user?.notifications.count,
               count > 0 {
                Badge(count: count)
            }
        }
    }
}`,
        },
        tips: [
          "if/else work directly in SwiftUI view builders",
          "if let safely unwraps optionals",
          "No need for ternaries or && patterns",
          "switch statements also work for multi-case conditions",
        ],
      },
      {
        format: "comparison",
        title: "List Styles",
        explanation: `SwiftUI's List has multiple built-in styles via the \`.listStyle()\` modifier - from plain flat lists to grouped/inset styles like iOS Settings.`,
        react: {
          code: `// Plain list
<ul className="list-plain">
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>

// Grouped sections (CSS styled)
<div className="grouped-list">
  <section>
    <h3>Section 1</h3>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </section>
  <section>
    <h3>Section 2</h3>
    <ul>
      <li>Item 3</li>
    </ul>
  </section>
</div>

// Sidebar-style navigation
<nav className="sidebar">
  <ul>
    {navItems.map(item => (
      <li key={item.id} className={item.active ? 'active' : ''}>
        {item.label}
      </li>
    ))}
  </ul>
</nav>`,
        },
        swiftui: {
          code: `// Plain list (no separators)
List(items) { item in
    Text(item.name)
}
.listStyle(.plain)

// Grouped style (like iOS Settings)
List {
    Section("Section 1") {
        Text("Item 1")
        Text("Item 2")
    }
    Section("Section 2") {
        Text("Item 3")
    }
}
.listStyle(.grouped)

// Inset grouped (rounded corners)
List {
    Section("Profile") {
        Text("Name")
        Text("Email")
    }
}
.listStyle(.insetGrouped)

// Sidebar style (macOS/iPadOS)
List(selection: $selectedItem) {
    ForEach(navItems) { item in
        NavigationLink(value: item) {
            Label(item.label, systemImage: item.icon)
        }
    }
}
.listStyle(.sidebar)

// Inset style (iOS 14+)
List(items) { item in
    ItemRow(item: item)
}
.listStyle(.inset)`,
        },
        tips: [
          ".listStyle(.plain) removes separators and background",
          ".listStyle(.grouped) groups sections with headers (classic iOS style)",
          ".listStyle(.insetGrouped) adds rounded corners to sections",
          ".listStyle(.sidebar) optimized for navigation on iPad/macOS",
        ],
      },
      {
        format: "comparison",
        title: "Swipe Actions",
        explanation: `SwiftUI has built-in swipe actions (like Mail's swipe-to-delete). In React, you'd need a library like react-swipeable-list.`,
        react: {
          code: `// Using react-swipeable-list
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list';

function EmailList({ emails }) {
  const leadingActions = (email) => (
    <LeadingActions>
      <SwipeAction onClick={() => markRead(email.id)}>
        Mark Read
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (email) => (
    <TrailingActions>
      <SwipeAction
        destructive
        onClick={() => deleteEmail(email.id)}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      {emails.map(email => (
        <SwipeableListItem
          key={email.id}
          leadingActions={leadingActions(email)}
          trailingActions={trailingActions(email)}
        >
          <EmailRow email={email} />
        </SwipeableListItem>
      ))}
    </SwipeableList>
  );
}`,
        },
        swiftui: {
          code: `struct EmailList: View {
    let emails: [Email]

    var body: some View {
        List(emails) { email in
            EmailRow(email: email)
                .swipeActions(edge: .leading) {
                    Button {
                        markRead(email.id)
                    } label: {
                        Label("Read", systemImage: "envelope.open")
                    }
                    .tint(.blue)
                }
                .swipeActions(edge: .trailing, allowsFullSwipe: true) {
                    Button(role: .destructive) {
                        deleteEmail(email.id)
                    } label: {
                        Label("Delete", systemImage: "trash")
                    }

                    Button {
                        archiveEmail(email.id)
                    } label: {
                        Label("Archive", systemImage: "archivebox")
                    }
                    .tint(.orange)
                }
        }
    }
}

// Multiple actions on same side
struct TaskRow: View {
    let task: Task

    var body: some View {
        Text(task.title)
            .swipeActions {
                Button("Complete") {
                    completeTask(task)
                }
                .tint(.green)

                Button("Pin") {
                    pinTask(task)
                }
                .tint(.yellow)

                Button(role: .destructive) {
                    deleteTask(task)
                }
            }
    }
}`,
        },
        tips: [
          ".swipeActions(edge:) adds swipeable buttons to list rows",
          "edge: .leading (swipe right) or .trailing (swipe left)",
          "allowsFullSwipe: true enables swipe-all-the-way-to-delete",
          ".tint() customizes button colors; role: .destructive = red",
        ],
      },
      {
        format: "comparison",
        title: "Section Headers & Footers",
        explanation: `SwiftUI's List sections have first-class support for headers and footers - no need for manual dividers or fragment tricks.`,
        react: {
          code: `// React with manual sections
function SettingsList() {
  return (
    <div>
      <div className="section">
        <h3 className="section-header">Account</h3>
        <ul>
          <li>Profile</li>
          <li>Privacy</li>
        </ul>
        <p className="section-footer">
          Your account settings are synced across devices.
        </p>
      </div>

      <div className="section">
        <h3 className="section-header">Notifications</h3>
        <ul>
          <li>Email</li>
          <li>Push</li>
        </ul>
        <p className="section-footer">
          Manage how you receive notifications.
        </p>
      </div>
    </div>
  );
}

// Or with fragments and dividers
function GroupedList({ groups }) {
  return (
    <>
      {groups.map((group, index) => (
        <Fragment key={group.id}>
          <h3>{group.title}</h3>
          {group.items.map(item => (
            <div key={item.id}>{item.name}</div>
          ))}
          {index < groups.length - 1 && <hr />}
        </Fragment>
      ))}
    </>
  );
}`,
        },
        swiftui: {
          code: `struct SettingsList: View {
    var body: some View {
        List {
            Section {
                NavigationLink("Profile") {
                    ProfileView()
                }
                NavigationLink("Privacy") {
                    PrivacyView()
                }
            } header: {
                Text("Account")
            } footer: {
                Text("Your account settings are synced across devices.")
            }

            Section {
                Toggle("Email", isOn: $emailEnabled)
                Toggle("Push", isOn: $pushEnabled)
            } header: {
                Text("Notifications")
            } footer: {
                Text("Manage how you receive notifications.")
            }
        }
    }
}

// Custom header/footer views
struct CustomSectionList: View {
    let groups: [Group]

    var body: some View {
        List {
            ForEach(groups) { group in
                Section {
                    ForEach(group.items) { item in
                        ItemRow(item: item)
                    }
                } header: {
                    HStack {
                        Image(systemName: group.icon)
                        Text(group.title)
                            .font(.headline)
                    }
                } footer: {
                    HStack {
                        Image(systemName: "info.circle")
                        Text(group.description)
                            .font(.caption)
                    }
                }
            }
        }
    }
}

// Collapsible sections (macOS)
struct CollapsibleList: View {
    var body: some View {
        List {
            Section(isExpanded: $section1Expanded) {
                Text("Item 1")
                Text("Item 2")
            } header: {
                Text("Collapsible Section")
            }
        }
    }
}`,
        },
        tips: [
          "Section { } header: { } footer: { } provides structured sections",
          "Headers/footers automatically styled based on listStyle",
          "Can use any View as header/footer, not just Text",
          "isExpanded binding makes sections collapsible (macOS)",
        ],
      },
    ],
  },
  {
    id: "data-models",
    title: "Data & Models",
    description: "Working with data structures and JSON in SwiftUI",
    module: "swiftui",
    category: "Data Display",
    sections: [
      {
        format: "comparison",
        title: "Codable",
        explanation: `Swift's \`Codable\` protocol is like TypeScript types + JSON.parse/JSON.stringify combined - it automatically encodes and decodes JSON with type safety.`,
        react: {
          code: `// TypeScript interface
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// Manual JSON parsing
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  const json = await response.json();

  // Manual validation
  return {
    id: json.id,
    name: json.name,
    email: json.email,
    createdAt: json.created_at, // Transform snake_case
  };
}

// Manual JSON encoding
function saveUser(user: User) {
  const payload = JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.createdAt, // Transform to snake_case
  });

  return fetch('/api/users', {
    method: 'POST',
    body: payload,
    headers: { 'Content-Type': 'application/json' }
  });
}`,
        },
        swiftui: {
          code: `// Codable struct - automatic JSON encoding/decoding
struct User: Codable, Identifiable {
    let id: Int
    let name: String
    let email: String
    let createdAt: Date

    // Custom JSON key mapping
    enum CodingKeys: String, CodingKey {
        case id
        case name
        case email
        case createdAt = "created_at" // Maps to snake_case
    }
}

// Automatic JSON decoding
func fetchUser(id: Int) async throws -> User {
    let url = URL(string: "https://api.example.com/users/(id)")!
    let (data, _) = try await URLSession.shared.data(from: url)

    // JSONDecoder handles everything!
    let decoder = JSONDecoder()
    decoder.dateDecodingStrategy = .iso8601
    return try decoder.decode(User.self, from: data)
}

// Automatic JSON encoding
func saveUser(_ user: User) async throws {
    let url = URL(string: "https://api.example.com/users")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")

    // JSONEncoder handles everything!
    let encoder = JSONEncoder()
    encoder.dateEncodingStrategy = .iso8601
    request.httpBody = try encoder.encode(user)

    let (_, _) = try await URLSession.shared.data(for: request)
}

// Nested Codable types
struct Post: Codable, Identifiable {
    let id: Int
    let title: String
    let author: User // Automatically encoded/decoded
    let comments: [Comment] // Arrays work too
}

struct Comment: Codable, Identifiable {
    let id: Int
    let text: String
}`,
        },
        tips: [
          "Codable = Encodable + Decodable combined",
          "CodingKeys enum maps Swift property names to JSON keys",
          "JSONDecoder/JSONEncoder handle date formatting, snake_case conversion",
          "Works with nested objects and arrays automatically",
        ],
      },
      {
        format: "comparison",
        title: "Identifiable",
        explanation: `The \`Identifiable\` protocol is SwiftUI's way of saying "this type has a unique ID" - like React's key prop, but enforced at compile time.`,
        react: {
          code: `// React relies on runtime keys
interface Todo {
  id: string; // No enforcement that this exists
  title: string;
  completed: boolean;
}

function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map(todo => (
        // Must manually pass key - easy to forget!
        <li key={todo.id}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

// Arrays without IDs require index keys (bad practice)
function SimpleList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li> // Risky!
      ))}
    </ul>
  );
}

// Custom key extraction
interface CustomItem {
  uniqueCode: string;
  name: string;
}

function CustomList({ items }: { items: CustomItem[] }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.uniqueCode}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}`,
        },
        swiftui: {
          code: `// Identifiable protocol enforces ID at compile time
struct Todo: Identifiable {
    let id: String // Required by Identifiable
    let title: String
    let completed: Bool
}

struct TodoList: View {
    let todos: [Todo]

    var body: some View {
        List(todos) { todo in
            // No key needed - Identifiable provides it!
            Text(todo.title)
        }
    }
}

// Identifiable with UUID (common pattern)
struct Post: Identifiable {
    let id = UUID() // Auto-generates unique ID
    let title: String
    let content: String
}

// Custom ID property name
struct CustomItem: Identifiable {
    var id: String { uniqueCode } // Computed property
    let uniqueCode: String
    let name: String
}

// For non-Identifiable types, use id: parameter
struct SimpleList: View {
    let items: [String]

    var body: some View {
        List(items, id: .self) { item in
            // .self uses the item itself as the ID
            Text(item)
        }
    }
}

// ForEach with explicit ID
struct CustomList: View {
    let items: [CustomItem]

    var body: some View {
        List {
            ForEach(items) { item in
                // Identifiable makes this work
                Text(item.name)
            }
        }
    }
}

// Why ForEach needs Identifiable
struct AnimatedList: View {
    @State private var items: [Todo] = []

    var body: some View {
        List {
            ForEach(items) { item in
                Text(item.title)
            }
            .onDelete { indexSet in
                items.remove(atOffsets: indexSet)
            }
        }
        .animation(.default, value: items)
        // SwiftUI uses id to track which items moved/added/removed
    }
}`,
        },
        tips: [
          "Identifiable requires an 'id' property (any Hashable type)",
          "ForEach/List use id to track items across re-renders",
          "UUID() is perfect for auto-generated unique IDs",
          "Use id: .self for simple types (String, Int) as their own key",
        ],
      },
      {
        format: "comparison",
        title: "Equatable & Hashable",
        explanation: `\`Equatable\` and \`Hashable\` are Swift's comparison protocols - like implementing === and hash functions in JavaScript, but type-safe and optimizable.`,
        react: {
          code: `// JavaScript object comparison
const user1 = { id: 1, name: 'Alice' };
const user2 = { id: 1, name: 'Alice' };

console.log(user1 === user2); // false (reference equality)
console.log(JSON.stringify(user1) === JSON.stringify(user2)); // true (hacky!)

// Custom comparison
function usersEqual(a, b) {
  return a.id === b.id && a.name === b.name;
}

// For use as Map keys, need custom implementation
const userMap = new Map();
userMap.set(JSON.stringify(user1), 'data'); // Stringify as key (hacky!)

// React.memo with custom comparison
const MemoizedUser = React.memo(
  ({ user }) => <div>{user.name}</div>,
  (prevProps, nextProps) => {
    // Custom equality check
    return prevProps.user.id === nextProps.user.id &&
           prevProps.user.name === nextProps.user.name;
  }
);

// Array operations require manual comparison
function removeDuplicates(users) {
  return users.filter((user, index, self) =>
    self.findIndex(u => u.id === user.id) === index
  );
}`,
        },
        swiftui: {
          code: `// Equatable: value-based equality
struct User: Equatable {
    let id: Int
    let name: String
}

let user1 = User(id: 1, name: "Alice")
let user2 = User(id: 1, name: "Alice")

print(user1 == user2) // true (automatic value comparison!)

// Hashable: can be used in Sets and Dictionary keys
struct User: Hashable {
    let id: Int
    let name: String
}

var userSet = Set<User>()
userSet.insert(user1)
userSet.insert(user2) // Won't add duplicate

var userDict = [User: String]()
userDict[user1] = "data"

// Custom Equatable implementation
struct Person: Equatable {
    let id: Int
    let name: String
    let age: Int

    // Only compare by ID
    static func == (lhs: Person, rhs: Person) -> Bool {
        lhs.id == rhs.id
    }
}

// Automatic synthesis for structs
struct Product: Equatable, Hashable {
    let id: String
    let name: String
    let price: Double
}
// Swift auto-generates == and hash(into:)!

// Why it matters in SwiftUI
struct ContentView: View {
    @State private var users: [User] = []

    var body: some View {
        List(users) { user in
            UserRow(user: user)
        }
        .onChange(of: users) { old, new in
            // Equatable lets SwiftUI compare arrays efficiently
            if old != new {
                print("Users changed!")
            }
        }
    }
}

// Removing duplicates is built-in
let uniqueUsers = Array(Set(users)) // Works because User is Hashable

// Equatable + @State optimization
struct SettingsView: View {
    @State private var settings: Settings // Equatable

    var body: some View {
        Form { /* ... */ }
            .onChange(of: settings) { old, new in
                // Only fires if settings actually changed
                save(new)
            }
    }
}`,
        },
        tips: [
          "Equatable enables == comparison (value equality)",
          "Hashable enables use in Set and Dictionary (requires Equatable)",
          "Swift auto-synthesizes for structs with Equatable/Hashable properties",
          "SwiftUI uses Equatable to avoid unnecessary re-renders",
        ],
      },
      {
        format: "comparison",
        title: "Property Observers",
        explanation: `Swift's \`didSet\` and \`willSet\` are like useEffect for watching specific properties - they run automatically when a value changes, without manual dependency arrays.`,
        react: {
          code: `// React with useEffect
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  // Watch for userId changes
  useEffect(() => {
    console.log('User ID changed:', userId);
    fetchUser(userId).then(setUser);
  }, [userId]);

  // Watch for name changes
  useEffect(() => {
    console.log('Name changed:', name);
    if (name.length > 0) {
      validateName(name);
    }
  }, [name]);

  // Watch for user changes
  useEffect(() => {
    if (user) {
      console.log('User loaded:', user.name);
      trackUserView(user.id);
    }
  }, [user]);

  return (
    <div>
      <h1>{user?.name}</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>
  );
}

// Class-based with setter
class Settings {
  private _volume = 0.5;

  get volume() {
    return this._volume;
  }

  set volume(value) {
    console.log(\`Volume changing from \${this._volume} to \${value}\`);
    this._volume = value;
    this.saveToStorage();
  }
}`,
        },
        swiftui: {
          code: `// In SwiftUI views, use .onChange instead of didSet/willSet
// (Property observers don't work on @State properties)
struct UserProfile: View {
    let userId: String
    @State private var user: User?
    @State private var name = ""

    var body: some View {
        VStack {
            Text(user?.name ?? "Loading...")
            TextField("Name", text: $name)
        }
        .task(id: userId) {
            // Runs when userId changes (like useEffect)
            print("User ID changed: \\(userId)")
            user = await fetchUser(userId)
        }
        .onChange(of: name) { oldValue, newValue in
            // Runs after name changes
            print("Name changed from \\(oldValue) to \\(newValue)")
            if !newValue.isEmpty {
                validateName(newValue)
            }
        }
        .onChange(of: user) { old, new in
            // Runs when user changes
            if let user = new {
                print("User loaded: \\(user.name)")
                trackUserView(user.id)
            }
        }
    }
}

// Property observers DO work in @Observable classes
@Observable
class Settings {
    var volume: Double = 0.5 {
        didSet {
            print("Volume changed from \\(oldValue) to \\(volume)")
            saveToStorage()

            // Prevent invalid values
            if volume > 1.0 {
                volume = 1.0
            }
        }
    }

    var isMuted: Bool = false {
        didSet {
            if isMuted {
                previousVolume = volume
                volume = 0
            } else {
                volume = previousVolume
            }
        }
    }

    private var previousVolume: Double = 0.5

    private func saveToStorage() {
        UserDefaults.standard.set(volume, forKey: "volume")
    }
}

// Debouncing with @Observable + didSet
@Observable
class SearchViewModel {
    var searchQuery: String = "" {
        didSet {
            // Debounce search
            searchDebounceTask?.cancel()
            searchDebounceTask = Task {
                try? await Task.sleep(for: .milliseconds(300))
                await performSearch(query: searchQuery)
            }
        }
    }

    private var searchDebounceTask: Task<Void, Never>?

    var items: [Item] = [] {
        didSet {
            print("Items updated: \\(items.count) items")
            lastUpdateTime = Date()
        }
    }

    private var lastUpdateTime = Date()

    func performSearch(query: String) async {
        // Search implementation
    }
}`,
        },
        tips: [
          "In SwiftUI views: use .onChange(of:) instead of didSet/willSet",
          "In @Observable classes: didSet/willSet work normally",
          "didSet has oldValue available, willSet has newValue",
          "For debouncing in views, combine .onChange with Task",
        ],
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation & Routing",
    description: "React Router concepts → NavigationStack",
    module: "swiftui",
    category: "Navigation",
    sections: [
      {
        format: "comparison",
        title: "React Router → NavigationStack",
        explanation: `SwiftUI uses a stack-based navigation model. Instead of routes and URLs, you push/pop views onto a navigation stack.`,
        react: {
          code: `// React Router setup
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users" element={<UserList />} />
    <Route path="/users/:id" element={<UserDetail />} />
  </Routes>
</BrowserRouter>

// Navigation
function UserList() {
  const navigate = useNavigate();

  return (
    <ul>
      {users.map(user => (
        <li
          key={user.id}
          onClick={() => navigate(\`/users/\${user.id}\`)}
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
}`,
        },
        swiftui: {
          code: `// NavigationStack setup
struct ContentView: View {
    var body: some View {
        NavigationStack {
            UserList()
        }
    }
}

// Navigation with NavigationLink
struct UserList: View {
    let users: [User]

    var body: some View {
        List(users) { user in
            NavigationLink(value: user) {
                Text(user.name)
            }
        }
        .navigationDestination(for: User.self) { user in
            UserDetail(user: user)
        }
    }
}`,
        },
        tips: [
          "NavigationStack wraps your navigable content",
          "NavigationLink is like a <Link> that pushes a view",
          ".navigationDestination defines what view to show for a type",
          "No URL strings - navigation is type-safe!",
        ],
      },
      {
        format: "comparison",
        title: "Modals & Sheets",
        explanation: `React typically uses state + portal for modals. SwiftUI has built-in .sheet() and .fullScreenCover() modifiers.`,
        react: {
          code: `function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Modal Content</h1>
          <button onClick={() => setShowModal(false)}>
            Close
          </button>
        </Modal>
      )}

      {selectedItem && (
        <Modal onClose={() => setSelectedItem(null)}>
          <ItemDetail item={selectedItem} />
        </Modal>
      )}
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct ContentView: View {
    @State private var showModal = false
    @State private var selectedItem: Item?

    var body: some View {
        VStack {
            Button("Open Modal") {
                showModal = true
            }
        }
        // Boolean-triggered sheet
        .sheet(isPresented: $showModal) {
            VStack {
                Text("Modal Content")
                    .font(.title)
                Button("Close") {
                    showModal = false
                }
            }
        }
        // Item-triggered sheet (like selectedItem pattern)
        .sheet(item: $selectedItem) { item in
            ItemDetail(item: item)
        }
    }
}`,
        },
        tips: [
          ".sheet(isPresented:) for boolean-controlled modals",
          ".sheet(item:) for optional-item-controlled modals (auto-dismisses when nil)",
          ".fullScreenCover() for full-screen modals",
          "Sheets automatically handle dismiss gestures",
        ],
      },
      {
        format: "comparison",
        title: "NavigationPath",
        explanation: `NavigationPath is SwiftUI's programmatic navigation API - like React Router's \`navigate()\` or \`push()\` for building navigation flows.`,
        react: {
          code: `// React Router programmatic navigation
function OnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) {
      navigate('/onboarding/profile');
    } else if (step === 2) {
      navigate('/onboarding/preferences');
    } else {
      navigate('/home');
    }
  };

  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <div>
      <h1>Step {step}</h1>
      <button onClick={handleNext}>Next</button>
      <button onClick={handleSkip}>Skip</button>
    </div>
  );
}

// Deep link navigation
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const deepLinkUrl = getDeepLinkFromUrl();
    if (deepLinkUrl) {
      navigate(deepLinkUrl);
    }
  }, []);
}`,
        },
        swiftui: {
          code: `// Programmatic navigation with NavigationPath
struct OnboardingFlow: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            OnboardingStart(path: $path)
                .navigationDestination(for: OnboardingStep.self) { step in
                    switch step {
                    case .profile:
                        ProfileSetup(path: $path)
                    case .preferences:
                        PreferencesSetup(path: $path)
                    case .complete:
                        CompletionView()
                    }
                }
        }
    }
}

struct OnboardingStart: View {
    @Binding var path: NavigationPath

    var body: some View {
        VStack {
            Text("Welcome!")
            Button("Start") {
                path.append(OnboardingStep.profile)
            }
            Button("Skip") {
                // Pop to root
                path = NavigationPath()
            }
        }
    }
}

// Pushing multiple screens at once
struct DeepLinkHandler: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            HomeView()
                .navigationDestination(for: User.self) { user in
                    UserProfile(user: user)
                }
                .navigationDestination(for: Post.self) { post in
                    PostDetail(post: post)
                }
                .onOpenURL { url in
                    // Handle deep link: app://user/123/post/456
                    if let user = parseUser(from: url),
                       let post = parsePost(from: url) {
                        path.append(user)
                        path.append(post)
                    }
                }
        }
    }
}

// Navigation path operations
struct NavigationControls: View {
    @Binding var path: NavigationPath

    var body: some View {
        VStack {
            Button("Go Back") {
                if !path.isEmpty {
                    path.removeLast()
                }
            }

            Button("Pop to Root") {
                path = NavigationPath()
            }

            Text("Stack depth: \\(path.count)")
        }
    }
}`,
        },
        tips: [
          "NavigationPath is a type-erased array of navigation destinations",
          "path.append(value) pushes a new view onto the stack",
          "path.removeLast() pops the top view (like goBack)",
          "path = NavigationPath() resets to root (like navigate('/', { replace: true }))",
        ],
      },
      {
        format: "comparison",
        title: "Deep Linking",
        explanation: `SwiftUI's \`.onOpenURL\` modifier handles deep links and universal links - like React Router's URL parsing but with native OS integration.`,
        react: {
          code: `// React Router with URL parsing
function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle query params: /app?action=view&id=123
    const params = new URLSearchParams(location.search);
    const action = params.get('action');
    const id = params.get('id');

    if (action === 'view' && id) {
      navigate(\`/items/\${id}\`);
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items/:id" element={<ItemDetail />} />
      <Route path="/share/:token" element={<SharedContent />} />
    </Routes>
  );
}

// Deep link from external sources
// URL: myapp://user/123
window.addEventListener('message', (event) => {
  if (event.data.type === 'deeplink') {
    const url = new URL(event.data.url);
    const path = url.pathname;
    navigate(path);
  }
});`,
        },
        swiftui: {
          code: `struct ContentView: View {
    @State private var path = NavigationPath()
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            NavigationStack(path: $path) {
                HomeView()
                    .navigationDestination(for: Item.self) { item in
                        ItemDetail(item: item)
                    }
                    .navigationDestination(for: User.self) { user in
                        UserProfile(user: user)
                    }
            }
            .tabItem {
                Label("Home", systemImage: "house")
            }
            .tag(0)

            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gear")
                }
                .tag(1)
        }
        .onOpenURL { url in
            handleDeepLink(url)
        }
    }

    func handleDeepLink(_ url: URL) {
        // Handle URL schemes:
        // myapp://item/123
        // myapp://user/456
        // https://myapp.com/share/abc123

        guard let components = URLComponents(url: url, resolvingAgainstBaseURL: true) else {
            return
        }

        let pathComponents = components.path.split(separator: "/")

        switch pathComponents.first {
        case "item":
            if let idString = pathComponents.dropFirst().first,
               let id = Int(idString) {
                selectedTab = 0
                path.append(Item(id: id))
            }

        case "user":
            if let idString = pathComponents.dropFirst().first,
               let id = Int(idString) {
                selectedTab = 0
                path.append(User(id: id))
            }

        case "share":
            if let token = pathComponents.dropFirst().first {
                // Handle shared content
                selectedTab = 0
                // Push shared content view
            }

        default:
            break
        }

        // Handle query parameters
        if let queryItems = components.queryItems {
            for item in queryItems {
                if item.name == "highlight", let value = item.value {
                    // Handle highlight parameter
                }
            }
        }
    }
}

// Register URL schemes in Info.plist:
// <key>CFBundleURLTypes</key>
// <array>
//   <dict>
//     <key>CFBundleURLSchemes</key>
//     <array>
//       <string>myapp</string>
//     </array>
//   </dict>
// </array>`,
        },
        tips: [
          ".onOpenURL runs when app opens via custom URL scheme or universal link",
          "URLComponents helps parse paths and query parameters",
          "Can navigate to multiple screens by appending to NavigationPath",
          "Also works for handling shared content and Shortcuts app integration",
        ],
      },
      {
        format: "comparison",
        title: "Tab Navigation",
        explanation: `SwiftUI's TabView creates bottom tab navigation (like iOS apps) - similar to React tab component libraries or React Navigation's bottom tabs.`,
        react: {
          code: `// React with react-tabs or custom tabs
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

function AppTabs() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
      <TabList>
        <Tab>Home</Tab>
        <Tab>Search</Tab>
        <Tab>Profile</Tab>
      </TabList>

      <TabPanel>
        <Home />
      </TabPanel>
      <TabPanel>
        <Search />
      </TabPanel>
      <TabPanel>
        <Profile />
      </TabPanel>
    </Tabs>
  );
}

// Mobile-style bottom nav
function BottomNav() {
  const [active, setActive] = useState('home');

  return (
    <div className="app">
      <div className="content">
        {active === 'home' && <Home />}
        {active === 'search' && <Search />}
        {active === 'profile' && <Profile />}
      </div>

      <nav className="bottom-nav">
        <button
          className={active === 'home' ? 'active' : ''}
          onClick={() => setActive('home')}
        >
          Home
        </button>
        <button
          className={active === 'search' ? 'active' : ''}
          onClick={() => setActive('search')}
        >
          Search
        </button>
        <button
          className={active === 'profile' ? 'active' : ''}
          onClick={() => setActive('profile')}
        >
          Profile
        </button>
      </nav>
    </div>
  );
}`,
        },
        swiftui: {
          code: `// Bottom tab navigation (iOS style)
struct AppTabs: View {
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            NavigationStack {
                HomeView()
            }
            .tabItem {
                Label("Home", systemImage: "house")
            }
            .tag(0)

            NavigationStack {
                SearchView()
            }
            .tabItem {
                Label("Search", systemImage: "magnifyingglass")
            }
            .tag(1)

            NavigationStack {
                ProfileView()
            }
            .tabItem {
                Label("Profile", systemImage: "person.circle")
            }
            .tag(2)
        }
    }
}

// Tab with badge (notification count)
struct TabsWithBadge: View {
    @State private var notificationCount = 3

    var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Label("Home", systemImage: "house")
                }

            MessagesView()
                .tabItem {
                    Label("Messages", systemImage: "message")
                }
                .badge(notificationCount)
        }
    }
}

// Programmatically switch tabs
struct ControlledTabs: View {
    @State private var selectedTab = 0

    var body: some View {
        VStack {
            // Buttons to control tabs
            HStack {
                Button("Home") { selectedTab = 0 }
                Button("Search") { selectedTab = 1 }
                Button("Profile") { selectedTab = 2 }
            }

            TabView(selection: $selectedTab) {
                Text("Home")
                    .tag(0)
                Text("Search")
                    .tag(1)
                Text("Profile")
                    .tag(2)
            }
            .tabViewStyle(.page) // Swipeable pages instead of tabs
        }
    }
}

// Custom tab appearance (iOS 16+)
struct StyledTabs: View {
    var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Label("Home", systemImage: "house.fill")
                }

            SearchView()
                .tabItem {
                    Label("Search", systemImage: "magnifyingglass")
                }
        }
        .tint(.purple) // Accent color for selected tab
    }
}`,
        },
        tips: [
          "TabView creates iOS-style bottom tab navigation",
          ".tag() identifies each tab (use with selection binding)",
          ".badge() shows notification counts on tab items",
          ".tabViewStyle(.page) turns tabs into swipeable pages",
        ],
      },
    ],
  },
  {
    id: "forms",
    title: "Forms & Inputs",
    description: "Controlled components → Two-way binding",
    module: "swiftui",
    category: "Forms",
    sections: [
      {
        format: "comparison",
        title: "Controlled Inputs → TextField",
        explanation: `React's controlled component pattern with value + onChange becomes simple two-way binding with $variable in SwiftUI.`,
        react: {
          code: `function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        Remember me
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}`,
        },
        swiftui: {
          code: `struct LoginForm: View {
    @State private var email = ""
    @State private var password = ""
    @State private var rememberMe = false

    var body: some View {
        Form {
            TextField("Email", text: $email)
                .textContentType(.emailAddress)
                .keyboardType(.emailAddress)

            SecureField("Password", text: $password)
                .textContentType(.password)

            Toggle("Remember me", isOn: $rememberMe)

            Button("Log In") {
                handleSubmit()
            }
        }
    }
}`,
        },
        tips: [
          "The $ prefix creates a two-way binding automatically",
          "SecureField is the password input equivalent",
          "Toggle replaces checkbox inputs",
          "Form adds automatic styling and grouping",
          ".textContentType helps with autofill",
        ],
      },
      {
        format: "comparison",
        title: "Select/Dropdown → Picker",
        explanation: `HTML select elements become SwiftUI Pickers. There are multiple styles available.`,
        react: {
          code: `function Settings() {
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState(16);

  return (
    <div>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>

      <input
        type="range"
        min={12}
        max={24}
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
      />
      <span>{fontSize}px</span>
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct Settings: View {
    @State private var theme = "system"
    @State private var fontSize: Double = 16

    var body: some View {
        Form {
            // Dropdown picker
            Picker("Theme", selection: $theme) {
                Text("Light").tag("light")
                Text("Dark").tag("dark")
                Text("System").tag("system")
            }

            // Segmented control style
            Picker("Theme", selection: $theme) {
                Text("Light").tag("light")
                Text("Dark").tag("dark")
            }
            .pickerStyle(.segmented)

            // Slider for range input
            VStack {
                Slider(value: $fontSize, in: 12...24, step: 1)
                Text("\\(Int(fontSize))px")
            }
        }
    }
}`,
        },
        tips: [
          ".tag() must match the type of selection binding",
          "Picker has multiple styles: .menu, .segmented, .wheel",
          "Slider is the range input equivalent",
          "Stepper is great for integer increment/decrement",
        ],
      },
      {
        format: "comparison",
        title: "Form Validation",
        explanation: `React often uses form libraries like react-hook-form or Formik for validation. SwiftUI uses computed properties and conditional UI to show validation errors inline.`,
        react: {
          code: `function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.includes('@')) {
      newErrors.email = 'Invalid email address';
    }
    if (password.length < 8) {
      newErrors.password = 'Password must be 8+ characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <button type="submit">Sign Up</button>
    </form>
  );
}`,
        },
        swiftui: {
          code: `struct SignupForm: View {
    @State private var email = ""
    @State private var password = ""
    @State private var showErrors = false

    var emailError: String? {
        guard showErrors else { return nil }
        return email.contains("@") ? nil : "Invalid email address"
    }

    var passwordError: String? {
        guard showErrors else { return nil }
        return password.count >= 8 ? nil : "Password must be 8+ characters"
    }

    var isValid: Bool {
        email.contains("@") && password.count >= 8
    }

    var body: some View {
        Form {
            Section {
                TextField("Email", text: $email)
                    .textContentType(.emailAddress)
                    .keyboardType(.emailAddress)
                if let error = emailError {
                    Text(error)
                        .foregroundStyle(.red)
                        .font(.caption)
                }
            }

            Section {
                SecureField("Password", text: $password)
                if let error = passwordError {
                    Text(error)
                        .foregroundStyle(.red)
                        .font(.caption)
                }
            }

            Button("Sign Up") {
                showErrors = true
                if isValid {
                    handleSubmit()
                }
            }
            .disabled(!isValid && showErrors)
        }
    }
}`,
        },
        tips: [
          "Use computed properties for validation logic instead of separate state",
          "showErrors flag prevents showing errors before user submits",
          "Conditional if statements in SwiftUI make inline errors clean",
          ".disabled() modifier can prevent submission of invalid forms",
        ],
      },
      {
        format: "comparison",
        title: "Focus Management",
        explanation: `React uses useRef() and .focus() to control input focus. SwiftUI uses the @FocusState property wrapper for declarative focus control.`,
        react: {
          code: `function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const handleUsernameSubmit = (e) => {
    if (e.key === 'Enter') {
      passwordRef.current?.focus();
    }
  };

  useEffect(() => {
    // Auto-focus username on mount
    document.querySelector('input[type="text"]')?.focus();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleUsernameSubmit}
        placeholder="Username"
      />
      <input
        ref={passwordRef}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct LoginForm: View {
    @State private var username = ""
    @State private var password = ""
    @FocusState private var focusedField: Field?

    enum Field: Hashable {
        case username
        case password
    }

    var body: some View {
        Form {
            TextField("Username", text: $username)
                .focused($focusedField, equals: .username)
                .onSubmit {
                    focusedField = .password
                }

            SecureField("Password", text: $password)
                .focused($focusedField, equals: .password)
                .onSubmit {
                    handleLogin()
                }
        }
        .onAppear {
            focusedField = .username
        }
    }
}`,
        },
        tips: [
          "@FocusState uses an enum to represent which field is focused",
          ".focused() modifier binds field focus to the enum value",
          ".onSubmit runs when user presses return key",
          "Set focus programmatically by assigning to the @FocusState variable",
        ],
      },
      {
        format: "comparison",
        title: "Keyboard Handling",
        explanation: `React uses input attributes like type and pattern. SwiftUI provides modifiers like .keyboardType(), .textContentType(), and .submitLabel() to customize keyboard appearance and behavior.`,
        react: {
          code: `function ContactForm() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        pattern="[0-9]*"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="url"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Website"
      />

      <button type="submit">Submit</button>
    </form>
  );
}`,
        },
        swiftui: {
          code: `struct ContactForm: View {
    @State private var phone = ""
    @State private var email = ""
    @State private var website = ""
    @FocusState private var focusedField: Field?

    enum Field { case phone, email, website }

    var body: some View {
        Form {
            TextField("Phone", text: $phone)
                .keyboardType(.phonePad)
                .textContentType(.telephoneNumber)
                .focused($focusedField, equals: .phone)

            TextField("Email", text: $email)
                .keyboardType(.emailAddress)
                .textContentType(.emailAddress)
                .autocapitalization(.none)
                .focused($focusedField, equals: .email)
                .submitLabel(.next)
                .onSubmit { focusedField = .website }

            TextField("Website", text: $website)
                .keyboardType(.URL)
                .textContentType(.URL)
                .autocapitalization(.none)
                .focused($focusedField, equals: .website)
                .submitLabel(.done)
                .onSubmit {
                    focusedField = nil // Dismiss keyboard
                    handleSubmit()
                }
        }
    }
}`,
        },
        tips: [
          ".keyboardType() shows optimized keyboards (e.g., .phonePad, .numberPad)",
          ".submitLabel() customizes the return key (.done, .next, .go, .search)",
          ".autocapitalization(.none) is important for email/URL fields",
          "Set focusedField to nil to dismiss the keyboard programmatically",
        ],
      },
    ],
  },
  {
    id: "pickers-selection",
    title: "Pickers & Selection",
    description: "Date, color, photo pickers and context menus",
    module: "swiftui",
    category: "Forms",
    sections: [
      {
        format: "comparison",
        title: "DatePicker",
        explanation: `HTML's input type="date" becomes SwiftUI's DatePicker with rich customization options for displaying date, time, or both.`,
        react: {
          code: `function EventForm() {
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <form>
      <label>
        Event Date
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </label>

      <label>
        Event Time
        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
      </label>

      <label>
        Date Range
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        to
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
    </form>
  );
}`,
        },
        swiftui: {
          code: `struct EventForm: View {
    @State private var eventDate = Date()
    @State private var startDate = Date()
    @State private var endDate = Date()

    var body: some View {
        Form {
            // Date only
            DatePicker(
                "Event Date",
                selection: $eventDate,
                displayedComponents: .date
            )

            // Time only
            DatePicker(
                "Event Time",
                selection: $eventDate,
                displayedComponents: .hourAndMinute
            )

            // Date and time (default)
            DatePicker(
                "Event Date & Time",
                selection: $eventDate
            )

            // Date range with constraints
            DatePicker(
                "Start Date",
                selection: $startDate,
                in: Date()...,
                displayedComponents: .date
            )

            DatePicker(
                "End Date",
                selection: $endDate,
                in: startDate...,
                displayedComponents: .date
            )
        }
    }
}`,
        },
        tips: [
          "SwiftUI's Date type is more powerful than HTML date strings",
          "Use displayedComponents to show date, time, or both",
          "The in: parameter constrains selectable dates (e.g., Date()... for future only)",
          "DatePicker automatically formats dates based on user's locale",
        ],
      },
      {
        format: "comparison",
        title: "ColorPicker",
        explanation: `HTML's input type="color" maps to SwiftUI's ColorPicker, which provides a native color selection interface.`,
        react: {
          code: `function ThemeEditor() {
  const [primaryColor, setPrimaryColor] = useState('#007AFF');
  const [accentColor, setAccentColor] = useState('#FF3B30');
  const [showAlpha, setShowAlpha] = useState(false);

  return (
    <div>
      <label>
        Primary Color
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
        <span>{primaryColor}</span>
      </label>

      <label>
        Accent Color
        <input
          type="color"
          value={accentColor}
          onChange={(e) => setAccentColor(e.target.value)}
        />
        <span>{accentColor}</span>
      </label>

      <label>
        <input
          type="checkbox"
          checked={showAlpha}
          onChange={(e) => setShowAlpha(e.target.checked)}
        />
        Enable transparency
      </label>
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct ThemeEditor: View {
    @State private var primaryColor = Color.blue
    @State private var accentColor = Color.red
    @State private var supportsOpacity = false

    var body: some View {
        Form {
            // Basic color picker
            ColorPicker("Primary Color", selection: $primaryColor)

            // Color picker with opacity control
            ColorPicker(
                "Accent Color",
                selection: $accentColor,
                supportsOpacity: supportsOpacity
            )

            Toggle("Enable Transparency", isOn: $supportsOpacity)

            // Preview colors
            Section("Preview") {
                HStack {
                    Circle()
                        .fill(primaryColor)
                        .frame(width: 50, height: 50)

                    Circle()
                        .fill(accentColor)
                        .frame(width: 50, height: 50)
                }
            }
        }
    }
}`,
        },
        tips: [
          "ColorPicker works with SwiftUI's Color type, not hex strings",
          "Set supportsOpacity: true to enable alpha channel control",
          "Colors automatically sync with system dark mode settings",
          "Use Color extensions to convert to/from hex if needed",
        ],
      },
      {
        format: "comparison",
        title: "PhotosPicker",
        explanation: `React web apps use input type="file" with accept="image/*". SwiftUI provides PhotosPicker from PhotosUI framework for native photo library access. This is iOS-specific with no direct web equivalent.`,
        react: {
          code: `function ProfileEditor() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: 200, height: 200 }}
        />
      )}
    </div>
  );
}`,
        },
        swiftui: {
          code: `import PhotosUI

struct ProfileEditor: View {
    @State private var selectedItem: PhotosPickerItem?
    @State private var selectedImage: Image?

    var body: some View {
        VStack {
            // Photo picker button
            PhotosPicker(
                selection: $selectedItem,
                matching: .images
            ) {
                Label("Select Photo", systemImage: "photo")
            }

            // Display selected image
            if let selectedImage {
                selectedImage
                    .resizable()
                    .scaledToFit()
                    .frame(width: 200, height: 200)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
            }
        }
        .onChange(of: selectedItem) {
            Task {
                if let data = try? await selectedItem?.loadTransferable(type: Data.self),
                   let uiImage = UIImage(data: data) {
                    selectedImage = Image(uiImage: uiImage)
                }
            }
        }
    }
}`,
        },
        tips: [
          "PhotosPicker requires import PhotosUI framework",
          "Use matching: parameter to filter by .images, .videos, or .screenshots",
          "Loading images is async with loadTransferable(type:)",
          "For multiple selection, use PhotosPickerItem array binding",
        ],
      },
      {
        format: "comparison",
        title: "Menu & Context Menu",
        explanation: `React uses select elements or dropdown libraries for menus. SwiftUI has Menu for explicit dropdown actions and .contextMenu() for right-click/long-press menus.`,
        react: {
          code: `function DocumentActions() {
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    // Show custom context menu
    setShowMenu(true);
  };

  return (
    <div>
      {/* Dropdown menu */}
      <select onChange={(e) => handleAction(e.target.value)}>
        <option value="">Actions</option>
        <option value="share">Share</option>
        <option value="duplicate">Duplicate</option>
        <option value="delete">Delete</option>
      </select>

      {/* Context menu simulation */}
      <div
        onContextMenu={handleContextMenu}
        className="document"
      >
        Right-click me
        {showMenu && (
          <div className="context-menu">
            <button onClick={() => handleShare()}>Share</button>
            <button onClick={() => handleDuplicate()}>Duplicate</button>
            <button onClick={() => handleDelete()}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct DocumentActions: View {
    var body: some View {
        VStack {
            // Dropdown Menu
            Menu("Actions") {
                Button("Share", systemImage: "square.and.arrow.up") {
                    handleShare()
                }

                Button("Duplicate", systemImage: "doc.on.doc") {
                    handleDuplicate()
                }

                Divider()

                Button("Delete", systemImage: "trash", role: .destructive) {
                    handleDelete()
                }
            }

            // Context Menu (long-press or right-click)
            Text("Long-press me")
                .padding()
                .background(Color.gray.opacity(0.2))
                .contextMenu {
                    Button("Share", systemImage: "square.and.arrow.up") {
                        handleShare()
                    }

                    Button("Duplicate", systemImage: "doc.on.doc") {
                        handleDuplicate()
                    }

                    Divider()

                    Button("Delete", systemImage: "trash", role: .destructive) {
                        handleDelete()
                    }
                }
        }
    }
}`,
        },
        tips: [
          "Menu shows an explicit button that opens when tapped",
          ".contextMenu() adds long-press or right-click menu to any view",
          "Use role: .destructive for delete actions (shows red)",
          "systemImage: adds SF Symbols icons to menu items",
        ],
      },
    ],
  },
  {
    id: "context",
    title: "Global State & Context",
    description: "Context API → Environment and ObservableObject",
    module: "swiftui",
    category: "State",
    sections: [
      {
        format: "comparison",
        title: "Context API → @Environment",
        explanation: `React's Context API becomes SwiftUI's Environment. System values like color scheme are automatically available.`,
        react: {
          code: `// Create context
const ThemeContext = createContext('light');

// Provider
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <MainContent />
    </ThemeContext.Provider>
  );
}

// Consumer
function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button className={\`btn-\${theme}\`}>
      Click me
    </button>
  );
}`,
        },
        swiftui: {
          code: `// System environment values (built-in)
struct ThemedButton: View {
    @Environment(\\.colorScheme) var colorScheme

    var body: some View {
        Button("Click me") { }
            .background(
                colorScheme == .dark ? Color.gray : Color.white
            )
    }
}

// Custom environment values
struct ContentView: View {
    var body: some View {
        MainContent()
            .environment(\\.myCustomValue, "hello")
    }
}`,
        },
        tips: [
          "Many values are built-in: colorScheme, locale, sizeCategory",
          "@Environment reads values from ancestor views",
          "Custom environment values require defining an EnvironmentKey",
          "Environment is great for dependency injection",
        ],
      },
      {
        format: "comparison",
        title: "Global State → @Observable",
        explanation: `For app-wide state (like Redux or Zustand), SwiftUI uses @Observable classes. Views automatically update when observed properties change.`,
        react: {
          code: `// Zustand store
const useStore = create((set) => ({
  user: null,
  cart: [],
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item]
    })),
  login: (user) => set({ user }),
}));

// Component
function CartButton() {
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);

  return (
    <button onClick={() => addToCart(item)}>
      Add to Cart ({cart.length})
    </button>
  );
}`,
        },
        swiftui: {
          code: `// Observable class (iOS 17+)
@Observable
class Store {
    var user: User?
    var cart: [Item] = []

    func addToCart(_ item: Item) {
        cart.append(item)
    }

    func login(_ user: User) {
        self.user = user
    }
}

// Inject at app level
@main
struct MyApp: App {
    @State private var store = Store()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(store)
        }
    }
}

// Use in any view
struct CartButton: View {
    @Environment(Store.self) var store

    var body: some View {
        Button("Add to Cart (\\(store.cart.count))") {
            store.addToCart(item)
        }
    }
}`,
        },
        tips: [
          "@Observable (iOS 17+) is simpler than ObservableObject - now the standard approach",
          "Views only re-render when properties they READ change (fine-grained reactivity)",
          "Inject with .environment(), read with @Environment",
          "iOS 26 further optimizes @Observable with the rebuilt rendering pipeline",
        ],
      },
      {
        format: "comparison",
        title: "Dependency Injection",
        explanation: `SwiftUI's \`.environment()\` modifier is perfect for dependency injection. Pass services down the view hierarchy without prop drilling.`,
        react: {
          code: `// Context-based DI
const ApiContext = createContext(null);

function App() {
  const api = new ApiService();

  return (
    <ApiContext.Provider value={api}>
      <Dashboard />
    </ApiContext.Provider>
  );
}

// Deep component
function UserProfile() {
  const api = useContext(ApiContext);

  const fetchUser = async () => {
    const data = await api.getUser();
    // ...
  };

  return <div>Profile</div>;
}`,
        },
        swiftui: {
          code: `// Define your service
class ApiService {
    func getUser() async throws -> User {
        // network call
    }
}

// Inject at app level
@main
struct MyApp: App {
    let api = ApiService()

    var body: some Scene {
        WindowGroup {
            Dashboard()
                .environment(api)
        }
    }
}

// Access anywhere in the hierarchy
struct UserProfile: View {
    @Environment(ApiService.self) var api
    @State private var user: User?

    var body: some View {
        Text("Profile")
            .task {
                user = try? await api.getUser()
            }
    }
}`,
        },
        tips: [
          ".environment() injects any type - not just @Observable classes",
          "Perfect for mock services in tests and previews",
          "Common pattern: create protocol, inject different implementations",
          "No need for singleton pattern when using environment",
        ],
      },
      {
        format: "comparison",
        title: "@Observable Patterns",
        explanation: `The @Observable macro creates observable stores. Combined with SwiftData's \`ModelContainer\`, you get powerful state management patterns.`,
        react: {
          code: `// Zustand with persistence
const useStore = create(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (text) =>
        set({ todos: [...get().todos, { id: Date.now(), text }] }),
      removeTodo: (id) =>
        set({ todos: get().todos.filter(t => t.id !== id) }),
    }),
    { name: 'todo-storage' }
  )
);

// Component
function TodoList() {
  const todos = useStore(state => state.todos);
  const addTodo = useStore(state => state.addTodo);

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
}`,
        },
        swiftui: {
          code: `// Observable store with SwiftData
@Observable
class TodoStore {
    var todos: [TodoItem] = []

    private var modelContext: ModelContext

    init(modelContext: ModelContext) {
        self.modelContext = modelContext
        loadTodos()
    }

    func loadTodos() {
        let descriptor = FetchDescriptor<TodoItem>()
        todos = (try? modelContext.fetch(descriptor)) ?? []
    }

    func addTodo(text: String) {
        let todo = TodoItem(text: text)
        modelContext.insert(todo)
        todos.append(todo)
    }
}

// Use in view
struct TodoList: View {
    @Environment(TodoStore.self) var store

    var body: some View {
        List(store.todos) { todo in
            Text(todo.text)
        }
    }
}`,
        },
        tips: [
          "@Observable gives you fine-grained reactivity - only used properties trigger updates",
          "SwiftData's ModelContainer provides automatic persistence",
          "Store pattern: one source of truth for related data and logic",
          "Can combine multiple @Observable stores via environment",
        ],
      },
      {
        format: "comparison",
        title: "Combine Integration",
        explanation: `Swift's Combine framework is similar to RxJS. The \`@Published\` property wrapper creates publishers that emit when values change.`,
        react: {
          code: `// RxJS observable
import { BehaviorSubject } from 'rxjs';

class SearchStore {
  query$ = new BehaviorSubject('');

  results$ = this.query$.pipe(
    debounceTime(300),
    switchMap(q => this.api.search(q))
  );

  setQuery(q) {
    this.query$.next(q);
  }
}

// React component with subscription
function SearchBox() {
  const [results, setResults] = useState([]);
  const store = useMemo(() => new SearchStore(), []);

  useEffect(() => {
    const sub = store.results$.subscribe(setResults);
    return () => sub.unsubscribe();
  }, []);

  return (
    <input onChange={(e) => store.setQuery(e.target.value)} />
  );
}`,
        },
        swiftui: {
          code: `import Combine

// ObservableObject with Combine (iOS 16 compatible)
class SearchStore: ObservableObject {
    @Published var query = ""
    @Published var results: [SearchResult] = []

    private var cancellables = Set<AnyCancellable>()
    private let api: ApiService

    init(api: ApiService) {
        self.api = api

        $query
            .debounce(for: .milliseconds(300), scheduler: DispatchQueue.main)
            .removeDuplicates()
            .sink { [weak self] query in
                Task {
                    self?.results = try await self?.api.search(query) ?? []
                }
            }
            .store(in: &cancellables)
    }
}

// SwiftUI view
struct SearchBox: View {
    @StateObject private var store = SearchStore(api: ApiService())

    var body: some View {
        TextField("Search", text: $store.query)
    }
}`,
        },
        tips: [
          "@Published works with ObservableObject (older pattern, pre-iOS 17)",
          "Combine provides operators like debounce, map, filter - similar to RxJS",
          "Use @StateObject to own the lifecycle of an ObservableObject",
          "For iOS 17+, @Observable is simpler but Combine still useful for streams",
        ],
      },
    ],
  },
  {
    id: "animations",
    title: "Animations",
    description: "CSS transitions and Framer Motion → SwiftUI animations",
    module: "swiftui",
    category: "UI",
    sections: [
      {
        format: "comparison",
        title: "CSS Transitions → withAnimation",
        explanation: `SwiftUI animations are declarative. Wrap state changes in \`withAnimation\` and SwiftUI figures out what to animate.`,
        react: {
          code: `// CSS approach
.box {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.box.expanded {
  transform: scale(1.2);
  opacity: 0.8;
}

// React component
function Box() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={\`box \${expanded ? 'expanded' : ''}\`}
      onClick={() => setExpanded(!expanded)}
    >
      Click me
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct Box: View {
    @State private var expanded = false

    var body: some View {
        Text("Click me")
            .scaleEffect(expanded ? 1.2 : 1.0)
            .opacity(expanded ? 0.8 : 1.0)
            .onTapGesture {
                withAnimation(.easeInOut(duration: 0.3)) {
                    expanded.toggle()
                }
            }
    }
}

// Or use implicit animation
struct Box: View {
    @State private var expanded = false

    var body: some View {
        Text("Click me")
            .scaleEffect(expanded ? 1.2 : 1.0)
            .opacity(expanded ? 0.8 : 1.0)
            .animation(.easeInOut(duration: 0.3), value: expanded)
            .onTapGesture {
                expanded.toggle()
            }
    }
}`,
        },
        tips: [
          "withAnimation wraps state changes - SwiftUI animates the visual differences",
          ".animation() modifier adds implicit animation when a value changes",
          "Built-in curves: .linear, .easeIn, .easeOut, .easeInOut, .spring()",
          "Spring animations are the default and usually look best",
        ],
      },
      {
        format: "comparison",
        title: "Enter/Exit Animations → transition",
        explanation: `For views appearing/disappearing (like Framer Motion's AnimatePresence), use the .transition() modifier.`,
        react: {
          code: `// Framer Motion
import { AnimatePresence, motion } from 'framer-motion';

function Notification({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}`,
        },
        swiftui: {
          code: `struct Notification: View {
    let show: Bool
    let message: String

    var body: some View {
        if show {
            Text(message)
                .padding()
                .background(Color.blue)
                .cornerRadius(8)
                .transition(
                    .asymmetric(
                        insertion: .move(edge: .top).combined(with: .opacity),
                        removal: .move(edge: .top).combined(with: .opacity)
                    )
                )
        }
    }
}

// Usage - must wrap in withAnimation
struct ContentView: View {
    @State private var showNotification = false

    var body: some View {
        VStack {
            Notification(show: showNotification, message: "Hello!")

            Button("Toggle") {
                withAnimation(.spring()) {
                    showNotification.toggle()
                }
            }
        }
    }
}`,
        },
        tips: [
          ".transition() defines enter/exit animations",
          "Must use withAnimation when toggling the condition",
          ".asymmetric() for different enter/exit animations",
          ".combined(with:) chains multiple transitions",
          "Built-in: .opacity, .scale, .slide, .move(edge:)",
        ],
      },
      {
        format: "comparison",
        title: "Spring Animations",
        explanation: `SwiftUI's spring animations are physics-based. They feel natural because they simulate real spring physics with mass, stiffness, and damping.`,
        react: {
          code: `// CSS spring (approximation)
.button {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

// Or with spring in JS libraries
import { useSpring, animated } from 'react-spring';

function BouncyButton() {
  const [active, setActive] = useState(false);

  const props = useSpring({
    scale: active ? 1.2 : 1,
    config: {
      tension: 300,
      friction: 10,
    },
  });

  return (
    <animated.button
      style={{ transform: props.scale.to(s => \`scale(\${s})\`) }}
      onClick={() => setActive(!active)}
    >
      Bounce!
    </animated.button>
  );
}`,
        },
        swiftui: {
          code: `struct BouncyButton: View {
    @State private var active = false

    var body: some View {
        Button("Bounce!") {
            withAnimation(.spring(response: 0.5, dampingFraction: 0.6)) {
                active.toggle()
            }
        }
        .scaleEffect(active ? 1.2 : 1)
    }
}

// Or use detailed spring parameters
struct DetailedSpring: View {
    @State private var offset: CGFloat = 0

    var body: some View {
        Circle()
            .frame(width: 50, height: 50)
            .offset(y: offset)
            .onTapGesture {
                withAnimation(
                    .spring(
                        mass: 1.0,
                        stiffness: 100,
                        damping: 10
                    )
                ) {
                    offset = offset == 0 ? 200 : 0
                }
            }
    }
}`,
        },
        tips: [
          "Spring animations automatically feel natural - they're the default for a reason",
          "response = how long the animation takes; dampingFraction = bounciness (0-1)",
          "Lower dampingFraction = more bounce; 1.0 = no bounce (critically damped)",
          "Can also specify mass, stiffness, damping for fine-tuned physics",
        ],
      },
      {
        format: "comparison",
        title: "Matched Geometry Effect",
        explanation: `Create smooth shared element transitions between views using \`matchedGeometryEffect\`. Similar to Framer Motion's \`layoutId\`.`,
        react: {
          code: `// Framer Motion shared element
import { motion } from 'framer-motion';

function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {items.map(item => (
        <motion.div
          layoutId={\`item-\${item.id}\`}
          onClick={() => setSelected(item)}
        >
          <img src={item.thumb} />
        </motion.div>
      ))}

      {selected && (
        <motion.div layoutId={\`item-\${selected.id}\`}>
          <img src={selected.full} />
        </motion.div>
      )}
    </>
  );
}`,
        },
        swiftui: {
          code: `struct Gallery: View {
    @State private var selected: Item?
    @Namespace private var animation

    var body: some View {
        ZStack {
            // Grid of thumbnails
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 100))]) {
                ForEach(items) { item in
                    if selected?.id != item.id {
                        Image(item.thumb)
                            .matchedGeometryEffect(
                                id: item.id,
                                in: animation
                            )
                            .onTapGesture {
                                withAnimation(.spring()) {
                                    selected = item
                                }
                            }
                    }
                }
            }

            // Expanded view
            if let selected {
                Image(selected.full)
                    .matchedGeometryEffect(
                        id: selected.id,
                        in: animation
                    )
                    .onTapGesture {
                        withAnimation(.spring()) {
                            self.selected = nil
                        }
                    }
            }
        }
    }
}`,
        },
        tips: [
          "@Namespace creates a unique ID namespace for geometry matching",
          "matchedGeometryEffect syncs position, size, and shape between views",
          "Must use same id and namespace on source and destination",
          "Automatically animates when views appear/disappear",
        ],
      },
      {
        format: "comparison",
        title: "Phase Animator",
        explanation: `PhaseAnimator (iOS 17+) animates through multiple phases sequentially. Great for keyframe-style animations.`,
        react: {
          code: `// CSS keyframes
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

.pulsing {
  animation: pulse 2s ease-in-out infinite;
}

// Or with Framer Motion
import { motion } from 'framer-motion';

function PulsingCircle() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.5, 1],
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}`,
        },
        swiftui: {
          code: `// iOS 17+ PhaseAnimator
struct PulsingCircle: View {
    var body: some View {
        PhaseAnimator([1, 2, 3]) { phase in
            Circle()
                .fill(Color.blue)
                .scaleEffect(phase == 2 ? 1.5 : 1.0)
                .opacity(phase == 2 ? 0.5 : 1.0)
        } animation: { phase in
            .easeInOut(duration: 0.5)
        }
    }
}

// More complex multi-step animation
enum AnimationPhase: CaseIterable {
    case start, middle, end
}

struct ComplexAnimation: View {
    var body: some View {
        PhaseAnimator(
            AnimationPhase.allCases,
            trigger: someValue
        ) { phase in
            RoundedRectangle(cornerRadius: phase == .middle ? 50 : 20)
                .fill(phaseColor(phase))
                .scaleEffect(phaseScale(phase))
        } animation: { phase in
            switch phase {
            case .start: .easeIn(duration: 0.3)
            case .middle: .spring(response: 0.4)
            case .end: .easeOut(duration: 0.3)
            }
        }
    }
}`,
        },
        tips: [
          "PhaseAnimator cycles through an array of phases automatically",
          "Each phase can have different animation curves",
          "Add trigger parameter to restart the sequence when a value changes",
          "Great for loading indicators, celebration animations, multi-step transitions",
        ],
      },
      {
        format: "comparison",
        title: "@Animatable Macro (iOS 26)",
        explanation: `iOS 26 introduces the **@Animatable** macro which drastically simplifies creating animatable properties in custom views and shapes. No more manual AnimatableData implementations!`,
        react: {
          code: `// Custom animated component with Framer Motion
import { motion, useMotionValue, animate } from 'framer-motion';

function AnimatedRing({ progress }) {
  // Manually handle animation of stroke
  const strokeDashoffset = useMotionValue(100);

  useEffect(() => {
    animate(strokeDashoffset, 100 - progress, {
      duration: 0.5,
      ease: 'easeInOut'
    });
  }, [progress]);

  return (
    <motion.svg viewBox="0 0 100 100">
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="blue"
        strokeWidth="8"
        strokeDasharray="100"
        style={{ strokeDashoffset }}
      />
    </motion.svg>
  );
}

// Multiple animated values
function AnimatedGauge({ value, color }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimatedValue(prev => {
        const diff = value - prev;
        if (Math.abs(diff) < 0.1) return value;
        return prev + diff * 0.1;
      });
    }, 16);
    return () => clearInterval(id);
  }, [value]);

  return <div style={{ transform: \`rotate(\${animatedValue}deg)\` }} />;
}`,
        },
        swiftui: {
          code: `// iOS 26: @Animatable macro simplifies custom animations
@Animatable
struct AnimatedRing: Shape {
    var progress: Double  // Automatically animatable!

    func path(in rect: CGRect) -> Path {
        Path { path in
            path.addArc(
                center: CGPoint(x: rect.midX, y: rect.midY),
                radius: min(rect.width, rect.height) / 2,
                startAngle: .degrees(-90),
                endAngle: .degrees(-90 + 360 * progress),
                clockwise: false
            )
        }
    }
}

// Usage - animation just works!
struct ProgressView: View {
    @State private var progress = 0.0

    var body: some View {
        AnimatedRing(progress: progress)
            .stroke(Color.blue, lineWidth: 8)
            .frame(width: 100, height: 100)
            .onAppear {
                withAnimation(.easeInOut(duration: 0.5)) {
                    progress = 0.75
                }
            }
    }
}

// Multiple animatable properties
@Animatable
struct AnimatedGauge: View {
    var value: Double
    var hue: Double

    var body: some View {
        Circle()
            .fill(Color(hue: hue, saturation: 0.8, brightness: 0.9))
            .rotationEffect(.degrees(value * 360))
    }
}

// Before iOS 26, you needed this boilerplate:
// struct OldWay: Shape {
//     var progress: Double
//     var animatableData: Double {
//         get { progress }
//         set { progress = newValue }
//     }
// }`,
        },
        tips: [
          "@Animatable macro eliminates manual AnimatableData implementation",
          "All properties in @Animatable types are automatically animatable",
          "Works with Shapes, Views, and custom types",
          "Combine with withAnimation() for smooth property transitions",
        ],
      },
      {
        format: "comparison",
        title: "@IncrementalState (iOS 26)",
        explanation: `iOS 26 introduces **@IncrementalState** for dramatically improved list performance. It enables incremental updates so only changed items re-render - like React's virtual DOM diffing.`,
        react: {
          code: `// React handles this via virtual DOM diffing
function LargeList() {
  const [items, setItems] = useState(generateItems(10000));

  const addItem = () => {
    // React diffs and only updates what changed
    setItems(prev => [...prev, createNewItem()]);
  };

  return (
    <div style={{ height: 600, overflow: 'auto' }}>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// React.memo prevents re-renders of unchanged rows
const MemoizedRow = React.memo(({ item }) => {
  return <div>{item.name}</div>;
});

// useMemo for expensive computations
function FilteredList({ items, filter }) {
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.includes(filter)
    );
  }, [items, filter]);

  return (
    <div>
      {filteredItems.map(item => (
        <MemoizedRow key={item.id} item={item} />
      ))}
    </div>
  );
}`,
        },
        swiftui: {
          code: `// iOS 26: @IncrementalState for surgical list updates
struct LargeList: View {
    @IncrementalState private var items = generateItems(10000)

    var body: some View {
        ScrollView {
            LazyVStack {
                ForEach(items) { item in
                    Text(item.name)
                        .incrementalID(item.id)
                }
            }
        }
        .toolbar {
            Button("Add") {
                items.append(createNewItem())
                // Only the new item renders, not all 10,000!
            }
        }
    }
}

// Combine with filtering
struct FilteredList: View {
    @IncrementalState private var items: [Item]
    @State private var filter = ""

    var filteredItems: [Item] {
        items.filter { $0.name.contains(filter) }
    }

    var body: some View {
        List(filteredItems) { item in
            Text(item.name)
                .incrementalID(item.id)
        }
        .searchable(text: $filter)
    }
}

// Performance comparison (iOS 26 logs):
// Before: "View body called 10,000 times"
// After:  "View body called 1 time"

// For complex item views
struct ComplexItemRow: View {
    let item: Item

    var body: some View {
        HStack {
            AsyncImage(url: item.imageURL)
            VStack(alignment: .leading) {
                Text(item.title)
                Text(item.subtitle)
            }
        }
        .incrementalID(item.id)
    }
}`,
        },
        tips: [
          "@IncrementalState tracks individual item changes",
          ".incrementalID() marks views for incremental updates",
          "Dramatically improves performance for large lists (1000+ items)",
          "Works with LazyVStack, LazyHGrid, and custom layouts",
        ],
      },
    ],
  },
  {
    id: "gestures",
    title: "Gestures & Interactions",
    description: "Touch and gesture handling in SwiftUI",
    module: "swiftui",
    category: "UI",
    sections: [
      {
        format: "comparison",
        title: "Tap & Long Press",
        explanation: `SwiftUI provides dedicated gesture recognizers for tap and long press. They're more powerful than simple click handlers.`,
        react: {
          code: `// Basic click handler
function TapButton() {
  const handleClick = () => {
    console.log('Tapped!');
  };

  return <button onClick={handleClick}>Tap me</button>;
}

// Long press with timer
function LongPressButton() {
  const [pressing, setPressing] = useState(false);
  const timerRef = useRef(null);

  const handleMouseDown = () => {
    setPressing(true);
    timerRef.current = setTimeout(() => {
      console.log('Long pressed!');
    }, 500);
  };

  const handleMouseUp = () => {
    setPressing(false);
    clearTimeout(timerRef.current);
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      Long press me
    </button>
  );
}`,
        },
        swiftui: {
          code: `// Basic tap gesture
struct TapButton: View {
    var body: some View {
        Text("Tap me")
            .onTapGesture {
                print("Tapped!")
            }
    }
}

// Tap with count (double-tap, triple-tap, etc.)
struct DoubleTapButton: View {
    var body: some View {
        Text("Double tap me")
            .onTapGesture(count: 2) {
                print("Double tapped!")
            }
    }
}

// Long press gesture
struct LongPressButton: View {
    @State private var completed = false

    var body: some View {
        Text("Long press me")
            .foregroundColor(completed ? .green : .primary)
            .onLongPressGesture(
                minimumDuration: 0.5,
                maximumDistance: 50
            ) {
                completed = true
                print("Long pressed!")
            } onPressingChanged: { pressing in
                if !pressing {
                    completed = false
                }
            }
    }
}`,
        },
        tips: [
          "onTapGesture(count: n) for multi-tap gestures",
          "onLongPressGesture tracks pressing state with onPressingChanged callback",
          "minimumDuration sets how long to hold; maximumDistance limits finger movement",
          "Can combine multiple gestures on the same view",
        ],
      },
      {
        format: "comparison",
        title: "Drag Gesture",
        explanation: `DragGesture makes views draggable. Track the drag state with \`.updating()\` or \`.onChanged()\`.`,
        react: {
          code: `// Drag handler with state
function DraggableBox() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
  };

  const handleDrag = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
    >
      Drag me
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct DraggableBox: View {
    @State private var offset = CGSize.zero
    @State private var isDragging = false

    var body: some View {
        Text("Drag me")
            .padding()
            .background(Color.blue)
            .cornerRadius(8)
            .offset(offset)
            .scaleEffect(isDragging ? 1.1 : 1.0)
            .gesture(
                DragGesture()
                    .onChanged { value in
                        isDragging = true
                        offset = value.translation
                    }
                    .onEnded { _ in
                        isDragging = false
                        withAnimation(.spring()) {
                            offset = .zero
                        }
                    }
            )
    }
}

// Or use @GestureState for automatic reset
struct DraggableWithState: View {
    @GestureState private var dragOffset = CGSize.zero

    var body: some View {
        Text("Drag me")
            .offset(dragOffset)
            .gesture(
                DragGesture()
                    .updating($dragOffset) { value, state, _ in
                        state = value.translation
                    }
            )
    }
}`,
        },
        tips: [
          "DragGesture provides translation (delta from start) and location",
          "@GestureState automatically resets to initial value when gesture ends",
          ".updating() updates @GestureState during the gesture",
          ".onEnded() good for snapping back or committing the drag",
        ],
      },
      {
        format: "comparison",
        title: "Magnification & Rotation",
        explanation: `MagnifyGesture and RotateGesture handle pinch-to-zoom and rotation. Essential for photo viewers and drawing apps.`,
        react: {
          code: `// Pinch zoom with touch events
function ZoomableImage() {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleGesture = (e) => {
      if (e.touches.length === 2) {
        // Calculate distance and angle between touches
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];

        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );

        // Complex math for pinch/rotation...
      }
    };

    window.addEventListener('touchmove', handleGesture);
    return () => window.removeEventListener('touchmove', handleGesture);
  }, []);

  return (
    <img
      src="photo.jpg"
      style={{
        transform: \`scale(\${scale}) rotate(\${rotation}deg)\`,
      }}
    />
  );
}`,
        },
        swiftui: {
          code: `struct ZoomableImage: View {
    @State private var scale: CGFloat = 1.0
    @State private var rotation: Angle = .zero

    var body: some View {
        Image("photo")
            .resizable()
            .scaledToFit()
            .scaleEffect(scale)
            .rotationEffect(rotation)
            .gesture(
                MagnifyGesture()
                    .onChanged { value in
                        scale = value.magnification
                    }
                    .onEnded { _ in
                        withAnimation(.spring()) {
                            scale = 1.0
                        }
                    }
            )
            .gesture(
                RotateGesture()
                    .onChanged { value in
                        rotation = value.rotation
                    }
                    .onEnded { _ in
                        withAnimation(.spring()) {
                            rotation = .zero
                        }
                    }
            )
    }
}

// Combined pinch and rotate (iOS 17+)
struct ZoomAndRotate: View {
    @State private var scale: CGFloat = 1.0
    @State private var rotation: Angle = .zero

    var body: some View {
        Image("photo")
            .scaleEffect(scale)
            .rotationEffect(rotation)
            .gesture(
                SimultaneousGesture(
                    MagnifyGesture(),
                    RotateGesture()
                )
            )
    }
}`,
        },
        tips: [
          "MagnifyGesture gives magnification factor (1.0 = no zoom)",
          "RotateGesture gives rotation as Angle (use .degrees or .radians)",
          "Use @GestureState for temporary transforms that reset automatically",
          "Combine gestures with SimultaneousGesture to handle both at once",
        ],
      },
      {
        format: "comparison",
        title: "Gesture Composition",
        explanation: `Combine multiple gestures with \`.simultaneously\`, \`.sequenced\`, or \`.exclusively\` for complex interactions.`,
        react: {
          code: `// Complex gesture handling
function GestureBox() {
  const [state, setState] = useState({
    dragging: false,
    longPress: false,
    position: { x: 0, y: 0 },
  });

  // Handle long press then drag sequence
  const handleLongPress = () => {
    setState(s => ({ ...s, longPress: true }));
  };

  const handleDrag = (e) => {
    if (state.longPress) {
      setState(s => ({
        ...s,
        position: { x: e.clientX, y: e.clientY },
      }));
    }
  };

  return (
    <div
      onContextMenu={handleLongPress}
      onMouseMove={handleDrag}
      style={{
        position: 'absolute',
        left: state.position.x,
        top: state.position.y,
      }}
    >
      Long press then drag
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct GestureComposition: View {
    @State private var offset = CGSize.zero
    @State private var scale: CGFloat = 1.0

    var body: some View {
        // Drag AND zoom simultaneously
        Circle()
            .fill(Color.blue)
            .scaleEffect(scale)
            .offset(offset)
            .gesture(
                SimultaneousGesture(
                    DragGesture()
                        .onChanged { value in
                            offset = value.translation
                        },
                    MagnifyGesture()
                        .onChanged { value in
                            scale = value.magnification
                        }
                )
            )
    }
}

// Long press THEN drag (sequential)
struct SequencedGestures: View {
    @State private var offset = CGSize.zero
    @State private var unlocked = false

    var body: some View {
        Rectangle()
            .fill(unlocked ? Color.green : Color.red)
            .offset(offset)
            .gesture(
                SequenceGesture(
                    LongPressGesture(minimumDuration: 1.0),
                    DragGesture()
                )
                .onChanged { value in
                    switch value {
                    case .second(true, let drag):
                        unlocked = true
                        offset = drag?.translation ?? .zero
                    default:
                        break
                    }
                }
            )
    }
}

// Tap OR long press (exclusive)
struct ExclusiveGestures: View {
    var body: some View {
        Text("Tap or long press")
            .gesture(
                ExclusiveGesture(
                    TapGesture()
                        .onEnded { _ in
                            print("Tapped!")
                        },
                    LongPressGesture()
                        .onEnded { _ in
                            print("Long pressed!")
                        }
                )
            )
    }
}`,
        },
        tips: [
          "SimultaneousGesture: both gestures work at the same time",
          "SequenceGesture: second gesture only works after first completes",
          "ExclusiveGesture: first gesture to recognize wins, cancels the other",
          "Use .highPriorityGesture() to override child gesture handlers",
        ],
      },
      {
        format: "comparison",
        title: "Haptic Feedback",
        explanation: `SwiftUI makes it easy to add haptic feedback. iOS devices have sophisticated haptic engines for tactile responses.`,
        react: {
          code: `// Vibration API (limited)
function HapticButton() {
  const triggerHaptic = () => {
    // Simple vibration (not precise)
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  return (
    <button onClick={triggerHaptic}>
      Vibrate
    </button>
  );
}

// More control requires native modules
// (React Native example)
import { Vibration } from 'react-native';

function FancyHaptic() {
  const lightImpact = () => {
    Vibration.vibrate(10);
  };

  const heavyImpact = () => {
    Vibration.vibrate([0, 100, 50, 100]);
  };

  return (
    <View>
      <Button onPress={lightImpact} title="Light" />
      <Button onPress={heavyImpact} title="Heavy" />
    </View>
  );
}`,
        },
        swiftui: {
          code: `import UIKit

struct HapticButton: View {
    var body: some View {
        Button("Light Impact") {
            let generator = UIImpactFeedbackGenerator(style: .light)
            generator.impactOccurred()
        }
    }
}

// Different feedback types
struct HapticExamples: View {
    var body: some View {
        VStack {
            Button("Light Impact") {
                UIImpactFeedbackGenerator(style: .light).impactOccurred()
            }

            Button("Medium Impact") {
                UIImpactFeedbackGenerator(style: .medium).impactOccurred()
            }

            Button("Heavy Impact") {
                UIImpactFeedbackGenerator(style: .heavy).impactOccurred()
            }

            Button("Success") {
                UINotificationFeedbackGenerator().notificationOccurred(.success)
            }

            Button("Error") {
                UINotificationFeedbackGenerator().notificationOccurred(.error)
            }
        }
    }
}

// iOS 17+ sensoryFeedback modifier
struct ModernHaptics: View {
    @State private var liked = false

    var body: some View {
        Button("Like") {
            liked.toggle()
        }
        .sensoryFeedback(.impact(weight: .heavy), trigger: liked)
    }
}`,
        },
        tips: [
          "UIImpactFeedbackGenerator for light/medium/heavy taps",
          "UINotificationFeedbackGenerator for success/warning/error feedback",
          "UISelectionFeedbackGenerator for picker/selection changes",
          "iOS 17+ .sensoryFeedback() modifier is more declarative and simpler",
        ],
      },
    ],
  },
  {
    id: "networking",
    title: "Data Fetching",
    description: "fetch/axios and React Query → URLSession and async/await",
    module: "swiftui",
    category: "Data",
    sections: [
      {
        format: "comparison",
        title: "fetch() → URLSession",
        explanation: `Swift has built-in async/await that works seamlessly with SwiftUI's .task modifier. No external libraries needed!`,
        react: {
          code: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await fetch(\`/api/users/\${userId}\`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setUser(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  return <div>{user.name}</div>;
}`,
        },
        swiftui: {
          code: `struct UserProfile: View {
    let userId: String
    @State private var user: User?
    @State private var error: Error?

    var body: some View {
        Group {
            if let error = error {
                Text("Error: \\(error.localizedDescription)")
            } else if let user = user {
                Text(user.name)
            } else {
                ProgressView()
            }
        }
        .task {
            do {
                let url = URL(string: "https://api.example.com/users/\\(userId)")!
                let (data, _) = try await URLSession.shared.data(from: url)
                user = try JSONDecoder().decode(User.self, from: data)
            } catch {
                self.error = error
            }
        }
    }
}

// User model with Codable
struct User: Codable, Identifiable {
    let id: String
    let name: String
    let email: String
}`,
        },
        tips: [
          ".task auto-cancels when view disappears",
          "Codable is Swift's built-in JSON serialization (like Zod + JSON.parse)",
          "URLSession is built-in - no axios/fetch libraries needed",
          "async/await is native to Swift",
        ],
      },
      {
        format: "comparison",
        title: "React Query Pattern → Observable + .task",
        explanation: `For caching and shared data, combine @Observable with .task. It's simpler than React Query but covers most cases.`,
        react: {
          code: `// React Query
function UserList() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <Spinner />;
  if (error) return <Error />;

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      {data.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}`,
        },
        swiftui: {
          code: `// Shared data store
@Observable
class UserStore {
    var users: [User] = []
    var isLoading = false
    var error: Error?

    @MainActor
    func fetchUsers() async {
        isLoading = true
        defer { isLoading = false }

        do {
            let url = URL(string: "https://api.example.com/users")!
            let (data, _) = try await URLSession.shared.data(from: url)
            users = try JSONDecoder().decode([User].self, from: data)
            error = nil
        } catch {
            self.error = error
        }
    }
}

struct UserList: View {
    @Environment(UserStore.self) var store

    var body: some View {
        Group {
            if store.isLoading {
                ProgressView()
            } else if let error = store.error {
                Text("Error: \\(error.localizedDescription)")
            } else {
                List(store.users) { user in
                    UserCard(user: user)
                }
            }
        }
        .task {
            await store.fetchUsers()
        }
        .refreshable {
            await store.fetchUsers()
        }
    }
}`,
        },
        tips: [
          "@MainActor ensures UI updates happen on main thread",
          ".refreshable adds pull-to-refresh automatically",
          "The store persists across view recreations",
          "For complex caching, consider third-party libraries",
        ],
      },
      {
        format: "comparison",
        title: "Error States",
        explanation: `Comprehensive error handling with retry mechanisms. React often uses error boundaries or manual state; SwiftUI uses explicit error state with clean error UI.`,
        react: {
          code: `function DataView() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/data');
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <Spinner />;
  if (error) return (
    <div className="error-card">
      <h3>Error</h3>
      <p>{error}</p>
      <button onClick={fetchData}>Retry</button>
    </div>
  );
  return <div>{data?.title}</div>;
}`,
        },
        swiftui: {
          code: `struct DataView: View {
    @State private var data: DataModel?
    @State private var error: NetworkError?
    @State private var isLoading = false

    var body: some View {
        Group {
            if isLoading {
                ProgressView()
            } else if let error = error {
                VStack(spacing: 16) {
                    Image(systemName: "exclamationmark.triangle")
                        .font(.largeTitle)
                        .foregroundStyle(.red)
                    Text("Error")
                        .font(.headline)
                    Text(error.message)
                        .foregroundStyle(.secondary)
                    Button("Retry") {
                        Task { await fetchData() }
                    }
                    .buttonStyle(.borderedProminent)
                }
                .padding()
            } else if let data = data {
                Text(data.title)
            }
        }
        .task { await fetchData() }
    }

    func fetchData() async {
        isLoading = true
        defer { isLoading = false }

        do {
            let url = URL(string: "https://api.example.com/data")!
            let (data, response) = try await URLSession.shared.data(from: url)

            guard let httpResponse = response as? HTTPURLResponse,
                  httpResponse.statusCode == 200 else {
                throw NetworkError.httpError(statusCode: 500)
            }

            self.data = try JSONDecoder().decode(DataModel.self, from: data)
            error = nil
        } catch {
            self.error = NetworkError.from(error)
        }
    }
}

enum NetworkError: LocalizedError {
    case httpError(statusCode: Int)
    case decodingError
    case unknown

    var message: String {
        switch self {
        case .httpError(let code): return "HTTP \\(code)"
        case .decodingError: return "Invalid data format"
        case .unknown: return "An error occurred"
        }
    }

    static func from(_ error: Error) -> NetworkError {
        if error is DecodingError { return .decodingError }
        return .unknown
    }
}`,
        },
        tips: [
          "SwiftUI SF Symbols provide built-in error icons",
          "Custom error types give better UX than raw Error messages",
          "Task { } wrapper needed when calling async from sync context",
          ".task auto-retries when view ID changes - add explicit retry button for manual control",
        ],
      },
      {
        format: "comparison",
        title: "Loading States",
        explanation: `ProgressView and skeleton views with the .redacted() modifier. React uses spinners and skeleton libraries; SwiftUI has built-in primitives for both.`,
        react: {
          code: `// Using react-loading-skeleton
import Skeleton from 'react-loading-skeleton';

function UserCard({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div className="card">
        <Skeleton circle width={50} height={50} />
        <Skeleton width={200} />
        <Skeleton width={150} />
      </div>
    );
  }

  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct UserCard: View {
    let userId: String
    @State private var user: User?

    var body: some View {
        HStack(spacing: 12) {
            // Avatar
            Group {
                if let user = user {
                    AsyncImage(url: URL(string: user.avatar)) { image in
                        image.resizable()
                    } placeholder: {
                        Color.gray
                    }
                } else {
                    Circle().fill(.gray)
                }
            }
            .frame(width: 50, height: 50)
            .clipShape(Circle())

            VStack(alignment: .leading, spacing: 4) {
                Text(user?.name ?? "Loading...")
                    .font(.headline)
                Text(user?.bio ?? "Fetching user bio")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
        .padding()
        .redacted(reason: user == nil ? .placeholder : [])
        .task {
            let url = URL(string: "https://api.example.com/users/\\(userId)")!
            let (data, _) = try? await URLSession.shared.data(from: url)
            user = try? JSONDecoder().decode(User.self, from: data)
        }
    }
}

// Alternative: Explicit ProgressView
struct LoadingView: View {
    var body: some View {
        VStack {
            ProgressView()
                .progressViewStyle(.circular)
            Text("Loading...")
                .foregroundStyle(.secondary)
        }
    }
}`,
        },
        tips: [
          ".redacted(reason:) automatically creates skeleton views from your real UI",
          "ProgressView() adapts to context - circular spinner or linear bar",
          "AsyncImage has built-in placeholder support",
          "No external skeleton libraries needed - .redacted() blurs real content as placeholder",
        ],
      },
    ],
  },
  {
    id: "persistence",
    title: "Persistence & Storage",
    description: "localStorage and IndexedDB → UserDefaults, FileManager, and SwiftData",
    module: "swiftui",
    category: "Data",
    sections: [
      {
        format: "comparison",
        title: "UserDefaults",
        explanation: `Simple key-value storage for user preferences. Similar to localStorage but type-safe. The @AppStorage property wrapper makes it reactive.`,
        react: {
          code: `// Manual localStorage
function SettingsPanel() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  const toggle = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('darkMode', String(newValue));
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggle}
        />
        Dark Mode
      </label>
    </div>
  );
}`,
        },
        swiftui: {
          code: `// Using @AppStorage wrapper (reactive)
struct SettingsPanel: View {
    @AppStorage("darkMode") private var darkMode = false

    var body: some View {
        Toggle("Dark Mode", isOn: $darkMode)
            .padding()
    }
}

// Manual UserDefaults access
class PreferencesManager {
    private let defaults = UserDefaults.standard

    var username: String? {
        get { defaults.string(forKey: "username") }
        set { defaults.set(newValue, forKey: "username") }
    }

    var lastLoginDate: Date? {
        get { defaults.object(forKey: "lastLogin") as? Date }
        set { defaults.set(newValue, forKey: "lastLogin") }
    }

    func save() {
        defaults.synchronize() // Usually automatic
    }
}`,
        },
        tips: [
          "@AppStorage auto-syncs to UserDefaults and updates the view",
          "UserDefaults works with: String, Int, Bool, Data, Date, Array, Dictionary",
          "Values persist across app launches",
          "Don't store sensitive data in UserDefaults - use Keychain instead",
        ],
      },
      {
        format: "comparison",
        title: "FileManager",
        explanation: `File I/O for documents and app data. iOS apps run in a sandbox with specific directories. Similar to File API but with native performance.`,
        react: {
          code: `// Web File API / IndexedDB
function SaveDocument() {
  const [content, setContent] = useState('');

  const saveFile = async () => {
    // IndexedDB for persistence
    const db = await openDB('myapp', 1);
    await db.put('documents', {
      id: 'doc1',
      content,
      timestamp: Date.now()
    });

    // Or File System Access API (requires user interaction)
    const handle = await window.showSaveFilePicker();
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
  };

  return (
    <div>
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={saveFile}>Save</button>
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct SaveDocument: View {
    @State private var content = ""
    private let fileManager = FileManager.default

    var body: some View {
        VStack {
            TextEditor(text: $content)
            Button("Save") {
                saveToFile()
            }
            Button("Load") {
                loadFromFile()
            }
        }
        .padding()
    }

    func saveToFile() {
        // Get documents directory
        guard let documentsPath = fileManager.urls(
            for: .documentDirectory,
            in: .userDomainMask
        ).first else { return }

        let fileURL = documentsPath.appendingPathComponent("document.txt")

        do {
            try content.write(to: fileURL, atomically: true, encoding: .utf8)
            print("Saved to: \\(fileURL.path)")
        } catch {
            print("Error saving: \\(error)")
        }
    }

    func loadFromFile() {
        guard let documentsPath = fileManager.urls(
            for: .documentDirectory,
            in: .userDomainMask
        ).first else { return }

        let fileURL = documentsPath.appendingPathComponent("document.txt")

        do {
            content = try String(contentsOf: fileURL, encoding: .utf8)
        } catch {
            print("Error loading: \\(error)")
        }
    }
}`,
        },
        tips: [
          "Use .documentDirectory for user-visible files",
          "Use .applicationSupportDirectory for app data",
          "Files in app sandbox are not accessible to other apps",
          "atomically: true ensures write completes fully or not at all",
        ],
      },
      {
        format: "comparison",
        title: "SwiftData",
        explanation: `Modern persistence framework introduced in iOS 17. Similar to IndexedDB/Dexie but with Swift macros for zero-boilerplate schemas. Replaces Core Data.`,
        react: {
          code: `// IndexedDB with Dexie
import Dexie from 'dexie';

const db = new Dexie('TodoApp');
db.version(1).stores({
  todos: '++id, title, completed, timestamp'
});

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    db.todos.toArray().then(setTodos);
  }, []);

  const addTodo = async (title) => {
    const id = await db.todos.add({
      title,
      completed: false,
      timestamp: Date.now()
    });
    setTodos([...todos, { id, title, completed: false }]);
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}`,
        },
        swiftui: {
          code: `import SwiftData

// Define model with @Model macro
@Model
class Todo {
    var title: String
    var isCompleted: Bool
    var timestamp: Date

    init(title: String) {
        self.title = title
        self.isCompleted = false
        self.timestamp = Date()
    }
}

// Query with @Query macro
struct TodoList: View {
    @Environment(\\.modelContext) private var context
    @Query(sort: \\Todo.timestamp) private var todos: [Todo]

    var body: some View {
        List(todos) { todo in
            Text(todo.title)
        }
        .toolbar {
            Button("Add") {
                let todo = Todo(title: "New Task")
                context.insert(todo)
                try? context.save()
            }
        }
    }
}

// Setup in App
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            TodoList()
        }
        .modelContainer(for: Todo.self)
    }
}`,
        },
        tips: [
          "@Model macro automatically generates storage code",
          "@Query macro creates reactive database queries",
          "modelContext.save() persists changes",
          "For iOS 16 and below, use Core Data instead of SwiftData",
        ],
      },
      {
        format: "comparison",
        title: "Keychain",
        explanation: `Secure storage for sensitive data like passwords and tokens. The OS encrypts data and protects it with device passcode. More secure than localStorage.`,
        react: {
          code: `// Web: Encrypted localStorage pattern
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'user-secret-key';

function SecureStorage() {
  const saveToken = (token) => {
    const encrypted = CryptoJS.AES.encrypt(
      token,
      ENCRYPTION_KEY
    ).toString();
    localStorage.setItem('authToken', encrypted);
  };

  const loadToken = () => {
    const encrypted = localStorage.getItem('authToken');
    if (!encrypted) return null;

    const decrypted = CryptoJS.AES.decrypt(
      encrypted,
      ENCRYPTION_KEY
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  return { saveToken, loadToken };
}

// Usage
function LoginView() {
  const { saveToken } = SecureStorage();

  const handleLogin = async (username, password) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    const { token } = await res.json();
    saveToken(token);
  };

  return <form>{/* ... */}</form>;
}`,
        },
        swiftui: {
          code: `import Security

class KeychainManager {
    func save(key: String, value: String) {
        let data = value.data(using: .utf8)!

        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecValueData as String: data
        ]

        // Delete old value if exists
        SecItemDelete(query as CFDictionary)

        // Add new value
        let status = SecItemAdd(query as CFDictionary, nil)
        if status != errSecSuccess {
            print("Keychain save failed: \\(status)")
        }
    }

    func load(key: String) -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true
        ]

        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)

        guard status == errSecSuccess,
              let data = result as? Data else {
            return nil
        }

        return String(data: data, encoding: .utf8)
    }
}

struct LoginView: View {
    private let keychain = KeychainManager()

    func handleLogin(username: String, password: String) async {
        // Login logic...
        let token = "auth-token-from-api"
        keychain.save(key: "authToken", value: token)
    }

    var body: some View {
        Form {
            // Login form...
        }
    }
}`,
        },
        tips: [
          "Keychain data survives app deletion if configured for iCloud sync",
          "OS automatically encrypts keychain items",
          "Use kSecAttrAccessible to control when data is accessible (e.g., only when unlocked)",
          "Consider KeychainAccess library for simpler API",
        ],
      },
    ],
  },
  {
    id: "alerts-sheets",
    title: "Alerts & Sheets",
    description: "Native alerts, action sheets, modal presentations, and popovers",
    category: "UI",
    module: "swiftui",
    sections: [
      {
        format: "comparison",
        title: "Alert",
        explanation: `SwiftUI provides the **.alert()** modifier for native alerts, while React relies on **window.alert()** or modal libraries. SwiftUI alerts can include multiple actions with different styles.`,
        react: {
          code: `// Basic alert (browser native)
function DeleteButton() {
  const handleDelete = () => {
    if (window.alert('Delete this item?')) {
      // Can't capture user choice with window.alert
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}

// Custom alert with actions (using modal library)
import { Modal, Button } from 'react-bootstrap';

function DeleteConfirmation() {
  const [show, setShow] = useState(false);

  const handleDelete = () => {
    console.log('Item deleted');
    setShow(false);
  };

  return (
    <>
      <button onClick={() => setShow(true)}>Delete</button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}`,
        },
        swiftui: {
          code: `struct DeleteButton: View {
    @State private var showAlert = false

    var body: some View {
        Button("Delete") {
            showAlert = true
        }
        .alert("Delete Item", isPresented: $showAlert) {
            Button("Cancel", role: .cancel) { }
            Button("Delete", role: .destructive) {
                print("Item deleted")
            }
        } message: {
            Text("Are you sure you want to delete this item?")
        }
    }
}

// Alert with custom actions
struct SettingsButton: View {
    @State private var showAlert = false

    var body: some View {
        Button("Settings") {
            showAlert = true
        }
        .alert("Choose Option", isPresented: $showAlert) {
            Button("Save") { print("Saved") }
            Button("Save and Exit") { print("Saved and exited") }
            Button("Cancel", role: .cancel) { }
        } message: {
            Text("What would you like to do?")
        }
    }
}`,
        },
        tips: [
          "Use role: .destructive for dangerous actions (displays in red)",
          "role: .cancel is automatically styled and positioned correctly",
          "Alert automatically dismisses when any button is tapped",
          "Use @State for isPresented binding to control alert visibility",
        ],
      },
      {
        format: "comparison",
        title: "Confirmation Dialog",
        explanation: `SwiftUI's **.confirmationDialog()** creates action sheets for destructive confirmations, similar to iOS-style bottom sheets. React uses confirm() or custom modals.`,
        react: {
          code: `// Browser native (limited styling)
function DeleteButton() {
  const handleDelete = () => {
    if (window.confirm('Delete this photo?')) {
      console.log('Photo deleted');
    }
  };

  return <button onClick={handleDelete}>Delete Photo</button>;
}

// Custom action sheet (using library)
import { ActionSheet } from 'react-native';

function PhotoActions() {
  const showActionSheet = () => {
    const options = ['Delete Photo', 'Save to Gallery', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    ActionSheet.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          console.log('Photo deleted');
        } else if (buttonIndex === 1) {
          console.log('Photo saved');
        }
      }
    );
  };

  return <button onClick={showActionSheet}>Photo Options</button>;
}`,
        },
        swiftui: {
          code: `struct PhotoActions: View {
    @State private var showConfirmation = false

    var body: some View {
        Button("Photo Options") {
            showConfirmation = true
        }
        .confirmationDialog(
            "Choose Action",
            isPresented: $showConfirmation,
            titleVisibility: .visible
        ) {
            Button("Save to Gallery") {
                print("Photo saved")
            }
            Button("Share") {
                print("Photo shared")
            }
            Button("Delete Photo", role: .destructive) {
                print("Photo deleted")
            }
            Button("Cancel", role: .cancel) { }
        } message: {
            Text("What would you like to do with this photo?")
        }
    }
}

// iPad displays as popover automatically
struct DeleteConfirmation: View {
    @State private var showConfirmation = false

    var body: some View {
        Button("Delete") {
            showConfirmation = true
        }
        .confirmationDialog(
            "Delete Item",
            isPresented: $showConfirmation
        ) {
            Button("Delete", role: .destructive) {
                print("Item deleted")
            }
        }
    }
}`,
        },
        tips: [
          "On iPhone, displays as action sheet from bottom; on iPad, displays as popover",
          "Destructive actions appear in red at the top of the sheet",
          "Cancel button automatically positioned at bottom with divider",
          "titleVisibility controls whether the title is shown (default: .automatic)",
        ],
      },
      {
        format: "comparison",
        title: "Sheet Presentations",
        explanation: `SwiftUI's **.sheet()** modifier creates modal presentations with detents for half-sheet or custom heights. React uses modal libraries or CSS for similar effects.`,
        react: {
          code: `// Full screen modal
import { Modal } from 'react-bootstrap';

function ProfileButton() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)}>Edit Profile</button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>{/* Profile form */}</form>
        </Modal.Body>
      </Modal>
    </>
  );
}

// Half-height modal (custom CSS)
function SettingsSheet() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)}>Settings</button>
      <div className={\`modal \${show ? 'show' : ''}\`}>
        <div className="modal-dialog modal-bottom-sheet">
          <div className="modal-content">
            <h5>Settings</h5>
            {/* Settings content */}
          </div>
        </div>
      </div>
    </>
  );
}

// CSS: .modal-bottom-sheet { bottom: 0; height: 50vh; }`,
        },
        swiftui: {
          code: `struct ProfileButton: View {
    @State private var showSheet = false

    var body: some View {
        Button("Edit Profile") {
            showSheet = true
        }
        .sheet(isPresented: $showSheet) {
            ProfileEditView()
        }
    }
}

// Half-height sheet with detents
struct SettingsButton: View {
    @State private var showSheet = false

    var body: some View {
        Button("Settings") {
            showSheet = true
        }
        .sheet(isPresented: $showSheet) {
            SettingsView()
                .presentationDetents([.medium, .large])
                .presentationDragIndicator(.visible)
        }
    }
}

// Custom detent height
struct ShareButton: View {
    @State private var showSheet = false

    var body: some View {
        Button("Share") {
            showSheet = true
        }
        .sheet(isPresented: $showSheet) {
            ShareView()
                .presentationDetents([.height(300), .large])
                .presentationBackgroundInteraction(.enabled)
        }
    }
}`,
        },
        tips: [
          ".presentationDetents() controls available sheet heights: .medium (half), .large (full)",
          "Users can drag between detents; sheet dismisses with swipe down",
          ".presentationDragIndicator(.visible) shows the grab handle at top",
          ".presentationBackgroundInteraction(.enabled) allows tapping content behind sheet",
        ],
      },
      {
        format: "comparison",
        title: "Popover",
        explanation: `SwiftUI's **.popover()** modifier creates contextual UI that appears near the trigger element. React uses tooltip libraries or custom positioning. On iPad, popovers adapt to larger screens with arrow indicators.`,
        react: {
          code: `// Using tooltip library
import { Popover, OverlayTrigger } from 'react-bootstrap';

function InfoButton() {
  const popover = (
    <Popover>
      <Popover.Header>Additional Info</Popover.Header>
      <Popover.Body>
        This is some helpful information about the feature.
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <button>ⓘ</button>
    </OverlayTrigger>
  );
}

// Custom popover with positioning
function OptionsMenu() {
  const [show, setShow] = useState(false);
  const buttonRef = useRef(null);

  return (
    <>
      <button ref={buttonRef} onClick={() => setShow(!show)}>
        Options
      </button>
      {show && (
        <div className="popover" style={{
          position: 'absolute',
          top: buttonRef.current.offsetTop + 40,
          left: buttonRef.current.offsetLeft
        }}>
          <ul>
            <li>Edit</li>
            <li>Delete</li>
            <li>Share</li>
          </ul>
        </div>
      )}
    </>
  );
}`,
        },
        swiftui: {
          code: `struct InfoButton: View {
    @State private var showPopover = false

    var body: some View {
        Button {
            showPopover = true
        } label: {
            Image(systemName: "info.circle")
        }
        .popover(isPresented: $showPopover) {
            VStack(alignment: .leading, spacing: 8) {
                Text("Additional Info")
                    .font(.headline)
                Text("This is some helpful information about the feature.")
                    .font(.body)
            }
            .padding()
            .presentationCompactAdaptation(.popover) // Stays as popover on iPhone
        }
    }
}

// Options menu popover
struct OptionsMenu: View {
    @State private var showOptions = false

    var body: some View {
        Button("Options") {
            showOptions = true
        }
        .popover(isPresented: $showOptions, arrowEdge: .bottom) {
            VStack(alignment: .leading) {
                Button("Edit") { print("Edit") }
                Divider()
                Button("Delete") { print("Delete") }
                Divider()
                Button("Share") { print("Share") }
            }
            .padding()
            .frame(width: 200)
        }
    }
}

// Popover with custom sizing
struct DetailPopover: View {
    @State private var showDetail = false

    var body: some View {
        Button("Show Details") {
            showDetail = true
        }
        .popover(isPresented: $showDetail) {
            DetailView()
                .frame(width: 300, height: 400)
        }
    }
}`,
        },
        tips: [
          "On iPad, popovers display with arrow pointing to trigger; on iPhone, displays as sheet by default",
          ".presentationCompactAdaptation(.popover) forces popover style even on iPhone",
          "arrowEdge parameter controls which side the arrow appears (.top, .bottom, .leading, .trailing)",
          "Popover automatically positions itself to stay on screen",
        ],
      },
    ],
  },
  {
    id: "liquid-glass",
    title: "Liquid Glass (iOS 26)",
    description: "Apple's new design language with translucent, glassy UI components",
    category: "UI",
    module: "swiftui",
    sections: [
      {
        format: "comparison",
        title: "Liquid Glass Overview",
        explanation: `iOS 26 introduces **Liquid Glass**, Apple's new design language. Thanks to SwiftUI's declarative nature, your existing apps get the new look automatically - just build with Xcode 26. Navigation, tabs, toolbars all become glassy and translucent.`,
        react: {
          code: `// CSS approach to glassmorphism
function GlassCard({ children }) {
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 20,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </div>
  );
}

// Tailwind CSS glass effect
function TailwindGlass() {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
      <h1>Glassmorphism Card</h1>
    </div>
  );
}

// Complex glass UI requires manual layering
function GlassNavBar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Nav items */}
    </nav>
  );
}`,
        },
        swiftui: {
          code: `// iOS 26: Liquid Glass is automatic!
// Just build with Xcode 26 and get the new design
struct ContentView: View {
    var body: some View {
        NavigationStack {
            List {
                Text("Item 1")
                Text("Item 2")
            }
            .navigationTitle("My App")
            // Navigation bar is automatically Liquid Glass!
        }
    }
}

// TabView gets Liquid Glass automatically
struct MainView: View {
    var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Label("Home", systemImage: "house")
                }
            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gear")
                }
        }
        // Tab bar is automatically glassy and translucent
    }
}

// Manual glass material (pre-iOS 26 or custom)
struct CustomGlassCard: View {
    var body: some View {
        VStack {
            Text("Glass Card")
                .font(.title)
            Text("Custom glass effect")
        }
        .padding()
        .background(.ultraThinMaterial) // Glass-like blur
        .clipShape(RoundedRectangle(cornerRadius: 20))
    }
}

// Opt-out of Liquid Glass (one-year grace period)
// In your App's Info.plist:
// <key>UIDesignLanguage</key>
// <string>classic</string>`,
        },
        tips: [
          "Build with Xcode 26 to get Liquid Glass automatically - no code changes needed",
          "NavigationStack, TabView, and toolbars all adopt the glassy look",
          "Use .ultraThinMaterial, .thinMaterial, or .regularMaterial for custom glass effects",
          "Apps can opt-out via Info.plist for a one-year grace period",
        ],
      },
      {
        format: "comparison",
        title: "Material Effects",
        explanation: `iOS 26 introduces **.materialEffect()** - a new modifier for advanced glass effects beyond simple blur. It creates depth and light interaction similar to real glass.`,
        react: {
          code: `// Complex glass effect in CSS
function AdvancedGlass({ children }) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        backdropFilter: 'blur(40px) saturate(180%)',
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: \`
          0 8px 32px rgba(0,0,0,0.1),
          inset 0 1px 0 rgba(255,255,255,0.2)
        \`,
      }}
    >
      {/* Highlight layer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1), transparent)',
          borderRadius: '24px 24px 0 0',
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  );
}

// Frosted glass with depth
function FrostedPane() {
  return (
    <div className="glass-pane">
      <div className="glass-reflection" />
      <div className="glass-content">
        Content here
      </div>
    </div>
  );
}`,
        },
        swiftui: {
          code: `// iOS 26: .materialEffect() modifier
struct GlassPanel: View {
    var body: some View {
        VStack {
            Text("Liquid Glass Panel")
                .font(.title)
            Text("Advanced material effect")
        }
        .padding(24)
        .materialEffect(.glass) // New in iOS 26!
        .clipShape(RoundedRectangle(cornerRadius: 24))
    }
}

// Different material intensities
struct MaterialShowcase: View {
    var body: some View {
        VStack(spacing: 20) {
            // Light glass effect
            Text("Light Glass")
                .padding()
                .materialEffect(.glass, intensity: 0.3)

            // Medium glass effect
            Text("Medium Glass")
                .padding()
                .materialEffect(.glass, intensity: 0.6)

            // Full glass effect
            Text("Full Glass")
                .padding()
                .materialEffect(.glass, intensity: 1.0)
        }
    }
}

// Pre-iOS 26 materials still work
struct ClassicMaterials: View {
    var body: some View {
        VStack(spacing: 20) {
            Text("Ultra Thin")
                .padding()
                .background(.ultraThinMaterial)

            Text("Thin Material")
                .padding()
                .background(.thinMaterial)

            Text("Regular Material")
                .padding()
                .background(.regularMaterial)

            Text("Thick Material")
                .padding()
                .background(.thickMaterial)
        }
        .clipShape(RoundedRectangle(cornerRadius: 16))
    }
}

// Combining with vibrancy
struct VibrantGlass: View {
    var body: some View {
        ZStack {
            Image("background")
                .resizable()

            Text("Vibrant Label")
                .foregroundStyle(.secondary)
                .padding()
                .background(.ultraThinMaterial)
        }
    }
}`,
        },
        tips: [
          ".materialEffect(.glass) is the new iOS 26 way to add advanced glass effects",
          "intensity parameter controls the strength of the effect (0.0 to 1.0)",
          "Classic materials (.ultraThinMaterial, .thinMaterial) still work",
          "Materials adapt to light/dark mode and underlying content automatically",
        ],
      },
    ],
  },
  {
    id: "search-filtering",
    title: "Search & Filtering",
    description: "Native search bar integration, suggestions, and reactive filtering",
    category: "Data Display",
    module: "swiftui",
    sections: [
      {
        format: "comparison",
        title: "Searchable",
        explanation: `SwiftUI's **.searchable()** modifier adds a native search bar to your views. React requires custom input components with controlled state. The search bar automatically integrates with navigation bars and toolbars.`,
        react: {
          code: `function UserList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState([
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="search"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// With search icon and clear button
function ProductSearch() {
  const [query, setQuery] = useState('');

  return (
    <div className="search-container">
      <span className="search-icon">🔍</span>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      {query && (
        <button onClick={() => setQuery('')} className="clear-btn">
          ✕
        </button>
      )}
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct UserList: View {
    @State private var searchQuery = ""
    let users = [
        User(id: 1, name: "Alice Johnson"),
        User(id: 2, name: "Bob Smith"),
        User(id: 3, name: "Charlie Brown")
    ]

    var filteredUsers: [User] {
        if searchQuery.isEmpty {
            return users
        }
        return users.filter { $0.name.localizedCaseInsensitiveContains(searchQuery) }
    }

    var body: some View {
        NavigationStack {
            List(filteredUsers) { user in
                Text(user.name)
            }
            .navigationTitle("Users")
            .searchable(text: $searchQuery)
        }
    }
}

// With custom prompt
struct ProductSearch: View {
    @State private var searchQuery = ""
    let products = Product.sampleData

    var filteredProducts: [Product] {
        if searchQuery.isEmpty {
            return products
        }
        return products.filter {
            $0.name.localizedCaseInsensitiveContains(searchQuery)
        }
    }

    var body: some View {
        NavigationStack {
            List(filteredProducts) { product in
                ProductRow(product: product)
            }
            .navigationTitle("Products")
            .searchable(
                text: $searchQuery,
                placement: .navigationBarDrawer(displayMode: .always),
                prompt: "Search products..."
            )
        }
    }
}`,
        },
        tips: [
          "Search bar automatically appears in navigation bar or toolbar",
          "Use localizedCaseInsensitiveContains() for user-friendly searching",
          "Search field includes built-in clear button and proper keyboard type",
          "placement parameter controls where search bar appears (.automatic, .navigationBarDrawer, .toolbar)",
        ],
      },
      {
        format: "comparison",
        title: "Search Suggestions",
        explanation: `SwiftUI can provide search suggestions and tokens (chips) using **searchable(suggestions:)**. React requires custom autocomplete dropdowns with state management.`,
        react: {
          code: `function CitySearch() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston'];

  const suggestions = cities.filter(city =>
    city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-container">
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Search cities..."
      />
      {showSuggestions && query && (
        <ul className="suggestions-dropdown">
          {suggestions.map(city => (
            <li
              key={city}
              onClick={() => {
                setQuery(city);
                setShowSuggestions(false);
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// With search chips/tokens
function TagSearch() {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const addTag = (tag) => {
    setSelectedTags([...selectedTags, tag]);
    setQuery('');
  };

  const removeTag = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  return (
    <div>
      <div className="tag-chips">
        {selectedTags.map(tag => (
          <span key={tag} className="chip">
            {tag}
            <button onClick={() => removeTag(tag)}>×</button>
          </span>
        ))}
      </div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct CitySearch: View {
    @State private var searchQuery = ""
    let cities = ["New York", "Los Angeles", "Chicago", "Houston"]

    var suggestions: [String] {
        if searchQuery.isEmpty {
            return []
        }
        return cities.filter {
            $0.localizedCaseInsensitiveContains(searchQuery)
        }
    }

    var body: some View {
        NavigationStack {
            List(cities, id: \\.self) { city in
                Text(city)
            }
            .searchable(text: $searchQuery) {
                ForEach(suggestions, id: \\.self) { suggestion in
                    Text(suggestion)
                        .searchCompletion(suggestion)
                }
            }
            .navigationTitle("Cities")
        }
    }
}

// Search with tokens/scopes
struct ProductSearch: View {
    @State private var searchQuery = ""
    @State private var searchScope: SearchScope = .all

    enum SearchScope: String, CaseIterable {
        case all = "All"
        case electronics = "Electronics"
        case clothing = "Clothing"
    }

    var body: some View {
        NavigationStack {
            List(filteredProducts) { product in
                ProductRow(product: product)
            }
            .searchable(
                text: $searchQuery,
                tokens: $selectedTags
            ) { tag in
                Label(tag.name, systemImage: "tag")
            }
            .searchScopes($searchScope) {
                ForEach(SearchScope.allCases, id: \\.self) { scope in
                    Text(scope.rawValue).tag(scope)
                }
            }
            .navigationTitle("Products")
        }
    }
}`,
        },
        tips: [
          ".searchCompletion() creates tappable suggestions that fill the search field",
          "Suggestions appear in a list below the search bar",
          ".searchScopes() adds segmented control for filtering categories",
          "Search tokens create chip-style filters that combine with text search",
        ],
      },
      {
        format: "comparison",
        title: "Filtering Data",
        explanation: `Combine **.searchable()** with computed properties for reactive filtering. React uses filtered arrays with useMemo for performance. Both approaches recompute when search query changes.`,
        react: {
          code: `function ContactList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts] = useState([
    { id: 1, name: 'Alice', email: 'alice@example.com', department: 'Engineering' },
    { id: 2, name: 'Bob', email: 'bob@example.com', department: 'Sales' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', department: 'Engineering' },
  ]);

  // Memoize filtered results for performance
  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contacts;

    const query = searchQuery.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.department.toLowerCase().includes(query)
    );
  }, [contacts, searchQuery]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search contacts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <p>{filteredContacts.length} contacts found</p>
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            <h4>{contact.name}</h4>
            <p>{contact.email}</p>
            <span>{contact.department}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
        },
        swiftui: {
          code: `struct ContactList: View {
    @State private var searchQuery = ""
    let contacts = [
        Contact(id: 1, name: "Alice", email: "alice@example.com", department: "Engineering"),
        Contact(id: 2, name: "Bob", email: "bob@example.com", department: "Sales"),
        Contact(id: 3, name: "Charlie", email: "charlie@example.com", department: "Engineering")
    ]

    // Computed property - automatically reactive
    var filteredContacts: [Contact] {
        if searchQuery.isEmpty {
            return contacts
        }

        let query = searchQuery.lowercased()
        return contacts.filter { contact in
            contact.name.lowercased().contains(query) ||
            contact.email.lowercased().contains(query) ||
            contact.department.lowercased().contains(query)
        }
    }

    var body: some View {
        NavigationStack {
            VStack {
                Text("\\(filteredContacts.count) contacts found")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                List(filteredContacts) { contact in
                    VStack(alignment: .leading, spacing: 4) {
                        Text(contact.name)
                            .font(.headline)
                        Text(contact.email)
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                        Text(contact.department)
                            .font(.caption)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 2)
                            .background(.blue.opacity(0.2))
                            .cornerRadius(4)
                    }
                    .padding(.vertical, 4)
                }
            }
            .navigationTitle("Contacts")
            .searchable(
                text: $searchQuery,
                placement: .navigationBarDrawer(displayMode: .always),
                prompt: "Search by name, email, or department"
            )
        }
    }
}`,
        },
        tips: [
          "Computed properties automatically recalculate when @State dependencies change",
          "SwiftUI optimizes List rendering - only visible rows are created",
          "Use .lowercased() + .contains() or .localizedCaseInsensitiveContains() for searching",
          "Return full dataset when search query is empty for better UX",
        ],
      },
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    description: "VoiceOver support, Dynamic Type, and accessibility best practices",
    category: "Advanced",
    module: "swiftui",
    sections: [
      {
        format: "comparison",
        title: "Labels & Hints",
        explanation: `SwiftUI uses **accessibilityLabel** and **accessibilityHint** to provide context for screen readers. React uses **aria-label** and **aria-describedby** for similar functionality.`,
        react: {
          code: `// Basic accessibility labels
function DeleteButton() {
  return (
    <button
      aria-label="Delete item"
      aria-describedby="delete-hint"
      onClick={handleDelete}
    >
      🗑️
    </button>
  );
}

// Hidden hint text
function Form() {
  return (
    <div>
      <button aria-label="Delete item">🗑️</button>
      <span id="delete-hint" className="sr-only">
        This action cannot be undone
      </span>
    </div>
  );
}

// Image with alt text
function Avatar({ user }) {
  return (
    <img
      src={user.avatarUrl}
      alt={\`Profile picture of \${user.name}\`}
      aria-describedby="avatar-description"
    />
  );
}

// Complex component with multiple ARIA attributes
function ExpandableSection({ title, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        aria-expanded={expanded}
        aria-controls="section-content"
        aria-label={\`\${expanded ? 'Collapse' : 'Expand'} \${title} section\`}
        onClick={() => setExpanded(!expanded)}
      >
        {title} {expanded ? '▼' : '▶'}
      </button>
      {expanded && (
        <div id="section-content" role="region">
          {children}
        </div>
      )}
    </div>
  );
}`,
        },
        swiftui: {
          code: `// Basic accessibility labels
struct DeleteButton: View {
    var body: some View {
        Button {
            handleDelete()
        } label: {
            Image(systemName: "trash")
        }
        .accessibilityLabel("Delete item")
        .accessibilityHint("This action cannot be undone")
    }
}

// Image with accessibility description
struct AvatarView: View {
    let user: User

    var body: some View {
        Image(user.avatarUrl)
            .resizable()
            .frame(width: 50, height: 50)
            .clipShape(Circle())
            .accessibilityLabel("Profile picture of \\(user.name)")
    }
}

// Complex view with accessibility grouping
struct ExpandableSection: View {
    let title: String
    @State private var expanded = false

    var body: some View {
        VStack(alignment: .leading) {
            Button {
                expanded.toggle()
            } label: {
                HStack {
                    Text(title)
                    Image(systemName: expanded ? "chevron.down" : "chevron.right")
                }
            }
            .accessibilityLabel("\\(title) section")
            .accessibilityHint(expanded ? "Double tap to collapse" : "Double tap to expand")
            .accessibilityAddTraits(.isButton)

            if expanded {
                Text("Section content here")
                    .accessibilityElement(children: .contain)
            }
        }
    }
}

// Custom accessibility for decorative images
struct DecorativeImage: View {
    var body: some View {
        Image("decorative-pattern")
            .accessibilityHidden(true) // Hide from screen readers
    }
}`,
        },
        tips: [
          "Use .accessibilityLabel() for what the element is",
          "Use .accessibilityHint() for what happens when interacted with",
          ".accessibilityHidden(true) removes decorative elements from VoiceOver",
          "Combine multiple elements into one accessible element with .accessibilityElement(children: .combine)",
        ],
      },
      {
        format: "comparison",
        title: "VoiceOver",
        explanation: `SwiftUI provides **accessibility traits** and **values** for screen reader support. React uses **ARIA roles** and attributes. Both systems help users navigate apps without sight.`,
        react: {
          code: `// Slider with ARIA
function VolumeSlider() {
  const [volume, setVolume] = useState(50);

  return (
    <div>
      <label htmlFor="volume">Volume</label>
      <input
        id="volume"
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={volume}
        aria-valuetext={\`\${volume} percent\`}
      />
    </div>
  );
}

// Toggle with ARIA states
function ToggleSwitch({ label, enabled, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
      className={\`toggle \${enabled ? 'on' : 'off'}\`}
    >
      {enabled ? 'On' : 'Off'}
    </button>
  );
}

// Progress indicator
function DownloadProgress({ progress }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Download progress"
    >
      <div style={{ width: \`\${progress}%\` }} className="progress-fill" />
      <span aria-live="polite">{progress}% complete</span>
    </div>
  );
}

// Navigation with ARIA landmarks
function AppLayout() {
  return (
    <div>
      <header role="banner">
        <nav role="navigation" aria-label="Main navigation">
          {/* Nav items */}
        </nav>
      </header>
      <main role="main">
        {/* Content */}
      </main>
      <aside role="complementary" aria-label="Related links">
        {/* Sidebar */}
      </aside>
    </div>
  );
}`,
        },
        swiftui: {
          code: `// Slider with accessibility value
struct VolumeSlider: View {
    @State private var volume: Double = 50

    var body: some View {
        VStack {
            Text("Volume")
            Slider(value: $volume, in: 0...100)
                .accessibilityLabel("Volume")
                .accessibilityValue("\\(Int(volume)) percent")
        }
    }
}

// Toggle with accessibility traits
struct ToggleSwitch: View {
    @State private var enabled = false

    var body: some View {
        Toggle("Enable notifications", isOn: $enabled)
            .accessibilityLabel("Enable notifications")
            .accessibilityValue(enabled ? "On" : "Off")
            .accessibilityAddTraits(.isToggle)
    }
}

// Progress indicator
struct DownloadProgress: View {
    let progress: Double

    var body: some View {
        VStack {
            ProgressView(value: progress, total: 100)
            Text("\\(Int(progress))% complete")
                .accessibilityLabel("Download progress")
                .accessibilityValue("\\(Int(progress)) percent complete")
        }
    }
}

// Custom control with accessibility
struct StarRating: View {
    @State private var rating = 3
    let maxRating = 5

    var body: some View {
        HStack {
            ForEach(1...maxRating, id: \\.self) { star in
                Button {
                    rating = star
                } label: {
                    Image(systemName: star <= rating ? "star.fill" : "star")
                }
                .accessibilityLabel("\\(star) stars")
                .accessibilityAddTraits(star == rating ? [.isSelected, .isButton] : .isButton)
            }
        }
        .accessibilityElement(children: .contain)
        .accessibilityLabel("Rating")
        .accessibilityValue("\\(rating) out of \\(maxRating) stars")
        .accessibilityAdjustableAction { direction in
            switch direction {
            case .increment:
                if rating < maxRating { rating += 1 }
            case .decrement:
                if rating > 1 { rating -= 1 }
            @unknown default:
                break
            }
        }
    }
}`,
        },
        tips: [
          "Use .accessibilityValue() for current state (e.g., slider value, toggle state)",
          ".accessibilityAddTraits() adds semantic info: .isButton, .isHeader, .isSelected",
          ".accessibilityAdjustableAction() allows VoiceOver swipe up/down gestures",
          "Test with VoiceOver enabled in Simulator: Cmd+F5",
        ],
      },
      {
        format: "comparison",
        title: "Dynamic Type",
        explanation: `SwiftUI supports **Dynamic Type** for font scaling with **@ScaledMetric**. React uses **rem units** or responsive font sizing with CSS. Both allow users with vision impairments to increase text size.`,
        react: {
          code: `// Using rem units (scales with root font-size)
function Article() {
  return (
    <article style={{ fontSize: '1rem' }}>
      <h1 style={{ fontSize: '2rem' }}>Article Title</h1>
      <p style={{ fontSize: '1rem' }}>
        Body text that scales with user preferences.
      </p>
      <small style={{ fontSize: '0.875rem' }}>Published today</small>
    </article>
  );
}

// Responsive font scaling with CSS clamp
function ResponsiveHeading() {
  return (
    <h1 style={{
      fontSize: 'clamp(1.5rem, 5vw, 3rem)',
    }}>
      Responsive Heading
    </h1>
  );
}

// Custom hook for system font size
function useSystemFontScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      setScale(rootFontSize / 16); // 16px is default
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return scale;
}

function ScalingCard() {
  const scale = useSystemFontScale();

  return (
    <div style={{
      padding: \`\${16 * scale}px\`,
      fontSize: \`\${14 * scale}px\`,
    }}>
      Content that scales with system settings
    </div>
  );
}`,
        },
        swiftui: {
          code: `// Built-in Dynamic Type support
struct Article: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Article Title")
                .font(.title) // Automatically scales

            Text("Body text that scales with user preferences.")
                .font(.body)

            Text("Published today")
                .font(.caption)
        }
    }
}

// Custom spacing that scales with text size
struct ScalingCard: View {
    @ScaledMetric var padding: CGFloat = 16
    @ScaledMetric(relativeTo: .body) var iconSize: CGFloat = 20

    var body: some View {
        HStack(spacing: padding) {
            Image(systemName: "star.fill")
                .font(.system(size: iconSize))

            Text("Content")
                .font(.body)
        }
        .padding(padding)
        .background(Color.gray.opacity(0.2))
        .cornerRadius(8)
    }
}

// Limit Dynamic Type scaling
struct FixedSizeLabel: View {
    var body: some View {
        Text("Fixed size text")
            .font(.body)
            .dynamicTypeSize(...DynamicTypeSize.xxxLarge) // Limit max size
    }
}

// Custom font with Dynamic Type
struct CustomFontText: View {
    var body: some View {
        Text("Custom Font")
            .font(.custom("Helvetica", size: 17, relativeTo: .body))
            // relativeTo ensures it scales with Dynamic Type
    }
}

// Responsive layout based on text size
struct AdaptiveLayout: View {
    @Environment(\\.dynamicTypeSize) var dynamicTypeSize

    var body: some View {
        if dynamicTypeSize >= .xxxLarge {
            VStack { // Stack vertically for large text
                Label("Settings", systemImage: "gear")
            }
        } else {
            HStack { // Stack horizontally for normal text
                Label("Settings", systemImage: "gear")
            }
        }
    }
}`,
        },
        tips: [
          "@ScaledMetric automatically scales values based on user's text size setting",
          "Use relativeTo parameter to tie scaling to specific text style",
          ".dynamicTypeSize() modifier can limit maximum scaling range",
          "Access current size with @Environment(\\.dynamicTypeSize) to adapt layout",
        ],
      },
      {
        format: "comparison",
        title: "Reduce Motion",
        explanation: `SwiftUI provides **@Environment(\\.accessibilityReduceMotion)** to detect when users have enabled Reduce Motion. React uses the **prefers-reduced-motion** CSS media query. Both help users with motion sensitivity.`,
        react: {
          code: `// CSS media query approach
const styles = {
  card: {
    transition: 'transform 0.3s ease',
  },
};

// In CSS:
// @media (prefers-reduced-motion: reduce) {
//   .card { transition: none; }
// }

function AnimatedCard() {
  return (
    <div className="card" style={styles.card}>
      Content
    </div>
  );
}

// JavaScript hook for reduce motion
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

function ResponsiveAnimation() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      style={{
        transition: prefersReducedMotion ? 'none' : 'all 0.3s ease',
        transform: 'translateY(0)',
      }}
      onMouseEnter={(e) => {
        if (!prefersReducedMotion) {
          e.currentTarget.style.transform = 'translateY(-10px)';
        }
      }}
    >
      Hover me
    </div>
  );
}

// Conditional animation with Framer Motion
import { motion } from 'framer-motion';

function MotionCard() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
      }}
    >
      Content
    </motion.div>
  );
}`,
        },
        swiftui: {
          code: `// Environment value for reduce motion
struct AnimatedCard: View {
    @Environment(\\.accessibilityReduceMotion) var reduceMotion
    @State private var isExpanded = false

    var body: some View {
        VStack {
            Text("Card Content")
        }
        .frame(width: 200, height: isExpanded ? 300 : 100)
        .background(Color.blue)
        .cornerRadius(12)
        .animation(
            reduceMotion ? .none : .spring(duration: 0.3),
            value: isExpanded
        )
        .onTapGesture {
            isExpanded.toggle()
        }
    }
}

// Conditional animation
struct ConditionalAnimation: View {
    @Environment(\\.accessibilityReduceMotion) var reduceMotion
    @State private var offset: CGFloat = 0

    var body: some View {
        Text("Hover me")
            .offset(y: offset)
            .onHover { hovering in
                withAnimation(reduceMotion ? .none : .easeInOut) {
                    offset = hovering ? -10 : 0
                }
            }
    }
}

// Alternative visual feedback without motion
struct AccessibleButton: View {
    @Environment(\\.accessibilityReduceMotion) var reduceMotion
    @State private var isPressed = false

    var body: some View {
        Button("Action") {
            print("Tapped")
        }
        .scaleEffect(isPressed && !reduceMotion ? 0.95 : 1.0)
        .opacity(isPressed && reduceMotion ? 0.7 : 1.0) // Use opacity instead
        .buttonStyle(.borderedProminent)
        .simultaneousGesture(
            DragGesture(minimumDistance: 0)
                .onChanged { _ in isPressed = true }
                .onEnded { _ in isPressed = false }
        )
    }
}

// Skip entrance animation when reduce motion enabled
struct ListView: View {
    @Environment(\\.accessibilityReduceMotion) var reduceMotion
    let items = ["Item 1", "Item 2", "Item 3"]

    var body: some View {
        List(items, id: \\.self) { item in
            Text(item)
                .transition(reduceMotion ? .identity : .slide)
        }
        .animation(reduceMotion ? .none : .default, value: items)
    }
}`,
        },
        tips: [
          "Use @Environment(\\.accessibilityReduceMotion) to check user preference",
          "Replace animations with instant state changes when reduce motion is enabled",
          "Consider alternative feedback like opacity or color changes instead of motion",
          "Test with Reduce Motion enabled in Settings > Accessibility > Motion",
        ],
      },
    ],
  },
];

export const lessons: Lesson[] = [...swiftBasicsLessons, ...swiftuiLessons];

export function getLessonsByModule(module: "swift-basics" | "swiftui"): Lesson[] {
  return lessons.filter((l) => l.module === module);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getCategoriesForModule(module: "swift-basics" | "swiftui"): string[] {
  return [...new Set(getLessonsByModule(module).map((l) => l.category))];
}

export const categories = [...new Set(lessons.map((l) => l.category))];
