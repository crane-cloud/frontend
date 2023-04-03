function cov_wxry6ipz8() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/clusterResources.js";
  var hash = "82b95a1d84965f5c1315059e3ed7ec6cf78967a4";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/clusterResources.js",
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
          column: 32
        },
        end: {
          line: 41,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 40,
          column: 3
        }
      },
      "3": {
        start: {
          line: 17,
          column: 6
        },
        end: {
          line: 24,
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
          line: 39,
          column: 6
        },
        end: {
          line: 39,
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
            column: 32
          },
          end: {
            line: 14,
            column: 33
          }
        },
        loc: {
          start: {
            line: 14,
            column: 66
          },
          end: {
            line: 41,
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
            column: 33
          },
          end: {
            line: 14,
            column: 53
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 41
          },
          end: {
            line: 14,
            column: 53
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
            line: 40,
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
            line: 24,
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
            line: 31,
            column: 4
          },
          end: {
            line: 37,
            column: 8
          }
        }, {
          start: {
            line: 38,
            column: 4
          },
          end: {
            line: 39,
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
    hash: "82b95a1d84965f5c1315059e3ed7ec6cf78967a4"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_wxry6ipz8 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_wxry6ipz8();
import { GET_RESOURCES_COUNT, GET_RESOURCES_COUNT_FAILED, START_GETTING_RESOURCES_COUNT } from "../actions/actionTypes";
const initialState = (cov_wxry6ipz8().s[0]++, {
  resourceCount: [],
  isRetrieving: false,
  isRetrieved: false,
  message: "Cluster Resources Not Available"
});
cov_wxry6ipz8().s[1]++;
const clusterResourcesReducer = (state = (cov_wxry6ipz8().b[0][0]++, initialState), action) => {
  cov_wxry6ipz8().f[0]++;
  cov_wxry6ipz8().s[2]++;
  switch (action.type) {
    case GET_RESOURCES_COUNT:
      cov_wxry6ipz8().b[1][0]++;
      cov_wxry6ipz8().s[3]++;
      return {
        ...state,
        resourceCount: action.payload,
        isRetrieved: true,
        isRetrieving: false,
        clusterName: action.clusterName,
        message: "All Cluster Resources fetched"
      };
    case START_GETTING_RESOURCES_COUNT:
      cov_wxry6ipz8().b[1][1]++;
      cov_wxry6ipz8().s[4]++;
      return {
        ...state,
        isRetrieved: false,
        isRetrieving: true
      };
    case GET_RESOURCES_COUNT_FAILED:
      cov_wxry6ipz8().b[1][2]++;
      cov_wxry6ipz8().s[5]++;
      return {
        ...state,
        message: action.payload,
        isRetrieved: false,
        isRetrieving: false
      };
    default:
      cov_wxry6ipz8().b[1][3]++;
      cov_wxry6ipz8().s[6]++;
      return state;
  }
};
export default clusterResourcesReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3Zfd3hyeTZpcHo4IiwiYWN0dWFsQ292ZXJhZ2UiLCJHRVRfUkVTT1VSQ0VTX0NPVU5UIiwiR0VUX1JFU09VUkNFU19DT1VOVF9GQUlMRUQiLCJTVEFSVF9HRVRUSU5HX1JFU09VUkNFU19DT1VOVCIsImluaXRpYWxTdGF0ZSIsInMiLCJyZXNvdXJjZUNvdW50IiwiaXNSZXRyaWV2aW5nIiwiaXNSZXRyaWV2ZWQiLCJtZXNzYWdlIiwiY2x1c3RlclJlc291cmNlc1JlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiLCJjbHVzdGVyTmFtZSJdLCJzb3VyY2VzIjpbImNsdXN0ZXJSZXNvdXJjZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgR0VUX1JFU09VUkNFU19DT1VOVCxcbiAgR0VUX1JFU09VUkNFU19DT1VOVF9GQUlMRUQsXG4gIFNUQVJUX0dFVFRJTkdfUkVTT1VSQ0VTX0NPVU5ULFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHJlc291cmNlQ291bnQ6IFtdLFxuICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICBpc1JldHJpZXZlZDogZmFsc2UsXG4gIG1lc3NhZ2U6IFwiQ2x1c3RlciBSZXNvdXJjZXMgTm90IEF2YWlsYWJsZVwiLFxufTtcblxuY29uc3QgY2x1c3RlclJlc291cmNlc1JlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBHRVRfUkVTT1VSQ0VTX0NPVU5UOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHJlc291cmNlQ291bnQ6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc1JldHJpZXZlZDogdHJ1ZSxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgICAgICAgY2x1c3Rlck5hbWU6IGFjdGlvbi5jbHVzdGVyTmFtZSxcbiAgICAgICAgbWVzc2FnZTogXCJBbGwgQ2x1c3RlciBSZXNvdXJjZXMgZmV0Y2hlZFwiLFxuICAgICAgfTtcbiAgICBjYXNlIFNUQVJUX0dFVFRJTkdfUkVTT1VSQ0VTX0NPVU5UOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzUmV0cmlldmVkOiBmYWxzZSxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiB0cnVlLFxuICAgICAgfTtcbiAgICBjYXNlIEdFVF9SRVNPVVJDRVNfQ09VTlRfRkFJTEVEOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1lc3NhZ2U6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc1JldHJpZXZlZDogZmFsc2UsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsdXN0ZXJSZXNvdXJjZXNSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosU0FDRUUsbUJBQW1CLEVBQ25CQywwQkFBMEIsRUFDMUJDLDZCQUE2QixRQUN4Qix3QkFBd0I7QUFFL0IsTUFBTUMsWUFBWSxJQUFBTCxhQUFBLEdBQUFNLENBQUEsT0FBRztFQUNuQkMsYUFBYSxFQUFFLEVBQUU7RUFDakJDLFlBQVksRUFBRSxLQUFLO0VBQ25CQyxXQUFXLEVBQUUsS0FBSztFQUNsQkMsT0FBTyxFQUFFO0FBQ1gsQ0FBQztBQUFDVixhQUFBLEdBQUFNLENBQUE7QUFFRixNQUFNSyx1QkFBdUIsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBWixhQUFBLEdBQUFhLENBQUEsVUFBR1IsWUFBWSxHQUFFUyxNQUFNLEtBQUs7RUFBQWQsYUFBQSxHQUFBZSxDQUFBO0VBQUFmLGFBQUEsR0FBQU0sQ0FBQTtFQUNoRSxRQUFRUSxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS2QsbUJBQW1CO01BQUFGLGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDdEIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsYUFBYSxFQUFFTyxNQUFNLENBQUNHLE9BQU87UUFDN0JSLFdBQVcsRUFBRSxJQUFJO1FBQ2pCRCxZQUFZLEVBQUUsS0FBSztRQUNuQlUsV0FBVyxFQUFFSixNQUFNLENBQUNJLFdBQVc7UUFDL0JSLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFDSCxLQUFLTiw2QkFBNkI7TUFBQUosYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUNoQyxPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSSCxXQUFXLEVBQUUsS0FBSztRQUNsQkQsWUFBWSxFQUFFO01BQ2hCLENBQUM7SUFDSCxLQUFLTCwwQkFBMEI7TUFBQUgsYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUM3QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSRixPQUFPLEVBQUVJLE1BQU0sQ0FBQ0csT0FBTztRQUN2QlIsV0FBVyxFQUFFLEtBQUs7UUFDbEJELFlBQVksRUFBRTtNQUNoQixDQUFDO0lBQ0g7TUFBQVIsYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUNFLE9BQU9NLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBRUQsZUFBZUQsdUJBQXVCIn0=