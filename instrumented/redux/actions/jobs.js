function cov_8mcjxb8dz() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/jobs.js";
  var hash = "4a74fd0d4dc145a3ea51cc5f88f9479450f337b9";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/jobs.js",
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
          column: 16
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
          column: 58
        }
      },
      "11": {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 31,
          column: 37
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
            column: 16
          },
          end: {
            line: 25,
            column: 17
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
            column: 58
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
    hash: "4a74fd0d4dc145a3ea51cc5f88f9479450f337b9"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_8mcjxb8dz = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_8mcjxb8dz();
import axios from "../../axios";
import { IS_FETCHING, FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILED } from "./actionTypes";
cov_8mcjxb8dz().s[0]++;
export const startTheFetch = () => {
  cov_8mcjxb8dz().f[0]++;
  cov_8mcjxb8dz().s[1]++;
  return {
    type: IS_FETCHING
  };
};
cov_8mcjxb8dz().s[2]++;
export const getJobsSuccess = response => {
  cov_8mcjxb8dz().f[1]++;
  cov_8mcjxb8dz().s[3]++;
  return {
    type: FETCH_JOBS_SUCCESS,
    payload: response.data.data.jobs
  };
};
cov_8mcjxb8dz().s[4]++;
export const getJobsFailed = error => {
  cov_8mcjxb8dz().f[2]++;
  cov_8mcjxb8dz().s[5]++;
  return {
    type: FETCH_JOBS_FAILED,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_8mcjxb8dz().s[6]++;
const getJobs = clusterId => {
  cov_8mcjxb8dz().f[3]++;
  cov_8mcjxb8dz().s[7]++;
  return dispatch => {
    cov_8mcjxb8dz().f[4]++;
    cov_8mcjxb8dz().s[8]++;
    dispatch(startTheFetch());
    cov_8mcjxb8dz().s[9]++;
    return axios.get(`/clusters/${clusterId}/jobs`).then(response => {
      cov_8mcjxb8dz().f[5]++;
      cov_8mcjxb8dz().s[10]++;
      return dispatch(getJobsSuccess(response));
    }).catch(error => {
      cov_8mcjxb8dz().f[6]++;
      cov_8mcjxb8dz().s[11]++;
      dispatch(getJobsFailed(error));
    });
  };
};
export default getJobs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfOG1janhiOGR6IiwiYWN0dWFsQ292ZXJhZ2UiLCJheGlvcyIsIklTX0ZFVENISU5HIiwiRkVUQ0hfSk9CU19TVUNDRVNTIiwiRkVUQ0hfSk9CU19GQUlMRUQiLCJzIiwic3RhcnRUaGVGZXRjaCIsImYiLCJ0eXBlIiwiZ2V0Sm9ic1N1Y2Nlc3MiLCJyZXNwb25zZSIsInBheWxvYWQiLCJkYXRhIiwiam9icyIsImdldEpvYnNGYWlsZWQiLCJlcnJvciIsInN0YXR1cyIsImdldEpvYnMiLCJjbHVzdGVySWQiLCJkaXNwYXRjaCIsImdldCIsInRoZW4iLCJjYXRjaCJdLCJzb3VyY2VzIjpbImpvYnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCIuLi8uLi9heGlvc1wiO1xuaW1wb3J0IHtcbiAgSVNfRkVUQ0hJTkcsXG4gIEZFVENIX0pPQlNfU1VDQ0VTUyxcbiAgRkVUQ0hfSk9CU19GQUlMRUQsXG59IGZyb20gXCIuL2FjdGlvblR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBzdGFydFRoZUZldGNoID0gKCkgPT4gKHtcbiAgdHlwZTogSVNfRkVUQ0hJTkcsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldEpvYnNTdWNjZXNzID0gKHJlc3BvbnNlKSA9PiAoe1xuICB0eXBlOiBGRVRDSF9KT0JTX1NVQ0NFU1MsXG4gIHBheWxvYWQ6IHJlc3BvbnNlLmRhdGEuZGF0YS5qb2JzLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRKb2JzRmFpbGVkID0gKGVycm9yKSA9PiAoe1xuICB0eXBlOiBGRVRDSF9KT0JTX0ZBSUxFRCxcbiAgcGF5bG9hZDoge1xuICAgIHN0YXR1czogZmFsc2UsXG4gICAgZXJyb3I6IGVycm9yLnN0YXR1cyxcbiAgfSxcbn0pO1xuXG5jb25zdCBnZXRKb2JzID0gKGNsdXN0ZXJJZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHN0YXJ0VGhlRmV0Y2goKSk7XG4gIHJldHVybiBheGlvc1xuICAgIC5nZXQoYC9jbHVzdGVycy8ke2NsdXN0ZXJJZH0vam9ic2ApXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiBkaXNwYXRjaChnZXRKb2JzU3VjY2VzcyhyZXNwb25zZSkpKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGRpc3BhdGNoKGdldEpvYnNGYWlsZWQoZXJyb3IpKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldEpvYnM7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGFBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGFBQUE7QUFmWixPQUFPRSxLQUFLLE1BQU0sYUFBYTtBQUMvQixTQUNFQyxXQUFXLEVBQ1hDLGtCQUFrQixFQUNsQkMsaUJBQWlCLFFBQ1osZUFBZTtBQUFDTCxhQUFBLEdBQUFNLENBQUE7QUFFdkIsT0FBTyxNQUFNQyxhQUFhLEdBQUdBLENBQUEsS0FBTztFQUFBUCxhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUE7SUFDbENHLElBQUksRUFBRU47RUFDUixDQUFDO0FBQUQsQ0FBRTtBQUFDSCxhQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1JLGNBQWMsR0FBSUMsUUFBUSxJQUFNO0VBQUFYLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQTtJQUMzQ0csSUFBSSxFQUFFTCxrQkFBa0I7SUFDeEJRLE9BQU8sRUFBRUQsUUFBUSxDQUFDRSxJQUFJLENBQUNBLElBQUksQ0FBQ0M7RUFDOUIsQ0FBQztBQUFELENBQUU7QUFBQ2QsYUFBQSxHQUFBTSxDQUFBO0FBRUgsT0FBTyxNQUFNUyxhQUFhLEdBQUlDLEtBQUssSUFBTTtFQUFBaEIsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ3ZDRyxJQUFJLEVBQUVKLGlCQUFpQjtJQUN2Qk8sT0FBTyxFQUFFO01BQ1BLLE1BQU0sRUFBRSxLQUFLO01BQ2JELEtBQUssRUFBRUEsS0FBSyxDQUFDQztJQUNmO0VBQ0YsQ0FBQztBQUFELENBQUU7QUFBQ2pCLGFBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1ZLE9BQU8sR0FBSUMsU0FBUyxJQUFLO0VBQUFuQixhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUEsT0FBQ2MsUUFBUSxJQUFLO0lBQUFwQixhQUFBLEdBQUFRLENBQUE7SUFBQVIsYUFBQSxHQUFBTSxDQUFBO0lBQzNDYyxRQUFRLENBQUNiLGFBQWEsRUFBRSxDQUFDO0lBQUNQLGFBQUEsR0FBQU0sQ0FBQTtJQUMxQixPQUFPSixLQUFLLENBQ1RtQixHQUFHLENBQUUsYUFBWUYsU0FBVSxPQUFNLENBQUMsQ0FDbENHLElBQUksQ0FBRVgsUUFBUSxJQUFLO01BQUFYLGFBQUEsR0FBQVEsQ0FBQTtNQUFBUixhQUFBLEdBQUFNLENBQUE7TUFBQSxPQUFBYyxRQUFRLENBQUNWLGNBQWMsQ0FBQ0MsUUFBUSxDQUFDLENBQUM7SUFBRCxDQUFDLENBQUMsQ0FDdERZLEtBQUssQ0FBRVAsS0FBSyxJQUFLO01BQUFoQixhQUFBLEdBQUFRLENBQUE7TUFBQVIsYUFBQSxHQUFBTSxDQUFBO01BQ2hCYyxRQUFRLENBQUNMLGFBQWEsQ0FBQ0MsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0VBQ04sQ0FBQztBQUFELENBQUM7QUFFRCxlQUFlRSxPQUFPIn0=