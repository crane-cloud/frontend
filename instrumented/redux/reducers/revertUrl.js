function cov_12inl59by8() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/revertUrl.js";
  var hash = "864407ddbe82f6d6312a7f088648bb7774eef836";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/revertUrl.js",
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
          line: 50,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 49,
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
          line: 29,
          column: 8
        }
      },
      "5": {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 37,
          column: 8
        }
      },
      "6": {
        start: {
          line: 40,
          column: 6
        },
        end: {
          line: 45,
          column: 8
        }
      },
      "7": {
        start: {
          line: 48,
          column: 6
        },
        end: {
          line: 48,
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
            line: 50,
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
            line: 49,
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
            line: 29,
            column: 8
          }
        }, {
          start: {
            line: 31,
            column: 4
          },
          end: {
            line: 37,
            column: 8
          }
        }, {
          start: {
            line: 39,
            column: 4
          },
          end: {
            line: 45,
            column: 8
          }
        }, {
          start: {
            line: 47,
            column: 4
          },
          end: {
            line: 48,
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
    hash: "864407ddbe82f6d6312a7f088648bb7774eef836"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_12inl59by8 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_12inl59by8();
import { REVERT_FAIL, REVERT_SUCCESS, REVERTING_URL, CLEAR_REVERT_STATE } from "../actions/actionTypes";
const initialState = (cov_12inl59by8().s[0]++, {
  app: [],
  isReverting: false,
  isReverted: false,
  message: ""
});
cov_12inl59by8().s[1]++;
const revertUrlReducer = (state = (cov_12inl59by8().b[0][0]++, initialState), action) => {
  cov_12inl59by8().f[0]++;
  cov_12inl59by8().s[2]++;
  switch (action.type) {
    case REVERT_SUCCESS:
      cov_12inl59by8().b[1][0]++;
      cov_12inl59by8().s[3]++;
      return {
        ...state,
        app: action.payload,
        isReverting: false,
        isReverted: true,
        message: "App url has been reverted"
      };
    case REVERTING_URL:
      cov_12inl59by8().b[1][1]++;
      cov_12inl59by8().s[4]++;
      return {
        ...state,
        isReverting: true
      };
    case REVERT_FAIL:
      cov_12inl59by8().b[1][2]++;
      cov_12inl59by8().s[5]++;
      return {
        ...state,
        message: action.payload,
        isReverted: false,
        isReverting: false
      };
    case CLEAR_REVERT_STATE:
      cov_12inl59by8().b[1][3]++;
      cov_12inl59by8().s[6]++;
      return {
        ...state,
        isReverting: false,
        isReverted: false,
        message: ""
      };
    default:
      cov_12inl59by8().b[1][4]++;
      cov_12inl59by8().s[7]++;
      return state;
  }
};
export default revertUrlReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTJpbmw1OWJ5OCIsImFjdHVhbENvdmVyYWdlIiwiUkVWRVJUX0ZBSUwiLCJSRVZFUlRfU1VDQ0VTUyIsIlJFVkVSVElOR19VUkwiLCJDTEVBUl9SRVZFUlRfU1RBVEUiLCJpbml0aWFsU3RhdGUiLCJzIiwiYXBwIiwiaXNSZXZlcnRpbmciLCJpc1JldmVydGVkIiwibWVzc2FnZSIsInJldmVydFVybFJlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJyZXZlcnRVcmwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUkVWRVJUX0ZBSUwsXG4gIFJFVkVSVF9TVUNDRVNTLFxuICBSRVZFUlRJTkdfVVJMLFxuICBDTEVBUl9SRVZFUlRfU1RBVEUsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGFwcDogW10sXG4gIGlzUmV2ZXJ0aW5nOiBmYWxzZSxcbiAgaXNSZXZlcnRlZDogZmFsc2UsXG4gIG1lc3NhZ2U6IFwiXCIsXG59O1xuXG5jb25zdCByZXZlcnRVcmxSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgUkVWRVJUX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgYXBwOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaXNSZXZlcnRpbmc6IGZhbHNlLFxuICAgICAgICBpc1JldmVydGVkOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiBcIkFwcCB1cmwgaGFzIGJlZW4gcmV2ZXJ0ZWRcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIFJFVkVSVElOR19VUkw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNSZXZlcnRpbmc6IHRydWUsXG4gICAgICB9O1xuXG4gICAgY2FzZSBSRVZFUlRfRkFJTDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBtZXNzYWdlOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaXNSZXZlcnRlZDogZmFsc2UsXG4gICAgICAgIGlzUmV2ZXJ0aW5nOiBmYWxzZSxcbiAgICAgIH07XG4gICAgXG4gICAgY2FzZSBDTEVBUl9SRVZFUlRfU1RBVEU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNSZXZlcnRpbmc6IGZhbHNlLFxuICAgICAgICBpc1JldmVydGVkOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJcIixcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgcmV2ZXJ0VXJsUmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FDRUUsV0FBVyxFQUNYQyxjQUFjLEVBQ2RDLGFBQWEsRUFDYkMsa0JBQWtCLFFBQ2Isd0JBQXdCO0FBQy9CLE1BQU1DLFlBQVksSUFBQU4sY0FBQSxHQUFBTyxDQUFBLE9BQUc7RUFDbkJDLEdBQUcsRUFBRSxFQUFFO0VBQ1BDLFdBQVcsRUFBRSxLQUFLO0VBQ2xCQyxVQUFVLEVBQUUsS0FBSztFQUNqQkMsT0FBTyxFQUFFO0FBQ1gsQ0FBQztBQUFDWCxjQUFBLEdBQUFPLENBQUE7QUFFRixNQUFNSyxnQkFBZ0IsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBYixjQUFBLEdBQUFjLENBQUEsVUFBR1IsWUFBWSxHQUFFUyxNQUFNLEtBQUs7RUFBQWYsY0FBQSxHQUFBZ0IsQ0FBQTtFQUFBaEIsY0FBQSxHQUFBTyxDQUFBO0VBQ3pELFFBQVFRLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLZCxjQUFjO01BQUFILGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDakIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsR0FBRyxFQUFFTyxNQUFNLENBQUNHLE9BQU87UUFDbkJULFdBQVcsRUFBRSxLQUFLO1FBQ2xCQyxVQUFVLEVBQUUsSUFBSTtRQUNoQkMsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtQLGFBQWE7TUFBQUosY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUNoQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSSixXQUFXLEVBQUU7TUFDZixDQUFDO0lBRUgsS0FBS1AsV0FBVztNQUFBRixjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ2QsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkYsT0FBTyxFQUFFSSxNQUFNLENBQUNHLE9BQU87UUFDdkJSLFVBQVUsRUFBRSxLQUFLO1FBQ2pCRCxXQUFXLEVBQUU7TUFDZixDQUFDO0lBRUgsS0FBS0osa0JBQWtCO01BQUFMLGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDckIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkosV0FBVyxFQUFFLEtBQUs7UUFDbEJDLFVBQVUsRUFBRSxLQUFLO1FBQ2pCQyxPQUFPLEVBQUU7TUFDWCxDQUFDO0lBRUg7TUFBQVgsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUNFLE9BQU9NLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBQ0QsZUFBZUQsZ0JBQWdCIn0=