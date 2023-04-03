function cov_xjzgg70az() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/appNetwork.js";
  var hash = "4e7e3bc5262be1db1c0ae2947d092aa374af3a54";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/appNetwork.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
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
          column: 26
        },
        end: {
          line: 61,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 60,
          column: 3
        }
      },
      "3": {
        start: {
          line: 17,
          column: 6
        },
        end: {
          line: 28,
          column: 8
        }
      },
      "4": {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 42,
          column: 8
        }
      },
      "5": {
        start: {
          line: 45,
          column: 6
        },
        end: {
          line: 48,
          column: 8
        }
      },
      "6": {
        start: {
          line: 51,
          column: 6
        },
        end: {
          line: 56,
          column: 8
        }
      },
      "7": {
        start: {
          line: 59,
          column: 6
        },
        end: {
          line: 59,
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
            column: 26
          },
          end: {
            line: 14,
            column: 27
          }
        },
        loc: {
          start: {
            line: 14,
            column: 60
          },
          end: {
            line: 61,
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
            column: 27
          },
          end: {
            line: 14,
            column: 47
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 35
          },
          end: {
            line: 14,
            column: 47
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
            line: 60,
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
            line: 28,
            column: 8
          }
        }, {
          start: {
            line: 30,
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
            line: 48,
            column: 8
          }
        }, {
          start: {
            line: 50,
            column: 4
          },
          end: {
            line: 56,
            column: 8
          }
        }, {
          start: {
            line: 58,
            column: 4
          },
          end: {
            line: 59,
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
    hash: "4e7e3bc5262be1db1c0ae2947d092aa374af3a54"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_xjzgg70az = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_xjzgg70az();
import { FETCH_APP_NETWORK_SUCCESS, FETCH_APP_NETWORK_FAILED, IS_FETCHING_APP_NETWORK, CLEAR_APP_NETWORK } from "../actions/actionTypes";
const initialState = (cov_xjzgg70az().s[0]++, {
  appNetworkMetrics: [],
  isFetchingAppNetwork: false,
  appNetworkMessage: ""
});
cov_xjzgg70az().s[1]++;
const appNetworkReducer = (state = (cov_xjzgg70az().b[0][0]++, initialState), action) => {
  cov_xjzgg70az().f[0]++;
  cov_xjzgg70az().s[2]++;
  switch (action.type) {
    case FETCH_APP_NETWORK_SUCCESS:
      cov_xjzgg70az().b[1][0]++;
      cov_xjzgg70az().s[3]++;
      return {
        ...state,
        appNetworkMetrics: [...state.appNetworkMetrics, {
          app: action.payload?.app,
          metrics: action.payload?.metrics
        }],
        isFetchingAppNetwork: false,
        appNetworkMessage: "Fetched app Network metrics"
      };
    case FETCH_APP_NETWORK_FAILED:
      cov_xjzgg70az().b[1][1]++;
      cov_xjzgg70az().s[4]++;
      return {
        ...state,
        appNetworkMetrics: [...state.appNetworkMetrics, {
          app: action.payload?.app,
          metrics: action.payload?.metrics
        }],
        isFetchingAppNetwork: false,
        appNetworkMessage: "Error fetching app Network metrics"
      };
    case IS_FETCHING_APP_NETWORK:
      cov_xjzgg70az().b[1][2]++;
      cov_xjzgg70az().s[5]++;
      return {
        ...state,
        isFetchingAppNetwork: true
      };
    case CLEAR_APP_NETWORK:
      cov_xjzgg70az().b[1][3]++;
      cov_xjzgg70az().s[6]++;
      return {
        ...state,
        appNetworkMetrics: [],
        isFetchingAppNetwork: false,
        appNetworkMessage: ""
      };
    default:
      cov_xjzgg70az().b[1][4]++;
      cov_xjzgg70az().s[7]++;
      return state;
  }
};
export default appNetworkReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfeGp6Z2c3MGF6IiwiYWN0dWFsQ292ZXJhZ2UiLCJGRVRDSF9BUFBfTkVUV09SS19TVUNDRVNTIiwiRkVUQ0hfQVBQX05FVFdPUktfRkFJTEVEIiwiSVNfRkVUQ0hJTkdfQVBQX05FVFdPUksiLCJDTEVBUl9BUFBfTkVUV09SSyIsImluaXRpYWxTdGF0ZSIsInMiLCJhcHBOZXR3b3JrTWV0cmljcyIsImlzRmV0Y2hpbmdBcHBOZXR3b3JrIiwiYXBwTmV0d29ya01lc3NhZ2UiLCJhcHBOZXR3b3JrUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwiYXBwIiwicGF5bG9hZCIsIm1ldHJpY3MiXSwic291cmNlcyI6WyJhcHBOZXR3b3JrLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEZFVENIX0FQUF9ORVRXT1JLX1NVQ0NFU1MsXG4gIEZFVENIX0FQUF9ORVRXT1JLX0ZBSUxFRCxcbiAgSVNfRkVUQ0hJTkdfQVBQX05FVFdPUkssXG4gIENMRUFSX0FQUF9ORVRXT1JLLFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGFwcE5ldHdvcmtNZXRyaWNzOiBbXSxcbiAgaXNGZXRjaGluZ0FwcE5ldHdvcms6IGZhbHNlLFxuICBhcHBOZXR3b3JrTWVzc2FnZTogXCJcIixcbn07XG5cbmNvbnN0IGFwcE5ldHdvcmtSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgRkVUQ0hfQVBQX05FVFdPUktfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBhcHBOZXR3b3JrTWV0cmljczogW1xuICAgICAgICAgIC4uLnN0YXRlLmFwcE5ldHdvcmtNZXRyaWNzLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFwcDogYWN0aW9uLnBheWxvYWQ/LmFwcCxcbiAgICAgICAgICAgIG1ldHJpY3M6IGFjdGlvbi5wYXlsb2FkPy5tZXRyaWNzLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGlzRmV0Y2hpbmdBcHBOZXR3b3JrOiBmYWxzZSxcbiAgICAgICAgYXBwTmV0d29ya01lc3NhZ2U6IFwiRmV0Y2hlZCBhcHAgTmV0d29yayBtZXRyaWNzXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBGRVRDSF9BUFBfTkVUV09SS19GQUlMRUQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgYXBwTmV0d29ya01ldHJpY3M6IFtcbiAgICAgICAgICAuLi5zdGF0ZS5hcHBOZXR3b3JrTWV0cmljcyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhcHA6IGFjdGlvbi5wYXlsb2FkPy5hcHAsXG4gICAgICAgICAgICBtZXRyaWNzOiBhY3Rpb24ucGF5bG9hZD8ubWV0cmljcyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpc0ZldGNoaW5nQXBwTmV0d29yazogZmFsc2UsXG4gICAgICAgIGFwcE5ldHdvcmtNZXNzYWdlOiBcIkVycm9yIGZldGNoaW5nIGFwcCBOZXR3b3JrIG1ldHJpY3NcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIElTX0ZFVENISU5HX0FQUF9ORVRXT1JLOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzRmV0Y2hpbmdBcHBOZXR3b3JrOiB0cnVlLFxuICAgICAgfTtcblxuICAgIGNhc2UgQ0xFQVJfQVBQX05FVFdPUks6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgYXBwTmV0d29ya01ldHJpY3M6IFtdLFxuICAgICAgICBpc0ZldGNoaW5nQXBwTmV0d29yazogZmFsc2UsXG4gICAgICAgIGFwcE5ldHdvcmtNZXNzYWdlOiBcIlwiLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBhcHBOZXR3b3JrUmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosU0FDRUUseUJBQXlCLEVBQ3pCQyx3QkFBd0IsRUFDeEJDLHVCQUF1QixFQUN2QkMsaUJBQWlCLFFBQ1osd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQU4sYUFBQSxHQUFBTyxDQUFBLE9BQUc7RUFDbkJDLGlCQUFpQixFQUFFLEVBQUU7RUFDckJDLG9CQUFvQixFQUFFLEtBQUs7RUFDM0JDLGlCQUFpQixFQUFFO0FBQ3JCLENBQUM7QUFBQ1YsYUFBQSxHQUFBTyxDQUFBO0FBRUYsTUFBTUksaUJBQWlCLEdBQUdBLENBQUNDLEtBQUssSUFBQVosYUFBQSxHQUFBYSxDQUFBLFVBQUdQLFlBQVksR0FBRVEsTUFBTSxLQUFLO0VBQUFkLGFBQUEsR0FBQWUsQ0FBQTtFQUFBZixhQUFBLEdBQUFPLENBQUE7RUFDMUQsUUFBUU8sTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtkLHlCQUF5QjtNQUFBRixhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTyxDQUFBO01BQzVCLE9BQU87UUFDTCxHQUFHSyxLQUFLO1FBQ1JKLGlCQUFpQixFQUFFLENBQ2pCLEdBQUdJLEtBQUssQ0FBQ0osaUJBQWlCLEVBQzFCO1VBQ0VTLEdBQUcsRUFBRUgsTUFBTSxDQUFDSSxPQUFPLEVBQUVELEdBQUc7VUFDeEJFLE9BQU8sRUFBRUwsTUFBTSxDQUFDSSxPQUFPLEVBQUVDO1FBQzNCLENBQUMsQ0FDRjtRQUNEVixvQkFBb0IsRUFBRSxLQUFLO1FBQzNCQyxpQkFBaUIsRUFBRTtNQUNyQixDQUFDO0lBRUgsS0FBS1Asd0JBQXdCO01BQUFILGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFPLENBQUE7TUFDM0IsT0FBTztRQUNMLEdBQUdLLEtBQUs7UUFDUkosaUJBQWlCLEVBQUUsQ0FDakIsR0FBR0ksS0FBSyxDQUFDSixpQkFBaUIsRUFDMUI7VUFDRVMsR0FBRyxFQUFFSCxNQUFNLENBQUNJLE9BQU8sRUFBRUQsR0FBRztVQUN4QkUsT0FBTyxFQUFFTCxNQUFNLENBQUNJLE9BQU8sRUFBRUM7UUFDM0IsQ0FBQyxDQUNGO1FBQ0RWLG9CQUFvQixFQUFFLEtBQUs7UUFDM0JDLGlCQUFpQixFQUFFO01BQ3JCLENBQUM7SUFFSCxLQUFLTix1QkFBdUI7TUFBQUosYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU8sQ0FBQTtNQUMxQixPQUFPO1FBQ0wsR0FBR0ssS0FBSztRQUNSSCxvQkFBb0IsRUFBRTtNQUN4QixDQUFDO0lBRUgsS0FBS0osaUJBQWlCO01BQUFMLGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFPLENBQUE7TUFDcEIsT0FBTztRQUNMLEdBQUdLLEtBQUs7UUFDUkosaUJBQWlCLEVBQUUsRUFBRTtRQUNyQkMsb0JBQW9CLEVBQUUsS0FBSztRQUMzQkMsaUJBQWlCLEVBQUU7TUFDckIsQ0FBQztJQUVIO01BQUFWLGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFPLENBQUE7TUFDRSxPQUFPSyxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUNELGVBQWVELGlCQUFpQiJ9