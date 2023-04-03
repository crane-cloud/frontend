function cov_vgx72p06w() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/addProject.js";
  var hash = "be6cb2f6c60072f8e31a96f3b42a50e9e8de5b5b";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/addProject.js",
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
          column: 26
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
            column: 26
          },
          end: {
            line: 15,
            column: 27
          }
        },
        loc: {
          start: {
            line: 15,
            column: 60
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
            column: 27
          },
          end: {
            line: 15,
            column: 47
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 15,
            column: 35
          },
          end: {
            line: 15,
            column: 47
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
    hash: "be6cb2f6c60072f8e31a96f3b42a50e9e8de5b5b"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_vgx72p06w = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_vgx72p06w();
import { START_ADDING_PROJECT, CLEAR_ADD_PROJECT_STATE, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILED } from "../actions/actionTypes";
const initialState = (cov_vgx72p06w().s[0]++, {
  isAdded: false,
  isAdding: false,
  message: "",
  errorCode: null
});
cov_vgx72p06w().s[1]++;
const addProjectReducer = (state = (cov_vgx72p06w().b[0][0]++, initialState), action) => {
  cov_vgx72p06w().f[0]++;
  cov_vgx72p06w().s[2]++;
  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
      cov_vgx72p06w().b[1][0]++;
      {
        cov_vgx72p06w().s[3]++;
        return {
          ...state,
          project: action.payload,
          isFailed: false,
          isAdded: true,
          isAdding: false,
          message: "Project Added SuccessFully",
          errorCode: null
        };
      }
    case START_ADDING_PROJECT:
      cov_vgx72p06w().b[1][1]++;
      cov_vgx72p06w().s[4]++;
      return {
        ...state,
        isAdded: false,
        isAdding: true,
        errorCode: null,
        isFailed: false
      };
    case ADD_PROJECT_FAILED:
      cov_vgx72p06w().b[1][2]++;
      cov_vgx72p06w().s[5]++;
      return {
        ...state,
        isFailed: true,
        isAdded: false,
        isAdding: false,
        errorCode: action.payload?.errorCode,
        message: "Failed to add Project"
      };
    case CLEAR_ADD_PROJECT_STATE:
      cov_vgx72p06w().b[1][3]++;
      cov_vgx72p06w().s[6]++;
      return {
        ...state,
        isFailed: false,
        isAdded: false,
        isAdding: false,
        errorCode: null,
        message: ""
      };
    default:
      cov_vgx72p06w().b[1][4]++;
      cov_vgx72p06w().s[7]++;
      return state;
  }
};
export default addProjectReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3Zfdmd4NzJwMDZ3IiwiYWN0dWFsQ292ZXJhZ2UiLCJTVEFSVF9BRERJTkdfUFJPSkVDVCIsIkNMRUFSX0FERF9QUk9KRUNUX1NUQVRFIiwiQUREX1BST0pFQ1RfU1VDQ0VTUyIsIkFERF9QUk9KRUNUX0ZBSUxFRCIsImluaXRpYWxTdGF0ZSIsInMiLCJpc0FkZGVkIiwiaXNBZGRpbmciLCJtZXNzYWdlIiwiZXJyb3JDb2RlIiwiYWRkUHJvamVjdFJlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInByb2plY3QiLCJwYXlsb2FkIiwiaXNGYWlsZWQiXSwic291cmNlcyI6WyJhZGRQcm9qZWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFNUQVJUX0FERElOR19QUk9KRUNULFxuICBDTEVBUl9BRERfUFJPSkVDVF9TVEFURSxcbiAgQUREX1BST0pFQ1RfU1VDQ0VTUyxcbiAgQUREX1BST0pFQ1RfRkFJTEVELFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGlzQWRkZWQ6IGZhbHNlLFxuICBpc0FkZGluZzogZmFsc2UsXG4gIG1lc3NhZ2U6IFwiXCIsXG4gIGVycm9yQ29kZTogbnVsbCxcbn07XG5cbmNvbnN0IGFkZFByb2plY3RSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQUREX1BST0pFQ1RfU1VDQ0VTUzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHByb2plY3Q6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc0ZhaWxlZDogZmFsc2UsXG4gICAgICAgIGlzQWRkZWQ6IHRydWUsXG4gICAgICAgIGlzQWRkaW5nOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJQcm9qZWN0IEFkZGVkIFN1Y2Nlc3NGdWxseVwiLFxuICAgICAgICBlcnJvckNvZGU6IG51bGwsXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlIFNUQVJUX0FERElOR19QUk9KRUNUOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzQWRkZWQ6IGZhbHNlLFxuICAgICAgICBpc0FkZGluZzogdHJ1ZSxcbiAgICAgICAgZXJyb3JDb2RlOiBudWxsLFxuICAgICAgICBpc0ZhaWxlZDogZmFsc2UsXG4gICAgICB9O1xuICAgIGNhc2UgQUREX1BST0pFQ1RfRkFJTEVEOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzRmFpbGVkOiB0cnVlLFxuICAgICAgICBpc0FkZGVkOiBmYWxzZSxcbiAgICAgICAgaXNBZGRpbmc6IGZhbHNlLFxuICAgICAgICBlcnJvckNvZGU6IGFjdGlvbi5wYXlsb2FkPy5lcnJvckNvZGUsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGFkZCBQcm9qZWN0XCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBDTEVBUl9BRERfUFJPSkVDVF9TVEFURTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc0ZhaWxlZDogZmFsc2UsXG4gICAgICAgIGlzQWRkZWQ6IGZhbHNlLFxuICAgICAgICBpc0FkZGluZzogZmFsc2UsXG4gICAgICAgIGVycm9yQ29kZTogbnVsbCxcbiAgICAgICAgbWVzc2FnZTogXCJcIixcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGRQcm9qZWN0UmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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