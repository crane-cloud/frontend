function cov_9svnmgh86() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/getDeployments.js";
  var hash = "910c5bf9e8a5c476a13f744428fa9ead73f76e24";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/getDeployments.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 32
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 39
        },
        end: {
          line: 10,
          column: 1
        }
      },
      "2": {
        start: {
          line: 12,
          column: 30
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 45
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
          column: 23
        },
        end: {
          line: 34,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 38
        },
        end: {
          line: 34,
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
          column: 38
        }
      },
      "9": {
        start: {
          line: 28,
          column: 2
        },
        end: {
          line: 33,
          column: 7
        }
      },
      "10": {
        start: {
          line: 30,
          column: 24
        },
        end: {
          line: 30,
          column: 65
        }
      },
      "11": {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 32,
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
            column: 32
          },
          end: {
            line: 8,
            column: 33
          }
        },
        loc: {
          start: {
            line: 8,
            column: 39
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
            column: 30
          },
          end: {
            line: 12,
            column: 31
          }
        },
        loc: {
          start: {
            line: 12,
            column: 45
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
            column: 23
          },
          end: {
            line: 25,
            column: 24
          }
        },
        loc: {
          start: {
            line: 25,
            column: 38
          },
          end: {
            line: 34,
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
            column: 38
          },
          end: {
            line: 25,
            column: 39
          }
        },
        loc: {
          start: {
            line: 25,
            column: 52
          },
          end: {
            line: 34,
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
            line: 30,
            column: 65
          }
        },
        line: 30
      },
      "6": {
        name: "(anonymous_6)",
        decl: {
          start: {
            line: 31,
            column: 11
          },
          end: {
            line: 31,
            column: 12
          }
        },
        loc: {
          start: {
            line: 31,
            column: 22
          },
          end: {
            line: 33,
            column: 5
          }
        },
        line: 31
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
    hash: "910c5bf9e8a5c476a13f744428fa9ead73f76e24"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_9svnmgh86 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_9svnmgh86();
import axios from "../../axios";
import { GET_DEPLOYMENTS_SUCCESS, GET_DEPLOYMENTS_FAIL, GETTING_DEPLOYMENTS } from "./actionTypes";
cov_9svnmgh86().s[0]++;
const startGettingDeployments = () => {
  cov_9svnmgh86().f[0]++;
  cov_9svnmgh86().s[1]++;
  return {
    type: GETTING_DEPLOYMENTS
  };
};
cov_9svnmgh86().s[2]++;
const getDeploymentsSuccess = response => {
  cov_9svnmgh86().f[1]++;
  cov_9svnmgh86().s[3]++;
  return {
    type: GET_DEPLOYMENTS_SUCCESS,
    payload: response.data.data.deployments
  };
};
cov_9svnmgh86().s[4]++;
const getDeploymentsFail = error => {
  cov_9svnmgh86().f[2]++;
  cov_9svnmgh86().s[5]++;
  return {
    type: GET_DEPLOYMENTS_FAIL,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_9svnmgh86().s[6]++;
const getDeployments = clusterID => {
  cov_9svnmgh86().f[3]++;
  cov_9svnmgh86().s[7]++;
  return dispatch => {
    cov_9svnmgh86().f[4]++;
    cov_9svnmgh86().s[8]++;
    dispatch(startGettingDeployments());
    cov_9svnmgh86().s[9]++;
    axios.get(`/clusters/${clusterID}/deployments`).then(response => {
      cov_9svnmgh86().f[5]++;
      cov_9svnmgh86().s[10]++;
      return dispatch(getDeploymentsSuccess(response));
    }).catch(error => {
      cov_9svnmgh86().f[6]++;
      cov_9svnmgh86().s[11]++;
      dispatch(getDeploymentsFail(error));
    });
  };
};
export default getDeployments;
export { startGettingDeployments, getDeploymentsSuccess, getDeploymentsFail };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfOXN2bm1naDg2IiwiYWN0dWFsQ292ZXJhZ2UiLCJheGlvcyIsIkdFVF9ERVBMT1lNRU5UU19TVUNDRVNTIiwiR0VUX0RFUExPWU1FTlRTX0ZBSUwiLCJHRVRUSU5HX0RFUExPWU1FTlRTIiwicyIsInN0YXJ0R2V0dGluZ0RlcGxveW1lbnRzIiwiZiIsInR5cGUiLCJnZXREZXBsb3ltZW50c1N1Y2Nlc3MiLCJyZXNwb25zZSIsInBheWxvYWQiLCJkYXRhIiwiZGVwbG95bWVudHMiLCJnZXREZXBsb3ltZW50c0ZhaWwiLCJlcnJvciIsInN0YXR1cyIsImdldERlcGxveW1lbnRzIiwiY2x1c3RlcklEIiwiZGlzcGF0Y2giLCJnZXQiLCJ0aGVuIiwiY2F0Y2giXSwic291cmNlcyI6WyJnZXREZXBsb3ltZW50cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcIi4uLy4uL2F4aW9zXCI7XG5pbXBvcnQge1xuICBHRVRfREVQTE9ZTUVOVFNfU1VDQ0VTUyxcbiAgR0VUX0RFUExPWU1FTlRTX0ZBSUwsXG4gIEdFVFRJTkdfREVQTE9ZTUVOVFMsXG59IGZyb20gXCIuL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IHN0YXJ0R2V0dGluZ0RlcGxveW1lbnRzID0gKCkgPT4gKHtcbiAgdHlwZTogR0VUVElOR19ERVBMT1lNRU5UUyxcbn0pO1xuXG5jb25zdCBnZXREZXBsb3ltZW50c1N1Y2Nlc3MgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IEdFVF9ERVBMT1lNRU5UU19TVUNDRVNTLFxuICBwYXlsb2FkOiByZXNwb25zZS5kYXRhLmRhdGEuZGVwbG95bWVudHMsXG59KTtcblxuY29uc3QgZ2V0RGVwbG95bWVudHNGYWlsID0gKGVycm9yKSA9PiAoe1xuICB0eXBlOiBHRVRfREVQTE9ZTUVOVFNfRkFJTCxcbiAgcGF5bG9hZDoge1xuICAgIHN0YXR1czogZmFsc2UsXG4gICAgZXJyb3I6IGVycm9yLnN0YXR1cyxcbiAgfSxcbn0pO1xuXG5jb25zdCBnZXREZXBsb3ltZW50cyA9IChjbHVzdGVySUQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaChzdGFydEdldHRpbmdEZXBsb3ltZW50cygpKTtcblxuICBheGlvc1xuICAgIC5nZXQoYC9jbHVzdGVycy8ke2NsdXN0ZXJJRH0vZGVwbG95bWVudHNgKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gZGlzcGF0Y2goZ2V0RGVwbG95bWVudHNTdWNjZXNzKHJlc3BvbnNlKSkpXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgZGlzcGF0Y2goZ2V0RGVwbG95bWVudHNGYWlsKGVycm9yKSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXREZXBsb3ltZW50cztcbmV4cG9ydCB7IHN0YXJ0R2V0dGluZ0RlcGxveW1lbnRzLCBnZXREZXBsb3ltZW50c1N1Y2Nlc3MsIGdldERlcGxveW1lbnRzRmFpbCB9O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosT0FBT0UsS0FBSyxNQUFNLGFBQWE7QUFDL0IsU0FDRUMsdUJBQXVCLEVBQ3ZCQyxvQkFBb0IsRUFDcEJDLG1CQUFtQixRQUNkLGVBQWU7QUFBQ0wsYUFBQSxHQUFBTSxDQUFBO0FBRXZCLE1BQU1DLHVCQUF1QixHQUFHQSxDQUFBLEtBQU87RUFBQVAsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ3JDRyxJQUFJLEVBQUVKO0VBQ1IsQ0FBQztBQUFELENBQUU7QUFBQ0wsYUFBQSxHQUFBTSxDQUFBO0FBRUgsTUFBTUkscUJBQXFCLEdBQUlDLFFBQVEsSUFBTTtFQUFBWCxhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUE7SUFDM0NHLElBQUksRUFBRU4sdUJBQXVCO0lBQzdCUyxPQUFPLEVBQUVELFFBQVEsQ0FBQ0UsSUFBSSxDQUFDQSxJQUFJLENBQUNDO0VBQzlCLENBQUM7QUFBRCxDQUFFO0FBQUNkLGFBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1TLGtCQUFrQixHQUFJQyxLQUFLLElBQU07RUFBQWhCLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQTtJQUNyQ0csSUFBSSxFQUFFTCxvQkFBb0I7SUFDMUJRLE9BQU8sRUFBRTtNQUNQSyxNQUFNLEVBQUUsS0FBSztNQUNiRCxLQUFLLEVBQUVBLEtBQUssQ0FBQ0M7SUFDZjtFQUNGLENBQUM7QUFBRCxDQUFFO0FBQUNqQixhQUFBLEdBQUFNLENBQUE7QUFFSCxNQUFNWSxjQUFjLEdBQUlDLFNBQVMsSUFBSztFQUFBbkIsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBLE9BQUNjLFFBQVEsSUFBSztJQUFBcEIsYUFBQSxHQUFBUSxDQUFBO0lBQUFSLGFBQUEsR0FBQU0sQ0FBQTtJQUNsRGMsUUFBUSxDQUFDYix1QkFBdUIsRUFBRSxDQUFDO0lBQUNQLGFBQUEsR0FBQU0sQ0FBQTtJQUVwQ0osS0FBSyxDQUNGbUIsR0FBRyxDQUFFLGFBQVlGLFNBQVUsY0FBYSxDQUFDLENBQ3pDRyxJQUFJLENBQUVYLFFBQVEsSUFBSztNQUFBWCxhQUFBLEdBQUFRLENBQUE7TUFBQVIsYUFBQSxHQUFBTSxDQUFBO01BQUEsT0FBQWMsUUFBUSxDQUFDVixxQkFBcUIsQ0FBQ0MsUUFBUSxDQUFDLENBQUM7SUFBRCxDQUFDLENBQUMsQ0FDN0RZLEtBQUssQ0FBRVAsS0FBSyxJQUFLO01BQUFoQixhQUFBLEdBQUFRLENBQUE7TUFBQVIsYUFBQSxHQUFBTSxDQUFBO01BQ2hCYyxRQUFRLENBQUNMLGtCQUFrQixDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7RUFDTixDQUFDO0FBQUQsQ0FBQztBQUVELGVBQWVFLGNBQWM7QUFDN0IsU0FBU1gsdUJBQXVCLEVBQUVHLHFCQUFxQixFQUFFSyxrQkFBa0IifQ==