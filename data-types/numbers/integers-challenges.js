/**
 * ============================================================================
 * JAVASCRIPT INTEGER CHALLENGES
 * ============================================================================
 */

console.log("Starting tests...\n");
let testsPassed = 0;
let totalTests = 0;

function assertEqual(testName, actual, expected) {
  totalTests++;
  // Basic equality check (handles BigInt and standard types)
  if (
    actual === expected ||
    (typeof actual === "bigint" && actual == expected)
  ) {
    console.log(`✅ PASSED: ${testName}`);
    testsPassed++;
  } else {
    console.error(`❌ FAILED: ${testName}`);
    console.error(`   Expected:`, expected, `(type: ${typeof expected})`);
    console.error(`   Actual:  `, actual, `(type: ${typeof actual})\n`);
  }
}

// ============================================================================
// CHALLENGE 1: The Vanishing Pennies (Financial Math)
// ============================================================================
// Problem: An e-commerce site is calculating cart totals using floating-point
// math. Customers are complaining that a $19.99 item and a $2.99 item are
// billing them for $22.979999999999997 instead of $22.98.
//
// Task: Rewrite the function to safely calculate the total in CENTS (as an integer).

function calculateTotalInCents(pricesInDollars) {
  // --- YOUR CODE HERE ---
  // Hint: Avoid adding floats directly. Convert each price to cents first,
  // then sum them up, then use Math.round() to fix any lingering float artifacts
  // from the multiplication.

  return pricesInDollars.reduce((sum, price) => {
    const cents = Math.round(price * 100);
    return sum + cents;
  }, 0);
}

// Tests for Challenge 1
const cart = [19.99, 2.99]; // Expected total: $22.98 -> 2298 cents
assertEqual("Challenge 1: Cart Total", calculateTotalInCents(cart), 2298);

// ============================================================================
// CHALLENGE 2: The Corrupted Database IDs (BigInt)
// ============================================================================
// Problem: You are fetching user profiles from a database API. The IDs are
// 64-bit integers. Standard JSON.parse() ruins them.
// Example API string: `{"userId": "9007199254740995"}`
//
// Task: Parse the payload, extract the ID safely as a BigInt, add 1 to it
// (to find the next user in the sequence), and return the new ID as a string.

function getNextUserId(apiPayloadString) {
  // --- YOUR CODE HERE ---
  const parsed = JSON.parse(apiPayloadString);

  // Fix how we handle this ID. It currently converts to a standard Number
  // which loses precision, and adds standard 1.
  const currentId = BigInt(parsed.userId);
  const nextId = currentId + 1n;

  return nextId.toString();
}

// Tests for Challenge 2
const payload = '{"userId": "9007199254740996"}';
assertEqual(
  "Challenge 2: Next User ID",
  getNextUserId(payload),
  "9007199254740997",
);

// ============================================================================
// CHALLENGE 3: The Strict Form Validator (Data Sanitization)
// ============================================================================
// Problem: You have an array of mixed inputs coming from a dirty CSV file.
// You only want to extract valid, safe, whole numbers (integers).
//
// Task: Write a filter function that removes decimals, text, empty strings,
// NaNs, and anything beyond the safe integer limit.

function extractValidIntegers(mixedData) {
  return mixedData
    .filter((item) => {
      // --- YOUR CODE HERE ---
      // Return true if the item can be cleanly converted to a safe integer,
      // false otherwise.

      const number = Number(item);

      // Explicitly reject null
      // Note: Number(null) === 0, but we want to reject null as a valid integer.
      if (item === null) return false;

      // Get rid of empty strings
      // Note: Number("") === 0, 
      // but we want to reject empty strings as valid integers.
      if (typeof item === "string" && item.trim() === "") return false;

      // No need to check for NaN or Infinity separately, 
      // as Number.isSafeInteger will return false for those.
      // if (
        // Reject floating point numbers, null, NaN, Infinite, "5"
      //   !Number.isInteger(number)
      // )
      //   return false;

      // Finally, check if it's a safe integer. 
      // This will also reject non-numeric strings and decimals.
      return Number.isSafeInteger(number);
    })
    .map((item, i, arr) => {
      console.log(arr);
      return Number(item);
    });
}

// Tests for Challenge 3
const dirtyData = [
  "42", // Keep (42)
  "  100  ", // Keep (100 - whitespace is fine)
  "42.5", // Reject (Decimal)
  "10px", // Reject (Not a strict number)
  NaN, // Reject (NaN)
  "", // Reject (Empty string shouldn't be 0)
  null, // Reject (Null shouldn't be 0)
  9007199254740999, // Reject (Unsafe size)
];

const cleaned = extractValidIntegers(dirtyData);
assertEqual("Challenge 3: Array Length", cleaned.length, 2);
assertEqual("Challenge 3: First Valid Int", cleaned[0], 42);
assertEqual("Challenge 3: Second Valid Int", cleaned[1], 100);

// ============================================================================
console.log(`\nResults: ${testsPassed} / ${totalTests} Tests Passed`);
if (testsPassed === totalTests) {
  console.log("🎉 CONGRATULATIONS! You've mastered JavaScript Integers!");
} else {
  console.log("🛠️ Keep trying! Check the console errors to see what failed.");
}
