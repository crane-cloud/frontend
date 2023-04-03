function cov_1nhtz3h5m5() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/adminProjects.js";
  var hash = "97260dffad1db9dccfe5f170a31c19c19293abb1";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/adminProjects.js",
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
          column: 29
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
            column: 29
          },
          end: {
            line: 14,
            column: 30
          }
        },
        loc: {
          start: {
            line: 14,
            column: 63
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
            column: 30
          },
          end: {
            line: 14,
            column: 50
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 38
          },
          end: {
            line: 14,
            column: 50
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
    hash: "97260dffad1db9dccfe5f170a31c19c19293abb1"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1nhtz3h5m5 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1nhtz3h5m5();
import { FETCH_ADMIN_PROJECTS_SUCCESS, FETCH_ADMIN_PROJECTS_FAILED, IS_FETCHING } from "../actions/actionTypes";
const initialState = (cov_1nhtz3h5m5().s[0]++, {
  projects: [],
  isRetrieving: false,
  isRetrieved: false,
  message: "No Projects Yet."
});
cov_1nhtz3h5m5().s[1]++;
const adminProjectsReducer = (state = (cov_1nhtz3h5m5().b[0][0]++, initialState), action) => {
  cov_1nhtz3h5m5().f[0]++;
  cov_1nhtz3h5m5().s[2]++;
  switch (action.type) {
    case FETCH_ADMIN_PROJECTS_SUCCESS:
      cov_1nhtz3h5m5().b[1][0]++;
      cov_1nhtz3h5m5().s[3]++;
      return {
        ...state,
        projects: action.payload,
        isRetrieved: true,
        isRetrieving: false,
        message: "All Projects fetched"
      };
    case IS_FETCHING:
      cov_1nhtz3h5m5().b[1][1]++;
      cov_1nhtz3h5m5().s[4]++;
      return {
        ...state,
        isRetrieved: false,
        isRetrieving: true
      };
    case FETCH_ADMIN_PROJECTS_FAILED:
      cov_1nhtz3h5m5().b[1][2]++;
      cov_1nhtz3h5m5().s[5]++;
      return {
        ...state,
        message: action.payload,
        isRetrieved: false,
        isRetrieving: false
      };
    default:
      cov_1nhtz3h5m5().b[1][3]++;
      cov_1nhtz3h5m5().s[6]++;
      return state;
  }
};
export default adminProjectsReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMW5odHozaDVtNSIsImFjdHVhbENvdmVyYWdlIiwiRkVUQ0hfQURNSU5fUFJPSkVDVFNfU1VDQ0VTUyIsIkZFVENIX0FETUlOX1BST0pFQ1RTX0ZBSUxFRCIsIklTX0ZFVENISU5HIiwiaW5pdGlhbFN0YXRlIiwicyIsInByb2plY3RzIiwiaXNSZXRyaWV2aW5nIiwiaXNSZXRyaWV2ZWQiLCJtZXNzYWdlIiwiYWRtaW5Qcm9qZWN0c1JlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJhZG1pblByb2plY3RzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEZFVENIX0FETUlOX1BST0pFQ1RTX1NVQ0NFU1MsXG4gIEZFVENIX0FETUlOX1BST0pFQ1RTX0ZBSUxFRCxcbiAgSVNfRkVUQ0hJTkcsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgcHJvamVjdHM6IFtdLFxuICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICBpc1JldHJpZXZlZDogZmFsc2UsXG4gIG1lc3NhZ2U6IFwiTm8gUHJvamVjdHMgWWV0LlwiLFxufTtcblxuY29uc3QgYWRtaW5Qcm9qZWN0c1JlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBGRVRDSF9BRE1JTl9QUk9KRUNUU19TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHByb2plY3RzOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaXNSZXRyaWV2ZWQ6IHRydWUsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6IFwiQWxsIFByb2plY3RzIGZldGNoZWRcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIElTX0ZFVENISU5HOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzUmV0cmlldmVkOiBmYWxzZSxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiB0cnVlLFxuICAgICAgfTtcblxuICAgIGNhc2UgRkVUQ0hfQURNSU5fUFJPSkVDVFNfRkFJTEVEOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1lc3NhZ2U6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc1JldHJpZXZlZDogZmFsc2UsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGFkbWluUHJvamVjdHNSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FDRUUsNEJBQTRCLEVBQzVCQywyQkFBMkIsRUFDM0JDLFdBQVcsUUFDTix3QkFBd0I7QUFFL0IsTUFBTUMsWUFBWSxJQUFBTCxjQUFBLEdBQUFNLENBQUEsT0FBRztFQUNuQkMsUUFBUSxFQUFFLEVBQUU7RUFDWkMsWUFBWSxFQUFFLEtBQUs7RUFDbkJDLFdBQVcsRUFBRSxLQUFLO0VBQ2xCQyxPQUFPLEVBQUU7QUFDWCxDQUFDO0FBQUNWLGNBQUEsR0FBQU0sQ0FBQTtBQUVGLE1BQU1LLG9CQUFvQixHQUFHQSxDQUFDQyxLQUFLLElBQUFaLGNBQUEsR0FBQWEsQ0FBQSxVQUFHUixZQUFZLEdBQUVTLE1BQU0sS0FBSztFQUFBZCxjQUFBLEdBQUFlLENBQUE7RUFBQWYsY0FBQSxHQUFBTSxDQUFBO0VBQzdELFFBQVFRLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLZCw0QkFBNEI7TUFBQUYsY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUMvQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxRQUFRLEVBQUVPLE1BQU0sQ0FBQ0csT0FBTztRQUN4QlIsV0FBVyxFQUFFLElBQUk7UUFDakJELFlBQVksRUFBRSxLQUFLO1FBQ25CRSxPQUFPLEVBQUU7TUFDWCxDQUFDO0lBRUgsS0FBS04sV0FBVztNQUFBSixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQ2QsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkgsV0FBVyxFQUFFLEtBQUs7UUFDbEJELFlBQVksRUFBRTtNQUNoQixDQUFDO0lBRUgsS0FBS0wsMkJBQTJCO01BQUFILGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDOUIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkYsT0FBTyxFQUFFSSxNQUFNLENBQUNHLE9BQU87UUFDdkJSLFdBQVcsRUFBRSxLQUFLO1FBQ2xCRCxZQUFZLEVBQUU7TUFDaEIsQ0FBQztJQUVIO01BQUFSLGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUNELGVBQWVELG9CQUFvQiJ9