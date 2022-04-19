import tellAge from "./ageUtility";
const SECOND_MILLIS = 1000;
const MINUTE_MILLIS = 60 * SECOND_MILLIS;
const HOUR_MILLIS = 60 * MINUTE_MILLIS;
const DAY_MILLIS = 24 * HOUR_MILLIS;
const MONTH_MILLIS = 30 * DAY_MILLIS;
let testTime = new Date().getTime();

test("Invalid date should be null", () => {
  expect(tellAge(0)).toBe(null);
});

test("Time less than a minute should have '...seconds ago'", () => {
  expect(tellAge(testTime)).toBe("0seconds ago");
});

test("Time less than 2 minutes should have '1 minute ago'", () => {
  // Get a time behind by 1 minute and a second
  testTime = new Date(testTime - (SECOND_MILLIS + MINUTE_MILLIS));
  expect(tellAge(testTime)).toEqual("1 minute ago");
});

test("Time less than 60 minutes should have '... minutes ago'", () => {
  // Get a time behind by ~ 10 minutes
  testTime = new Date(testTime - MINUTE_MILLIS * 9.5);
  expect(tellAge(testTime)).toEqual("10 minutes ago");
});

test("Time less than 2 hours should have '1 hour ago'", () => {
  // Get a time behind by 1 hour and a minute
  testTime = new Date(testTime - (HOUR_MILLIS + MINUTE_MILLIS));
  expect(tellAge(testTime)).toEqual("1 hour ago");
});

test("Time less than 24 hours should have '... hours ago'", () => {
  // Get a time behind by ~ 2 hours
  testTime = new Date(testTime - HOUR_MILLIS * 1.5);
  expect(tellAge(testTime)).toEqual("2 hours ago");
});

test("Time less than 2 days should have '1 day ago'", () => {
  // Get a time behind by 1 day and an hour
  testTime = new Date(testTime - (DAY_MILLIS + HOUR_MILLIS));
  expect(tellAge(testTime)).toEqual("1 day ago");
});

test("Time less than 6 months should have '... days ago'", () => {
  // Get a time behind by ~ 10 days
  testTime = new Date(testTime - DAY_MILLIS * 9.8);
  expect(tellAge(testTime)).toEqual("10 days ago");
});

test("Time greater than 6 months should have '... months ago'", () => {
  // Get a time behind by 10 months
  testTime = new Date(testTime - MONTH_MILLIS * 10);
  expect(tellAge(testTime)).toEqual("10 months ago");
});
