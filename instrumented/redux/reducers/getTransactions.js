function cov_1ogfcwpfwz() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getTransactions.js";
  var hash = "b3cafe799f5c60a1d00c09e89cdb55b2ff35bfa9";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getTransactions.js",
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
          column: 31
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
          column: 8
        },
        end: {
          line: 35,
          column: 6
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
            column: 31
          },
          end: {
            line: 15,
            column: 32
          }
        },
        loc: {
          start: {
            line: 15,
            column: 65
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
            column: 32
          },
          end: {
            line: 15,
            column: 52
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 15,
            column: 40
          },
          end: {
            line: 15,
            column: 52
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
            column: 6
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
    hash: "b3cafe799f5c60a1d00c09e89cdb55b2ff35bfa9"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1ogfcwpfwz = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1ogfcwpfwz();
import { GETTING_TRANSACTIONS, TRANSACTIONS_FAIL, TRANSACTIONS_SUCCESS, CLEAR_TRANSACTIONS } from "../actions/actionTypes";
const initialState = (cov_1ogfcwpfwz().s[0]++, {
  transactions: [],
  isRetrieving: false,
  isFetched: false,
  message: "Transactions Not Available"
});
cov_1ogfcwpfwz().s[1]++;
const getTransactionsReducer = (state = (cov_1ogfcwpfwz().b[0][0]++, initialState), action) => {
  cov_1ogfcwpfwz().f[0]++;
  cov_1ogfcwpfwz().s[2]++;
  switch (action.type) {
    case TRANSACTIONS_SUCCESS:
      cov_1ogfcwpfwz().b[1][0]++;
      cov_1ogfcwpfwz().s[3]++;
      return {
        ...state,
        transactions: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "Transactions fetched"
      };
    case GETTING_TRANSACTIONS:
      cov_1ogfcwpfwz().b[1][1]++;
      cov_1ogfcwpfwz().s[4]++;
      return {
        ...state,
        isRetrieving: true
      };
    case CLEAR_TRANSACTIONS:
      cov_1ogfcwpfwz().b[1][2]++;
      cov_1ogfcwpfwz().s[5]++;
      return {
        ...state,
        transactions: []
      };
    case TRANSACTIONS_FAIL:
      cov_1ogfcwpfwz().b[1][3]++;
      cov_1ogfcwpfwz().s[6]++;
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isRetrieving: false
      };
    default:
      cov_1ogfcwpfwz().b[1][4]++;
      cov_1ogfcwpfwz().s[7]++;
      return state;
  }
};
export default getTransactionsReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMW9nZmN3cGZ3eiIsImFjdHVhbENvdmVyYWdlIiwiR0VUVElOR19UUkFOU0FDVElPTlMiLCJUUkFOU0FDVElPTlNfRkFJTCIsIlRSQU5TQUNUSU9OU19TVUNDRVNTIiwiQ0xFQVJfVFJBTlNBQ1RJT05TIiwiaW5pdGlhbFN0YXRlIiwicyIsInRyYW5zYWN0aW9ucyIsImlzUmV0cmlldmluZyIsImlzRmV0Y2hlZCIsIm1lc3NhZ2UiLCJnZXRUcmFuc2FjdGlvbnNSZWR1Y2VyIiwic3RhdGUiLCJiIiwiYWN0aW9uIiwiZiIsInR5cGUiLCJwYXlsb2FkIl0sInNvdXJjZXMiOlsiZ2V0VHJhbnNhY3Rpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEdFVFRJTkdfVFJBTlNBQ1RJT05TLFxuICBUUkFOU0FDVElPTlNfRkFJTCxcbiAgVFJBTlNBQ1RJT05TX1NVQ0NFU1MsXG4gIENMRUFSX1RSQU5TQUNUSU9OUyxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICB0cmFuc2FjdGlvbnM6IFtdLFxuICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICBpc0ZldGNoZWQ6IGZhbHNlLFxuICBtZXNzYWdlOiBcIlRyYW5zYWN0aW9ucyBOb3QgQXZhaWxhYmxlXCIsXG59O1xuXG5jb25zdCBnZXRUcmFuc2FjdGlvbnNSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgVFJBTlNBQ1RJT05TX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgdHJhbnNhY3Rpb25zOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgICAgICAgaXNGZXRjaGVkOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiBcIlRyYW5zYWN0aW9ucyBmZXRjaGVkXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBHRVRUSU5HX1RSQU5TQUNUSU9OUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc1JldHJpZXZpbmc6IHRydWUsXG4gICAgICB9O1xuICAgIGNhc2UgQ0xFQVJfVFJBTlNBQ1RJT05TOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHRyYW5zYWN0aW9uczogW10sXG4gICAgfTtcblxuICAgIGNhc2UgVFJBTlNBQ1RJT05TX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVzc2FnZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGdldFRyYW5zYWN0aW9uc1JlZHVjZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLFNBQ0VFLG9CQUFvQixFQUNwQkMsaUJBQWlCLEVBQ2pCQyxvQkFBb0IsRUFDcEJDLGtCQUFrQixRQUNiLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFOLGNBQUEsR0FBQU8sQ0FBQSxPQUFHO0VBQ25CQyxZQUFZLEVBQUUsRUFBRTtFQUNoQkMsWUFBWSxFQUFFLEtBQUs7RUFDbkJDLFNBQVMsRUFBRSxLQUFLO0VBQ2hCQyxPQUFPLEVBQUU7QUFDWCxDQUFDO0FBQUNYLGNBQUEsR0FBQU8sQ0FBQTtBQUVGLE1BQU1LLHNCQUFzQixHQUFHQSxDQUFDQyxLQUFLLElBQUFiLGNBQUEsR0FBQWMsQ0FBQSxVQUFHUixZQUFZLEdBQUVTLE1BQU0sS0FBSztFQUFBZixjQUFBLEdBQUFnQixDQUFBO0VBQUFoQixjQUFBLEdBQUFPLENBQUE7RUFDL0QsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtiLG9CQUFvQjtNQUFBSixjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ3ZCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JMLFlBQVksRUFBRU8sTUFBTSxDQUFDRyxPQUFPO1FBQzVCVCxZQUFZLEVBQUUsS0FBSztRQUNuQkMsU0FBUyxFQUFFLElBQUk7UUFDZkMsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtULG9CQUFvQjtNQUFBRixjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ3ZCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JKLFlBQVksRUFBRTtNQUNoQixDQUFDO0lBQ0gsS0FBS0osa0JBQWtCO01BQUFMLGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDbkIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsWUFBWSxFQUFFO01BQ3BCLENBQUM7SUFFRCxLQUFLTCxpQkFBaUI7TUFBQUgsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUNwQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSRixPQUFPLEVBQUVJLE1BQU0sQ0FBQ0csT0FBTztRQUN2QlIsU0FBUyxFQUFFLEtBQUs7UUFDaEJELFlBQVksRUFBRTtNQUNoQixDQUFDO0lBRUg7TUFBQVQsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUNFLE9BQU9NLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBQ0QsZUFBZUQsc0JBQXNCIn0=