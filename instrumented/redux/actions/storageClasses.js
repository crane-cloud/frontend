function cov_26ud2aolbe() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/storageClasses.js";
  var hash = "8b023f0f7999c910b24b052acca50db0001e7baf";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/storageClasses.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 41
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 48
        },
        end: {
          line: 10,
          column: 1
        }
      },
      "2": {
        start: {
          line: 12,
          column: 38
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 53
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "4": {
        start: {
          line: 17,
          column: 35
        },
        end: {
          line: 23,
          column: 2
        }
      },
      "5": {
        start: {
          line: 17,
          column: 47
        },
        end: {
          line: 23,
          column: 1
        }
      },
      "6": {
        start: {
          line: 25,
          column: 28
        },
        end: {
          line: 34,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 43
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
          column: 40
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
          column: 66
        }
      },
      "11": {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 32,
          column: 43
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 8,
            column: 41
          },
          end: {
            line: 8,
            column: 42
          }
        },
        loc: {
          start: {
            line: 8,
            column: 48
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
            column: 38
          },
          end: {
            line: 12,
            column: 39
          }
        },
        loc: {
          start: {
            line: 12,
            column: 53
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
            column: 35
          },
          end: {
            line: 17,
            column: 36
          }
        },
        loc: {
          start: {
            line: 17,
            column: 47
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
            column: 28
          },
          end: {
            line: 25,
            column: 29
          }
        },
        loc: {
          start: {
            line: 25,
            column: 43
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
            column: 43
          },
          end: {
            line: 25,
            column: 44
          }
        },
        loc: {
          start: {
            line: 25,
            column: 57
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
            column: 66
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
    hash: "8b023f0f7999c910b24b052acca50db0001e7baf"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_26ud2aolbe = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_26ud2aolbe();
import axios from "../../axios";
import { GET_STORAGE_CLASS_SUCCESS, GET_STORAGE_CLASS_FAIL, START_GETTING_STORAGE_CLASS } from "./actionTypes";
cov_26ud2aolbe().s[0]++;
export const startFetchingStorageClass = () => {
  cov_26ud2aolbe().f[0]++;
  cov_26ud2aolbe().s[1]++;
  return {
    type: START_GETTING_STORAGE_CLASS
  };
};
cov_26ud2aolbe().s[2]++;
export const getStorageClassSuccess = response => {
  cov_26ud2aolbe().f[1]++;
  cov_26ud2aolbe().s[3]++;
  return {
    type: GET_STORAGE_CLASS_SUCCESS,
    payload: response.data.data
  };
};
cov_26ud2aolbe().s[4]++;
export const getStorageClassFail = error => {
  cov_26ud2aolbe().f[2]++;
  cov_26ud2aolbe().s[5]++;
  return {
    type: GET_STORAGE_CLASS_FAIL,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_26ud2aolbe().s[6]++;
const getStorageClassList = clusterId => {
  cov_26ud2aolbe().f[3]++;
  cov_26ud2aolbe().s[7]++;
  return dispatch => {
    cov_26ud2aolbe().f[4]++;
    cov_26ud2aolbe().s[8]++;
    dispatch(startFetchingStorageClass());
    cov_26ud2aolbe().s[9]++;
    return axios.get(`/clusters/${clusterId}/storage_classes`).then(response => {
      cov_26ud2aolbe().f[5]++;
      cov_26ud2aolbe().s[10]++;
      return dispatch(getStorageClassSuccess(response));
    }).catch(error => {
      cov_26ud2aolbe().f[6]++;
      cov_26ud2aolbe().s[11]++;
      dispatch(getStorageClassFail(error));
    });
  };
};
export default getStorageClassList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjZ1ZDJhb2xiZSIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJHRVRfU1RPUkFHRV9DTEFTU19TVUNDRVNTIiwiR0VUX1NUT1JBR0VfQ0xBU1NfRkFJTCIsIlNUQVJUX0dFVFRJTkdfU1RPUkFHRV9DTEFTUyIsInMiLCJzdGFydEZldGNoaW5nU3RvcmFnZUNsYXNzIiwiZiIsInR5cGUiLCJnZXRTdG9yYWdlQ2xhc3NTdWNjZXNzIiwicmVzcG9uc2UiLCJwYXlsb2FkIiwiZGF0YSIsImdldFN0b3JhZ2VDbGFzc0ZhaWwiLCJlcnJvciIsInN0YXR1cyIsImdldFN0b3JhZ2VDbGFzc0xpc3QiLCJjbHVzdGVySWQiLCJkaXNwYXRjaCIsImdldCIsInRoZW4iLCJjYXRjaCJdLCJzb3VyY2VzIjpbInN0b3JhZ2VDbGFzc2VzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiLi4vLi4vYXhpb3NcIjtcbmltcG9ydCB7XG4gIEdFVF9TVE9SQUdFX0NMQVNTX1NVQ0NFU1MsXG4gIEdFVF9TVE9SQUdFX0NMQVNTX0ZBSUwsXG4gIFNUQVJUX0dFVFRJTkdfU1RPUkFHRV9DTEFTUyxcbn0gZnJvbSBcIi4vYWN0aW9uVHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IHN0YXJ0RmV0Y2hpbmdTdG9yYWdlQ2xhc3MgPSAoKSA9PiAoe1xuICB0eXBlOiBTVEFSVF9HRVRUSU5HX1NUT1JBR0VfQ0xBU1MsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldFN0b3JhZ2VDbGFzc1N1Y2Nlc3MgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IEdFVF9TVE9SQUdFX0NMQVNTX1NVQ0NFU1MsXG4gIHBheWxvYWQ6IHJlc3BvbnNlLmRhdGEuZGF0YSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZ2V0U3RvcmFnZUNsYXNzRmFpbCA9IChlcnJvcikgPT4gKHtcbiAgdHlwZTogR0VUX1NUT1JBR0VfQ0xBU1NfRkFJTCxcbiAgcGF5bG9hZDoge1xuICAgIHN0YXR1czogZmFsc2UsXG4gICAgZXJyb3I6IGVycm9yLnN0YXR1cyxcbiAgfSxcbn0pO1xuXG5jb25zdCBnZXRTdG9yYWdlQ2xhc3NMaXN0ID0gKGNsdXN0ZXJJZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHN0YXJ0RmV0Y2hpbmdTdG9yYWdlQ2xhc3MoKSk7XG5cbiAgcmV0dXJuIGF4aW9zXG4gICAgLmdldChgL2NsdXN0ZXJzLyR7Y2x1c3RlcklkfS9zdG9yYWdlX2NsYXNzZXNgKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gZGlzcGF0Y2goZ2V0U3RvcmFnZUNsYXNzU3VjY2VzcyhyZXNwb25zZSkpKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGRpc3BhdGNoKGdldFN0b3JhZ2VDbGFzc0ZhaWwoZXJyb3IpKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFN0b3JhZ2VDbGFzc0xpc3Q7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixPQUFPRSxLQUFLLE1BQU0sYUFBYTtBQUMvQixTQUNFQyx5QkFBeUIsRUFDekJDLHNCQUFzQixFQUN0QkMsMkJBQTJCLFFBQ3RCLGVBQWU7QUFBQ0wsY0FBQSxHQUFBTSxDQUFBO0FBRXZCLE9BQU8sTUFBTUMseUJBQXlCLEdBQUdBLENBQUEsS0FBTztFQUFBUCxjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUE7SUFDOUNHLElBQUksRUFBRUo7RUFDUixDQUFDO0FBQUQsQ0FBRTtBQUFDTCxjQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1JLHNCQUFzQixHQUFJQyxRQUFRLElBQU07RUFBQVgsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ25ERyxJQUFJLEVBQUVOLHlCQUF5QjtJQUMvQlMsT0FBTyxFQUFFRCxRQUFRLENBQUNFLElBQUksQ0FBQ0E7RUFDekIsQ0FBQztBQUFELENBQUU7QUFBQ2IsY0FBQSxHQUFBTSxDQUFBO0FBRUgsT0FBTyxNQUFNUSxtQkFBbUIsR0FBSUMsS0FBSyxJQUFNO0VBQUFmLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQTtJQUM3Q0csSUFBSSxFQUFFTCxzQkFBc0I7SUFDNUJRLE9BQU8sRUFBRTtNQUNQSSxNQUFNLEVBQUUsS0FBSztNQUNiRCxLQUFLLEVBQUVBLEtBQUssQ0FBQ0M7SUFDZjtFQUNGLENBQUM7QUFBRCxDQUFFO0FBQUNoQixjQUFBLEdBQUFNLENBQUE7QUFFSCxNQUFNVyxtQkFBbUIsR0FBSUMsU0FBUyxJQUFLO0VBQUFsQixjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUEsT0FBQ2EsUUFBUSxJQUFLO0lBQUFuQixjQUFBLEdBQUFRLENBQUE7SUFBQVIsY0FBQSxHQUFBTSxDQUFBO0lBQ3ZEYSxRQUFRLENBQUNaLHlCQUF5QixFQUFFLENBQUM7SUFBQ1AsY0FBQSxHQUFBTSxDQUFBO0lBRXRDLE9BQU9KLEtBQUssQ0FDVGtCLEdBQUcsQ0FBRSxhQUFZRixTQUFVLGtCQUFpQixDQUFDLENBQzdDRyxJQUFJLENBQUVWLFFBQVEsSUFBSztNQUFBWCxjQUFBLEdBQUFRLENBQUE7TUFBQVIsY0FBQSxHQUFBTSxDQUFBO01BQUEsT0FBQWEsUUFBUSxDQUFDVCxzQkFBc0IsQ0FBQ0MsUUFBUSxDQUFDLENBQUM7SUFBRCxDQUFDLENBQUMsQ0FDOURXLEtBQUssQ0FBRVAsS0FBSyxJQUFLO01BQUFmLGNBQUEsR0FBQVEsQ0FBQTtNQUFBUixjQUFBLEdBQUFNLENBQUE7TUFDaEJhLFFBQVEsQ0FBQ0wsbUJBQW1CLENBQUNDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztFQUNOLENBQUM7QUFBRCxDQUFDO0FBRUQsZUFBZUUsbUJBQW1CIn0=