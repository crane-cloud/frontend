function cov_1ekkod748b() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/createApp.js";
  var hash = "4a42651e3d95073ac52d0973ef00d5a8883e225b";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/createApp.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 21
        },
        end: {
          line: 14,
          column: 1
        }
      },
      "1": {
        start: {
          line: 16,
          column: 25
        },
        end: {
          line: 61,
          column: 1
        }
      },
      "2": {
        start: {
          line: 17,
          column: 2
        },
        end: {
          line: 60,
          column: 3
        }
      },
      "3": {
        start: {
          line: 19,
          column: 6
        },
        end: {
          line: 26,
          column: 8
        }
      },
      "4": {
        start: {
          line: 29,
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
          line: 46,
          column: 8
        }
      },
      "6": {
        start: {
          line: 49,
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
            line: 16,
            column: 25
          },
          end: {
            line: 16,
            column: 26
          }
        },
        loc: {
          start: {
            line: 16,
            column: 59
          },
          end: {
            line: 61,
            column: 1
          }
        },
        line: 16
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 16,
            column: 26
          },
          end: {
            line: 16,
            column: 46
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 16,
            column: 34
          },
          end: {
            line: 16,
            column: 46
          }
        }],
        line: 16
      },
      "1": {
        loc: {
          start: {
            line: 17,
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
            line: 18,
            column: 4
          },
          end: {
            line: 26,
            column: 8
          }
        }, {
          start: {
            line: 28,
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
            line: 46,
            column: 8
          }
        }, {
          start: {
            line: 48,
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
        line: 17
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
    hash: "4a42651e3d95073ac52d0973ef00d5a8883e225b"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1ekkod748b = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1ekkod748b();
import { CREATE_APP_SUCCESS, CREATE_APP_FAIL, START_CREATING_APP, CLEAR_ADD_APP_STATE } from "../actions/actionTypes";
const initialState = (cov_1ekkod748b().s[0]++, {
  app: null,
  isCreated: false,
  isCreating: false,
  message: "",
  errorCode: null
});
cov_1ekkod748b().s[1]++;
const createAppReducer = (state = (cov_1ekkod748b().b[0][0]++, initialState), action) => {
  cov_1ekkod748b().f[0]++;
  cov_1ekkod748b().s[2]++;
  switch (action.type) {
    case CREATE_APP_SUCCESS:
      cov_1ekkod748b().b[1][0]++;
      cov_1ekkod748b().s[3]++;
      return {
        ...state,
        app: action.payload,
        isCreating: false,
        isCreated: true,
        message: "Success! Your app has been deployed.",
        errorCode: null
      };
    case START_CREATING_APP:
      cov_1ekkod748b().b[1][1]++;
      cov_1ekkod748b().s[4]++;
      return {
        ...state,
        app: null,
        isCreating: true,
        isCreated: false,
        message: "",
        errorCode: null
      };
    case CREATE_APP_FAIL:
      cov_1ekkod748b().b[1][2]++;
      cov_1ekkod748b().s[5]++;
      return {
        ...state,
        app: null,
        isCreating: false,
        isCreated: false,
        message: "Deployment failed. Please try again",
        errorCode: action.payload?.errorCode
      };
    case CLEAR_ADD_APP_STATE:
      cov_1ekkod748b().b[1][3]++;
      cov_1ekkod748b().s[6]++;
      return {
        ...state,
        app: null,
        isCreated: false,
        isCreating: false,
        message: "",
        errorCode: null
      };
    default:
      cov_1ekkod748b().b[1][4]++;
      cov_1ekkod748b().s[7]++;
      return state;
  }
};
export default createAppReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMWVra29kNzQ4YiIsImFjdHVhbENvdmVyYWdlIiwiQ1JFQVRFX0FQUF9TVUNDRVNTIiwiQ1JFQVRFX0FQUF9GQUlMIiwiU1RBUlRfQ1JFQVRJTkdfQVBQIiwiQ0xFQVJfQUREX0FQUF9TVEFURSIsImluaXRpYWxTdGF0ZSIsInMiLCJhcHAiLCJpc0NyZWF0ZWQiLCJpc0NyZWF0aW5nIiwibWVzc2FnZSIsImVycm9yQ29kZSIsImNyZWF0ZUFwcFJlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJjcmVhdGVBcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ1JFQVRFX0FQUF9TVUNDRVNTLFxuICBDUkVBVEVfQVBQX0ZBSUwsXG4gIFNUQVJUX0NSRUFUSU5HX0FQUCxcbiAgQ0xFQVJfQUREX0FQUF9TVEFURSxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBhcHA6IG51bGwsXG4gIGlzQ3JlYXRlZDogZmFsc2UsXG4gIGlzQ3JlYXRpbmc6IGZhbHNlLFxuICBtZXNzYWdlOiBcIlwiLFxuICBlcnJvckNvZGU6IG51bGwsXG59O1xuXG5jb25zdCBjcmVhdGVBcHBSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQ1JFQVRFX0FQUF9TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGFwcDogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzQ3JlYXRpbmc6IGZhbHNlLFxuICAgICAgICBpc0NyZWF0ZWQ6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiU3VjY2VzcyEgWW91ciBhcHAgaGFzIGJlZW4gZGVwbG95ZWQuXCIsXG4gICAgICAgIGVycm9yQ29kZTogbnVsbCxcbiAgICAgIH07XG5cbiAgICBjYXNlIFNUQVJUX0NSRUFUSU5HX0FQUDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBhcHA6IG51bGwsXG4gICAgICAgIGlzQ3JlYXRpbmc6IHRydWUsXG4gICAgICAgIGlzQ3JlYXRlZDogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6IFwiXCIsXG4gICAgICAgIGVycm9yQ29kZTogbnVsbCxcbiAgICAgIH07XG5cbiAgICBjYXNlIENSRUFURV9BUFBfRkFJTDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBhcHA6IG51bGwsXG4gICAgICAgIGlzQ3JlYXRpbmc6IGZhbHNlLFxuICAgICAgICBpc0NyZWF0ZWQ6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiBcIkRlcGxveW1lbnQgZmFpbGVkLiBQbGVhc2UgdHJ5IGFnYWluXCIsXG4gICAgICAgIGVycm9yQ29kZTogYWN0aW9uLnBheWxvYWQ/LmVycm9yQ29kZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIENMRUFSX0FERF9BUFBfU1RBVEU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgYXBwOiBudWxsLFxuICAgICAgICBpc0NyZWF0ZWQ6IGZhbHNlLFxuICAgICAgICBpc0NyZWF0aW5nOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJcIixcbiAgICAgICAgZXJyb3JDb2RlOiBudWxsLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUFwcFJlZHVjZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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