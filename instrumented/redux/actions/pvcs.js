function cov_fl4hde6ta() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/pvcs.js";
  var hash = "de63e60638128fd0c7e09c8a06b8280f9f4c534b";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/pvcs.js",
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
    hash: "de63e60638128fd0c7e09c8a06b8280f9f4c534b"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_fl4hde6ta = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_fl4hde6ta();
import axios from "../../axios";
import { IS_FETCHING, FETCH_PVCS_SUCCESS, FETCH_PVCS_FAILED } from "./actionTypes";
cov_fl4hde6ta().s[0]++;
export const startTheFetch = () => {
  cov_fl4hde6ta().f[0]++;
  cov_fl4hde6ta().s[1]++;
  return {
    type: IS_FETCHING
  };
};
cov_fl4hde6ta().s[2]++;
export const getPvcsSuccess = response => {
  cov_fl4hde6ta().f[1]++;
  cov_fl4hde6ta().s[3]++;
  return {
    type: FETCH_PVCS_SUCCESS,
    payload: response.data.data.pvcs
  };
};
cov_fl4hde6ta().s[4]++;
export const getPvcsFailed = error => {
  cov_fl4hde6ta().f[2]++;
  cov_fl4hde6ta().s[5]++;
  return {
    type: FETCH_PVCS_FAILED,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_fl4hde6ta().s[6]++;
const getPvcs = clusterId => {
  cov_fl4hde6ta().f[3]++;
  cov_fl4hde6ta().s[7]++;
  return dispatch => {
    cov_fl4hde6ta().f[4]++;
    cov_fl4hde6ta().s[8]++;
    dispatch(startTheFetch());
    cov_fl4hde6ta().s[9]++;
    return axios.get(`/clusters/${clusterId}/pvcs`).then(response => {
      cov_fl4hde6ta().f[5]++;
      cov_fl4hde6ta().s[10]++;
      return dispatch(getPvcsSuccess(response));
    }).catch(error => {
      cov_fl4hde6ta().f[6]++;
      cov_fl4hde6ta().s[11]++;
      dispatch(getPvcsFailed(error));
    });
  };
};
export default getPvcs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfZmw0aGRlNnRhIiwiYWN0dWFsQ292ZXJhZ2UiLCJheGlvcyIsIklTX0ZFVENISU5HIiwiRkVUQ0hfUFZDU19TVUNDRVNTIiwiRkVUQ0hfUFZDU19GQUlMRUQiLCJzIiwic3RhcnRUaGVGZXRjaCIsImYiLCJ0eXBlIiwiZ2V0UHZjc1N1Y2Nlc3MiLCJyZXNwb25zZSIsInBheWxvYWQiLCJkYXRhIiwicHZjcyIsImdldFB2Y3NGYWlsZWQiLCJlcnJvciIsInN0YXR1cyIsImdldFB2Y3MiLCJjbHVzdGVySWQiLCJkaXNwYXRjaCIsImdldCIsInRoZW4iLCJjYXRjaCJdLCJzb3VyY2VzIjpbInB2Y3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCIuLi8uLi9heGlvc1wiO1xuaW1wb3J0IHtcbiAgSVNfRkVUQ0hJTkcsXG4gIEZFVENIX1BWQ1NfU1VDQ0VTUyxcbiAgRkVUQ0hfUFZDU19GQUlMRUQsXG59IGZyb20gXCIuL2FjdGlvblR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBzdGFydFRoZUZldGNoID0gKCkgPT4gKHtcbiAgdHlwZTogSVNfRkVUQ0hJTkcsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldFB2Y3NTdWNjZXNzID0gKHJlc3BvbnNlKSA9PiAoe1xuICB0eXBlOiBGRVRDSF9QVkNTX1NVQ0NFU1MsXG4gIHBheWxvYWQ6IHJlc3BvbnNlLmRhdGEuZGF0YS5wdmNzLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRQdmNzRmFpbGVkID0gKGVycm9yKSA9PiAoe1xuICB0eXBlOiBGRVRDSF9QVkNTX0ZBSUxFRCxcbiAgcGF5bG9hZDoge1xuICAgIHN0YXR1czogZmFsc2UsXG4gICAgZXJyb3I6IGVycm9yLnN0YXR1cyxcbiAgfSxcbn0pO1xuXG5jb25zdCBnZXRQdmNzID0gKGNsdXN0ZXJJZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHN0YXJ0VGhlRmV0Y2goKSk7XG4gIHJldHVybiBheGlvc1xuICAgIC5nZXQoYC9jbHVzdGVycy8ke2NsdXN0ZXJJZH0vcHZjc2ApXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiBkaXNwYXRjaChnZXRQdmNzU3VjY2VzcyhyZXNwb25zZSkpKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGRpc3BhdGNoKGdldFB2Y3NGYWlsZWQoZXJyb3IpKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFB2Y3M7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGFBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGFBQUE7QUFmWixPQUFPRSxLQUFLLE1BQU0sYUFBYTtBQUMvQixTQUNFQyxXQUFXLEVBQ1hDLGtCQUFrQixFQUNsQkMsaUJBQWlCLFFBQ1osZUFBZTtBQUFDTCxhQUFBLEdBQUFNLENBQUE7QUFFdkIsT0FBTyxNQUFNQyxhQUFhLEdBQUdBLENBQUEsS0FBTztFQUFBUCxhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUE7SUFDbENHLElBQUksRUFBRU47RUFDUixDQUFDO0FBQUQsQ0FBRTtBQUFDSCxhQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1JLGNBQWMsR0FBSUMsUUFBUSxJQUFNO0VBQUFYLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQTtJQUMzQ0csSUFBSSxFQUFFTCxrQkFBa0I7SUFDeEJRLE9BQU8sRUFBRUQsUUFBUSxDQUFDRSxJQUFJLENBQUNBLElBQUksQ0FBQ0M7RUFDOUIsQ0FBQztBQUFELENBQUU7QUFBQ2QsYUFBQSxHQUFBTSxDQUFBO0FBRUgsT0FBTyxNQUFNUyxhQUFhLEdBQUlDLEtBQUssSUFBTTtFQUFBaEIsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ3ZDRyxJQUFJLEVBQUVKLGlCQUFpQjtJQUN2Qk8sT0FBTyxFQUFFO01BQ1BLLE1BQU0sRUFBRSxLQUFLO01BQ2JELEtBQUssRUFBRUEsS0FBSyxDQUFDQztJQUNmO0VBQ0YsQ0FBQztBQUFELENBQUU7QUFBQ2pCLGFBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1ZLE9BQU8sR0FBSUMsU0FBUyxJQUFLO0VBQUFuQixhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUEsT0FBQ2MsUUFBUSxJQUFLO0lBQUFwQixhQUFBLEdBQUFRLENBQUE7SUFBQVIsYUFBQSxHQUFBTSxDQUFBO0lBQzNDYyxRQUFRLENBQUNiLGFBQWEsRUFBRSxDQUFDO0lBQUNQLGFBQUEsR0FBQU0sQ0FBQTtJQUMxQixPQUFPSixLQUFLLENBQ1RtQixHQUFHLENBQUUsYUFBWUYsU0FBVSxPQUFNLENBQUMsQ0FDbENHLElBQUksQ0FBRVgsUUFBUSxJQUFLO01BQUFYLGFBQUEsR0FBQVEsQ0FBQTtNQUFBUixhQUFBLEdBQUFNLENBQUE7TUFBQSxPQUFBYyxRQUFRLENBQUNWLGNBQWMsQ0FBQ0MsUUFBUSxDQUFDLENBQUM7SUFBRCxDQUFDLENBQUMsQ0FDdERZLEtBQUssQ0FBRVAsS0FBSyxJQUFLO01BQUFoQixhQUFBLEdBQUFRLENBQUE7TUFBQVIsYUFBQSxHQUFBTSxDQUFBO01BQ2hCYyxRQUFRLENBQUNMLGFBQWEsQ0FBQ0MsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0VBQ04sQ0FBQztBQUFELENBQUM7QUFFRCxlQUFlRSxPQUFPIn0=