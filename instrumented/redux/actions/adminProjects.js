function cov_22o1wb27c7() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/adminProjects.js";
  var hash = "bfa7f98d8cc1b6fe83ad7d023716055fd99bb1c8";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/adminProjects.js",
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
          column: 39
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 54
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "4": {
        start: {
          line: 17,
          column: 38
        },
        end: {
          line: 23,
          column: 2
        }
      },
      "5": {
        start: {
          line: 17,
          column: 50
        },
        end: {
          line: 23,
          column: 1
        }
      },
      "6": {
        start: {
          line: 25,
          column: 25
        },
        end: {
          line: 33,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 31
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
          column: 67
        }
      },
      "11": {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 31,
          column: 46
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
            column: 39
          },
          end: {
            line: 12,
            column: 40
          }
        },
        loc: {
          start: {
            line: 12,
            column: 54
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
            column: 38
          },
          end: {
            line: 17,
            column: 39
          }
        },
        loc: {
          start: {
            line: 17,
            column: 50
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
            column: 25
          },
          end: {
            line: 25,
            column: 26
          }
        },
        loc: {
          start: {
            line: 25,
            column: 31
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
            column: 31
          },
          end: {
            line: 25,
            column: 32
          }
        },
        loc: {
          start: {
            line: 25,
            column: 45
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
            column: 67
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
    hash: "bfa7f98d8cc1b6fe83ad7d023716055fd99bb1c8"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_22o1wb27c7 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_22o1wb27c7();
import axios from "../../axios";
import { IS_FETCHING, FETCH_ADMIN_PROJECTS_SUCCESS, FETCH_ADMIN_PROJECTS_FAILED } from "./actionTypes";
cov_22o1wb27c7().s[0]++;
export const startTheFetch = () => {
  cov_22o1wb27c7().f[0]++;
  cov_22o1wb27c7().s[1]++;
  return {
    type: IS_FETCHING
  };
};
cov_22o1wb27c7().s[2]++;
export const getAdminProjectsSuccess = response => {
  cov_22o1wb27c7().f[1]++;
  cov_22o1wb27c7().s[3]++;
  return {
    type: FETCH_ADMIN_PROJECTS_SUCCESS,
    payload: response.data.data.projects
  };
};
cov_22o1wb27c7().s[4]++;
export const getAdminProjectsFailed = error => {
  cov_22o1wb27c7().f[2]++;
  cov_22o1wb27c7().s[5]++;
  return {
    type: FETCH_ADMIN_PROJECTS_FAILED,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_22o1wb27c7().s[6]++;
const getAdminProjects = () => {
  cov_22o1wb27c7().f[3]++;
  cov_22o1wb27c7().s[7]++;
  return dispatch => {
    cov_22o1wb27c7().f[4]++;
    cov_22o1wb27c7().s[8]++;
    dispatch(startTheFetch());
    cov_22o1wb27c7().s[9]++;
    return axios.get(`/projects`).then(response => {
      cov_22o1wb27c7().f[5]++;
      cov_22o1wb27c7().s[10]++;
      return dispatch(getAdminProjectsSuccess(response));
    }).catch(error => {
      cov_22o1wb27c7().f[6]++;
      cov_22o1wb27c7().s[11]++;
      dispatch(getAdminProjectsFailed(error));
    });
  };
};
export default getAdminProjects;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjJvMXdiMjdjNyIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJJU19GRVRDSElORyIsIkZFVENIX0FETUlOX1BST0pFQ1RTX1NVQ0NFU1MiLCJGRVRDSF9BRE1JTl9QUk9KRUNUU19GQUlMRUQiLCJzIiwic3RhcnRUaGVGZXRjaCIsImYiLCJ0eXBlIiwiZ2V0QWRtaW5Qcm9qZWN0c1N1Y2Nlc3MiLCJyZXNwb25zZSIsInBheWxvYWQiLCJkYXRhIiwicHJvamVjdHMiLCJnZXRBZG1pblByb2plY3RzRmFpbGVkIiwiZXJyb3IiLCJzdGF0dXMiLCJnZXRBZG1pblByb2plY3RzIiwiZGlzcGF0Y2giLCJnZXQiLCJ0aGVuIiwiY2F0Y2giXSwic291cmNlcyI6WyJhZG1pblByb2plY3RzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiLi4vLi4vYXhpb3NcIjtcbmltcG9ydCB7XG4gIElTX0ZFVENISU5HLFxuICBGRVRDSF9BRE1JTl9QUk9KRUNUU19TVUNDRVNTLFxuICBGRVRDSF9BRE1JTl9QUk9KRUNUU19GQUlMRUQsXG59IGZyb20gXCIuL2FjdGlvblR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBzdGFydFRoZUZldGNoID0gKCkgPT4gKHtcbiAgdHlwZTogSVNfRkVUQ0hJTkcsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldEFkbWluUHJvamVjdHNTdWNjZXNzID0gKHJlc3BvbnNlKSA9PiAoe1xuICB0eXBlOiBGRVRDSF9BRE1JTl9QUk9KRUNUU19TVUNDRVNTLFxuICBwYXlsb2FkOiByZXNwb25zZS5kYXRhLmRhdGEucHJvamVjdHMsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldEFkbWluUHJvamVjdHNGYWlsZWQgPSAoZXJyb3IpID0+ICh7XG4gIHR5cGU6IEZFVENIX0FETUlOX1BST0pFQ1RTX0ZBSUxFRCxcbiAgcGF5bG9hZDoge1xuICAgIHN0YXR1czogZmFsc2UsXG4gICAgZXJyb3I6IGVycm9yLnN0YXR1cyxcbiAgfSxcbn0pO1xuXG5jb25zdCBnZXRBZG1pblByb2plY3RzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHN0YXJ0VGhlRmV0Y2goKSk7XG4gIHJldHVybiBheGlvc1xuICAgIC5nZXQoYC9wcm9qZWN0c2ApXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiBkaXNwYXRjaChnZXRBZG1pblByb2plY3RzU3VjY2VzcyhyZXNwb25zZSkpKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGRpc3BhdGNoKGdldEFkbWluUHJvamVjdHNGYWlsZWQoZXJyb3IpKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldEFkbWluUHJvamVjdHM7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixPQUFPRSxLQUFLLE1BQU0sYUFBYTtBQUMvQixTQUNFQyxXQUFXLEVBQ1hDLDRCQUE0QixFQUM1QkMsMkJBQTJCLFFBQ3RCLGVBQWU7QUFBQ0wsY0FBQSxHQUFBTSxDQUFBO0FBRXZCLE9BQU8sTUFBTUMsYUFBYSxHQUFHQSxDQUFBLEtBQU87RUFBQVAsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ2xDRyxJQUFJLEVBQUVOO0VBQ1IsQ0FBQztBQUFELENBQUU7QUFBQ0gsY0FBQSxHQUFBTSxDQUFBO0FBRUgsT0FBTyxNQUFNSSx1QkFBdUIsR0FBSUMsUUFBUSxJQUFNO0VBQUFYLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQTtJQUNwREcsSUFBSSxFQUFFTCw0QkFBNEI7SUFDbENRLE9BQU8sRUFBRUQsUUFBUSxDQUFDRSxJQUFJLENBQUNBLElBQUksQ0FBQ0M7RUFDOUIsQ0FBQztBQUFELENBQUU7QUFBQ2QsY0FBQSxHQUFBTSxDQUFBO0FBRUgsT0FBTyxNQUFNUyxzQkFBc0IsR0FBSUMsS0FBSyxJQUFNO0VBQUFoQixjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUE7SUFDaERHLElBQUksRUFBRUosMkJBQTJCO0lBQ2pDTyxPQUFPLEVBQUU7TUFDUEssTUFBTSxFQUFFLEtBQUs7TUFDYkQsS0FBSyxFQUFFQSxLQUFLLENBQUNDO0lBQ2Y7RUFDRixDQUFDO0FBQUQsQ0FBRTtBQUFDakIsY0FBQSxHQUFBTSxDQUFBO0FBRUgsTUFBTVksZ0JBQWdCLEdBQUdBLENBQUEsS0FBTTtFQUFBbEIsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBLE9BQUNhLFFBQVEsSUFBSztJQUFBbkIsY0FBQSxHQUFBUSxDQUFBO0lBQUFSLGNBQUEsR0FBQU0sQ0FBQTtJQUMzQ2EsUUFBUSxDQUFDWixhQUFhLEVBQUUsQ0FBQztJQUFDUCxjQUFBLEdBQUFNLENBQUE7SUFDMUIsT0FBT0osS0FBSyxDQUNUa0IsR0FBRyxDQUFFLFdBQVUsQ0FBQyxDQUNoQkMsSUFBSSxDQUFFVixRQUFRLElBQUs7TUFBQVgsY0FBQSxHQUFBUSxDQUFBO01BQUFSLGNBQUEsR0FBQU0sQ0FBQTtNQUFBLE9BQUFhLFFBQVEsQ0FBQ1QsdUJBQXVCLENBQUNDLFFBQVEsQ0FBQyxDQUFDO0lBQUQsQ0FBQyxDQUFDLENBQy9EVyxLQUFLLENBQUVOLEtBQUssSUFBSztNQUFBaEIsY0FBQSxHQUFBUSxDQUFBO01BQUFSLGNBQUEsR0FBQU0sQ0FBQTtNQUNoQmEsUUFBUSxDQUFDSixzQkFBc0IsQ0FBQ0MsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDO0VBQ04sQ0FBQztBQUFELENBQUM7QUFFRCxlQUFlRSxnQkFBZ0IifQ==