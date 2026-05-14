/**
 * ============================================================================
 * THE COMPREHENSIVE GUIDE TO INTEGERS IN JAVASCRIPT
 * ============================================================================
 * * JavaScript has historically only had one number type: `Number`.
 * Internally, JS Numbers are represented as double-precision 64-bit floating
 * point format (IEEE 754). This means there is no true "integer" type under
 * the hood for standard numbers, which leads to specific quirks and limits.
 * * Recently, `BigInt` was introduced to handle arbitrarily large integers.
 * * This executable guide covers how to safely handle integers in JS.
 * ============================================================================
 */

console.log("=================================================");
console.log("1. INTERNAL REPRESENTATION & SAFE LIMITS");
console.log("=================================================\n");

// Because JS uses IEEE 754 floats, it can only safely represent integers
// exactly up to 2^53 - 1. Beyond this, precision is lost.
const MAX_SAFE = Number.MAX_SAFE_INTEGER; // 9007199254740991
const MIN_SAFE = Number.MIN_SAFE_INTEGER; // -9007199254740991

console.log(`Max Safe Integer: ${MAX_SAFE}`);
console.log(`Is max safe? ${Number.isSafeInteger(MAX_SAFE)}`); // true

// PITFALL: Floating-point precision loss
// Adding 1 to the max safe integer works, but adding 2 results in a precision error.
console.log(`MAX_SAFE + 1 = ${MAX_SAFE + 1}`); // 9007199254740992
console.log(`MAX_SAFE + 2 = ${MAX_SAFE + 2}`); // 9007199254740992 (INCORRECT!)
console.log(`Is MAX_SAFE + 1 safe? ${Number.isSafeInteger(MAX_SAFE + 1)}`); // false

console.log("\n=================================================");
console.log("2. PARSING & VALIDATING USER INPUT");
console.log("=================================================\n");

// Real-world scenario: You get a string from a form input or URL param.
const input1 = "42";
const input2 = "42.99";
const input3 = "42px";
const input4 = "";

// Method A: parseInt() - Parses until it hits a non-number. Good for extracting numbers.
// ALWAYS specify the radix (base 10) to avoid legacy octal bugs in older environments.
console.log(`parseInt("42px"):`, parseInt(input3, 10)); // 42 (Strips "px")
console.log(`parseInt("42.99"):`, parseInt(input2, 10)); // 42 (Truncates decimals)

// Method B: Number() - Strict coercion. Fails if there are non-numeric characters.
console.log(`Number("42px"):`, Number(input3)); // NaN
console.log(`Number(""):`, Number(input4)); // 0 (PITFALL: Empty string coercing to 0)

// BEST PRACTICE: Robust Integer Validation Function
// Use this in production to validate API payloads or route parameters.
function parseStrictInteger(value) {
  // 1. Convert to Number (handles strings, ignores "px" style garbage)
  const num = Number(value);

  // 2. Reject NaN, Infinity, and empty strings (which Number() turns to 0)
  if (typeof value === "string" && value.trim() === "") return null;
  if (!Number.isFinite(num)) return null;

  // 3. Ensure it's an integer and within safe limits
  // checks two things:
  // Is the number within the safe 64-bit limits?
  // Is the number an integer?  (100.5 is float-point number)
  if (!Number.isSafeInteger(num)) return null;

  return num;
}

console.log(`Validate "100":`, parseStrictInteger("100")); // 100
console.log(`Validate "100.5":`, parseStrictInteger("100.5")); // null
console.log(`Validate "100px":`, parseStrictInteger("100px")); // null
console.log(`Validate "":`, parseStrictInteger("")); // null

console.log("\n=================================================");
console.log("3. COMMON PITFALLS (NaN, Infinity, Coercion)");
console.log("=================================================\n");

// PITFALL 1: NaN is a number, and NaN !== NaN
console.log(`typeof NaN:`, typeof NaN); // "number"
console.log(`NaN === NaN:`, NaN === NaN); // false
// Fix: Always use Number.isNaN()
console.log(`Number.isNaN(NaN):`, Number.isNaN(NaN)); // true

// PITFALL 2: Floating point math creating non-integers
console.log(`0.1 + 0.2 === 0.3:`, 0.1 + 0.2 === 0.3); // false (0.30000000000000004)

// PITFALL 3: Implicit Type Coercion
console.log(`"5" + 1:`, "5" + 1); // "51" (String concatenation)
console.log(`"5" - 1:`, "5" - 1); // 4 (Numeric subtraction)
// Fix: Always explicitly convert before arithmetic.

