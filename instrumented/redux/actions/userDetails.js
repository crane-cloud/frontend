function cov_p79fm2frd() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/userDetails.js";
  var hash = "277366769954c3a873f6d5fa4a236c69a8c65747";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/userDetails.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 38
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 45
        },
        end: {
          line: 10,
          column: 1
        }
      },
      "2": {
        start: {
          line: 12,
          column: 36
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 51
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
          column: 22
        },
        end: {
          line: 33,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 34
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
          column: 37
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
          column: 64
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
            column: 38
          },
          end: {
            line: 8,
            column: 39
          }
        },
        loc: {
          start: {
            line: 8,
            column: 45
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
            column: 36
          },
          end: {
            line: 12,
            column: 37
          }
        },
        loc: {
          start: {
            line: 12,
            column: 51
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
            column: 22
          },
          end: {
            line: 25,
            column: 23
          }
        },
        loc: {
          start: {
            line: 25,
            column: 34
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
            column: 34
          },
          end: {
            line: 25,
            column: 35
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
            column: 64
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
    hash: "277366769954c3a873f6d5fa4a236c69a8c65747"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_p79fm2frd = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_p79fm2frd();
import axios from "../../axios";
import { GET_USER_DETAIL_SUCCESS, GET_USER_DETAIL_FAIL, START_GETTING_USER_DETAIL } from "./actionTypes";
cov_p79fm2frd().s[0]++;
export const startGettingUserDetail = () => {
  cov_p79fm2frd().f[0]++;
  cov_p79fm2frd().s[1]++;
  return {
    type: START_GETTING_USER_DETAIL
  };
};
cov_p79fm2frd().s[2]++;
export const getUserDetailSuccess = response => {
  cov_p79fm2frd().f[1]++;
  cov_p79fm2frd().s[3]++;
  return {
    type: GET_USER_DETAIL_SUCCESS,
    payload: response.data.data.user
  };
};
cov_p79fm2frd().s[4]++;
export const getUserDetailFail = error => {
  cov_p79fm2frd().f[2]++;
  cov_p79fm2frd().s[5]++;
  return {
    type: GET_USER_DETAIL_FAIL,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_p79fm2frd().s[6]++;
const getUserDetail = userID => {
  cov_p79fm2frd().f[3]++;
  cov_p79fm2frd().s[7]++;
  return dispatch => {
    cov_p79fm2frd().f[4]++;
    cov_p79fm2frd().s[8]++;
    dispatch(startGettingUserDetail());
    cov_p79fm2frd().s[9]++;
    return axios.get(`/users/${userID}`).then(response => {
      cov_p79fm2frd().f[5]++;
      cov_p79fm2frd().s[10]++;
      return dispatch(getUserDetailSuccess(response));
    }).catch(error => {
      cov_p79fm2frd().f[6]++;
      cov_p79fm2frd().s[11]++;
      dispatch(getUserDetailFail(error));
    });
  };
};
export default getUserDetail;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfcDc5Zm0yZnJkIiwiYWN0dWFsQ292ZXJhZ2UiLCJheGlvcyIsIkdFVF9VU0VSX0RFVEFJTF9TVUNDRVNTIiwiR0VUX1VTRVJfREVUQUlMX0ZBSUwiLCJTVEFSVF9HRVRUSU5HX1VTRVJfREVUQUlMIiwicyIsInN0YXJ0R2V0dGluZ1VzZXJEZXRhaWwiLCJmIiwidHlwZSIsImdldFVzZXJEZXRhaWxTdWNjZXNzIiwicmVzcG9uc2UiLCJwYXlsb2FkIiwiZGF0YSIsInVzZXIiLCJnZXRVc2VyRGV0YWlsRmFpbCIsImVycm9yIiwic3RhdHVzIiwiZ2V0VXNlckRldGFpbCIsInVzZXJJRCIsImRpc3BhdGNoIiwiZ2V0IiwidGhlbiIsImNhdGNoIl0sInNvdXJjZXMiOlsidXNlckRldGFpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCIuLi8uLi9heGlvc1wiO1xuaW1wb3J0IHtcbiAgR0VUX1VTRVJfREVUQUlMX1NVQ0NFU1MsXG4gIEdFVF9VU0VSX0RFVEFJTF9GQUlMLFxuICBTVEFSVF9HRVRUSU5HX1VTRVJfREVUQUlMLFxufSBmcm9tIFwiLi9hY3Rpb25UeXBlc1wiO1xuXG5leHBvcnQgY29uc3Qgc3RhcnRHZXR0aW5nVXNlckRldGFpbCA9ICgpID0+ICh7XG4gIHR5cGU6IFNUQVJUX0dFVFRJTkdfVVNFUl9ERVRBSUwsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJEZXRhaWxTdWNjZXNzID0gKHJlc3BvbnNlKSA9PiAoe1xuICB0eXBlOiBHRVRfVVNFUl9ERVRBSUxfU1VDQ0VTUyxcbiAgcGF5bG9hZDogcmVzcG9uc2UuZGF0YS5kYXRhLnVzZXIsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJEZXRhaWxGYWlsID0gKGVycm9yKSA9PiAoe1xuICB0eXBlOiBHRVRfVVNFUl9ERVRBSUxfRkFJTCxcbiAgcGF5bG9hZDoge1xuICAgIHN0YXR1czogZmFsc2UsXG4gICAgZXJyb3I6IGVycm9yLnN0YXR1cyxcbiAgfSxcbn0pO1xuXG5jb25zdCBnZXRVc2VyRGV0YWlsID0gKHVzZXJJRCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHN0YXJ0R2V0dGluZ1VzZXJEZXRhaWwoKSk7XG4gIHJldHVybiBheGlvc1xuICAgIC5nZXQoYC91c2Vycy8ke3VzZXJJRH1gKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gZGlzcGF0Y2goZ2V0VXNlckRldGFpbFN1Y2Nlc3MocmVzcG9uc2UpKSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBkaXNwYXRjaChnZXRVc2VyRGV0YWlsRmFpbChlcnJvcikpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0VXNlckRldGFpbDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsYUFBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsYUFBQTtBQWZaLE9BQU9FLEtBQUssTUFBTSxhQUFhO0FBQy9CLFNBQ0VDLHVCQUF1QixFQUN2QkMsb0JBQW9CLEVBQ3BCQyx5QkFBeUIsUUFDcEIsZUFBZTtBQUFDTCxhQUFBLEdBQUFNLENBQUE7QUFFdkIsT0FBTyxNQUFNQyxzQkFBc0IsR0FBR0EsQ0FBQSxLQUFPO0VBQUFQLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQTtJQUMzQ0csSUFBSSxFQUFFSjtFQUNSLENBQUM7QUFBRCxDQUFFO0FBQUNMLGFBQUEsR0FBQU0sQ0FBQTtBQUVILE9BQU8sTUFBTUksb0JBQW9CLEdBQUlDLFFBQVEsSUFBTTtFQUFBWCxhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUE7SUFDakRHLElBQUksRUFBRU4sdUJBQXVCO0lBQzdCUyxPQUFPLEVBQUVELFFBQVEsQ0FBQ0UsSUFBSSxDQUFDQSxJQUFJLENBQUNDO0VBQzlCLENBQUM7QUFBRCxDQUFFO0FBQUNkLGFBQUEsR0FBQU0sQ0FBQTtBQUVILE9BQU8sTUFBTVMsaUJBQWlCLEdBQUlDLEtBQUssSUFBTTtFQUFBaEIsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQzNDRyxJQUFJLEVBQUVMLG9CQUFvQjtJQUMxQlEsT0FBTyxFQUFFO01BQ1BLLE1BQU0sRUFBRSxLQUFLO01BQ2JELEtBQUssRUFBRUEsS0FBSyxDQUFDQztJQUNmO0VBQ0YsQ0FBQztBQUFELENBQUU7QUFBQ2pCLGFBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1ZLGFBQWEsR0FBSUMsTUFBTSxJQUFLO0VBQUFuQixhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUEsT0FBQ2MsUUFBUSxJQUFLO0lBQUFwQixhQUFBLEdBQUFRLENBQUE7SUFBQVIsYUFBQSxHQUFBTSxDQUFBO0lBQzlDYyxRQUFRLENBQUNiLHNCQUFzQixFQUFFLENBQUM7SUFBQ1AsYUFBQSxHQUFBTSxDQUFBO0lBQ25DLE9BQU9KLEtBQUssQ0FDVG1CLEdBQUcsQ0FBRSxVQUFTRixNQUFPLEVBQUMsQ0FBQyxDQUN2QkcsSUFBSSxDQUFFWCxRQUFRLElBQUs7TUFBQVgsYUFBQSxHQUFBUSxDQUFBO01BQUFSLGFBQUEsR0FBQU0sQ0FBQTtNQUFBLE9BQUFjLFFBQVEsQ0FBQ1Ysb0JBQW9CLENBQUNDLFFBQVEsQ0FBQyxDQUFDO0lBQUQsQ0FBQyxDQUFDLENBQzVEWSxLQUFLLENBQUVQLEtBQUssSUFBSztNQUFBaEIsYUFBQSxHQUFBUSxDQUFBO01BQUFSLGFBQUEsR0FBQU0sQ0FBQTtNQUNoQmMsUUFBUSxDQUFDTCxpQkFBaUIsQ0FBQ0MsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0VBQ04sQ0FBQztBQUFELENBQUM7QUFFRCxlQUFlRSxhQUFhIn0=