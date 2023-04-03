function cov_22z3wqikxs() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/updateProject.js";
  var hash = "d64d6fd7e78f1cf102c6e704d7bcefa246d6b2aa";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/updateProject.js",
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
          column: 29
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
            column: 29
          },
          end: {
            line: 15,
            column: 30
          }
        },
        loc: {
          start: {
            line: 15,
            column: 63
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
            column: 30
          },
          end: {
            line: 15,
            column: 50
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 15,
            column: 38
          },
          end: {
            line: 15,
            column: 50
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
    hash: "d64d6fd7e78f1cf102c6e704d7bcefa246d6b2aa"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_22z3wqikxs = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_22z3wqikxs();
import { START_UPDATING_PROJECT, CLEAR_UPDATE_PROJECT_STATE, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAILED } from "../actions/actionTypes";
const initialState = (cov_22z3wqikxs().s[0]++, {
  isUpdated: false,
  isUpdating: false,
  errorMessage: "",
  errorCode: null
});
cov_22z3wqikxs().s[1]++;
const updateProjectReducer = (state = (cov_22z3wqikxs().b[0][0]++, initialState), action) => {
  cov_22z3wqikxs().f[0]++;
  cov_22z3wqikxs().s[2]++;
  switch (action.type) {
    case UPDATE_PROJECT_SUCCESS:
      cov_22z3wqikxs().b[1][0]++;
      {
        cov_22z3wqikxs().s[3]++;
        return {
          ...state,
          project: action.payload,
          isFailed: false,
          isUpdated: true,
          isUpdating: false,
          errorMessage: "",
          errorCode: null
        };
      }
    case START_UPDATING_PROJECT:
      cov_22z3wqikxs().b[1][1]++;
      cov_22z3wqikxs().s[4]++;
      return {
        ...state,
        isUpdated: false,
        isUpdating: true,
        errorCode: null,
        isFailed: false
      };
    case UPDATE_PROJECT_FAILED:
      cov_22z3wqikxs().b[1][2]++;
      cov_22z3wqikxs().s[5]++;
      return {
        ...state,
        isFailed: true,
        isUpdated: false,
        isUpdating: false,
        errorCode: action.payload?.errorCode,
        errorMessage: "Failed to update Project"
      };
    case CLEAR_UPDATE_PROJECT_STATE:
      cov_22z3wqikxs().b[1][3]++;
      cov_22z3wqikxs().s[6]++;
      return {
        ...state,
        isFailed: false,
        isUpdated: false,
        isUpdating: false,
        errorCode: null,
        errorMessage: ""
      };
    default:
      cov_22z3wqikxs().b[1][4]++;
      cov_22z3wqikxs().s[7]++;
      return state;
  }
};
export default updateProjectReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjJ6M3dxaWt4cyIsImFjdHVhbENvdmVyYWdlIiwiU1RBUlRfVVBEQVRJTkdfUFJPSkVDVCIsIkNMRUFSX1VQREFURV9QUk9KRUNUX1NUQVRFIiwiVVBEQVRFX1BST0pFQ1RfU1VDQ0VTUyIsIlVQREFURV9QUk9KRUNUX0ZBSUxFRCIsImluaXRpYWxTdGF0ZSIsInMiLCJpc1VwZGF0ZWQiLCJpc1VwZGF0aW5nIiwiZXJyb3JNZXNzYWdlIiwiZXJyb3JDb2RlIiwidXBkYXRlUHJvamVjdFJlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInByb2plY3QiLCJwYXlsb2FkIiwiaXNGYWlsZWQiXSwic291cmNlcyI6WyJ1cGRhdGVQcm9qZWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFNUQVJUX1VQREFUSU5HX1BST0pFQ1QsXG4gIENMRUFSX1VQREFURV9QUk9KRUNUX1NUQVRFLFxuICBVUERBVEVfUFJPSkVDVF9TVUNDRVNTLFxuICBVUERBVEVfUFJPSkVDVF9GQUlMRUQsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgaXNVcGRhdGVkOiBmYWxzZSxcbiAgaXNVcGRhdGluZzogZmFsc2UsXG4gIGVycm9yTWVzc2FnZTogXCJcIixcbiAgZXJyb3JDb2RlOiBudWxsLFxufTtcblxuY29uc3QgdXBkYXRlUHJvamVjdFJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBVUERBVEVfUFJPSkVDVF9TVUNDRVNTOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcHJvamVjdDogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzRmFpbGVkOiBmYWxzZSxcbiAgICAgICAgaXNVcGRhdGVkOiB0cnVlLFxuICAgICAgICBpc1VwZGF0aW5nOiBmYWxzZSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBcIlwiLFxuICAgICAgICBlcnJvckNvZGU6IG51bGwsXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlIFNUQVJUX1VQREFUSU5HX1BST0pFQ1Q6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNVcGRhdGVkOiBmYWxzZSxcbiAgICAgICAgaXNVcGRhdGluZzogdHJ1ZSxcbiAgICAgICAgZXJyb3JDb2RlOiBudWxsLFxuICAgICAgICBpc0ZhaWxlZDogZmFsc2UsXG4gICAgICB9O1xuICAgIGNhc2UgVVBEQVRFX1BST0pFQ1RfRkFJTEVEOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzRmFpbGVkOiB0cnVlLFxuICAgICAgICBpc1VwZGF0ZWQ6IGZhbHNlLFxuICAgICAgICBpc1VwZGF0aW5nOiBmYWxzZSxcbiAgICAgICAgZXJyb3JDb2RlOiBhY3Rpb24ucGF5bG9hZD8uZXJyb3JDb2RlLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IFwiRmFpbGVkIHRvIHVwZGF0ZSBQcm9qZWN0XCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBDTEVBUl9VUERBVEVfUFJPSkVDVF9TVEFURTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc0ZhaWxlZDogZmFsc2UsXG4gICAgICAgIGlzVXBkYXRlZDogZmFsc2UsXG4gICAgICAgIGlzVXBkYXRpbmc6IGZhbHNlLFxuICAgICAgICBlcnJvckNvZGU6IG51bGwsXG4gICAgICAgIGVycm9yTWVzc2FnZTogXCJcIixcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVQcm9qZWN0UmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FDRUUsc0JBQXNCLEVBQ3RCQywwQkFBMEIsRUFDMUJDLHNCQUFzQixFQUN0QkMscUJBQXFCLFFBQ2hCLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFOLGNBQUEsR0FBQU8sQ0FBQSxPQUFHO0VBQ25CQyxTQUFTLEVBQUUsS0FBSztFQUNoQkMsVUFBVSxFQUFFLEtBQUs7RUFDakJDLFlBQVksRUFBRSxFQUFFO0VBQ2hCQyxTQUFTLEVBQUU7QUFDYixDQUFDO0FBQUNYLGNBQUEsR0FBQU8sQ0FBQTtBQUVGLE1BQU1LLG9CQUFvQixHQUFHQSxDQUFDQyxLQUFLLElBQUFiLGNBQUEsR0FBQWMsQ0FBQSxVQUFHUixZQUFZLEdBQUVTLE1BQU0sS0FBSztFQUFBZixjQUFBLEdBQUFnQixDQUFBO0VBQUFoQixjQUFBLEdBQUFPLENBQUE7RUFDN0QsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtiLHNCQUFzQjtNQUFBSixjQUFBLEdBQUFjLENBQUE7TUFBRTtRQUFBZCxjQUFBLEdBQUFPLENBQUE7UUFDM0IsT0FBTztVQUNMLEdBQUdNLEtBQUs7VUFDUkssT0FBTyxFQUFFSCxNQUFNLENBQUNJLE9BQU87VUFDdkJDLFFBQVEsRUFBRSxLQUFLO1VBQ2ZaLFNBQVMsRUFBRSxJQUFJO1VBQ2ZDLFVBQVUsRUFBRSxLQUFLO1VBQ2pCQyxZQUFZLEVBQUUsRUFBRTtVQUNoQkMsU0FBUyxFQUFFO1FBQ2IsQ0FBQztNQUNIO0lBQ0EsS0FBS1Qsc0JBQXNCO01BQUFGLGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDekIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsU0FBUyxFQUFFLEtBQUs7UUFDaEJDLFVBQVUsRUFBRSxJQUFJO1FBQ2hCRSxTQUFTLEVBQUUsSUFBSTtRQUNmUyxRQUFRLEVBQUU7TUFDWixDQUFDO0lBQ0gsS0FBS2YscUJBQXFCO01BQUFMLGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDeEIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUk8sUUFBUSxFQUFFLElBQUk7UUFDZFosU0FBUyxFQUFFLEtBQUs7UUFDaEJDLFVBQVUsRUFBRSxLQUFLO1FBQ2pCRSxTQUFTLEVBQUVJLE1BQU0sQ0FBQ0ksT0FBTyxFQUFFUixTQUFTO1FBQ3BDRCxZQUFZLEVBQUU7TUFDaEIsQ0FBQztJQUVILEtBQUtQLDBCQUEwQjtNQUFBSCxjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQzdCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JPLFFBQVEsRUFBRSxLQUFLO1FBQ2ZaLFNBQVMsRUFBRSxLQUFLO1FBQ2hCQyxVQUFVLEVBQUUsS0FBSztRQUNqQkUsU0FBUyxFQUFFLElBQUk7UUFDZkQsWUFBWSxFQUFFO01BQ2hCLENBQUM7SUFFSDtNQUFBVixjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ0UsT0FBT00sS0FBSztFQUFDO0FBRW5CLENBQUM7QUFFRCxlQUFlRCxvQkFBb0IifQ==