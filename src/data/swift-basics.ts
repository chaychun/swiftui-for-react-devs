import type { Lesson } from "../types";

// Swift Basics module lessons - teaching fundamental Swift concepts
// These compare TypeScript/JavaScript patterns with Swift equivalents
export const swiftBasicsLessons: Lesson[] = [
  {
    id: "types-and-inference",
    title: "Types & Type Inference",
    description: "Swift's type system compared to TypeScript - capitals, inference, and collections",
    module: "swift-basics",
    category: "Type System",
    sections: [
      {
        title: "Basic Type Annotations",
        explanation: `Swift uses **capital letters** for all type names: \`String\`, \`Int\`, \`Bool\`, \`Double\`. There's no \`number\` type - Swift distinguishes between integers and floating-point numbers.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// TypeScript types
let name: string = "Alice";
let age: number = 30;
let isActive: boolean = true;
let price: number = 19.99;

// Function with types
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`,
        },
        swiftui: {
          code: `// Swift types - always capitalized
let name: String = "Alice"
let age: Int = 30
let isActive: Bool = true
let price: Double = 19.99

// Function with types
func greet(name: String) -> String {
    return "Hello, \\(name)!"
}`,
        },
        tips: [
          "Swift has Int, Double, Float - no generic `number` type",
          "String, Bool, Int, Double are all capitalized",
          "Use Double for decimals (Float is less common)",
          "Return type comes after `->` not before function name",
        ],
      },
      {
        title: "Type Inference",
        explanation: `Both TypeScript and Swift excel at **type inference**, but Swift is stricter with numeric types. Swift infers integers vs doubles based on the literal value.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// TypeScript infers types
let name = "Bob";        // string
let count = 42;          // number
let ratio = 3.14;        // number (same as above!)
let isValid = true;      // boolean

// Arrays
let numbers = [1, 2, 3]; // number[]

// Mixed numbers work fine
let values = [1, 2.5, 3]; // number[]`,
        },
        swiftui: {
          code: `// Swift infers types
let name = "Bob"         // String
let count = 42           // Int (not Double!)
let ratio = 3.14         // Double
let isValid = true       // Bool

// Arrays
let numbers = [1, 2, 3]  // [Int]

// Mixed integers/doubles? Must be explicit:
let values: [Double] = [1, 2.5, 3]`,
        },
        tips: [
          "Swift infers `42` as Int, `3.14` as Double - they're different types!",
          "No semicolons needed in Swift (optional)",
          "Swift arrays are homogeneous - all elements same type",
          "Use explicit type annotation when mixing Int/Double literals",
        ],
      },
      {
        title: "Arrays & Dictionaries",
        explanation: `Swift uses bracket syntax for collections: \`[String]\` for arrays and \`[String: Int]\` for dictionaries (objects/maps).`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// Arrays
let names: string[] = ["Alice", "Bob"];
let scores: Array<number> = [95, 87, 92];

// Objects/Maps
let ages: { [key: string]: number } = {
  "Alice": 30,
  "Bob": 25
};

// Or with Map
let scoresMap = new Map<string, number>();
scoresMap.set("Alice", 95);

// Record type
let config: Record<string, boolean> = {
  darkMode: true,
  notifications: false
};`,
        },
        swiftui: {
          code: `// Arrays
let names: [String] = ["Alice", "Bob"]
let scores: Array<Int> = [95, 87, 92]

// Dictionaries
let ages: [String: Int] = [
    "Alice": 30,
    "Bob": 25
]

// Access returns Optional (might not exist)
let aliceAge = ages["Alice"]  // Int?

// Empty collections need type annotation
let emptyArray: [String] = []
let emptyDict: [String: Int] = [:]`,
        },
        tips: [
          "`[String]` is shorthand for `Array<String>`",
          "`[String: Int]` is a Dictionary (like Map or Record)",
          "Dictionary access returns an Optional - the key might not exist",
          "Use `[:]` for empty dictionary literal",
        ],
      },
      {
        title: "String Interpolation",
        explanation: `Both languages support embedding values in strings, but with different syntax. Swift uses \`\\(value)\` inside regular strings.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `const name = "Alice";
const age = 30;

// Template literals (backticks)
const greeting = \`Hello, \${name}!\`;
const info = \`\${name} is \${age} years old\`;

// Expression interpolation
const calc = \`Sum: \${10 + 20}\`;
const upper = \`Name: \${name.toUpperCase()}\`;

// Multi-line strings
const poem = \`
  Roses are red,
  Violets are blue
\`;`,
        },
        swiftui: {
          code: `let name = "Alice"
let age = 30

// String interpolation (regular quotes!)
let greeting = "Hello, \\(name)!"
let info = "\\(name) is \\(age) years old"

// Expression interpolation
let calc = "Sum: \\(10 + 20)"
let upper = "Name: \\(name.uppercased())"

// Multi-line strings (triple quotes)
let poem = """
    Roses are red,
    Violets are blue
    """`,
        },
        tips: [
          "Swift uses `\\(value)` not `${value}` for interpolation",
          "Regular double quotes work - no special backtick syntax needed",
          "Triple quotes `\"\"\"` for multi-line strings",
          "Any expression works inside `\\( )`",
        ],
      },
    ],
  },
  {
    id: "optionals-nil-safety",
    title: "Optionals & Nil Safety",
    description: "Swift's approach to null safety - Optional types, unwrapping, and guard statements",
    module: "swift-basics",
    category: "Type System",
    sections: [
      {
        title: "Optional Declaration",
        explanation: `Swift uses \`?\` to mark optional types - values that might be \`nil\` (Swift's \`null\`). This is similar to TypeScript's \`| undefined\` but enforced at compile time.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// Optional/nullable types
let name: string | null = null;
let age: number | undefined = undefined;

// Optional property
interface User {
  name: string;
  email?: string;  // string | undefined
}

// Function with optional param
function greet(name?: string): string {
  return name ? \`Hello, \${name}!\` : "Hello!";
}`,
        },
        swiftui: {
          code: `// Optional types with ?
var name: String? = nil
var age: Int? = nil

// Struct with optional property
struct User {
    let name: String
    var email: String?  // Optional<String>
}

// Function with optional param
func greet(name: String?) -> String {
    if let name = name {
        return "Hello, \\(name)!"
    }
    return "Hello!"
}`,
        },
        tips: [
          "`String?` is shorthand for `Optional<String>`",
          "Swift uses `nil` not `null` or `undefined`",
          "Unlike TS, you can't use optional directly - must unwrap first",
          "Optionals are a distinct type, not a union",
        ],
      },
      {
        title: "Optional Chaining",
        explanation: `Both languages use \`?.\` for optional chaining, letting you safely access properties on potentially nil/undefined values.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `interface User {
  profile?: {
    avatar?: {
      url: string;
    };
  };
}

const user: User = {};

// Optional chaining
const url = user.profile?.avatar?.url;

// With method calls
const length = user.profile?.avatar?.url.length;

// With nullish coalescing
const imageUrl = user.profile?.avatar?.url ?? "default.png";`,
        },
        swiftui: {
          code: `struct Avatar {
    let url: String
}

struct Profile {
    var avatar: Avatar?
}

struct User {
    var profile: Profile?
}

let user = User(profile: nil)

// Optional chaining
let url = user.profile?.avatar?.url

// With method calls
let length = user.profile?.avatar?.url.count

// With nil coalescing
let imageUrl = user.profile?.avatar?.url ?? "default.png"`,
        },
        tips: [
          "Optional chaining `?.` works the same way!",
          "Returns nil if any part of the chain is nil",
          "Can chain as deep as needed",
          "The result type is always Optional",
        ],
      },
      {
        title: "Unwrapping with if let",
        explanation: `Swift's \`if let\` syntax safely unwraps an optional into a non-optional value within a scope. This is cleaner than TypeScript's truthiness checks.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `function processUser(name: string | null) {
  // Truthiness check
  if (name) {
    // name is narrowed to string
    console.log(name.toUpperCase());
  }

  // Explicit null check
  if (name !== null && name !== undefined) {
    console.log(name.length);
  }
}

// Doesn't handle empty string correctly!
const input = "";
if (input) {
  // This block is skipped for ""
}`,
        },
        swiftui: {
          code: `func processUser(name: String?) {
    // if let unwrapping
    if let name = name {
        // name is now String (not String?)
        print(name.uppercased())
    }

    // Shorthand (Swift 5.7+)
    if let name {
        print(name.count)
    }
}

// Works correctly with empty string!
let input: String? = ""
if let input {
    // This block DOES run for ""
    print("Got: \\(input)")
}`,
        },
        tips: [
          "`if let x = x` unwraps optional x into non-optional x",
          "Swift 5.7+ shorthand: `if let x` when variable name matches",
          "Unlike TS, empty string `\"\"` is NOT considered nil",
          "The unwrapped variable only exists inside the if block",
        ],
      },
      {
        title: "Guard Statements",
        explanation: `\`guard let\` is like an inverted \`if let\` - it handles the failure case first and lets the success case flow through. Great for early returns.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `function processOrder(order: Order | null): void {
  // Early return pattern
  if (!order) {
    console.log("No order");
    return;
  }

  // Now order is guaranteed to exist
  console.log(order.items);
  console.log(order.total);
}

// Multiple checks
function validateUser(user: User | null): boolean {
  if (!user) return false;
  if (!user.email) return false;
  if (!user.verified) return false;

  // All validations passed
  sendWelcome(user.email);
  return true;
}`,
        },
        swiftui: {
          code: `func processOrder(order: Order?) {
    // Guard statement - must exit if nil
    guard let order = order else {
        print("No order")
        return
    }

    // order is unwrapped for rest of function!
    print(order.items)
    print(order.total)
}

// Multiple guards
func validateUser(user: User?) -> Bool {
    guard let user else { return false }
    guard let email = user.email else { return false }
    guard user.verified else { return false }

    // All validations passed
    sendWelcome(email: email)
    return true
}`,
        },
        tips: [
          "`guard` must exit scope (return, throw, break, continue)",
          "Unwrapped values are available AFTER the guard, not inside",
          "Great for the 'early exit' pattern",
          "Reduces nesting compared to `if let`",
        ],
      },
      {
        title: "Force Unwrap & Nil Coalescing",
        explanation: `Force unwrap (\`!\`) crashes if nil - use sparingly. Nil coalescing (\`??\`) provides a default value safely.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// Non-null assertion (!)
// TypeScript trusts you - no runtime check
function risky(value: string | null) {
  console.log(value!.length);  // Might crash!
}

// Nullish coalescing (??)
const name = username ?? "Anonymous";
const count = value ?? 0;

// Chaining with ??
const display = user?.name ?? user?.email ?? "Guest";

// Logical OR (|| ) - different behavior!
const text = input || "default";  // "" becomes "default"
const text2 = input ?? "default"; // "" stays ""`,
        },
        swiftui: {
          code: `// Force unwrap (!)
// Swift crashes at runtime if nil
func risky(value: String?) {
    print(value!.count)  // Crashes if nil!
}

// Nil coalescing (??)
let name = username ?? "Anonymous"
let count = value ?? 0

// Chaining with ??
let display = user?.name ?? user?.email ?? "Guest"

// No || for optionals - ?? is your tool
// Empty string "" is NOT nil, so:
let input: String? = ""
let text = input ?? "default"  // text is ""`,
        },
        tips: [
          "`!` force unwraps - crashes if nil. Use sparingly!",
          "`??` provides fallback value when Optional is nil",
          "Common pattern: `try? something ?? fallback`",
          "Only use `!` when you're 100% certain it's not nil",
        ],
      },
    ],
  },
  {
    id: "structs-vs-classes",
    title: "Structs vs Classes",
    description: "Understanding value types vs reference types in Swift",
    module: "swift-basics",
    category: "Memory & Types",
    sections: [
      {
        title: "Class Syntax",
        explanation: `Classes in Swift look similar to TypeScript classes. They are **reference types** - when you assign or pass them, you're sharing the same instance.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return \`Hi, I'm \${this.name}\`;
  }
}

const alice = new Person("Alice", 30);
console.log(alice.greet());`,
        },
        swiftui: {
          code: `class Person {
    var name: String
    var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    func greet() -> String {
        return "Hi, I'm \\(name)"
    }
}

let alice = Person(name: "Alice", age: 30)
print(alice.greet())`,
        },
        tips: [
          "`init` instead of `constructor`",
          "`self` instead of `this`",
          "`func` keyword for methods",
          "No `new` keyword - just call the type directly",
        ],
      },
      {
        title: "Struct Syntax",
        explanation: `Structs are Swift's **value types**. They get copied when assigned or passed. TypeScript doesn't have true value-type structs.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// TypeScript has no true structs
// Interfaces/types define shape but objects are references

interface Point {
  x: number;
  y: number;
}

// Still a reference type!
const p1: Point = { x: 10, y: 20 };
const p2 = p1;  // Same reference
p2.x = 100;
console.log(p1.x);  // 100 - p1 changed too!

// To get value semantics, must spread:
const p3 = { ...p1 };  // New object
p3.x = 200;
console.log(p1.x);  // Still 100`,
        },
        swiftui: {
          code: `// Swift structs are VALUE types
struct Point {
    var x: Int
    var y: Int
}

// Automatic memberwise initializer!
var p1 = Point(x: 10, y: 20)
var p2 = p1  // COPY, not reference
p2.x = 100
print(p1.x)  // 10 - p1 unchanged!

// Even arrays of structs are copied
var points1 = [Point(x: 0, y: 0)]
var points2 = points1  // Copy!
points2[0].x = 999
print(points1[0].x)  // 0 - unchanged`,
        },
        tips: [
          "Structs automatically get a memberwise `init`",
          "Assignment copies the entire value",
          "Use `var` to allow mutation, `let` for immutable",
          "Arrays, Dictionaries, Strings are all structs in Swift!",
        ],
      },
      {
        title: "Value vs Reference Demo",
        explanation: `The key difference: classes share data (reference), structs copy data (value). This affects how changes propagate through your code.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// Reference type behavior (all objects)
class Counter {
  value = 0;
  increment() { this.value++; }
}

const c1 = new Counter();
const c2 = c1;  // Same instance!

c2.increment();
console.log(c1.value);  // 1 - both changed

// Functions receive references too
function bump(counter: Counter) {
  counter.increment();
}
bump(c1);
console.log(c1.value);  // 2`,
        },
        swiftui: {
          code: `// Class (reference type)
class CounterClass {
    var value = 0
    func increment() { value += 1 }
}

let c1 = CounterClass()
let c2 = c1  // Same instance
c2.increment()
print(c1.value)  // 1 - both share

// Struct (value type)
struct CounterStruct {
    var value = 0
    mutating func increment() { value += 1 }
}

var s1 = CounterStruct()
var s2 = s1  // COPY!
s2.increment()
print(s1.value)  // 0 - unchanged`,
        },
        tips: [
          "Classes: multiple variables can point to same instance",
          "Structs: each variable has its own copy",
          "SwiftUI heavily uses structs (Views are structs!)",
          "Use classes when you need shared mutable state",
        ],
      },
      {
        title: "Mutating Methods",
        explanation: `Struct methods that modify \`self\` must be marked \`mutating\`. This is because structs are value types - modification creates a conceptually new value.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// No concept of mutating - objects always mutable
interface Vector {
  x: number;
  y: number;
}

// Method that modifies (if class)
class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  scale(factor: number): void {
    this.x *= factor;
    this.y *= factor;
  }
}

const v = new Vector(10, 20);
v.scale(2);  // Always allowed`,
        },
        swiftui: {
          code: `struct Vector {
    var x: Double
    var y: Double

    // Must mark as mutating!
    mutating func scale(by factor: Double) {
        x *= factor
        y *= factor
    }

    // Non-mutating returns new value
    func scaled(by factor: Double) -> Vector {
        return Vector(x: x * factor, y: y * factor)
    }
}

var v1 = Vector(x: 10, y: 20)
v1.scale(by: 2)  // OK - v1 is var

let v2 = Vector(x: 10, y: 20)
// v2.scale(by: 2)  // ERROR! v2 is let
let v3 = v2.scaled(by: 2)  // OK - new value`,
        },
        tips: [
          "`mutating` keyword required for struct methods that modify self",
          "Can't call mutating methods on `let` constants",
          "Pattern: `scale()` mutates, `scaled()` returns new value",
          "Class methods don't need `mutating` - they're references",
        ],
      },
      {
        title: "When to Use Which",
        explanation: `Swift convention: **prefer structs** unless you need reference semantics. SwiftUI Views, models, and most data types should be structs.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// In TypeScript, you typically use:

// Interfaces for data shapes
interface User {
  id: string;
  name: string;
}

// Classes for complex objects with behavior
class UserService {
  private users: User[] = [];

  addUser(user: User) { /*...*/ }
  findById(id: string) { /*...*/ }
}

// Objects are always references
// No real choice between value/reference`,
        },
        swiftui: {
          code: `// Swift guidelines:

// Structs for: data, models, Views
struct User {
    let id: UUID
    var name: String
}

struct ProfileView: View {
    let user: User
    var body: some View { /*...*/ }
}

// Classes for: shared state, identity matters
class UserService {
    private var users: [User] = []

    func addUser(_ user: User) { /*...*/ }
    func findById(_ id: UUID) -> User? { /*...*/ }
}

// Classes for: inheritance needed
class NetworkError: Error { /*...*/ }
class TimeoutError: NetworkError { /*...*/ }`,
        },
        tips: [
          "Default to struct - it's the Swift way",
          "Use class when you NEED shared mutable state",
          "Use class when you need inheritance",
          "SwiftUI Views are always structs",
        ],
      },
    ],
  },
  {
    id: "protocols",
    title: "Protocols",
    description: "Swift protocols are like TypeScript interfaces, but with superpowers",
    module: "swift-basics",
    category: "Memory & Types",
    sections: [
      {
        title: "Basic Protocol",
        explanation: `Swift protocols define a contract of properties and methods that conforming types must implement. Very similar to TypeScript interfaces!`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// Interface defines a contract
interface Drawable {
  draw(): void;
}

interface Named {
  name: string;
}

// Class implements interfaces
class Circle implements Drawable, Named {
  name = "Circle";

  draw(): void {
    console.log("Drawing a circle");
  }
}

// Function accepts interface type
function render(item: Drawable): void {
  item.draw();
}`,
        },
        swiftui: {
          code: `// Protocol defines a contract
protocol Drawable {
    func draw()
}

protocol Named {
    var name: String { get }
}

// Struct/class conforms to protocols
struct Circle: Drawable, Named {
    let name = "Circle"

    func draw() {
        print("Drawing a circle")
    }
}

// Function accepts protocol type
func render(item: Drawable) {
    item.draw()
}`,
        },
        tips: [
          "Use `:` not `implements` for conformance",
          "Both structs AND classes can conform to protocols",
          "Protocol is the Swift term, interface is TypeScript",
          "Separate multiple protocols with commas",
        ],
      },
      {
        title: "Conforming to Protocols",
        explanation: `Conformance syntax uses a colon after the type name. You can also add conformance in extensions, keeping your types organized.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `interface Equatable {
  equals(other: this): boolean;
}

interface Hashable extends Equatable {
  hashCode(): number;
}

// Implements at declaration
class User implements Hashable {
  constructor(public id: string) {}

  equals(other: User): boolean {
    return this.id === other.id;
  }

  hashCode(): number {
    return this.id.length; // Simplified
  }
}`,
        },
        swiftui: {
          code: `// Protocol inheritance
protocol Equatable {
    static func == (lhs: Self, rhs: Self) -> Bool
}

protocol Hashable: Equatable {
    func hash(into hasher: inout Hasher)
}

// Conform at declaration
struct User: Hashable {
    let id: String

    // Swift auto-synthesizes for simple types!
}

// Or conform via extension
struct Product {
    let sku: String
    let name: String
}

extension Product: Hashable {
    // Also auto-synthesized!
}`,
        },
        tips: [
          "Swift auto-synthesizes Equatable/Hashable for simple types",
          "Extensions can add protocol conformance later",
          "Protocol inheritance uses `:` (like class inheritance)",
          "No need to write boilerplate equality code!",
        ],
      },
      {
        title: "Protocol Properties",
        explanation: `Protocol properties must specify if they're gettable (\`{ get }\`) or settable (\`{ get set }\`). This is more explicit than TypeScript.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `interface Vehicle {
  // All properties are read/write by default
  speed: number;
  brand: string;

  // Readonly property
  readonly vin: string;

  // Getter only
  get description(): string;
}

class Car implements Vehicle {
  speed = 0;
  brand: string;
  readonly vin: string;

  constructor(brand: string, vin: string) {
    this.brand = brand;
    this.vin = vin;
  }

  get description(): string {
    return \`\${this.brand} going \${this.speed}mph\`;
  }
}`,
        },
        swiftui: {
          code: `protocol Vehicle {
    // Read-only property
    var vin: String { get }

    // Read-write property
    var speed: Int { get set }

    // Read-only computed property
    var description: String { get }
}

struct Car: Vehicle {
    let vin: String          // Stored, satisfies { get }
    var speed: Int = 0       // Stored, satisfies { get set }
    let brand: String

    var description: String {  // Computed
        "\\(brand) going \\(speed)mph"
    }
}

// { get } can be satisfied by let, var, or computed
// { get set } requires var or read-write computed`,
        },
        tips: [
          "`{ get }` = read-only, can use let, var, or computed property",
          "`{ get set }` = read-write, must be var",
          "More explicit than TypeScript's `readonly`",
          "Protocol doesn't care HOW you implement it",
        ],
      },
      {
        title: "Protocol Extensions (Swift Superpower)",
        explanation: `Swift lets you add **default implementations** to protocols via extensions. This is like mixing in behavior - powerful for code reuse!`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// TypeScript can't add default implementations to interfaces
// Must use abstract classes or mixins

interface Greetable {
  name: string;
  greet(): string;  // No default possible
}

// Workaround: abstract class
abstract class GreetableBase {
  abstract name: string;

  greet(): string {
    return \`Hello, I'm \${this.name}\`;
  }
}

// Or use mixins (complex pattern)
function GreetableMixin<T extends new(...args: any[]) => {}>(Base: T) {
  return class extends Base {
    greet() {
      return \`Hello, I'm \${(this as any).name}\`;
    }
  };
}`,
        },
        swiftui: {
          code: `protocol Greetable {
    var name: String { get }
    func greet() -> String
}

// Default implementation in extension!
extension Greetable {
    func greet() -> String {
        return "Hello, I'm \\(name)"
    }

    // Add extra methods too!
    func shout() -> String {
        return greet().uppercased()
    }
}

// Conforming type gets it for free
struct Person: Greetable {
    let name: String
    // greet() and shout() come automatically!
}

let person = Person(name: "Alice")
print(person.greet())  // "Hello, I'm Alice"
print(person.shout())  // "HELLO, I'M ALICE"`,
        },
        tips: [
          "Protocol extensions add default behavior to ALL conforming types",
          "Types can override the default if needed",
          "This is how Swift's Collection methods work",
          "Powerful for creating consistent APIs across types",
        ],
      },
      {
        title: "The View Protocol",
        explanation: `SwiftUI's \`View\` protocol is the foundation of all UI. Understanding protocols helps you understand why Views work the way they do.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// React components are functions returning JSX
// No formal protocol/interface required

function MyComponent(): JSX.Element {
  return <div>Hello</div>;
}

// Or with React.FC (rarely used now)
const MyComponent: React.FC = () => {
  return <div>Hello</div>;
};

// Children handling is ad-hoc
interface Props {
  children?: React.ReactNode;
}

function Container({ children }: Props) {
  return <div className="container">{children}</div>;
}`,
        },
        swiftui: {
          code: `// View is a protocol with one requirement
protocol View {
    associatedtype Body: View
    @ViewBuilder var body: Body { get }
}

// Every SwiftUI view conforms to View
struct MyComponent: View {
    var body: some View {
        Text("Hello")
    }
}

// some View = "some type conforming to View"
struct Container<Content: View>: View {
    let content: Content

    var body: some View {
        VStack {
            content
        }
        .padding()
    }
}`,
        },
        tips: [
          "Every SwiftUI view is a struct conforming to View protocol",
          "`some View` is an opaque return type",
          "The body property is the one requirement",
          "@ViewBuilder enables the DSL syntax in body",
        ],
      },
    ],
  },
  {
    id: "closures",
    title: "Closures",
    description: "Swift closures are anonymous functions with concise syntax options",
    module: "swift-basics",
    category: "Functions & Closures",
    sections: [
      {
        title: "Basic Closure Syntax",
        explanation: `Swift closures are enclosed in braces with parameters and return type before the \`in\` keyword. They're similar to arrow functions but with different syntax.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// Arrow functions
const add = (a: number, b: number): number => {
  return a + b;
};

// Implicit return (single expression)
const multiply = (a: number, b: number): number => a * b;

// Higher-order function usage
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);

// Closure with no parameters
const greet = () => console.log("Hello!");`,
        },
        swiftui: {
          code: `// Full closure syntax
let add = { (a: Int, b: Int) -> Int in
    return a + b
}

// Implicit return (single expression)
let multiply = { (a: Int, b: Int) -> Int in a * b }

// Higher-order function usage
let numbers = [1, 2, 3, 4, 5]
let doubled = numbers.map({ (n: Int) -> Int in n * 2 })
let evens = numbers.filter({ (n: Int) -> Bool in n % 2 == 0 })

// Closure with no parameters
let greet = { print("Hello!") }`,
        },
        tips: [
          "`{ (params) -> ReturnType in body }` is full closure syntax",
          "`in` keyword separates parameters from body",
          "Types can often be inferred (we'll simplify next!)",
          "Single-expression closures have implicit return",
        ],
      },
      {
        title: "Trailing Closure Syntax",
        explanation: `When a closure is the last argument, you can write it after the parentheses. If it's the only argument, you can omit the parentheses entirely!`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// Callback as last argument
fetch("/api/users")
  .then((response) => response.json())
  .then((data) => console.log(data));

// Higher-order functions
const doubled = numbers.map((n) => n * 2);

// Event handlers
button.addEventListener("click", () => {
  console.log("clicked");
});

// Timer
setTimeout(() => {
  console.log("delayed");
}, 1000);`,
        },
        swiftui: {
          code: `// Trailing closure - moves outside parens
let doubled = numbers.map { n in
    n * 2
}

// If closure is only argument, omit parens!
let evens = numbers.filter { n in
    n % 2 == 0
}

// Sort with trailing closure
let sorted = names.sorted { a, b in
    a < b
}

// SwiftUI uses this everywhere
Button("Tap me") {
    print("tapped")
}

// Timer equivalent
DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
    print("delayed")
}`,
        },
        tips: [
          "Trailing closure moves after the `)` or replaces `()`",
          "Makes DSL-style code readable (see SwiftUI!)",
          "Works when closure is the last parameter",
          "Type inference usually eliminates type annotations",
        ],
      },
      {
        title: "Shorthand Arguments",
        explanation: `Swift provides \`$0\`, \`$1\`, etc. as automatic argument names. This makes very short closures even more concise.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// No equivalent shorthand in TypeScript
// Must always name parameters

const numbers = [1, 2, 3, 4, 5];

// Must name 'n'
const doubled = numbers.map((n) => n * 2);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Even for simple operations
const sorted = names.sort((a, b) => a.localeCompare(b));

// Point-free style requires explicit function
const lengths = words.map((w) => w.length);
// Can't do: words.map(.length)`,
        },
        swiftui: {
          code: `let numbers = [1, 2, 3, 4, 5]

// $0 is first argument, $1 is second, etc.
let doubled = numbers.map { $0 * 2 }
let sum = numbers.reduce(0) { $0 + $1 }

// Comparison closure
let sorted = names.sorted { $0 < $1 }

// Even simpler - operator as closure!
let sum2 = numbers.reduce(0, +)
let sorted2 = names.sorted(by: <)

// Keypath syntax for property access
let lengths = words.map(\\.count)
let names = users.map(\\.name)`,
        },
        tips: [
          "`$0`, `$1`, `$2` are first, second, third arguments",
          "Skip `in` keyword when using shorthand",
          "Operators like `+`, `<` can be passed directly!",
          "`\\.property` is keypath - transforms to `{ $0.property }`",
        ],
      },
      {
        title: "Multiple Trailing Closures",
        explanation: `Swift 5.3+ allows multiple trailing closures with labels. This is heavily used in SwiftUI for composing views with different purposes.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// React uses render props or children
<Toggle
  value={isOn}
  onChange={setIsOn}
  label="Dark Mode"
/>

// Or children pattern
<Toggle isOn={darkMode} setIsOn={setDarkMode}>
  <span>Dark Mode</span>
</Toggle>

// Multiple slots via props
<Card
  header={() => <h1>Title</h1>}
  body={() => <p>Content</p>}
  footer={() => <button>Action</button>}
/>

// No special syntax for multiple callbacks`,
        },
        swiftui: {
          code: `// Multiple trailing closures with labels
Section {
    // content (first trailing, no label)
    Text("Row 1")
    Text("Row 2")
} header: {
    Text("Header")
} footer: {
    Text("Footer")
}

// Button with role and action
Button {
    deleteItem()
} label: {
    Label("Delete", systemImage: "trash")
}

// Sheet with content and dismiss action
sheet(isPresented: $showSheet) {
    // onDismiss
    refreshData()
} content: {
    SheetContent()
}`,
        },
        tips: [
          "First trailing closure has no label",
          "Subsequent closures use parameter name as label",
          "SwiftUI heavily uses this pattern",
          "Makes complex view builders readable",
        ],
      },
    ],
  },
  {
    id: "enums-associated-values",
    title: "Enums with Associated Values",
    description: "Swift enums can hold data - making them far more powerful than TypeScript enums",
    module: "swift-basics",
    category: "Advanced Types",
    sections: [
      {
        title: "Basic Enums",
        explanation: `Swift enums are type-safe and don't require explicit values. They're similar to TypeScript's string literal unions but with better ergonomics.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// TypeScript enum
enum Status {
  Pending = "pending",
  Active = "active",
  Completed = "completed",
}

// Or string literal union (preferred)
type Status = "pending" | "active" | "completed";

// Usage
let status: Status = "pending";

// Switch (not exhaustive by default)
function handleStatus(s: Status) {
  switch (s) {
    case "pending":
      return "Waiting...";
    case "active":
      return "In progress";
    // Oops, forgot "completed"!
  }
}`,
        },
        swiftui: {
          code: `// Swift enum - no explicit values needed
enum Status {
    case pending
    case active
    case completed
}

// Or on one line
enum Priority { case low, medium, high }

// Usage
var status: Status = .pending
status = .active  // Type inferred!

// Switch MUST be exhaustive
func handleStatus(_ s: Status) -> String {
    switch s {
    case .pending:
        return "Waiting..."
    case .active:
        return "In progress"
    case .completed:
        return "Done!"
    // Compiler error if case missing!
    }
}`,
        },
        tips: [
          "Enum cases use `case` keyword, can be on one line",
          "No need for string values - cases are the values",
          "Use `.caseName` when type is known",
          "Switch statements must cover ALL cases",
        ],
      },
      {
        title: "Associated Values (The Superpower)",
        explanation: `Swift enums can hold **associated values** - different data for each case. This is like TypeScript's discriminated unions but built into the language.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// Discriminated union pattern
type Result<T> =
  | { status: "success"; data: T }
  | { status: "failure"; error: Error }
  | { status: "loading" };

// Usage
function fetchUser(): Result<User> {
  try {
    const user = api.getUser();
    return { status: "success", data: user };
  } catch (e) {
    return { status: "failure", error: e as Error };
  }
}

// Type narrowing
const result = fetchUser();
if (result.status === "success") {
  console.log(result.data.name); // data exists
}`,
        },
        swiftui: {
          code: `// Enum with associated values
enum Result<T> {
    case success(T)
    case failure(Error)
    case loading
}

// Usage
func fetchUser() -> Result<User> {
    do {
        let user = try api.getUser()
        return .success(user)
    } catch {
        return .failure(error)
    }
}

// Pattern matching extracts the value
let result = fetchUser()
switch result {
case .success(let user):
    print(user.name)  // user extracted!
case .failure(let error):
    print(error.localizedDescription)
case .loading:
    print("Loading...")
}`,
        },
        tips: [
          "Associated values go in parentheses after the case",
          "Each case can have different associated types",
          "Pattern matching extracts the values",
          "Swift's Result type is built exactly like this!",
        ],
      },
      {
        title: "Pattern Matching",
        explanation: `Swift's pattern matching with \`if case\` and \`guard case\` lets you check and extract associated values without a full switch statement.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `type NetworkState =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; data: string }
  | { type: "error"; message: string; code: number };

