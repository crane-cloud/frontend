function cov_1nd8qx8el5() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getAppLogs.js";
  var hash = "50842d9bd01d93748a2fb5b174c2b0554876732e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getAppLogs.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 21
        },
        end: {
          line: 11,
          column: 1
        }
      },
      "1": {
        start: {
          line: 13,
          column: 23
        },
        end: {
          line: 42,
          column: 1
        }
      },
      "2": {
        start: {
          line: 14,
          column: 2
        },
        end: {
          line: 41,
          column: 3
        }
      },
      "3": {
        start: {
          line: 16,
          column: 6
        },
        end: {
          line: 21,
          column: 8
        }
      },
      "4": {
        start: {
          line: 24,
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
            line: 13,
            column: 23
          },
          end: {
            line: 13,
            column: 24
          }
        },
        loc: {
          start: {
            line: 13,
            column: 57
          },
          end: {
            line: 42,
            column: 1
          }
        },
        line: 13
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 13,
            column: 24
          },
          end: {
            line: 13,
            column: 44
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 13,
            column: 32
          },
          end: {
            line: 13,
            column: 44
          }
        }],
        line: 13
      },
      "1": {
        loc: {
          start: {
            line: 14,
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
            line: 15,
            column: 4
          },
          end: {
            line: 21,
            column: 8
          }
        }, {
          start: {
            line: 23,
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
        line: 14
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
    hash: "50842d9bd01d93748a2fb5b174c2b0554876732e"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1nd8qx8el5 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1nd8qx8el5();
import { GET_APP_LOGS_SUCCESS, GET_APPS_LOGS_FAIL, START_GETTING_APP_LOGS } from "../actions/actionTypes";
const initialState = (cov_1nd8qx8el5().s[0]++, {
  logs: [],
  retrievedLogs: false,
  retrieveingLogs: false
});
cov_1nd8qx8el5().s[1]++;
const appLogsReducer = (state = (cov_1nd8qx8el5().b[0][0]++, initialState), action) => {
  cov_1nd8qx8el5().f[0]++;
  cov_1nd8qx8el5().s[2]++;
  switch (action.type) {
    case GET_APP_LOGS_SUCCESS:
      cov_1nd8qx8el5().b[1][0]++;
      cov_1nd8qx8el5().s[3]++;
      return {
        ...state,
        logs: action.payload,
        retrieveingLogs: false,
        retrievedLogs: true
      };
    case START_GETTING_APP_LOGS:
      cov_1nd8qx8el5().b[1][1]++;
      cov_1nd8qx8el5().s[4]++;
      return {
        ...state,
        logs: [],
        retrievedLogs: false,
        retrieveingLogs: true
      };
    case GET_APPS_LOGS_FAIL:
      cov_1nd8qx8el5().b[1][2]++;
      cov_1nd8qx8el5().s[5]++;
      return {
        ...state,
        logs: [],
        retrieveingLogs: false,
        retrievedLogs: false
      };
    default:
      cov_1nd8qx8el5().b[1][3]++;
      cov_1nd8qx8el5().s[6]++;
      return state;
  }
};
export default appLogsReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMW5kOHF4OGVsNSIsImFjdHVhbENvdmVyYWdlIiwiR0VUX0FQUF9MT0dTX1NVQ0NFU1MiLCJHRVRfQVBQU19MT0dTX0ZBSUwiLCJTVEFSVF9HRVRUSU5HX0FQUF9MT0dTIiwiaW5pdGlhbFN0YXRlIiwicyIsImxvZ3MiLCJyZXRyaWV2ZWRMb2dzIiwicmV0cmlldmVpbmdMb2dzIiwiYXBwTG9nc1JlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJnZXRBcHBMb2dzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEdFVF9BUFBfTE9HU19TVUNDRVNTLFxuICBHRVRfQVBQU19MT0dTX0ZBSUwsXG4gIFNUQVJUX0dFVFRJTkdfQVBQX0xPR1MsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgbG9nczogW10sXG4gIHJldHJpZXZlZExvZ3M6IGZhbHNlLFxuICByZXRyaWV2ZWluZ0xvZ3M6IGZhbHNlLFxufTtcblxuY29uc3QgYXBwTG9nc1JlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBHRVRfQVBQX0xPR1NfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsb2dzOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgcmV0cmlldmVpbmdMb2dzOiBmYWxzZSxcbiAgICAgICAgcmV0cmlldmVkTG9nczogdHJ1ZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIFNUQVJUX0dFVFRJTkdfQVBQX0xPR1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbG9nczogW10sXG4gICAgICAgIHJldHJpZXZlZExvZ3M6IGZhbHNlLFxuICAgICAgICByZXRyaWV2ZWluZ0xvZ3M6IHRydWUsXG4gICAgICB9O1xuXG4gICAgY2FzZSBHRVRfQVBQU19MT0dTX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbG9nczogW10sXG4gICAgICAgIHJldHJpZXZlaW5nTG9nczogZmFsc2UsXG4gICAgICAgIHJldHJpZXZlZExvZ3M6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBhcHBMb2dzUmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLFNBQ0VFLG9CQUFvQixFQUNwQkMsa0JBQWtCLEVBQ2xCQyxzQkFBc0IsUUFDakIsd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQUwsY0FBQSxHQUFBTSxDQUFBLE9BQUc7RUFDbkJDLElBQUksRUFBRSxFQUFFO0VBQ1JDLGFBQWEsRUFBRSxLQUFLO0VBQ3BCQyxlQUFlLEVBQUU7QUFDbkIsQ0FBQztBQUFDVCxjQUFBLEdBQUFNLENBQUE7QUFFRixNQUFNSSxjQUFjLEdBQUdBLENBQUNDLEtBQUssSUFBQVgsY0FBQSxHQUFBWSxDQUFBLFVBQUdQLFlBQVksR0FBRVEsTUFBTSxLQUFLO0VBQUFiLGNBQUEsR0FBQWMsQ0FBQTtFQUFBZCxjQUFBLEdBQUFNLENBQUE7RUFDdkQsUUFBUU8sTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtiLG9CQUFvQjtNQUFBRixjQUFBLEdBQUFZLENBQUE7TUFBQVosY0FBQSxHQUFBTSxDQUFBO01BQ3ZCLE9BQU87UUFDTCxHQUFHSyxLQUFLO1FBQ1JKLElBQUksRUFBRU0sTUFBTSxDQUFDRyxPQUFPO1FBQ3BCUCxlQUFlLEVBQUUsS0FBSztRQUN0QkQsYUFBYSxFQUFFO01BQ2pCLENBQUM7SUFFSCxLQUFLSixzQkFBc0I7TUFBQUosY0FBQSxHQUFBWSxDQUFBO01BQUFaLGNBQUEsR0FBQU0sQ0FBQTtNQUN6QixPQUFPO1FBQ0wsR0FBR0ssS0FBSztRQUNSSixJQUFJLEVBQUUsRUFBRTtRQUNSQyxhQUFhLEVBQUUsS0FBSztRQUNwQkMsZUFBZSxFQUFFO01BQ25CLENBQUM7SUFFSCxLQUFLTixrQkFBa0I7TUFBQUgsY0FBQSxHQUFBWSxDQUFBO01BQUFaLGNBQUEsR0FBQU0sQ0FBQTtNQUNyQixPQUFPO1FBQ0wsR0FBR0ssS0FBSztRQUNSSixJQUFJLEVBQUUsRUFBRTtRQUNSRSxlQUFlLEVBQUUsS0FBSztRQUN0QkQsYUFBYSxFQUFFO01BQ2pCLENBQUM7SUFFSDtNQUFBUixjQUFBLEdBQUFZLENBQUE7TUFBQVosY0FBQSxHQUFBTSxDQUFBO01BQ0UsT0FBT0ssS0FBSztFQUFDO0FBRW5CLENBQUM7QUFDRCxlQUFlRCxjQUFjIn0=