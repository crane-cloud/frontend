export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dayNames = [
  "Sunday",
  "Monday",
  "TuesDay",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const today = new Date().getDate();
export const currentMonth = new Date().getMonth();
export const currentYear = new Date().getFullYear();

export const currentHour = new Date().getHours();
export const currentMinutes = new Date().getMinutes();

// function to change date to required format by backend
const changeToFormat = (theDate) =>
  theDate.getFullYear() +
  "-" +
  (theDate.getMonth() + 1) +
  "-" +
  theDate.getDate();

// Get the current date now
const mytoday = new Date();

// the current date as required for the api graph calls
export const currentDate = changeToFormat(mytoday);

// date from three months back
const subMonths = (date, months) => {
  return date.setMonth(date.getMonth() - months);
};

const monthFigure = (month) =>
  ("0" + new Date(subMonths(mytoday, month)).getMonth()).slice(-2);

export const getBackDate = month => {
  let getCurrentYear = new Date();
  let thisYear = getCurrentYear.getFullYear();
  let thisMonth = getCurrentYear.getMonth();

  thisYear = ((thisMonth - month) <= 0) ? thisYear - 1 : thisYear;
  let result = changeToFormat(new Date(thisYear, monthFigure(month), "01"))
  return result;
}

/* 
 - getFullYear() - 1 returns a date from one year ago
 - setDate(1) changes the date to the first of the month
 - this is because the backend only wants the first day
   then set the year to the result which is a UTC value
   then the last new date changes it to a easily readable format which we 
   convert to the backend required format */
export const oneYearBack = changeToFormat(
  new Date(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1)).setDate(1)
  )
);

export const twoYearBack = changeToFormat(
  new Date(
    new Date(new Date().setFullYear(new Date().getFullYear() - 2)).setDate(1)
  )
);