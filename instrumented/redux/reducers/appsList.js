function cov_xupqnoxe3() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/appsList.js";
  var hash = "1f054ecd8723697bf0268c2a76962e584b69276e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/appsList.js",
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
          column: 24
        },
        end: {
          line: 43,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 42,
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
          line: 30,
          column: 8
        }
      },
      "5": {
        start: {
          line: 33,
          column: 6
        },
        end: {
          line: 38,
          column: 8
        }
      },
      "6": {
        start: {
          line: 41,
          column: 6
        },
        end: {
          line: 41,
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
            column: 24
          },
          end: {
            line: 14,
            column: 25
          }
        },
        loc: {
          start: {
            line: 14,
            column: 58
          },
          end: {
            line: 43,
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
            column: 25
          },
          end: {
            line: 14,
            column: 45
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 33
          },
          end: {
            line: 14,
            column: 45
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
            line: 42,
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
            line: 30,
            column: 8
          }
        }, {
          start: {
            line: 32,
            column: 4
          },
          end: {
            line: 38,
            column: 8
          }
        }, {
          start: {
            line: 40,
            column: 4
          },
          end: {
            line: 41,
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
    hash: "1f054ecd8723697bf0268c2a76962e584b69276e"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_xupqnoxe3 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_xupqnoxe3();
import { GET_APPS_SUCCESS, GET_APPS_FAIL, START_GETTING_APPS } from "../actions/actionTypes";
const initialState = (cov_xupqnoxe3().s[0]++, {
  apps: {
    apps: []
  },
  isRetrieved: false,
  isRetrieving: false,
  message: "Apps Not Available"
});
cov_xupqnoxe3().s[1]++;
const appsListReducer = (state = (cov_xupqnoxe3().b[0][0]++, initialState), action) => {
  cov_xupqnoxe3().f[0]++;
  cov_xupqnoxe3().s[2]++;
  switch (action.type) {
    case GET_APPS_SUCCESS:
      cov_xupqnoxe3().b[1][0]++;
      cov_xupqnoxe3().s[3]++;
      return {
        ...state,
        apps: action.payload,
        isRetrieving: false,
        isRetrieved: true,
        message: "All Apps fetched"
      };
    case START_GETTING_APPS:
      cov_xupqnoxe3().b[1][1]++;
      cov_xupqnoxe3().s[4]++;
      return {
        ...state,
        isRetrieved: false,
        isRetrieving: true
      };
    case GET_APPS_FAIL:
      cov_xupqnoxe3().b[1][2]++;
      cov_xupqnoxe3().s[5]++;
      return {
        ...state,
        error: action.payload,
        isRetrieving: false,
        isRetrieved: false
      };
    default:
      cov_xupqnoxe3().b[1][3]++;
      cov_xupqnoxe3().s[6]++;
      return state;
  }
};
export default appsListReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfeHVwcW5veGUzIiwiYWN0dWFsQ292ZXJhZ2UiLCJHRVRfQVBQU19TVUNDRVNTIiwiR0VUX0FQUFNfRkFJTCIsIlNUQVJUX0dFVFRJTkdfQVBQUyIsImluaXRpYWxTdGF0ZSIsInMiLCJhcHBzIiwiaXNSZXRyaWV2ZWQiLCJpc1JldHJpZXZpbmciLCJtZXNzYWdlIiwiYXBwc0xpc3RSZWR1Y2VyIiwic3RhdGUiLCJiIiwiYWN0aW9uIiwiZiIsInR5cGUiLCJwYXlsb2FkIiwiZXJyb3IiXSwic291cmNlcyI6WyJhcHBzTGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBHRVRfQVBQU19TVUNDRVNTLFxuICBHRVRfQVBQU19GQUlMLFxuICBTVEFSVF9HRVRUSU5HX0FQUFMsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgYXBwczoge2FwcHM6W119LFxuICBpc1JldHJpZXZlZDogZmFsc2UsXG4gIGlzUmV0cmlldmluZzogZmFsc2UsXG4gIG1lc3NhZ2U6IFwiQXBwcyBOb3QgQXZhaWxhYmxlXCIsXG59O1xuXG5jb25zdCBhcHBzTGlzdFJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBHRVRfQVBQU19TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGFwcHM6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICAgICAgICBpc1JldHJpZXZlZDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogXCJBbGwgQXBwcyBmZXRjaGVkXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBTVEFSVF9HRVRUSU5HX0FQUFM6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNSZXRyaWV2ZWQ6IGZhbHNlLFxuICAgICAgICBpc1JldHJpZXZpbmc6IHRydWUsXG4gICAgICB9O1xuXG4gICAgY2FzZSBHRVRfQVBQU19GQUlMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGVycm9yOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgICAgICAgaXNSZXRyaWV2ZWQ6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBhcHBzTGlzdFJlZHVjZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGFBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGFBQUE7QUFmWixTQUNFRSxnQkFBZ0IsRUFDaEJDLGFBQWEsRUFDYkMsa0JBQWtCLFFBQ2Isd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQUwsYUFBQSxHQUFBTSxDQUFBLE9BQUc7RUFDbkJDLElBQUksRUFBRTtJQUFDQSxJQUFJLEVBQUM7RUFBRSxDQUFDO0VBQ2ZDLFdBQVcsRUFBRSxLQUFLO0VBQ2xCQyxZQUFZLEVBQUUsS0FBSztFQUNuQkMsT0FBTyxFQUFFO0FBQ1gsQ0FBQztBQUFDVixhQUFBLEdBQUFNLENBQUE7QUFFRixNQUFNSyxlQUFlLEdBQUdBLENBQUNDLEtBQUssSUFBQVosYUFBQSxHQUFBYSxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFkLGFBQUEsR0FBQWUsQ0FBQTtFQUFBZixhQUFBLEdBQUFNLENBQUE7RUFDeEQsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtkLGdCQUFnQjtNQUFBRixhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQ25CLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JMLElBQUksRUFBRU8sTUFBTSxDQUFDRyxPQUFPO1FBQ3BCUixZQUFZLEVBQUUsS0FBSztRQUNuQkQsV0FBVyxFQUFFLElBQUk7UUFDakJFLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSCxLQUFLTixrQkFBa0I7TUFBQUosYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUNyQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSSixXQUFXLEVBQUUsS0FBSztRQUNsQkMsWUFBWSxFQUFFO01BQ2hCLENBQUM7SUFFSCxLQUFLTixhQUFhO01BQUFILGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDaEIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUk0sS0FBSyxFQUFFSixNQUFNLENBQUNHLE9BQU87UUFDckJSLFlBQVksRUFBRSxLQUFLO1FBQ25CRCxXQUFXLEVBQUU7TUFDZixDQUFDO0lBRUg7TUFBQVIsYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUNFLE9BQU9NLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBQ0QsZUFBZUQsZUFBZSJ9