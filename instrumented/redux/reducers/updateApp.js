function cov_19gsl4iy2v() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/updateApp.js";
  var hash = "8c68bad9d875fb5c23d2072731d951e98ef88418";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/updateApp.js",
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
          column: 25
        },
        end: {
          line: 58,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 57,
          column: 3
        }
      },
      "3": {
        start: {
          line: 17,
          column: 6
        },
        end: {
          line: 25,
          column: 8
        }
      },
      "4": {
        start: {
          line: 28,
          column: 6
        },
        end: {
          line: 34,
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
          line: 53,
          column: 8
        }
      },
      "7": {
        start: {
          line: 56,
          column: 6
        },
        end: {
          line: 56,
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
            column: 25
          },
          end: {
            line: 14,
            column: 26
          }
        },
        loc: {
          start: {
            line: 14,
            column: 59
          },
          end: {
            line: 58,
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
            column: 26
          },
          end: {
            line: 14,
            column: 46
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 34
          },
          end: {
            line: 14,
            column: 46
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
            line: 57,
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
            line: 26,
            column: 5
          }
        }, {
          start: {
            line: 27,
            column: 4
          },
          end: {
            line: 34,
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
            line: 53,
            column: 8
          }
        }, {
          start: {
            line: 55,
            column: 4
          },
          end: {
            line: 56,
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
    hash: "8c68bad9d875fb5c23d2072731d951e98ef88418"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_19gsl4iy2v = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_19gsl4iy2v();
import { START_UPDATING_APP, CLEAR_UPDATE_APP_STATE, UPDATE_APP_SUCCESS, UPDATE_APP_FAIL } from "../actions/actionTypes";
const initialState = (cov_19gsl4iy2v().s[0]++, {
  isUpdated: false,
  isUpdating: false,
  errorMessage: "",
  errorCode: null
});
cov_19gsl4iy2v().s[1]++;
const updateAppReducer = (state = (cov_19gsl4iy2v().b[0][0]++, initialState), action) => {
  cov_19gsl4iy2v().f[0]++;
  cov_19gsl4iy2v().s[2]++;
  switch (action.type) {
    case UPDATE_APP_SUCCESS:
      cov_19gsl4iy2v().b[1][0]++;
      {
        cov_19gsl4iy2v().s[3]++;
        return {
          ...state,
          app: action.payload,
          isFailed: false,
          isUpdated: true,
          isUpdating: false,
          errorMessage: "",
          errorCode: null
        };
      }
    case START_UPDATING_APP:
      cov_19gsl4iy2v().b[1][1]++;
      cov_19gsl4iy2v().s[4]++;
      return {
        ...state,
        isUpdated: false,
        isUpdating: true,
        errorCode: null,
        isFailed: false
      };
    case UPDATE_APP_FAIL:
      cov_19gsl4iy2v().b[1][2]++;
      cov_19gsl4iy2v().s[5]++;
      return {
        ...state,
        isFailed: true,
        isUpdated: false,
        isUpdating: false,
        errorCode: action.payload?.errorCode,
        errorMessage: "Failed to update App"
      };
    case CLEAR_UPDATE_APP_STATE:
      cov_19gsl4iy2v().b[1][3]++;
      cov_19gsl4iy2v().s[6]++;
      return {
        ...state,
        isFailed: false,
        isUpdated: false,
        isUpdating: false,
        errorCode: null,
        errorMessage: ""
      };
    default:
      cov_19gsl4iy2v().b[1][4]++;
      cov_19gsl4iy2v().s[7]++;
      return state;
  }
};
export default updateAppReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTlnc2w0aXkydiIsImFjdHVhbENvdmVyYWdlIiwiU1RBUlRfVVBEQVRJTkdfQVBQIiwiQ0xFQVJfVVBEQVRFX0FQUF9TVEFURSIsIlVQREFURV9BUFBfU1VDQ0VTUyIsIlVQREFURV9BUFBfRkFJTCIsImluaXRpYWxTdGF0ZSIsInMiLCJpc1VwZGF0ZWQiLCJpc1VwZGF0aW5nIiwiZXJyb3JNZXNzYWdlIiwiZXJyb3JDb2RlIiwidXBkYXRlQXBwUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwiYXBwIiwicGF5bG9hZCIsImlzRmFpbGVkIl0sInNvdXJjZXMiOlsidXBkYXRlQXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFNUQVJUX1VQREFUSU5HX0FQUCxcbiAgQ0xFQVJfVVBEQVRFX0FQUF9TVEFURSxcbiAgVVBEQVRFX0FQUF9TVUNDRVNTLFxuICBVUERBVEVfQVBQX0ZBSUwsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGlzVXBkYXRlZDogZmFsc2UsXG4gIGlzVXBkYXRpbmc6IGZhbHNlLFxuICBlcnJvck1lc3NhZ2U6IFwiXCIsXG4gIGVycm9yQ29kZTogbnVsbCxcbn07XG5cbmNvbnN0IHVwZGF0ZUFwcFJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBVUERBVEVfQVBQX1NVQ0NFU1M6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBhcHA6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc0ZhaWxlZDogZmFsc2UsXG4gICAgICAgIGlzVXBkYXRlZDogdHJ1ZSxcbiAgICAgICAgaXNVcGRhdGluZzogZmFsc2UsXG4gICAgICAgIGVycm9yTWVzc2FnZTogXCJcIixcbiAgICAgICAgZXJyb3JDb2RlOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSBTVEFSVF9VUERBVElOR19BUFA6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNVcGRhdGVkOiBmYWxzZSxcbiAgICAgICAgaXNVcGRhdGluZzogdHJ1ZSxcbiAgICAgICAgZXJyb3JDb2RlOiBudWxsLFxuICAgICAgICBpc0ZhaWxlZDogZmFsc2UsXG4gICAgICB9O1xuICAgIGNhc2UgVVBEQVRFX0FQUF9GQUlMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzRmFpbGVkOiB0cnVlLFxuICAgICAgICBpc1VwZGF0ZWQ6IGZhbHNlLFxuICAgICAgICBpc1VwZGF0aW5nOiBmYWxzZSxcbiAgICAgICAgZXJyb3JDb2RlOiBhY3Rpb24ucGF5bG9hZD8uZXJyb3JDb2RlLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IFwiRmFpbGVkIHRvIHVwZGF0ZSBBcHBcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIENMRUFSX1VQREFURV9BUFBfU1RBVEU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNGYWlsZWQ6IGZhbHNlLFxuICAgICAgICBpc1VwZGF0ZWQ6IGZhbHNlLFxuICAgICAgICBpc1VwZGF0aW5nOiBmYWxzZSxcbiAgICAgICAgZXJyb3JDb2RlOiBudWxsLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IFwiXCIsXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlQXBwUmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FDRUUsa0JBQWtCLEVBQ2xCQyxzQkFBc0IsRUFDdEJDLGtCQUFrQixFQUNsQkMsZUFBZSxRQUNWLHdCQUF3QjtBQUMvQixNQUFNQyxZQUFZLElBQUFOLGNBQUEsR0FBQU8sQ0FBQSxPQUFHO0VBQ25CQyxTQUFTLEVBQUUsS0FBSztFQUNoQkMsVUFBVSxFQUFFLEtBQUs7RUFDakJDLFlBQVksRUFBRSxFQUFFO0VBQ2hCQyxTQUFTLEVBQUU7QUFDYixDQUFDO0FBQUNYLGNBQUEsR0FBQU8sQ0FBQTtBQUVGLE1BQU1LLGdCQUFnQixHQUFHQSxDQUFDQyxLQUFLLElBQUFiLGNBQUEsR0FBQWMsQ0FBQSxVQUFHUixZQUFZLEdBQUVTLE1BQU0sS0FBSztFQUFBZixjQUFBLEdBQUFnQixDQUFBO0VBQUFoQixjQUFBLEdBQUFPLENBQUE7RUFDekQsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtiLGtCQUFrQjtNQUFBSixjQUFBLEdBQUFjLENBQUE7TUFBRTtRQUFBZCxjQUFBLEdBQUFPLENBQUE7UUFDdkIsT0FBTztVQUNMLEdBQUdNLEtBQUs7VUFDUkssR0FBRyxFQUFFSCxNQUFNLENBQUNJLE9BQU87VUFDbkJDLFFBQVEsRUFBRSxLQUFLO1VBQ2ZaLFNBQVMsRUFBRSxJQUFJO1VBQ2ZDLFVBQVUsRUFBRSxLQUFLO1VBQ2pCQyxZQUFZLEVBQUUsRUFBRTtVQUNoQkMsU0FBUyxFQUFFO1FBQ2IsQ0FBQztNQUNIO0lBQ0EsS0FBS1Qsa0JBQWtCO01BQUFGLGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDckIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsU0FBUyxFQUFFLEtBQUs7UUFDaEJDLFVBQVUsRUFBRSxJQUFJO1FBQ2hCRSxTQUFTLEVBQUUsSUFBSTtRQUNmUyxRQUFRLEVBQUU7TUFDWixDQUFDO0lBQ0gsS0FBS2YsZUFBZTtNQUFBTCxjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ2xCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JPLFFBQVEsRUFBRSxJQUFJO1FBQ2RaLFNBQVMsRUFBRSxLQUFLO1FBQ2hCQyxVQUFVLEVBQUUsS0FBSztRQUNqQkUsU0FBUyxFQUFFSSxNQUFNLENBQUNJLE9BQU8sRUFBRVIsU0FBUztRQUNwQ0QsWUFBWSxFQUFFO01BQ2hCLENBQUM7SUFFSCxLQUFLUCxzQkFBc0I7TUFBQUgsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUN6QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTyxRQUFRLEVBQUUsS0FBSztRQUNmWixTQUFTLEVBQUUsS0FBSztRQUNoQkMsVUFBVSxFQUFFLEtBQUs7UUFDakJFLFNBQVMsRUFBRSxJQUFJO1FBQ2ZELFlBQVksRUFBRTtNQUNoQixDQUFDO0lBRUg7TUFBQVYsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUNFLE9BQU9NLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBRUQsZUFBZUQsZ0JBQWdCIn0=