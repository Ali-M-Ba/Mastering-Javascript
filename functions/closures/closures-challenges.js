/******************************************************************************************
 * 🧠 JAVASCRIPT CLOSURES — PRACTICE CHALLENGES
 * ******************************************************************************************/

console.log("🚀 Closures Practice Started...\n");

/**
 * =========================================
 * 🟢 CHALLENGE 1 — BASIC CLOSURE
 * =========================================
 * Create a function `createGreeter(name)`
 * that returns a function which prints:
 *
 * 👉 "Hello, <name>"
 */

function createGreeter(name) {
  return function () {
    console.log("Hello, " + name);
  };
}

const greetAli = createGreeter("Ali");
greetAli();
greetAli();
greetAli();

/**
 * =========================================
 * 🟡 CHALLENGE 2 — COUNTER WITH METHODS
 * =========================================
 * Create a counter with:
 * - increment()
 * - decrement()
 * - reset()
 */

function createCounter() {
  let counter = 0;

  return {
    get() {
      return counter;
    },
    increment() {
      counter++;
      console.log(counter);
    },
    decrement() {
      counter--;
      console.log(counter);
    },
    reset() {
      counter = 0;
      console.log(counter);
    },
  };
}

const advCounter = createCounter();
advCounter.increment();
advCounter.increment();
advCounter.decrement();
console.log(advCounter.get()); // Expected: 1
advCounter.reset();
console.log(advCounter.get()); // Expected: 0

/**
 * =========================================
 * 🟡 CHALLENGE 3 — PRIVATE VARIABLE
 * =========================================
 * Create a function `createSecret(secret)`
 * that:
 * - Allows reading via getSecret()
 * - Does NOT allow direct access
 */

function createSecret(secret) {
  return {
    getSecret() {
      return secret;
    },
  };
}

const mySecret = createSecret("JS is awesome");
console.log(mySecret.getSecret()); // JS is awesome
console.log(mySecret.secret); // undefined

/**
 * =========================================
 * 🔴 CHALLENGE 4 — FUNCTION LIMITER
 * =========================================
 * Create:
 *
 * createLimiter(fn, limit)
 *
 * It allows fn to run ONLY "limit" times.
 * After that → do nothing
 */
function createLimiter(fn, limit) {
  return function () {
    limit--;
    if (limit >= 0) {
      fn.call();
    }
  };
}

const limitedFn = createLimiter(() => console.log("🔥 Running"), 2);

limitedFn(); // runs
limitedFn(); // runs
limitedFn(); // ignored
limitedFn(); // ignored

/**
 * =========================================
 * 🔴 CHALLENGE 6 — CLOSURE IN LOOP (TRICKY)
 * =========================================
 * Fix this code so it prints:
 * 0, 1, 2
 */

// for (var i = 0; i < 3; i++) {
//   setTimeout(function () {
//     console.log("❌ Wrong:", i);
//   }, 100);
// }

for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(function () {
      console.log("First fix with a function:", i);
    }, 100);
  })(i);
}
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("Second fix with 'let':", i);
  }, 100);
}

/**
 * =========================================
 * 🔴 CHALLENGE 7 — ONCE FUNCTION
 * =========================================
 * Create a function `once(fn)`
 * that allows fn to run only ONCE
 */

function once(fn) {
  let hasRan = false;

  return function () {
    if (!hasRan) {
      hasRan = true;
      fn.call();
    }
  };
}

const runOnce = once(() => console.log("✅ Only once"));

runOnce(); // runs
runOnce(); // ignored
runOnce(); // ignored

/**
 * =========================================
 * 🔴 CHALLENGE 8 — MEMOIZATION (ADVANCED)
 * =========================================
 * Cache function results:
 *
 * memoize(fn)
 *
 * If called with same input → return cached result
 */

function memoize(fn) {
  let cache = new Map();

  return function (args) {
    if (cache.has(args)) {
      const result = cache.get(args);
      return result;
    } else {
      const result = fn.call(null, args);
      cache.set(args, result);
      return result;
    }
  };
}

const slowSquare = (n) => {
  console.log("Calculating...");
  return n * n;
};

const fastSquare = memoize(slowSquare);

console.log(fastSquare(4)); // calculates
console.log(fastSquare(4)); // cached
console.log(fastSquare(5)); // calculates
console.log(fastSquare(5)); // cached

/**
 * =========================================
 * 🧠 BONUS CHALLENGE — CURRYING
 * =========================================
 * Convert:
 * add(a, b, c)
 * into:
 * add(a)(b)(c)
 */

function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(add(1)(2)(3)); // 6

function add2(a) {
  let total = a;

  function sum(nextValue) {
    if (nextValue !== undefined) {
      total += nextValue;
      return sum;
    }
    return total;
  }

  sum.valueOf = function () {
    return total;
  };

  sum.toString = function () {
    return String(total);
  };

  return sum;
}

console.log(+add2(1)(2)(3)); // 6
console.log(add2(1)(2)(3).valueOf()); // 6

/**
 * =========================================
 * 🎯 FINAL NOTE
 * =========================================
 *
 * If you can solve:
 * - Counters ✅
 * - Privacy patterns ✅
 * - Loop issues ✅
 * - Memoization ✅
 *
 * 👉 You REALLY understand closures.
 *
 ******************************************************************************************/
