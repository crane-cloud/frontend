function cov_25hgoj4k83() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/pods.js";
  var hash = "bf11c7ab31aea3919dad021ae074ca86fa931e9f";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/pods.js",
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
          column: 20
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
            column: 20
          },
          end: {
            line: 14,
            column: 21
          }
        },
        loc: {
          start: {
            line: 14,
            column: 54
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
            column: 21
          },
          end: {
            line: 14,
            column: 41
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 29
          },
          end: {
            line: 14,
            column: 41
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
    hash: "bf11c7ab31aea3919dad021ae074ca86fa931e9f"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_25hgoj4k83 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_25hgoj4k83();
import { START_GETTING_PODS, GET_PODS_FAIL, GET_PODS_SUCCESS } from "../actions/actionTypes";
const initialState = (cov_25hgoj4k83().s[0]++, {
  pods: {},
  isRetrieving: false,
  isFetched: false,
  message: "Pods Not Available"
});
cov_25hgoj4k83().s[1]++;
const PodsReducer = (state = (cov_25hgoj4k83().b[0][0]++, initialState), action) => {
  cov_25hgoj4k83().f[0]++;
  cov_25hgoj4k83().s[2]++;
  switch (action.type) {
    case GET_PODS_SUCCESS:
      cov_25hgoj4k83().b[1][0]++;
      cov_25hgoj4k83().s[3]++;
      return {
        ...state,
        pods: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "All Pods fetched"
      };
    case START_GETTING_PODS:
      cov_25hgoj4k83().b[1][1]++;
      cov_25hgoj4k83().s[4]++;
      return {
        ...state,
        isFetched: false,
        isRetrieving: true
      };
    case GET_PODS_FAIL:
      cov_25hgoj4k83().b[1][2]++;
      cov_25hgoj4k83().s[5]++;
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isRetrieving: false
      };
    default:
      cov_25hgoj4k83().b[1][3]++;
      cov_25hgoj4k83().s[6]++;
      return state;
  }
};
export default PodsReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjVoZ29qNGs4MyIsImFjdHVhbENvdmVyYWdlIiwiU1RBUlRfR0VUVElOR19QT0RTIiwiR0VUX1BPRFNfRkFJTCIsIkdFVF9QT0RTX1NVQ0NFU1MiLCJpbml0aWFsU3RhdGUiLCJzIiwicG9kcyIsImlzUmV0cmlldmluZyIsImlzRmV0Y2hlZCIsIm1lc3NhZ2UiLCJQb2RzUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicGF5bG9hZCJdLCJzb3VyY2VzIjpbInBvZHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgU1RBUlRfR0VUVElOR19QT0RTLFxuICBHRVRfUE9EU19GQUlMLFxuICBHRVRfUE9EU19TVUNDRVNTLFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHBvZHM6IHt9LFxuICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICBpc0ZldGNoZWQ6IGZhbHNlLFxuICBtZXNzYWdlOiBcIlBvZHMgTm90IEF2YWlsYWJsZVwiLFxufTtcblxuY29uc3QgUG9kc1JlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBHRVRfUE9EU19TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBvZHM6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICAgICAgICBpc0ZldGNoZWQ6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiQWxsIFBvZHMgZmV0Y2hlZFwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgU1RBUlRfR0VUVElOR19QT0RTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgIGlzUmV0cmlldmluZzogdHJ1ZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIEdFVF9QT0RTX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVzc2FnZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IFBvZHNSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FDRUUsa0JBQWtCLEVBQ2xCQyxhQUFhLEVBQ2JDLGdCQUFnQixRQUNYLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFMLGNBQUEsR0FBQU0sQ0FBQSxPQUFHO0VBQ25CQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0VBQ1JDLFlBQVksRUFBRSxLQUFLO0VBQ25CQyxTQUFTLEVBQUUsS0FBSztFQUNoQkMsT0FBTyxFQUFFO0FBQ1gsQ0FBQztBQUFDVixjQUFBLEdBQUFNLENBQUE7QUFFRixNQUFNSyxXQUFXLEdBQUdBLENBQUNDLEtBQUssSUFBQVosY0FBQSxHQUFBYSxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFkLGNBQUEsR0FBQWUsQ0FBQTtFQUFBZixjQUFBLEdBQUFNLENBQUE7RUFDcEQsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtaLGdCQUFnQjtNQUFBSixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQ25CLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JMLElBQUksRUFBRU8sTUFBTSxDQUFDRyxPQUFPO1FBQ3BCVCxZQUFZLEVBQUUsS0FBSztRQUNuQkMsU0FBUyxFQUFFLElBQUk7UUFDZkMsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtSLGtCQUFrQjtNQUFBRixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQ3JCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JILFNBQVMsRUFBRSxLQUFLO1FBQ2hCRCxZQUFZLEVBQUU7TUFDaEIsQ0FBQztJQUVILEtBQUtMLGFBQWE7TUFBQUgsY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUNoQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSRixPQUFPLEVBQUVJLE1BQU0sQ0FBQ0csT0FBTztRQUN2QlIsU0FBUyxFQUFFLEtBQUs7UUFDaEJELFlBQVksRUFBRTtNQUNoQixDQUFDO0lBRUg7TUFBQVIsY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUNFLE9BQU9NLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBQ0QsZUFBZUQsV0FBVyJ9