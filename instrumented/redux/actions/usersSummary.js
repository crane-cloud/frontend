function cov_1652ivuej4() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/usersSummary.js";
  var hash = "c30a08314b506a89d385a9a587d0969d7e2a69a2";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/usersSummary.js",
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
          column: 20
        },
        end: {
          line: 35,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 33
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
          column: 40
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
          column: 66
        }
      },
      "11": {
        start: {
          line: 33,
          column: 6
        },
        end: {
          line: 33,
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
            column: 33
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
            column: 33
          },
          end: {
            line: 25,
            column: 34
          }
        },
        loc: {
          start: {
            line: 25,
            column: 47
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
            column: 66
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
    hash: "c30a08314b506a89d385a9a587d0969d7e2a69a2"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1652ivuej4 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1652ivuej4();
import axios from "../../axios";
import { GETTING_USERS_SUMMARY, USERS_SUMMARY_SUCCESS, USERS_SUMMARY_FAIL } from "./actionTypes";
cov_1652ivuej4().s[0]++;
export const startFetchingUsersSummary = () => {
  cov_1652ivuej4().f[0]++;
  cov_1652ivuej4().s[1]++;
  return {
    type: GETTING_USERS_SUMMARY
  };
};
cov_1652ivuej4().s[2]++;
export const getUsersSuccessSummary = response => {
  cov_1652ivuej4().f[1]++;
  cov_1652ivuej4().s[3]++;
  return {
    type: USERS_SUMMARY_SUCCESS,
    payload: response.data.data
  };
};
cov_1652ivuej4().s[4]++;
export const getUsersFailSummary = error => {
  cov_1652ivuej4().f[2]++;
  cov_1652ivuej4().s[5]++;
  return {
    type: USERS_SUMMARY_FAIL,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_1652ivuej4().s[6]++;
const userSummary = details => {
  cov_1652ivuej4().f[3]++;
  cov_1652ivuej4().s[7]++;
  return dispatch => {
    cov_1652ivuej4().f[4]++;
    cov_1652ivuej4().s[8]++;
    dispatch(startFetchingUsersSummary());
    cov_1652ivuej4().s[9]++;
    return axios.post(`/users/summary`, details).then(response => {
      cov_1652ivuej4().f[5]++;
      cov_1652ivuej4().s[10]++;
      return dispatch(getUsersSuccessSummary(response));
    }).catch(error => {
      cov_1652ivuej4().f[6]++;
      cov_1652ivuej4().s[11]++;
      dispatch(getUsersFailSummary(error));
    });
  };
};
export default userSummary;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTY1Mml2dWVqNCIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJHRVRUSU5HX1VTRVJTX1NVTU1BUlkiLCJVU0VSU19TVU1NQVJZX1NVQ0NFU1MiLCJVU0VSU19TVU1NQVJZX0ZBSUwiLCJzIiwic3RhcnRGZXRjaGluZ1VzZXJzU3VtbWFyeSIsImYiLCJ0eXBlIiwiZ2V0VXNlcnNTdWNjZXNzU3VtbWFyeSIsInJlc3BvbnNlIiwicGF5bG9hZCIsImRhdGEiLCJnZXRVc2Vyc0ZhaWxTdW1tYXJ5IiwiZXJyb3IiLCJzdGF0dXMiLCJ1c2VyU3VtbWFyeSIsImRldGFpbHMiLCJkaXNwYXRjaCIsInBvc3QiLCJ0aGVuIiwiY2F0Y2giXSwic291cmNlcyI6WyJ1c2Vyc1N1bW1hcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCIuLi8uLi9heGlvc1wiO1xuaW1wb3J0IHtcbiAgR0VUVElOR19VU0VSU19TVU1NQVJZLFxuICBVU0VSU19TVU1NQVJZX1NVQ0NFU1MsXG4gIFVTRVJTX1NVTU1BUllfRkFJTCxcbn0gZnJvbSBcIi4vYWN0aW9uVHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IHN0YXJ0RmV0Y2hpbmdVc2Vyc1N1bW1hcnkgPSAoKSA9PiAoe1xuICB0eXBlOiBHRVRUSU5HX1VTRVJTX1NVTU1BUlksXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJzU3VjY2Vzc1N1bW1hcnkgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IFVTRVJTX1NVTU1BUllfU1VDQ0VTUyxcbiAgcGF5bG9hZDogcmVzcG9uc2UuZGF0YS5kYXRhLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRVc2Vyc0ZhaWxTdW1tYXJ5ID0gKGVycm9yKSA9PiAoe1xuICB0eXBlOiBVU0VSU19TVU1NQVJZX0ZBSUwsXG4gIHBheWxvYWQ6IHtcbiAgICBzdGF0dXM6IGZhbHNlLFxuICAgIGVycm9yOiBlcnJvci5zdGF0dXMsXG4gIH0sXG59KTtcblxuY29uc3QgdXNlclN1bW1hcnkgPSAoZGV0YWlscykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHN0YXJ0RmV0Y2hpbmdVc2Vyc1N1bW1hcnkoKSk7XG5cbiAgcmV0dXJuIGF4aW9zXG4gICAgLnBvc3QoYC91c2Vycy9zdW1tYXJ5YCwgZGV0YWlscylcblxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gZGlzcGF0Y2goZ2V0VXNlcnNTdWNjZXNzU3VtbWFyeShyZXNwb25zZSkpKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGRpc3BhdGNoKGdldFVzZXJzRmFpbFN1bW1hcnkoZXJyb3IpKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZXJTdW1tYXJ5O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosT0FBT0UsS0FBSyxNQUFNLGFBQWE7QUFDL0IsU0FDRUMscUJBQXFCLEVBQ3JCQyxxQkFBcUIsRUFDckJDLGtCQUFrQixRQUNiLGVBQWU7QUFBQ0wsY0FBQSxHQUFBTSxDQUFBO0FBRXZCLE9BQU8sTUFBTUMseUJBQXlCLEdBQUdBLENBQUEsS0FBTztFQUFBUCxjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUE7SUFDOUNHLElBQUksRUFBRU47RUFDUixDQUFDO0FBQUQsQ0FBRTtBQUFDSCxjQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1JLHNCQUFzQixHQUFJQyxRQUFRLElBQU07RUFBQVgsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ25ERyxJQUFJLEVBQUVMLHFCQUFxQjtJQUMzQlEsT0FBTyxFQUFFRCxRQUFRLENBQUNFLElBQUksQ0FBQ0E7RUFDekIsQ0FBQztBQUFELENBQUU7QUFBQ2IsY0FBQSxHQUFBTSxDQUFBO0FBRUgsT0FBTyxNQUFNUSxtQkFBbUIsR0FBSUMsS0FBSyxJQUFNO0VBQUFmLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQTtJQUM3Q0csSUFBSSxFQUFFSixrQkFBa0I7SUFDeEJPLE9BQU8sRUFBRTtNQUNQSSxNQUFNLEVBQUUsS0FBSztNQUNiRCxLQUFLLEVBQUVBLEtBQUssQ0FBQ0M7SUFDZjtFQUNGLENBQUM7QUFBRCxDQUFFO0FBQUNoQixjQUFBLEdBQUFNLENBQUE7QUFFSCxNQUFNVyxXQUFXLEdBQUlDLE9BQU8sSUFBSztFQUFBbEIsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBLE9BQUNhLFFBQVEsSUFBSztJQUFBbkIsY0FBQSxHQUFBUSxDQUFBO0lBQUFSLGNBQUEsR0FBQU0sQ0FBQTtJQUM3Q2EsUUFBUSxDQUFDWix5QkFBeUIsRUFBRSxDQUFDO0lBQUNQLGNBQUEsR0FBQU0sQ0FBQTtJQUV0QyxPQUFPSixLQUFLLENBQ1RrQixJQUFJLENBQUUsZ0JBQWUsRUFBRUYsT0FBTyxDQUFDLENBRS9CRyxJQUFJLENBQUVWLFFBQVEsSUFBSztNQUFBWCxjQUFBLEdBQUFRLENBQUE7TUFBQVIsY0FBQSxHQUFBTSxDQUFBO01BQUEsT0FBQWEsUUFBUSxDQUFDVCxzQkFBc0IsQ0FBQ0MsUUFBUSxDQUFDLENBQUM7SUFBRCxDQUFDLENBQUMsQ0FDOURXLEtBQUssQ0FBRVAsS0FBSyxJQUFLO01BQUFmLGNBQUEsR0FBQVEsQ0FBQTtNQUFBUixjQUFBLEdBQUFNLENBQUE7TUFDaEJhLFFBQVEsQ0FBQ0wsbUJBQW1CLENBQUNDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztFQUNOLENBQUM7QUFBRCxDQUFDO0FBRUQsZUFBZUUsV0FBVyJ9