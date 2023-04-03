function cov_gjzhqjj5n() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/pvs.js";
  var hash = "e592ce7abfd29638652796451097a6738db3993e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/pvs.js",
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
          column: 19
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
            column: 19
          },
          end: {
            line: 14,
            column: 20
          }
        },
        loc: {
          start: {
            line: 14,
            column: 53
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
            column: 20
          },
          end: {
            line: 14,
            column: 40
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 28
          },
          end: {
            line: 14,
            column: 40
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
    hash: "e592ce7abfd29638652796451097a6738db3993e"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_gjzhqjj5n = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_gjzhqjj5n();
import { FETCH_PVS_SUCCESS, FETCH_PVS_FAILED, IS_FETCHING } from "../actions/actionTypes";
const initialState = (cov_gjzhqjj5n().s[0]++, {
  pvs: [],
  isRetrieving: false,
  isFetched: false,
  message: "Cluster Volumes Not Available"
});
cov_gjzhqjj5n().s[1]++;
const pvsReducer = (state = (cov_gjzhqjj5n().b[0][0]++, initialState), action) => {
  cov_gjzhqjj5n().f[0]++;
  cov_gjzhqjj5n().s[2]++;
  switch (action.type) {
    case FETCH_PVS_SUCCESS:
      cov_gjzhqjj5n().b[1][0]++;
      cov_gjzhqjj5n().s[3]++;
      return {
        ...state,
        pvs: action.payload,
        isFetched: true,
        isRetrieving: false,
        message: "All Cluster Volumes fetched"
      };
    case IS_FETCHING:
      cov_gjzhqjj5n().b[1][1]++;
      cov_gjzhqjj5n().s[4]++;
      return {
        ...state,
        isRetrieving: true
      };
    case FETCH_PVS_FAILED:
      cov_gjzhqjj5n().b[1][2]++;
      cov_gjzhqjj5n().s[5]++;
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isRetrieving: false
      };
    default:
      cov_gjzhqjj5n().b[1][3]++;
      cov_gjzhqjj5n().s[6]++;
      return state;
  }
};
export default pvsReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfZ2p6aHFqajVuIiwiYWN0dWFsQ292ZXJhZ2UiLCJGRVRDSF9QVlNfU1VDQ0VTUyIsIkZFVENIX1BWU19GQUlMRUQiLCJJU19GRVRDSElORyIsImluaXRpYWxTdGF0ZSIsInMiLCJwdnMiLCJpc1JldHJpZXZpbmciLCJpc0ZldGNoZWQiLCJtZXNzYWdlIiwicHZzUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicGF5bG9hZCJdLCJzb3VyY2VzIjpbInB2cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBGRVRDSF9QVlNfU1VDQ0VTUyxcbiAgRkVUQ0hfUFZTX0ZBSUxFRCxcbiAgSVNfRkVUQ0hJTkcsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgcHZzOiBbXSxcbiAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgaXNGZXRjaGVkOiBmYWxzZSxcbiAgbWVzc2FnZTogXCJDbHVzdGVyIFZvbHVtZXMgTm90IEF2YWlsYWJsZVwiLFxufTtcblxuY29uc3QgcHZzUmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEZFVENIX1BWU19TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHB2czogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzRmV0Y2hlZDogdHJ1ZSxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJBbGwgQ2x1c3RlciBWb2x1bWVzIGZldGNoZWRcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIElTX0ZFVENISU5HOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzUmV0cmlldmluZzogdHJ1ZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIEZFVENIX1BWU19GQUlMRUQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVzc2FnZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IHB2c1JlZHVjZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGFBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGFBQUE7QUFmWixTQUNFRSxpQkFBaUIsRUFDakJDLGdCQUFnQixFQUNoQkMsV0FBVyxRQUNOLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFMLGFBQUEsR0FBQU0sQ0FBQSxPQUFHO0VBQ25CQyxHQUFHLEVBQUUsRUFBRTtFQUNQQyxZQUFZLEVBQUUsS0FBSztFQUNuQkMsU0FBUyxFQUFFLEtBQUs7RUFDaEJDLE9BQU8sRUFBRTtBQUNYLENBQUM7QUFBQ1YsYUFBQSxHQUFBTSxDQUFBO0FBRUYsTUFBTUssVUFBVSxHQUFHQSxDQUFDQyxLQUFLLElBQUFaLGFBQUEsR0FBQWEsQ0FBQSxVQUFHUixZQUFZLEdBQUVTLE1BQU0sS0FBSztFQUFBZCxhQUFBLEdBQUFlLENBQUE7RUFBQWYsYUFBQSxHQUFBTSxDQUFBO0VBQ25ELFFBQVFRLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLZCxpQkFBaUI7TUFBQUYsYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUNwQixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxHQUFHLEVBQUVPLE1BQU0sQ0FBQ0csT0FBTztRQUNuQlIsU0FBUyxFQUFFLElBQUk7UUFDZkQsWUFBWSxFQUFFLEtBQUs7UUFDbkJFLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSCxLQUFLTixXQUFXO01BQUFKLGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDZCxPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSSixZQUFZLEVBQUU7TUFDaEIsQ0FBQztJQUVILEtBQUtMLGdCQUFnQjtNQUFBSCxhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQ25CLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JGLE9BQU8sRUFBRUksTUFBTSxDQUFDRyxPQUFPO1FBQ3ZCUixTQUFTLEVBQUUsS0FBSztRQUNoQkQsWUFBWSxFQUFFO01BQ2hCLENBQUM7SUFFSDtNQUFBUixhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQ0UsT0FBT00sS0FBSztFQUFDO0FBRW5CLENBQUM7QUFDRCxlQUFlRCxVQUFVIn0=