/******************************************************************
 JAVASCRIPT MAP — QUICK & PRACTICAL GUIDE
 Everything is runnable. Read the comments and run step by step.
******************************************************************/

/*
WHAT IS A MAP?
- A Map is a built-in JavaScript collection for storing key → value pairs.
- Unlike plain objects, Map keeps insertion order and allows ANY type as a key.
*/

const myMap = new Map();

// Add values
myMap.set("name", "Ali");
myMap.set(42, "number key");
myMap.set(true, "boolean key");

console.log(myMap);
// Map(3) { 'name' => 'Ali', 42 => 'number key', true => 'boolean key' }

/*
MAP vs OBJECT — KEY DIFFERENCES
*/

// 1️⃣ Keys can be ANY type in Map
const obj = {};
obj[{ id: 1 }] = "object key"; // converted to string "[object Object]"
console.log(obj); // { '[object Object]': 'object key' }

const map = new Map();
map.set({ id: 1 }, "object key"); // preserved as real object key
console.log(map);

// 2️⃣ Map keeps insertion order reliably
const ordered = new Map();
ordered.set("b", 2);
ordered.set("a", 1);
console.log([...ordered.keys()]); // ['b', 'a']

// 3️⃣ Map has built-in size property
console.log(ordered.size); // 2

// 4️⃣ Map is iterable by default
for (const [key, value] of ordered) {
  console.log(key, value);
}

/*
MOST IMPORTANT MAP METHODS
*/

const users = new Map();

// set(key, value) — add/update
users.set(1, "Ali");
users.set(2, "Sara");

// get(key) — read value
console.log(users.get(1)); // Ali

// has(key) — check existence
console.log(users.has(2)); // true

// delete(key) — remove one
users.delete(2);

// clear() — remove all
// users.clear();

// size — number of entries
console.log(users.size); // 1

// keys(), values(), entries()
users.set(3, "John");
console.log([...users.keys()]); // [1, 3]
console.log([...users.values()]); // ['Ali', 'John']
console.log([...users.entries()]); // [[1,'Ali'], [3,'John']]

// forEach
users.forEach((value, key) => {
  console.log(key, value);
});

/*
PRACTICAL USE CASES — WHERE MAP IS BETTER
*/

// ✅ USE CASE 1 — Counting occurrences (frequency counter)
const words = ["apple", "banana", "apple", "orange", "banana"];

const countMap = new Map();

for (const w of words) {
  countMap.set(w, (countMap.get(w) || 0) + 1);
}

console.log(countMap);
// Better than array search each time (O(n))

// ✅ USE CASE 2 — Caching expensive results
function slowSquare(n) {
  console.log("Computing...");
  return n * n;
}

const cache = new Map();

function fastSquare(n) {
  if (cache.has(n)) return cache.get(n);
  const result = slowSquare(n);
  cache.set(n, result);
  return result;
}

console.log(fastSquare(5)); // computes
console.log(fastSquare(5)); // cached

// ✅ USE CASE 3 — Using objects as keys (NOT possible safely with Object)
const sessionData = new Map();

const userA = { id: 1 };
const userB = { id: 2 };

sessionData.set(userA, { theme: "dark" });
sessionData.set(userB, { theme: "light" });

console.log(sessionData.get(userA));

// ✅ USE CASE 4 — Fast lookups instead of array find()
const products = [
  { id: 101, name: "Phone" },
  { id: 102, name: "Laptop" },
];

// Convert array → Map for O(1) lookup
const productMap = new Map(products.map((p) => [p.id, p]));

console.log(productMap.get(102));

// ✅ USE CASE 5 — Preserving insertion order for dynamic registries
const handlers = new Map();
handlers.set("click", () => console.log("click"));
handlers.set("hover", () => console.log("hover"));

for (const [event, fn] of handlers) {
  console.log("Run handler:", event);
}

/******************************************************************
 JAVASCRIPT MAPS — QUICK OVERVIEW

 A Map is a collection of key–value pairs.
 Unlike objects:
 - Keys can be ANY type (objects, numbers, functions, etc.)
 - Order is preserved
 - Built-in useful methods

 Common methods:
 - new Map()
 - map.set(key, value)
 - map.get(key)
 - map.has(key)
 - map.delete(key)
 - map.size
 - map.clear()
 - map.forEach()
 - map.entries(), map.keys(), map.values()

******************************************************************/

console.log("=== JS MAPS PRACTICE CHALLENGES ===");

/******************************************************************
 CHALLENGE 1 — User Login Counter
******************************************************************/

/*
Create a Map to track how many times each user logs in.

Tasks:
- Create a Map called loginCount
- Add 4 users with different login counts
- Increase one user’s count by 1
- Print all users and counts
- Print total number of tracked users
*/

const loginCount = new Map();

loginCount.set("Ali", 1);
loginCount.set("Alex", 4);
loginCount.set("Sara", 6);
loginCount.set("Ahmed", 9);
console.log(loginCount);

// loginCount.set("Ali", loginCount.get("Ali") + 1);
// SAFER
loginCount.set("Ali", (loginCount.get("Ali") || 0) + 1);
console.log(loginCount);

for (const [user, count] of loginCount) {
  console.log(`The user ${user} has logged in ${count} times.`);
}
console.log(`The total number of tracked users is ${loginCount.size}`);

/******************************************************************
 CHALLENGE 2 — Shopping Cart System
******************************************************************/

/*
Use a Map where:
key   = product name
value = price

Tasks:
- Add at least 5 products
- Remove one product
- Check if "Laptop" exists
- Calculate total cart value using Map iteration
*/

