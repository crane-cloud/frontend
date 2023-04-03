function cov_1osgneejbg() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getInvoices.js";
  var hash = "01ad6ca36c896e5420939432bf3ee816d5b07ecc";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getInvoices.js",
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
    hash: "01ad6ca36c896e5420939432bf3ee816d5b07ecc"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1osgneejbg = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1osgneejbg();
import { GETTING_INVOICES, INVOICES_SUCCESS, INVOICES_FAIL, CLEAR_INVOICES } from "../actions/actionTypes";
const initialState = (cov_1osgneejbg().s[0]++, {
  invoices: [],
  isRetrievingInvoices: false,
  invoicesFetched: false,
  invoicesMessage: "Invoices Not Available"
});
cov_1osgneejbg().s[1]++;
const getInvoicesReducer = (state = (cov_1osgneejbg().b[0][0]++, initialState), action) => {
  cov_1osgneejbg().f[0]++;
  cov_1osgneejbg().s[2]++;
  switch (action.type) {
    case INVOICES_SUCCESS:
      cov_1osgneejbg().b[1][0]++;
      cov_1osgneejbg().s[3]++;
      return {
        ...state,
        invoices: action.payload,
        isRetrievingInvoices: false,
        invoicesFetched: true,
        invoicesMessage: "Invoices fetched"
      };
    case GETTING_INVOICES:
      cov_1osgneejbg().b[1][1]++;
      cov_1osgneejbg().s[4]++;
      return {
        ...state,
        isRetrievingInvoices: true
      };
    case CLEAR_INVOICES:
      cov_1osgneejbg().b[1][2]++;
      cov_1osgneejbg().s[5]++;
      return {
        ...state,
        invoices: []
      };
    case INVOICES_FAIL:
      cov_1osgneejbg().b[1][3]++;
      cov_1osgneejbg().s[6]++;
      return {
        ...state,
        invoicesMessage: action.payload,
        invoicesFetched: false,
        isRetrievingInvoices: false
      };
    default:
      cov_1osgneejbg().b[1][4]++;
      cov_1osgneejbg().s[7]++;
      return state;
  }
};
export default getInvoicesReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMW9zZ25lZWpiZyIsImFjdHVhbENvdmVyYWdlIiwiR0VUVElOR19JTlZPSUNFUyIsIklOVk9JQ0VTX1NVQ0NFU1MiLCJJTlZPSUNFU19GQUlMIiwiQ0xFQVJfSU5WT0lDRVMiLCJpbml0aWFsU3RhdGUiLCJzIiwiaW52b2ljZXMiLCJpc1JldHJpZXZpbmdJbnZvaWNlcyIsImludm9pY2VzRmV0Y2hlZCIsImludm9pY2VzTWVzc2FnZSIsImdldEludm9pY2VzUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicGF5bG9hZCJdLCJzb3VyY2VzIjpbImdldEludm9pY2VzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEdFVFRJTkdfSU5WT0lDRVMsXG4gIElOVk9JQ0VTX1NVQ0NFU1MsXG4gIElOVk9JQ0VTX0ZBSUwsXG4gIENMRUFSX0lOVk9JQ0VTLFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGludm9pY2VzOiBbXSxcbiAgaXNSZXRyaWV2aW5nSW52b2ljZXM6IGZhbHNlLFxuICBpbnZvaWNlc0ZldGNoZWQ6IGZhbHNlLFxuICBpbnZvaWNlc01lc3NhZ2U6IFwiSW52b2ljZXMgTm90IEF2YWlsYWJsZVwiLFxufTtcblxuY29uc3QgZ2V0SW52b2ljZXNSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgSU5WT0lDRVNfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpbnZvaWNlczogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzUmV0cmlldmluZ0ludm9pY2VzOiBmYWxzZSxcbiAgICAgICAgaW52b2ljZXNGZXRjaGVkOiB0cnVlLFxuICAgICAgICBpbnZvaWNlc01lc3NhZ2U6IFwiSW52b2ljZXMgZmV0Y2hlZFwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgR0VUVElOR19JTlZPSUNFUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc1JldHJpZXZpbmdJbnZvaWNlczogdHJ1ZSxcbiAgICAgIH07XG4gICAgY2FzZSBDTEVBUl9JTlZPSUNFUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpbnZvaWNlczogW10sXG4gICAgICB9O1xuXG4gICAgY2FzZSBJTlZPSUNFU19GQUlMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGludm9pY2VzTWVzc2FnZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGludm9pY2VzRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgIGlzUmV0cmlldmluZ0ludm9pY2VzOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0SW52b2ljZXNSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUNFRSxnQkFBZ0IsRUFDaEJDLGdCQUFnQixFQUNoQkMsYUFBYSxFQUNiQyxjQUFjLFFBQ1Qsd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQU4sY0FBQSxHQUFBTyxDQUFBLE9BQUc7RUFDbkJDLFFBQVEsRUFBRSxFQUFFO0VBQ1pDLG9CQUFvQixFQUFFLEtBQUs7RUFDM0JDLGVBQWUsRUFBRSxLQUFLO0VBQ3RCQyxlQUFlLEVBQUU7QUFDbkIsQ0FBQztBQUFDWCxjQUFBLEdBQUFPLENBQUE7QUFFRixNQUFNSyxrQkFBa0IsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBYixjQUFBLEdBQUFjLENBQUEsVUFBR1IsWUFBWSxHQUFFUyxNQUFNLEtBQUs7RUFBQWYsY0FBQSxHQUFBZ0IsQ0FBQTtFQUFBaEIsY0FBQSxHQUFBTyxDQUFBO0VBQzNELFFBQVFRLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLZCxnQkFBZ0I7TUFBQUgsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUNuQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxRQUFRLEVBQUVPLE1BQU0sQ0FBQ0csT0FBTztRQUN4QlQsb0JBQW9CLEVBQUUsS0FBSztRQUMzQkMsZUFBZSxFQUFFLElBQUk7UUFDckJDLGVBQWUsRUFBRTtNQUNuQixDQUFDO0lBRUgsS0FBS1QsZ0JBQWdCO01BQUFGLGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDbkIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkosb0JBQW9CLEVBQUU7TUFDeEIsQ0FBQztJQUNILEtBQUtKLGNBQWM7TUFBQUwsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUNqQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxRQUFRLEVBQUU7TUFDWixDQUFDO0lBRUgsS0FBS0osYUFBYTtNQUFBSixjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ2hCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JGLGVBQWUsRUFBRUksTUFBTSxDQUFDRyxPQUFPO1FBQy9CUixlQUFlLEVBQUUsS0FBSztRQUN0QkQsb0JBQW9CLEVBQUU7TUFDeEIsQ0FBQztJQUVIO01BQUFULGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUNELGVBQWVELGtCQUFrQiJ9