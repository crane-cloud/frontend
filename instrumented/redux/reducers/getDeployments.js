function cov_noo9x9sn6() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getDeployments.js";
  var hash = "a1417d0a5abbcdc50247b0bd8d2f8236057b7b1a";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getDeployments.js",
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
          column: 23
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
          line: 20,
          column: 8
        }
      },
      "4": {
        start: {
          line: 23,
          column: 6
        },
        end: {
          line: 28,
          column: 8
        }
      },
      "5": {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 36,
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
            column: 23
          },
          end: {
            line: 14,
            column: 24
          }
        },
        loc: {
          start: {
            line: 14,
            column: 57
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
            column: 24
          },
          end: {
            line: 14,
            column: 44
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 32
          },
          end: {
            line: 14,
            column: 44
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
            line: 20,
            column: 8
          }
        }, {
          start: {
            line: 22,
            column: 4
          },
          end: {
            line: 28,
            column: 8
          }
        }, {
          start: {
            line: 30,
            column: 4
          },
          end: {
            line: 36,
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
    hash: "a1417d0a5abbcdc50247b0bd8d2f8236057b7b1a"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_noo9x9sn6 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_noo9x9sn6();
import { GET_DEPLOYMENTS_SUCCESS, GET_DEPLOYMENTS_FAIL, GETTING_DEPLOYMENTS } from "../actions/actionTypes";
const initialState = (cov_noo9x9sn6().s[0]++, {
  deployments: [],
  isFetchingDeployments: false,
  isFetched: false,
  message: ""
});
cov_noo9x9sn6().s[1]++;
const getDeployments = (state = (cov_noo9x9sn6().b[0][0]++, initialState), action) => {
  cov_noo9x9sn6().f[0]++;
  cov_noo9x9sn6().s[2]++;
  switch (action.type) {
    case GETTING_DEPLOYMENTS:
      cov_noo9x9sn6().b[1][0]++;
      cov_noo9x9sn6().s[3]++;
      return {
        ...state,
        isFetchingDeployments: true
      };
    case GET_DEPLOYMENTS_SUCCESS:
      cov_noo9x9sn6().b[1][1]++;
      cov_noo9x9sn6().s[4]++;
      return {
        ...state,
        deployments: action.payload,
        isFetchingDeployments: false,
        isFetched: true
      };
    case GET_DEPLOYMENTS_FAIL:
      cov_noo9x9sn6().b[1][2]++;
      cov_noo9x9sn6().s[5]++;
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isFetchingDeployments: false
      };
    default:
      cov_noo9x9sn6().b[1][3]++;
      cov_noo9x9sn6().s[6]++;
      return state;
  }
};
export default getDeployments;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3Zfbm9vOXg5c242IiwiYWN0dWFsQ292ZXJhZ2UiLCJHRVRfREVQTE9ZTUVOVFNfU1VDQ0VTUyIsIkdFVF9ERVBMT1lNRU5UU19GQUlMIiwiR0VUVElOR19ERVBMT1lNRU5UUyIsImluaXRpYWxTdGF0ZSIsInMiLCJkZXBsb3ltZW50cyIsImlzRmV0Y2hpbmdEZXBsb3ltZW50cyIsImlzRmV0Y2hlZCIsIm1lc3NhZ2UiLCJnZXREZXBsb3ltZW50cyIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicGF5bG9hZCJdLCJzb3VyY2VzIjpbImdldERlcGxveW1lbnRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEdFVF9ERVBMT1lNRU5UU19TVUNDRVNTLFxuICBHRVRfREVQTE9ZTUVOVFNfRkFJTCxcbiAgR0VUVElOR19ERVBMT1lNRU5UUyxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBkZXBsb3ltZW50czogW10sXG4gIGlzRmV0Y2hpbmdEZXBsb3ltZW50czogZmFsc2UsXG4gIGlzRmV0Y2hlZDogZmFsc2UsXG4gIG1lc3NhZ2U6IFwiXCIsXG59O1xuXG5jb25zdCBnZXREZXBsb3ltZW50cyA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEdFVFRJTkdfREVQTE9ZTUVOVFM6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNGZXRjaGluZ0RlcGxveW1lbnRzOiB0cnVlLFxuICAgICAgfTtcblxuICAgIGNhc2UgR0VUX0RFUExPWU1FTlRTX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGVwbG95bWVudHM6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc0ZldGNoaW5nRGVwbG95bWVudHM6IGZhbHNlLFxuICAgICAgICBpc0ZldGNoZWQ6IHRydWUsXG4gICAgICB9O1xuXG4gICAgY2FzZSBHRVRfREVQTE9ZTUVOVFNfRkFJTDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBtZXNzYWdlOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaXNGZXRjaGVkOiBmYWxzZSxcbiAgICAgICAgaXNGZXRjaGluZ0RlcGxveW1lbnRzOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXREZXBsb3ltZW50cztcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsYUFBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsYUFBQTtBQWZaLFNBQ0VFLHVCQUF1QixFQUN2QkMsb0JBQW9CLEVBQ3BCQyxtQkFBbUIsUUFDZCx3QkFBd0I7QUFFL0IsTUFBTUMsWUFBWSxJQUFBTCxhQUFBLEdBQUFNLENBQUEsT0FBRztFQUNuQkMsV0FBVyxFQUFFLEVBQUU7RUFDZkMscUJBQXFCLEVBQUUsS0FBSztFQUM1QkMsU0FBUyxFQUFFLEtBQUs7RUFDaEJDLE9BQU8sRUFBRTtBQUNYLENBQUM7QUFBQ1YsYUFBQSxHQUFBTSxDQUFBO0FBRUYsTUFBTUssY0FBYyxHQUFHQSxDQUFDQyxLQUFLLElBQUFaLGFBQUEsR0FBQWEsQ0FBQSxVQUFHUixZQUFZLEdBQUVTLE1BQU0sS0FBSztFQUFBZCxhQUFBLEdBQUFlLENBQUE7RUFBQWYsYUFBQSxHQUFBTSxDQUFBO0VBQ3ZELFFBQVFRLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLWixtQkFBbUI7TUFBQUosYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUN0QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSSixxQkFBcUIsRUFBRTtNQUN6QixDQUFDO0lBRUgsS0FBS04sdUJBQXVCO01BQUFGLGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDMUIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsV0FBVyxFQUFFTyxNQUFNLENBQUNHLE9BQU87UUFDM0JULHFCQUFxQixFQUFFLEtBQUs7UUFDNUJDLFNBQVMsRUFBRTtNQUNiLENBQUM7SUFFSCxLQUFLTixvQkFBb0I7TUFBQUgsYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUN2QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSRixPQUFPLEVBQUVJLE1BQU0sQ0FBQ0csT0FBTztRQUN2QlIsU0FBUyxFQUFFLEtBQUs7UUFDaEJELHFCQUFxQixFQUFFO01BQ3pCLENBQUM7SUFFSDtNQUFBUixhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQ0UsT0FBT00sS0FBSztFQUFDO0FBRW5CLENBQUM7QUFFRCxlQUFlRCxjQUFjIn0=