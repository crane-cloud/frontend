function cov_2mqn61ai9x() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/nodeCluster.js";
  var hash = "2ab13cef7d62806c031f8235ba2b1c0cf847635b";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/nodeCluster.js",
    statementMap: {
      "0": {
        start: {
          line: 9,
          column: 34
        },
        end: {
          line: 11,
          column: 2
        }
      },
      "1": {
        start: {
          line: 9,
          column: 41
        },
        end: {
          line: 11,
          column: 1
        }
      },
      "2": {
        start: {
          line: 13,
          column: 31
        },
        end: {
          line: 16,
          column: 2
        }
      },
      "3": {
        start: {
          line: 13,
          column: 46
        },
        end: {
          line: 16,
          column: 1
        }
      },
      "4": {
        start: {
          line: 18,
          column: 28
        },
        end: {
          line: 24,
          column: 2
        }
      },
      "5": {
        start: {
          line: 18,
          column: 40
        },
        end: {
          line: 24,
          column: 1
        }
      },
      "6": {
        start: {
          line: 26,
          column: 21
        },
        end: {
          line: 35,
          column: 1
        }
      },
      "7": {
        start: {
          line: 26,
          column: 36
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
          column: 33
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
          column: 59
        }
      },
      "11": {
        start: {
          line: 33,
          column: 6
        },
        end: {
          line: 33,
          column: 36
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 9,
            column: 34
          },
          end: {
            line: 9,
            column: 35
          }
        },
        loc: {
          start: {
            line: 9,
            column: 41
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
            column: 31
          },
          end: {
            line: 13,
            column: 32
          }
        },
        loc: {
          start: {
            line: 13,
            column: 46
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
            column: 28
          },
          end: {
            line: 18,
            column: 29
          }
        },
        loc: {
          start: {
            line: 18,
            column: 40
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
            column: 21
          },
          end: {
            line: 26,
            column: 22
          }
        },
        loc: {
          start: {
            line: 26,
            column: 36
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
            column: 36
          },
          end: {
            line: 26,
            column: 37
          }
        },
        loc: {
          start: {
            line: 26,
            column: 50
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
            column: 59
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
    hash: "2ab13cef7d62806c031f8235ba2b1c0cf847635b"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2mqn61ai9x = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2mqn61ai9x();
import axios from "../../axios";
import { GET_NODES_SUCCESS, GET_NODES_FAIL, START_GETTING_NODES } from "./actionTypes";
cov_2mqn61ai9x().s[0]++;
export const startFetchingNodes = () => {
  cov_2mqn61ai9x().f[0]++;
  cov_2mqn61ai9x().s[1]++;
  return {
    type: START_GETTING_NODES
  };
};
cov_2mqn61ai9x().s[2]++;
export const getNodesSuccess = response => {
  cov_2mqn61ai9x().f[1]++;
  cov_2mqn61ai9x().s[3]++;
  return {
    type: GET_NODES_SUCCESS,
    payload: response.data.data
  };
};
cov_2mqn61ai9x().s[4]++;
export const getNodesFail = error => {
  cov_2mqn61ai9x().f[2]++;
  cov_2mqn61ai9x().s[5]++;
  return {
    type: GET_NODES_FAIL,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_2mqn61ai9x().s[6]++;
const getNodesList = clusterID => {
  cov_2mqn61ai9x().f[3]++;
  cov_2mqn61ai9x().s[7]++;
  return dispatch => {
    cov_2mqn61ai9x().f[4]++;
    cov_2mqn61ai9x().s[8]++;
    dispatch(startFetchingNodes());
    cov_2mqn61ai9x().s[9]++;
    return axios.get(`/clusters/${clusterID}/nodes`).then(response => {
      cov_2mqn61ai9x().f[5]++;
      cov_2mqn61ai9x().s[10]++;
      return dispatch(getNodesSuccess(response));
    }).catch(error => {
      cov_2mqn61ai9x().f[6]++;
      cov_2mqn61ai9x().s[11]++;
      dispatch(getNodesFail(error));
    });
  };
};
export default getNodesList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMm1xbjYxYWk5eCIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJHRVRfTk9ERVNfU1VDQ0VTUyIsIkdFVF9OT0RFU19GQUlMIiwiU1RBUlRfR0VUVElOR19OT0RFUyIsInMiLCJzdGFydEZldGNoaW5nTm9kZXMiLCJmIiwidHlwZSIsImdldE5vZGVzU3VjY2VzcyIsInJlc3BvbnNlIiwicGF5bG9hZCIsImRhdGEiLCJnZXROb2Rlc0ZhaWwiLCJlcnJvciIsInN0YXR1cyIsImdldE5vZGVzTGlzdCIsImNsdXN0ZXJJRCIsImRpc3BhdGNoIiwiZ2V0IiwidGhlbiIsImNhdGNoIl0sInNvdXJjZXMiOlsibm9kZUNsdXN0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCIuLi8uLi9heGlvc1wiO1xuXG5pbXBvcnQge1xuICBHRVRfTk9ERVNfU1VDQ0VTUyxcbiAgR0VUX05PREVTX0ZBSUwsXG4gIFNUQVJUX0dFVFRJTkdfTk9ERVMsXG59IGZyb20gXCIuL2FjdGlvblR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBzdGFydEZldGNoaW5nTm9kZXMgPSAoKSA9PiAoe1xuICB0eXBlOiBTVEFSVF9HRVRUSU5HX05PREVTLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXROb2Rlc1N1Y2Nlc3MgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IEdFVF9OT0RFU19TVUNDRVNTLFxuICBwYXlsb2FkOiByZXNwb25zZS5kYXRhLmRhdGEsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldE5vZGVzRmFpbCA9IChlcnJvcikgPT4gKHtcbiAgdHlwZTogR0VUX05PREVTX0ZBSUwsXG4gIHBheWxvYWQ6IHtcbiAgICBzdGF0dXM6IGZhbHNlLFxuICAgIGVycm9yOiBlcnJvci5zdGF0dXMsXG4gIH0sXG59KTtcblxuY29uc3QgZ2V0Tm9kZXNMaXN0ID0gKGNsdXN0ZXJJRCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHN0YXJ0RmV0Y2hpbmdOb2RlcygpKTtcblxuICByZXR1cm4gYXhpb3NcbiAgICAuZ2V0KGAvY2x1c3RlcnMvJHtjbHVzdGVySUR9L25vZGVzYClcbiAgICAudGhlbigocmVzcG9uc2UpID0+IGRpc3BhdGNoKGdldE5vZGVzU3VjY2VzcyhyZXNwb25zZSkpKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGRpc3BhdGNoKGdldE5vZGVzRmFpbChlcnJvcikpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0Tm9kZXNMaXN0O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosT0FBT0UsS0FBSyxNQUFNLGFBQWE7QUFFL0IsU0FDRUMsaUJBQWlCLEVBQ2pCQyxjQUFjLEVBQ2RDLG1CQUFtQixRQUNkLGVBQWU7QUFBQ0wsY0FBQSxHQUFBTSxDQUFBO0FBRXZCLE9BQU8sTUFBTUMsa0JBQWtCLEdBQUdBLENBQUEsS0FBTztFQUFBUCxjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUE7SUFDdkNHLElBQUksRUFBRUo7RUFDUixDQUFDO0FBQUQsQ0FBRTtBQUFDTCxjQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1JLGVBQWUsR0FBSUMsUUFBUSxJQUFNO0VBQUFYLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQTtJQUM1Q0csSUFBSSxFQUFFTixpQkFBaUI7SUFDdkJTLE9BQU8sRUFBRUQsUUFBUSxDQUFDRSxJQUFJLENBQUNBO0VBQ3pCLENBQUM7QUFBRCxDQUFFO0FBQUNiLGNBQUEsR0FBQU0sQ0FBQTtBQUVILE9BQU8sTUFBTVEsWUFBWSxHQUFJQyxLQUFLLElBQU07RUFBQWYsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ3RDRyxJQUFJLEVBQUVMLGNBQWM7SUFDcEJRLE9BQU8sRUFBRTtNQUNQSSxNQUFNLEVBQUUsS0FBSztNQUNiRCxLQUFLLEVBQUVBLEtBQUssQ0FBQ0M7SUFDZjtFQUNGLENBQUM7QUFBRCxDQUFFO0FBQUNoQixjQUFBLEdBQUFNLENBQUE7QUFFSCxNQUFNVyxZQUFZLEdBQUlDLFNBQVMsSUFBSztFQUFBbEIsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBLE9BQUNhLFFBQVEsSUFBSztJQUFBbkIsY0FBQSxHQUFBUSxDQUFBO0lBQUFSLGNBQUEsR0FBQU0sQ0FBQTtJQUNoRGEsUUFBUSxDQUFDWixrQkFBa0IsRUFBRSxDQUFDO0lBQUNQLGNBQUEsR0FBQU0sQ0FBQTtJQUUvQixPQUFPSixLQUFLLENBQ1RrQixHQUFHLENBQUUsYUFBWUYsU0FBVSxRQUFPLENBQUMsQ0FDbkNHLElBQUksQ0FBRVYsUUFBUSxJQUFLO01BQUFYLGNBQUEsR0FBQVEsQ0FBQTtNQUFBUixjQUFBLEdBQUFNLENBQUE7TUFBQSxPQUFBYSxRQUFRLENBQUNULGVBQWUsQ0FBQ0MsUUFBUSxDQUFDLENBQUM7SUFBRCxDQUFDLENBQUMsQ0FDdkRXLEtBQUssQ0FBRVAsS0FBSyxJQUFLO01BQUFmLGNBQUEsR0FBQVEsQ0FBQTtNQUFBUixjQUFBLEdBQUFNLENBQUE7TUFDaEJhLFFBQVEsQ0FBQ0wsWUFBWSxDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7RUFDTixDQUFDO0FBQUQsQ0FBQztBQUVELGVBQWVFLFlBQVkifQ==