const state: NetworkState = { type: "success", data: "Hello" };

// Check specific case
if (state.type === "success") {
  console.log(state.data);
}

// Extract error info
if (state.type === "error") {
  const { message, code } = state;
  console.log(\`Error \${code}: \${message}\`);
}

// Multiple cases
if (state.type === "loading" || state.type === "idle") {
  console.log("Not ready");
}`,
        },
        swiftui: {
          code: `enum NetworkState {
    case idle
    case loading
    case success(data: String)
    case error(message: String, code: Int)
}

let state: NetworkState = .success(data: "Hello")

// if case - check specific case
if case .success(let data) = state {
    print(data)
}

// guard case - early exit pattern
func handleState(_ state: NetworkState) {
    guard case .success(let data) = state else {
        print("Not successful")
        return
    }
    // data is available here
    print("Got: \\(data)")
}

// Multiple cases with comma
switch state {
case .loading, .idle:
    print("Not ready")
default:
    break
}`,
        },
        tips: [
          "`if case .x(let y) = value` extracts associated value",
          "`guard case` is great for early exits",
          "Named associated values: `case error(message: String)`",
          "Use `_` to ignore values you don't need",
        ],
      },
      {
        title: "Optional is Just an Enum",
        explanation: `Here's a mind-bender: Swift's \`Optional<T>\` is just an enum with two cases. Understanding this explains ALL optional behavior!`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// TypeScript has no Optional type
// Just union with undefined/null

type Maybe<T> = T | undefined;

// Could model it as discriminated union
type Optional<T> =
  | { hasValue: true; value: T }
  | { hasValue: false };

// But nobody does this - just use T | undefined
let name: string | undefined = undefined;

// Check for value
if (name !== undefined) {
  console.log(name.toUpperCase());
}

// Optional chaining is language magic
const length = name?.length ?? 0;`,
        },
        swiftui: {
          code: `// Optional is literally this enum!
enum Optional<Wrapped> {
    case none           // nil
    case some(Wrapped)  // has a value
}

// These are identical:
var name: String? = nil
var name: Optional<String> = .none

var name: String? = "Alice"
var name: Optional<String> = .some("Alice")

// if let is pattern matching on .some!
if case .some(let value) = name {
    print(value)  // Same as: if let value = name
}

// nil is just .none
// value? is just .some(value)

// ?? is pattern matching:
// name ?? "default"
// means: if case .some(let x) = name { x } else { "default" }`,
        },
        tips: [
          "`String?` is literally `Optional<String>` enum",
          "`nil` is `.none`, `value` wrapped becomes `.some(value)`",
          "`if let` is pattern matching on `.some` case",
          "Understanding this demystifies ALL optional behavior!",
        ],
      },
    ],
  },
  {
    id: "property-wrappers",
    title: "Property Wrappers",
    description: "The @-prefixed magic that powers SwiftUI's reactive system",
    module: "swift-basics",
    category: "Advanced Types",
    sections: [
      {
        title: "What Property Wrappers Are",
        explanation: `Property wrappers add behavior to properties using the \`@WrapperName\` syntax. They're central to SwiftUI - \`@State\`, \`@Binding\`, \`@Published\` are all property wrappers.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// No direct equivalent in TypeScript
// Closest is decorators (experimental)

// React hooks provide similar functionality
function Counter() {
  // useState provides wrapped reactive state
  const [count, setCount] = useState(0);

  // Custom hook can wrap behavior
  const [value, setValue] = useLocalStorage("key", "");

  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count}
    </button>
  );
}

// Class decorators exist but different pattern
@observable  // MobX decorator
class Store {
  count = 0;
}`,
        },
        swiftui: {
          code: `// Property wrappers use @ syntax
struct Counter: View {
    // @State wraps this property
    @State private var count = 0

    var body: some View {
        Button("Count: \\(count)") {
            count += 1  // Just assign normally!
        }
    }
}

// Multiple property wrappers
struct LoginForm: View {
    @State private var username = ""
    @State private var password = ""
    @FocusState private var isFocused: Bool
    @Environment(\\.dismiss) var dismiss

    var body: some View {
        Form {
            TextField("Username", text: $username)
            SecureField("Password", text: $password)
        }
    }
}`,
        },
        tips: [
          "`@State`, `@Binding`, `@Observable` are property wrappers",
          "They add behavior without changing how you use the property",
          "SwiftUI watches wrapped properties for changes",
          "Decorators in TS are similar concept, different execution",
        ],
      },
      {
        title: "How Property Wrappers Work",
        explanation: `A property wrapper is a struct with a \`wrappedValue\` property. The compiler transforms your code to use the wrapper behind the scenes.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// Simulating property wrapper concept
class Clamped {
  private _value: number;
  private min: number;
  private max: number;

  constructor(value: number, min: number, max: number) {
    this.min = min;
    this.max = max;
    this._value = Math.max(min, Math.min(max, value));
  }

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    this._value = Math.max(this.min, Math.min(this.max, newValue));
  }
}

// Usage requires explicit wrapper
const volume = new Clamped(50, 0, 100);
volume.value = 150;  // Clamped to 100
console.log(volume.value);  // 100`,
        },
        swiftui: {
          code: `// Define a property wrapper
@propertyWrapper
struct Clamped {
    private var value: Int
    let min: Int
    let max: Int

    var wrappedValue: Int {
        get { value }
        set { value = Swift.min(max, Swift.max(min, newValue)) }
    }

    init(wrappedValue: Int, min: Int, max: Int) {
        self.min = min
        self.max = max
        self.value = Swift.min(max, Swift.max(min, wrappedValue))
    }
}

// Usage - looks like a normal property!
struct Settings {
    @Clamped(min: 0, max: 100) var volume = 50
}

var settings = Settings()
settings.volume = 150  // Clamped to 100
print(settings.volume) // 100`,
        },
        tips: [
          "`@propertyWrapper` marks a type as a wrapper",
          "`wrappedValue` is the main property you access",
          "Wrapper parameters go in parentheses after the name",
          "Compiler transforms `volume` to use wrapper's `wrappedValue`",
        ],
      },
      {
        title: "Projected Value ($prefix)",
        explanation: `Property wrappers can expose a **projected value** accessed with \`$\` prefix. SwiftUI uses this for \`Binding\` - \`$count\` gives you a binding to \`count\`.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// React's useState returns [value, setter]
const [count, setCount] = useState(0);

// Pass state to child as props
<Counter value={count} onChange={setCount} />

// Or pass both as a single object
type Binding<T> = {
  value: T;
  set: (v: T) => void;
};

function useBinding<T>(initial: T): Binding<T> {
  const [value, set] = useState(initial);
  return { value, set };
}

const count = useBinding(0);
// count.value - the value
// count.set   - the setter
<Counter binding={count} />`,
        },
        swiftui: {
          code: `struct Parent: View {
    @State private var count = 0

    var body: some View {
        VStack {
            // count is the value (Int)
            Text("Count: \\(count)")

            // $count is the projected value (Binding<Int>)
            Counter(count: $count)

            // $count lets child modify parent's state
        }
    }
}

struct Counter: View {
    @Binding var count: Int  // Receives Binding

    var body: some View {
        Button("+1") {
            count += 1  // Modifies parent's @State!
        }
    }
}

// $ gives you the binding, plain name gives value
// @State stores the value, projects a Binding
// @Binding receives that binding`,
        },
        tips: [
          "`$propertyName` accesses the projected value",
          "`@State` projects a `Binding` for two-way data flow",
          "Pass `$count` to child components that need to modify it",
          "Like passing `[value, setValue]` in React, but cleaner",
        ],
      },
      {
        title: "SwiftUI's Property Wrappers",
        explanation: `SwiftUI provides several property wrappers for different state management scenarios. Here's when to use each one. **React equivalents in comments!**`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// React equivalents for SwiftUI wrappers

// @State = useState()
const [count, setCount] = useState(0);

// @Binding = receiving [value, setValue] as props
interface Props {
  isOn: boolean;
  setIsOn: (v: boolean) => void;
}

// @Observable = zustand/jotai store
const useStore = create((set) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
}));

