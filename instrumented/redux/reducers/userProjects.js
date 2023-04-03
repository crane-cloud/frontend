function cov_itrtw5wc9() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/userProjects.js";
  var hash = "9eec0e21827787a76330b7f73f06a7a05ef09a93";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/userProjects.js",
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
    hash: "9eec0e21827787a76330b7f73f06a7a05ef09a93"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_itrtw5wc9 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_itrtw5wc9();
import { FETCH_USER_PROJECTS_SUCCESS, FETCH_USER_PROJECTS_FAILED, IS_FETCHING } from "../actions/actionTypes";
const initialState = (cov_itrtw5wc9().s[0]++, {
  projects: [],
  isRetrieving: false,
  isFetched: false,
  message: "You have Projects Yet."
});
cov_itrtw5wc9().s[1]++;
const userProjectsReducer = (state = (cov_itrtw5wc9().b[0][0]++, initialState), action) => {
  cov_itrtw5wc9().f[0]++;
  cov_itrtw5wc9().s[2]++;
  switch (action.type) {
    case FETCH_USER_PROJECTS_SUCCESS:
      cov_itrtw5wc9().b[1][0]++;
      cov_itrtw5wc9().s[3]++;
      return {
        ...state,
        projects: action.payload,
        isFetched: true,
        isRetrieving: false,
        message: "All your Projects are fetched"
      };
    case IS_FETCHING:
      cov_itrtw5wc9().b[1][1]++;
      cov_itrtw5wc9().s[4]++;
      return {
        ...state,
        isRetrieving: true,
        isFetched: false
      };
    case FETCH_USER_PROJECTS_FAILED:
      cov_itrtw5wc9().b[1][2]++;
      cov_itrtw5wc9().s[5]++;
      return {
        ...state,
        isFetched: false,
        message: action.payload,
        isRetrieving: false
      };
    default:
      cov_itrtw5wc9().b[1][3]++;
      cov_itrtw5wc9().s[6]++;
      return state;
  }
};
export default userProjectsReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfaXRydHc1d2M5IiwiYWN0dWFsQ292ZXJhZ2UiLCJGRVRDSF9VU0VSX1BST0pFQ1RTX1NVQ0NFU1MiLCJGRVRDSF9VU0VSX1BST0pFQ1RTX0ZBSUxFRCIsIklTX0ZFVENISU5HIiwiaW5pdGlhbFN0YXRlIiwicyIsInByb2plY3RzIiwiaXNSZXRyaWV2aW5nIiwiaXNGZXRjaGVkIiwibWVzc2FnZSIsInVzZXJQcm9qZWN0c1JlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJ1c2VyUHJvamVjdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRkVUQ0hfVVNFUl9QUk9KRUNUU19TVUNDRVNTLFxuICBGRVRDSF9VU0VSX1BST0pFQ1RTX0ZBSUxFRCxcbiAgSVNfRkVUQ0hJTkcsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgcHJvamVjdHM6IFtdLFxuICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICBpc0ZldGNoZWQ6IGZhbHNlLFxuICBtZXNzYWdlOiBcIllvdSBoYXZlIFByb2plY3RzIFlldC5cIixcbn07XG5cbmNvbnN0IHVzZXJQcm9qZWN0c1JlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBGRVRDSF9VU0VSX1BST0pFQ1RTX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcHJvamVjdHM6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc0ZldGNoZWQ6IHRydWUsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6IFwiQWxsIHlvdXIgUHJvamVjdHMgYXJlIGZldGNoZWRcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIElTX0ZFVENISU5HOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzUmV0cmlldmluZzogdHJ1ZSxcbiAgICAgICAgaXNGZXRjaGVkOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIEZFVENIX1VTRVJfUFJPSkVDVFNfRkFJTEVEOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCB1c2VyUHJvamVjdHNSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosU0FDRUUsMkJBQTJCLEVBQzNCQywwQkFBMEIsRUFDMUJDLFdBQVcsUUFDTix3QkFBd0I7QUFFL0IsTUFBTUMsWUFBWSxJQUFBTCxhQUFBLEdBQUFNLENBQUEsT0FBRztFQUNuQkMsUUFBUSxFQUFFLEVBQUU7RUFDWkMsWUFBWSxFQUFFLEtBQUs7RUFDbkJDLFNBQVMsRUFBRSxLQUFLO0VBQ2hCQyxPQUFPLEVBQUU7QUFDWCxDQUFDO0FBQUNWLGFBQUEsR0FBQU0sQ0FBQTtBQUVGLE1BQU1LLG1CQUFtQixHQUFHQSxDQUFDQyxLQUFLLElBQUFaLGFBQUEsR0FBQWEsQ0FBQSxVQUFHUixZQUFZLEdBQUVTLE1BQU0sS0FBSztFQUFBZCxhQUFBLEdBQUFlLENBQUE7RUFBQWYsYUFBQSxHQUFBTSxDQUFBO0VBQzVELFFBQVFRLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLZCwyQkFBMkI7TUFBQUYsYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUM5QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxRQUFRLEVBQUVPLE1BQU0sQ0FBQ0csT0FBTztRQUN4QlIsU0FBUyxFQUFFLElBQUk7UUFDZkQsWUFBWSxFQUFFLEtBQUs7UUFDbkJFLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSCxLQUFLTixXQUFXO01BQUFKLGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDZCxPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSSixZQUFZLEVBQUUsSUFBSTtRQUNsQkMsU0FBUyxFQUFFO01BQ2IsQ0FBQztJQUVILEtBQUtOLDBCQUEwQjtNQUFBSCxhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQzdCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JILFNBQVMsRUFBRSxLQUFLO1FBQ2hCQyxPQUFPLEVBQUVJLE1BQU0sQ0FBQ0csT0FBTztRQUN2QlQsWUFBWSxFQUFFO01BQ2hCLENBQUM7SUFFSDtNQUFBUixhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQ0UsT0FBT00sS0FBSztFQUFDO0FBRW5CLENBQUM7QUFDRCxlQUFlRCxtQkFBbUIifQ==