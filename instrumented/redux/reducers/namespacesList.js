function cov_24sa30kctq() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/namespacesList.js";
  var hash = "0e163fe2ea7909bf53a5e503e05c0837e394da7e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/namespacesList.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 21
        },
        end: {
          line: 12,
          column: 1
        }
      },
      "1": {
        start: {
          line: 14,
          column: 30
        },
        end: {
          line: 41,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 40,
          column: 3
        }
      },
      "3": {
        start: {
          line: 17,
          column: 6
        },
        end: {
          line: 23,
          column: 8
        }
      },
      "4": {
        start: {
          line: 26,
          column: 6
        },
        end: {
          line: 29,
          column: 8
        }
      },
      "5": {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 37,
          column: 8
        }
      },
      "6": {
        start: {
          line: 39,
          column: 6
        },
        end: {
          line: 39,
          column: 19
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 14,
            column: 30
          },
          end: {
            line: 14,
            column: 31
          }
        },
        loc: {
          start: {
            line: 14,
            column: 64
          },
          end: {
            line: 41,
            column: 1
          }
        },
        line: 14
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 14,
            column: 31
          },
          end: {
            line: 14,
            column: 51
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 39
          },
          end: {
            line: 14,
            column: 51
          }
        }],
        line: 14
      },
      "1": {
        loc: {
          start: {
            line: 15,
            column: 2
          },
          end: {
            line: 40,
            column: 3
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 16,
            column: 4
          },
          end: {
            line: 23,
            column: 8
          }
        }, {
          start: {
            line: 25,
            column: 4
          },
          end: {
            line: 29,
            column: 8
          }
        }, {
          start: {
            line: 31,
            column: 4
          },
          end: {
            line: 37,
            column: 8
          }
        }, {
          start: {
            line: 38,
            column: 4
          },
          end: {
            line: 39,
            column: 19
          }
        }],
        line: 15
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0],
      "1": [0, 0, 0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "0e163fe2ea7909bf53a5e503e05c0837e394da7e"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_24sa30kctq = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_24sa30kctq();
import { IS_FETCHING, FETCH_NAMESPACES_SUCCESS, FETCH_NAMESPACES_FAILED } from "../actions/actionTypes";
const initialState = (cov_24sa30kctq().s[0]++, {
  namespacesList: [],
  isRetrieving: false,
  isRetrieved: false,
  message: "No Namespaces Available"
});
cov_24sa30kctq().s[1]++;
const namespacesListReducer = (state = (cov_24sa30kctq().b[0][0]++, initialState), action) => {
  cov_24sa30kctq().f[0]++;
  cov_24sa30kctq().s[2]++;
  switch (action.type) {
    case FETCH_NAMESPACES_SUCCESS:
      cov_24sa30kctq().b[1][0]++;
      cov_24sa30kctq().s[3]++;
      return {
        ...state,
        namespacesList: action.payload,
        isRetrieving: false,
        isRetrieved: true,
        message: "All Namespaces in this Cluster fetched"
      };
    case IS_FETCHING:
      cov_24sa30kctq().b[1][1]++;
      cov_24sa30kctq().s[4]++;
      return {
        ...state,
        isRetrieving: true
      };
    case FETCH_NAMESPACES_FAILED:
      cov_24sa30kctq().b[1][2]++;
      cov_24sa30kctq().s[5]++;
      return {
        ...state,
        message: action.payload,
        isRetrieved: true,
        isRetrieving: false
      };
    default:
      cov_24sa30kctq().b[1][3]++;
      cov_24sa30kctq().s[6]++;
      return state;
  }
};
export default namespacesListReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjRzYTMwa2N0cSIsImFjdHVhbENvdmVyYWdlIiwiSVNfRkVUQ0hJTkciLCJGRVRDSF9OQU1FU1BBQ0VTX1NVQ0NFU1MiLCJGRVRDSF9OQU1FU1BBQ0VTX0ZBSUxFRCIsImluaXRpYWxTdGF0ZSIsInMiLCJuYW1lc3BhY2VzTGlzdCIsImlzUmV0cmlldmluZyIsImlzUmV0cmlldmVkIiwibWVzc2FnZSIsIm5hbWVzcGFjZXNMaXN0UmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicGF5bG9hZCJdLCJzb3VyY2VzIjpbIm5hbWVzcGFjZXNMaXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElTX0ZFVENISU5HLFxuICBGRVRDSF9OQU1FU1BBQ0VTX1NVQ0NFU1MsXG4gIEZFVENIX05BTUVTUEFDRVNfRkFJTEVELFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIG5hbWVzcGFjZXNMaXN0OiBbXSxcbiAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgaXNSZXRyaWV2ZWQ6IGZhbHNlLFxuICBtZXNzYWdlOiBcIk5vIE5hbWVzcGFjZXMgQXZhaWxhYmxlXCIsXG59O1xuXG5jb25zdCBuYW1lc3BhY2VzTGlzdFJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBGRVRDSF9OQU1FU1BBQ0VTX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbmFtZXNwYWNlc0xpc3Q6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICAgICAgICBpc1JldHJpZXZlZDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogXCJBbGwgTmFtZXNwYWNlcyBpbiB0aGlzIENsdXN0ZXIgZmV0Y2hlZFwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgSVNfRkVUQ0hJTkc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiB0cnVlLFxuICAgICAgfTtcblxuICAgIGNhc2UgRkVUQ0hfTkFNRVNQQUNFU19GQUlMRUQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVzc2FnZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzUmV0cmlldmVkOiB0cnVlLFxuICAgICAgICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBuYW1lc3BhY2VzTGlzdFJlZHVjZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUNFRSxXQUFXLEVBQ1hDLHdCQUF3QixFQUN4QkMsdUJBQXVCLFFBQ2xCLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFMLGNBQUEsR0FBQU0sQ0FBQSxPQUFHO0VBQ25CQyxjQUFjLEVBQUUsRUFBRTtFQUNsQkMsWUFBWSxFQUFFLEtBQUs7RUFDbkJDLFdBQVcsRUFBRSxLQUFLO0VBQ2xCQyxPQUFPLEVBQUU7QUFDWCxDQUFDO0FBQUNWLGNBQUEsR0FBQU0sQ0FBQTtBQUVGLE1BQU1LLHFCQUFxQixHQUFHQSxDQUFDQyxLQUFLLElBQUFaLGNBQUEsR0FBQWEsQ0FBQSxVQUFHUixZQUFZLEdBQUVTLE1BQU0sS0FBSztFQUFBZCxjQUFBLEdBQUFlLENBQUE7RUFBQWYsY0FBQSxHQUFBTSxDQUFBO0VBQzlELFFBQVFRLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLYix3QkFBd0I7TUFBQUgsY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUMzQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxjQUFjLEVBQUVPLE1BQU0sQ0FBQ0csT0FBTztRQUM5QlQsWUFBWSxFQUFFLEtBQUs7UUFDbkJDLFdBQVcsRUFBRSxJQUFJO1FBQ2pCQyxPQUFPLEVBQUU7TUFDWCxDQUFDO0lBRUgsS0FBS1IsV0FBVztNQUFBRixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQ2QsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkosWUFBWSxFQUFFO01BQ2hCLENBQUM7SUFFSCxLQUFLSix1QkFBdUI7TUFBQUosY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUMxQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSRixPQUFPLEVBQUVJLE1BQU0sQ0FBQ0csT0FBTztRQUN2QlIsV0FBVyxFQUFFLElBQUk7UUFDakJELFlBQVksRUFBRTtNQUNoQixDQUFDO0lBQ0g7TUFBQVIsY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUNFLE9BQU9NLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBRUQsZUFBZUQscUJBQXFCIn0=