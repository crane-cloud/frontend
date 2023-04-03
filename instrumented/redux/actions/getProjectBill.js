function cov_1q93x0bk5h() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/getProjectBill.js";
  var hash = "5787af05c4ba5fa13ca13400a9678c4fb4d1fb72";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/getProjectBill.js",
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
          column: 29
        },
        end: {
          line: 23,
          column: 2
        }
      },
      "5": {
        start: {
          line: 17,
          column: 41
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
          line: 36,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 47
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
          column: 48
        }
      },
      "11": {
        start: {
          line: 34,
          column: 6
        },
        end: {
          line: 34,
          column: 44
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
            column: 29
          },
          end: {
            line: 17,
            column: 30
          }
        },
        loc: {
          start: {
            line: 17,
            column: 41
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
            column: 47
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
            column: 47
          },
          end: {
            line: 25,
            column: 48
          }
        },
        loc: {
          start: {
            line: 25,
            column: 61
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
    hash: "5787af05c4ba5fa13ca13400a9678c4fb4d1fb72"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1q93x0bk5h = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1q93x0bk5h();
import axios from "../../axios";
import { GETTING_PROJECT_BILLING_INFO, PROJECT_BILLING_INFO_SUCCESS, PROJECT_BILLING_INFO_FAIL } from "./actionTypes";
cov_1q93x0bk5h().s[0]++;
const startFetchingBill = () => {
  cov_1q93x0bk5h().f[0]++;
  cov_1q93x0bk5h().s[1]++;
  return {
    type: GETTING_PROJECT_BILLING_INFO
  };
};
cov_1q93x0bk5h().s[2]++;
const getProjectBillSuccess = response => {
  cov_1q93x0bk5h().f[1]++;
  cov_1q93x0bk5h().s[3]++;
  return {
    type: PROJECT_BILLING_INFO_SUCCESS,
    payload: response.data.data
  };
};
cov_1q93x0bk5h().s[4]++;
const getProjectBillFailed = error => {
  cov_1q93x0bk5h().f[2]++;
  cov_1q93x0bk5h().s[5]++;
  return {
    type: PROJECT_BILLING_INFO_FAIL,
    payload: {
      status: false,
      error: error
    }
  };
};
cov_1q93x0bk5h().s[6]++;
const getProjectBill = (projectID, billObj) => {
  cov_1q93x0bk5h().f[3]++;
  cov_1q93x0bk5h().s[7]++;
  return dispatch => {
    cov_1q93x0bk5h().f[4]++;
    cov_1q93x0bk5h().s[8]++;
    dispatch(startFetchingBill());
    cov_1q93x0bk5h().s[9]++;
    return axios.post(`/projects/${projectID}/billing/info`, billObj).then(response => {
      cov_1q93x0bk5h().f[5]++;
      cov_1q93x0bk5h().s[10]++;
      dispatch(getProjectBillSuccess(response));
    }).catch(error => {
      cov_1q93x0bk5h().f[6]++;
      cov_1q93x0bk5h().s[11]++;
      dispatch(getProjectBillFailed(error));
    });
  };
};
export default getProjectBill;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMXE5M3gwYms1aCIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJHRVRUSU5HX1BST0pFQ1RfQklMTElOR19JTkZPIiwiUFJPSkVDVF9CSUxMSU5HX0lORk9fU1VDQ0VTUyIsIlBST0pFQ1RfQklMTElOR19JTkZPX0ZBSUwiLCJzIiwic3RhcnRGZXRjaGluZ0JpbGwiLCJmIiwidHlwZSIsImdldFByb2plY3RCaWxsU3VjY2VzcyIsInJlc3BvbnNlIiwicGF5bG9hZCIsImRhdGEiLCJnZXRQcm9qZWN0QmlsbEZhaWxlZCIsImVycm9yIiwic3RhdHVzIiwiZ2V0UHJvamVjdEJpbGwiLCJwcm9qZWN0SUQiLCJiaWxsT2JqIiwiZGlzcGF0Y2giLCJwb3N0IiwidGhlbiIsImNhdGNoIl0sInNvdXJjZXMiOlsiZ2V0UHJvamVjdEJpbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCIuLi8uLi9heGlvc1wiO1xuaW1wb3J0IHtcbiAgR0VUVElOR19QUk9KRUNUX0JJTExJTkdfSU5GTyxcbiAgUFJPSkVDVF9CSUxMSU5HX0lORk9fU1VDQ0VTUyxcbiAgUFJPSkVDVF9CSUxMSU5HX0lORk9fRkFJTCxcbn0gZnJvbSBcIi4vYWN0aW9uVHlwZXNcIjtcblxuY29uc3Qgc3RhcnRGZXRjaGluZ0JpbGwgPSAoKSA9PiAoe1xuICB0eXBlOiBHRVRUSU5HX1BST0pFQ1RfQklMTElOR19JTkZPLFxufSk7XG5cbmNvbnN0IGdldFByb2plY3RCaWxsU3VjY2VzcyA9IChyZXNwb25zZSkgPT4gKHtcbiAgdHlwZTogUFJPSkVDVF9CSUxMSU5HX0lORk9fU1VDQ0VTUyxcbiAgcGF5bG9hZDogcmVzcG9uc2UuZGF0YS5kYXRhLFxufSk7XG5cbmNvbnN0IGdldFByb2plY3RCaWxsRmFpbGVkID0gKGVycm9yKSA9PiAoe1xuICB0eXBlOiBQUk9KRUNUX0JJTExJTkdfSU5GT19GQUlMLFxuICBwYXlsb2FkOiB7XG4gICAgc3RhdHVzOiBmYWxzZSxcbiAgICBlcnJvcjogZXJyb3IsXG4gIH0sXG59KTtcblxuY29uc3QgZ2V0UHJvamVjdEJpbGwgPSAocHJvamVjdElELCBiaWxsT2JqKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgZGlzcGF0Y2goc3RhcnRGZXRjaGluZ0JpbGwoKSk7XG5cbiAgcmV0dXJuIGF4aW9zXG4gICAgLnBvc3QoYC9wcm9qZWN0cy8ke3Byb2plY3RJRH0vYmlsbGluZy9pbmZvYCwgYmlsbE9iailcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGRpc3BhdGNoKGdldFByb2plY3RCaWxsU3VjY2VzcyhyZXNwb25zZSkpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgZGlzcGF0Y2goZ2V0UHJvamVjdEJpbGxGYWlsZWQoZXJyb3IpKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb2plY3RCaWxsOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLE9BQU9FLEtBQUssTUFBTSxhQUFhO0FBQy9CLFNBQ0VDLDRCQUE0QixFQUM1QkMsNEJBQTRCLEVBQzVCQyx5QkFBeUIsUUFDcEIsZUFBZTtBQUFDTCxjQUFBLEdBQUFNLENBQUE7QUFFdkIsTUFBTUMsaUJBQWlCLEdBQUdBLENBQUEsS0FBTztFQUFBUCxjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUE7SUFDL0JHLElBQUksRUFBRU47RUFDUixDQUFDO0FBQUQsQ0FBRTtBQUFDSCxjQUFBLEdBQUFNLENBQUE7QUFFSCxNQUFNSSxxQkFBcUIsR0FBSUMsUUFBUSxJQUFNO0VBQUFYLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQTtJQUMzQ0csSUFBSSxFQUFFTCw0QkFBNEI7SUFDbENRLE9BQU8sRUFBRUQsUUFBUSxDQUFDRSxJQUFJLENBQUNBO0VBQ3pCLENBQUM7QUFBRCxDQUFFO0FBQUNiLGNBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1RLG9CQUFvQixHQUFJQyxLQUFLLElBQU07RUFBQWYsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ3ZDRyxJQUFJLEVBQUVKLHlCQUF5QjtJQUMvQk8sT0FBTyxFQUFFO01BQ1BJLE1BQU0sRUFBRSxLQUFLO01BQ2JELEtBQUssRUFBRUE7SUFDVDtFQUNGLENBQUM7QUFBRCxDQUFFO0FBQUNmLGNBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1XLGNBQWMsR0FBR0EsQ0FBQ0MsU0FBUyxFQUFFQyxPQUFPLEtBQUs7RUFBQW5CLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQSxPQUFDYyxRQUFRLElBQUs7SUFBQXBCLGNBQUEsR0FBQVEsQ0FBQTtJQUFBUixjQUFBLEdBQUFNLENBQUE7SUFDM0RjLFFBQVEsQ0FBQ2IsaUJBQWlCLEVBQUUsQ0FBQztJQUFDUCxjQUFBLEdBQUFNLENBQUE7SUFFOUIsT0FBT0osS0FBSyxDQUNUbUIsSUFBSSxDQUFFLGFBQVlILFNBQVUsZUFBYyxFQUFFQyxPQUFPLENBQUMsQ0FDcERHLElBQUksQ0FBRVgsUUFBUSxJQUFLO01BQUFYLGNBQUEsR0FBQVEsQ0FBQTtNQUFBUixjQUFBLEdBQUFNLENBQUE7TUFDbEJjLFFBQVEsQ0FBQ1YscUJBQXFCLENBQUNDLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUNEWSxLQUFLLENBQUVSLEtBQUssSUFBSztNQUFBZixjQUFBLEdBQUFRLENBQUE7TUFBQVIsY0FBQSxHQUFBTSxDQUFBO01BQ2hCYyxRQUFRLENBQUNOLG9CQUFvQixDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUM7RUFDTixDQUFDO0FBQUQsQ0FBQztBQUVELGVBQWVFLGNBQWMifQ==