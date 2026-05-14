/******************************************************************************************
 * JAVASCRIPT EXECUTION CONTEXT — PRACTICE CHALLENGES
 *
 * Instructions:
 * - DO NOT run immediately
 * - First: predict the output
 * - Then: explain WHY (creation phase, execution phase, scope, this, etc.)
 * - Finally: run and verify
 ******************************************************************************************/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 1 — BASIC HOISTING
 * ----------------------------------------------------------------------------------------
 * What will be logged?
 * undefined
 */
console.log(a);
var a = 10;

/*
Questions:
1. Why is this NOT a ReferenceError?
   cuz var hoisted with 'undefined' value during creation phase 
2. What happens during the creation phase?
   hoisting variables and functions and memory locating
3. What is stored in memory for "a"?
   undefined during creation phase, then 10 during execution phase 
*/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 2 — LET vs VAR
 * ----------------------------------------------------------------------------------------
 */

console.log(x); // undefined
// console.log(y); // referenceError > temporal dead zone > calling before initialization

var x = 5;
let y = 10;

/*
Questions:
1. Why does x behave differently from y?
   because it's declared with 'var' keyword which hoist the variable with "undefined" value, 
   unlike y is declared with 'let' keyword and hoist without init value.
2. What is the Temporal Dead Zone?
   it's when variable exists in memory but is unusable until initialization.
   it's time between entering a scope and variable declaration line
3. At what moment does y become accessible?
   After the declaration
*/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 3 — FUNCTION HOISTING
 * ----------------------------------------------------------------------------------------
 */

sayHello();

function sayHello() {
  console.log("Hello");
}

/*
Questions:
1. Why does this work?
   Because functions declared with the keyword "function" are hoisted to the top of the code during the creation phase 
2. What exactly gets hoisted?
   the function, duh!
*/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 4 — FUNCTION EXPRESSION
 * ----------------------------------------------------------------------------------------
 */

// sayHi();

var sayHi = function () {
  console.log("Hi");
};

/*
Questions:
1. What error occurs if we uncomment the call?
   typeError: sayHi is not a function.
   we're trying to call undefined().
2. Why is this different from a function declaration?
   function declaration hoisted to the to top of the code during creation phase.
*/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 5 — SCOPE CHAIN
 * ----------------------------------------------------------------------------------------
 */

var a = 1;

function outer() {
  var a = 2;

  function inner() {
    console.log(a);
  }

  inner();
}

outer();

/*
Questions:
1. Why does it print 2 instead of 1?
   Because inner func will look up to the first and closest value in the same scope or outer scopes 
2. What path does JS follow to find "a"?
   inner > outer
*/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 6 — NESTED FUNCTIONS + SHADOWING
 * ----------------------------------------------------------------------------------------
 */

var a = 100;

function test() {
  var a = 50; // shadows global a

  function inner() {
    var a = 25; // shadows test a
    console.log(a);
  }

  inner();
}

test();

/*
Questions:
1. What is the output?
   25
2. Which "a" is used and why?
   the 'a' in the inner function, because it's in the same scope it called in.
3. Define "variable shadowing"
   it's when a variable in a inner scope hides outer variable with the same name from outer scope
*/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 7 — CALL STACK
 * ----------------------------------------------------------------------------------------
 */

function one() {
  two();
  console.log("one");
}

function two() {
  three();
  console.log("two");
}

function three() {
  console.log("three");
}

one();

/*
Questions:
1. What is the exact output order?
  console.log("three");
  console.log("two");
  console.log("one");

2. Draw the call stack step-by-step
  call stack: 
  [Global]
  
  one() is called ->
  [one]
  [Global]

  two() is called ->
  [two]
  [one]
  [Global]

  three() is called ->
  [three]
  [two]
  [one]
  [Global]

  then the stack pops every call one by one last-in-first-out algorithm
  three pops -> 
  two pops -> 
  one pops

*/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 8 — "this" (GLOBAL VS FUNCTION)
 * ----------------------------------------------------------------------------------------
 */

function show() {
  console.log(this);
}

show();

/*
Questions:
1. What is "this" here (browser)?
  this === window (browser)
  this === Global Object (Node.js)
2. What would change in strict mode?
  this === undefined
*/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 9 — "this" IN OBJECT
 * ----------------------------------------------------------------------------------------
 */

const user = {
  name: "Ali",
  greet: function () {
    console.log(this.name);
  },
};

