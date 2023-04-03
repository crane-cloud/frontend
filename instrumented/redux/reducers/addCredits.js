function cov_2nuzcdd6in() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/addCredits.js";
  var hash = "4ee1dd608c3ce02160491899757523f450e5ae58";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/addCredits.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 21
        },
        end: {
          line: 14,
          column: 1
        }
      },
      "1": {
        start: {
          line: 16,
          column: 30
        },
        end: {
          line: 57,
          column: 1
        }
      },
      "2": {
        start: {
          line: 17,
          column: 2
        },
        end: {
          line: 56,
          column: 3
        }
      },
      "3": {
        start: {
          line: 19,
          column: 6
        },
        end: {
          line: 25,
          column: 8
        }
      },
      "4": {
        start: {
          line: 28,
          column: 6
        },
        end: {
          line: 32,
          column: 8
        }
      },
      "5": {
        start: {
          line: 35,
          column: 6
        },
        end: {
          line: 42,
          column: 8
        }
      },
      "6": {
        start: {
          line: 45,
          column: 6
        },
        end: {
          line: 52,
          column: 8
        }
      },
      "7": {
        start: {
          line: 55,
          column: 6
        },
        end: {
          line: 55,
          column: 19
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 16,
            column: 30
          },
          end: {
            line: 16,
            column: 31
          }
        },
        loc: {
          start: {
            line: 16,
            column: 64
          },
          end: {
            line: 57,
            column: 1
          }
        },
        line: 16
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 16,
            column: 31
          },
          end: {
            line: 16,
            column: 51
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 16,
            column: 39
          },
          end: {
            line: 16,
            column: 51
          }
        }],
        line: 16
      },
      "1": {
        loc: {
          start: {
            line: 17,
            column: 2
          },
          end: {
            line: 56,
            column: 3
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 18,
            column: 4
          },
          end: {
            line: 25,
            column: 8
          }
        }, {
          start: {
            line: 27,
            column: 4
          },
          end: {
            line: 32,
            column: 8
          }
        }, {
          start: {
            line: 34,
            column: 4
          },
          end: {
            line: 42,
            column: 8
          }
        }, {
          start: {
            line: 44,
            column: 4
          },
          end: {
            line: 52,
            column: 8
          }
        }, {
          start: {
            line: 54,
            column: 4
          },
          end: {
            line: 55,
            column: 19
          }
        }],
        line: 17
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
    hash: "4ee1dd608c3ce02160491899757523f450e5ae58"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2nuzcdd6in = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2nuzcdd6in();
