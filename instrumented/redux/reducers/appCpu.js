function cov_4l4fpnjy2() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/appCpu.js";
  var hash = "73021a335fae69d5d925ff49e7c538d5682c1293";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/appCpu.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
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
          column: 22
        },
        end: {
          line: 61,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 60,
          column: 3
        }
      },
      "3": {
        start: {
          line: 17,
          column: 6
        },
        end: {
          line: 28,
          column: 8
        }
      },
      "4": {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 42,
          column: 8
        }
      },
      "5": {
        start: {
          line: 45,
          column: 6
        },
        end: {
          line: 48,
          column: 8
        }
      },
      "6": {
        start: {
          line: 51,
          column: 6
        },
        end: {
          line: 56,
          column: 8
        }
      },
      "7": {
        start: {
          line: 59,
          column: 6
        },
        end: {
          line: 59,
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
            column: 22
          },
          end: {
            line: 14,
            column: 23
          }
        },
        loc: {
          start: {
            line: 14,
            column: 56
          },
          end: {
            line: 61,
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
            column: 23
          },
          end: {
            line: 14,
            column: 43
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 31
          },
          end: {
            line: 14,
            column: 43
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
            line: 60,
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
            line: 28,
            column: 8
          }
        }, {
          start: {
            line: 30,
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
            line: 48,
            column: 8
          }
        }, {
          start: {
            line: 50,
            column: 4
          },
          end: {
            line: 56,
            column: 8
          }
        }, {
          start: {
            line: 58,
            column: 4
          },
          end: {
            line: 59,
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
    hash: "73021a335fae69d5d925ff49e7c538d5682c1293"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_4l4fpnjy2 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_4l4fpnjy2();
import { FETCH_APP_CPU_SUCCESS, FETCH_APP_CPU_FAILED, IS_FETCHING_APP_CPU, CLEAR_APP_CPU } from "../actions/actionTypes";
const initialState = (cov_4l4fpnjy2().s[0]++, {
  appCPUMetrics: [],
  isFetchingCPU: false,
  cpuMessage: ""
});
cov_4l4fpnjy2().s[1]++;
const appCpuReducer = (state = (cov_4l4fpnjy2().b[0][0]++, initialState), action) => {
  cov_4l4fpnjy2().f[0]++;
  cov_4l4fpnjy2().s[2]++;
  switch (action.type) {
    case FETCH_APP_CPU_SUCCESS:
      cov_4l4fpnjy2().b[1][0]++;
      cov_4l4fpnjy2().s[3]++;
      return {
        ...state,
        appCPUMetrics: [...state.appCPUMetrics, {
          app: action.payload?.app,
          metrics: action.payload?.metrics
        }],
        isFetchingCPU: false,
        cpuMessage: "Fetched app CPU metrics"
      };
    case FETCH_APP_CPU_FAILED:
      cov_4l4fpnjy2().b[1][1]++;
      cov_4l4fpnjy2().s[4]++;
      return {
        ...state,
        appCPUMetrics: [...state.appCPUMetrics, {
          app: action.payload?.app,
          metrics: action.payload?.metrics
        }],
        isFetchingCPU: false,
        cpuMessage: "Error fetching app CPU metrics"
      };
    case IS_FETCHING_APP_CPU:
      cov_4l4fpnjy2().b[1][2]++;
      cov_4l4fpnjy2().s[5]++;
      return {
        ...state,
        isFetchingCPU: true
      };
    case CLEAR_APP_CPU:
      cov_4l4fpnjy2().b[1][3]++;
      cov_4l4fpnjy2().s[6]++;
      return {
        ...state,
        appCPUMetrics: [],
        isFetchingCPU: false,
        cpuMessage: ""
      };
    default:
      cov_4l4fpnjy2().b[1][4]++;
      cov_4l4fpnjy2().s[7]++;
      return state;
  }
};
export default appCpuReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfNGw0ZnBuankyIiwiYWN0dWFsQ292ZXJhZ2UiLCJGRVRDSF9BUFBfQ1BVX1NVQ0NFU1MiLCJGRVRDSF9BUFBfQ1BVX0ZBSUxFRCIsIklTX0ZFVENISU5HX0FQUF9DUFUiLCJDTEVBUl9BUFBfQ1BVIiwiaW5pdGlhbFN0YXRlIiwicyIsImFwcENQVU1ldHJpY3MiLCJpc0ZldGNoaW5nQ1BVIiwiY3B1TWVzc2FnZSIsImFwcENwdVJlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsImFwcCIsInBheWxvYWQiLCJtZXRyaWNzIl0sInNvdXJjZXMiOlsiYXBwQ3B1LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEZFVENIX0FQUF9DUFVfU1VDQ0VTUyxcbiAgRkVUQ0hfQVBQX0NQVV9GQUlMRUQsXG4gIElTX0ZFVENISU5HX0FQUF9DUFUsXG4gIENMRUFSX0FQUF9DUFUsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgYXBwQ1BVTWV0cmljczogW10sXG4gIGlzRmV0Y2hpbmdDUFU6IGZhbHNlLFxuICBjcHVNZXNzYWdlOiBcIlwiLFxufTtcblxuY29uc3QgYXBwQ3B1UmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEZFVENIX0FQUF9DUFVfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBhcHBDUFVNZXRyaWNzOiBbXG4gICAgICAgICAgLi4uc3RhdGUuYXBwQ1BVTWV0cmljcyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhcHA6IGFjdGlvbi5wYXlsb2FkPy5hcHAsXG4gICAgICAgICAgICBtZXRyaWNzOiBhY3Rpb24ucGF5bG9hZD8ubWV0cmljcyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpc0ZldGNoaW5nQ1BVOiBmYWxzZSxcbiAgICAgICAgY3B1TWVzc2FnZTogXCJGZXRjaGVkIGFwcCBDUFUgbWV0cmljc1wiLFxuICAgICAgfTtcblxuICAgIGNhc2UgRkVUQ0hfQVBQX0NQVV9GQUlMRUQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgYXBwQ1BVTWV0cmljczogW1xuICAgICAgICAgIC4uLnN0YXRlLmFwcENQVU1ldHJpY3MsXG4gICAgICAgICAge1xuICAgICAgICAgICAgYXBwOiBhY3Rpb24ucGF5bG9hZD8uYXBwLFxuICAgICAgICAgICAgbWV0cmljczogYWN0aW9uLnBheWxvYWQ/Lm1ldHJpY3MsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgaXNGZXRjaGluZ0NQVTogZmFsc2UsXG4gICAgICAgIGNwdU1lc3NhZ2U6IFwiRXJyb3IgZmV0Y2hpbmcgYXBwIENQVSBtZXRyaWNzXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBJU19GRVRDSElOR19BUFBfQ1BVOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzRmV0Y2hpbmdDUFU6IHRydWUsXG4gICAgICB9O1xuXG4gICAgY2FzZSBDTEVBUl9BUFBfQ1BVOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGFwcENQVU1ldHJpY3M6IFtdLFxuICAgICAgICBpc0ZldGNoaW5nQ1BVOiBmYWxzZSxcbiAgICAgICAgY3B1TWVzc2FnZTogXCJcIixcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgYXBwQ3B1UmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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