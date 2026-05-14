"use strict";

/******************************************************************************************
 * 🧠 JAVASCRIPT CLOSURES
 ******************************************************************************************/

/**
 * =========================================
 * 1. SIMPLE DEFINITION
 * =========================================
 * A closure is:
 * 👉 A function that remembers variables from its outer scope
 *    even AFTER the outer function has finished executing.
 */

/**
 * =========================================
 * 2. WHY DO CLOSURES EXIST?
 * =========================================
 * Because of:
 *  - Lexical Scope (where variables are defined)
 *  - Execution Context (how code runs)
 *
 * JS doesn't look at WHERE a function is CALLED,
 * it looks at WHERE it was DEFINED.
 */

/**
 * =========================================
 * 3. LEXICAL SCOPE (CORE IDEA)
 * =========================================
 * Inner functions can access variables from outer functions.
 */

function outer() {
  let outerVar = "I am from outer";

  function inner() {
    console.log(outerVar); // ✅ can access outerVar
  }

  inner();
}
outer();

/**
 * =========================================
 * 4. BASIC CLOSURE EXAMPLE
 * =========================================
 */

function createClosure() {
  let message = "Hello from closure";

  return function () {
    console.log(message); // remembers message
  };
}

const closureFn = createClosure();
closureFn(); // ✅ "Hello from closure"

/**
 * 💡 KEY MOMENT:
 * createClosure() finished execution,
 * BUT the returned function still remembers "message".
 *
 * 👉 THIS is a closure.
 */

/**
 * =========================================
 * 5. HOW IT WORKS (MENTAL MODEL)
 * =========================================
 *
 * When a function is created:
 * 1. It gets a hidden [[Scope]] reference
 * 2. That reference points to where it was defined
 *
 * Think:
 *
 * createClosure()
 *   └── message = "Hello"
 *        └── returned function → keeps reference 🔗
 *
 * Even after createClosure is gone,
 * the reference keeps message alive.
 */

/**
 * =========================================
 * 6. FUNCTION RETURNING FUNCTION
 * =========================================
 */

function greet(name) {
  return function (message) {
    console.log(name + ": " + message);
  };
}

const aliGreet = greet("Ali");
aliGreet("Hello!"); // Ali: Hello!

/**
 * 👉 "name" is remembered via closure
 */

/**
 * =========================================
 * 7. REAL-WORLD USE CASE #1 — PRIVATE DATA
 * =========================================
 */

function createBankAccount(initialBalance) {
  let balance = initialBalance; // 🔒 private

  return {
    deposit(amount) {
      balance += amount;
      console.log("Deposited:", amount);
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        console.log("Withdrew:", amount);
      } else {
        console.log("Insufficient funds");
      }
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(100);
account.deposit(50);
account.withdraw(30);
console.log(account.getBalance()); // 120

/**
 * 💡 balance is NOT accessible directly:
 * console.log(account.balance) ❌ undefined
 *
 * 👉 Closure provides DATA PRIVACY
 */

/**
 * =========================================
 * 8. REAL-WORLD USE CASE #2 — COUNTER
 * =========================================
 */

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

/**
 * 👉 count persists across calls
 */

/**
 * =========================================
 * 9. SCOPE CHAIN (IMPORTANT)
 * =========================================
 *
 * When accessing a variable:
 * JS looks in:
 *
 * 1. Local scope
 * 2. Outer scope
 * 3. Global scope
 *
 * Example:
 */

let globalVar = "global";

function level1() {
  let level1Var = "level1";

  function level2() {
    let level2Var = "level2";

    console.log(level2Var); // local
    console.log(level1Var); // outer
    console.log(globalVar); // global
  }

  level2();
}
level1();

/**
 * =========================================
 * 10. COMMON MISTAKES & MISCONCEPTIONS
 * =========================================
 */

/**
 * ❌ Mistake 1: Thinking variables are copied
 */

function wrongExample() {
  let x = 10;

  return function () {
    console.log(x);
  };
}

const fn1 = wrongExample();
fn1(); // 10

// It's NOT a copy — it's a REFERENCE

/**
 * =========================================
 * 11. CLOSURES IN LOOPS (VERY IMPORTANT)
 * =========================================
 */

/**
 * ❌ Problem with var
 */

for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("var:", i); // 3, 3, 3
  }, 100);
}

/**
 * 👉 WHY?
 * All closures share the SAME "i"
 */

/**
 * ✅ Fix with let
 */

for (let j = 0; j < 3; j++) {
  setTimeout(function () {
    console.log("let:", j); // 0, 1, 2
  }, 100);
}

/**
 * 👉 let creates a NEW scope each iteration
 */

/**
 * ✅ Fix using closure manually
 */

for (var k = 0; k < 3; k++) {
  (function (kCopy) {
    setTimeout(function () {
      console.log("closure fix:", kCopy); // 0,1,2
    }, 100);
  })(k);
}

/**
 * =========================================
 * 12. MEMORY IMPLICATIONS
 * =========================================
 */

/**
 * Closures KEEP references alive in memory.
 *
 * This can cause memory leaks if:
 *  - You store large data inside closures
 *  - You never release references
 */

function heavyClosure() {
  let bigData = new Array(1000000).fill("🔥");

  return function () {
    console.log("Still holding big data...");
  };
}

const leak = heavyClosure();

/**
 * 👉 bigData is STILL in memory because closure references it
 *
 * Solution:
 * - Remove references when not needed
 * - Avoid storing large unused data
 */

/**
 * =========================================
 * 13. ADVANCED PATTERN — FACTORY FUNCTION
 * =========================================
 */

function createUser(name) {
  let score = 0;

  return {
    name,
    increaseScore() {
      score++;
    },
    getScore() {
      return score;
    },
  };
}

const user1 = createUser("Ali");
user1.increaseScore();
user1.increaseScore();

console.log(user1.getScore()); // 2

/**
 * =========================================
 * 14. VISUAL / MENTAL MODEL
 * =========================================
 *
 * Think of closure like a BACKPACK 🎒:
 *
 * function created → takes a backpack of variables
 *
 * function runs later → opens backpack → uses variables
 *
 * Even if original place is gone → backpack remains
 */

/**
 * =========================================
 * 16. WHEN TO USE CLOSURES (REAL PROJECTS)
 * =========================================
 *
 * ✅ Use closures when you need:
 *
 * 1. Data privacy (hide variables)
 * 2. State persistence (remember values)
 * 3. Factory functions (create multiple instances)
 * 4. Event handlers (React, DOM, etc.)
 * 5. Functional programming (currying, composition)
 *
 * 🚩 SIGNALS:
 * - "I need to remember something between calls"
 * - "I don't want this variable exposed"
 * - "I want independent instances"
 */

/**
 * =========================================
 * FINAL SUMMARY
 * =========================================
 *
 * Closure = function + remembered environment
 *
 * It's one of the MOST IMPORTANT concepts in JS.
 * Mastering it unlocks:
 * - React
 * - Node.js patterns
 * - Advanced architecture
 */
