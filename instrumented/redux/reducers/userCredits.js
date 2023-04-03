function cov_1vh7vcj2f8() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/userCredits.js";
  var hash = "1ab9db42e1a42e25c09777e90dccbce763c3e45f";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/userCredits.js",
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
          column: 27
        },
        end: {
          line: 43,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 42,
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
          line: 30,
          column: 8
        }
      },
      "5": {
        start: {
          line: 33,
          column: 6
        },
        end: {
          line: 38,
          column: 8
        }
      },
      "6": {
        start: {
          line: 41,
          column: 6
        },
        end: {
          line: 41,
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
            column: 27
          },
          end: {
            line: 14,
            column: 28
          }
        },
        loc: {
          start: {
            line: 14,
            column: 61
          },
          end: {
            line: 43,
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
            column: 28
          },
          end: {
            line: 14,
            column: 48
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 36
          },
          end: {
            line: 14,
            column: 48
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
            line: 42,
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
            line: 30,
            column: 8
          }
        }, {
          start: {
            line: 32,
            column: 4
          },
          end: {
            line: 38,
            column: 8
          }
        }, {
          start: {
            line: 40,
            column: 4
          },
          end: {
            line: 41,
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
    hash: "1ab9db42e1a42e25c09777e90dccbce763c3e45f"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1vh7vcj2f8 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1vh7vcj2f8();
import { GETTING_USER_CREDITS, GET_USER_CREDITS_FAIL, GET_USER_CREDITS_SUCCESS } from "../actions/actionTypes";
const initialState = (cov_1vh7vcj2f8().s[0]++, {
  credits: [],
  isFetchedCredits: false,
  isFetchingCredits: false,
  message: ""
});
cov_1vh7vcj2f8().s[1]++;
const userCreditsReducer = (state = (cov_1vh7vcj2f8().b[0][0]++, initialState), action) => {
  cov_1vh7vcj2f8().f[0]++;
  cov_1vh7vcj2f8().s[2]++;
  switch (action.type) {
    case GET_USER_CREDITS_SUCCESS:
      cov_1vh7vcj2f8().b[1][0]++;
      cov_1vh7vcj2f8().s[3]++;
      return {
        ...state,
        credits: action.payload,
        isFetchingCredits: false,
        isFetchedCredits: true,
        message: "User credits fetched"
      };
    case GETTING_USER_CREDITS:
      cov_1vh7vcj2f8().b[1][1]++;
      cov_1vh7vcj2f8().s[4]++;
      return {
        ...state,
        isFetchingCredits: true,
        isFetchedCredits: false
      };
    case GET_USER_CREDITS_FAIL:
      cov_1vh7vcj2f8().b[1][2]++;
      cov_1vh7vcj2f8().s[5]++;
      return {
        ...state,
        message: action.payload,
        isFetchingCredits: false,
        isFetchedCredits: false
      };
    default:
      cov_1vh7vcj2f8().b[1][3]++;
      cov_1vh7vcj2f8().s[6]++;
      return state;
  }
};
export default userCreditsReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMXZoN3ZjajJmOCIsImFjdHVhbENvdmVyYWdlIiwiR0VUVElOR19VU0VSX0NSRURJVFMiLCJHRVRfVVNFUl9DUkVESVRTX0ZBSUwiLCJHRVRfVVNFUl9DUkVESVRTX1NVQ0NFU1MiLCJpbml0aWFsU3RhdGUiLCJzIiwiY3JlZGl0cyIsImlzRmV0Y2hlZENyZWRpdHMiLCJpc0ZldGNoaW5nQ3JlZGl0cyIsIm1lc3NhZ2UiLCJ1c2VyQ3JlZGl0c1JlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJ1c2VyQ3JlZGl0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBHRVRUSU5HX1VTRVJfQ1JFRElUUyxcbiAgR0VUX1VTRVJfQ1JFRElUU19GQUlMLFxuICBHRVRfVVNFUl9DUkVESVRTX1NVQ0NFU1MsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgY3JlZGl0czogW10sXG4gIGlzRmV0Y2hlZENyZWRpdHM6IGZhbHNlLFxuICBpc0ZldGNoaW5nQ3JlZGl0czogZmFsc2UsXG4gIG1lc3NhZ2U6IFwiXCIsXG59O1xuXG5jb25zdCB1c2VyQ3JlZGl0c1JlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBHRVRfVVNFUl9DUkVESVRTX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY3JlZGl0czogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzRmV0Y2hpbmdDcmVkaXRzOiBmYWxzZSxcbiAgICAgICAgaXNGZXRjaGVkQ3JlZGl0czogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogXCJVc2VyIGNyZWRpdHMgZmV0Y2hlZFwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgR0VUVElOR19VU0VSX0NSRURJVFM6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNGZXRjaGluZ0NyZWRpdHM6IHRydWUsXG4gICAgICAgIGlzRmV0Y2hlZENyZWRpdHM6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGNhc2UgR0VUX1VTRVJfQ1JFRElUU19GQUlMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1lc3NhZ2U6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc0ZldGNoaW5nQ3JlZGl0czogZmFsc2UsXG4gICAgICAgIGlzRmV0Y2hlZENyZWRpdHM6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCB1c2VyQ3JlZGl0c1JlZHVjZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUNFRSxvQkFBb0IsRUFDcEJDLHFCQUFxQixFQUNyQkMsd0JBQXdCLFFBQ25CLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFMLGNBQUEsR0FBQU0sQ0FBQSxPQUFHO0VBQ25CQyxPQUFPLEVBQUUsRUFBRTtFQUNYQyxnQkFBZ0IsRUFBRSxLQUFLO0VBQ3ZCQyxpQkFBaUIsRUFBRSxLQUFLO0VBQ3hCQyxPQUFPLEVBQUU7QUFDWCxDQUFDO0FBQUNWLGNBQUEsR0FBQU0sQ0FBQTtBQUVGLE1BQU1LLGtCQUFrQixHQUFHQSxDQUFDQyxLQUFLLElBQUFaLGNBQUEsR0FBQWEsQ0FBQSxVQUFHUixZQUFZLEdBQUVTLE1BQU0sS0FBSztFQUFBZCxjQUFBLEdBQUFlLENBQUE7RUFBQWYsY0FBQSxHQUFBTSxDQUFBO0VBQzNELFFBQVFRLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLWix3QkFBd0I7TUFBQUosY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUMzQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxPQUFPLEVBQUVPLE1BQU0sQ0FBQ0csT0FBTztRQUN2QlIsaUJBQWlCLEVBQUUsS0FBSztRQUN4QkQsZ0JBQWdCLEVBQUUsSUFBSTtRQUN0QkUsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtSLG9CQUFvQjtNQUFBRixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQ3ZCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JILGlCQUFpQixFQUFFLElBQUk7UUFDdkJELGdCQUFnQixFQUFFO01BQ3BCLENBQUM7SUFFSCxLQUFLTCxxQkFBcUI7TUFBQUgsY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUN4QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSRixPQUFPLEVBQUVJLE1BQU0sQ0FBQ0csT0FBTztRQUN2QlIsaUJBQWlCLEVBQUUsS0FBSztRQUN4QkQsZ0JBQWdCLEVBQUU7TUFDcEIsQ0FBQztJQUVIO01BQUFSLGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUNELGVBQWVELGtCQUFrQiJ9