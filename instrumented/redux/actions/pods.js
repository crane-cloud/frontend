function cov_jdpqcnr6x() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/pods.js";
  var hash = "57fb678cd30a0328fb07fd72508d1359cc6165c3";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/pods.js",
    statementMap: {
      "0": {
        start: {
          line: 9,
          column: 33
        },
        end: {
          line: 11,
          column: 2
        }
      },
      "1": {
        start: {
          line: 9,
          column: 40
        },
        end: {
          line: 11,
          column: 1
        }
      },
      "2": {
        start: {
          line: 13,
          column: 30
        },
        end: {
          line: 16,
          column: 2
        }
      },
      "3": {
        start: {
          line: 13,
          column: 45
        },
        end: {
          line: 16,
          column: 1
        }
      },
      "4": {
        start: {
          line: 18,
          column: 27
        },
        end: {
          line: 24,
          column: 2
        }
      },
      "5": {
        start: {
          line: 18,
          column: 39
        },
        end: {
          line: 24,
          column: 1
        }
      },
      "6": {
        start: {
          line: 26,
          column: 20
        },
        end: {
          line: 35,
          column: 1
        }
      },
      "7": {
        start: {
          line: 26,
          column: 35
        },
        end: {
          line: 35,
          column: 1
        }
      },
      "8": {
        start: {
          line: 27,
          column: 2
        },
        end: {
          line: 27,
          column: 32
        }
      },
      "9": {
        start: {
          line: 29,
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
          column: 58
        }
      },
      "11": {
        start: {
          line: 33,
          column: 6
        },
        end: {
          line: 33,
          column: 35
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 9,
            column: 33
          },
          end: {
            line: 9,
            column: 34
          }
        },
        loc: {
          start: {
            line: 9,
            column: 40
          },
          end: {
            line: 11,
            column: 1
          }
        },
        line: 9
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 13,
            column: 30
          },
          end: {
            line: 13,
            column: 31
          }
        },
        loc: {
          start: {
            line: 13,
            column: 45
          },
          end: {
            line: 16,
            column: 1
          }
        },
        line: 13
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 18,
            column: 27
          },
          end: {
            line: 18,
            column: 28
          }
        },
        loc: {
          start: {
            line: 18,
            column: 39
          },
          end: {
            line: 24,
            column: 1
          }
        },
        line: 18
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 26,
            column: 20
          },
          end: {
            line: 26,
            column: 21
          }
        },
        loc: {
          start: {
            line: 26,
            column: 35
          },
          end: {
            line: 35,
            column: 1
          }
        },
        line: 26
      },
      "4": {
        name: "(anonymous_4)",
        decl: {
          start: {
            line: 26,
            column: 35
          },
          end: {
            line: 26,
            column: 36
          }
        },
        loc: {
          start: {
            line: 26,
            column: 49
          },
          end: {
            line: 35,
            column: 1
          }
        },
        line: 26
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
            column: 58
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
    hash: "57fb678cd30a0328fb07fd72508d1359cc6165c3"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_jdpqcnr6x = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_jdpqcnr6x();
import axios from "../../axios";
import { GET_PODS_SUCCESS, GET_PODS_FAIL, START_GETTING_PODS } from "./actionTypes";
cov_jdpqcnr6x().s[0]++;
export const startFetchingPods = () => {
  cov_jdpqcnr6x().f[0]++;
  cov_jdpqcnr6x().s[1]++;
  return {
    type: START_GETTING_PODS
  };
};
cov_jdpqcnr6x().s[2]++;
export const getPodsSuccess = response => {
  cov_jdpqcnr6x().f[1]++;
  cov_jdpqcnr6x().s[3]++;
  return {
    type: GET_PODS_SUCCESS,
    payload: response.data.data
  };
};
cov_jdpqcnr6x().s[4]++;
export const getPodsFail = error => {
  cov_jdpqcnr6x().f[2]++;
  cov_jdpqcnr6x().s[5]++;
  return {
    type: GET_PODS_FAIL,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_jdpqcnr6x().s[6]++;
const getPodsList = clusterId => {
  cov_jdpqcnr6x().f[3]++;
  cov_jdpqcnr6x().s[7]++;
  return dispatch => {
    cov_jdpqcnr6x().f[4]++;
    cov_jdpqcnr6x().s[8]++;
    dispatch(startFetchingPods());
    cov_jdpqcnr6x().s[9]++;
    return axios.get(`/clusters/${clusterId}/pods`).then(response => {
      cov_jdpqcnr6x().f[5]++;
      cov_jdpqcnr6x().s[10]++;
      return dispatch(getPodsSuccess(response));
    }).catch(error => {
      cov_jdpqcnr6x().f[6]++;
      cov_jdpqcnr6x().s[11]++;
      dispatch(getPodsFail(error));
    });
  };
};
export default getPodsList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfamRwcWNucjZ4IiwiYWN0dWFsQ292ZXJhZ2UiLCJheGlvcyIsIkdFVF9QT0RTX1NVQ0NFU1MiLCJHRVRfUE9EU19GQUlMIiwiU1RBUlRfR0VUVElOR19QT0RTIiwicyIsInN0YXJ0RmV0Y2hpbmdQb2RzIiwiZiIsInR5cGUiLCJnZXRQb2RzU3VjY2VzcyIsInJlc3BvbnNlIiwicGF5bG9hZCIsImRhdGEiLCJnZXRQb2RzRmFpbCIsImVycm9yIiwic3RhdHVzIiwiZ2V0UG9kc0xpc3QiLCJjbHVzdGVySWQiLCJkaXNwYXRjaCIsImdldCIsInRoZW4iLCJjYXRjaCJdLCJzb3VyY2VzIjpbInBvZHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCIuLi8uLi9heGlvc1wiO1xuXG5pbXBvcnQge1xuICBHRVRfUE9EU19TVUNDRVNTLFxuICBHRVRfUE9EU19GQUlMLFxuICBTVEFSVF9HRVRUSU5HX1BPRFMsXG59IGZyb20gXCIuL2FjdGlvblR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBzdGFydEZldGNoaW5nUG9kcyA9ICgpID0+ICh7XG4gIHR5cGU6IFNUQVJUX0dFVFRJTkdfUE9EUyxcbn0pO1xuXG5leHBvcnQgY29uc3QgZ2V0UG9kc1N1Y2Nlc3MgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IEdFVF9QT0RTX1NVQ0NFU1MsXG4gIHBheWxvYWQ6IHJlc3BvbnNlLmRhdGEuZGF0YSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZ2V0UG9kc0ZhaWwgPSAoZXJyb3IpID0+ICh7XG4gIHR5cGU6IEdFVF9QT0RTX0ZBSUwsXG4gIHBheWxvYWQ6IHtcbiAgICBzdGF0dXM6IGZhbHNlLFxuICAgIGVycm9yOiBlcnJvci5zdGF0dXMsXG4gIH0sXG59KTtcblxuY29uc3QgZ2V0UG9kc0xpc3QgPSAoY2x1c3RlcklkKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgZGlzcGF0Y2goc3RhcnRGZXRjaGluZ1BvZHMoKSk7XG5cbiAgcmV0dXJuIGF4aW9zXG4gICAgLmdldChgL2NsdXN0ZXJzLyR7Y2x1c3RlcklkfS9wb2RzYClcbiAgICAudGhlbigocmVzcG9uc2UpID0+IGRpc3BhdGNoKGdldFBvZHNTdWNjZXNzKHJlc3BvbnNlKSkpXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgZGlzcGF0Y2goZ2V0UG9kc0ZhaWwoZXJyb3IpKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFBvZHNMaXN0O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosT0FBT0UsS0FBSyxNQUFNLGFBQWE7QUFFL0IsU0FDRUMsZ0JBQWdCLEVBQ2hCQyxhQUFhLEVBQ2JDLGtCQUFrQixRQUNiLGVBQWU7QUFBQ0wsYUFBQSxHQUFBTSxDQUFBO0FBRXZCLE9BQU8sTUFBTUMsaUJBQWlCLEdBQUdBLENBQUEsS0FBTztFQUFBUCxhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUE7SUFDdENHLElBQUksRUFBRUo7RUFDUixDQUFDO0FBQUQsQ0FBRTtBQUFDTCxhQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1JLGNBQWMsR0FBSUMsUUFBUSxJQUFNO0VBQUFYLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQTtJQUMzQ0csSUFBSSxFQUFFTixnQkFBZ0I7SUFDdEJTLE9BQU8sRUFBRUQsUUFBUSxDQUFDRSxJQUFJLENBQUNBO0VBQ3pCLENBQUM7QUFBRCxDQUFFO0FBQUNiLGFBQUEsR0FBQU0sQ0FBQTtBQUVILE9BQU8sTUFBTVEsV0FBVyxHQUFJQyxLQUFLLElBQU07RUFBQWYsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ3JDRyxJQUFJLEVBQUVMLGFBQWE7SUFDbkJRLE9BQU8sRUFBRTtNQUNQSSxNQUFNLEVBQUUsS0FBSztNQUNiRCxLQUFLLEVBQUVBLEtBQUssQ0FBQ0M7SUFDZjtFQUNGLENBQUM7QUFBRCxDQUFFO0FBQUNoQixhQUFBLEdBQUFNLENBQUE7QUFFSCxNQUFNVyxXQUFXLEdBQUlDLFNBQVMsSUFBSztFQUFBbEIsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBLE9BQUNhLFFBQVEsSUFBSztJQUFBbkIsYUFBQSxHQUFBUSxDQUFBO0lBQUFSLGFBQUEsR0FBQU0sQ0FBQTtJQUMvQ2EsUUFBUSxDQUFDWixpQkFBaUIsRUFBRSxDQUFDO0lBQUNQLGFBQUEsR0FBQU0sQ0FBQTtJQUU5QixPQUFPSixLQUFLLENBQ1RrQixHQUFHLENBQUUsYUFBWUYsU0FBVSxPQUFNLENBQUMsQ0FDbENHLElBQUksQ0FBRVYsUUFBUSxJQUFLO01BQUFYLGFBQUEsR0FBQVEsQ0FBQTtNQUFBUixhQUFBLEdBQUFNLENBQUE7TUFBQSxPQUFBYSxRQUFRLENBQUNULGNBQWMsQ0FBQ0MsUUFBUSxDQUFDLENBQUM7SUFBRCxDQUFDLENBQUMsQ0FDdERXLEtBQUssQ0FBRVAsS0FBSyxJQUFLO01BQUFmLGFBQUEsR0FBQVEsQ0FBQTtNQUFBUixhQUFBLEdBQUFNLENBQUE7TUFDaEJhLFFBQVEsQ0FBQ0wsV0FBVyxDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUM7RUFDTixDQUFDO0FBQUQsQ0FBQztBQUVELGVBQWVFLFdBQVcifQ==