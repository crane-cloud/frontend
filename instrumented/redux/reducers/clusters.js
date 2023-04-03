function cov_daz605wn5() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/clusters.js";
  var hash = "c8b02a8ff7ca78dbafddad05eff1749235753109";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/clusters.js",
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
          column: 24
        },
        end: {
          line: 42,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 41,
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
          line: 40,
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
            column: 24
          },
          end: {
            line: 14,
            column: 25
          }
        },
        loc: {
          start: {
            line: 14,
            column: 58
          },
          end: {
            line: 42,
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
            column: 25
          },
          end: {
            line: 14,
            column: 45
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 33
          },
          end: {
            line: 14,
            column: 45
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
            line: 41,
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
            line: 40,
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
    hash: "c8b02a8ff7ca78dbafddad05eff1749235753109"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_daz605wn5 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_daz605wn5();
import { GET_CLUSTERS, GET_CLUSTERS_FAIL, START_GETTING_CLUSTERS } from "../actions/actionTypes";
const initialState = (cov_daz605wn5().s[0]++, {
  clusters: [],
  isRetrieved: false,
  isRetrieving: false,
  message: "Clusters Not Available"
});
cov_daz605wn5().s[1]++;
const clustersReducer = (state = (cov_daz605wn5().b[0][0]++, initialState), action) => {
  cov_daz605wn5().f[0]++;
  cov_daz605wn5().s[2]++;
  switch (action.type) {
    case GET_CLUSTERS:
      cov_daz605wn5().b[1][0]++;
      cov_daz605wn5().s[3]++;
      return {
        ...state,
        clusters: action.payload,
        isRetrieving: false,
        isRetrieved: true,
        message: "All Cluster fetched"
      };
    case START_GETTING_CLUSTERS:
      cov_daz605wn5().b[1][1]++;
      cov_daz605wn5().s[4]++;
      return {
        ...state,
        isRetrieving: true
      };
    case GET_CLUSTERS_FAIL:
      cov_daz605wn5().b[1][2]++;
      cov_daz605wn5().s[5]++;
      return {
        ...state,
        message: action.payload,
        isRetrieving: false,
        isRetrieved: false
      };
    default:
      cov_daz605wn5().b[1][3]++;
      cov_daz605wn5().s[6]++;
      return state;
  }
};
export default clustersReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfZGF6NjA1d241IiwiYWN0dWFsQ292ZXJhZ2UiLCJHRVRfQ0xVU1RFUlMiLCJHRVRfQ0xVU1RFUlNfRkFJTCIsIlNUQVJUX0dFVFRJTkdfQ0xVU1RFUlMiLCJpbml0aWFsU3RhdGUiLCJzIiwiY2x1c3RlcnMiLCJpc1JldHJpZXZlZCIsImlzUmV0cmlldmluZyIsIm1lc3NhZ2UiLCJjbHVzdGVyc1JlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJjbHVzdGVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBHRVRfQ0xVU1RFUlMsXG4gIEdFVF9DTFVTVEVSU19GQUlMLFxuICBTVEFSVF9HRVRUSU5HX0NMVVNURVJTLFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGNsdXN0ZXJzOiBbXSxcbiAgaXNSZXRyaWV2ZWQ6IGZhbHNlLFxuICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICBtZXNzYWdlOiBcIkNsdXN0ZXJzIE5vdCBBdmFpbGFibGVcIixcbn07XG5cbmNvbnN0IGNsdXN0ZXJzUmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEdFVF9DTFVTVEVSUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjbHVzdGVyczogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICAgIGlzUmV0cmlldmVkOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiBcIkFsbCBDbHVzdGVyIGZldGNoZWRcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIFNUQVJUX0dFVFRJTkdfQ0xVU1RFUlM6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiB0cnVlLFxuICAgICAgfTtcblxuICAgIGNhc2UgR0VUX0NMVVNURVJTX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVzc2FnZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICAgIGlzUmV0cmlldmVkOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgY2x1c3RlcnNSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosU0FDRUUsWUFBWSxFQUNaQyxpQkFBaUIsRUFDakJDLHNCQUFzQixRQUNqQix3QkFBd0I7QUFFL0IsTUFBTUMsWUFBWSxJQUFBTCxhQUFBLEdBQUFNLENBQUEsT0FBRztFQUNuQkMsUUFBUSxFQUFFLEVBQUU7RUFDWkMsV0FBVyxFQUFFLEtBQUs7RUFDbEJDLFlBQVksRUFBRSxLQUFLO0VBQ25CQyxPQUFPLEVBQUU7QUFDWCxDQUFDO0FBQUNWLGFBQUEsR0FBQU0sQ0FBQTtBQUVGLE1BQU1LLGVBQWUsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBWixhQUFBLEdBQUFhLENBQUEsVUFBR1IsWUFBWSxHQUFFUyxNQUFNLEtBQUs7RUFBQWQsYUFBQSxHQUFBZSxDQUFBO0VBQUFmLGFBQUEsR0FBQU0sQ0FBQTtFQUN4RCxRQUFRUSxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS2QsWUFBWTtNQUFBRixhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQ2YsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsUUFBUSxFQUFFTyxNQUFNLENBQUNHLE9BQU87UUFDeEJSLFlBQVksRUFBRSxLQUFLO1FBQ25CRCxXQUFXLEVBQUUsSUFBSTtRQUNqQkUsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtOLHNCQUFzQjtNQUFBSixhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQ3pCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JILFlBQVksRUFBRTtNQUNoQixDQUFDO0lBRUgsS0FBS04saUJBQWlCO01BQUFILGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDcEIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkYsT0FBTyxFQUFFSSxNQUFNLENBQUNHLE9BQU87UUFDdkJSLFlBQVksRUFBRSxLQUFLO1FBQ25CRCxXQUFXLEVBQUU7TUFDZixDQUFDO0lBRUg7TUFBQVIsYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUNFLE9BQU9NLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBQ0QsZUFBZUQsZUFBZSJ9