user.greet();

/*
Questions:
1. Why does this work?
   Because function expression has 'this' keyword
2. What determines "this" here?
   how it is called, here using the object property.
*/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 10 — "this" TRAP
 * ----------------------------------------------------------------------------------------
 */

const user2 = {
  name: "Ali",
  greet: function () {
    // function inner() {
    //   console.log(this); // window or Object [Global]
    // }
    // Fix 1
    const inner = () => {
      console.log(this); // user2 object, inherits 'this' from the outer function
    };
    inner();
  },
};

user2.greet();

const user3 = {
  name: "Ali",
  greet: function () {
    function inner() {
      console.log(this); // user3 object
    }

    // Fix 2
    inner.bind(this)();
  },
};

user3.greet();

const user4 = {
  name: "Ali",
  greet: function () {
    const inner = function () {
      console.log(this.name); // Ali
    }.bind(this);

    inner();
  },
};

user4.greet();

/*
Questions:
1. What is the output?
    The Global Object
2. Why is it NOT "Ali"?
    Because the inner function is bind to the Global Object
    and it is called as plain function
3. How would you fix it? (2 ways)
    replace the inner function with an arrow function, 
    so it inherits this keyword from the expression function 
*/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 11 — ARROW FUNCTION "this"
 * ----------------------------------------------------------------------------------------
 */

// Objects do NOT create scope -> means don't create a new "this"
// Functions do -> create a execution context and 'this' for reg function
const user5 = {
  name: "Ali",
  greet: () => {
    // is NOT treated like a method
    // Because of the arrow func behavior
    // Arrow functions ignore the object they are in
    // This arrow function created at the top-level
    // It captures the top-level 'this'
    console.log(this); // {}
  },
};

user5.greet();

/*
Questions:
1. Why is this NOT "Ali"?
    Arrow function doesn't have 'this' keyword
2. Where does arrow function get "this" from?
    from its lexical outer scope
*/

/******************************************************************************************
 * 🔥 VISUAL SUMMARY — "this" IN NODE.JS (MODULE vs GLOBAL OBJECT)
 ******************************************************************************************/ /**


/**
 * 🧠 CORE MENTAL MODEL
 *
 * Ask TWO questions:
 *
 * ❓ 1. Is it a REGULAR function?
 * 👉 YES → ask: HOW is it called?
 *    fn()        → global object (non-strict) / undefined (strict)
 *    obj.fn()    → obj
 *
 * ❓ 2. Is it an ARROW function?
 * 👉 YES → ask: WHERE was it created?
 *    Top-level (Node.js) → {}
 *    Inside method       → inherits enclosing `this`
 */

/******************************************************************************************
 * 🟡 TOP-LEVEL `this` (NODE.JS)
 ******************************************************************************************/

// This in NOT a function call
// This is a top-level code inside a module
// this === module.exports === {}
// top-level 'this' in Node.js !== Global Object
console.log(this); // {} (module scope)

/******************************************************************************************
 * 🔵 REGULAR FUNCTION (DEFAULT BINDING)
 ******************************************************************************************/

// Regular function expression defined at the top-level
function testing() {
  // Plain function call → default binding
  // 'this' bind by default with Global Object
  console.log(this); // Object [global]
}

// plain function call
testing();
// ✔️ Object [global] (non-strict mode)
// ✔️ undefined (strict mode)

/******************************************************************************************
 * 🟢 ARROW FUNCTION — LEXICAL `this`
 ******************************************************************************************/

const user12 = {
  name: "Ali",
  greet: function () {
    return () => {
      // Arrow func will inherit 'this' keyword and carry it wherever it goes
      // Arrow captures `this` from greet()s execution context
      console.log(this.name);
    };
  },
};

const fn = user12.greet(); // This is a method call, this === user
// The arrow function still remembers the 'this' context.
// and 'this' keyword in the arrow func still points to the user object.
// unlike reg function.
fn(); // arrow func ignores how it is called, but cares where it's defined

/**
 * 🔥 Key Idea:
 * Arrow functions:
 * - DO NOT have their own `this`
 * - Capture `this` from where they are CREATED
 * - Arrow functions don’t lose this — they carry it with them
 * - IGNORE how they are called
 */

/******************************************************************************************
 * 🔴 REGULAR FUNCTION — LOST CONTEXT
 ******************************************************************************************/

