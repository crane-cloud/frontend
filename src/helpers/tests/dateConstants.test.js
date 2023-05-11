import { DisplayDateTime, 
  // getBackDate
 } from "../dateConstants";
var assert = require("assert");
var today = new Date();
var thisYear = today.getFullYear();
var thisMonth = today.getMonth();
//since month returns 0 to 11
thisMonth += 1;

describe("data constants helper", () => {
  // it("test fomart changer with get back date funtion", () => {
  //   //function returns date amonth ago for this test
  //   //get the year
  //   thisYear = thisMonth - 1 <= 0 ? thisYear - 1 : thisYear;
  //   thisYear = thisMonth - 1 <= 0 ? thisYear + 1 : thisYear;
  //   //get the month
  //   thisMonth = thisMonth - 1 <= 0 ? 12 + (thisMonth - 1) : thisMonth - 1;
  //   //assert equality
  //   assert.equal(getBackDate(1), thisYear + "-" + thisMonth + "-1");
  // });
  it("test Display date ", () => {
    assert.equal(DisplayDateTime(new Date(2022, 4, 18)), "5-18-2022  12:00AM");
  });
});
