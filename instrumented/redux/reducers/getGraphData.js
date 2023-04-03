function cov_2mpbhc0zxm() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getGraphData.js";
  var hash = "3c8bd3e254a91430debba68c9f490b4d9cced0a6";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getGraphData.js",
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
    hash: "3c8bd3e254a91430debba68c9f490b4d9cced0a6"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2mpbhc0zxm = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2mpbhc0zxm();
import { GET_GRAPH_DATA_FAILED, GET_GRAPH_DATA_SUCCESS, GETTING_GRAPH_DATA } from "../actions/actionTypes";
const initialState = (cov_2mpbhc0zxm().s[0]++, {
  graphData: [],
  retrievingGraphData: false,
  graphDataFetched: false,
  message: "Graph Data Information Not Available"
});
cov_2mpbhc0zxm().s[1]++;
const getGraphDataReducer = (state = (cov_2mpbhc0zxm().b[0][0]++, initialState), action) => {
  cov_2mpbhc0zxm().f[0]++;
  cov_2mpbhc0zxm().s[2]++;
  switch (action.type) {
    case GET_GRAPH_DATA_SUCCESS:
      cov_2mpbhc0zxm().b[1][0]++;
      cov_2mpbhc0zxm().s[3]++;
      return {
        ...state,
        graphData: action.payload,
        retrievingGraphData: false,
        graphDataFetched: true,
        message: "Graph Data fetched"
      };
    case GETTING_GRAPH_DATA:
      cov_2mpbhc0zxm().b[1][1]++;
      cov_2mpbhc0zxm().s[4]++;
      return {
        ...state,
        retrievingGraphData: true
      };
    case GET_GRAPH_DATA_FAILED:
      cov_2mpbhc0zxm().b[1][2]++;
      cov_2mpbhc0zxm().s[5]++;
      return {
        ...state,
        message: action.payload,
        graphDataFetched: false,
        retrievingGraphData: false
      };
    default:
      cov_2mpbhc0zxm().b[1][3]++;
      cov_2mpbhc0zxm().s[6]++;
      return state;
  }
};
export default getGraphDataReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMm1wYmhjMHp4bSIsImFjdHVhbENvdmVyYWdlIiwiR0VUX0dSQVBIX0RBVEFfRkFJTEVEIiwiR0VUX0dSQVBIX0RBVEFfU1VDQ0VTUyIsIkdFVFRJTkdfR1JBUEhfREFUQSIsImluaXRpYWxTdGF0ZSIsInMiLCJncmFwaERhdGEiLCJyZXRyaWV2aW5nR3JhcGhEYXRhIiwiZ3JhcGhEYXRhRmV0Y2hlZCIsIm1lc3NhZ2UiLCJnZXRHcmFwaERhdGFSZWR1Y2VyIiwic3RhdGUiLCJiIiwiYWN0aW9uIiwiZiIsInR5cGUiLCJwYXlsb2FkIl0sInNvdXJjZXMiOlsiZ2V0R3JhcGhEYXRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEdFVF9HUkFQSF9EQVRBX0ZBSUxFRCxcbiAgR0VUX0dSQVBIX0RBVEFfU1VDQ0VTUyxcbiAgR0VUVElOR19HUkFQSF9EQVRBXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZ3JhcGhEYXRhOiBbXSxcbiAgcmV0cmlldmluZ0dyYXBoRGF0YTogZmFsc2UsXG4gIGdyYXBoRGF0YUZldGNoZWQ6IGZhbHNlLFxuICBtZXNzYWdlOiBcIkdyYXBoIERhdGEgSW5mb3JtYXRpb24gTm90IEF2YWlsYWJsZVwiLFxufTtcblxuY29uc3QgZ2V0R3JhcGhEYXRhUmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEdFVF9HUkFQSF9EQVRBX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZ3JhcGhEYXRhOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgcmV0cmlldmluZ0dyYXBoRGF0YTogZmFsc2UsXG4gICAgICAgIGdyYXBoRGF0YUZldGNoZWQ6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiR3JhcGggRGF0YSBmZXRjaGVkXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBHRVRUSU5HX0dSQVBIX0RBVEE6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcmV0cmlldmluZ0dyYXBoRGF0YTogdHJ1ZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIEdFVF9HUkFQSF9EQVRBX0ZBSUxFRDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBtZXNzYWdlOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgZ3JhcGhEYXRhRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgIHJldHJpZXZpbmdHcmFwaERhdGE6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBnZXRHcmFwaERhdGFSZWR1Y2VyOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLFNBQ0VFLHFCQUFxQixFQUNyQkMsc0JBQXNCLEVBQ3RCQyxrQkFBa0IsUUFDYix3QkFBd0I7QUFFL0IsTUFBTUMsWUFBWSxJQUFBTCxjQUFBLEdBQUFNLENBQUEsT0FBRztFQUNuQkMsU0FBUyxFQUFFLEVBQUU7RUFDYkMsbUJBQW1CLEVBQUUsS0FBSztFQUMxQkMsZ0JBQWdCLEVBQUUsS0FBSztFQUN2QkMsT0FBTyxFQUFFO0FBQ1gsQ0FBQztBQUFDVixjQUFBLEdBQUFNLENBQUE7QUFFRixNQUFNSyxtQkFBbUIsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBWixjQUFBLEdBQUFhLENBQUEsVUFBR1IsWUFBWSxHQUFFUyxNQUFNLEtBQUs7RUFBQWQsY0FBQSxHQUFBZSxDQUFBO0VBQUFmLGNBQUEsR0FBQU0sQ0FBQTtFQUM1RCxRQUFRUSxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS2Isc0JBQXNCO01BQUFILGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDekIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsU0FBUyxFQUFFTyxNQUFNLENBQUNHLE9BQU87UUFDekJULG1CQUFtQixFQUFFLEtBQUs7UUFDMUJDLGdCQUFnQixFQUFFLElBQUk7UUFDdEJDLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSCxLQUFLTixrQkFBa0I7TUFBQUosY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUNyQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSSixtQkFBbUIsRUFBRTtNQUN2QixDQUFDO0lBRUgsS0FBS04scUJBQXFCO01BQUFGLGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDeEIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkYsT0FBTyxFQUFFSSxNQUFNLENBQUNHLE9BQU87UUFDdkJSLGdCQUFnQixFQUFFLEtBQUs7UUFDdkJELG1CQUFtQixFQUFFO01BQ3ZCLENBQUM7SUFFSDtNQUFBUixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQ0UsT0FBT00sS0FBSztFQUFDO0FBRW5CLENBQUM7QUFDRCxlQUFlRCxtQkFBbUIifQ==