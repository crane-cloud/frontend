function cov_8h68p5z1u() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/projectMemory.js";
  var hash = "5dcc1a68d33ac17d407a3efeb96c11c32a3d628f";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/projectMemory.js",
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
          column: 29
        },
        end: {
          line: 55,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 54,
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
          line: 36,
          column: 8
        }
      },
      "5": {
        start: {
          line: 39,
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
          line: 50,
          column: 8
        }
      },
      "7": {
        start: {
          line: 53,
          column: 6
        },
        end: {
          line: 53,
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
            column: 29
          },
          end: {
            line: 14,
            column: 30
          }
        },
        loc: {
          start: {
            line: 14,
            column: 63
          },
          end: {
            line: 55,
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
            column: 30
          },
          end: {
            line: 14,
            column: 50
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 38
          },
          end: {
            line: 14,
            column: 50
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
            line: 54,
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
            line: 25,
            column: 8
          }
        }, {
          start: {
            line: 27,
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
            line: 42,
            column: 8
          }
        }, {
          start: {
            line: 44,
            column: 4
          },
          end: {
            line: 50,
            column: 8
          }
        }, {
          start: {
            line: 52,
            column: 4
          },
          end: {
            line: 53,
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
    hash: "5dcc1a68d33ac17d407a3efeb96c11c32a3d628f"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_8h68p5z1u = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_8h68p5z1u();
import { FETCH_PROJECT_MEMORY_SUCCESS, FETCH_PROJECT_MEMORY_FAILED, IS_FETCHING_PROJECT_MEMORY, CLEAR_PROJECT_MEMORY } from "../actions/actionTypes";
const initialState = (cov_8h68p5z1u().s[0]++, {
  memoryMetrics: [],
  isFetchingMemory: false,
  memoryMessage: ""
});
cov_8h68p5z1u().s[1]++;
const projectMemoryReducer = (state = (cov_8h68p5z1u().b[0][0]++, initialState), action) => {
  cov_8h68p5z1u().f[0]++;
  cov_8h68p5z1u().s[2]++;
  switch (action.type) {
    case FETCH_PROJECT_MEMORY_SUCCESS:
      cov_8h68p5z1u().b[1][0]++;
      cov_8h68p5z1u().s[3]++;
      return {
        ...state,
        memoryMetrics: [...state.memoryMetrics, {
          project: action.payload?.project,
          metrics: action.payload?.metrics
        }],
        isFetchingMemory: false,
        memoryMessage: "Fetched project memory metrics"
      };
    case FETCH_PROJECT_MEMORY_FAILED:
      cov_8h68p5z1u().b[1][1]++;
      cov_8h68p5z1u().s[4]++;
      return {
        ...state,
        memoryMetrics: [...state.memoryMetrics, {
          project: action.payload?.project,
          metrics: action.payload?.metrics
        }],
        isFetchingMemory: false,
        memoryMessage: "Error fetching project memory metrics"
      };
    case IS_FETCHING_PROJECT_MEMORY:
      cov_8h68p5z1u().b[1][2]++;
      cov_8h68p5z1u().s[5]++;
      return {
        ...state,
        isFetchingMemory: true
      };
    case CLEAR_PROJECT_MEMORY:
      cov_8h68p5z1u().b[1][3]++;
      cov_8h68p5z1u().s[6]++;
      return {
        ...state,
        memoryMetrics: [],
        isFetchingMemory: false,
        memoryMessage: ""
      };
    default:
      cov_8h68p5z1u().b[1][4]++;
      cov_8h68p5z1u().s[7]++;
      return state;
  }
};
export default projectMemoryReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfOGg2OHA1ejF1IiwiYWN0dWFsQ292ZXJhZ2UiLCJGRVRDSF9QUk9KRUNUX01FTU9SWV9TVUNDRVNTIiwiRkVUQ0hfUFJPSkVDVF9NRU1PUllfRkFJTEVEIiwiSVNfRkVUQ0hJTkdfUFJPSkVDVF9NRU1PUlkiLCJDTEVBUl9QUk9KRUNUX01FTU9SWSIsImluaXRpYWxTdGF0ZSIsInMiLCJtZW1vcnlNZXRyaWNzIiwiaXNGZXRjaGluZ01lbW9yeSIsIm1lbW9yeU1lc3NhZ2UiLCJwcm9qZWN0TWVtb3J5UmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicHJvamVjdCIsInBheWxvYWQiLCJtZXRyaWNzIl0sInNvdXJjZXMiOlsicHJvamVjdE1lbW9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBGRVRDSF9QUk9KRUNUX01FTU9SWV9TVUNDRVNTLFxuICBGRVRDSF9QUk9KRUNUX01FTU9SWV9GQUlMRUQsXG4gIElTX0ZFVENISU5HX1BST0pFQ1RfTUVNT1JZLFxuICBDTEVBUl9QUk9KRUNUX01FTU9SWSxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBtZW1vcnlNZXRyaWNzOiBbXSxcbiAgaXNGZXRjaGluZ01lbW9yeTogZmFsc2UsXG4gIG1lbW9yeU1lc3NhZ2U6IFwiXCIsXG59O1xuXG5jb25zdCBwcm9qZWN0TWVtb3J5UmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEZFVENIX1BST0pFQ1RfTUVNT1JZX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVtb3J5TWV0cmljczogW1xuICAgICAgICAgIC4uLnN0YXRlLm1lbW9yeU1ldHJpY3MsXG4gICAgICAgICAgeyBwcm9qZWN0OiBhY3Rpb24ucGF5bG9hZD8ucHJvamVjdCwgbWV0cmljczogYWN0aW9uLnBheWxvYWQ/Lm1ldHJpY3MgfSxcbiAgICAgICAgXSxcbiAgICAgICAgaXNGZXRjaGluZ01lbW9yeTogZmFsc2UsXG4gICAgICAgIG1lbW9yeU1lc3NhZ2U6IFwiRmV0Y2hlZCBwcm9qZWN0IG1lbW9yeSBtZXRyaWNzXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBGRVRDSF9QUk9KRUNUX01FTU9SWV9GQUlMRUQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVtb3J5TWV0cmljczogW1xuICAgICAgICAgIC4uLnN0YXRlLm1lbW9yeU1ldHJpY3MsXG4gICAgICAgICAgeyBwcm9qZWN0OiBhY3Rpb24ucGF5bG9hZD8ucHJvamVjdCwgbWV0cmljczogYWN0aW9uLnBheWxvYWQ/Lm1ldHJpY3MgfSxcbiAgICAgICAgXSxcbiAgICAgICAgaXNGZXRjaGluZ01lbW9yeTogZmFsc2UsXG4gICAgICAgIG1lbW9yeU1lc3NhZ2U6IFwiRXJyb3IgZmV0Y2hpbmcgcHJvamVjdCBtZW1vcnkgbWV0cmljc1wiLFxuICAgICAgfTtcblxuICAgIGNhc2UgSVNfRkVUQ0hJTkdfUFJPSkVDVF9NRU1PUlk6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNGZXRjaGluZ01lbW9yeTogdHJ1ZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIENMRUFSX1BST0pFQ1RfTUVNT1JZOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1lbW9yeU1ldHJpY3M6IFtdLFxuICAgICAgICBpc0ZldGNoaW5nTWVtb3J5OiBmYWxzZSxcbiAgICAgICAgbWVtb3J5TWVzc2FnZTogXCJcIixcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgcHJvamVjdE1lbW9yeVJlZHVjZXI7XG4iXSwibWFwcGlu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