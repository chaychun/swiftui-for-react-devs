import type { Lesson } from "../types";

export const swiftuiLessons: Lesson[] = [
  {
    id: "basics",
    title: "Basic Components",
    description: "Learn how React components map to SwiftUI Views",
    module: "swiftui",
    category: "Fundamentals",
    sections: [
      {
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
            // On dependency change
            .onChange(of: userId) { newId in
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
          "@Observable is new in iOS 17 - simpler than ObservableObject",
          "Views only re-render when properties they READ change",
          "Inject with .environment(), read with @Environment",
          "For iOS 16 and earlier, use ObservableObject + @Published",
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
    ],
  },
];

import { swiftBasicsLessons } from "./swift-basics";

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