// @Environment = useContext()
const theme = useContext(ThemeContext);

// @StateObject = useState(() => new Store())
const [store] = useState(() => new MyStore());

// @ObservedObject = external store reference
const store = useStore();

// @EnvironmentObject = useContext for stores
const settings = useContext(SettingsContext);`,
        },
        swiftui: {
          code: `// @State - Own local state, view redraws on change
struct Counter: View {
    @State private var count = 0
    var body: some View {
        Button("\\(count)") { count += 1 }
    }
}

// @Binding - Two-way connection to external state
struct Toggle: View {
    @Binding var isOn: Bool
    var body: some View {
        Button(isOn ? "ON" : "OFF") { isOn.toggle() }
    }
}

// @Observable - Modern observable objects (iOS 17+)
@Observable class CartStore {
    var items: [Item] = []
}

struct CartView: View {
    var store: CartStore  // Just pass in directly!
    var body: some View {
        List(store.items) { item in
            Text(item.name)
        }
    }
}

// @Environment - System-provided values
struct ThemedView: View {
    @Environment(\\.colorScheme) var colorScheme
    var body: some View {
        Text(colorScheme == .dark ? "Dark" : "Light")
    }
}`,
        },
        tips: [
          "@State = local state (like useState)",
          "@Binding = two-way prop (like [value, setValue])",
          "@Observable = external store (like zustand)",
          "@Environment = context/DI (like useContext)",
        ],
      },
    ],
  },
  {
    id: "generics-opaque-types",
    title: "Generics & Opaque Types",
    description: "Generic programming in Swift, plus the mysterious `some` keyword",
    module: "swift-basics",
    category: "Advanced Types",
    sections: [
      {
        title: "Generic Functions",
        explanation: `Generic functions work similarly in both languages - use angle brackets to define type parameters that get filled in at call site.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// Generic function
