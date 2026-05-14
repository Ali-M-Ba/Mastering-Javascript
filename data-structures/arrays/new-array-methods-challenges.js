/**

* JavaScript Array Methods Challenges
  */

console.log("=== findLast / findLastIndex ===");

// 1. Find the last negative number
const arr1 = [3, -1, 5, -7, 9];
console.log(
  "Last neg number",
  arr1.findLast((el) => el < 0),
);

// 2. Find index of last active user
const users = [
  { name: "A", active: false },
  { name: "B", active: true },
  { name: "C", active: true },
];
console.log(
  "Last active user index",
  users.findLastIndex(({ active }) => active === true),
);
// ------------------------------------

console.log("\n=== some ===");

// 3. Check if any number > 100
const arr2 = [10, 50, 120];
console.log(
  "Is there a number bigger than 100",
  arr2.some((num) => num > 100),
);

// 4. Check if any string is empty
const strings = ["hi", "", "hello"];
console.log(
  "Is any sting is empty: ",
  strings.some((string) => !string),
);

// ------------------------------------

console.log("\n=== every ===");

// 5. Check if all numbers are positive
const arr3 = [1, 2, 3, -1];
console.log(
  "Are all numbers positive?",
  arr3.every((num) => num > 0),
);

// 6. Check if all users have email
const users2 = [
  { email: "[a@test.com](mailto:a@test.com)" },
  { email: "[b@test.com](mailto:b@test.com)" },
  {},
];
console.log(
  "Are all users have emails?",
  users2.every(({ email }) => email),
);

// ------------------------------------

console.log("\n=== flat ===");

// 7. Flatten deeply nested array
const nested = [1, [2, [3, [4]]]];
console.log("flattened array: ", nested.flat(Infinity));

// ------------------------------------

console.log("\n=== flatMap ===");

// 8. Convert [1,2,3] → [1,2,2,4,3,6]
const arr4 = [1, 2, 3];
console.log(arr4.flatMap((num) => [num, num * 2]));

// 9. Remove null values
const arr5 = [1, null, 2, null, 3];
console.log(arr5.flatMap((el) => (el ? [el] : [])));

// ------------------------------------

console.log("\n=== sort ===");

// 10. Sort numbers ascending
const arr6 = [10, 2, 5];
console.log(arr6.sort((a, b) => a + b));

// 11. Sort users by age
const users3 = [
  { name: "A", age: 30 },
  { name: "B", age: 20 },
];
console.log(users3.sort((user1, user2) => user1.age - user2.age));

// ------------------------------------

console.log("\n=== groupBy ===");

// 12. Group numbers into even/odd
const arr7 = [1, 2, 3, 4];
console.log(Object.groupBy(arr7, (el) => (el % 2 === 0 ? "even" : "odd")));

// 13. Group words by length
const words = ["hi", "hello", "cat", "a"];
console.log(Object.groupBy(words, (el) => el.length));

// ------------------------------------

console.log("\n=== Mixed ===");

// 14. Find last even number, then double it
const arr8 = [1, 3, 4, 6, 7];
console.log(arr8.findLast((el) => el % 2 === 0) * 2);

// 15. Flatten and check if all values are numbers
const arr9 = [1, [2, 3], ["oops"]];
console.log(arr9.flat(Infinity).every((el) => typeof el === "number"));

console.log("\n=== Done ===");
