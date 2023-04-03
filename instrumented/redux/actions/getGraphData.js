function cov_agsdsfzno() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/getGraphData.js";
  var hash = "c64c6b755b5967d2ae8820d505515198315b0543";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/getGraphData.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 26
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 33
        },
        end: {
          line: 10,
          column: 1
        }
      },
      "2": {
        start: {
          line: 12,
          column: 28
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 43
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "4": {
        start: {
          line: 17,
          column: 27
        },
        end: {
          line: 23,
          column: 2
        }
      },
      "5": {
        start: {
          line: 17,
          column: 39
        },
        end: {
          line: 23,
          column: 1
        }
      },
      "6": {
        start: {
          line: 25,
          column: 21
        },
        end: {
          line: 36,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 45
        },
        end: {
          line: 36,
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
          column: 32
        }
      },
      "9": {
        start: {
          line: 28,
          column: 2
        },
        end: {
          line: 35,
          column: 7
        }
      },
      "10": {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 31,
          column: 46
        }
      },
      "11": {
        start: {
          line: 34,
          column: 6
        },
        end: {
          line: 34,
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
            column: 26
          },
          end: {
            line: 8,
            column: 27
          }
        },
        loc: {
          start: {
            line: 8,
            column: 33
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
            column: 28
          },
          end: {
            line: 12,
            column: 29
          }
        },
        loc: {
          start: {
            line: 12,
            column: 43
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
            column: 27
          },
          end: {
            line: 17,
            column: 28
          }
        },
        loc: {
          start: {
            line: 17,
            column: 39
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
            column: 21
          },
          end: {
            line: 25,
            column: 22
          }
        },
        loc: {
          start: {
            line: 25,
            column: 45
          },
          end: {
            line: 36,
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
            column: 45
          },
          end: {
            line: 25,
            column: 46
          }
        },
        loc: {
          start: {
            line: 25,
            column: 59
          },
          end: {
            line: 36,
            column: 1
          }
        },
        line: 25
      },
      "5": {
        name: "(anonymous_5)",
        decl: {
          start: {
            line: 30,
            column: 10
          },
          end: {
            line: 30,
            column: 11
          }
        },
        loc: {
          start: {
            line: 30,
            column: 24
          },
          end: {
            line: 32,
            column: 5
          }
        },
        line: 30
      },
      "6": {
        name: "(anonymous_6)",
        decl: {
          start: {
            line: 33,
            column: 11
          },
          end: {
            line: 33,
            column: 12
          }
        },
        loc: {
          start: {
            line: 33,
            column: 22
          },
          end: {
            line: 35,
            column: 5
          }
        },
        line: 33
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
    hash: "c64c6b755b5967d2ae8820d505515198315b0543"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_agsdsfzno = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_agsdsfzno();
import axios from "../../axios";
import { GET_GRAPH_DATA_FAILED, GET_GRAPH_DATA_SUCCESS, GETTING_GRAPH_DATA } from "./actionTypes";
cov_agsdsfzno().s[0]++;
const startFetchingBill = () => {
  cov_agsdsfzno().f[0]++;
  cov_agsdsfzno().s[1]++;
  return {
    type: GETTING_GRAPH_DATA
  };
};
cov_agsdsfzno().s[2]++;
const getGraphDataSuccess = response => {
  cov_agsdsfzno().f[1]++;
  cov_agsdsfzno().s[3]++;
  return {
    type: GET_GRAPH_DATA_SUCCESS,
    payload: response.data.data
  };
};
cov_agsdsfzno().s[4]++;
const getGraphDataFailed = error => {
  cov_agsdsfzno().f[2]++;
  cov_agsdsfzno().s[5]++;
  return {
    type: GET_GRAPH_DATA_FAILED,
    payload: {
      status: false,
      error: error
    }
  };
};
cov_agsdsfzno().s[6]++;
const getGraphData = (projectID, billObj) => {
  cov_agsdsfzno().f[3]++;
  cov_agsdsfzno().s[7]++;
  return dispatch => {
    cov_agsdsfzno().f[4]++;
    cov_agsdsfzno().s[8]++;
    dispatch(startFetchingBill());
    cov_agsdsfzno().s[9]++;
    return axios.post(`/projects/${projectID}/billing/info`, billObj).then(response => {
      cov_agsdsfzno().f[5]++;
      cov_agsdsfzno().s[10]++;
      dispatch(getGraphDataSuccess(response));
    }).catch(error => {
      cov_agsdsfzno().f[6]++;
      cov_agsdsfzno().s[11]++;
      dispatch(getGraphDataFailed(error));
    });
  };
};
export default getGraphData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfYWdzZHNmem5vIiwiYWN0dWFsQ292ZXJhZ2UiLCJheGlvcyIsIkdFVF9HUkFQSF9EQVRBX0ZBSUxFRCIsIkdFVF9HUkFQSF9EQVRBX1NVQ0NFU1MiLCJHRVRUSU5HX0dSQVBIX0RBVEEiLCJzIiwic3RhcnRGZXRjaGluZ0JpbGwiLCJmIiwidHlwZSIsImdldEdyYXBoRGF0YVN1Y2Nlc3MiLCJyZXNwb25zZSIsInBheWxvYWQiLCJkYXRhIiwiZ2V0R3JhcGhEYXRhRmFpbGVkIiwiZXJyb3IiLCJzdGF0dXMiLCJnZXRHcmFwaERhdGEiLCJwcm9qZWN0SUQiLCJiaWxsT2JqIiwiZGlzcGF0Y2giLCJwb3N0IiwidGhlbiIsImNhdGNoIl0sInNvdXJjZXMiOlsiZ2V0R3JhcGhEYXRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiLi4vLi4vYXhpb3NcIjtcbmltcG9ydCB7XG4gIEdFVF9HUkFQSF9EQVRBX0ZBSUxFRCxcbiAgR0VUX0dSQVBIX0RBVEFfU1VDQ0VTUyxcbiAgR0VUVElOR19HUkFQSF9EQVRBXG59IGZyb20gXCIuL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IHN0YXJ0RmV0Y2hpbmdCaWxsID0gKCkgPT4gKHtcbiAgdHlwZTogR0VUVElOR19HUkFQSF9EQVRBLFxufSk7XG5cbmNvbnN0IGdldEdyYXBoRGF0YVN1Y2Nlc3MgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IEdFVF9HUkFQSF9EQVRBX1NVQ0NFU1MsXG4gIHBheWxvYWQ6IHJlc3BvbnNlLmRhdGEuZGF0YSxcbn0pO1xuXG5jb25zdCBnZXRHcmFwaERhdGFGYWlsZWQgPSAoZXJyb3IpID0+ICh7XG4gIHR5cGU6IEdFVF9HUkFQSF9EQVRBX0ZBSUxFRCxcbiAgcGF5bG9hZDoge1xuICAgIHN0YXR1czogZmFsc2UsXG4gICAgZXJyb3I6IGVycm9yLFxuICB9LFxufSk7XG5cbmNvbnN0IGdldEdyYXBoRGF0YSA9IChwcm9qZWN0SUQsIGJpbGxPYmopID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaChzdGFydEZldGNoaW5nQmlsbCgpKTtcblxuICByZXR1cm4gYXhpb3NcbiAgICAucG9zdChgL3Byb2plY3RzLyR7cHJvamVjdElEfS9iaWxsaW5nL2luZm9gLCBiaWxsT2JqKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goZ2V0R3JhcGhEYXRhU3VjY2VzcyhyZXNwb25zZSkpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgZGlzcGF0Y2goZ2V0R3JhcGhEYXRhRmFpbGVkKGVycm9yKSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRHcmFwaERhdGE7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosT0FBT0UsS0FBSyxNQUFNLGFBQWE7QUFDL0IsU0FDRUMscUJBQXFCLEVBQ3JCQyxzQkFBc0IsRUFDdEJDLGtCQUFrQixRQUNiLGVBQWU7QUFBQ0wsYUFBQSxHQUFBTSxDQUFBO0FBRXZCLE1BQU1DLGlCQUFpQixHQUFHQSxDQUFBLEtBQU87RUFBQVAsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQy9CRyxJQUFJLEVBQUVKO0VBQ1IsQ0FBQztBQUFELENBQUU7QUFBQ0wsYUFBQSxHQUFBTSxDQUFBO0FBRUgsTUFBTUksbUJBQW1CLEdBQUlDLFFBQVEsSUFBTTtFQUFBWCxhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUE7SUFDekNHLElBQUksRUFBRUwsc0JBQXNCO0lBQzVCUSxPQUFPLEVBQUVELFFBQVEsQ0FBQ0UsSUFBSSxDQUFDQTtFQUN6QixDQUFDO0FBQUQsQ0FBRTtBQUFDYixhQUFBLEdBQUFNLENBQUE7QUFFSCxNQUFNUSxrQkFBa0IsR0FBSUMsS0FBSyxJQUFNO0VBQUFmLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQTtJQUNyQ0csSUFBSSxFQUFFTixxQkFBcUI7SUFDM0JTLE9BQU8sRUFBRTtNQUNQSSxNQUFNLEVBQUUsS0FBSztNQUNiRCxLQUFLLEVBQUVBO0lBQ1Q7RUFDRixDQUFDO0FBQUQsQ0FBRTtBQUFDZixhQUFBLEdBQUFNLENBQUE7QUFFSCxNQUFNVyxZQUFZLEdBQUdBLENBQUNDLFNBQVMsRUFBRUMsT0FBTyxLQUFLO0VBQUFuQixhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUEsT0FBQ2MsUUFBUSxJQUFLO0lBQUFwQixhQUFBLEdBQUFRLENBQUE7SUFBQVIsYUFBQSxHQUFBTSxDQUFBO0lBQ3pEYyxRQUFRLENBQUNiLGlCQUFpQixFQUFFLENBQUM7SUFBQ1AsYUFBQSxHQUFBTSxDQUFBO0lBRTlCLE9BQU9KLEtBQUssQ0FDVG1CLElBQUksQ0FBRSxhQUFZSCxTQUFVLGVBQWMsRUFBRUMsT0FBTyxDQUFDLENBQ3BERyxJQUFJLENBQUVYLFFBQVEsSUFBSztNQUFBWCxhQUFBLEdBQUFRLENBQUE7TUFBQVIsYUFBQSxHQUFBTSxDQUFBO01BQ2xCYyxRQUFRLENBQUNWLG1CQUFtQixDQUFDQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FDRFksS0FBSyxDQUFFUixLQUFLLElBQUs7TUFBQWYsYUFBQSxHQUFBUSxDQUFBO01BQUFSLGFBQUEsR0FBQU0sQ0FBQTtNQUNoQmMsUUFBUSxDQUFDTixrQkFBa0IsQ0FBQ0MsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0VBQ04sQ0FBQztBQUFELENBQUM7QUFFRCxlQUFlRSxZQUFZIn0=