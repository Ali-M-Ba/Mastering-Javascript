/*************************************************
 * 📌 JAVASCRIPT SETS — EXPLANATION + CHALLENGES
 * (NO SOLUTIONS, NO HINTS)
 *************************************************/

/*
A Set is a built-in JavaScript object used to store
UNIQUE values.

Key characteristics:
- Duplicate values are automatically removed
- Values can be of any data type
- Insertion order is preserved
- No index-based access
- Optimized for fast existence checks
*/

const demoSet = new Set([1, 2, 2, 3, 3]);

/*************************************************
 * 🔹 CORE PROPERTY
 *************************************************/

/*
size
- Returns the number of unique values in the set
*/

// TODO: Log the size of demoSet
console.log("size of demoSet", demoSet.size);

/*************************************************
 * 🔹 CORE METHODS
 *************************************************/

/*
add(value)
- Adds a value to the set
- Ignored if value already exists
*/

// TODO: Add values to demoSet
console.log("adding an element...", demoSet.add("Fine shyt alert!"));
console.log("The set after adding an element", demoSet);

/*
has(value)
- Checks if a value exists in the set
- Returns true or false
*/

// TODO: Checak for the existence of a value
console.log("Checking if an element exists in the set", demoSet.has("Lose it"));

/*
delete(value)
- Removes a value from the set
- Returns true if removed
*/

// TODO: Delete a value from demoSet
console.log("Remove existing element", demoSet.delete(1));
console.log("Remove non existing element", demoSet.delete(1));

/*
clear()
- Removes all values from the set
*/

// TODO: Clear the set (optional)
console.log("Clearing the set...", demoSet.clear());

/*************************************************
 * 🔹 ITERATION
 *************************************************/

const demoSet2 = new Set([1, 2, 2, 3, 3]);

/*
Sets are iterable using:
- for...of
- forEach()
*/

// TODO: Iterate over demoSet and log each value
for (const value of demoSet2) {
  console.log(value);
}

/*************************************************
 * 🔹 COMMON USE CASE
 *************************************************/

/*
Removing duplicates from an array is one of the
most common real-world uses of Set.
*/

const numbers = [1, 2, 2, 3, 4, 4, 5];

// TODO: Remove duplicate numbers using Set
// TODO: Convert the result back into an array
const unduplicatedNumbersArray = [...new Set(numbers)];
console.log(unduplicatedNumbersArray);

/*************************************************
 * 🧪 CHALLENGE 1: UNIQUE EMAIL STORAGE
 *************************************************/

const emails = [
  "a@test.com",
  "b@test.com",
  "a@test.com",
  "c@test.com",
  "b@test.com",
];

// TODO:
// Store unique emails
// Convert them back to an array
const uniqueEmails = [...new Set(emails)];
console.log(uniqueEmails);

/*************************************************
 * 🧪 CHALLENGE 2: LOGIN SESSION TRACKER
 *************************************************/

/*
Goal:
Track logged-in users and prevent duplicates
*/

const loggedInUsers = new Set();

// TODO:
// Create login(userId)
// Create logout(userId)

const login = (userId) => loggedInUsers.add(userId);
const logout = (userId) => loggedInUsers.delete(userId);

console.log("Logging In...", login(1234));
console.log("Logging In same user...", login(1234));
console.log("The set after logging in a user", loggedInUsers);
console.log("Loggin out...", logout(1234));
console.log("The set after logging out a user", loggedInUsers);

/*************************************************
 * 🧪 CHALLENGE 3: PRODUCT COMPARISON
 *************************************************/

/*
Goal:
Compare two users' products
*/

const userA = new Set(["phone", "laptop", "tablet"]);
const userB = new Set(["laptop", "camera", "tablet"]);

// TODO:
// Find common products
console.log("common products", userA.intersection(userB));
// Find products only userA owns
console.log("products only userA owns", userA.difference(userB));
// Find products only userB owns
console.log("products only userB owns", userB.difference(userA));

/*************************************************
 * 🧪 CHALLENGE 4: PERMISSION CHECK
 *************************************************/

/*
Goal:
Check permissions efficiently
*/

const permissions = new Set(["READ", "WRITE"]);

// TODO:
// Create canAccess(permission)
const canAccess = (permission) => permissions.has(permission);

console.log(canAccess("READ"));   // true
console.log(canAccess("WRITE"));  // true
console.log(canAccess("DELETE")); // false

/*************************************************
 * ✅ WHEN TO USE SET
 *************************************************/

/*
Use Set when:
- You need guaranteed uniqueness
- You need fast lookups
- You want to avoid duplicates

Avoid Set when:
- You need indexes
- You need key-value pairs (use Map)
- You need sorting logic
*/
