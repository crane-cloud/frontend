function cov_ph9338xyi() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/appsSummary.js";
  var hash = "c31b0d0d1cb9fdeff7b45f2f4a0dbdf2c1490650";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/appsSummary.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 40
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 47
        },
        end: {
          line: 10,
          column: 1
        }
      },
      "2": {
        start: {
          line: 12,
          column: 37
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 52
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "4": {
        start: {
          line: 17,
          column: 34
        },
        end: {
          line: 23,
          column: 2
        }
      },
      "5": {
        start: {
          line: 17,
          column: 46
        },
        end: {
          line: 23,
          column: 1
        }
      },
      "6": {
        start: {
          line: 25,
          column: 19
        },
        end: {
          line: 35,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 32
        },
        end: {
          line: 35,
          column: 1
        }
      },
      "8": {
        start: {
          line: 26,
          column: 2
        },
        end: {
          line: 26,
          column: 39
        }
      },
      "9": {
        start: {
          line: 28,
          column: 2
        },
        end: {
          line: 34,
          column: 7
        }
      },
      "10": {
        start: {
          line: 31,
          column: 24
        },
        end: {
          line: 31,
          column: 65
        }
      },
      "11": {
        start: {
          line: 33,
          column: 6
        },
        end: {
          line: 33,
          column: 42
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 8,
            column: 40
          },
          end: {
            line: 8,
            column: 41
          }
        },
        loc: {
          start: {
            line: 8,
            column: 47
          },
          end: {
            line: 10,
            column: 1
          }
        },
        line: 8
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 12,
            column: 37
          },
          end: {
            line: 12,
            column: 38
          }
        },
        loc: {
          start: {
            line: 12,
            column: 52
          },
          end: {
            line: 15,
            column: 1
          }
        },
        line: 12
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 17,
            column: 34
          },
          end: {
            line: 17,
            column: 35
          }
        },
        loc: {
          start: {
            line: 17,
            column: 46
          },
          end: {
            line: 23,
            column: 1
          }
        },
        line: 17
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 25,
            column: 19
          },
          end: {
            line: 25,
            column: 20
          }
        },
        loc: {
          start: {
            line: 25,
            column: 32
          },
          end: {
            line: 35,
            column: 1
          }
        },
        line: 25
      },
      "4": {
        name: "(anonymous_4)",
        decl: {
          start: {
            line: 25,
            column: 32
          },
          end: {
            line: 25,
            column: 33
          }
        },
        loc: {
          start: {
            line: 25,
            column: 46
          },
          end: {
            line: 35,
            column: 1
          }
        },
        line: 25
      },
      "5": {
        name: "(anonymous_5)",
        decl: {
          start: {
            line: 31,
            column: 10
          },
          end: {
            line: 31,
            column: 11
          }
        },
        loc: {
          start: {
            line: 31,
            column: 24
          },
          end: {
            line: 31,
            column: 65
          }
        },
        line: 31
      },
      "6": {
        name: "(anonymous_6)",
        decl: {
          start: {
            line: 32,
            column: 11
          },
          end: {
            line: 32,
            column: 12
          }
        },
        loc: {
          start: {
            line: 32,
            column: 22
          },
          end: {
            line: 34,
            column: 5
          }
        },
        line: 32
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "c31b0d0d1cb9fdeff7b45f2f4a0dbdf2c1490650"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_ph9338xyi = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_ph9338xyi();
import axios from "../../axios";
import { GETTING_APPS_SUMMARY, APPS_SUMMARY_SUCCESS, APPS_SUMMARY_FAIL } from "./actionTypes";
cov_ph9338xyi().s[0]++;
export const startFetchingAppsSummary = () => {
  cov_ph9338xyi().f[0]++;
  cov_ph9338xyi().s[1]++;
  return {
    type: GETTING_APPS_SUMMARY
  };
};
cov_ph9338xyi().s[2]++;
export const getAppsSuccessSummary = response => {
  cov_ph9338xyi().f[1]++;
  cov_ph9338xyi().s[3]++;
  return {
    type: APPS_SUMMARY_SUCCESS,
    payload: response.data.data
  };
};
cov_ph9338xyi().s[4]++;
export const getAppsFailSummary = error => {
  cov_ph9338xyi().f[2]++;
  cov_ph9338xyi().s[5]++;
  return {
    type: APPS_SUMMARY_FAIL,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_ph9338xyi().s[6]++;
const appSummary = details => {
  cov_ph9338xyi().f[3]++;
  cov_ph9338xyi().s[7]++;
  return dispatch => {
    cov_ph9338xyi().f[4]++;
    cov_ph9338xyi().s[8]++;
    dispatch(startFetchingAppsSummary());
    cov_ph9338xyi().s[9]++;
    return axios.post(`/apps/summary`, details).then(response => {
      cov_ph9338xyi().f[5]++;
      cov_ph9338xyi().s[10]++;
      return dispatch(getAppsSuccessSummary(response));
    }).catch(error => {
      cov_ph9338xyi().f[6]++;
      cov_ph9338xyi().s[11]++;
      dispatch(getAppsFailSummary(error));
    });
  };
};
export default appSummary;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfcGg5MzM4eHlpIiwiYWN0dWFsQ292ZXJhZ2UiLCJheGlvcyIsIkdFVFRJTkdfQVBQU19TVU1NQVJZIiwiQVBQU19TVU1NQVJZX1NVQ0NFU1MiLCJBUFBTX1NVTU1BUllfRkFJTCIsInMiLCJzdGFydEZldGNoaW5nQXBwc1N1bW1hcnkiLCJmIiwidHlwZSIsImdldEFwcHNTdWNjZXNzU3VtbWFyeSIsInJlc3BvbnNlIiwicGF5bG9hZCIsImRhdGEiLCJnZXRBcHBzRmFpbFN1bW1hcnkiLCJlcnJvciIsInN0YXR1cyIsImFwcFN1bW1hcnkiLCJkZXRhaWxzIiwiZGlzcGF0Y2giLCJwb3N0IiwidGhlbiIsImNhdGNoIl0sInNvdXJjZXMiOlsiYXBwc1N1bW1hcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCIuLi8uLi9heGlvc1wiO1xuaW1wb3J0IHtcbiAgR0VUVElOR19BUFBTX1NVTU1BUlksXG4gIEFQUFNfU1VNTUFSWV9TVUNDRVNTLFxuICBBUFBTX1NVTU1BUllfRkFJTCxcbn0gZnJvbSBcIi4vYWN0aW9uVHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IHN0YXJ0RmV0Y2hpbmdBcHBzU3VtbWFyeSA9ICgpID0+ICh7XG4gIHR5cGU6IEdFVFRJTkdfQVBQU19TVU1NQVJZLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRBcHBzU3VjY2Vzc1N1bW1hcnkgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IEFQUFNfU1VNTUFSWV9TVUNDRVNTLFxuICBwYXlsb2FkOiByZXNwb25zZS5kYXRhLmRhdGEsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldEFwcHNGYWlsU3VtbWFyeSA9IChlcnJvcikgPT4gKHtcbiAgdHlwZTogQVBQU19TVU1NQVJZX0ZBSUwsXG4gIHBheWxvYWQ6IHtcbiAgICBzdGF0dXM6IGZhbHNlLFxuICAgIGVycm9yOiBlcnJvci5zdGF0dXMsXG4gIH0sXG59KTtcblxuY29uc3QgYXBwU3VtbWFyeSA9IChkZXRhaWxzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgZGlzcGF0Y2goc3RhcnRGZXRjaGluZ0FwcHNTdW1tYXJ5KCkpO1xuXG4gIHJldHVybiBheGlvc1xuICAgIC5wb3N0KGAvYXBwcy9zdW1tYXJ5YCwgZGV0YWlscylcblxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gZGlzcGF0Y2goZ2V0QXBwc1N1Y2Nlc3NTdW1tYXJ5KHJlc3BvbnNlKSkpXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgZGlzcGF0Y2goZ2V0QXBwc0ZhaWxTdW1tYXJ5KGVycm9yKSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhcHBTdW1tYXJ5O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosT0FBT0UsS0FBSyxNQUFNLGFBQWE7QUFDL0IsU0FDRUMsb0JBQW9CLEVBQ3BCQyxvQkFBb0IsRUFDcEJDLGlCQUFpQixRQUNaLGVBQWU7QUFBQ0wsYUFBQSxHQUFBTSxDQUFBO0FBRXZCLE9BQU8sTUFBTUMsd0JBQXdCLEdBQUdBLENBQUEsS0FBTztFQUFBUCxhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUE7SUFDN0NHLElBQUksRUFBRU47RUFDUixDQUFDO0FBQUQsQ0FBRTtBQUFDSCxhQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1JLHFCQUFxQixHQUFJQyxRQUFRLElBQU07RUFBQVgsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ2xERyxJQUFJLEVBQUVMLG9CQUFvQjtJQUMxQlEsT0FBTyxFQUFFRCxRQUFRLENBQUNFLElBQUksQ0FBQ0E7RUFDekIsQ0FBQztBQUFELENBQUU7QUFBQ2IsYUFBQSxHQUFBTSxDQUFBO0FBRUgsT0FBTyxNQUFNUSxrQkFBa0IsR0FBSUMsS0FBSyxJQUFNO0VBQUFmLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQTtJQUM1Q0csSUFBSSxFQUFFSixpQkFBaUI7SUFDdkJPLE9BQU8sRUFBRTtNQUNQSSxNQUFNLEVBQUUsS0FBSztNQUNiRCxLQUFLLEVBQUVBLEtBQUssQ0FBQ0M7SUFDZjtFQUNGLENBQUM7QUFBRCxDQUFFO0FBQUNoQixhQUFBLEdBQUFNLENBQUE7QUFFSCxNQUFNVyxVQUFVLEdBQUlDLE9BQU8sSUFBSztFQUFBbEIsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBLE9BQUNhLFFBQVEsSUFBSztJQUFBbkIsYUFBQSxHQUFBUSxDQUFBO0lBQUFSLGFBQUEsR0FBQU0sQ0FBQTtJQUM1Q2EsUUFBUSxDQUFDWix3QkFBd0IsRUFBRSxDQUFDO0lBQUNQLGFBQUEsR0FBQU0sQ0FBQTtJQUVyQyxPQUFPSixLQUFLLENBQ1RrQixJQUFJLENBQUUsZUFBYyxFQUFFRixPQUFPLENBQUMsQ0FFOUJHLElBQUksQ0FBRVYsUUFBUSxJQUFLO01BQUFYLGFBQUEsR0FBQVEsQ0FBQTtNQUFBUixhQUFBLEdBQUFNLENBQUE7TUFBQSxPQUFBYSxRQUFRLENBQUNULHFCQUFxQixDQUFDQyxRQUFRLENBQUMsQ0FBQztJQUFELENBQUMsQ0FBQyxDQUM3RFcsS0FBSyxDQUFFUCxLQUFLLElBQUs7TUFBQWYsYUFBQSxHQUFBUSxDQUFBO01BQUFSLGFBQUEsR0FBQU0sQ0FBQTtNQUNoQmEsUUFBUSxDQUFDTCxrQkFBa0IsQ0FBQ0MsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0VBQ04sQ0FBQztBQUFELENBQUM7QUFFRCxlQUFlRSxVQUFVIn0=