function identity<T>(value: T): T {
  return value;
}

// Type inferred from argument
const str = identity("hello");  // string
const num = identity(42);       // number

// Generic with multiple type params
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

const p = pair("name", 42);  // [string, number]

// Generic array function
function first<T>(array: T[]): T | undefined {
  return array[0];
}`,
        },
        swiftui: {
          code: `// Generic function
func identity<T>(_ value: T) -> T {
    return value
}

// Type inferred from argument
let str = identity("hello")  // String
let num = identity(42)       // Int

// Generic with multiple type params
func pair<A, B>(_ a: A, _ b: B) -> (A, B) {
    return (a, b)
}

let p = pair("name", 42)  // (String, Int)

// Generic array function
func first<T>(_ array: [T]) -> T? {
    return array.first
}`,
        },
        tips: [
          "`<T>` defines generic type parameter",
          "Swift uses `_` for unlabeled parameters",
          "Type inference works the same way",
          "Tuples `(A, B)` instead of arrays `[A, B]` for pairs",
        ],
      },
      {
        title: "Generic Constraints",
        explanation: `Both languages let you constrain generics to types that conform to certain protocols/interfaces. Swift uses \`:\` where TypeScript uses \`extends\`.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// Constrain T to have certain properties
interface HasLength {
  length: number;
}

function longest<T extends HasLength>(a: T, b: T): T {
  return a.length > b.length ? a : b;
}

longest("hello", "world");  // OK, strings have length
longest([1, 2], [1, 2, 3]); // OK, arrays have length
// longest(1, 2);  // Error! numbers don't have length

// Multiple constraints
interface HasId { id: string; }
interface HasName { name: string; }

function display<T extends HasId & HasName>(item: T): string {
  return \`\${item.id}: \${item.name}\`;
}`,
        },
        swiftui: {
          code: `// Constrain T to protocol conformance
func largest<T: Comparable>(_ a: T, _ b: T) -> T {
    return a > b ? a : b
}

largest("hello", "world")  // OK, String is Comparable
largest(5, 10)             // OK, Int is Comparable
// largest(view1, view2)   // Error! Views aren't Comparable

// Multiple constraints with where clause
protocol HasId { var id: String { get } }
protocol HasName { var name: String { get } }

func display<T: HasId & HasName>(_ item: T) -> String {
    return "\\(item.id): \\(item.name)"
}

// Or using where clause (more readable)
func display<T>(_ item: T) -> String where T: HasId, T: HasName {
    return "\\(item.id): \\(item.name)"
}`,
        },
        tips: [
          "`<T: Protocol>` is Swift's `<T extends Interface>`",
          "Use `&` for multiple constraints: `T: A & B`",
          "`where` clause allows complex constraints",
          "Constraints enable protocol methods on generic types",
        ],
      },
      {
        title: "Opaque Types (some)",
        explanation: `The \`some\` keyword creates **opaque types** - the caller knows it conforms to a protocol but not the concrete type. This is how \`some View\` works!`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// TypeScript doesn't have opaque types
// Closest is returning interface type

interface Animal {
  speak(): string;
}

class Dog implements Animal {
  speak() { return "Woof!"; }
  fetch() { return "Fetching!"; }  // Extra method
}

// Returns Animal, hides that it's a Dog
function getAnimal(): Animal {
  return new Dog();
}

const animal = getAnimal();
animal.speak();  // OK
// animal.fetch();  // Error! Animal doesn't have fetch

// But caller can check/cast:
if (animal instanceof Dog) {
  animal.fetch();  // Works after cast
}`,
        },
        swiftui: {
          code: `protocol Animal {
    func speak() -> String
}

struct Dog: Animal {
    func speak() -> String { "Woof!" }
    func fetch() -> String { "Fetching!" }
}

// some Animal = returns ONE specific Animal type
// Caller doesn't know which concrete type
func getAnimal() -> some Animal {
    return Dog()
}

let animal = getAnimal()
animal.speak()  // OK
// animal.fetch()  // Error! Only Animal protocol visible

// Unlike protocol return, compiler knows the concrete type
// This enables optimizations and type identity

// Compare to protocol return:
func getAnyAnimal() -> any Animal {
    return Dog()  // Could return different types!
}`,
        },
        tips: [
          "`some Protocol` = specific (but hidden) concrete type",
          "`any Protocol` = could be any conforming type (boxed)",
          "`some` enables compiler optimizations",
          "The concrete type is fixed, just hidden from caller",
        ],
      },
      {
        title: "Why `some View`",
        explanation: `SwiftUI uses \`some View\` because View has an associated type (Self.Body). Understanding this explains SwiftUI's type system.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// React components return ReactElement
// Type is known and consistent

function MyComponent(): JSX.Element {
  return <div>Hello</div>;
}

// Complex return types get ugly
function ConditionalView(): JSX.Element {
  const [show, setShow] = useState(true);

  // Return type is always JSX.Element
  // React handles the union internally
  return show ? <div>Shown</div> : <span>Hidden</span>;
}

// No need to declare "returns some component"
// Because React uses a unified element type`,
        },
        swiftui: {
          code: `// View protocol has associated type
protocol View {
    associatedtype Body: View
    var body: Body { get }
}

// Problem: can't use View as return type directly
// func makeView() -> View  // Error! What's Body?

// Solution: some View
struct MyComponent: View {
    var body: some View {  // "returns SOME specific View"
        Text("Hello")      // Actually VStack<Text>
    }
}

// Without some, you'd write the full type:
struct MyComponent: View {
    var body: VStack<TupleView<(Text, Text)>> {
        VStack {
            Text("Hello")
            Text("World")
        }
    }
}

// some View hides this complexity!
// Compiler knows the real type, you don't have to write it`,
        },
        tips: [
          "View has `associatedtype Body` - can't use as plain return type",
          "`some View` says 'returns a specific View type'",
          "Compiler infers the actual complex type",
          "This is why body can only return ONE type (use Group/AnyView for multiple)",
        ],
      },
    ],
  },
  {
    id: "access-control",
    title: "Access Control",
    description: "Swift's visibility modifiers - more granular than TypeScript",
    module: "swift-basics",
    category: "Safety & Errors",
    sections: [
      {
        title: "Access Levels",
        explanation: `Swift has five access levels, more granular than TypeScript's three. The key difference: Swift defaults to \`internal\`, not \`public\`.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// TypeScript access modifiers
class Example {
  public name: string;       // Accessible anywhere
  protected id: number;      // Class + subclasses
  private secret: string;    // This class only

  // Default is public!
  count = 0;  // Same as public count = 0

  constructor() {
    this.name = "Example";
    this.id = 1;
    this.secret = "shhh";
  }
}

// Module-level: export or not
export function publicFn() {}  // Accessible when imported
function privateFn() {}        // Module-internal only`,
        },
        swiftui: {
          code: `// Swift access levels (most to least visible)
public class Example {
    open var canOverride: String     // Public + overridable
    public var name: String          // Accessible outside module
    internal var id: Int             // Same module only (DEFAULT)
    fileprivate var fileOnly: String // Same file only
    private var secret: String       // Same scope only

    // Default is internal!
    var count = 0  // Same as internal var count = 0

    public init() {
        self.canOverride = "Override me"
        self.name = "Example"
        self.id = 1
        self.fileOnly = "file"
        self.secret = "shhh"
    }
}

// Functions follow same rules
public func publicFn() {}
func internalFn() {}  // internal by default
private func privateFn() {}`,
        },
        tips: [
          "`open` > `public` > `internal` > `fileprivate` > `private`",
          "Default is `internal`, not `public` like TypeScript",
          "`open` allows subclass override (public doesn't!)",
          "`fileprivate` = same file, `private` = same scope/extension",
        ],
      },
      {
        title: "Default is Internal",
        explanation: `A key Swift difference: everything is \`internal\` by default. This means you must explicitly mark things \`public\` to expose them from a module.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// TypeScript: export to make public

// utils.ts
export function helper() {}  // Public
function internal() {}       // Module-private

// components/Button.tsx
export function Button() {}  // Public

// Can access anything within same project
// No concept of "module" access level
import { helper } from "./utils";

// Everything in a file is accessible to other files
// Unless you don't export it`,
        },
        swiftui: {
          code: `// Swift: everything is internal by default

// In YourApp module (your app's code)
struct User {  // internal - visible in your app
    var name: String
}

func helper() {}  // internal - visible in your app

// To use from another module, must be public
public struct PublicUser {  // visible outside module
    public var name: String  // properties must also be public!

    public init(name: String) {
        self.name = name
    }
}

// Common mistake:
public struct Oops {
    var name: String  // Still internal! Not accessible outside!
}`,
        },
        tips: [
          "Your app is one module, each package/framework is another",
          "For types to be fully public, properties need `public` too",
          "Public init isn't auto-generated - must write it",
          "Internal is usually fine for app code",
        ],
      },
      {
        title: "Private in SwiftUI",
        explanation: `In SwiftUI, use \`private\` for \`@State\` properties. This enforces that state is only modified by the owning view.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// React: state is inherently local
function Counter() {
  // useState is already "private" - no modifier needed
  const [count, setCount] = useState(0);

  // Can't access count from outside this component
  // React's component model enforces this

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// To share state, must lift it up or use context
function Parent() {
  const [count, setCount] = useState(0);
  return <Counter count={count} setCount={setCount} />;
}`,
        },
        swiftui: {
          code: `// SwiftUI: use private for @State
struct Counter: View {
    // Convention: @State should be private
    @State private var count = 0

    var body: some View {
        Button("\\(count)") {
            count += 1
        }
    }
}

// Why private? @State is owned by THIS view
// Other views shouldn't set it directly

// For shared state, use @Binding or @Observable
struct Counter: View {
    @Binding var count: Int  // Not private - comes from parent

    var body: some View {
        Button("\\(count)") {
            count += 1
        }
    }
}

// Parent provides the binding
struct Parent: View {
    @State private var count = 0

    var body: some View {
        Counter(count: $count)
    }
}`,
        },
        tips: [
          "`@State private var` is the standard pattern",
          "Private signals 'this view owns this state'",
          "`@Binding` properties are NOT private - they come from outside",
          "Compiler warns if you pass @State to init (should use @Binding)",
        ],
      },
    ],
  },
  {
    id: "error-handling",
    title: "Error Handling",
    description: "Swift's error handling with throws, try, and Result",
    module: "swift-basics",
    category: "Safety & Errors",
    sections: [
      {
        title: "Throwing Functions",
        explanation: `Swift requires you to mark functions that can throw errors with \`throws\`. Unlike JavaScript, you **must** handle potential errors - can't ignore them.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// TypeScript: no throws keyword
// Errors aren't part of function signature

function parseJSON(str: string): object {
  return JSON.parse(str);  // Can throw!
}

// Caller might forget to handle error
const data = parseJSON(userInput);  // 💥 Might crash

// No compile-time enforcement
function riskyOperation(): number {
  if (Math.random() < 0.5) {
    throw new Error("Bad luck!");
  }
  return 42;
}

// TypeScript doesn't make you handle this
const result = riskyOperation();  // Compiles fine, might crash`,
        },
        swiftui: {
          code: `// Swift: throws is part of signature
func parseJSON(_ str: String) throws -> [String: Any] {
    guard let data = str.data(using: .utf8) else {
        throw ParseError.invalidInput
    }
    return try JSONSerialization.jsonObject(with: data) as! [String: Any]
}

// Must acknowledge with try!
// let data = parseJSON(userInput)  // Error! Must use try

// Errors must be handled - compiler enforces it
func riskyOperation() throws -> Int {
    guard Bool.random() else {
        throw MyError.badLuck
    }
    return 42
}

// Can't ignore the throws - won't compile
// let result = riskyOperation()  // Error!
let result = try riskyOperation()  // Must acknowledge`,
        },
        tips: [
          "`throws` goes before `->` in function signature",
          "Must use `try` when calling throwing functions",
          "Compiler enforces error handling - can't accidentally ignore",
          "Errors must conform to the `Error` protocol",
        ],
      },
      {
        title: "do-catch Syntax",
        explanation: `Swift uses \`do { try } catch { }\` instead of \`try { } catch { }\`. The \`try\` keyword marks exactly which call might throw.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// try-catch block
try {
  const data = JSON.parse(input);
  const user = validateUser(data);
  await saveUser(user);
} catch (error) {
  // Which line threw? Have to guess or check
  console.error("Something failed:", error);
}

// Checking error type
try {
  await fetchData();
} catch (error) {
  if (error instanceof NetworkError) {
    console.log("Network issue");
  } else if (error instanceof ValidationError) {
    console.log("Invalid data");
  } else {
    throw error;  // Re-throw unknown errors
  }
}`,
        },
        swiftui: {
          code: `// do-catch block
do {
    let data = try parseJSON(input)    // try marks the call
    let user = try validateUser(data)  // each throwing call
    try saveUser(user)
} catch {
    // error is automatically available
    print("Failed: \\(error)")
}

// Pattern matching on error types
do {
    try fetchData()
} catch NetworkError.noConnection {
    print("No internet")
} catch NetworkError.timeout {
    print("Request timed out")
} catch let error as ValidationError {
    print("Invalid: \\(error.message)")
} catch {
    print("Unknown error: \\(error)")
}`,
        },
        tips: [
          "`do { try x() } catch { }` is Swift's try-catch",
          "`try` marks exactly which calls might throw",
          "`error` is auto-available in catch (or name it: `catch let e`)",
          "Can pattern match on specific error cases",
        ],
      },
      {
        title: "try? and try!",
        explanation: `Swift provides shortcuts: \`try?\` converts errors to nil, \`try!\` crashes if error (like force unwrap). Use sparingly!`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// No direct equivalent to try? or try!

// Simulating try? - convert to null
function tryParse(str: string): object | null {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

const data = tryParse(input);  // null if failed
const name = data?.name ?? "Unknown";

// Simulating try! - crash on error
function forceParse(str: string): object {
  try {
    return JSON.parse(str);
  } catch (e) {
    throw new Error("Should never fail: " + e);
  }
}

// These patterns require manual implementation`,
        },
        swiftui: {
          code: `// try? - convert error to nil
let data = try? parseJSON(input)  // [String: Any]?
let name = data?["name"] as? String ?? "Unknown"

// Great with nil coalescing
let config = try? loadConfig() ?? defaultConfig

// try! - crash if error (use sparingly!)
let data = try! parseJSON(knownValidJSON)  // Force unwrap

// Use try! only when failure is programmer error
let url = URL(string: "https://apple.com")!  // Known valid
let bundle = try! loadBundle()  // App can't run without it

// Comparison:
do {
    let x = try mightFail()     // Handle error properly
} catch { ... }

let y = try? mightFail()        // nil on error
let z = try! mustNotFail()      // Crash on error`,
        },
        tips: [
          "`try?` returns Optional - nil if error thrown",
          "`try!` crashes on error - like force unwrap",
          "Use `try?` with `??` for default values",
          "Use `try!` only for 'impossible' errors or app startup",
        ],
      },
      {
        title: "Result Type",
        explanation: `\`Result<Success, Failure>\` is an enum for representing success/error without throwing. Useful for async operations and explicit error handling.`,
        leftTitle: "TypeScript",
        rightTitle: "Swift",
        react: {
          code: `// DIY Result type (not built-in)
type Result<T, E> =
  | { success: true; value: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User, Error>> {
  try {
    const user = await api.getUser(id);
    return { success: true, value: user };
  } catch (e) {
    return { success: false, error: e as Error };
  }
}

// Usage
const result = await fetchUser("123");
if (result.success) {
  console.log(result.value.name);
} else {
  console.log(result.error.message);
}`,
        },
        swiftui: {
          code: `// Result is built-in!
// enum Result<Success, Failure: Error>

func fetchUser(id: String) -> Result<User, NetworkError> {
    guard let user = database.find(id) else {
        return .failure(.notFound)
    }
    return .success(user)
}

// Usage with switch
let result = fetchUser(id: "123")
switch result {
case .success(let user):
    print(user.name)
case .failure(let error):
    print(error.localizedDescription)
}

// Convert Result to throwing
let user = try result.get()  // Throws on .failure

// Convert throwing to Result
let result2 = Result { try riskyOperation() }

// Map over success value
let userName = result.map { $0.name }  // Result<String, NetworkError>`,
        },
        tips: [
          "`Result<Success, Failure>` - Success or Failure type",
          "`.success(value)` and `.failure(error)` cases",
          "`result.get()` converts to throwing - unwraps or throws",
          "`Result { try x() }` converts throwing to Result",
        ],
      },
    ],
  },
];
