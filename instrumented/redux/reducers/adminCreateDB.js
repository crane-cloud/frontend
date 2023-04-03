function cov_2pevoaove4() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/adminCreateDB.js";
  var hash = "b1918f95e77e3c8e1594da6841094c8c8ccde387";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/adminCreateDB.js",
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
          column: 29
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
            column: 29
          },
          end: {
            line: 16,
            column: 30
          }
        },
        loc: {
          start: {
            line: 16,
            column: 63
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
            column: 30
          },
          end: {
            line: 16,
            column: 50
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 16,
            column: 38
          },
          end: {
            line: 16,
            column: 50
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
    hash: "b1918f95e77e3c8e1594da6841094c8c8ccde387"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2pevoaove4 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2pevoaove4();
import { ADMIN_CREATE_DATABASE_SUCCESS, ADMIN_CREATE_DATABASE_FAIL, ADMIN_START_CREATING_DATABASE, ADMIN_CLEAR_ADD_DATABASE_STATE } from "../actions/actionTypes";
const initialState = (cov_2pevoaove4().s[0]++, {
  database: null,
  isCreated: false,
  isCreating: false,
  message: "",
  errorCode: null
});
cov_2pevoaove4().s[1]++;
const adminCreateDBReducer = (state = (cov_2pevoaove4().b[0][0]++, initialState), action) => {
  cov_2pevoaove4().f[0]++;
  cov_2pevoaove4().s[2]++;
  switch (action.type) {
    case ADMIN_CREATE_DATABASE_SUCCESS:
      cov_2pevoaove4().b[1][0]++;
      cov_2pevoaove4().s[3]++;
      return {
        ...state,
        database: action.payload,
        isCreating: false,
        isCreated: true,
        message: "Success! Your database has been created.",
        errorCode: null
      };
    case ADMIN_START_CREATING_DATABASE:
      cov_2pevoaove4().b[1][1]++;
      cov_2pevoaove4().s[4]++;
      return {
        ...state,
        database: null,
        isCreating: true,
        isCreated: false,
        message: "",
        errorCode: null
      };
    case ADMIN_CREATE_DATABASE_FAIL:
      cov_2pevoaove4().b[1][2]++;
      cov_2pevoaove4().s[5]++;
      return {
        ...state,
        database: null,
        isCreating: false,
        isCreated: false,
        message: "Failed to create database. Please try again",
        errorCode: action.payload?.errorCode
      };
    case ADMIN_CLEAR_ADD_DATABASE_STATE:
      cov_2pevoaove4().b[1][3]++;
      cov_2pevoaove4().s[6]++;
      return {
        ...state,
        database: null,
        isCreated: false,
        isCreating: false,
        message: "",
        errorCode: null
      };
    default:
      cov_2pevoaove4().b[1][4]++;
      cov_2pevoaove4().s[7]++;
      return state;
  }
};
export default adminCreateDBReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMnBldm9hb3ZlNCIsImFjdHVhbENvdmVyYWdlIiwiQURNSU5fQ1JFQVRFX0RBVEFCQVNFX1NVQ0NFU1MiLCJBRE1JTl9DUkVBVEVfREFUQUJBU0VfRkFJTCIsIkFETUlOX1NUQVJUX0NSRUFUSU5HX0RBVEFCQVNFIiwiQURNSU5fQ0xFQVJfQUREX0RBVEFCQVNFX1NUQVRFIiwiaW5pdGlhbFN0YXRlIiwicyIsImRhdGFiYXNlIiwiaXNDcmVhdGVkIiwiaXNDcmVhdGluZyIsIm1lc3NhZ2UiLCJlcnJvckNvZGUiLCJhZG1pbkNyZWF0ZURCUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicGF5bG9hZCJdLCJzb3VyY2VzIjpbImFkbWluQ3JlYXRlREIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQURNSU5fQ1JFQVRFX0RBVEFCQVNFX1NVQ0NFU1MsXG4gIEFETUlOX0NSRUFURV9EQVRBQkFTRV9GQUlMLFxuICBBRE1JTl9TVEFSVF9DUkVBVElOR19EQVRBQkFTRSxcbiAgQURNSU5fQ0xFQVJfQUREX0RBVEFCQVNFX1NUQVRFLFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGRhdGFiYXNlOiBudWxsLFxuICBpc0NyZWF0ZWQ6IGZhbHNlLFxuICBpc0NyZWF0aW5nOiBmYWxzZSxcbiAgbWVzc2FnZTogXCJcIixcbiAgZXJyb3JDb2RlOiBudWxsLFxufTtcblxuY29uc3QgYWRtaW5DcmVhdGVEQlJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBRE1JTl9DUkVBVEVfREFUQUJBU0VfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkYXRhYmFzZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzQ3JlYXRpbmc6IGZhbHNlLFxuICAgICAgICBpc0NyZWF0ZWQ6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiU3VjY2VzcyEgWW91ciBkYXRhYmFzZSBoYXMgYmVlbiBjcmVhdGVkLlwiLFxuICAgICAgICBlcnJvckNvZGU6IG51bGwsXG4gICAgICB9O1xuXG4gICAgY2FzZSBBRE1JTl9TVEFSVF9DUkVBVElOR19EQVRBQkFTRTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkYXRhYmFzZTogbnVsbCxcbiAgICAgICAgaXNDcmVhdGluZzogdHJ1ZSxcbiAgICAgICAgaXNDcmVhdGVkOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJcIixcbiAgICAgICAgZXJyb3JDb2RlOiBudWxsLFxuICAgICAgfTtcblxuICAgIGNhc2UgQURNSU5fQ1JFQVRFX0RBVEFCQVNFX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGF0YWJhc2U6IG51bGwsXG4gICAgICAgIGlzQ3JlYXRpbmc6IGZhbHNlLFxuICAgICAgICBpc0NyZWF0ZWQ6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byBjcmVhdGUgZGF0YWJhc2UuIFBsZWFzZSB0cnkgYWdhaW5cIixcbiAgICAgICAgZXJyb3JDb2RlOiBhY3Rpb24ucGF5bG9hZD8uZXJyb3JDb2RlLFxuICAgICAgfTtcblxuICAgIGNhc2UgQURNSU5fQ0xFQVJfQUREX0RBVEFCQVNFX1NUQVRFOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRhdGFiYXNlOiBudWxsLFxuICAgICAgICBpc0NyZWF0ZWQ6IGZhbHNlLFxuICAgICAgICBpc0NyZWF0aW5nOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJcIixcbiAgICAgICAgZXJyb3JDb2RlOiBudWxsLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFkbWluQ3JlYXRlREJSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUNFRSw2QkFBNkIsRUFDN0JDLDBCQUEwQixFQUMxQkMsNkJBQTZCLEVBQzdCQyw4QkFBOEIsUUFDekIsd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQU4sY0FBQSxHQUFBTyxDQUFBLE9BQUc7RUFDbkJDLFFBQVEsRUFBRSxJQUFJO0VBQ2RDLFNBQVMsRUFBRSxLQUFLO0VBQ2hCQyxVQUFVLEVBQUUsS0FBSztFQUNqQkMsT0FBTyxFQUFFLEVBQUU7RUFDWEMsU0FBUyxFQUFFO0FBQ2IsQ0FBQztBQUFDWixjQUFBLEdBQUFPLENBQUE7QUFFRixNQUFNTSxvQkFBb0IsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBZCxjQUFBLEdBQUFlLENBQUEsVUFBR1QsWUFBWSxHQUFFVSxNQUFNLEtBQUs7RUFBQWhCLGNBQUEsR0FBQWlCLENBQUE7RUFBQWpCLGNBQUEsR0FBQU8sQ0FBQTtFQUM3RCxRQUFRUyxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS2hCLDZCQUE2QjtNQUFBRixjQUFBLEdBQUFlLENBQUE7TUFBQWYsY0FBQSxHQUFBTyxDQUFBO01BQ2hDLE9BQU87UUFDTCxHQUFHTyxLQUFLO1FBQ1JOLFFBQVEsRUFBRVEsTUFBTSxDQUFDRyxPQUFPO1FBQ3hCVCxVQUFVLEVBQUUsS0FBSztRQUNqQkQsU0FBUyxFQUFFLElBQUk7UUFDZkUsT0FBTyxFQUFFLDBDQUEwQztRQUNuREMsU0FBUyxFQUFFO01BQ2IsQ0FBQztJQUVILEtBQUtSLDZCQUE2QjtNQUFBSixjQUFBLEdBQUFlLENBQUE7TUFBQWYsY0FBQSxHQUFBTyxDQUFBO01BQ2hDLE9BQU87UUFDTCxHQUFHTyxLQUFLO1FBQ1JOLFFBQVEsRUFBRSxJQUFJO1FBQ2RFLFVBQVUsRUFBRSxJQUFJO1FBQ2hCRCxTQUFTLEVBQUUsS0FBSztRQUNoQkUsT0FBTyxFQUFFLEVBQUU7UUFDWEMsU0FBUyxFQUFFO01BQ2IsQ0FBQztJQUVILEtBQUtULDBCQUEwQjtNQUFBSCxjQUFBLEdBQUFlLENBQUE7TUFBQWYsY0FBQSxHQUFBTyxDQUFBO01BQzdCLE9BQU87UUFDTCxHQUFHTyxLQUFLO1FBQ1JOLFFBQVEsRUFBRSxJQUFJO1FBQ2RFLFVBQVUsRUFBRSxLQUFLO1FBQ2pCRCxTQUFTLEVBQUUsS0FBSztRQUNoQkUsT0FBTyxFQUFFLDZDQUE2QztRQUN0REMsU0FBUyxFQUFFSSxNQUFNLENBQUNHLE9BQU8sRUFBRVA7TUFDN0IsQ0FBQztJQUVILEtBQUtQLDhCQUE4QjtNQUFBTCxjQUFBLEdBQUFlLENBQUE7TUFBQWYsY0FBQSxHQUFBTyxDQUFBO01BQ2pDLE9BQU87UUFDTCxHQUFHTyxLQUFLO1FBQ1JOLFFBQVEsRUFBRSxJQUFJO1FBQ2RDLFNBQVMsRUFBRSxLQUFLO1FBQ2hCQyxVQUFVLEVBQUUsS0FBSztRQUNqQkMsT0FBTyxFQUFFLEVBQUU7UUFDWEMsU0FBUyxFQUFFO01BQ2IsQ0FBQztJQUVIO01BQUFaLGNBQUEsR0FBQWUsQ0FBQTtNQUFBZixjQUFBLEdBQUFPLENBQUE7TUFDRSxPQUFPTyxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUVELGVBQWVELG9CQUFvQiJ9