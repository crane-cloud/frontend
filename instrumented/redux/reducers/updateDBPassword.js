function cov_sivt9sgge() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/updateDBPassword.js";
  var hash = "849b389da886dea554bd94039d7012a1bf3d6484";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/updateDBPassword.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 21
        },
        end: {
          line: 13,
          column: 1
        }
      },
      "1": {
        start: {
          line: 15,
          column: 38
        },
        end: {
          line: 59,
          column: 1
        }
      },
      "2": {
        start: {
          line: 16,
          column: 2
        },
        end: {
          line: 58,
          column: 3
        }
      },
      "3": {
        start: {
          line: 18,
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
          line: 35,
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
          line: 54,
          column: 8
        }
      },
      "7": {
        start: {
          line: 57,
          column: 6
        },
        end: {
          line: 57,
          column: 19
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 15,
            column: 38
          },
          end: {
            line: 15,
            column: 39
          }
        },
        loc: {
          start: {
            line: 15,
            column: 72
          },
          end: {
            line: 59,
            column: 1
          }
        },
        line: 15
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 15,
            column: 39
          },
          end: {
            line: 15,
            column: 59
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 15,
            column: 47
          },
          end: {
            line: 15,
            column: 59
          }
        }],
        line: 15
      },
      "1": {
        loc: {
          start: {
            line: 16,
            column: 2
          },
          end: {
            line: 58,
            column: 3
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 17,
            column: 4
          },
          end: {
            line: 27,
            column: 5
          }
        }, {
          start: {
            line: 28,
            column: 4
          },
          end: {
            line: 35,
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
            line: 54,
            column: 8
          }
        }, {
          start: {
            line: 56,
            column: 4
          },
          end: {
            line: 57,
            column: 19
          }
        }],
        line: 16
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
    hash: "849b389da886dea554bd94039d7012a1bf3d6484"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_sivt9sgge = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_sivt9sgge();
