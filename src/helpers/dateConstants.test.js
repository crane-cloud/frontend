import { subMonths, monthFigure, getBackDate } from "./dateConstants";

test("subMonths function returns 3 months back from April as January - index 0", () => {
  const sampleDate = new Date("04/14/22");
  expect(new Date(subMonths(sampleDate, 3)).getMonth()).toBe(0);
});

test("monthFigure function correctly formats single digit month", () => {
  expect(monthFigure(1)).toBe("02"); // Month figure 1 month from April (current month of test) should be 02 (March)
});


test("getBackDate returns full date after month difference between current month and month provided", () => {
  // Same year
  expect(getBackDate(2)).toBe("2022-1-1");

  // Previous year
  expect(getBackDate(3)).toBe("2021-10-1");
});