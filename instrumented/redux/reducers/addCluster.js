function cov_1781j2lt0g() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/addCluster.js";
  var hash = "69b2e3624b0993a25f5eafa02e1a59a0fe208196";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/addCluster.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 21
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "1": {
        start: {
          line: 17,
          column: 26
        },
        end: {
          line: 60,
          column: 1
        }
      },
      "2": {
        start: {
          line: 18,
          column: 2
        },
        end: {
          line: 59,
          column: 3
        }
      },
      "3": {
        start: {
          line: 20,
          column: 6
        },
        end: {
          line: 27,
          column: 8
        }
      },
      "4": {
        start: {
          line: 30,
          column: 6
        },
        end: {
          line: 34,
          column: 8
        }
      },
      "5": {
        start: {
          line: 37,
          column: 6
        },
        end: {
          line: 44,
          column: 8
        }
      },
      "6": {
        start: {
          line: 47,
          column: 6
        },
        end: {
          line: 55,
          column: 8
        }
      },
      "7": {
        start: {
          line: 58,
          column: 6
        },
        end: {
          line: 58,
          column: 19
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 17,
            column: 26
          },
          end: {
            line: 17,
            column: 27
          }
        },
        loc: {
          start: {
            line: 17,
            column: 60
          },
          end: {
            line: 60,
            column: 1
          }
        },
        line: 17
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 17,
            column: 27
          },
          end: {
            line: 17,
            column: 47
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 17,
            column: 35
          },
          end: {
            line: 17,
            column: 47
          }
        }],
        line: 17
      },
      "1": {
        loc: {
          start: {
            line: 18,
            column: 2
          },
          end: {
            line: 59,
            column: 3
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 19,
            column: 4
          },
          end: {
            line: 27,
            column: 8
          }
        }, {
          start: {
            line: 29,
            column: 4
          },
          end: {
            line: 34,
            column: 8
          }
        }, {
          start: {
            line: 36,
            column: 4
          },
          end: {
            line: 44,
            column: 8
          }
        }, {
          start: {
            line: 46,
            column: 4
          },
          end: {
            line: 55,
            column: 8
          }
        }, {
          start: {
            line: 57,
            column: 4
          },
          end: {
            line: 58,
            column: 19
          }
        }],
        line: 18
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
    hash: "69b2e3624b0993a25f5eafa02e1a59a0fe208196"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1781j2lt0g = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1781j2lt0g();
import { ADD_CLUSTER_SUCCESS, ADD_CLUSTERS_FAIL, START_ADDING_CLUSTER, CLEAR_ADD_CLUSTER_STATE } from "../actions/actionTypes";
const initialState = (cov_1781j2lt0g().s[0]++, {
  isAdded: false,
  isFailed: false,
  creatingCluster: false,
  cluster: null,
  error: null,
  message: ""
});
cov_1781j2lt0g().s[1]++;
const addClusterReducer = (state = (cov_1781j2lt0g().b[0][0]++, initialState), action) => {
  cov_1781j2lt0g().f[0]++;
  cov_1781j2lt0g().s[2]++;
  switch (action.type) {
    case ADD_CLUSTER_SUCCESS:
      cov_1781j2lt0g().b[1][0]++;
      cov_1781j2lt0g().s[3]++;
      return {
        ...state,
        cluster: action.payload,
        creatingCluster: false,
        isFailed: false,
        isAdded: true,
        message: "Cluster Added SuccessFully"
      };
    case START_ADDING_CLUSTER:
      cov_1781j2lt0g().b[1][1]++;
      cov_1781j2lt0g().s[4]++;
      return {
        ...state,
        creatingCluster: true,
        isAdded: false
      };
    case ADD_CLUSTERS_FAIL:
      cov_1781j2lt0g().b[1][2]++;
      cov_1781j2lt0g().s[5]++;
      return {
        ...state,
        isFailed: true,
        isAdded: false,
        creatingCluster: false,
        error: action.payload?.error,
        message: "Failed to add cluster"
      };
    case CLEAR_ADD_CLUSTER_STATE:
      cov_1781j2lt0g().b[1][3]++;
      cov_1781j2lt0g().s[6]++;
      return {
        ...state,
        isAdded: false,
        isFailed: false,
        creatingCluster: false,
        cluster: null,
        error: null,
        message: ""
      };
    default:
      cov_1781j2lt0g().b[1][4]++;
      cov_1781j2lt0g().s[7]++;
      return state;
  }
};
export default addClusterReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTc4MWoybHQwZyIsImFjdHVhbENvdmVyYWdlIiwiQUREX0NMVVNURVJfU1VDQ0VTUyIsIkFERF9DTFVTVEVSU19GQUlMIiwiU1RBUlRfQURESU5HX0NMVVNURVIiLCJDTEVBUl9BRERfQ0xVU1RFUl9TVEFURSIsImluaXRpYWxTdGF0ZSIsInMiLCJpc0FkZGVkIiwiaXNGYWlsZWQiLCJjcmVhdGluZ0NsdXN0ZXIiLCJjbHVzdGVyIiwiZXJyb3IiLCJtZXNzYWdlIiwiYWRkQ2x1c3RlclJlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJhZGRDbHVzdGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFERF9DTFVTVEVSX1NVQ0NFU1MsXG4gIEFERF9DTFVTVEVSU19GQUlMLFxuICBTVEFSVF9BRERJTkdfQ0xVU1RFUixcbiAgQ0xFQVJfQUREX0NMVVNURVJfU1RBVEUsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgaXNBZGRlZDogZmFsc2UsXG4gIGlzRmFpbGVkOiBmYWxzZSxcbiAgY3JlYXRpbmdDbHVzdGVyOiBmYWxzZSxcbiAgY2x1c3RlcjogbnVsbCxcbiAgZXJyb3I6IG51bGwsXG4gIG1lc3NhZ2U6IFwiXCIsXG59O1xuXG5jb25zdCBhZGRDbHVzdGVyUmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEFERF9DTFVTVEVSX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY2x1c3RlcjogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGNyZWF0aW5nQ2x1c3RlcjogZmFsc2UsXG4gICAgICAgIGlzRmFpbGVkOiBmYWxzZSxcbiAgICAgICAgaXNBZGRlZDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogXCJDbHVzdGVyIEFkZGVkIFN1Y2Nlc3NGdWxseVwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgU1RBUlRfQURESU5HX0NMVVNURVI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY3JlYXRpbmdDbHVzdGVyOiB0cnVlLFxuICAgICAgICBpc0FkZGVkOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIEFERF9DTFVTVEVSU19GQUlMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzRmFpbGVkOiB0cnVlLFxuICAgICAgICBpc0FkZGVkOiBmYWxzZSxcbiAgICAgICAgY3JlYXRpbmdDbHVzdGVyOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IGFjdGlvbi5wYXlsb2FkPy5lcnJvcixcbiAgICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gYWRkIGNsdXN0ZXJcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIENMRUFSX0FERF9DTFVTVEVSX1NUQVRFOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzQWRkZWQ6IGZhbHNlLFxuICAgICAgICBpc0ZhaWxlZDogZmFsc2UsXG4gICAgICAgIGNyZWF0aW5nQ2x1c3RlcjogZmFsc2UsXG4gICAgICAgIGNsdXN0ZXI6IG51bGwsXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFkZENsdXN0ZXJSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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