/******************************************************************************************
 * JAVASCRIPT FUNCTION METHODS — DEEP DIVE
 *
 * Covered:
 * - call, apply, bind
 * - this behavior (context manipulation)
 * - partial application
 * - edge cases (strict mode, arrow functions, constructors, etc.)
 * - performance considerations
 * - real-world use cases
 *
 ******************************************************************************************/

"use strict";

/******************************************************************************************
 * SECTION 1 — HOW `this` WORKS (FOUNDATION)
 ******************************************************************************************/

/**
 * `this` depends on HOW a function is called, not where it's defined.
 */

function showThis() {
  console.log("this:", this);
}

// 1. Simple function call → undefined (in strict mode)
showThis();

// 2. Method call → object
const obj = {
  name: "Ali",
  show: showThis,
};
obj.show();

// 3. Constructor call → new instance
function Person(name) {
  this.name = name;
}
const p = new Person("John");
console.log(p);

/******************************************************************************************
 * SECTION 2 — FUNCTION.METHODS: call, apply, bind
 ******************************************************************************************/

/**
 * All functions inherit from Function.prototype:
 * - call
 * - apply
 * - bind
 */

function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const user = { name: "Ali" };

/******************************************************************************************
 * 2.1 — CALL
 ******************************************************************************************/

/**
 * Syntax:
 * fn.call(thisArg, arg1, arg2, ...)
 *
 * Immediately invokes the function.
 */

greet.call(user, "Hello", "!"); // Hello, Ali!

/******************************************************************************************
 * 2.2 — APPLY
 ******************************************************************************************/

/**
 * Syntax:
 * fn.apply(thisArg, [argsArray])
 *
 * Same as call, but arguments are passed as an array.
 */

greet.apply(user, ["Hi", "!!"]); // Hi, Ali!!

/******************************************************************************************
 * 2.3 — BIND
 ******************************************************************************************/

/**
 * Syntax:
 * const newFn = fn.bind(thisArg, arg1, arg2, ...)
 *
 * DOES NOT invoke immediately.
 * Returns a new function with bound `this` and optionally preset arguments.
 */

const boundGreet = greet.bind(user, "Hey");
boundGreet("?"); // Hey, Ali?

/******************************************************************************************
 * SECTION 3 — CALL vs APPLY vs BIND (COMPARISON)
 ******************************************************************************************/

/**
 * call:
 *  - invokes immediately
 *  - arguments passed individually
 *
 * apply:
 *  - invokes immediately
 *  - arguments passed as array
 *
 * bind:
 *  - returns a new function
 *  - can be reused
 */

function sum(a, b, c) {
  return a + b + c;
}

console.log(sum.call(null, 1, 2, 3)); // 6
console.log(sum.apply(null, [1, 2, 3])); // 6

const add5 = sum.bind(null, 5);
console.log(add5(10, 20)); // 35

/******************************************************************************************
 * SECTION 4 — PARTIAL APPLICATION
 ******************************************************************************************/

/**
 * Partial application = fixing some arguments ahead of time.
 */

function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

/******************************************************************************************
 * SECTION 5 — CONTEXT MANIPULATION (REAL USE CASES)
 ******************************************************************************************/

/**
 * Borrowing methods from another object
 */

const person1 = {
  name: "Ali",
  speak() {
    console.log("Hi, I'm " + this.name);
  },
};

const person2 = { name: "John" };

// Borrow method
person1.speak.call(person2); // Hi, I'm John

/******************************************************************************************
 * SECTION 6 — APPLY FOR ARRAY OPERATIONS (OLD PATTERN)
 ******************************************************************************************/

/**
 * Before spread operator existed:
 */

const numbers = [5, 10, 2, 8];

const max = Math.max.apply(null, numbers);
console.log("Max:", max);

// Modern equivalent:
console.log("Max (spread):", Math.max(...numbers));

/******************************************************************************************
 * SECTION 7 — EDGE CASES
 ******************************************************************************************/

/**
 * 7.1 — Arrow Functions IGNORE call/apply/bind
 */

const arrow = () => {
  console.log("Arrow this:", this);
};

arrow.call({ name: "Fake" }); // ❌ does NOT change this

/**
 * WHY?
 * Arrow functions capture `this` lexically (from surrounding scope).
 */

/**
 * 7.2 — bind cannot be overridden
 */

function test() {
  console.log(this.name);
}

const bound = test.bind({ name: "Ali" });

bound.call({ name: "John" }); // STILL "Ali"

/**
 * Once bound, `this` is permanent.
 */

/**
 * 7.3 — Using bind with constructors
 */

function Animal(name) {
  this.name = name;
}

const BoundAnimal = Animal.bind(null);

const dog = new BoundAnimal("Dog");
console.log(dog.name); // Dog

/**
 * `new` overrides bind's this.
 */

/**
 * 7.4 — Losing `this` in callbacks
 */

const obj2 = {
  name: "Ali",
  say() {
    setTimeout(function () {
      console.log(this.name); // ❌ undefined
    }, 100);
  },
};

obj2.say();

/**
 * Fix with bind:
 */

const obj3 = {
  name: "Ali",
  say() {
    setTimeout(
      function () {
        console.log(this.name);
      }.bind(this),
      100,
    );
  },
};

obj3.say();

/**
 * Better fix (arrow):
 */

const obj4 = {
  name: "Ali",
  say() {
    setTimeout(() => {
      console.log(this.name);
    }, 100);
  },
};

obj4.say();

/******************************************************************************************
 * SECTION 8 — PERFORMANCE CONSIDERATIONS
 ******************************************************************************************/

/**
 * - call/apply are very similar in performance
 * - apply may be slightly slower due to array handling
 * - bind creates a NEW function → memory cost
 *
 * Avoid:
 * - Creating bound functions inside loops
 */

for (let i = 0; i < 3; i++) {
  const fn = greet.bind(user); // ❌ new function every iteration
}

/**
 * Better:
 */

const reusable = greet.bind(user);
for (let i = 0; i < 3; i++) {
  reusable("Hello", "!");
}

/******************************************************************************************
 * SECTION 9 — ADVANCED: MANUAL IMPLEMENTATION (POLYFILL IDEA)
 ******************************************************************************************/

/**
 * Simplified version of call
 */

Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis;

  const sym = Symbol();
  context[sym] = this;

  const result = context[sym](...args);
  delete context[sym];

  return result;
};

function hello() {
  console.log("Hello " + this.name);
}

hello.myCall({ name: "Ali" });

/******************************************************************************************
 * SECTION 10 — REAL-WORLD USE CASES SUMMARY
 ******************************************************************************************/

/**
 * 1. Event handlers → fix `this`
 * 2. Reusing methods across objects
 * 3. Partial application (bind)
 * 4. Functional programming patterns
 * 5. Working with APIs that change context
 */

/******************************************************************************************
 * FINAL MENTAL MODEL
 ******************************************************************************************/

/**
 * ASK:
 *
 * 1. Do I want to RUN the function now?
 *    → use call / apply
 *
 * 2. Do I want a NEW function with fixed context?
 *    → use bind
 *
 * 3. Do I have arguments as array?
 *    → use apply (or spread)
 *
 * 4. Am I using arrow functions?
 *    → call/apply/bind WON’T change this
 */
