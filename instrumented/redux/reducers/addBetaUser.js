function cov_21rsbyt5uz() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/addBetaUser.js";
  var hash = "908a52a29bccd77744d4da4dcc3d9aaafa1c3500";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/addBetaUser.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
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
          column: 27
        },
        end: {
          line: 48,
          column: 1
        }
      },
      "2": {
        start: {
          line: 17,
          column: 2
        },
        end: {
          line: 47,
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
          line: 33,
          column: 8
        }
      },
      "5": {
        start: {
          line: 36,
          column: 6
        },
        end: {
          line: 43,
          column: 8
        }
      },
      "6": {
        start: {
          line: 46,
          column: 6
        },
        end: {
          line: 46,
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
            column: 27
          },
          end: {
            line: 16,
            column: 28
          }
        },
        loc: {
          start: {
            line: 16,
            column: 61
          },
          end: {
            line: 48,
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
            column: 28
          },
          end: {
            line: 16,
            column: 48
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 16,
            column: 36
          },
          end: {
            line: 16,
            column: 48
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
            line: 47,
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
            line: 33,
            column: 8
          }
        }, {
          start: {
            line: 35,
            column: 4
          },
          end: {
            line: 43,
            column: 8
          }
        }, {
          start: {
            line: 45,
            column: 4
          },
          end: {
            line: 46,
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
    hash: "908a52a29bccd77744d4da4dcc3d9aaafa1c3500"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_21rsbyt5uz = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_21rsbyt5uz();
import { ADDING_BETA_USER, ADD_BETA_USER_SUCCESS, ADD_BETA_USER_FAIL } from "../actions/actionTypes";
const initialState = (cov_21rsbyt5uz().s[0]++, {
  isAdded: false,
  isFailed: false,
  isAdding: false,
  user: null,
  error: null,
  message: ""
});
cov_21rsbyt5uz().s[1]++;
const addBetaUserReducer = (state = (cov_21rsbyt5uz().b[0][0]++, initialState), action) => {
  cov_21rsbyt5uz().f[0]++;
  cov_21rsbyt5uz().s[2]++;
  switch (action.type) {
    case ADD_BETA_USER_SUCCESS:
      cov_21rsbyt5uz().b[1][0]++;
      cov_21rsbyt5uz().s[3]++;
      return {
        ...state,
        user: action.payload,
        isAdding: false,
        isFailed: false,
        isAdded: true,
        message: "User Added Successfully"
      };
    case ADDING_BETA_USER:
      cov_21rsbyt5uz().b[1][1]++;
      cov_21rsbyt5uz().s[4]++;
      return {
        ...state,
        isAdding: true,
        isAdded: false
      };
    case ADD_BETA_USER_FAIL:
      cov_21rsbyt5uz().b[1][2]++;
      cov_21rsbyt5uz().s[5]++;
      return {
        ...state,
        isFailed: true,
        isAdded: false,
        isAdding: false,
        error: action.payload?.error,
        message: "Failed to add user"
      };
    default:
      cov_21rsbyt5uz().b[1][3]++;
      cov_21rsbyt5uz().s[6]++;
      return state;
  }
};
export default addBetaUserReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjFyc2J5dDV1eiIsImFjdHVhbENvdmVyYWdlIiwiQURESU5HX0JFVEFfVVNFUiIsIkFERF9CRVRBX1VTRVJfU1VDQ0VTUyIsIkFERF9CRVRBX1VTRVJfRkFJTCIsImluaXRpYWxTdGF0ZSIsInMiLCJpc0FkZGVkIiwiaXNGYWlsZWQiLCJpc0FkZGluZyIsInVzZXIiLCJlcnJvciIsIm1lc3NhZ2UiLCJhZGRCZXRhVXNlclJlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJhZGRCZXRhVXNlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBRERJTkdfQkVUQV9VU0VSLFxuICBBRERfQkVUQV9VU0VSX1NVQ0NFU1MsXG4gIEFERF9CRVRBX1VTRVJfRkFJTCxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBpc0FkZGVkOiBmYWxzZSxcbiAgaXNGYWlsZWQ6IGZhbHNlLFxuICBpc0FkZGluZzogZmFsc2UsXG4gIHVzZXI6IG51bGwsXG4gIGVycm9yOiBudWxsLFxuICBtZXNzYWdlOiBcIlwiLFxufTtcblxuY29uc3QgYWRkQmV0YVVzZXJSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQUREX0JFVEFfVVNFUl9TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHVzZXI6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc0FkZGluZzogZmFsc2UsXG4gICAgICAgIGlzRmFpbGVkOiBmYWxzZSxcbiAgICAgICAgaXNBZGRlZDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogXCJVc2VyIEFkZGVkIFN1Y2Nlc3NmdWxseVwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgQURESU5HX0JFVEFfVVNFUjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc0FkZGluZzogdHJ1ZSxcbiAgICAgICAgaXNBZGRlZDogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgY2FzZSBBRERfQkVUQV9VU0VSX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNGYWlsZWQ6IHRydWUsXG4gICAgICAgIGlzQWRkZWQ6IGZhbHNlLFxuICAgICAgICBpc0FkZGluZzogZmFsc2UsXG4gICAgICAgIGVycm9yOiBhY3Rpb24ucGF5bG9hZD8uZXJyb3IsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGFkZCB1c2VyXCIsXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYWRkQmV0YVVzZXJSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FDRUUsZ0JBQWdCLEVBQ2hCQyxxQkFBcUIsRUFDckJDLGtCQUFrQixRQUNiLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFMLGNBQUEsR0FBQU0sQ0FBQSxPQUFHO0VBQ25CQyxPQUFPLEVBQUUsS0FBSztFQUNkQyxRQUFRLEVBQUUsS0FBSztFQUNmQyxRQUFRLEVBQUUsS0FBSztFQUNmQyxJQUFJLEVBQUUsSUFBSTtFQUNWQyxLQUFLLEVBQUUsSUFBSTtFQUNYQyxPQUFPLEVBQUU7QUFDWCxDQUFDO0FBQUNaLGNBQUEsR0FBQU0sQ0FBQTtBQUVGLE1BQU1PLGtCQUFrQixHQUFHQSxDQUFDQyxLQUFLLElBQUFkLGNBQUEsR0FBQWUsQ0FBQSxVQUFHVixZQUFZLEdBQUVXLE1BQU0sS0FBSztFQUFBaEIsY0FBQSxHQUFBaUIsQ0FBQTtFQUFBakIsY0FBQSxHQUFBTSxDQUFBO0VBQzNELFFBQVFVLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLZixxQkFBcUI7TUFBQUgsY0FBQSxHQUFBZSxDQUFBO01BQUFmLGNBQUEsR0FBQU0sQ0FBQTtNQUN4QixPQUFPO1FBQ0wsR0FBR1EsS0FBSztRQUNSSixJQUFJLEVBQUVNLE1BQU0sQ0FBQ0csT0FBTztRQUNwQlYsUUFBUSxFQUFFLEtBQUs7UUFDZkQsUUFBUSxFQUFFLEtBQUs7UUFDZkQsT0FBTyxFQUFFLElBQUk7UUFDYkssT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtWLGdCQUFnQjtNQUFBRixjQUFBLEdBQUFlLENBQUE7TUFBQWYsY0FBQSxHQUFBTSxDQUFBO01BQ25CLE9BQU87UUFDTCxHQUFHUSxLQUFLO1FBQ1JMLFFBQVEsRUFBRSxJQUFJO1FBQ2RGLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSCxLQUFLSCxrQkFBa0I7TUFBQUosY0FBQSxHQUFBZSxDQUFBO01BQUFmLGNBQUEsR0FBQU0sQ0FBQTtNQUNyQixPQUFPO1FBQ0wsR0FBR1EsS0FBSztRQUNSTixRQUFRLEVBQUUsSUFBSTtRQUNkRCxPQUFPLEVBQUUsS0FBSztRQUNkRSxRQUFRLEVBQUUsS0FBSztRQUNmRSxLQUFLLEVBQUVLLE1BQU0sQ0FBQ0csT0FBTyxFQUFFUixLQUFLO1FBQzVCQyxPQUFPLEVBQUU7TUFDWCxDQUFDO0lBRUg7TUFBQVosY0FBQSxHQUFBZSxDQUFBO01BQUFmLGNBQUEsR0FBQU0sQ0FBQTtNQUNFLE9BQU9RLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBRUQsZUFBZUQsa0JBQWtCIn0=