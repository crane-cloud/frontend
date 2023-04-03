function cov_2d237v7ba8() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/projectsList.js";
  var hash = "9decaf9b196eed94b6a3324fb3f8147bac8d584b";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/projectsList.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 21
        },
        end: {
          line: 11,
          column: 1
        }
      },
      "1": {
        start: {
          line: 13,
          column: 28
        },
        end: {
          line: 39,
          column: 1
        }
      },
      "2": {
        start: {
          line: 14,
          column: 2
        },
        end: {
          line: 38,
          column: 3
        }
      },
      "3": {
        start: {
          line: 16,
          column: 6
        },
        end: {
          line: 21,
          column: 8
        }
      },
      "4": {
        start: {
          line: 24,
          column: 6
        },
        end: {
          line: 27,
          column: 8
        }
      },
      "5": {
        start: {
          line: 30,
          column: 6
        },
        end: {
          line: 34,
          column: 8
        }
      },
      "6": {
        start: {
          line: 37,
          column: 6
        },
        end: {
          line: 37,
          column: 19
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 13,
            column: 28
          },
          end: {
            line: 13,
            column: 29
          }
        },
        loc: {
          start: {
            line: 13,
            column: 62
          },
          end: {
            line: 39,
            column: 1
          }
        },
        line: 13
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 13,
            column: 29
          },
          end: {
            line: 13,
            column: 49
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 13,
            column: 37
          },
          end: {
            line: 13,
            column: 49
          }
        }],
        line: 13
      },
      "1": {
        loc: {
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 38,
            column: 3
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 15,
            column: 4
          },
          end: {
            line: 21,
            column: 8
          }
        }, {
          start: {
            line: 23,
            column: 4
          },
          end: {
            line: 27,
            column: 8
          }
        }, {
          start: {
            line: 29,
            column: 4
          },
          end: {
            line: 34,
            column: 8
          }
        }, {
          start: {
            line: 36,
            column: 4
          },
          end: {
            line: 37,
            column: 19
          }
        }],
        line: 14
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
    hash: "9decaf9b196eed94b6a3324fb3f8147bac8d584b"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2d237v7ba8 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2d237v7ba8();
