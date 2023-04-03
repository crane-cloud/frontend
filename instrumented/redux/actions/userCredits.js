function cov_16dhvdr8p7() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/userCredits.js";
  var hash = "9ea4c6952dbc8740bdcf0c916b02a641a97c54c0";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/userCredits.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 39
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 46
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
          column: 23
        },
        end: {
          line: 35,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 35
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
          column: 38
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
            column: 39
          },
          end: {
            line: 8,
            column: 40
          }
        },
        loc: {
          start: {
            line: 8,
            column: 46
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
            column: 35
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
            column: 35
          },
          end: {
            line: 25,
            column: 36
          }
        },
        loc: {
          start: {
            line: 25,
            column: 49
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
    hash: "9ea4c6952dbc8740bdcf0c916b02a641a97c54c0"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_16dhvdr8p7 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_16dhvdr8p7();
import axios from "../../axios";
import { GETTING_USER_CREDITS, GET_USER_CREDITS_FAIL, GET_USER_CREDITS_SUCCESS } from "./actionTypes";
cov_16dhvdr8p7().s[0]++;
export const startFetchingUserCredit = () => {
  cov_16dhvdr8p7().f[0]++;
  cov_16dhvdr8p7().s[1]++;
  return {
    type: GETTING_USER_CREDITS
  };
};
cov_16dhvdr8p7().s[2]++;
export const getUserCreditsSuccess = response => {
  cov_16dhvdr8p7().f[1]++;
  cov_16dhvdr8p7().s[3]++;
  return {
    type: GET_USER_CREDITS_SUCCESS,
    payload: response.data.data.credit
  };
};
cov_16dhvdr8p7().s[4]++;
export const getUserCreditsFail = error => {
  cov_16dhvdr8p7().f[2]++;
  cov_16dhvdr8p7().s[5]++;
  return {
    type: GET_USER_CREDITS_FAIL,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_16dhvdr8p7().s[6]++;
const getUserCredits = userID => {
  cov_16dhvdr8p7().f[3]++;
  cov_16dhvdr8p7().s[7]++;
  return dispatch => {
    cov_16dhvdr8p7().f[4]++;
    cov_16dhvdr8p7().s[8]++;
    dispatch(startFetchingUserCredit());
    cov_16dhvdr8p7().s[9]++;
    return axios.get(`/credit/${userID}`).then(response => {
      cov_16dhvdr8p7().f[5]++;
      cov_16dhvdr8p7().s[10]++;
      return dispatch(getUserCreditsSuccess(response));
    }).catch(error => {
      cov_16dhvdr8p7().f[6]++;
      cov_16dhvdr8p7().s[11]++;
      dispatch(getUserCreditsFail(error));
    });
  };
};
export default getUserCredits;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTZkaHZkcjhwNyIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJHRVRUSU5HX1VTRVJfQ1JFRElUUyIsIkdFVF9VU0VSX0NSRURJVFNfRkFJTCIsIkdFVF9VU0VSX0NSRURJVFNfU1VDQ0VTUyIsInMiLCJzdGFydEZldGNoaW5nVXNlckNyZWRpdCIsImYiLCJ0eXBlIiwiZ2V0VXNlckNyZWRpdHNTdWNjZXNzIiwicmVzcG9uc2UiLCJwYXlsb2FkIiwiZGF0YSIsImNyZWRpdCIsImdldFVzZXJDcmVkaXRzRmFpbCIsImVycm9yIiwic3RhdHVzIiwiZ2V0VXNlckNyZWRpdHMiLCJ1c2VySUQiLCJkaXNwYXRjaCIsImdldCIsInRoZW4iLCJjYXRjaCJdLCJzb3VyY2VzIjpbInVzZXJDcmVkaXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiLi4vLi4vYXhpb3NcIjtcbmltcG9ydCB7XG4gIEdFVFRJTkdfVVNFUl9DUkVESVRTLFxuICBHRVRfVVNFUl9DUkVESVRTX0ZBSUwsXG4gIEdFVF9VU0VSX0NSRURJVFNfU1VDQ0VTUyxcbn0gZnJvbSBcIi4vYWN0aW9uVHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IHN0YXJ0RmV0Y2hpbmdVc2VyQ3JlZGl0ID0gKCkgPT4gKHtcbiAgdHlwZTogR0VUVElOR19VU0VSX0NSRURJVFMsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJDcmVkaXRzU3VjY2VzcyA9IChyZXNwb25zZSkgPT4gKHtcbiAgdHlwZTogR0VUX1VTRVJfQ1JFRElUU19TVUNDRVNTLFxuICBwYXlsb2FkOiByZXNwb25zZS5kYXRhLmRhdGEuY3JlZGl0LFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyQ3JlZGl0c0ZhaWwgPSAoZXJyb3IpID0+ICh7XG4gIHR5cGU6IEdFVF9VU0VSX0NSRURJVFNfRkFJTCxcbiAgcGF5bG9hZDoge1xuICAgIHN0YXR1czogZmFsc2UsXG4gICAgZXJyb3I6IGVycm9yLnN0YXR1cyxcbiAgfSxcbn0pO1xuXG5jb25zdCBnZXRVc2VyQ3JlZGl0cyA9ICh1c2VySUQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaChzdGFydEZldGNoaW5nVXNlckNyZWRpdCgpKTtcblxuICByZXR1cm4gYXhpb3NcbiAgICAuZ2V0KGAvY3JlZGl0LyR7dXNlcklEfWApXG5cbiAgICAudGhlbigocmVzcG9uc2UpID0+IGRpc3BhdGNoKGdldFVzZXJDcmVkaXRzU3VjY2VzcyhyZXNwb25zZSkpKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGRpc3BhdGNoKGdldFVzZXJDcmVkaXRzRmFpbChlcnJvcikpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0VXNlckNyZWRpdHM7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixPQUFPRSxLQUFLLE1BQU0sYUFBYTtBQUMvQixTQUNFQyxvQkFBb0IsRUFDcEJDLHFCQUFxQixFQUNyQkMsd0JBQXdCLFFBQ25CLGVBQWU7QUFBQ0wsY0FBQSxHQUFBTSxDQUFBO0FBRXZCLE9BQU8sTUFBTUMsdUJBQXVCLEdBQUdBLENBQUEsS0FBTztFQUFBUCxjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUE7SUFDNUNHLElBQUksRUFBRU47RUFDUixDQUFDO0FBQUQsQ0FBRTtBQUFDSCxjQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1JLHFCQUFxQixHQUFJQyxRQUFRLElBQU07RUFBQVgsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ2xERyxJQUFJLEVBQUVKLHdCQUF3QjtJQUM5Qk8sT0FBTyxFQUFFRCxRQUFRLENBQUNFLElBQUksQ0FBQ0EsSUFBSSxDQUFDQztFQUM5QixDQUFDO0FBQUQsQ0FBRTtBQUFDZCxjQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1TLGtCQUFrQixHQUFJQyxLQUFLLElBQU07RUFBQWhCLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQTtJQUM1Q0csSUFBSSxFQUFFTCxxQkFBcUI7SUFDM0JRLE9BQU8sRUFBRTtNQUNQSyxNQUFNLEVBQUUsS0FBSztNQUNiRCxLQUFLLEVBQUVBLEtBQUssQ0FBQ0M7SUFDZjtFQUNGLENBQUM7QUFBRCxDQUFFO0FBQUNqQixjQUFBLEdBQUFNLENBQUE7QUFFSCxNQUFNWSxjQUFjLEdBQUlDLE1BQU0sSUFBSztFQUFBbkIsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBLE9BQUNjLFFBQVEsSUFBSztJQUFBcEIsY0FBQSxHQUFBUSxDQUFBO0lBQUFSLGNBQUEsR0FBQU0sQ0FBQTtJQUMvQ2MsUUFBUSxDQUFDYix1QkFBdUIsRUFBRSxDQUFDO0lBQUNQLGNBQUEsR0FBQU0sQ0FBQTtJQUVwQyxPQUFPSixLQUFLLENBQ1RtQixHQUFHLENBQUUsV0FBVUYsTUFBTyxFQUFDLENBQUMsQ0FFeEJHLElBQUksQ0FBRVgsUUFBUSxJQUFLO01BQUFYLGNBQUEsR0FBQVEsQ0FBQTtNQUFBUixjQUFBLEdBQUFNLENBQUE7TUFBQSxPQUFBYyxRQUFRLENBQUNWLHFCQUFxQixDQUFDQyxRQUFRLENBQUMsQ0FBQztJQUFELENBQUMsQ0FBQyxDQUM3RFksS0FBSyxDQUFFUCxLQUFLLElBQUs7TUFBQWhCLGNBQUEsR0FBQVEsQ0FBQTtNQUFBUixjQUFBLEdBQUFNLENBQUE7TUFDaEJjLFFBQVEsQ0FBQ0wsa0JBQWtCLENBQUNDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztFQUNOLENBQUM7QUFBRCxDQUFDO0FBRUQsZUFBZUUsY0FBYyJ9