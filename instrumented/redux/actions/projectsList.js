function cov_2epky7wjbs() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/projectsList.js";
  var hash = "e1aba118f4a3f28629b138e43a7e4462a36b1ba3";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/projectsList.js",
    statementMap: {
      "0": {
        start: {
          line: 9,
          column: 29
        },
        end: {
          line: 11,
          column: 2
        }
      },
      "1": {
        start: {
          line: 9,
          column: 36
        },
        end: {
          line: 11,
          column: 1
        }
      },
      "2": {
        start: {
          line: 13,
          column: 38
        },
        end: {
          line: 16,
          column: 2
        }
      },
      "3": {
        start: {
          line: 13,
          column: 53
        },
        end: {
          line: 16,
          column: 1
        }
      },
      "4": {
        start: {
          line: 18,
          column: 37
        },
        end: {
          line: 24,
          column: 2
        }
      },
      "5": {
        start: {
          line: 18,
          column: 49
        },
        end: {
          line: 24,
          column: 1
        }
      },
      "6": {
        start: {
          line: 26,
          column: 24
        },
        end: {
          line: 34,
          column: 1
        }
      },
      "7": {
        start: {
          line: 26,
          column: 30
        },
        end: {
          line: 34,
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
          column: 28
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
          column: 45
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 9,
            column: 29
          },
          end: {
            line: 9,
            column: 30
          }
        },
        loc: {
          start: {
            line: 9,
            column: 36
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
            column: 38
          },
          end: {
            line: 13,
            column: 39
          }
        },
        loc: {
          start: {
            line: 13,
            column: 53
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
            column: 37
          },
          end: {
            line: 18,
            column: 38
          }
        },
        loc: {
          start: {
            line: 18,
            column: 49
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
            column: 24
          },
          end: {
            line: 26,
            column: 25
          }
        },
        loc: {
          start: {
            line: 26,
            column: 30
          },
          end: {
            line: 34,
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
            column: 30
          },
          end: {
            line: 26,
            column: 31
          }
        },
        loc: {
          start: {
            line: 26,
            column: 44
          },
          end: {
            line: 34,
            column: 1
          }
        },
        line: 26
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
    hash: "e1aba118f4a3f28629b138e43a7e4462a36b1ba3"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2epky7wjbs = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2epky7wjbs();
import axios from "../../axios";
import { IS_FETCHING, FETCH_USER_PROJECTS_SUCCESS, FETCH_USER_PROJECTS_FAILED } from "./actionTypes";
cov_2epky7wjbs().s[0]++;
export const startTheFetch = () => {
  cov_2epky7wjbs().f[0]++;
  cov_2epky7wjbs().s[1]++;
  return {
    type: IS_FETCHING
  };
};
cov_2epky7wjbs().s[2]++;
export const getUserProjectsSuccess = response => {
  cov_2epky7wjbs().f[1]++;
  cov_2epky7wjbs().s[3]++;
  return {
    type: FETCH_USER_PROJECTS_SUCCESS,
    payload: response.data.data.projects
  };
};
cov_2epky7wjbs().s[4]++;
export const getUserProjectsFailed = error => {
  cov_2epky7wjbs().f[2]++;
  cov_2epky7wjbs().s[5]++;
  return {
    type: FETCH_USER_PROJECTS_FAILED,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_2epky7wjbs().s[6]++;
const getUserProjects = () => {
  cov_2epky7wjbs().f[3]++;
  cov_2epky7wjbs().s[7]++;
  return dispatch => {
    cov_2epky7wjbs().f[4]++;
    cov_2epky7wjbs().s[8]++;
    dispatch(startTheFetch());
    cov_2epky7wjbs().s[9]++;
    return axios.get(`/projects`).then(response => {
      cov_2epky7wjbs().f[5]++;
      cov_2epky7wjbs().s[10]++;
      return dispatch(getUserProjectsSuccess(response));
    }).catch(error => {
      cov_2epky7wjbs().f[6]++;
      cov_2epky7wjbs().s[11]++;
      dispatch(getUserProjectsFailed(error));
    });
  };
};
export default getUserProjects;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMmVwa3k3d2picyIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJJU19GRVRDSElORyIsIkZFVENIX1VTRVJfUFJPSkVDVFNfU1VDQ0VTUyIsIkZFVENIX1VTRVJfUFJPSkVDVFNfRkFJTEVEIiwicyIsInN0YXJ0VGhlRmV0Y2giLCJmIiwidHlwZSIsImdldFVzZXJQcm9qZWN0c1N1Y2Nlc3MiLCJyZXNwb25zZSIsInBheWxvYWQiLCJkYXRhIiwicHJvamVjdHMiLCJnZXRVc2VyUHJvamVjdHNGYWlsZWQiLCJlcnJvciIsInN0YXR1cyIsImdldFVzZXJQcm9qZWN0cyIsImRpc3BhdGNoIiwiZ2V0IiwidGhlbiIsImNhdGNoIl0sInNvdXJjZXMiOlsicHJvamVjdHNMaXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiLi4vLi4vYXhpb3NcIjtcblxuaW1wb3J0IHtcbiAgSVNfRkVUQ0hJTkcsXG4gIEZFVENIX1VTRVJfUFJPSkVDVFNfU1VDQ0VTUyxcbiAgRkVUQ0hfVVNFUl9QUk9KRUNUU19GQUlMRUQsXG59IGZyb20gXCIuL2FjdGlvblR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBzdGFydFRoZUZldGNoID0gKCkgPT4gKHtcbiAgdHlwZTogSVNfRkVUQ0hJTkcsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJQcm9qZWN0c1N1Y2Nlc3MgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IEZFVENIX1VTRVJfUFJPSkVDVFNfU1VDQ0VTUyxcbiAgcGF5bG9hZDogcmVzcG9uc2UuZGF0YS5kYXRhLnByb2plY3RzLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyUHJvamVjdHNGYWlsZWQgPSAoZXJyb3IpID0+ICh7XG4gIHR5cGU6IEZFVENIX1VTRVJfUFJPSkVDVFNfRkFJTEVELFxuICBwYXlsb2FkOiB7XG4gICAgc3RhdHVzOiBmYWxzZSxcbiAgICBlcnJvcjogZXJyb3Iuc3RhdHVzLFxuICB9LFxufSk7XG5cbmNvbnN0IGdldFVzZXJQcm9qZWN0cyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaChzdGFydFRoZUZldGNoKCkpO1xuICByZXR1cm4gYXhpb3NcbiAgICAuZ2V0KGAvcHJvamVjdHNgKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gZGlzcGF0Y2goZ2V0VXNlclByb2plY3RzU3VjY2VzcyhyZXNwb25zZSkpKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGRpc3BhdGNoKGdldFVzZXJQcm9qZWN0c0ZhaWxlZChlcnJvcikpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0VXNlclByb2plY3RzO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosT0FBT0UsS0FBSyxNQUFNLGFBQWE7QUFFL0IsU0FDRUMsV0FBVyxFQUNYQywyQkFBMkIsRUFDM0JDLDBCQUEwQixRQUNyQixlQUFlO0FBQUNMLGNBQUEsR0FBQU0sQ0FBQTtBQUV2QixPQUFPLE1BQU1DLGFBQWEsR0FBR0EsQ0FBQSxLQUFPO0VBQUFQLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQTtJQUNsQ0csSUFBSSxFQUFFTjtFQUNSLENBQUM7QUFBRCxDQUFFO0FBQUNILGNBQUEsR0FBQU0sQ0FBQTtBQUVILE9BQU8sTUFBTUksc0JBQXNCLEdBQUlDLFFBQVEsSUFBTTtFQUFBWCxjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUE7SUFDbkRHLElBQUksRUFBRUwsMkJBQTJCO0lBQ2pDUSxPQUFPLEVBQUVELFFBQVEsQ0FBQ0UsSUFBSSxDQUFDQSxJQUFJLENBQUNDO0VBQzlCLENBQUM7QUFBRCxDQUFFO0FBQUNkLGNBQUEsR0FBQU0sQ0FBQTtBQUVILE9BQU8sTUFBTVMscUJBQXFCLEdBQUlDLEtBQUssSUFBTTtFQUFBaEIsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQy9DRyxJQUFJLEVBQUVKLDBCQUEwQjtJQUNoQ08sT0FBTyxFQUFFO01BQ1BLLE1BQU0sRUFBRSxLQUFLO01BQ2JELEtBQUssRUFBRUEsS0FBSyxDQUFDQztJQUNmO0VBQ0YsQ0FBQztBQUFELENBQUU7QUFBQ2pCLGNBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1ZLGVBQWUsR0FBR0EsQ0FBQSxLQUFNO0VBQUFsQixjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUEsT0FBQ2EsUUFBUSxJQUFLO0lBQUFuQixjQUFBLEdBQUFRLENBQUE7SUFBQVIsY0FBQSxHQUFBTSxDQUFBO0lBQzFDYSxRQUFRLENBQUNaLGFBQWEsRUFBRSxDQUFDO0lBQUNQLGNBQUEsR0FBQU0sQ0FBQTtJQUMxQixPQUFPSixLQUFLLENBQ1RrQixHQUFHLENBQUUsV0FBVSxDQUFDLENBQ2hCQyxJQUFJLENBQUVWLFFBQVEsSUFBSztNQUFBWCxjQUFBLEdBQUFRLENBQUE7TUFBQVIsY0FBQSxHQUFBTSxDQUFBO01BQUEsT0FBQWEsUUFBUSxDQUFDVCxzQkFBc0IsQ0FBQ0MsUUFBUSxDQUFDLENBQUM7SUFBRCxDQUFDLENBQUMsQ0FDOURXLEtBQUssQ0FBRU4sS0FBSyxJQUFLO01BQUFoQixjQUFBLEdBQUFRLENBQUE7TUFBQVIsY0FBQSxHQUFBTSxDQUFBO01BQ2hCYSxRQUFRLENBQUNKLHFCQUFxQixDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUM7RUFDTixDQUFDO0FBQUQsQ0FBQztBQUVELGVBQWVFLGVBQWUifQ==