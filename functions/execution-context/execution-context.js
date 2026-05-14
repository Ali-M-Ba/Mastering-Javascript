/******************************************************************************************
 * JAVASCRIPT EXECUTION CONTEXT — COMPLETE GUIDE
 * Think of this as: "How JavaScript actually runs your code under the hood"
 ******************************************************************************************/

/**
 * 1. DEFINITION
 * ----------------------------------------------------------------------------------------
 * An Execution Context is an environment where JavaScript code is evaluated and executed.
 *
 * Every time JS runs code, it does so inside an execution context.
 *
 * Why it matters:
 * - Determines how variables are stored
 * - Determines how scope works
 * - Determines what "this" refers to
 *
 * Analogy:
 * Think of an execution context as a "box" that contains:
 * - Variables
 * - Functions
 * - The value of "this"
 */

/**
 * 2. TYPES OF EXECUTION CONTEXT
 * ----------------------------------------------------------------------------------------
 */

// 1. Global Execution Context (GEC)
// - Created when the JS file first runs
// - Only one exists
// - "this" refers to global object (window in browser)

console.log("Global context running");

// 2. Function Execution Context (FEC)
// - Created every time a function is called
// - Each function call gets its own context

function greet() {
  console.log("Function context");
}
greet();

// 3. Eval Execution Context (rare, not recommended)
// - Created when using eval()
// - Avoid using eval for security and performance reasons

/**
 * 3. PHASES OF EXECUTION CONTEXT
 * ----------------------------------------------------------------------------------------
 * Each execution context runs in TWO phases:
 *
 * 1) Creation Phase
 * 2) Execution Phase
 */

/**
 * --- CREATION PHASE ---
 * Happens BEFORE code runs
 *
 * JavaScript sets up memory:
 * - Variables
 * - Functions
 * - Scope chain
 * - "this" binding
 */

// Example:
console.log(a); // undefined (not error!)
var a = 10;

/**
 * During creation:
 * - var a is allocated in memory
 * - initialized with undefined
 */

/**
 * Internals (simplified):
 *
 * 1. Variable Object / Lexical Environment
 *    - Stores variables and functions
 *
 * 2. Scope Chain
 *    - Determines variable access (inner → outer)
 *
 * 3. "this" binding
 *    - Depends on how function is called
 *
 * 4. Hoisting
 *    - Variables and functions are moved to top (in memory)
 */

/**
 * --- EXECUTION PHASE ---
 * Code runs line by line
 */

var x = 5;
x = x + 10;
console.log(x); // 15

/**
 * 4. CALL STACK
 * ----------------------------------------------------------------------------------------
 * The Call Stack keeps track of execution contexts.
 *
 * Think of it like a stack of plates:
 * - Last in → First out (LIFO)
 */

function first() {
  second();
  console.log("first done");
}

function second() {
  third();
  console.log("second done");
}

function third() {
  console.log("third done");
}

first();

/**
 * Call Stack Visualization:
 *
 * Start:
 * [ Global ]
 *
 * first() called:
 * [ first ]
 * [ Global ]
 *
 * second() called:
 * [ second ]
 * [ first ]
 * [ Global ]
 *
 * third() called:
 * [ third ]
 * [ second ]
 * [ first ]
 * [ Global ]
 *
 * Then it pops back down as functions finish.
 */

/**
 * 5. HOISTING BEHAVIOR
 * ----------------------------------------------------------------------------------------
 */

// var → hoisted and initialized as undefined
console.log(a); // undefined
var a = 1;

{
  var x = 1; // var is function-scoped, not block-scoped
}
console.log(x, "printing non-block-scoped variable"); // 1

// let & const → hoisted BUT NOT initialized (Temporal Dead Zone)
// console.log(b); // ReferenceError
let b = 2;

// Function declarations → fully hoisted
sayHi(); // works

function sayHi() {
  console.log("Hi!");
}

// Function expressions → behave like variables
// sayBye(); // TypeError: not a function
var sayBye = function () {
  console.log("Bye!");
};

/**
 * 6. "this" KEYWORD
 * ----------------------------------------------------------------------------------------
 * "this" depends on HOW a function is called (not where it's written)
 */

// Global context
console.log(this); // window (browser)

// Regular function
function show() {
  console.log(this);
}
show(); // window (non-strict mode)

// Object method
const obj = {
  name: "Ali",
  greet: function () {
    console.log(this.name);
  },
};
obj.greet(); // "Ali"

// Arrow function (no own "this")
const arrowObj = {
  name: "Ali",
  greet: () => {
    console.log(this.name);
  },
};
arrowObj.greet(); // undefined (inherits from global)

/**
 * 7. PRACTICAL STEP-BY-STEP EXAMPLE
 * ----------------------------------------------------------------------------------------
 */

var num = 10;

function outer() {
  var num = 20;

  function inner() {
    console.log(num);
  }

  inner();
}

outer();

/**
 * STEP-BY-STEP:
 *
 * 1. Global Execution Context created
 *    Memory:
 *      num → undefined
 *      outer → function
 *
 * 2. Execution Phase:
 *      num = 10
 *
 * 3. outer() called → new Function Execution Context
 *    Memory:
 *      num → undefined
 *      inner → function
 *
 * 4. Execution:
 *      num = 20
 *
 * 5. inner() called → new context
 *
 * 6. console.log(num):
 *    - Not found in inner → go to outer → FOUND (20)
 *
 * OUTPUT: 20
 */

/**
 * 8. COMMON MISTAKES
 * ----------------------------------------------------------------------------------------
 */

// ❌ Mistake 1: Thinking var behaves like let
// console.log(x); // undefined, not error
var x = 5;

// ❌ Mistake 2: Confusing "this"
const user = {
  name: "Ali",
  greet: function () {
    setTimeout(function () {
      console.log(this.name); // undefined (this = window)
    }, 1000);
  },
};
user.greet();

// ✅ Fix with arrow function
const userFixed = {
  name: "Ali",
  greet: function () {
    setTimeout(() => {
      console.log(this.name); // "Ali"
    }, 1000);
  },
};

// ❌ Mistake 3: Scope confusion
function test() {
  if (true) {
    var a = 1;
    let b = 2;
  }
  console.log(a); // 1
  // console.log(b); // ReferenceError
}
test();

/******************************************************************************************
 * FINAL SUMMARY
 * ----------------------------------------------------------------------------------------
 * - Execution Context = environment where JS runs code
 * - Created in two phases: Creation → Execution
 * - Call Stack manages contexts
 * - Hoisting happens during creation
 * - "this" depends on how function is called
 *
 * MASTER THIS → You understand how JavaScript REALLY works
 ******************************************************************************************/
