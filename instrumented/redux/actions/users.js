function cov_s5gtf5fzr() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/users.js";
  var hash = "1f3124a6252693ca6e32707b290f936e19c9c994";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/users.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 33
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 40
        },
        end: {
          line: 10,
          column: 1
        }
      },
      "2": {
        start: {
          line: 12,
          column: 31
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 46
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "4": {
        start: {
          line: 17,
          column: 28
        },
        end: {
          line: 23,
          column: 2
        }
      },
      "5": {
        start: {
          line: 17,
          column: 40
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
          line: 33,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 27
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
          column: 32
        }
      },
      "9": {
        start: {
          line: 27,
          column: 2
        },
        end: {
          line: 32,
          column: 3
        }
      },
      "10": {
        start: {
          line: 28,
          column: 21
        },
        end: {
          line: 28,
          column: 46
        }
      },
      "11": {
        start: {
          line: 29,
          column: 4
        },
        end: {
          line: 29,
          column: 47
        }
      },
      "12": {
        start: {
          line: 31,
          column: 4
        },
        end: {
          line: 31,
          column: 34
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 8,
            column: 33
          },
          end: {
            line: 8,
            column: 34
          }
        },
        loc: {
          start: {
            line: 8,
            column: 40
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
            column: 31
          },
          end: {
            line: 12,
            column: 32
          }
        },
        loc: {
          start: {
            line: 12,
            column: 46
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
            column: 28
          },
          end: {
            line: 17,
            column: 29
          }
        },
        loc: {
          start: {
            line: 17,
            column: 40
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
            column: 27
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
            column: 27
          },
          end: {
            line: 25,
            column: 28
          }
        },
        loc: {
          start: {
            line: 25,
            column: 47
          },
          end: {
            line: 33,
            column: 1
          }
        },
        line: 25
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
      "11": 0,
      "12": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "1f3124a6252693ca6e32707b290f936e19c9c994"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_s5gtf5fzr = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_s5gtf5fzr();
import axios from "../../axios";
import { GET_USERS_SUCCESS, GET_USERS_FAIL, START_GETTING_USERS } from "./actionTypes";
cov_s5gtf5fzr().s[0]++;
export const startGettingUsers = () => {
  cov_s5gtf5fzr().f[0]++;
  cov_s5gtf5fzr().s[1]++;
  return {
    type: START_GETTING_USERS
  };
};
cov_s5gtf5fzr().s[2]++;
export const getUsersSuccess = response => {
  cov_s5gtf5fzr().f[1]++;
  cov_s5gtf5fzr().s[3]++;
  return {
    type: GET_USERS_SUCCESS,
    payload: response.data.data.users
  };
};
cov_s5gtf5fzr().s[4]++;
export const getUsersFail = error => {
  cov_s5gtf5fzr().f[2]++;
  cov_s5gtf5fzr().s[5]++;
  return {
    type: GET_USERS_FAIL,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_s5gtf5fzr().s[6]++;
const getUsersList = () => {
  cov_s5gtf5fzr().f[3]++;
  cov_s5gtf5fzr().s[7]++;
  return async dispatch => {
    cov_s5gtf5fzr().f[4]++;
    cov_s5gtf5fzr().s[8]++;
    dispatch(startGettingUsers());
    cov_s5gtf5fzr().s[9]++;
    try {
      const response = (cov_s5gtf5fzr().s[10]++, await axios.get(`/users`));
      cov_s5gtf5fzr().s[11]++;
      return dispatch(getUsersSuccess(response));
    } catch (error) {
      cov_s5gtf5fzr().s[12]++;
      dispatch(getUsersFail(error));
    }
  };
};
export default getUsersList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfczVndGY1ZnpyIiwiYWN0dWFsQ292ZXJhZ2UiLCJheGlvcyIsIkdFVF9VU0VSU19TVUNDRVNTIiwiR0VUX1VTRVJTX0ZBSUwiLCJTVEFSVF9HRVRUSU5HX1VTRVJTIiwicyIsInN0YXJ0R2V0dGluZ1VzZXJzIiwiZiIsInR5cGUiLCJnZXRVc2Vyc1N1Y2Nlc3MiLCJyZXNwb25zZSIsInBheWxvYWQiLCJkYXRhIiwidXNlcnMiLCJnZXRVc2Vyc0ZhaWwiLCJlcnJvciIsInN0YXR1cyIsImdldFVzZXJzTGlzdCIsImRpc3BhdGNoIiwiZ2V0Il0sInNvdXJjZXMiOlsidXNlcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCIuLi8uLi9heGlvc1wiO1xuaW1wb3J0IHtcbiAgR0VUX1VTRVJTX1NVQ0NFU1MsXG4gIEdFVF9VU0VSU19GQUlMLFxuICBTVEFSVF9HRVRUSU5HX1VTRVJTLFxufSBmcm9tIFwiLi9hY3Rpb25UeXBlc1wiO1xuXG5leHBvcnQgY29uc3Qgc3RhcnRHZXR0aW5nVXNlcnMgPSAoKSA9PiAoe1xuICB0eXBlOiBTVEFSVF9HRVRUSU5HX1VTRVJTLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRVc2Vyc1N1Y2Nlc3MgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IEdFVF9VU0VSU19TVUNDRVNTLFxuICBwYXlsb2FkOiByZXNwb25zZS5kYXRhLmRhdGEudXNlcnMsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJzRmFpbCA9IChlcnJvcikgPT4gKHtcbiAgdHlwZTogR0VUX1VTRVJTX0ZBSUwsXG4gIHBheWxvYWQ6IHtcbiAgICBzdGF0dXM6IGZhbHNlLFxuICAgIGVycm9yOiBlcnJvci5zdGF0dXMsXG4gIH0sXG59KTtcblxuY29uc3QgZ2V0VXNlcnNMaXN0ID0gKCkgPT4gYXN5bmMgKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHN0YXJ0R2V0dGluZ1VzZXJzKCkpO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGAvdXNlcnNgKTtcbiAgICByZXR1cm4gZGlzcGF0Y2goZ2V0VXNlcnNTdWNjZXNzKHJlc3BvbnNlKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZGlzcGF0Y2goZ2V0VXNlcnNGYWlsKGVycm9yKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFVzZXJzTGlzdDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsYUFBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsYUFBQTtBQWZaLE9BQU9FLEtBQUssTUFBTSxhQUFhO0FBQy9CLFNBQ0VDLGlCQUFpQixFQUNqQkMsY0FBYyxFQUNkQyxtQkFBbUIsUUFDZCxlQUFlO0FBQUNMLGFBQUEsR0FBQU0sQ0FBQTtBQUV2QixPQUFPLE1BQU1DLGlCQUFpQixHQUFHQSxDQUFBLEtBQU87RUFBQVAsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ3RDRyxJQUFJLEVBQUVKO0VBQ1IsQ0FBQztBQUFELENBQUU7QUFBQ0wsYUFBQSxHQUFBTSxDQUFBO0FBRUgsT0FBTyxNQUFNSSxlQUFlLEdBQUlDLFFBQVEsSUFBTTtFQUFBWCxhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUE7SUFDNUNHLElBQUksRUFBRU4saUJBQWlCO0lBQ3ZCUyxPQUFPLEVBQUVELFFBQVEsQ0FBQ0UsSUFBSSxDQUFDQSxJQUFJLENBQUNDO0VBQzlCLENBQUM7QUFBRCxDQUFFO0FBQUNkLGFBQUEsR0FBQU0sQ0FBQTtBQUVILE9BQU8sTUFBTVMsWUFBWSxHQUFJQyxLQUFLLElBQU07RUFBQWhCLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQTtJQUN0Q0csSUFBSSxFQUFFTCxjQUFjO0lBQ3BCUSxPQUFPLEVBQUU7TUFDUEssTUFBTSxFQUFFLEtBQUs7TUFDYkQsS0FBSyxFQUFFQSxLQUFLLENBQUNDO0lBQ2Y7RUFDRixDQUFDO0FBQUQsQ0FBRTtBQUFDakIsYUFBQSxHQUFBTSxDQUFBO0FBRUgsTUFBTVksWUFBWSxHQUFHQSxDQUFBLEtBQU07RUFBQWxCLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQSxhQUFPYSxRQUFRLElBQUs7SUFBQW5CLGFBQUEsR0FBQVEsQ0FBQTtJQUFBUixhQUFBLEdBQUFNLENBQUE7SUFDN0NhLFFBQVEsQ0FBQ1osaUJBQWlCLEVBQUUsQ0FBQztJQUFDUCxhQUFBLEdBQUFNLENBQUE7SUFDOUIsSUFBSTtNQUNGLE1BQU1LLFFBQVEsSUFBQVgsYUFBQSxHQUFBTSxDQUFBLFFBQUcsTUFBTUosS0FBSyxDQUFDa0IsR0FBRyxDQUFFLFFBQU8sQ0FBQztNQUFDcEIsYUFBQSxHQUFBTSxDQUFBO01BQzNDLE9BQU9hLFFBQVEsQ0FBQ1QsZUFBZSxDQUFDQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUMsT0FBT0ssS0FBSyxFQUFFO01BQUFoQixhQUFBLEdBQUFNLENBQUE7TUFDZGEsUUFBUSxDQUFDSixZQUFZLENBQUNDLEtBQUssQ0FBQyxDQUFDO0lBQy9CO0VBQ0YsQ0FBQztBQUFELENBQUM7QUFFRCxlQUFlRSxZQUFZIn0=