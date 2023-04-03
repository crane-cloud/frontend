function cov_25s0m1vkxw() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/usersSummary.js";
  var hash = "12ce56910aa5dda2f964cfd568a2bb63889d591e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/usersSummary.js",
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
          column: 28
        },
        end: {
          line: 48,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 47,
          column: 3
        }
      },
      "3": {
        start: {
          line: 17,
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
          line: 34,
          column: 8
        }
      },
      "5": {
        start: {
          line: 36,
          column: 6
        },
        end: {
          line: 43,
          column: 8
        }
      },
      "6": {
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
            line: 14,
            column: 28
          },
          end: {
            line: 14,
            column: 29
          }
        },
        loc: {
          start: {
            line: 14,
            column: 62
          },
          end: {
            line: 48,
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
            column: 29
          },
          end: {
            line: 14,
            column: 49
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 37
          },
          end: {
            line: 14,
            column: 49
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
            line: 47,
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
            line: 26,
            column: 5
          }
        }, {
          start: {
            line: 27,
            column: 4
          },
          end: {
            line: 34,
            column: 8
          }
        }, {
          start: {
            line: 35,
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
    hash: "12ce56910aa5dda2f964cfd568a2bb63889d591e"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_25s0m1vkxw = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_25s0m1vkxw();
import { GETTING_USERS_SUMMARY, USERS_SUMMARY_SUCCESS, USERS_SUMMARY_FAIL } from "../actions/actionTypes";
const initialState = (cov_25s0m1vkxw().s[0]++, {
  FetchedUsersSummary: false,
  isFetchingUsersSummary: false,
  message: "",
  errorCode: null
});
cov_25s0m1vkxw().s[1]++;
const usersSummaryReducer = (state = (cov_25s0m1vkxw().b[0][0]++, initialState), action) => {
  cov_25s0m1vkxw().f[0]++;
  cov_25s0m1vkxw().s[2]++;
  switch (action.type) {
    case USERS_SUMMARY_SUCCESS:
      cov_25s0m1vkxw().b[1][0]++;
      {
        cov_25s0m1vkxw().s[3]++;
        return {
          ...state,
          usersSummary: action.payload,
          summaryIsFailed: false,
          FetchedUsersSummary: true,
          isFetchingUsersSummary: false,
          message: "Summary got!",
          errorCode: null
        };
      }
    case GETTING_USERS_SUMMARY:
      cov_25s0m1vkxw().b[1][1]++;
      cov_25s0m1vkxw().s[4]++;
      return {
        ...state,
        FetchedUsersSummary: false,
        isFetchingUsersSummary: true,
        errorCode: null,
        summaryIsFailed: false
      };
    case USERS_SUMMARY_FAIL:
      cov_25s0m1vkxw().b[1][2]++;
      cov_25s0m1vkxw().s[5]++;
      return {
        ...state,
        summaryIsFailed: true,
        FetchedUsersSummary: false,
        isFetchingUsersSummary: false,
        errorCode: action.payload?.errorCode,
        message: "Summary Failed"
      };
    default:
      cov_25s0m1vkxw().b[1][3]++;
      cov_25s0m1vkxw().s[6]++;
      return state;
  }
};
export default usersSummaryReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjVzMG0xdmt4dyIsImFjdHVhbENvdmVyYWdlIiwiR0VUVElOR19VU0VSU19TVU1NQVJZIiwiVVNFUlNfU1VNTUFSWV9TVUNDRVNTIiwiVVNFUlNfU1VNTUFSWV9GQUlMIiwiaW5pdGlhbFN0YXRlIiwicyIsIkZldGNoZWRVc2Vyc1N1bW1hcnkiLCJpc0ZldGNoaW5nVXNlcnNTdW1tYXJ5IiwibWVzc2FnZSIsImVycm9yQ29kZSIsInVzZXJzU3VtbWFyeVJlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInVzZXJzU3VtbWFyeSIsInBheWxvYWQiLCJzdW1tYXJ5SXNGYWlsZWQiXSwic291cmNlcyI6WyJ1c2Vyc1N1bW1hcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgR0VUVElOR19VU0VSU19TVU1NQVJZLFxuICBVU0VSU19TVU1NQVJZX1NVQ0NFU1MsXG4gIFVTRVJTX1NVTU1BUllfRkFJTCxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBGZXRjaGVkVXNlcnNTdW1tYXJ5OiBmYWxzZSxcbiAgaXNGZXRjaGluZ1VzZXJzU3VtbWFyeTogZmFsc2UsXG4gIG1lc3NhZ2U6IFwiXCIsXG4gIGVycm9yQ29kZTogbnVsbCxcbn07XG5cbmNvbnN0IHVzZXJzU3VtbWFyeVJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBVU0VSU19TVU1NQVJZX1NVQ0NFU1M6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB1c2Vyc1N1bW1hcnk6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBzdW1tYXJ5SXNGYWlsZWQ6IGZhbHNlLFxuICAgICAgICBGZXRjaGVkVXNlcnNTdW1tYXJ5OiB0cnVlLFxuICAgICAgICBpc0ZldGNoaW5nVXNlcnNTdW1tYXJ5OiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJTdW1tYXJ5IGdvdCFcIixcbiAgICAgICAgZXJyb3JDb2RlOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSBHRVRUSU5HX1VTRVJTX1NVTU1BUlk6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgRmV0Y2hlZFVzZXJzU3VtbWFyeTogZmFsc2UsXG4gICAgICAgIGlzRmV0Y2hpbmdVc2Vyc1N1bW1hcnk6IHRydWUsXG4gICAgICAgIGVycm9yQ29kZTogbnVsbCxcbiAgICAgICAgc3VtbWFyeUlzRmFpbGVkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgY2FzZSBVU0VSU19TVU1NQVJZX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgc3VtbWFyeUlzRmFpbGVkOiB0cnVlLFxuICAgICAgICBGZXRjaGVkVXNlcnNTdW1tYXJ5OiBmYWxzZSxcbiAgICAgICAgaXNGZXRjaGluZ1VzZXJzU3VtbWFyeTogZmFsc2UsXG4gICAgICAgIGVycm9yQ29kZTogYWN0aW9uLnBheWxvYWQ/LmVycm9yQ29kZSxcbiAgICAgICAgbWVzc2FnZTogXCJTdW1tYXJ5IEZhaWxlZFwiLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZXJzU3VtbWFyeVJlZHVjZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUNFRSxxQkFBcUIsRUFDckJDLHFCQUFxQixFQUNyQkMsa0JBQWtCLFFBQ2Isd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQUwsY0FBQSxHQUFBTSxDQUFBLE9BQUc7RUFDbkJDLG1CQUFtQixFQUFFLEtBQUs7RUFDMUJDLHNCQUFzQixFQUFFLEtBQUs7RUFDN0JDLE9BQU8sRUFBRSxFQUFFO0VBQ1hDLFNBQVMsRUFBRTtBQUNiLENBQUM7QUFBQ1YsY0FBQSxHQUFBTSxDQUFBO0FBRUYsTUFBTUssbUJBQW1CLEdBQUdBLENBQUNDLEtBQUssSUFBQVosY0FBQSxHQUFBYSxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFkLGNBQUEsR0FBQWUsQ0FBQTtFQUFBZixjQUFBLEdBQUFNLENBQUE7RUFDNUQsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtiLHFCQUFxQjtNQUFBSCxjQUFBLEdBQUFhLENBQUE7TUFBRTtRQUFBYixjQUFBLEdBQUFNLENBQUE7UUFDMUIsT0FBTztVQUNMLEdBQUdNLEtBQUs7VUFDUkssWUFBWSxFQUFFSCxNQUFNLENBQUNJLE9BQU87VUFDNUJDLGVBQWUsRUFBRSxLQUFLO1VBQ3RCWixtQkFBbUIsRUFBRSxJQUFJO1VBQ3pCQyxzQkFBc0IsRUFBRSxLQUFLO1VBQzdCQyxPQUFPLEVBQUUsY0FBYztVQUN2QkMsU0FBUyxFQUFFO1FBQ2IsQ0FBQztNQUNIO0lBQ0EsS0FBS1IscUJBQXFCO01BQUFGLGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDeEIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsbUJBQW1CLEVBQUUsS0FBSztRQUMxQkMsc0JBQXNCLEVBQUUsSUFBSTtRQUM1QkUsU0FBUyxFQUFFLElBQUk7UUFDZlMsZUFBZSxFQUFFO01BQ25CLENBQUM7SUFDSCxLQUFLZixrQkFBa0I7TUFBQUosY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUNyQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTyxlQUFlLEVBQUUsSUFBSTtRQUNyQlosbUJBQW1CLEVBQUUsS0FBSztRQUMxQkMsc0JBQXNCLEVBQUUsS0FBSztRQUM3QkUsU0FBUyxFQUFFSSxNQUFNLENBQUNJLE9BQU8sRUFBRVIsU0FBUztRQUNwQ0QsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVIO01BQUFULGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUVELGVBQWVELG1CQUFtQiJ9