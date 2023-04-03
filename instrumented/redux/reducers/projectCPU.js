function cov_ep8e8mh1x() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/projectCPU.js";
  var hash = "98042eeb63d5aea058f3cac691608ed0e82a6ca8";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/projectCPU.js",
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
          column: 26
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
            column: 26
          },
          end: {
            line: 14,
            column: 27
          }
        },
        loc: {
          start: {
            line: 14,
            column: 60
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
            column: 27
          },
          end: {
            line: 14,
            column: 47
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 35
          },
          end: {
            line: 14,
            column: 47
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
    hash: "98042eeb63d5aea058f3cac691608ed0e82a6ca8"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_ep8e8mh1x = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_ep8e8mh1x();
import { FETCH_PROJECT_CPU_SUCCESS, FETCH_PROJECT_CPU_FAILED, IS_FETCHING_PROJECT_CPU, CLEAR_PROJECT_CPU } from "../actions/actionTypes";
const initialState = (cov_ep8e8mh1x().s[0]++, {
  cpuMetrics: [],
  isFetchingCPU: false,
  cpuMessage: ""
});
cov_ep8e8mh1x().s[1]++;
const projectCPUReducer = (state = (cov_ep8e8mh1x().b[0][0]++, initialState), action) => {
  cov_ep8e8mh1x().f[0]++;
  cov_ep8e8mh1x().s[2]++;
  switch (action.type) {
    case FETCH_PROJECT_CPU_SUCCESS:
      cov_ep8e8mh1x().b[1][0]++;
      cov_ep8e8mh1x().s[3]++;
      return {
        ...state,
        cpuMetrics: [...state.cpuMetrics, {
          project: action.payload?.project,
          metrics: action.payload?.metrics
        }],
        isFetchingCPU: false,
        cpuMessage: "Fetched project CPU metrics"
      };
    case FETCH_PROJECT_CPU_FAILED:
      cov_ep8e8mh1x().b[1][1]++;
      cov_ep8e8mh1x().s[4]++;
      return {
        ...state,
        cpuMetrics: [...state.cpuMetrics, {
          project: action.payload?.project,
          metrics: action.payload?.metrics
        }],
        isFetchingCPU: false,
        cpuMessage: "Error fetching project CPU metrics"
      };
    case IS_FETCHING_PROJECT_CPU:
      cov_ep8e8mh1x().b[1][2]++;
      cov_ep8e8mh1x().s[5]++;
      return {
        ...state,
        isFetchingCPU: true
      };
    case CLEAR_PROJECT_CPU:
      cov_ep8e8mh1x().b[1][3]++;
      cov_ep8e8mh1x().s[6]++;
      return {
        ...state,
        cpuMetrics: [],
        isFetchingCPU: false,
        cpuMessage: ""
      };
    default:
      cov_ep8e8mh1x().b[1][4]++;
      cov_ep8e8mh1x().s[7]++;
      return state;
  }
};
export default projectCPUReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfZXA4ZThtaDF4IiwiYWN0dWFsQ292ZXJhZ2UiLCJGRVRDSF9QUk9KRUNUX0NQVV9TVUNDRVNTIiwiRkVUQ0hfUFJPSkVDVF9DUFVfRkFJTEVEIiwiSVNfRkVUQ0hJTkdfUFJPSkVDVF9DUFUiLCJDTEVBUl9QUk9KRUNUX0NQVSIsImluaXRpYWxTdGF0ZSIsInMiLCJjcHVNZXRyaWNzIiwiaXNGZXRjaGluZ0NQVSIsImNwdU1lc3NhZ2UiLCJwcm9qZWN0Q1BVUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicHJvamVjdCIsInBheWxvYWQiLCJtZXRyaWNzIl0sInNvdXJjZXMiOlsicHJvamVjdENQVS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBGRVRDSF9QUk9KRUNUX0NQVV9TVUNDRVNTLFxuICBGRVRDSF9QUk9KRUNUX0NQVV9GQUlMRUQsXG4gIElTX0ZFVENISU5HX1BST0pFQ1RfQ1BVLFxuICBDTEVBUl9QUk9KRUNUX0NQVSxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBjcHVNZXRyaWNzOiBbXSxcbiAgaXNGZXRjaGluZ0NQVTogZmFsc2UsXG4gIGNwdU1lc3NhZ2U6IFwiXCIsXG59O1xuXG5jb25zdCBwcm9qZWN0Q1BVUmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEZFVENIX1BST0pFQ1RfQ1BVX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY3B1TWV0cmljczogW1xuICAgICAgICAgIC4uLnN0YXRlLmNwdU1ldHJpY3MsXG4gICAgICAgICAge1xuICAgICAgICAgICAgcHJvamVjdDogYWN0aW9uLnBheWxvYWQ/LnByb2plY3QsXG4gICAgICAgICAgICBtZXRyaWNzOiBhY3Rpb24ucGF5bG9hZD8ubWV0cmljcyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpc0ZldGNoaW5nQ1BVOiBmYWxzZSxcbiAgICAgICAgY3B1TWVzc2FnZTogXCJGZXRjaGVkIHByb2plY3QgQ1BVIG1ldHJpY3NcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIEZFVENIX1BST0pFQ1RfQ1BVX0ZBSUxFRDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjcHVNZXRyaWNzOiBbXG4gICAgICAgICAgLi4uc3RhdGUuY3B1TWV0cmljcyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwcm9qZWN0OiBhY3Rpb24ucGF5bG9hZD8ucHJvamVjdCxcbiAgICAgICAgICAgIG1ldHJpY3M6IGFjdGlvbi5wYXlsb2FkPy5tZXRyaWNzLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGlzRmV0Y2hpbmdDUFU6IGZhbHNlLFxuICAgICAgICBjcHVNZXNzYWdlOiBcIkVycm9yIGZldGNoaW5nIHByb2plY3QgQ1BVIG1ldHJpY3NcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIElTX0ZFVENISU5HX1BST0pFQ1RfQ1BVOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzRmV0Y2hpbmdDUFU6IHRydWUsXG4gICAgICB9O1xuXG4gICAgY2FzZSBDTEVBUl9QUk9KRUNUX0NQVTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjcHVNZXRyaWNzOiBbXSxcbiAgICAgICAgaXNGZXRjaGluZ0NQVTogZmFsc2UsXG4gICAgICAgIGNwdU1lc3NhZ2U6IFwiXCIsXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IHByb2plY3RDUFVSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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