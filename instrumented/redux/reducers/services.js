function cov_2n7daqtbn8() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/services.js";
  var hash = "e5415e5a3c8313a40666cc444964532cc6d831d7";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/services.js",
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
    hash: "e5415e5a3c8313a40666cc444964532cc6d831d7"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2n7daqtbn8 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2n7daqtbn8();
import { FETCH_SERVICES_SUCCESS, FETCH_SERVICES_FAILED, IS_FETCHING } from "../actions/actionTypes";
const initialState = (cov_2n7daqtbn8().s[0]++, {
  services: [],
  isFetched: false,
  isRetrieving: false,
  message: "Cluster Services Not Available"
});
cov_2n7daqtbn8().s[1]++;
const servicesReducer = (state = (cov_2n7daqtbn8().b[0][0]++, initialState), action) => {
  cov_2n7daqtbn8().f[0]++;
  cov_2n7daqtbn8().s[2]++;
  switch (action.type) {
    case FETCH_SERVICES_SUCCESS:
      cov_2n7daqtbn8().b[1][0]++;
      cov_2n7daqtbn8().s[3]++;
      return {
        ...state,
        services: action.payload,
        isFetched: true,
        isRetrieving: false,
        message: "All Cluster Services fetched"
      };
    case IS_FETCHING:
      cov_2n7daqtbn8().b[1][1]++;
      cov_2n7daqtbn8().s[4]++;
      return {
        ...state,
        isRetrieving: true
      };
    case FETCH_SERVICES_FAILED:
      cov_2n7daqtbn8().b[1][2]++;
      cov_2n7daqtbn8().s[5]++;
      return {
        ...state,
        isFetched: false,
        message: action.payload,
        isRetrieving: false
      };
    default:
      cov_2n7daqtbn8().b[1][3]++;
      cov_2n7daqtbn8().s[6]++;
      return state;
  }
};
export default servicesReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMm43ZGFxdGJuOCIsImFjdHVhbENvdmVyYWdlIiwiRkVUQ0hfU0VSVklDRVNfU1VDQ0VTUyIsIkZFVENIX1NFUlZJQ0VTX0ZBSUxFRCIsIklTX0ZFVENISU5HIiwiaW5pdGlhbFN0YXRlIiwicyIsInNlcnZpY2VzIiwiaXNGZXRjaGVkIiwiaXNSZXRyaWV2aW5nIiwibWVzc2FnZSIsInNlcnZpY2VzUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicGF5bG9hZCJdLCJzb3VyY2VzIjpbInNlcnZpY2VzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEZFVENIX1NFUlZJQ0VTX1NVQ0NFU1MsXG4gIEZFVENIX1NFUlZJQ0VTX0ZBSUxFRCxcbiAgSVNfRkVUQ0hJTkcsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgc2VydmljZXM6IFtdLFxuICBpc0ZldGNoZWQ6IGZhbHNlLFxuICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICBtZXNzYWdlOiBcIkNsdXN0ZXIgU2VydmljZXMgTm90IEF2YWlsYWJsZVwiLFxufTtcblxuY29uc3Qgc2VydmljZXNSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgRkVUQ0hfU0VSVklDRVNfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBzZXJ2aWNlczogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzRmV0Y2hlZDogdHJ1ZSxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJBbGwgQ2x1c3RlciBTZXJ2aWNlcyBmZXRjaGVkXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBJU19GRVRDSElORzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc1JldHJpZXZpbmc6IHRydWUsXG4gICAgICB9O1xuXG4gICAgY2FzZSBGRVRDSF9TRVJWSUNFU19GQUlMRUQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNGZXRjaGVkOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IHNlcnZpY2VzUmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLFNBQ0VFLHNCQUFzQixFQUN0QkMscUJBQXFCLEVBQ3JCQyxXQUFXLFFBQ04sd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQUwsY0FBQSxHQUFBTSxDQUFBLE9BQUc7RUFDbkJDLFFBQVEsRUFBRSxFQUFFO0VBQ1pDLFNBQVMsRUFBRSxLQUFLO0VBQ2hCQyxZQUFZLEVBQUUsS0FBSztFQUNuQkMsT0FBTyxFQUFFO0FBQ1gsQ0FBQztBQUFDVixjQUFBLEdBQUFNLENBQUE7QUFFRixNQUFNSyxlQUFlLEdBQUdBLENBQUNDLEtBQUssSUFBQVosY0FBQSxHQUFBYSxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFkLGNBQUEsR0FBQWUsQ0FBQTtFQUFBZixjQUFBLEdBQUFNLENBQUE7RUFDeEQsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtkLHNCQUFzQjtNQUFBRixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQ3pCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JMLFFBQVEsRUFBRU8sTUFBTSxDQUFDRyxPQUFPO1FBQ3hCVCxTQUFTLEVBQUUsSUFBSTtRQUNmQyxZQUFZLEVBQUUsS0FBSztRQUNuQkMsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtOLFdBQVc7TUFBQUosY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUNkLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JILFlBQVksRUFBRTtNQUNoQixDQUFDO0lBRUgsS0FBS04scUJBQXFCO01BQUFILGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDeEIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkosU0FBUyxFQUFFLEtBQUs7UUFDaEJFLE9BQU8sRUFBRUksTUFBTSxDQUFDRyxPQUFPO1FBQ3ZCUixZQUFZLEVBQUU7TUFDaEIsQ0FBQztJQUVIO01BQUFULGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUNELGVBQWVELGVBQWUifQ==