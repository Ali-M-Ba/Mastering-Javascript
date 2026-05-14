/**
 * ============================================================================
 * 🕰️ THE ULTIMATE JAVASCRIPT DATE MASTERCLASS 🕰️
 * ============================================================================
 */

console.log("🚀 STARTING DATE MASTERCLASS...\n");

/* ============================================================================
 * SECTION 1: THE BASICS (Creation & Extraction)
 * ============================================================================ */
console.log("--- SECTION 1: THE BASICS ---");

// 1. Current Date & Time
const now = new Date();
console.log("1. Current Date:", now);

// 2. Timestamps (Milliseconds since Jan 1, 1970 UTC - The Unix Epoch)
const timestamp = Date.now();
console.log("2. Current Timestamp:", timestamp);

// 3. Parsing Strings
// PITFALL ALERT 🚨: String parsing can be inconsistent across browsers.
// ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) is the safest native way.
const fromString = new Date("2024-12-25T10:00:00Z"); // Z means UTC
console.log("3. From String (Christmas 2024 UTC):", fromString);

// 4. Constructor Arguments (Year, Month, Day, Hour, Min, Sec, Ms)
// PITFALL ALERT 🚨: Months are ZERO-INDEXED (0 = Jan, 11 = Dec). Days are 1-indexed.
const fromArgs = new Date(2024, 11, 25, 10, 0, 0);
console.log("4. From Args (Christmas 2024 Local Time):", fromArgs);

// Extracting parts
console.log(`Year: ${fromArgs.getFullYear()}`);
console.log(`Month: ${fromArgs.getMonth()} (Remember: 11 is December!)`);
console.log(`Date: ${fromArgs.getDate()}`);
console.log(`Day of Week: ${fromArgs.getDay()} (0 = Sunday, 6 = Saturday)`);

/**
 * 🛠️ CHALLENGE 1: Extract and Format
 * TODO: Write a function that takes a Date object and returns a string: "YYYY-MM-DD"
 * Note: Make sure single-digit months/days are padded with a zero! (e.g., "05")
 */
function getYYYYMMDD(dateObj) {
  const day = dateObj.getDate().toString().padStart(2, 0);
  const month = (dateObj.getMonth() + 1).toString().padStart(2, 0);
  const year = dateObj.getFullYear().toString();

  return `${year}-${month}-${day}`;
}
console.log("CHALLENGE 1 TEST:", getYYYYMMDD(new Date(2023, 4, 9))); // Expected: "2023-05-09"
console.log("");

/* ============================================================================
 * SECTION 2: ARITHMETIC & MODIFICATION (Durations & Scheduling)
 * ============================================================================ */
console.log("--- SECTION 2: ARITHMETIC & MODIFICATION ---");

// 1. Modifying Dates (Setters)
// Mutating dates can lead to bugs. It's often better to create a new Date.
const meeting = new Date();
meeting.setHours(15); // Set to 3 PM
meeting.setMinutes(30); // Set to 3:30 PM
console.log("Meeting set for:", meeting.toLocaleTimeString());

// 2. Date Math (Adding days)
// How to add 7 days to a date accurately (handles month/leap year rollovers natively)
const today = new Date();
const nextWeek = new Date(today); // Clone the date! Best practice.
nextWeek.setDate(today.getDate() + 7);
console.log("Today:", today.toDateString());
console.log("Next Week:", nextWeek.toDateString());

// 3. Calculating Durations (Differences)
// When you subtract dates, JS converts them to timestamps (numbers).
const start = new Date("2024-01-01");
const end = new Date("2024-01-31");

const diffInMs = end - start;
const msInADay = 1000 * 60 * 60 * 24;

const daysDiff = diffInMs / msInADay;
console.log(`Days between Jan 1 and Jan 31: ${daysDiff} days`);

/**
 * 🛠️ CHALLENGE 2: Age Calculator
 * TODO: Write a function that calculates a user's age in *full years* based on their birthdate.
 */
function calculateAge(birthDateString) {
  // Your code here...
  // Hint: Compare the current month/day with the birth month/day to see if they've had a birthday this year.
  const today = new Date();
  const birthDate = new Date(birthDateString);

  let age = today.getFullYear() - birthDate.getFullYear();

  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  const hasBirthdayPassed = // true if passed
    currentMonth > birthMonth ||
    (currentMonth === birthMonth && currentDay >= birthDay);

  if (!hasBirthdayPassed) {
    age--;
  }

  return `Your current age is ${age} if born in ${birthDate.getFullYear()}`;
}
console.log("CHALLENGE 2 TEST:", calculateAge("1990-05-15")); // Expected: Your current age if born in 1990
console.log("");

/* ============================================================================
 * SECTION 3: FORMATTING AND UI/UX (Intl API)
 * ============================================================================ */
console.log("--- SECTION 3: FORMATTING & UI ---");

// Native JS used to be terrible at formatting. Now we have `Intl.DateTimeFormat`.
// BEST PRACTICE: Use Intl API for localization and clean UI strings.

const eventDate = new Date("2024-10-31T20:00:00");

// Standard built-ins
console.log("ISO String (Good for databases):", eventDate.toISOString());
console.log("Local String (Good for quick logs):", eventDate.toLocaleString());

// Professional UI Formatting using Intl (Real-world use case)
const uiFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});
console.log("Professional UI Format:", uiFormatter.format(eventDate));

/**
 * 🛠️ CHALLENGE 3: Custom Formatter
 * TODO: Use Intl.DateTimeFormat to format a date exactly like this: "October 2024" (Month name and Year).
 */
function getMonthAndYear(dateObj) {
  // Your code here...
  const arFormatter = new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "long",
  });
  const enFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  });

  console.log(
    new Intl.DateTimeFormat().formatRange(new Date(), new Date(2000, 12, 12)),
  );
  console.log(new Intl.DateTimeFormat().format(new Date()));

  return enFormatter.format(dateObj);
}
console.log("CHALLENGE 3 TEST:", getMonthAndYear(new Date(2024, 9, 15))); // Expected: "October 2024"
console.log("");

/* ============================================================================
 * SECTION 4: TIMEZONES & PITFALLS (Advanced)
 * ============================================================================ */
console.log("--- SECTION 4: TIMEZONES & PITFALLS ---");

// PITFALL 1: The "Date String Parsing" Bug
// "YYYY-MM-DD" is treated as UTC.
// "MM/DD/YYYY" is treated as LOCAL time.
const d1 = new Date("2024-01-01"); // Interpreted as Midnight UTC.
const d2 = new Date("01/01/2024"); // Interpreted as Midnight in YOUR local timezone.
console.log("YYYY-MM-DD parses as UTC:", d1.toISOString());
console.log("MM/DD/YYYY parses as Local:", d2.toISOString());

// REAL-WORLD USE CASE: Converting to another Timezone for a User
// Imagine your server is in UTC, you are in NY, and your user is in Tokyo.
const serverTime = new Date();
const tokyoFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Tokyo",
  dateStyle: "full",
  timeStyle: "long",
});
console.log("Server Time:", serverTime.toISOString());
console.log("What the Tokyo User sees:", tokyoFormatter.format(serverTime));

/**
 * 🛠️ CHALLENGE 4: Timezone Converter
 * TODO: Write a function that takes a date and returns the hour (0-23) in 'Europe/London'.
 */
function getLondonHour(dateObj) {
  // Your code here...
  // Hint: look into Intl.DateTimeFormat options for 'hour' and 'hour12: false'
  const londonFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/London",
    hour12: false,
    hour: "numeric",
  });
  return londonFormatter.format(dateObj);
}
console.log("CHALLENGE 4 TEST (London Hour):", getLondonHour(new Date()));
console.log("");

/* ============================================================================
 * SECTION 5: NATIVE VS. LIBRARIES (Commentary)
 * ============================================================================
 * You might wonder: "Should I just use a library?"
 *
 * 1. Native JS (Date + Intl):
 *    - Use when: You want zero dependencies, fast load times, and simple math/formatting.
 *    - Pros: Built-in, modern Intl API is very powerful.
 *    - Cons: Mutating dates is dangerous, timezone arithmetic is notoriously hard natively.
 *
 * 2. date-fns: (The modern lodash for dates)
 *    - Use when: You need complex arithmetic (e.g., "closest date to X", "is it a weekend").
 *    - Pros: Immutable, tree-shakeable (only import what you need), functional.
 *    - Example: import { addDays, format } from 'date-fns';
 *
 * 3. Luxon: (Created by the Moment.js team)
 *    - Use when: Your app heavily relies on complex Timezone conversions.
 *    - Pros: Immutable, excellent Timezone support out of the box.
 *
 * Note: A new native API called `Temporal` is coming to JavaScript soon,
 * which will fix the broken `Date` object forever. Until then, use the above!
 */

/* ============================================================================
 * SECTION 6: MINI-PROJECT (The Final Challenge)
 * ============================================================================
 * Let's build a real-world feature: An Event Reminder System.
 */
console.log("--- SECTION 6: MINI-PROJECT ---");

/**
 * 🛠️ FINAL CHALLENGE: Event Countdown UI
 * TODO: Complete this function. It should accept an event name and a date string.
 * It must return an object containing:
 * 1. name: The event name.
 * 2. formattedDate: The date formatted nicely for the user's local timezone (e.g., "Friday, Dec 31, 2024").
 * 3. daysRemaining: Integer of full days left until the event.
 * 4. status: "Past", "Today", or "Future".
 */
function createEventReminder(eventName, eventDateString) {
  // 1. Create your Date objects
  const eventDate = new Date(eventDateString);
  const today = new Date();

  // 2. Do your Math here...
  const dateDiff = eventDate - today;

  const daysInMS = 1000 * 60 * 60 * 24;

  const daysDiff = Math.floor(dateDiff / daysInMS);

  // 3. Do your Formatting here...
  const formattedDate = Intl.DateTimeFormat("en-SA", {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(eventDate);
  // const formattedDate = eventDate.toLocaleString();

  const daysRemaining = daysDiff > 0 ? daysDiff : 0;
  const status =
    today > eventDate
      ? "Past"
      : today.toDateString() === eventDate.toDateString()
        ? "Today"
        : "Future";

  console.log(
    "compare if the event today: ",
    today.toDateString(), // eg: 'Thu May 14 2026'
    eventDate.toDateString(), // eg: 'Thu May 14 2026'
    today.toDateString() === eventDate.toDateString(),
  );

  // 4. Return the result object
  return {
    name: eventName,
    formattedDate,
    daysRemaining,
    status,
  };
}

// TEST YOUR PROJECT:
const newYearReminder = createEventReminder(
  "New Year's Eve",
  "2026-12-31T23:59:59",
);
console.log("Event Reminder Object:", newYearReminder);

console.log("\n🏁 TUTORIAL COMPLETE! 🏁");