import { START_UPDATING_DATABASE_PASSWORD, CLEAR_UPDATE_DATABASE_PASSWORD_STATE, UPDATE_DATABASE_PASSWORD_SUCCESS, UPDATE_DATABASE_PASSWORD_FAILED } from "../actions/actionTypes";
const initialState = (cov_sivt9sgge().s[0]++, {
  dbPasswordUpdated: false,
  updatingDBPassword: false,
  errorMessage: "",
  errorCode: null
});
cov_sivt9sgge().s[1]++;
const updateDatabasePasswordReducer = (state = (cov_sivt9sgge().b[0][0]++, initialState), action) => {
  cov_sivt9sgge().f[0]++;
  cov_sivt9sgge().s[2]++;
  switch (action.type) {
    case UPDATE_DATABASE_PASSWORD_SUCCESS:
      cov_sivt9sgge().b[1][0]++;
      {
        cov_sivt9sgge().s[3]++;
        return {
          ...state,
          database: action.payload,
          updateDBPasswordFailed: false,
          dbPasswordUpdated: true,
          updatingDBPassword: false,
          errorMessage: "",
          errorCode: null
        };
      }
    case START_UPDATING_DATABASE_PASSWORD:
      cov_sivt9sgge().b[1][1]++;
      cov_sivt9sgge().s[4]++;
      return {
        ...state,
        dbPasswordUpdated: false,
        updatingDBPassword: true,
        errorCode: null,
        updateDBPasswordFailed: false
      };
    case UPDATE_DATABASE_PASSWORD_FAILED:
      cov_sivt9sgge().b[1][2]++;
      cov_sivt9sgge().s[5]++;
      return {
        ...state,
        updateDBPasswordFailed: true,
        dbPasswordUpdated: false,
        updatingDBPassword: false,
        errorCode: action.payload?.errorCode,
        errorMessage: "Failed to update Database Password"
      };
    case CLEAR_UPDATE_DATABASE_PASSWORD_STATE:
      cov_sivt9sgge().b[1][3]++;
      cov_sivt9sgge().s[6]++;
      return {
        ...state,
        updateDBPasswordFailed: false,
        dbPasswordUpdated: false,
        updatingDBPassword: false,
        errorCode: null,
        errorMessage: ""
      };
    default:
      cov_sivt9sgge().b[1][4]++;
      cov_sivt9sgge().s[7]++;
      return state;
  }
};
export default updateDatabasePasswordReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3Zfc2l2dDlzZ2dlIiwiYWN0dWFsQ292ZXJhZ2UiLCJTVEFSVF9VUERBVElOR19EQVRBQkFTRV9QQVNTV09SRCIsIkNMRUFSX1VQREFURV9EQVRBQkFTRV9QQVNTV09SRF9TVEFURSIsIlVQREFURV9EQVRBQkFTRV9QQVNTV09SRF9TVUNDRVNTIiwiVVBEQVRFX0RBVEFCQVNFX1BBU1NXT1JEX0ZBSUxFRCIsImluaXRpYWxTdGF0ZSIsInMiLCJkYlBhc3N3b3JkVXBkYXRlZCIsInVwZGF0aW5nREJQYXNzd29yZCIsImVycm9yTWVzc2FnZSIsImVycm9yQ29kZSIsInVwZGF0ZURhdGFiYXNlUGFzc3dvcmRSZWR1Y2VyIiwic3RhdGUiLCJiIiwiYWN0aW9uIiwiZiIsInR5cGUiLCJkYXRhYmFzZSIsInBheWxvYWQiLCJ1cGRhdGVEQlBhc3N3b3JkRmFpbGVkIl0sInNvdXJjZXMiOlsidXBkYXRlREJQYXNzd29yZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBTVEFSVF9VUERBVElOR19EQVRBQkFTRV9QQVNTV09SRCxcbiAgQ0xFQVJfVVBEQVRFX0RBVEFCQVNFX1BBU1NXT1JEX1NUQVRFLFxuICBVUERBVEVfREFUQUJBU0VfUEFTU1dPUkRfU1VDQ0VTUyxcbiAgVVBEQVRFX0RBVEFCQVNFX1BBU1NXT1JEX0ZBSUxFRCxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBkYlBhc3N3b3JkVXBkYXRlZDogZmFsc2UsXG4gIHVwZGF0aW5nREJQYXNzd29yZDogZmFsc2UsXG4gIGVycm9yTWVzc2FnZTogXCJcIixcbiAgZXJyb3JDb2RlOiBudWxsLFxufTtcblxuY29uc3QgdXBkYXRlRGF0YWJhc2VQYXNzd29yZFJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBVUERBVEVfREFUQUJBU0VfUEFTU1dPUkRfU1VDQ0VTUzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRhdGFiYXNlOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgdXBkYXRlREJQYXNzd29yZEZhaWxlZDogZmFsc2UsXG4gICAgICAgIGRiUGFzc3dvcmRVcGRhdGVkOiB0cnVlLFxuICAgICAgICB1cGRhdGluZ0RCUGFzc3dvcmQ6IGZhbHNlLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IFwiXCIsXG4gICAgICAgIGVycm9yQ29kZTogbnVsbCxcbiAgICAgIH07XG4gICAgfVxuICAgIGNhc2UgU1RBUlRfVVBEQVRJTkdfREFUQUJBU0VfUEFTU1dPUkQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGJQYXNzd29yZFVwZGF0ZWQ6IGZhbHNlLFxuICAgICAgICB1cGRhdGluZ0RCUGFzc3dvcmQ6IHRydWUsXG4gICAgICAgIGVycm9yQ29kZTogbnVsbCxcbiAgICAgICAgdXBkYXRlREJQYXNzd29yZEZhaWxlZDogZmFsc2UsXG4gICAgICB9O1xuICAgIGNhc2UgVVBEQVRFX0RBVEFCQVNFX1BBU1NXT1JEX0ZBSUxFRDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB1cGRhdGVEQlBhc3N3b3JkRmFpbGVkOiB0cnVlLFxuICAgICAgICBkYlBhc3N3b3JkVXBkYXRlZDogZmFsc2UsXG4gICAgICAgIHVwZGF0aW5nREJQYXNzd29yZDogZmFsc2UsXG4gICAgICAgIGVycm9yQ29kZTogYWN0aW9uLnBheWxvYWQ/LmVycm9yQ29kZSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBcIkZhaWxlZCB0byB1cGRhdGUgRGF0YWJhc2UgUGFzc3dvcmRcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIENMRUFSX1VQREFURV9EQVRBQkFTRV9QQVNTV09SRF9TVEFURTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB1cGRhdGVEQlBhc3N3b3JkRmFpbGVkOiBmYWxzZSxcbiAgICAgICAgZGJQYXNzd29yZFVwZGF0ZWQ6IGZhbHNlLFxuICAgICAgICB1cGRhdGluZ0RCUGFzc3dvcmQ6IGZhbHNlLFxuICAgICAgICBlcnJvckNvZGU6IG51bGwsXG4gICAgICAgIGVycm9yTWVzc2FnZTogXCJcIixcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVEYXRhYmFzZVBhc3N3b3JkUmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosU0FDRUUsZ0NBQWdDLEVBQ2hDQyxvQ0FBb0MsRUFDcENDLGdDQUFnQyxFQUNoQ0MsK0JBQStCLFFBQzFCLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFOLGFBQUEsR0FBQU8sQ0FBQSxPQUFHO0VBQ25CQyxpQkFBaUIsRUFBRSxLQUFLO0VBQ3hCQyxrQkFBa0IsRUFBRSxLQUFLO0VBQ3pCQyxZQUFZLEVBQUUsRUFBRTtFQUNoQkMsU0FBUyxFQUFFO0FBQ2IsQ0FBQztBQUFDWCxhQUFBLEdBQUFPLENBQUE7QUFFRixNQUFNSyw2QkFBNkIsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBYixhQUFBLEdBQUFjLENBQUEsVUFBR1IsWUFBWSxHQUFFUyxNQUFNLEtBQUs7RUFBQWYsYUFBQSxHQUFBZ0IsQ0FBQTtFQUFBaEIsYUFBQSxHQUFBTyxDQUFBO0VBQ3RFLFFBQVFRLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLYixnQ0FBZ0M7TUFBQUosYUFBQSxHQUFBYyxDQUFBO01BQUU7UUFBQWQsYUFBQSxHQUFBTyxDQUFBO1FBQ3JDLE9BQU87VUFDTCxHQUFHTSxLQUFLO1VBQ1JLLFFBQVEsRUFBRUgsTUFBTSxDQUFDSSxPQUFPO1VBQ3hCQyxzQkFBc0IsRUFBRSxLQUFLO1VBQzdCWixpQkFBaUIsRUFBRSxJQUFJO1VBQ3ZCQyxrQkFBa0IsRUFBRSxLQUFLO1VBQ3pCQyxZQUFZLEVBQUUsRUFBRTtVQUNoQkMsU0FBUyxFQUFFO1FBQ2IsQ0FBQztNQUNIO0lBQ0EsS0FBS1QsZ0NBQWdDO01BQUFGLGFBQUEsR0FBQWMsQ0FBQTtNQUFBZCxhQUFBLEdBQUFPLENBQUE7TUFDbkMsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsaUJBQWlCLEVBQUUsS0FBSztRQUN4QkMsa0JBQWtCLEVBQUUsSUFBSTtRQUN4QkUsU0FBUyxFQUFFLElBQUk7UUFDZlMsc0JBQXNCLEVBQUU7TUFDMUIsQ0FBQztJQUNILEtBQUtmLCtCQUErQjtNQUFBTCxhQUFBLEdBQUFjLENBQUE7TUFBQWQsYUFBQSxHQUFBTyxDQUFBO01BQ2xDLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JPLHNCQUFzQixFQUFFLElBQUk7UUFDNUJaLGlCQUFpQixFQUFFLEtBQUs7UUFDeEJDLGtCQUFrQixFQUFFLEtBQUs7UUFDekJFLFNBQVMsRUFBRUksTUFBTSxDQUFDSSxPQUFPLEVBQUVSLFNBQVM7UUFDcENELFlBQVksRUFBRTtNQUNoQixDQUFDO0lBRUgsS0FBS1Asb0NBQW9DO01BQUFILGFBQUEsR0FBQWMsQ0FBQTtNQUFBZCxhQUFBLEdBQUFPLENBQUE7TUFDdkMsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUk8sc0JBQXNCLEVBQUUsS0FBSztRQUM3QlosaUJBQWlCLEVBQUUsS0FBSztRQUN4QkMsa0JBQWtCLEVBQUUsS0FBSztRQUN6QkUsU0FBUyxFQUFFLElBQUk7UUFDZkQsWUFBWSxFQUFFO01BQ2hCLENBQUM7SUFFSDtNQUFBVixhQUFBLEdBQUFjLENBQUE7TUFBQWQsYUFBQSxHQUFBTyxDQUFBO01BQ0UsT0FBT00sS0FBSztFQUFDO0FBRW5CLENBQUM7QUFFRCxlQUFlRCw2QkFBNkIifQ==