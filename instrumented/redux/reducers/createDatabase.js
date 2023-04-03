function cov_201kesuy66() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/createDatabase.js";
  var hash = "e42d0a6ef50a6d033af5172cbe477f049ac4c780";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/createDatabase.js",
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
          column: 30
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
            column: 30
          },
          end: {
            line: 16,
            column: 31
          }
        },
        loc: {
          start: {
            line: 16,
            column: 64
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
            column: 31
          },
          end: {
            line: 16,
            column: 51
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 16,
            column: 39
          },
          end: {
            line: 16,
            column: 51
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
    hash: "e42d0a6ef50a6d033af5172cbe477f049ac4c780"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_201kesuy66 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_201kesuy66();
import { CREATE_DATABASE_SUCCESS, CREATE_DATABASE_FAIL, START_CREATING_DATABASE, CLEAR_ADD_DATABASE_STATE } from "../actions/actionTypes";
const initialState = (cov_201kesuy66().s[0]++, {
  database: null,
  isCreated: false,
  isCreating: false,
  message: "",
  errorCode: null
});
cov_201kesuy66().s[1]++;
const createDatabaseReducer = (state = (cov_201kesuy66().b[0][0]++, initialState), action) => {
  cov_201kesuy66().f[0]++;
  cov_201kesuy66().s[2]++;
  switch (action.type) {
    case CREATE_DATABASE_SUCCESS:
      cov_201kesuy66().b[1][0]++;
      cov_201kesuy66().s[3]++;
      return {
        ...state,
        database: action.payload,
        isCreating: false,
        isCreated: true,
        message: "Success! Your database has been created.",
        errorCode: null
      };
    case START_CREATING_DATABASE:
      cov_201kesuy66().b[1][1]++;
      cov_201kesuy66().s[4]++;
      return {
        ...state,
        database: null,
        isCreating: true,
        isCreated: false,
        message: "",
        errorCode: null
      };
    case CREATE_DATABASE_FAIL:
      cov_201kesuy66().b[1][2]++;
      cov_201kesuy66().s[5]++;
      return {
        ...state,
        database: null,
        isCreating: false,
        isCreated: false,
        message: "Failed to create database. Please try again",
        errorCode: action.payload?.errorCode
      };
    case CLEAR_ADD_DATABASE_STATE:
      cov_201kesuy66().b[1][3]++;
      cov_201kesuy66().s[6]++;
      return {
        ...state,
        database: null,
        isCreated: false,
        isCreating: false,
        message: "",
        errorCode: null
      };
    default:
      cov_201kesuy66().b[1][4]++;
      cov_201kesuy66().s[7]++;
      return state;
  }
};
export default createDatabaseReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjAxa2VzdXk2NiIsImFjdHVhbENvdmVyYWdlIiwiQ1JFQVRFX0RBVEFCQVNFX1NVQ0NFU1MiLCJDUkVBVEVfREFUQUJBU0VfRkFJTCIsIlNUQVJUX0NSRUFUSU5HX0RBVEFCQVNFIiwiQ0xFQVJfQUREX0RBVEFCQVNFX1NUQVRFIiwiaW5pdGlhbFN0YXRlIiwicyIsImRhdGFiYXNlIiwiaXNDcmVhdGVkIiwiaXNDcmVhdGluZyIsIm1lc3NhZ2UiLCJlcnJvckNvZGUiLCJjcmVhdGVEYXRhYmFzZVJlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJjcmVhdGVEYXRhYmFzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDUkVBVEVfREFUQUJBU0VfU1VDQ0VTUyxcbiAgQ1JFQVRFX0RBVEFCQVNFX0ZBSUwsXG4gIFNUQVJUX0NSRUFUSU5HX0RBVEFCQVNFLFxuICBDTEVBUl9BRERfREFUQUJBU0VfU1RBVEUsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZGF0YWJhc2U6IG51bGwsXG4gIGlzQ3JlYXRlZDogZmFsc2UsXG4gIGlzQ3JlYXRpbmc6IGZhbHNlLFxuICBtZXNzYWdlOiBcIlwiLFxuICBlcnJvckNvZGU6IG51bGwsXG59O1xuXG5jb25zdCBjcmVhdGVEYXRhYmFzZVJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBDUkVBVEVfREFUQUJBU0VfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkYXRhYmFzZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzQ3JlYXRpbmc6IGZhbHNlLFxuICAgICAgICBpc0NyZWF0ZWQ6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiU3VjY2VzcyEgWW91ciBkYXRhYmFzZSBoYXMgYmVlbiBjcmVhdGVkLlwiLFxuICAgICAgICBlcnJvckNvZGU6IG51bGwsXG4gICAgICB9O1xuXG4gICAgY2FzZSBTVEFSVF9DUkVBVElOR19EQVRBQkFTRTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkYXRhYmFzZTogbnVsbCxcbiAgICAgICAgaXNDcmVhdGluZzogdHJ1ZSxcbiAgICAgICAgaXNDcmVhdGVkOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJcIixcbiAgICAgICAgZXJyb3JDb2RlOiBudWxsLFxuICAgICAgfTtcblxuICAgIGNhc2UgQ1JFQVRFX0RBVEFCQVNFX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGF0YWJhc2U6IG51bGwsXG4gICAgICAgIGlzQ3JlYXRpbmc6IGZhbHNlLFxuICAgICAgICBpc0NyZWF0ZWQ6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byBjcmVhdGUgZGF0YWJhc2UuIFBsZWFzZSB0cnkgYWdhaW5cIixcbiAgICAgICAgZXJyb3JDb2RlOiBhY3Rpb24ucGF5bG9hZD8uZXJyb3JDb2RlLFxuICAgICAgfTtcblxuICAgIGNhc2UgQ0xFQVJfQUREX0RBVEFCQVNFX1NUQVRFOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRhdGFiYXNlOiBudWxsLFxuICAgICAgICBpc0NyZWF0ZWQ6IGZhbHNlLFxuICAgICAgICBpc0NyZWF0aW5nOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJcIixcbiAgICAgICAgZXJyb3JDb2RlOiBudWxsLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURhdGFiYXNlUmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7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