import { FETCH_USER_PROJECTS_SUCCESS, FETCH_USER_PROJECTS_FAILED, IS_FETCHING } from "../actions/actionTypes";
const initialState = (cov_2d237v7ba8().s[0]++, {
  projects: [],
  isRetrieving: false,
  message: "You have Projects Yet."
});
cov_2d237v7ba8().s[1]++;
const ProjectsListReducer = (state = (cov_2d237v7ba8().b[0][0]++, initialState), action) => {
  cov_2d237v7ba8().f[0]++;
  cov_2d237v7ba8().s[2]++;
  switch (action.type) {
    case FETCH_USER_PROJECTS_SUCCESS:
      cov_2d237v7ba8().b[1][0]++;
      cov_2d237v7ba8().s[3]++;
      return {
        ...state,
        projects: action.payload,
        isRetrieving: false,
        message: "All your Projects are fetched"
      };
    case IS_FETCHING:
      cov_2d237v7ba8().b[1][1]++;
      cov_2d237v7ba8().s[4]++;
      return {
        ...state,
        isRetrieving: true
      };
    case FETCH_USER_PROJECTS_FAILED:
      cov_2d237v7ba8().b[1][2]++;
      cov_2d237v7ba8().s[5]++;
      return {
        ...state,
        message: action.payload,
        isRetrieving: false
      };
    default:
      cov_2d237v7ba8().b[1][3]++;
      cov_2d237v7ba8().s[6]++;
      return state;
  }
};
export default ProjectsListReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMmQyMzd2N2JhOCIsImFjdHVhbENvdmVyYWdlIiwiRkVUQ0hfVVNFUl9QUk9KRUNUU19TVUNDRVNTIiwiRkVUQ0hfVVNFUl9QUk9KRUNUU19GQUlMRUQiLCJJU19GRVRDSElORyIsImluaXRpYWxTdGF0ZSIsInMiLCJwcm9qZWN0cyIsImlzUmV0cmlldmluZyIsIm1lc3NhZ2UiLCJQcm9qZWN0c0xpc3RSZWR1Y2VyIiwic3RhdGUiLCJiIiwiYWN0aW9uIiwiZiIsInR5cGUiLCJwYXlsb2FkIl0sInNvdXJjZXMiOlsicHJvamVjdHNMaXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEZFVENIX1VTRVJfUFJPSkVDVFNfU1VDQ0VTUyxcbiAgRkVUQ0hfVVNFUl9QUk9KRUNUU19GQUlMRUQsXG4gIElTX0ZFVENISU5HLFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHByb2plY3RzOiBbXSxcbiAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgbWVzc2FnZTogXCJZb3UgaGF2ZSBQcm9qZWN0cyBZZXQuXCIsXG59O1xuXG5jb25zdCBQcm9qZWN0c0xpc3RSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgRkVUQ0hfVVNFUl9QUk9KRUNUU19TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHByb2plY3RzOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJBbGwgeW91ciBQcm9qZWN0cyBhcmUgZmV0Y2hlZFwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgSVNfRkVUQ0hJTkc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiB0cnVlLFxuICAgICAgfTtcblxuICAgIGNhc2UgRkVUQ0hfVVNFUl9QUk9KRUNUU19GQUlMRUQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVzc2FnZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IFByb2plY3RzTGlzdFJlZHVjZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUNFRSwyQkFBMkIsRUFDM0JDLDBCQUEwQixFQUMxQkMsV0FBVyxRQUNOLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFMLGNBQUEsR0FBQU0sQ0FBQSxPQUFHO0VBQ25CQyxRQUFRLEVBQUUsRUFBRTtFQUNaQyxZQUFZLEVBQUUsS0FBSztFQUNuQkMsT0FBTyxFQUFFO0FBQ1gsQ0FBQztBQUFDVCxjQUFBLEdBQUFNLENBQUE7QUFFRixNQUFNSSxtQkFBbUIsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBWCxjQUFBLEdBQUFZLENBQUEsVUFBR1AsWUFBWSxHQUFFUSxNQUFNLEtBQUs7RUFBQWIsY0FBQSxHQUFBYyxDQUFBO0VBQUFkLGNBQUEsR0FBQU0sQ0FBQTtFQUM1RCxRQUFRTyxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS2IsMkJBQTJCO01BQUFGLGNBQUEsR0FBQVksQ0FBQTtNQUFBWixjQUFBLEdBQUFNLENBQUE7TUFDOUIsT0FBTztRQUNMLEdBQUdLLEtBQUs7UUFDUkosUUFBUSxFQUFFTSxNQUFNLENBQUNHLE9BQU87UUFDeEJSLFlBQVksRUFBRSxLQUFLO1FBQ25CQyxPQUFPLEVBQUU7TUFDWCxDQUFDO0lBRUgsS0FBS0wsV0FBVztNQUFBSixjQUFBLEdBQUFZLENBQUE7TUFBQVosY0FBQSxHQUFBTSxDQUFBO01BQ2QsT0FBTztRQUNMLEdBQUdLLEtBQUs7UUFDUkgsWUFBWSxFQUFFO01BQ2hCLENBQUM7SUFFSCxLQUFLTCwwQkFBMEI7TUFBQUgsY0FBQSxHQUFBWSxDQUFBO01BQUFaLGNBQUEsR0FBQU0sQ0FBQTtNQUM3QixPQUFPO1FBQ0wsR0FBR0ssS0FBSztRQUNSRixPQUFPLEVBQUVJLE1BQU0sQ0FBQ0csT0FBTztRQUN2QlIsWUFBWSxFQUFFO01BQ2hCLENBQUM7SUFFSDtNQUFBUixjQUFBLEdBQUFZLENBQUE7TUFBQVosY0FBQSxHQUFBTSxDQUFBO01BQ0UsT0FBT0ssS0FBSztFQUFDO0FBRW5CLENBQUM7QUFDRCxlQUFlRCxtQkFBbUIifQ==