import { ADDING_USER_CREDITS, ADD_BETA_USER_CREDITS_SUCCESS, ADD_BETA_USER_CREDITS_FAIL, CLEAR_ADD_BETA_USER_CREDITS_STATE } from "../actions/actionTypes";
const initialState = (cov_2nuzcdd6in().s[0]++, {
  Added: false,
  Failed: false,
  Adding: false,
  error: null,
  message: ""
});
cov_2nuzcdd6in().s[1]++;
const addUserCreditsReducer = (state = (cov_2nuzcdd6in().b[0][0]++, initialState), action) => {
  cov_2nuzcdd6in().f[0]++;
  cov_2nuzcdd6in().s[2]++;
  switch (action.type) {
    case ADD_BETA_USER_CREDITS_SUCCESS:
      cov_2nuzcdd6in().b[1][0]++;
      cov_2nuzcdd6in().s[3]++;
      return {
        ...state,
        Adding: false,
        Failed: false,
        Added: true,
        message: "User credits added Successfully"
      };
    case ADDING_USER_CREDITS:
      cov_2nuzcdd6in().b[1][1]++;
      cov_2nuzcdd6in().s[4]++;
      return {
        ...state,
        Adding: true,
        Added: false
      };
    case ADD_BETA_USER_CREDITS_FAIL:
      cov_2nuzcdd6in().b[1][2]++;
      cov_2nuzcdd6in().s[5]++;
      return {
        ...state,
        Failed: true,
        Added: false,
        Adding: false,
        error: action.payload?.error,
        message: "Failed to add user credits"
      };
    case CLEAR_ADD_BETA_USER_CREDITS_STATE:
      cov_2nuzcdd6in().b[1][3]++;
      cov_2nuzcdd6in().s[6]++;
      return {
        ...state,
        Added: false,
        Failed: false,
        Adding: false,
        error: null,
        message: ""
      };
    default:
      cov_2nuzcdd6in().b[1][4]++;
      cov_2nuzcdd6in().s[7]++;
      return state;
  }
};
export default addUserCreditsReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMm51emNkZDZpbiIsImFjdHVhbENvdmVyYWdlIiwiQURESU5HX1VTRVJfQ1JFRElUUyIsIkFERF9CRVRBX1VTRVJfQ1JFRElUU19TVUNDRVNTIiwiQUREX0JFVEFfVVNFUl9DUkVESVRTX0ZBSUwiLCJDTEVBUl9BRERfQkVUQV9VU0VSX0NSRURJVFNfU1RBVEUiLCJpbml0aWFsU3RhdGUiLCJzIiwiQWRkZWQiLCJGYWlsZWQiLCJBZGRpbmciLCJlcnJvciIsIm1lc3NhZ2UiLCJhZGRVc2VyQ3JlZGl0c1JlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJhZGRDcmVkaXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFERElOR19VU0VSX0NSRURJVFMsXG4gIEFERF9CRVRBX1VTRVJfQ1JFRElUU19TVUNDRVNTLFxuICBBRERfQkVUQV9VU0VSX0NSRURJVFNfRkFJTCxcbiAgQ0xFQVJfQUREX0JFVEFfVVNFUl9DUkVESVRTX1NUQVRFLFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIEFkZGVkOiBmYWxzZSxcbiAgRmFpbGVkOiBmYWxzZSxcbiAgQWRkaW5nOiBmYWxzZSxcbiAgZXJyb3I6IG51bGwsXG4gIG1lc3NhZ2U6IFwiXCIsXG59O1xuXG5jb25zdCBhZGRVc2VyQ3JlZGl0c1JlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBRERfQkVUQV9VU0VSX0NSRURJVFNfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBBZGRpbmc6IGZhbHNlLFxuICAgICAgICBGYWlsZWQ6IGZhbHNlLFxuICAgICAgICBBZGRlZDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogXCJVc2VyIGNyZWRpdHMgYWRkZWQgU3VjY2Vzc2Z1bGx5XCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBBRERJTkdfVVNFUl9DUkVESVRTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIEFkZGluZzogdHJ1ZSxcbiAgICAgICAgQWRkZWQ6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGNhc2UgQUREX0JFVEFfVVNFUl9DUkVESVRTX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgRmFpbGVkOiB0cnVlLFxuICAgICAgICBBZGRlZDogZmFsc2UsXG4gICAgICAgIEFkZGluZzogZmFsc2UsXG4gICAgICAgIGVycm9yOiBhY3Rpb24ucGF5bG9hZD8uZXJyb3IsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGFkZCB1c2VyIGNyZWRpdHNcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIENMRUFSX0FERF9CRVRBX1VTRVJfQ1JFRElUU19TVEFURTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBBZGRlZDogZmFsc2UsXG4gICAgICAgIEZhaWxlZDogZmFsc2UsXG4gICAgICAgIEFkZGluZzogZmFsc2UsXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFkZFVzZXJDcmVkaXRzUmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FDRUUsbUJBQW1CLEVBQ25CQyw2QkFBNkIsRUFDN0JDLDBCQUEwQixFQUMxQkMsaUNBQWlDLFFBQzVCLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFOLGNBQUEsR0FBQU8sQ0FBQSxPQUFHO0VBQ25CQyxLQUFLLEVBQUUsS0FBSztFQUNaQyxNQUFNLEVBQUUsS0FBSztFQUNiQyxNQUFNLEVBQUUsS0FBSztFQUNiQyxLQUFLLEVBQUUsSUFBSTtFQUNYQyxPQUFPLEVBQUU7QUFDWCxDQUFDO0FBQUNaLGNBQUEsR0FBQU8sQ0FBQTtBQUVGLE1BQU1NLHFCQUFxQixHQUFHQSxDQUFDQyxLQUFLLElBQUFkLGNBQUEsR0FBQWUsQ0FBQSxVQUFHVCxZQUFZLEdBQUVVLE1BQU0sS0FBSztFQUFBaEIsY0FBQSxHQUFBaUIsQ0FBQTtFQUFBakIsY0FBQSxHQUFBTyxDQUFBO0VBQzlELFFBQVFTLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLZiw2QkFBNkI7TUFBQUgsY0FBQSxHQUFBZSxDQUFBO01BQUFmLGNBQUEsR0FBQU8sQ0FBQTtNQUNoQyxPQUFPO1FBQ0wsR0FBR08sS0FBSztRQUNSSixNQUFNLEVBQUUsS0FBSztRQUNiRCxNQUFNLEVBQUUsS0FBSztRQUNiRCxLQUFLLEVBQUUsSUFBSTtRQUNYSSxPQUFPLEVBQUU7TUFDWCxDQUFDO0lBRUgsS0FBS1YsbUJBQW1CO01BQUFGLGNBQUEsR0FBQWUsQ0FBQTtNQUFBZixjQUFBLEdBQUFPLENBQUE7TUFDdEIsT0FBTztRQUNMLEdBQUdPLEtBQUs7UUFDUkosTUFBTSxFQUFFLElBQUk7UUFDWkYsS0FBSyxFQUFFO01BQ1QsQ0FBQztJQUVILEtBQUtKLDBCQUEwQjtNQUFBSixjQUFBLEdBQUFlLENBQUE7TUFBQWYsY0FBQSxHQUFBTyxDQUFBO01BQzdCLE9BQU87UUFDTCxHQUFHTyxLQUFLO1FBQ1JMLE1BQU0sRUFBRSxJQUFJO1FBQ1pELEtBQUssRUFBRSxLQUFLO1FBQ1pFLE1BQU0sRUFBRSxLQUFLO1FBQ2JDLEtBQUssRUFBRUssTUFBTSxDQUFDRyxPQUFPLEVBQUVSLEtBQUs7UUFDNUJDLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSCxLQUFLUCxpQ0FBaUM7TUFBQUwsY0FBQSxHQUFBZSxDQUFBO01BQUFmLGNBQUEsR0FBQU8sQ0FBQTtNQUNwQyxPQUFPO1FBQ0wsR0FBR08sS0FBSztRQUNSTixLQUFLLEVBQUUsS0FBSztRQUNaQyxNQUFNLEVBQUUsS0FBSztRQUNiQyxNQUFNLEVBQUUsS0FBSztRQUNiQyxLQUFLLEVBQUUsSUFBSTtRQUNYQyxPQUFPLEVBQUU7TUFDWCxDQUFDO0lBRUg7TUFBQVosY0FBQSxHQUFBZSxDQUFBO01BQUFmLGNBQUEsR0FBQU8sQ0FBQTtNQUNFLE9BQU9PLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBRUQsZUFBZUQscUJBQXFCIn0=