/**

* JavaScript Array Methods Guide
* Run this file with: node array-methods-guide.js
  */

console.log("=== findLast ===");
const nums1 = [1, 2, 3, 4, 5];
const lastEven = nums1.findLast((n) => n % 2 === 0);
console.log("Last even:", lastEven); // 4

// Edge case: no match
console.log(
  "No match:",
  nums1.findLast((n) => n > 10),
); // undefined

// ------------------------------------

console.log("\n=== findLastIndex ===");
const nums2 = [1, 2, 3, 2];
const lastIndex = nums2.findLastIndex((n) => n === 2);
console.log("Last index of 2:", lastIndex); // 3

console.log(
  "Not found:",
  nums2.findLastIndex((n) => n === 9),
); // -1

// ------------------------------------

console.log("\n=== some ===");
const hasEven = [1, 3, 5].some((n) => n % 2 === 0);
console.log("Has even:", hasEven); // false

// Edge case: empty array
console.log(
  "Empty array:",
  [].some(() => true),
); // false

// ------------------------------------

console.log("\n=== every ===");
const allEven = [2, 4, 6].every((n) => n % 2 === 0);
console.log("All even:", allEven); // true

// Edge case: empty array
console.log(
  "Empty array:",
  [].every(() => false),
); // true ⚠️

// ------------------------------------

console.log("\n=== flat ===");
const nested = [1, [2, [3, [4]]]];
console.log("Flat(1):", nested.flat());
console.log("Flat(2):", nested.flat(2));
console.log("Flat(Infinity):", nested.flat(Infinity));

// Sparse array
const sparse = [1, , 3];
console.log("Sparse flattened:", sparse.flat());

// ------------------------------------

console.log("\n=== flatMap ===");
const mapped = [1, 2, 3].flatMap((n) => [n, n * 2]);
console.log("FlatMap result:", mapped);

// Remove nulls while mapping
const cleaned = [1, null, 2].flatMap((n) => (n ? [n] : []));
console.log("Removed nulls:", cleaned);

// ------------------------------------

console.log("\n=== sort ===");
const nums3 = [10, 2, 5];

// Default (wrong for numbers)
console.log("Default sort:", [...nums3].sort());

// Correct numeric sort
console.log(
  "Ascending:",
  [...nums3].sort((a, b) => a - b),
);
console.log(
  "Descending:",
  [...nums3].sort((a, b) => b - a),
);

// Mutation demo
const arr = [3, 1, 2];
arr.sort();
console.log("Mutated array:", arr);

// ------------------------------------

console.log("\n=== groupBy ===");
const values = [6.1, 4.2, 6.3];

const grouped = Object.groupBy(values, Math.floor);
console.log("Grouped:", grouped);

// Group by custom condition
const words = ["apple", "bat", "car", "ant"];
const groupedByLength = Object.groupBy(words, (w) => w.length);
console.log("Grouped by length:", groupedByLength);

// ------------------------------------

console.log("\n=== Notes ===");
console.log(`

* findLast / findLastIndex search from the end
* some() stops early on first true
* every() returns true for empty arrays
* flat() does NOT mutate
* flatMap() = map + flat(1)
* sort() MUTATES original array
* groupBy() returns an object with string keys
  `);
