function cov_12ymwugjlj() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/nodes.js";
  var hash = "d92780b4b885e01866c7c77ed742d011b8f257a5";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/nodes.js",
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
          column: 21
        },
        end: {
          line: 42,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 41,
          column: 3
        }
      },
      "3": {
        start: {
          line: 17,
          column: 6
        },
        end: {
          line: 23,
          column: 8
        }
      },
      "4": {
        start: {
          line: 26,
          column: 6
        },
        end: {
          line: 29,
          column: 8
        }
      },
      "5": {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 37,
          column: 8
        }
      },
      "6": {
        start: {
          line: 40,
          column: 6
        },
        end: {
          line: 40,
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
            column: 21
          },
          end: {
            line: 14,
            column: 22
          }
        },
        loc: {
          start: {
            line: 14,
            column: 55
          },
          end: {
            line: 42,
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
            column: 22
          },
          end: {
            line: 14,
            column: 42
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 30
          },
          end: {
            line: 14,
            column: 42
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
            line: 41,
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
            line: 23,
            column: 8
          }
        }, {
          start: {
            line: 25,
            column: 4
          },
          end: {
            line: 29,
            column: 8
          }
        }, {
          start: {
            line: 31,
            column: 4
          },
          end: {
            line: 37,
            column: 8
          }
        }, {
          start: {
            line: 39,
            column: 4
          },
          end: {
            line: 40,
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
    hash: "d92780b4b885e01866c7c77ed742d011b8f257a5"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_12ymwugjlj = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_12ymwugjlj();
import { START_GETTING_NODES, GET_NODES_FAIL, GET_NODES_SUCCESS } from "../actions/actionTypes";
const initialState = (cov_12ymwugjlj().s[0]++, {
  nodes: [],
  isRetrieving: false,
  isFetched: false,
  message: "Nodes Not Available"
});
cov_12ymwugjlj().s[1]++;
const NodesReducer = (state = (cov_12ymwugjlj().b[0][0]++, initialState), action) => {
  cov_12ymwugjlj().f[0]++;
  cov_12ymwugjlj().s[2]++;
  switch (action.type) {
    case GET_NODES_SUCCESS:
      cov_12ymwugjlj().b[1][0]++;
      cov_12ymwugjlj().s[3]++;
      return {
        ...state,
        nodes: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "All Nodes fetched"
      };
    case START_GETTING_NODES:
      cov_12ymwugjlj().b[1][1]++;
      cov_12ymwugjlj().s[4]++;
      return {
        ...state,
        isRetrieving: true
      };
    case GET_NODES_FAIL:
      cov_12ymwugjlj().b[1][2]++;
      cov_12ymwugjlj().s[5]++;
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isRetrieving: false
      };
    default:
      cov_12ymwugjlj().b[1][3]++;
      cov_12ymwugjlj().s[6]++;
      return state;
  }
};
export default NodesReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTJ5bXd1Z2psaiIsImFjdHVhbENvdmVyYWdlIiwiU1RBUlRfR0VUVElOR19OT0RFUyIsIkdFVF9OT0RFU19GQUlMIiwiR0VUX05PREVTX1NVQ0NFU1MiLCJpbml0aWFsU3RhdGUiLCJzIiwibm9kZXMiLCJpc1JldHJpZXZpbmciLCJpc0ZldGNoZWQiLCJtZXNzYWdlIiwiTm9kZXNSZWR1Y2VyIiwic3RhdGUiLCJiIiwiYWN0aW9uIiwiZiIsInR5cGUiLCJwYXlsb2FkIl0sInNvdXJjZXMiOlsibm9kZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgU1RBUlRfR0VUVElOR19OT0RFUyxcbiAgR0VUX05PREVTX0ZBSUwsXG4gIEdFVF9OT0RFU19TVUNDRVNTLFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIG5vZGVzOiBbXSxcbiAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgaXNGZXRjaGVkOiBmYWxzZSxcbiAgbWVzc2FnZTogXCJOb2RlcyBOb3QgQXZhaWxhYmxlXCIsXG59O1xuXG5jb25zdCBOb2Rlc1JlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBHRVRfTk9ERVNfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBub2RlczogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICAgIGlzRmV0Y2hlZDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogXCJBbGwgTm9kZXMgZmV0Y2hlZFwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgU1RBUlRfR0VUVElOR19OT0RFUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc1JldHJpZXZpbmc6IHRydWUsXG4gICAgICB9O1xuXG4gICAgY2FzZSBHRVRfTk9ERVNfRkFJTDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBtZXNzYWdlOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaXNGZXRjaGVkOiBmYWxzZSxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgTm9kZXNSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FDRUUsbUJBQW1CLEVBQ25CQyxjQUFjLEVBQ2RDLGlCQUFpQixRQUNaLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFMLGNBQUEsR0FBQU0sQ0FBQSxPQUFHO0VBQ25CQyxLQUFLLEVBQUUsRUFBRTtFQUNUQyxZQUFZLEVBQUUsS0FBSztFQUNuQkMsU0FBUyxFQUFFLEtBQUs7RUFDaEJDLE9BQU8sRUFBRTtBQUNYLENBQUM7QUFBQ1YsY0FBQSxHQUFBTSxDQUFBO0FBRUYsTUFBTUssWUFBWSxHQUFHQSxDQUFDQyxLQUFLLElBQUFaLGNBQUEsR0FBQWEsQ0FBQSxVQUFHUixZQUFZLEdBQUVTLE1BQU0sS0FBSztFQUFBZCxjQUFBLEdBQUFlLENBQUE7RUFBQWYsY0FBQSxHQUFBTSxDQUFBO0VBQ3JELFFBQVFRLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLWixpQkFBaUI7TUFBQUosY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUNwQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxLQUFLLEVBQUVPLE1BQU0sQ0FBQ0csT0FBTztRQUNyQlQsWUFBWSxFQUFFLEtBQUs7UUFDbkJDLFNBQVMsRUFBRSxJQUFJO1FBQ2ZDLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSCxLQUFLUixtQkFBbUI7TUFBQUYsY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUN0QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSSixZQUFZLEVBQUU7TUFDaEIsQ0FBQztJQUVILEtBQUtMLGNBQWM7TUFBQUgsY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUNqQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSRixPQUFPLEVBQUVJLE1BQU0sQ0FBQ0csT0FBTztRQUN2QlIsU0FBUyxFQUFFLEtBQUs7UUFDaEJELFlBQVksRUFBRTtNQUNoQixDQUFDO0lBRUg7TUFBQVIsY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUNFLE9BQU9NLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBQ0QsZUFBZUQsWUFBWSJ9