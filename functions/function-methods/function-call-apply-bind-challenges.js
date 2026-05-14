/******************************************************************************************
 * CHALLENGE 1 — BASIC `this` FIX
 *
 * Goal:
 * Fix the function so it logs: "Hello, Ali"
 ******************************************************************************************/

const user = {
  name: "Ali",
};

function greet() {
  console.log("Hello, " + this.name);
}

greet.call(user); // Hello, Ali!

/******************************************************************************************
 * CHALLENGE 2 — BORROW A METHOD
 *
 * Goal:
 * Make person2 use person1's method
 ******************************************************************************************/

const person1 = {
  name: "Ali",
  sayHi() {
    console.log("Hi, I'm " + this.name);
  },
};

const person2 = {
  name: "John",
};

person1.sayHi.call(person2);

/******************************************************************************************
 * CHALLENGE 3 — APPLY VS CALL
 *
 * Goal:
 * Call the function using BOTH call and apply
 ******************************************************************************************/

function introduce(age, city) {
  console.log(`I'm ${this.name}, ${age} years old from ${city}`);
}

const user2 = { name: "Ali" };

introduce.call(user2, 25, "Makkah");
introduce.apply(user2, [25, "Makkah"]);

/******************************************************************************************
 * CHALLENGE 4 — PARTIAL APPLICATION
 *
 * Goal:
 * Create a function `add10` using bind
 ******************************************************************************************/

function add(a, b) {
  return a + b;
}

const add10 = add.bind(null, 10);

console.log(add10(10)); // 20
console.log(add10(15)); // 25

/******************************************************************************************
 * CHALLENGE 5 — LOST `this` (CLASSIC BUG)
 *
 * Goal:
 * Fix the bug so it prints: "Ali"
 ******************************************************************************************/

// const obj = {
//   name: "Ali",
//   print() {
//     setTimeout(function () {
//       console.log(this.name); // ❌ undefined
//     }, 100);
//   },
// };
const objBind = {
  name: "Ali",
  print() {
    setTimeout(
      function () {
        console.log(this.name); // Ali
      }.bind(this),
      100,
    );
  },
};

const objArrow = {
  name: "Ali",
  print() {
    setTimeout(() => {
      console.log(this.name); // Ali
    }, 100);
  },
};

objBind.print();
objArrow.print();

/******************************************************************************************
 * CHALLENGE 6 — BIND VS CALL PRIORITY
 *
 * Goal:
 * Predict the output BEFORE running
 ******************************************************************************************/

function say() {
  console.log(this.name);
}

const a = { name: "A" };
const b = { name: "B" };

const bound = say.bind(a);

bound.call(b); // ❓ What prints?
// A

// Explain WHY?
// Because bound() bound with the obj 'a' using bind method,
// and it cannot override the context 'this' after it bound.

/******************************************************************************************
 * CHALLENGE 7 — CONSTRUCTOR + BIND (TRICKY)
 *
 * Goal:
 * Predict behavior
 ******************************************************************************************/

function Person(name) {
  this.name = name;
}

const BoundPerson = Person.bind({ name: "Fake" });

const p = new BoundPerson("Ali");

console.log(p.name); // ❓ ?
// Ali

// Explain WHY bind doesn't win here
// 'new' keyword can override the context 'this'

/******************************************************************************************
 * CHALLENGE 8 — ARROW FUNCTION TRAP
 *
 * Goal:
 * Understand why this fails
 ******************************************************************************************/

const obj2 = {
  name: "Ali",
  sayArrow: () => {
    console.log(this.name);
  },
  say() {
    console.log(this.name);
  },
};

obj2.sayArrow(); // ❓ ?
// undefined

// 1. Explain output
// Arrow functions don't have 'this', and they inherit lexically
// 2. Fix i
/*
  say() {
    console.log(this.name);
  },
*/

/******************************************************************************************
 * CHALLENGE 9 — BUILD YOUR OWN `bind`
 *
 * Goal:
 * Implement a simplified version of bind
 ******************************************************************************************/

Function.prototype.myBind = function (context, ...presetArgs) {
  console.log("'this' is gonna be the method", this);
  console.log(
    "'context' is gonna be the object which is calling the method",
    context,
  );
  console.log("The args passed to the myBind", presetArgs);

  // 1. Store the original function (the one we want to bind)
  const originalFn = this;

  // 2. Return a new function that will be called later
  return function (...laterArgs) {
    console.log(laterArgs);

    const symbol = Symbol();
    context[symbol] = originalFn;
    console.log(context);

    // 3. Call the original function with the correct `this` and arguments
    const result = context[symbol](...presetArgs, ...laterArgs);

    delete context[symbol];
    // 4. Return the result of the original function
    return result;
  };
};

// // Test:
function greet2(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const user3 = { name: "Ali" };

const fn = greet2.myBind(user3, "Hello");
fn("!"); // Hello, Ali!

/******************************************************************************************
 * CHALLENGE 10 — ADVANCED PARTIAL + FLEXIBILITY
 *
 * Goal:
 * Create a function that supports flexible partial application
 ******************************************************************************************/

function multiply(a, b, c) {
  return a * b * c;
}

// ❌ You cannot change multiply
// ✅ Your task:
// Create a version where:
const m1 = multiply.bind(null, 2);
const m2 = m1.bind(null, 3);

console.log(m2(4)); // 24

// 🔥 Bonus:
// Explain how multiple binds behave internally

/******************************************************************************************
 * CHALLENGE 11 — REAL-WORLD SIMULATION
 *
 * Goal:
 * Fix event handler context
 ******************************************************************************************/

const button = {
  label: "Submit",
  onClick() {
    console.log("Clicked: " + this.label);
  },
};

function simulateClick(handler) {
  handler();
}

simulateClick(button.onClick.bind(button));
simulateClick(() => button.onClick());

/******************************************************************************************
 * CHALLENGE 12 — APPLY + MATH
 *
 * Goal:
 * Find the minimum number using apply
 ******************************************************************************************/

const nums = [10, 3, 7, 1, 9];

console.log(Math.min.apply(null, nums));