const cart = new Map();

cart.set("Laptop", 899);
cart.set("Mouse", 49);
cart.set("Keyboard", 99);
cart.set("Screen Protector", 9);
cart.set("Screen", 199);

cart.delete("Screen Protector");

console.log("Does the cart have a laptop:", cart.has("Laptop"));
console.log("laptop in lower case won't work", cart.has("laptop"));

let totalCart = 0;
for (const [product, price] of cart) {
  totalCart += price;
}

console.log(totalCart);

/******************************************************************
 CHALLENGE 3 — Word Frequency Analyzer
******************************************************************/

/*
Given this sentence, count word frequency using a Map.

Rules:
- Case-insensitive
- Ignore punctuation
- Store word -> count in a Map

Sentence:
"The quick brown fox jumps over the lazy fox and the quick dog"
*/

const sentence =
  "The quick brown fox jumps over the lazy fox and the quick dog";

const wordsArray = sentence.split(" ");
const wordsMap = new Map();

for (const word of wordsArray) {
  const lowerCasedWord = word.toLowerCase();
  wordsMap.set(lowerCasedWord, (wordsMap.get(lowerCasedWord) || 0) + 1);
}
console.log(wordsMap);

/******************************************************************
 CHALLENGE 4 — Object Keys in Maps (Important Advantage)
******************************************************************/

/*
Maps allow objects as keys.

Tasks:
- Create 3 user objects
- Use them as keys in a Map
- Value = last login date string
- Retrieve login date for one object key
*/
const usersMap = new Map();
const user1 = {
  name: "Ali",
  id: 100,
};
const user2 = {
  name: "Ahmed",
  id: 200,
};
const user3 = {
  name: "Mohammed",
  id: 300,
};

usersMap.set(user1, "10-10-2026");
usersMap.set(user2, "01-01-2026");
usersMap.set(user3, "10-02-2026");

console.log("User 1 last login date:", usersMap.get(user1));

/******************************************************************
 CHALLENGE 5 — Inventory Stock Manager
******************************************************************/

/*
Map structure:
key   = itemId (number)
value = { name, stock }

Tasks:
- Add 5 inventory items
- Increase stock of one item
- Decrease stock of another
- Delete any item with stock = 0
- Print remaining inventory
*/

const inventory = new Map();

inventory.set(101, { name: "Paper", stock: 10 });
inventory.set(102, { name: "Clips", stock: 12 });
inventory.set(103, { name: "Pens", stock: 20 });
inventory.set(104, { name: "Markers", stock: 30 });
inventory.set(105, { name: "Canvas", stock: 40 });

// Cleaner, direct since it's a reference it mutates original
console.log(
  "Increase the clips stock by 100 using Map.get()",
  (inventory.get(102).stock += 100),
);

// Complicated, expensive, two map lookups
// console.log(
//   "Increase the stock using Map.set()",
//   inventory.set(102, {
//     ...inventory.get(102),
//     // ✔️ Pure Calculcation "="
//     stock: inventory.get(102).stock + 100,
// Don't spread and imutates in the same time
//     // ❌ Mutate the original "+=" object while creating a new one
//     // stock: (inventory.get(102).stock += 1111),
//   }),
// );

console.log(
  "Decrease the clips stock by 50 using Map.get()",
  (inventory.get(102).stock -= 50),
);

console.log(
  "Assaign zero to the pens' stock using Map.get()",
  (inventory.get(103).stock = 0),
);

inventory.forEach((value, key) => {
  if (value.stock === 0) inventory.delete(key);
});

console.log(
  "The inventory after removing the product with zero stock:",
  inventory,
);

/******************************************************************
 CHALLENGE 6 — Group Students by Grade
******************************************************************/

/*
You are given this array:

Each student has name + grade.

Tasks:
- Create a Map where:
  key = grade
  value = array of student names
- Group them correctly
*/

const students = [
  { name: "Ali", grade: "A" },
  { name: "Sara", grade: "B" },
  { name: "John", grade: "A" },
  { name: "Mona", grade: "C" },
  { name: "Zaid", grade: "B" },
];

/******************************************************************
 CHALLENGE 7 — Cache System Simulation
******************************************************************/

/*
Simulate an API cache using Map.

Rules:
- Key = URL
- Value = response data

Tasks:
- Add 3 cached URLs
- If URL exists → print "FROM CACHE"
- If not → print "FETCHING..."
- Update one cached value
*/

/******************************************************************
 CHALLENGE 8 — Most Frequent Item
******************************************************************/

/*
Find the most frequent number using Map.

Array:
*/

const nums = [4, 7, 2, 4, 9, 2, 4, 7, 2, 2, 8, 7, 7, 7];

/*
Tasks:
- Count frequency using Map
- Find the number with highest frequency
*/

/******************************************************************
 CHALLENGE 9 — Map → Object Conversion
******************************************************************/

/*
Create a Map with at least 5 entries.

Tasks:
- Convert Map into a plain object
- Print the result
*/

/******************************************************************
 CHALLENGE 10 — Object → Map Conversion
******************************************************************/

/*
Given object:

Tasks:
- Convert it into a Map
- Print all entries using Map iteration
*/

const config = {
  theme: "dark",
  language: "en",
  layout: "grid",
  sidebar: true,
};

/******************************************************************
 BONUS CHALLENGE — Nested Maps
******************************************************************/

/*
Create a Map of departments.

Structure:
department → Map of employees → salary

Tasks:
- Create at least 2 departments
- Each has at least 3 employees
- Print all employees with salaries grouped by department
*/

console.log("=== END OF CHALLENGES ===");
