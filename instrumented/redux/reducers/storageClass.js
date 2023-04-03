function cov_dxsowqfuw() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/storageClass.js";
  var hash = "18bc7f32eaecdff063eee044aa6671c3aa856af7";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/storageClass.js",
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
          column: 30
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
            column: 30
          },
          end: {
            line: 14,
            column: 31
          }
        },
        loc: {
          start: {
            line: 14,
            column: 64
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
            column: 31
          },
          end: {
            line: 14,
            column: 51
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 39
          },
          end: {
            line: 14,
            column: 51
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
    hash: "18bc7f32eaecdff063eee044aa6671c3aa856af7"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_dxsowqfuw = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_dxsowqfuw();
import { START_GETTING_STORAGE_CLASS, GET_STORAGE_CLASS_FAIL, GET_STORAGE_CLASS_SUCCESS } from "../actions/actionTypes";
const initialState = (cov_dxsowqfuw().s[0]++, {
  storageClasses: {},
  isRetrieving: false,
  isFetched: false,
  message: "Storage Classes Not Available"
});
cov_dxsowqfuw().s[1]++;
const storageClassesReducer = (state = (cov_dxsowqfuw().b[0][0]++, initialState), action) => {
  cov_dxsowqfuw().f[0]++;
  cov_dxsowqfuw().s[2]++;
  switch (action.type) {
    case GET_STORAGE_CLASS_SUCCESS:
      cov_dxsowqfuw().b[1][0]++;
      cov_dxsowqfuw().s[3]++;
      return {
        ...state,
        storageClasses: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "All Storage Classes fetched"
      };
    case START_GETTING_STORAGE_CLASS:
      cov_dxsowqfuw().b[1][1]++;
      cov_dxsowqfuw().s[4]++;
      return {
        ...state,
        isFetched: false,
        isRetrieving: true
      };
    case GET_STORAGE_CLASS_FAIL:
      cov_dxsowqfuw().b[1][2]++;
      cov_dxsowqfuw().s[5]++;
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isRetrieving: false
      };
    default:
      cov_dxsowqfuw().b[1][3]++;
      cov_dxsowqfuw().s[6]++;
      return state;
  }
};
export default storageClassesReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfZHhzb3dxZnV3IiwiYWN0dWFsQ292ZXJhZ2UiLCJTVEFSVF9HRVRUSU5HX1NUT1JBR0VfQ0xBU1MiLCJHRVRfU1RPUkFHRV9DTEFTU19GQUlMIiwiR0VUX1NUT1JBR0VfQ0xBU1NfU1VDQ0VTUyIsImluaXRpYWxTdGF0ZSIsInMiLCJzdG9yYWdlQ2xhc3NlcyIsImlzUmV0cmlldmluZyIsImlzRmV0Y2hlZCIsIm1lc3NhZ2UiLCJzdG9yYWdlQ2xhc3Nlc1JlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJzdG9yYWdlQ2xhc3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgU1RBUlRfR0VUVElOR19TVE9SQUdFX0NMQVNTLFxuICBHRVRfU1RPUkFHRV9DTEFTU19GQUlMLFxuICBHRVRfU1RPUkFHRV9DTEFTU19TVUNDRVNTLFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHN0b3JhZ2VDbGFzc2VzOiB7fSxcbiAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgaXNGZXRjaGVkOiBmYWxzZSxcbiAgbWVzc2FnZTogXCJTdG9yYWdlIENsYXNzZXMgTm90IEF2YWlsYWJsZVwiLFxufTtcblxuY29uc3Qgc3RvcmFnZUNsYXNzZXNSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgR0VUX1NUT1JBR0VfQ0xBU1NfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBzdG9yYWdlQ2xhc3NlczogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICAgIGlzRmV0Y2hlZDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogXCJBbGwgU3RvcmFnZSBDbGFzc2VzIGZldGNoZWRcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIFNUQVJUX0dFVFRJTkdfU1RPUkFHRV9DTEFTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc0ZldGNoZWQ6IGZhbHNlLFxuICAgICAgICBpc1JldHJpZXZpbmc6IHRydWUsXG4gICAgICB9O1xuXG4gICAgY2FzZSBHRVRfU1RPUkFHRV9DTEFTU19GQUlMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1lc3NhZ2U6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc0ZldGNoZWQ6IGZhbHNlLFxuICAgICAgICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBzdG9yYWdlQ2xhc3Nlc1JlZHVjZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGFBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGFBQUE7QUFmWixTQUNFRSwyQkFBMkIsRUFDM0JDLHNCQUFzQixFQUN0QkMseUJBQXlCLFFBQ3BCLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFMLGFBQUEsR0FBQU0sQ0FBQSxPQUFHO0VBQ25CQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCQyxZQUFZLEVBQUUsS0FBSztFQUNuQkMsU0FBUyxFQUFFLEtBQUs7RUFDaEJDLE9BQU8sRUFBRTtBQUNYLENBQUM7QUFBQ1YsYUFBQSxHQUFBTSxDQUFBO0FBRUYsTUFBTUsscUJBQXFCLEdBQUdBLENBQUNDLEtBQUssSUFBQVosYUFBQSxHQUFBYSxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFkLGFBQUEsR0FBQWUsQ0FBQTtFQUFBZixhQUFBLEdBQUFNLENBQUE7RUFDOUQsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtaLHlCQUF5QjtNQUFBSixhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQzVCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JMLGNBQWMsRUFBRU8sTUFBTSxDQUFDRyxPQUFPO1FBQzlCVCxZQUFZLEVBQUUsS0FBSztRQUNuQkMsU0FBUyxFQUFFLElBQUk7UUFDZkMsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtSLDJCQUEyQjtNQUFBRixhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQzlCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JILFNBQVMsRUFBRSxLQUFLO1FBQ2hCRCxZQUFZLEVBQUU7TUFDaEIsQ0FBQztJQUVILEtBQUtMLHNCQUFzQjtNQUFBSCxhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQ3pCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JGLE9BQU8sRUFBRUksTUFBTSxDQUFDRyxPQUFPO1FBQ3ZCUixTQUFTLEVBQUUsS0FBSztRQUNoQkQsWUFBWSxFQUFFO01BQ2hCLENBQUM7SUFFSDtNQUFBUixhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQ0UsT0FBT00sS0FBSztFQUFDO0FBRW5CLENBQUM7QUFDRCxlQUFlRCxxQkFBcUIifQ==