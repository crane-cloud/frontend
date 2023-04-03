function cov_1z6sj4pkcl() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/deleteApp.js";
  var hash = "5cddf12b56508e7c9e0c8201b9447233d76e5685";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/deleteApp.js",
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
          line: 56,
          column: 1
        }
      },
      "2": {
        start: {
          line: 16,
          column: 2
        },
        end: {
          line: 55,
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
          line: 42,
          column: 8
        }
      },
      "6": {
        start: {
          line: 45,
          column: 6
        },
        end: {
          line: 51,
          column: 8
        }
      },
      "7": {
        start: {
          line: 54,
          column: 6
        },
        end: {
          line: 54,
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
            line: 56,
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
            line: 55,
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
            line: 33,
            column: 8
          }
        }, {
          start: {
            line: 35,
            column: 4
          },
          end: {
            line: 42,
            column: 8
          }
        }, {
          start: {
            line: 44,
            column: 4
          },
          end: {
            line: 51,
            column: 8
          }
        }, {
          start: {
            line: 53,
            column: 4
          },
          end: {
            line: 54,
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
    hash: "5cddf12b56508e7c9e0c8201b9447233d76e5685"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1z6sj4pkcl = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1z6sj4pkcl();
import { DELETE_APP_SUCCESS, DELETE_APP_FAIL, START_DELETING_APP, CLEAR_DELETE_APP_STATE } from "../actions/actionTypes";
const initialState = (cov_1z6sj4pkcl().s[0]++, {
  isDeleted: false,
  isDeleting: false,
  isFailed: false,
  message: ""
});
cov_1z6sj4pkcl().s[1]++;
const deleteAppReducer = (state = (cov_1z6sj4pkcl().b[0][0]++, initialState), action) => {
  cov_1z6sj4pkcl().f[0]++;
  cov_1z6sj4pkcl().s[2]++;
  switch (action.type) {
    case START_DELETING_APP:
      cov_1z6sj4pkcl().b[1][0]++;
      cov_1z6sj4pkcl().s[3]++;
      return {
        ...state,
        isDeleting: true,
        isDeleted: false,
        isFailed: false,
        message: ""
      };
    case DELETE_APP_SUCCESS:
      cov_1z6sj4pkcl().b[1][1]++;
      cov_1z6sj4pkcl().s[4]++;
      return {
        ...state,
        isDeleting: false,
        isDeleted: true,
        isFailed: false,
        message: "App Deleted Successfully"
      };
    case DELETE_APP_FAIL:
      cov_1z6sj4pkcl().b[1][2]++;
      cov_1z6sj4pkcl().s[5]++;
      return {
        ...state,
        isDeleting: false,
        isDeleted: false,
        isFailed: true,
        message: "Failed to delete app. Please retry"
      };
    case CLEAR_DELETE_APP_STATE:
      cov_1z6sj4pkcl().b[1][3]++;
      cov_1z6sj4pkcl().s[6]++;
      return {
        ...state,
        isDeleted: false,
        isDeleting: false,
        isFailed: false,
        message: ""
      };
    default:
      cov_1z6sj4pkcl().b[1][4]++;
      cov_1z6sj4pkcl().s[7]++;
      return state;
  }
};
export default deleteAppReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMXo2c2o0cGtjbCIsImFjdHVhbENvdmVyYWdlIiwiREVMRVRFX0FQUF9TVUNDRVNTIiwiREVMRVRFX0FQUF9GQUlMIiwiU1RBUlRfREVMRVRJTkdfQVBQIiwiQ0xFQVJfREVMRVRFX0FQUF9TVEFURSIsImluaXRpYWxTdGF0ZSIsInMiLCJpc0RlbGV0ZWQiLCJpc0RlbGV0aW5nIiwiaXNGYWlsZWQiLCJtZXNzYWdlIiwiZGVsZXRlQXBwUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIl0sInNvdXJjZXMiOlsiZGVsZXRlQXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERFTEVURV9BUFBfU1VDQ0VTUyxcbiAgREVMRVRFX0FQUF9GQUlMLFxuICBTVEFSVF9ERUxFVElOR19BUFAsXG4gIENMRUFSX0RFTEVURV9BUFBfU1RBVEUsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgaXNEZWxldGVkOiBmYWxzZSxcbiAgaXNEZWxldGluZzogZmFsc2UsXG4gIGlzRmFpbGVkOiBmYWxzZSxcbiAgbWVzc2FnZTogXCJcIixcbn07XG5cbmNvbnN0IGRlbGV0ZUFwcFJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBTVEFSVF9ERUxFVElOR19BUFA6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNEZWxldGluZzogdHJ1ZSxcbiAgICAgICAgaXNEZWxldGVkOiBmYWxzZSxcbiAgICAgICAgaXNGYWlsZWQ6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgREVMRVRFX0FQUF9TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzRGVsZXRpbmc6IGZhbHNlLFxuICAgICAgICBpc0RlbGV0ZWQ6IHRydWUsXG4gICAgICAgIGlzRmFpbGVkOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJBcHAgRGVsZXRlZCBTdWNjZXNzZnVsbHlcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIERFTEVURV9BUFBfRkFJTDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc0RlbGV0aW5nOiBmYWxzZSxcbiAgICAgICAgaXNEZWxldGVkOiBmYWxzZSxcbiAgICAgICAgaXNGYWlsZWQ6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGRlbGV0ZSBhcHAuIFBsZWFzZSByZXRyeVwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgQ0xFQVJfREVMRVRFX0FQUF9TVEFURTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc0RlbGV0ZWQ6IGZhbHNlLFxuICAgICAgICBpc0RlbGV0aW5nOiBmYWxzZSxcbiAgICAgICAgaXNGYWlsZWQ6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlbGV0ZUFwcFJlZHVjZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLFNBQ0VFLGtCQUFrQixFQUNsQkMsZUFBZSxFQUNmQyxrQkFBa0IsRUFDbEJDLHNCQUFzQixRQUNqQix3QkFBd0I7QUFFL0IsTUFBTUMsWUFBWSxJQUFBTixjQUFBLEdBQUFPLENBQUEsT0FBRztFQUNuQkMsU0FBUyxFQUFFLEtBQUs7RUFDaEJDLFVBQVUsRUFBRSxLQUFLO0VBQ2pCQyxRQUFRLEVBQUUsS0FBSztFQUNmQyxPQUFPLEVBQUU7QUFDWCxDQUFDO0FBQUNYLGNBQUEsR0FBQU8sQ0FBQTtBQUVGLE1BQU1LLGdCQUFnQixHQUFHQSxDQUFDQyxLQUFLLElBQUFiLGNBQUEsR0FBQWMsQ0FBQSxVQUFHUixZQUFZLEdBQUVTLE1BQU0sS0FBSztFQUFBZixjQUFBLEdBQUFnQixDQUFBO0VBQUFoQixjQUFBLEdBQUFPLENBQUE7RUFDekQsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtiLGtCQUFrQjtNQUFBSixjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ3JCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JKLFVBQVUsRUFBRSxJQUFJO1FBQ2hCRCxTQUFTLEVBQUUsS0FBSztRQUNoQkUsUUFBUSxFQUFFLEtBQUs7UUFDZkMsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtULGtCQUFrQjtNQUFBRixjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ3JCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JKLFVBQVUsRUFBRSxLQUFLO1FBQ2pCRCxTQUFTLEVBQUUsSUFBSTtRQUNmRSxRQUFRLEVBQUUsS0FBSztRQUNmQyxPQUFPLEVBQUU7TUFDWCxDQUFDO0lBRUgsS0FBS1IsZUFBZTtNQUFBSCxjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ2xCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JKLFVBQVUsRUFBRSxLQUFLO1FBQ2pCRCxTQUFTLEVBQUUsS0FBSztRQUNoQkUsUUFBUSxFQUFFLElBQUk7UUFDZEMsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtOLHNCQUFzQjtNQUFBTCxjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ3pCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JMLFNBQVMsRUFBRSxLQUFLO1FBQ2hCQyxVQUFVLEVBQUUsS0FBSztRQUNqQkMsUUFBUSxFQUFFLEtBQUs7UUFDZkMsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVIO01BQUFYLGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUVELGVBQWVELGdCQUFnQiJ9