// ⚠️ Compare With Regular Function
const user21 = {
  name: "Ali",
  greet: function () {
    return function () {
      console.log(this.name);
    };
  },
};

// greet() → this === user21
// BUT returned function is NOT bound to user21
const fn2 = user21.greet(); // the returned reg function will lose the link the object.
// 'this' keyword here points to the global object because of how it is called, not where it's created
fn2(); // ❌ undefined

/**
 * 🔥 Key Idea:
 * Regular functions:
 * - HAVE their own `this`
 * - `this` depends on HOW they are called
 */

/******************************************************************************************
 * 🟣 MIXED CASE — REGULAR + ARROW
 ******************************************************************************************/

const user33 = {
  name: "Ali",
  greet: function () {
    // this === user33
    return function () {
      // The returned func has its own execution context and its "this" keyword
      // this === global
      return () => {
        // Arrow func captures 'this' from the regular function's execution context
        // this === global
        console.log(this.name);
      };
    };
  },
};

const fn11 = user33.greet(); // The returned reg func will lose the connection with the user object
const fn22 = fn11(); // The returned arrow function captures the this value of its surrounding execution context at creation time
// in this case it will carry 'global object' from the reg function it's created in.
fn22(); // undefined

/**
 * 🔥 What happened:
 *
 * 1. greet() → this = user33
 * 2. fn11()  → this = global
 * 3. Arrow created → captures this = global
 * 4. fn22() → uses captured this
 */

/******************************************************************************************
 * 🚀 FINAL SUMMARY
 ******************************************************************************************/

/**
 * ✅ Arrow function:
 * this = WHERE it was created
 * → "locks in" the surrounding `this`
 *
 * ✅ Regular function:
 * this = HOW it was called
 *
 * ❗ Node.js:
 * top-level this === {}
 * global object === global
 */

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 12 — MIXED HOISTING (TRICKY)
 * ----------------------------------------------------------------------------------------
 */

var x = 1;

function test() {
  console.log(x);
  var x = 2;
}

test();

/*
Questions:
1. What is logged?
   2
2. Rewrite how JS sees this code internally
    var x = 1;

    function test() {
      var x = 2;
      console.log(x);
    }

    test();
*/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 13 — TEMPORAL DEAD ZONE (ADVANCED)
 * ----------------------------------------------------------------------------------------
 */

let a13 = 10;

function testTDZ() {
  // console.log(a); // SyntaxError: Identifier 'a' has already been declared
  let a13 = 20;
}

testTDZ();

/*
Questions:
1. What error occurs?
   We trying to access a var it hasn't been declared yet in the same scope
2. Why doesn’t it use the outer "a13"?
    Because of the inner 'a13' existed and hoisted to the top of the function, but without any value yet
*/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 14 — EXECUTION CONTEXT FLOW
 * ----------------------------------------------------------------------------------------
 */

var a = 5;

function foo() {
  var b = 10;
  bar();

  function bar() {
    console.log(a, b);
  }
}

foo();

/*
Questions:
1. What is the output?
    5 10
2. Which execution contexts are created?
    bar()    
    foo()
3. How does scope chain resolve variables?
*/

/**
 * ----------------------------------------------------------------------------------------
 * CHALLENGE 15 — REAL INTERVIEW LEVEL
 * ----------------------------------------------------------------------------------------
 */

var a = 10;

function outer() {
  console.log(a);

  var a = 20;

  function inner() {
    console.log(a, "jj");
  }

  inner();
}

outer();

/*
Questions:
1. What are BOTH outputs?
    undefined
    20
2. Explain step-by-step using:
   - Creation phase
    Hoist the vars and functions
    var a = undefined
    function outer()
    var a = undefined
    function inner()
   - Execution phase
   [inner]
   [outer]
   [Global]
   - Scope chain
   inner > outer
   'Global scope': [a = 20, outer()]
    > 'outer func scope': [a = 10, inner()]
    > 'inner func scope': [nothing new but access the previous vars]
*/

/******************************************************************************************
 * BONUS CHALLENGE — THINK LIKE THE ENGINE
 * ----------------------------------------------------------------------------------------
 *
 * For ANY code:
 * 1. Identify execution contexts
 * 2. Simulate creation phase (hoisting)
 * 3. Simulate execution line-by-line
 * 4. Track the call stack
 *
 * If you can do this mentally → you’ve mastered execution context.
 ******************************************************************************************/
