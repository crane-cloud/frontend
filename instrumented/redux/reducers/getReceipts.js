function cov_29po44vkrl() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getReceipts.js";
  var hash = "b8a4ded44df037f1ac9f6adf6557183b8b613571";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getReceipts.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 21
        },
        end: {
          line: 13,
          column: 1
        }
      },
      "1": {
        start: {
          line: 15,
          column: 27
        },
        end: {
          line: 48,
          column: 1
        }
      },
      "2": {
        start: {
          line: 16,
          column: 2
        },
        end: {
          line: 47,
          column: 3
        }
      },
      "3": {
        start: {
          line: 18,
          column: 6
        },
        end: {
          line: 24,
          column: 8
        }
      },
      "4": {
        start: {
          line: 27,
          column: 6
        },
        end: {
          line: 30,
          column: 8
        }
      },
      "5": {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 35,
          column: 8
        }
      },
      "6": {
        start: {
          line: 38,
          column: 6
        },
        end: {
          line: 43,
          column: 8
        }
      },
      "7": {
        start: {
          line: 46,
          column: 6
        },
        end: {
          line: 46,
          column: 19
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 15,
            column: 27
          },
          end: {
            line: 15,
            column: 28
          }
        },
        loc: {
          start: {
            line: 15,
            column: 61
          },
          end: {
            line: 48,
            column: 1
          }
        },
        line: 15
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 15,
            column: 28
          },
          end: {
            line: 15,
            column: 48
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 15,
            column: 36
          },
          end: {
            line: 15,
            column: 48
          }
        }],
        line: 15
      },
      "1": {
        loc: {
          start: {
            line: 16,
            column: 2
          },
          end: {
            line: 47,
            column: 3
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 17,
            column: 4
          },
          end: {
            line: 24,
            column: 8
          }
        }, {
          start: {
            line: 26,
            column: 4
          },
          end: {
            line: 30,
            column: 8
          }
        }, {
          start: {
            line: 31,
            column: 4
          },
          end: {
            line: 35,
            column: 8
          }
        }, {
          start: {
            line: 37,
            column: 4
          },
          end: {
            line: 43,
            column: 8
          }
        }, {
          start: {
            line: 45,
            column: 4
          },
          end: {
            line: 46,
            column: 19
          }
        }],
        line: 16
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0],
      "1": [0, 0, 0, 0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "b8a4ded44df037f1ac9f6adf6557183b8b613571"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_29po44vkrl = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_29po44vkrl();
import { GETTING_RECEIPTS, RECEIPTS_SUCCESS, RECEIPTS_FAIL, CLEAR_RECEIPTS } from "../actions/actionTypes";
const initialState = (cov_29po44vkrl().s[0]++, {
  receipts: [],
  isRetrievingReceipts: false,
  receiptsFetched: false,
  receiptsMessage: "Receipts Not Available"
});
cov_29po44vkrl().s[1]++;
const getReceiptsReducer = (state = (cov_29po44vkrl().b[0][0]++, initialState), action) => {
  cov_29po44vkrl().f[0]++;
  cov_29po44vkrl().s[2]++;
  switch (action.type) {
    case RECEIPTS_SUCCESS:
      cov_29po44vkrl().b[1][0]++;
      cov_29po44vkrl().s[3]++;
      return {
        ...state,
        receipts: action.payload,
        isRetrievingReceipts: false,
        receiptsFetched: true,
        receiptsMessage: "Receipts fetched"
      };
    case GETTING_RECEIPTS:
      cov_29po44vkrl().b[1][1]++;
      cov_29po44vkrl().s[4]++;
      return {
        ...state,
        isRetrievingReceipts: true
      };
    case CLEAR_RECEIPTS:
      cov_29po44vkrl().b[1][2]++;
      cov_29po44vkrl().s[5]++;
      return {
        ...state,
        receipts: []
      };
    case RECEIPTS_FAIL:
      cov_29po44vkrl().b[1][3]++;
      cov_29po44vkrl().s[6]++;
      return {
        ...state,
        receiptsMessage: action.payload,
        receiptsFetched: false,
        isRetrievingReceipts: false
      };
    default:
      cov_29po44vkrl().b[1][4]++;
      cov_29po44vkrl().s[7]++;
      return state;
  }
};
export default getReceiptsReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjlwbzQ0dmtybCIsImFjdHVhbENvdmVyYWdlIiwiR0VUVElOR19SRUNFSVBUUyIsIlJFQ0VJUFRTX1NVQ0NFU1MiLCJSRUNFSVBUU19GQUlMIiwiQ0xFQVJfUkVDRUlQVFMiLCJpbml0aWFsU3RhdGUiLCJzIiwicmVjZWlwdHMiLCJpc1JldHJpZXZpbmdSZWNlaXB0cyIsInJlY2VpcHRzRmV0Y2hlZCIsInJlY2VpcHRzTWVzc2FnZSIsImdldFJlY2VpcHRzUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicGF5bG9hZCJdLCJzb3VyY2VzIjpbImdldFJlY2VpcHRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEdFVFRJTkdfUkVDRUlQVFMsXG4gIFJFQ0VJUFRTX1NVQ0NFU1MsXG4gIFJFQ0VJUFRTX0ZBSUwsXG4gIENMRUFSX1JFQ0VJUFRTLFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHJlY2VpcHRzOiBbXSxcbiAgaXNSZXRyaWV2aW5nUmVjZWlwdHM6IGZhbHNlLFxuICByZWNlaXB0c0ZldGNoZWQ6IGZhbHNlLFxuICByZWNlaXB0c01lc3NhZ2U6IFwiUmVjZWlwdHMgTm90IEF2YWlsYWJsZVwiLFxufTtcblxuY29uc3QgZ2V0UmVjZWlwdHNSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgUkVDRUlQVFNfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICByZWNlaXB0czogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzUmV0cmlldmluZ1JlY2VpcHRzOiBmYWxzZSxcbiAgICAgICAgcmVjZWlwdHNGZXRjaGVkOiB0cnVlLFxuICAgICAgICByZWNlaXB0c01lc3NhZ2U6IFwiUmVjZWlwdHMgZmV0Y2hlZFwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgR0VUVElOR19SRUNFSVBUUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc1JldHJpZXZpbmdSZWNlaXB0czogdHJ1ZSxcbiAgICAgIH07XG4gICAgY2FzZSBDTEVBUl9SRUNFSVBUUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICByZWNlaXB0czogW10sXG4gICAgICB9O1xuXG4gICAgY2FzZSBSRUNFSVBUU19GQUlMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHJlY2VpcHRzTWVzc2FnZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIHJlY2VpcHRzRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgIGlzUmV0cmlldmluZ1JlY2VpcHRzOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0UmVjZWlwdHNSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUNFRSxnQkFBZ0IsRUFDaEJDLGdCQUFnQixFQUNoQkMsYUFBYSxFQUNiQyxjQUFjLFFBQ1Qsd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQU4sY0FBQSxHQUFBTyxDQUFBLE9BQUc7RUFDbkJDLFFBQVEsRUFBRSxFQUFFO0VBQ1pDLG9CQUFvQixFQUFFLEtBQUs7RUFDM0JDLGVBQWUsRUFBRSxLQUFLO0VBQ3RCQyxlQUFlLEVBQUU7QUFDbkIsQ0FBQztBQUFDWCxjQUFBLEdBQUFPLENBQUE7QUFFRixNQUFNSyxrQkFBa0IsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBYixjQUFBLEdBQUFjLENBQUEsVUFBR1IsWUFBWSxHQUFFUyxNQUFNLEtBQUs7RUFBQWYsY0FBQSxHQUFBZ0IsQ0FBQTtFQUFBaEIsY0FBQSxHQUFBTyxDQUFBO0VBQzNELFFBQVFRLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLZCxnQkFBZ0I7TUFBQUgsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUNuQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxRQUFRLEVBQUVPLE1BQU0sQ0FBQ0csT0FBTztRQUN4QlQsb0JBQW9CLEVBQUUsS0FBSztRQUMzQkMsZUFBZSxFQUFFLElBQUk7UUFDckJDLGVBQWUsRUFBRTtNQUNuQixDQUFDO0lBRUgsS0FBS1QsZ0JBQWdCO01BQUFGLGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDbkIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkosb0JBQW9CLEVBQUU7TUFDeEIsQ0FBQztJQUNILEtBQUtKLGNBQWM7TUFBQUwsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUNqQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxRQUFRLEVBQUU7TUFDWixDQUFDO0lBRUgsS0FBS0osYUFBYTtNQUFBSixjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ2hCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JGLGVBQWUsRUFBRUksTUFBTSxDQUFDRyxPQUFPO1FBQy9CUixlQUFlLEVBQUUsS0FBSztRQUN0QkQsb0JBQW9CLEVBQUU7TUFDeEIsQ0FBQztJQUVIO01BQUFULGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUNELGVBQWVELGtCQUFrQiJ9