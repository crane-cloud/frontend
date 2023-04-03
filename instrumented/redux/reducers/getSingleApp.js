function cov_2naoufgw46() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getSingleApp.js";
  var hash = "739c4c35294cdd30745824541251ed8e7e749cf3";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getSingleApp.js",
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
          column: 25
        },
        end: {
          line: 51,
          column: 1
        }
      },
      "2": {
        start: {
          line: 16,
          column: 2
        },
        end: {
          line: 50,
          column: 3
        }
      },
      "3": {
        start: {
          line: 18,
          column: 6
        },
        end: {
          line: 24,
          column: 8
        }
      },
      "4": {
        start: {
          line: 27,
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
          line: 46,
          column: 8
        }
      },
      "7": {
        start: {
          line: 49,
          column: 6
        },
        end: {
          line: 49,
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
            column: 25
          },
          end: {
            line: 15,
            column: 26
          }
        },
        loc: {
          start: {
            line: 15,
            column: 59
          },
          end: {
            line: 51,
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
            column: 26
          },
          end: {
            line: 15,
            column: 46
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 15,
            column: 34
          },
          end: {
            line: 15,
            column: 46
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
            line: 50,
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
            line: 24,
            column: 8
          }
        }, {
          start: {
            line: 26,
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
            line: 46,
            column: 8
          }
        }, {
          start: {
            line: 48,
            column: 4
          },
          end: {
            line: 49,
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
    hash: "739c4c35294cdd30745824541251ed8e7e749cf3"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2naoufgw46 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2naoufgw46();
import { GETTING_SINGLE_APP, SINGLE_APP_FAIL, SINGLE_APP_SUCCESS, CLEAR_FETCH_APP } from "../actions/actionTypes";
const initialState = (cov_2naoufgw46().s[0]++, {
  app: [],
  isRetrieving: false,
  isFetched: false,
  message: "App Not Available"
});
cov_2naoufgw46().s[1]++;
const singleAppReducer = (state = (cov_2naoufgw46().b[0][0]++, initialState), action) => {
  cov_2naoufgw46().f[0]++;
  cov_2naoufgw46().s[2]++;
  switch (action.type) {
    case SINGLE_APP_SUCCESS:
      cov_2naoufgw46().b[1][0]++;
      cov_2naoufgw46().s[3]++;
      return {
        ...state,
        app: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "Single App fetched"
      };
    case GETTING_SINGLE_APP:
      cov_2naoufgw46().b[1][1]++;
      cov_2naoufgw46().s[4]++;
      return {
        ...state,
        isRetrieving: true
      };
    case SINGLE_APP_FAIL:
      cov_2naoufgw46().b[1][2]++;
      cov_2naoufgw46().s[5]++;
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isRetrieving: false
      };
    case CLEAR_FETCH_APP:
      cov_2naoufgw46().b[1][3]++;
      cov_2naoufgw46().s[6]++;
      return {
        ...state,
        isRetrieving: false,
        isFetched: false,
        message: ""
      };
    default:
      cov_2naoufgw46().b[1][4]++;
      cov_2naoufgw46().s[7]++;
      return state;
  }
};
export default singleAppReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMm5hb3VmZ3c0NiIsImFjdHVhbENvdmVyYWdlIiwiR0VUVElOR19TSU5HTEVfQVBQIiwiU0lOR0xFX0FQUF9GQUlMIiwiU0lOR0xFX0FQUF9TVUNDRVNTIiwiQ0xFQVJfRkVUQ0hfQVBQIiwiaW5pdGlhbFN0YXRlIiwicyIsImFwcCIsImlzUmV0cmlldmluZyIsImlzRmV0Y2hlZCIsIm1lc3NhZ2UiLCJzaW5nbGVBcHBSZWR1Y2VyIiwic3RhdGUiLCJiIiwiYWN0aW9uIiwiZiIsInR5cGUiLCJwYXlsb2FkIl0sInNvdXJjZXMiOlsiZ2V0U2luZ2xlQXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEdFVFRJTkdfU0lOR0xFX0FQUCxcbiAgU0lOR0xFX0FQUF9GQUlMLFxuICBTSU5HTEVfQVBQX1NVQ0NFU1MsXG4gIENMRUFSX0ZFVENIX0FQUCxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBhcHA6IFtdLFxuICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICBpc0ZldGNoZWQ6IGZhbHNlLFxuICBtZXNzYWdlOiBcIkFwcCBOb3QgQXZhaWxhYmxlXCIsXG59O1xuXG5jb25zdCBzaW5nbGVBcHBSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgU0lOR0xFX0FQUF9TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGFwcDogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICAgIGlzRmV0Y2hlZDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogXCJTaW5nbGUgQXBwIGZldGNoZWRcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIEdFVFRJTkdfU0lOR0xFX0FQUDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc1JldHJpZXZpbmc6IHRydWUsXG4gICAgICB9O1xuXG4gICAgY2FzZSBTSU5HTEVfQVBQX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVzc2FnZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgY2FzZSBDTEVBUl9GRVRDSF9BUFA6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgICAgICAgaXNGZXRjaGVkOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJcIixcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgc2luZ2xlQXBwUmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FDRUUsa0JBQWtCLEVBQ2xCQyxlQUFlLEVBQ2ZDLGtCQUFrQixFQUNsQkMsZUFBZSxRQUNWLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFOLGNBQUEsR0FBQU8sQ0FBQSxPQUFHO0VBQ25CQyxHQUFHLEVBQUUsRUFBRTtFQUNQQyxZQUFZLEVBQUUsS0FBSztFQUNuQkMsU0FBUyxFQUFFLEtBQUs7RUFDaEJDLE9BQU8sRUFBRTtBQUNYLENBQUM7QUFBQ1gsY0FBQSxHQUFBTyxDQUFBO0FBRUYsTUFBTUssZ0JBQWdCLEdBQUdBLENBQUNDLEtBQUssSUFBQWIsY0FBQSxHQUFBYyxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFmLGNBQUEsR0FBQWdCLENBQUE7RUFBQWhCLGNBQUEsR0FBQU8sQ0FBQTtFQUN6RCxRQUFRUSxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS2Isa0JBQWtCO01BQUFKLGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDckIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsR0FBRyxFQUFFTyxNQUFNLENBQUNHLE9BQU87UUFDbkJULFlBQVksRUFBRSxLQUFLO1FBQ25CQyxTQUFTLEVBQUUsSUFBSTtRQUNmQyxPQUFPLEVBQUU7TUFDWCxDQUFDO0lBRUgsS0FBS1Qsa0JBQWtCO01BQUFGLGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDckIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkosWUFBWSxFQUFFO01BQ2hCLENBQUM7SUFFSCxLQUFLTixlQUFlO01BQUFILGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDbEIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkYsT0FBTyxFQUFFSSxNQUFNLENBQUNHLE9BQU87UUFDdkJSLFNBQVMsRUFBRSxLQUFLO1FBQ2hCRCxZQUFZLEVBQUU7TUFDaEIsQ0FBQztJQUVILEtBQUtKLGVBQWU7TUFBQUwsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUNsQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSSixZQUFZLEVBQUUsS0FBSztRQUNuQkMsU0FBUyxFQUFFLEtBQUs7UUFDaEJDLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSDtNQUFBWCxjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ0UsT0FBT00sS0FBSztFQUFDO0FBRW5CLENBQUM7QUFDRCxlQUFlRCxnQkFBZ0IifQ==