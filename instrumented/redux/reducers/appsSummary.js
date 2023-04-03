function cov_7d7oe62dc() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/appsSummary.js";
  var hash = "0176ed8e95714cc47c3140d45eaafbba5eed275e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/appsSummary.js",
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
    hash: "0176ed8e95714cc47c3140d45eaafbba5eed275e"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_7d7oe62dc = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_7d7oe62dc();
import { GETTING_APPS_SUMMARY, APPS_SUMMARY_SUCCESS, APPS_SUMMARY_FAIL } from "../actions/actionTypes";
const initialState = (cov_7d7oe62dc().s[0]++, {
  FetchedAppsSummary: false,
  isFetchingAppsSummary: false,
  message: "",
  errorCode: null
});
cov_7d7oe62dc().s[1]++;
const appsSummaryReducer = (state = (cov_7d7oe62dc().b[0][0]++, initialState), action) => {
  cov_7d7oe62dc().f[0]++;
  cov_7d7oe62dc().s[2]++;
  switch (action.type) {
    case APPS_SUMMARY_SUCCESS:
      cov_7d7oe62dc().b[1][0]++;
      {
        cov_7d7oe62dc().s[3]++;
        return {
          ...state,
          summary: action.payload,
          summaryIsFailed: false,
          FetchedAppsSummary: true,
          isFetchingAppsSummary: false,
          message: "Summary got!",
          errorCode: null
        };
      }
    case GETTING_APPS_SUMMARY:
      cov_7d7oe62dc().b[1][1]++;
      cov_7d7oe62dc().s[4]++;
      return {
        ...state,
        FetchedAppsSummary: false,
        isFetchingAppsSummary: true,
        errorCode: null,
        summaryIsFailed: false
      };
    case APPS_SUMMARY_FAIL:
      cov_7d7oe62dc().b[1][2]++;
      cov_7d7oe62dc().s[5]++;
      return {
        ...state,
        summaryIsFailed: true,
        FetchedAppsSummary: false,
        isFetchingAppsSummary: false,
        errorCode: action.payload?.errorCode,
        message: "Summary Failed"
      };
    default:
      cov_7d7oe62dc().b[1][3]++;
      cov_7d7oe62dc().s[6]++;
      return state;
  }
};
export default appsSummaryReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfN2Q3b2U2MmRjIiwiYWN0dWFsQ292ZXJhZ2UiLCJHRVRUSU5HX0FQUFNfU1VNTUFSWSIsIkFQUFNfU1VNTUFSWV9TVUNDRVNTIiwiQVBQU19TVU1NQVJZX0ZBSUwiLCJpbml0aWFsU3RhdGUiLCJzIiwiRmV0Y2hlZEFwcHNTdW1tYXJ5IiwiaXNGZXRjaGluZ0FwcHNTdW1tYXJ5IiwibWVzc2FnZSIsImVycm9yQ29kZSIsImFwcHNTdW1tYXJ5UmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwic3VtbWFyeSIsInBheWxvYWQiLCJzdW1tYXJ5SXNGYWlsZWQiXSwic291cmNlcyI6WyJhcHBzU3VtbWFyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBHRVRUSU5HX0FQUFNfU1VNTUFSWSxcbiAgQVBQU19TVU1NQVJZX1NVQ0NFU1MsXG4gIEFQUFNfU1VNTUFSWV9GQUlMLFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIEZldGNoZWRBcHBzU3VtbWFyeTogZmFsc2UsXG4gIGlzRmV0Y2hpbmdBcHBzU3VtbWFyeTogZmFsc2UsXG4gIG1lc3NhZ2U6IFwiXCIsXG4gIGVycm9yQ29kZTogbnVsbCxcbn07XG5cbmNvbnN0IGFwcHNTdW1tYXJ5UmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEFQUFNfU1VNTUFSWV9TVUNDRVNTOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgc3VtbWFyeTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIHN1bW1hcnlJc0ZhaWxlZDogZmFsc2UsXG4gICAgICAgIEZldGNoZWRBcHBzU3VtbWFyeTogdHJ1ZSxcbiAgICAgICAgaXNGZXRjaGluZ0FwcHNTdW1tYXJ5OiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJTdW1tYXJ5IGdvdCFcIixcbiAgICAgICAgZXJyb3JDb2RlOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSBHRVRUSU5HX0FQUFNfU1VNTUFSWTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBGZXRjaGVkQXBwc1N1bW1hcnk6IGZhbHNlLFxuICAgICAgICBpc0ZldGNoaW5nQXBwc1N1bW1hcnk6IHRydWUsXG4gICAgICAgIGVycm9yQ29kZTogbnVsbCxcbiAgICAgICAgc3VtbWFyeUlzRmFpbGVkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgY2FzZSBBUFBTX1NVTU1BUllfRkFJTDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBzdW1tYXJ5SXNGYWlsZWQ6IHRydWUsXG4gICAgICAgIEZldGNoZWRBcHBzU3VtbWFyeTogZmFsc2UsXG4gICAgICAgIGlzRmV0Y2hpbmdBcHBzU3VtbWFyeTogZmFsc2UsXG4gICAgICAgIGVycm9yQ29kZTogYWN0aW9uLnBheWxvYWQ/LmVycm9yQ29kZSxcbiAgICAgICAgbWVzc2FnZTogXCJTdW1tYXJ5IEZhaWxlZFwiLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFwcHNTdW1tYXJ5UmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsYUFBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsYUFBQTtBQWZaLFNBQ0VFLG9CQUFvQixFQUNwQkMsb0JBQW9CLEVBQ3BCQyxpQkFBaUIsUUFDWix3QkFBd0I7QUFFL0IsTUFBTUMsWUFBWSxJQUFBTCxhQUFBLEdBQUFNLENBQUEsT0FBRztFQUNuQkMsa0JBQWtCLEVBQUUsS0FBSztFQUN6QkMscUJBQXFCLEVBQUUsS0FBSztFQUM1QkMsT0FBTyxFQUFFLEVBQUU7RUFDWEMsU0FBUyxFQUFFO0FBQ2IsQ0FBQztBQUFDVixhQUFBLEdBQUFNLENBQUE7QUFFRixNQUFNSyxrQkFBa0IsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBWixhQUFBLEdBQUFhLENBQUEsVUFBR1IsWUFBWSxHQUFFUyxNQUFNLEtBQUs7RUFBQWQsYUFBQSxHQUFBZSxDQUFBO0VBQUFmLGFBQUEsR0FBQU0sQ0FBQTtFQUMzRCxRQUFRUSxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS2Isb0JBQW9CO01BQUFILGFBQUEsR0FBQWEsQ0FBQTtNQUFFO1FBQUFiLGFBQUEsR0FBQU0sQ0FBQTtRQUN6QixPQUFPO1VBQ0wsR0FBR00sS0FBSztVQUNSSyxPQUFPLEVBQUVILE1BQU0sQ0FBQ0ksT0FBTztVQUN2QkMsZUFBZSxFQUFFLEtBQUs7VUFDdEJaLGtCQUFrQixFQUFFLElBQUk7VUFDeEJDLHFCQUFxQixFQUFFLEtBQUs7VUFDNUJDLE9BQU8sRUFBRSxjQUFjO1VBQ3ZCQyxTQUFTLEVBQUU7UUFDYixDQUFDO01BQ0g7SUFDQSxLQUFLUixvQkFBb0I7TUFBQUYsYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUN2QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxrQkFBa0IsRUFBRSxLQUFLO1FBQ3pCQyxxQkFBcUIsRUFBRSxJQUFJO1FBQzNCRSxTQUFTLEVBQUUsSUFBSTtRQUNmUyxlQUFlLEVBQUU7TUFDbkIsQ0FBQztJQUNILEtBQUtmLGlCQUFpQjtNQUFBSixhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQ3BCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JPLGVBQWUsRUFBRSxJQUFJO1FBQ3JCWixrQkFBa0IsRUFBRSxLQUFLO1FBQ3pCQyxxQkFBcUIsRUFBRSxLQUFLO1FBQzVCRSxTQUFTLEVBQUVJLE1BQU0sQ0FBQ0ksT0FBTyxFQUFFUixTQUFTO1FBQ3BDRCxPQUFPLEVBQUU7TUFDWCxDQUFDO0lBRUg7TUFBQVQsYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUNFLE9BQU9NLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBRUQsZUFBZUQsa0JBQWtCIn0=