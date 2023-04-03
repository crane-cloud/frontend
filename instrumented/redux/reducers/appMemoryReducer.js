function cov_1yryzxdnb0() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/appMemoryReducer.js";
  var hash = "8d589f6cc443a25b401ee122c0f430dd5cbc7d84";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/appMemoryReducer.js",
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
          column: 25
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
            column: 25
          },
          end: {
            line: 14,
            column: 26
          }
        },
        loc: {
          start: {
            line: 14,
            column: 59
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
            column: 26
          },
          end: {
            line: 14,
            column: 46
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 34
          },
          end: {
            line: 14,
            column: 46
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
    hash: "8d589f6cc443a25b401ee122c0f430dd5cbc7d84"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1yryzxdnb0 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1yryzxdnb0();
import { FETCH_APP_MEMORY_SUCCESS, FETCH_APP_MEMORY_FAILED, IS_FETCHING_APP_MEMORY, CLEAR_APP_MEMORY } from "../actions/actionTypes";
const initialState = (cov_1yryzxdnb0().s[0]++, {
  appMemoryMetrics: [],
  isFetchingAppMemory: false,
  appMemoryMessage: ""
});
cov_1yryzxdnb0().s[1]++;
const appMemoryReducer = (state = (cov_1yryzxdnb0().b[0][0]++, initialState), action) => {
  cov_1yryzxdnb0().f[0]++;
  cov_1yryzxdnb0().s[2]++;
  switch (action.type) {
    case FETCH_APP_MEMORY_SUCCESS:
      cov_1yryzxdnb0().b[1][0]++;
      cov_1yryzxdnb0().s[3]++;
      return {
        ...state,
        appMemoryMetrics: [...state.appMemoryMetrics, {
          app: action.payload?.app,
          metrics: action.payload?.metrics
        }],
        isFetchingAppMemory: false,
        appMemoryMessage: "Fetched app memory metrics"
      };
    case FETCH_APP_MEMORY_FAILED:
      cov_1yryzxdnb0().b[1][1]++;
      cov_1yryzxdnb0().s[4]++;
      return {
        ...state,
        appMemoryMetrics: [...state.appMemoryMetrics, {
          app: action.payload?.app,
          metrics: action.payload?.metrics
        }],
        isFetchingAppMemory: false,
        appMemoryMessage: "Error fetching app memory metrics"
      };
    case IS_FETCHING_APP_MEMORY:
      cov_1yryzxdnb0().b[1][2]++;
      cov_1yryzxdnb0().s[5]++;
      return {
        ...state,
        isFetchingAppMemory: true
      };
    case CLEAR_APP_MEMORY:
      cov_1yryzxdnb0().b[1][3]++;
      cov_1yryzxdnb0().s[6]++;
      return {
        ...state,
        appMemoryMetrics: [],
        isFetchingAppMemory: false,
        appMemoryMessage: ""
      };
    default:
      cov_1yryzxdnb0().b[1][4]++;
      cov_1yryzxdnb0().s[7]++;
      return state;
  }
};
export default appMemoryReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMXlyeXp4ZG5iMCIsImFjdHVhbENvdmVyYWdlIiwiRkVUQ0hfQVBQX01FTU9SWV9TVUNDRVNTIiwiRkVUQ0hfQVBQX01FTU9SWV9GQUlMRUQiLCJJU19GRVRDSElOR19BUFBfTUVNT1JZIiwiQ0xFQVJfQVBQX01FTU9SWSIsImluaXRpYWxTdGF0ZSIsInMiLCJhcHBNZW1vcnlNZXRyaWNzIiwiaXNGZXRjaGluZ0FwcE1lbW9yeSIsImFwcE1lbW9yeU1lc3NhZ2UiLCJhcHBNZW1vcnlSZWR1Y2VyIiwic3RhdGUiLCJiIiwiYWN0aW9uIiwiZiIsInR5cGUiLCJhcHAiLCJwYXlsb2FkIiwibWV0cmljcyJdLCJzb3VyY2VzIjpbImFwcE1lbW9yeVJlZHVjZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRkVUQ0hfQVBQX01FTU9SWV9TVUNDRVNTLFxuICBGRVRDSF9BUFBfTUVNT1JZX0ZBSUxFRCxcbiAgSVNfRkVUQ0hJTkdfQVBQX01FTU9SWSxcbiAgQ0xFQVJfQVBQX01FTU9SWSxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBhcHBNZW1vcnlNZXRyaWNzOiBbXSxcbiAgaXNGZXRjaGluZ0FwcE1lbW9yeTogZmFsc2UsXG4gIGFwcE1lbW9yeU1lc3NhZ2U6IFwiXCIsXG59O1xuXG5jb25zdCBhcHBNZW1vcnlSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgRkVUQ0hfQVBQX01FTU9SWV9TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGFwcE1lbW9yeU1ldHJpY3M6IFtcbiAgICAgICAgICAuLi5zdGF0ZS5hcHBNZW1vcnlNZXRyaWNzLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFwcDogYWN0aW9uLnBheWxvYWQ/LmFwcCxcbiAgICAgICAgICAgIG1ldHJpY3M6IGFjdGlvbi5wYXlsb2FkPy5tZXRyaWNzLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGlzRmV0Y2hpbmdBcHBNZW1vcnk6IGZhbHNlLFxuICAgICAgICBhcHBNZW1vcnlNZXNzYWdlOiBcIkZldGNoZWQgYXBwIG1lbW9yeSBtZXRyaWNzXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBGRVRDSF9BUFBfTUVNT1JZX0ZBSUxFRDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBhcHBNZW1vcnlNZXRyaWNzOiBbXG4gICAgICAgICAgLi4uc3RhdGUuYXBwTWVtb3J5TWV0cmljcyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhcHA6IGFjdGlvbi5wYXlsb2FkPy5hcHAsXG4gICAgICAgICAgICBtZXRyaWNzOiBhY3Rpb24ucGF5bG9hZD8ubWV0cmljcyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpc0ZldGNoaW5nQXBwTWVtb3J5OiBmYWxzZSxcbiAgICAgICAgYXBwTWVtb3J5TWVzc2FnZTogXCJFcnJvciBmZXRjaGluZyBhcHAgbWVtb3J5IG1ldHJpY3NcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIElTX0ZFVENISU5HX0FQUF9NRU1PUlk6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNGZXRjaGluZ0FwcE1lbW9yeTogdHJ1ZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIENMRUFSX0FQUF9NRU1PUlk6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgYXBwTWVtb3J5TWV0cmljczogW10sXG4gICAgICAgIGlzRmV0Y2hpbmdBcHBNZW1vcnk6IGZhbHNlLFxuICAgICAgICBhcHBNZW1vcnlNZXNzYWdlOiBcIlwiLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07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