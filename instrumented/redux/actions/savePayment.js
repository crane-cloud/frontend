function cov_2fw0dqhjj5() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/savePayment.js";
  var hash = "bf851ae576bdf3749968a9e74273fde752359f8a";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/savePayment.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 29
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 36
        },
        end: {
          line: 10,
          column: 1
        }
      },
      "2": {
        start: {
          line: 12,
          column: 34
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 49
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "4": {
        start: {
          line: 17,
          column: 33
        },
        end: {
          line: 23,
          column: 2
        }
      },
      "5": {
        start: {
          line: 17,
          column: 45
        },
        end: {
          line: 23,
          column: 1
        }
      },
      "6": {
        start: {
          line: 25,
          column: 20
        },
        end: {
          line: 33,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 48
        },
        end: {
          line: 33,
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
          column: 28
        }
      },
      "9": {
        start: {
          line: 27,
          column: 2
        },
        end: {
          line: 32,
          column: 7
        }
      },
      "10": {
        start: {
          line: 29,
          column: 24
        },
        end: {
          line: 29,
          column: 62
        }
      },
      "11": {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 31,
          column: 41
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 8,
            column: 29
          },
          end: {
            line: 8,
            column: 30
          }
        },
        loc: {
          start: {
            line: 8,
            column: 36
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
            column: 34
          },
          end: {
            line: 12,
            column: 35
          }
        },
        loc: {
          start: {
            line: 12,
            column: 49
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
            column: 33
          },
          end: {
            line: 17,
            column: 34
          }
        },
        loc: {
          start: {
            line: 17,
            column: 45
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
            column: 20
          },
          end: {
            line: 25,
            column: 21
          }
        },
        loc: {
          start: {
            line: 25,
            column: 48
          },
          end: {
            line: 33,
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
            column: 48
          },
          end: {
            line: 25,
            column: 49
          }
        },
        loc: {
          start: {
            line: 25,
            column: 62
          },
          end: {
            line: 33,
            column: 1
          }
        },
        line: 25
      },
      "5": {
        name: "(anonymous_5)",
        decl: {
          start: {
            line: 29,
            column: 10
          },
          end: {
            line: 29,
            column: 11
          }
        },
        loc: {
          start: {
            line: 29,
            column: 24
          },
          end: {
            line: 29,
            column: 62
          }
        },
        line: 29
      },
      "6": {
        name: "(anonymous_6)",
        decl: {
          start: {
            line: 30,
            column: 11
          },
          end: {
            line: 30,
            column: 12
          }
        },
        loc: {
          start: {
            line: 30,
            column: 22
          },
          end: {
            line: 32,
            column: 5
          }
        },
        line: 30
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
    hash: "bf851ae576bdf3749968a9e74273fde752359f8a"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2fw0dqhjj5 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2fw0dqhjj5();
import axios from "../../axios";
import { SAVE_PAYMENT_SUCCESS, SAVE_PAYMENT_FAIL, START_SAVING_PAYMENT } from "./actionTypes";
cov_2fw0dqhjj5().s[0]++;
export const startTheFetch = () => {
  cov_2fw0dqhjj5().f[0]++;
  cov_2fw0dqhjj5().s[1]++;
  return {
    type: START_SAVING_PAYMENT
  };
};
cov_2fw0dqhjj5().s[2]++;
export const savePaymentSuccess = response => {
  cov_2fw0dqhjj5().f[1]++;
  cov_2fw0dqhjj5().s[3]++;
  return {
    type: SAVE_PAYMENT_SUCCESS,
    payload: response.data
  };
};
cov_2fw0dqhjj5().s[4]++;
export const savePaymentFailed = error => {
  cov_2fw0dqhjj5().f[2]++;
  cov_2fw0dqhjj5().s[5]++;
  return {
    type: SAVE_PAYMENT_FAIL,
    payload: {
      status: false,
      error: error
    }
  };
};
cov_2fw0dqhjj5().s[6]++;
const savePayment = (paymentData, projectID) => {
  cov_2fw0dqhjj5().f[3]++;
  cov_2fw0dqhjj5().s[7]++;
  return dispatch => {
    cov_2fw0dqhjj5().f[4]++;
    cov_2fw0dqhjj5().s[8]++;
    dispatch(startTheFetch());
    cov_2fw0dqhjj5().s[9]++;
    return axios.post(`/projects/${projectID}/transactions`, paymentData).then(response => {
      cov_2fw0dqhjj5().f[5]++;
      cov_2fw0dqhjj5().s[10]++;
      return dispatch(savePaymentSuccess(response));
    }).catch(error => {
      cov_2fw0dqhjj5().f[6]++;
      cov_2fw0dqhjj5().s[11]++;
      dispatch(savePaymentFailed(error));
    });
  };
};
export default savePayment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMmZ3MGRxaGpqNSIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJTQVZFX1BBWU1FTlRfU1VDQ0VTUyIsIlNBVkVfUEFZTUVOVF9GQUlMIiwiU1RBUlRfU0FWSU5HX1BBWU1FTlQiLCJzIiwic3RhcnRUaGVGZXRjaCIsImYiLCJ0eXBlIiwic2F2ZVBheW1lbnRTdWNjZXNzIiwicmVzcG9uc2UiLCJwYXlsb2FkIiwiZGF0YSIsInNhdmVQYXltZW50RmFpbGVkIiwiZXJyb3IiLCJzdGF0dXMiLCJzYXZlUGF5bWVudCIsInBheW1lbnREYXRhIiwicHJvamVjdElEIiwiZGlzcGF0Y2giLCJwb3N0IiwidGhlbiIsImNhdGNoIl0sInNvdXJjZXMiOlsic2F2ZVBheW1lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCIuLi8uLi9heGlvc1wiO1xuaW1wb3J0IHtcbiAgU0FWRV9QQVlNRU5UX1NVQ0NFU1MsXG4gIFNBVkVfUEFZTUVOVF9GQUlMLFxuICBTVEFSVF9TQVZJTkdfUEFZTUVOVCxcbn0gZnJvbSBcIi4vYWN0aW9uVHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IHN0YXJ0VGhlRmV0Y2ggPSAoKSA9PiAoe1xuICB0eXBlOiBTVEFSVF9TQVZJTkdfUEFZTUVOVCxcbn0pO1xuXG5leHBvcnQgY29uc3Qgc2F2ZVBheW1lbnRTdWNjZXNzID0gKHJlc3BvbnNlKSA9PiAoe1xuICB0eXBlOiBTQVZFX1BBWU1FTlRfU1VDQ0VTUyxcbiAgcGF5bG9hZDogcmVzcG9uc2UuZGF0YSxcbn0pO1xuXG5leHBvcnQgY29uc3Qgc2F2ZVBheW1lbnRGYWlsZWQgPSAoZXJyb3IpID0+ICh7XG4gIHR5cGU6IFNBVkVfUEFZTUVOVF9GQUlMLFxuICBwYXlsb2FkOiB7XG4gICAgc3RhdHVzOiBmYWxzZSxcbiAgICBlcnJvcjogZXJyb3IsXG4gIH0sXG59KTtcblxuY29uc3Qgc2F2ZVBheW1lbnQgPSAocGF5bWVudERhdGEsIHByb2plY3RJRCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHN0YXJ0VGhlRmV0Y2goKSk7XG4gIHJldHVybiBheGlvc1xuICAgIC5wb3N0KGAvcHJvamVjdHMvJHtwcm9qZWN0SUR9L3RyYW5zYWN0aW9uc2AsIHBheW1lbnREYXRhKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gZGlzcGF0Y2goc2F2ZVBheW1lbnRTdWNjZXNzKHJlc3BvbnNlKSkpXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgZGlzcGF0Y2goc2F2ZVBheW1lbnRGYWlsZWQoZXJyb3IpKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNhdmVQYXltZW50O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosT0FBT0UsS0FBSyxNQUFNLGFBQWE7QUFDL0IsU0FDRUMsb0JBQW9CLEVBQ3BCQyxpQkFBaUIsRUFDakJDLG9CQUFvQixRQUNmLGVBQWU7QUFBQ0wsY0FBQSxHQUFBTSxDQUFBO0FBRXZCLE9BQU8sTUFBTUMsYUFBYSxHQUFHQSxDQUFBLEtBQU87RUFBQVAsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ2xDRyxJQUFJLEVBQUVKO0VBQ1IsQ0FBQztBQUFELENBQUU7QUFBQ0wsY0FBQSxHQUFBTSxDQUFBO0FBRUgsT0FBTyxNQUFNSSxrQkFBa0IsR0FBSUMsUUFBUSxJQUFNO0VBQUFYLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQTtJQUMvQ0csSUFBSSxFQUFFTixvQkFBb0I7SUFDMUJTLE9BQU8sRUFBRUQsUUFBUSxDQUFDRTtFQUNwQixDQUFDO0FBQUQsQ0FBRTtBQUFDYixjQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1RLGlCQUFpQixHQUFJQyxLQUFLLElBQU07RUFBQWYsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQzNDRyxJQUFJLEVBQUVMLGlCQUFpQjtJQUN2QlEsT0FBTyxFQUFFO01BQ1BJLE1BQU0sRUFBRSxLQUFLO01BQ2JELEtBQUssRUFBRUE7SUFDVDtFQUNGLENBQUM7QUFBRCxDQUFFO0FBQUNmLGNBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1XLFdBQVcsR0FBR0EsQ0FBQ0MsV0FBVyxFQUFFQyxTQUFTLEtBQUs7RUFBQW5CLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQSxPQUFDYyxRQUFRLElBQUs7SUFBQXBCLGNBQUEsR0FBQVEsQ0FBQTtJQUFBUixjQUFBLEdBQUFNLENBQUE7SUFDNURjLFFBQVEsQ0FBQ2IsYUFBYSxFQUFFLENBQUM7SUFBQ1AsY0FBQSxHQUFBTSxDQUFBO0lBQzFCLE9BQU9KLEtBQUssQ0FDVG1CLElBQUksQ0FBRSxhQUFZRixTQUFVLGVBQWMsRUFBRUQsV0FBVyxDQUFDLENBQ3hESSxJQUFJLENBQUVYLFFBQVEsSUFBSztNQUFBWCxjQUFBLEdBQUFRLENBQUE7TUFBQVIsY0FBQSxHQUFBTSxDQUFBO01BQUEsT0FBQWMsUUFBUSxDQUFDVixrQkFBa0IsQ0FBQ0MsUUFBUSxDQUFDLENBQUM7SUFBRCxDQUFDLENBQUMsQ0FDMURZLEtBQUssQ0FBRVIsS0FBSyxJQUFLO01BQUFmLGNBQUEsR0FBQVEsQ0FBQTtNQUFBUixjQUFBLEdBQUFNLENBQUE7TUFDaEJjLFFBQVEsQ0FBQ04saUJBQWlCLENBQUNDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztFQUNOLENBQUM7QUFBRCxDQUFDO0FBRUQsZUFBZUUsV0FBVyJ9