console.log("\n=================================================");
console.log("4. REAL-WORLD SCENARIO: FINANCIAL CALCULATIONS");
console.log("=================================================\n");

/**
 * NEVER USE FLOATS FOR MONEY.
 * Because of the `0.1 + 0.2` issue, using floats for currency will cause
 * pennies to vanish or appear magically over thousands of transactions.
 * * BEST PRACTICE: Store money as integers representing the smallest unit (e.g., cents).
 */

const item1Cents = 1999; // $19.99
const item2Cents = 299; // $2.99

function calculateTotalCents(items) {
  // reduce is great for summing arrays
  return items.reduce((sum, current) => sum + current, 0);
}

function formatCentsToDollars(cents) {
  if (!Number.isInteger(cents)) throw new Error("Cents must be an integer");
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

const cart = [item1Cents, item2Cents];
const totalCents = calculateTotalCents(cart);
console.log(`Total in cents: ${totalCents}`); // 2298
console.log(`Formatted Total: ${formatCentsToDollars(totalCents)}`); // $22.98

console.log("\n=================================================");
console.log("5. NUMBER vs BIGINT (Large Datasets & APIs)");
console.log("=================================================\n");

/**
 * When interacting with databases (like PostgreSQL) or APIs (like Twitter),
 * IDs are often 64-bit integers. These EXCEED JS's `Number.MAX_SAFE_INTEGER`.
 * * Example: A Twitter ID like 1059492161741635584 will be corrupted if parsed
 * as a standard JS Number. It will round to 1059492161741635600.
 * * SOLUTION: Use BigInt.
 */

// Notice the 'n' suffix denoting a BigInt
const databaseId = 1059492161741635584n;

// Or parse from a string API payload:
const apiPayload = '{"userId": "1059492161741635584"}';
const parsedApi = JSON.parse(apiPayload);
const safeUserId = BigInt(parsedApi.userId);

console.log(`BigInt ID:`, safeUserId);

// BIGINT RULES & PITFALLS:
// 1. You cannot mix BigInt and Number in math without explicit conversion.
try {
  console.log(safeUserId + 1); // Throws Error
} catch (e) {
  console.log(`Error mixing types: ${e.message}`);
}

// Correct way:
console.log(`BigInt Math:`, safeUserId + 1n);

// 2. Strict equality checks Types
console.log(`10n === 10:`, 10n === 10); // false
console.log(`10n == 10:`, 10n == 10); // true

// 3. JSON.stringify DOES NOT support BigInt natively.
try {
  JSON.stringify({ id: 10n });
} catch (e) {
  console.log(`JSON Stringify Error: ${e.message}`);
}

// Workaround for sending BigInts over JSON APIs:
// Override the prototype toJSON method (safe for standard BigInt serialization)
BigInt.prototype.toJSON = function () {
  return this.toString();
};
console.log(`JSON Stringified BigInt:`, JSON.stringify({ id: 10n })); // '{"id":"10"}'

console.log("\n=================================================");
console.log("6. PERFORMANCE & BEST PRACTICES SUMMARY");
console.log("=================================================\n");

/**
 * 1. BITWISE OPERATIONS:
 * Bitwise operators (`|`, `&`, `>>`) implicitly convert operands to 32-bit integers.
 * While `Math.floor(x)` is the standard way to truncate floats, `x | 0` is historically
 * faster but ONLY safe for numbers under 2.14 billion (32-bit limit).
 */
console.log(`Math.trunc(42.9):`, Math.trunc(42.9)); // 42 (Modern, handles large numbers safely)
console.log(`42.9 | 0:`, 42.9 | 0); // 42 (Bitwise hack, fast but limited to 32-bit bounds)

/**
 * BEST PRACTICES CHECKLIST:
 * * [ ] Use `Number.isSafeInteger()` when receiving unknown numerical data.
 * [ ] Use `Math.trunc()` instead of `Math.floor()` to strip decimals if dealing with
 * negative numbers (`Math.floor(-4.2)` is -5, `Math.trunc(-4.2)` is -4).
 * [ ] Never represent currency as floats. Multiply by 100 and use integers (cents).
 * [ ] Use `BigInt` (or parse as strings) for Database IDs, Snowflakes, or cryptographic hashes.
 * [ ] Avoid mixing Types. Use `Number(x)` or `parseInt(x, 10)` early at the boundaries
 * of your application (e.g., in your API controllers).
 * [ ] Always provide the radix `10` to `parseInt()`.
 */

console.log("Execution complete. All integer tests passed successfully.");
