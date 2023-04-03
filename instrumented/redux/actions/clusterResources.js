function cov_2f1xrto5qe() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/clusterResources.js";
  var hash = "f04648e9f77eda3136354ea3bce46d13d5fdc297";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/clusterResources.js",
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
          column: 35
        },
        end: {
          line: 16,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 50
        },
        end: {
          line: 16,
          column: 1
        }
      },
      "4": {
        start: {
          line: 18,
          column: 32
        },
        end: {
          line: 24,
          column: 2
        }
      },
      "5": {
        start: {
          line: 18,
          column: 44
        },
        end: {
          line: 24,
          column: 1
        }
      },
      "6": {
        start: {
          line: 26,
          column: 33
        },
        end: {
          line: 34,
          column: 1
        }
      },
      "7": {
        start: {
          line: 26,
          column: 48
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
          column: 37
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
          column: 63
        }
      },
      "11": {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 32,
          column: 40
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
            column: 35
          },
          end: {
            line: 12,
            column: 36
          }
        },
        loc: {
          start: {
            line: 12,
            column: 50
          },
          end: {
            line: 16,
            column: 1
          }
        },
        line: 12
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 18,
            column: 32
          },
          end: {
            line: 18,
            column: 33
          }
        },
        loc: {
          start: {
            line: 18,
            column: 44
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
            column: 33
          },
          end: {
            line: 26,
            column: 34
          }
        },
        loc: {
          start: {
            line: 26,
            column: 48
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
            column: 48
          },
          end: {
            line: 26,
            column: 49
          }
        },
        loc: {
          start: {
            line: 26,
            column: 62
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
            column: 63
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
    hash: "f04648e9f77eda3136354ea3bce46d13d5fdc297"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2f1xrto5qe = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2f1xrto5qe();
import axios from "../../axios";
import { GET_RESOURCES_COUNT, GET_RESOURCES_COUNT_FAILED, START_GETTING_RESOURCES_COUNT } from "./actionTypes";
cov_2f1xrto5qe().s[0]++;
export const startFetchingResources = () => {
  cov_2f1xrto5qe().f[0]++;
  cov_2f1xrto5qe().s[1]++;
  return {
    type: START_GETTING_RESOURCES_COUNT
  };
};
cov_2f1xrto5qe().s[2]++;
export const getResourcesSuccess = response => {
  cov_2f1xrto5qe().f[1]++;
  cov_2f1xrto5qe().s[3]++;
  return {
    type: GET_RESOURCES_COUNT,
    payload: response.data.data.resource_count,
    clusterName: response.data.data.cluster.name
  };
};
cov_2f1xrto5qe().s[4]++;
export const getResourcesFail = error => {
  cov_2f1xrto5qe().f[2]++;
  cov_2f1xrto5qe().s[5]++;
  return {
    type: GET_RESOURCES_COUNT_FAILED,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_2f1xrto5qe().s[6]++;
const getClusterResourcesCount = clusterID => {
  cov_2f1xrto5qe().f[3]++;
  cov_2f1xrto5qe().s[7]++;
  return dispatch => {
    cov_2f1xrto5qe().f[4]++;
    cov_2f1xrto5qe().s[8]++;
    dispatch(startFetchingResources());
    cov_2f1xrto5qe().s[9]++;
    return axios.get(`/clusters/${clusterID}`).then(response => {
      cov_2f1xrto5qe().f[5]++;
      cov_2f1xrto5qe().s[10]++;
      return dispatch(getResourcesSuccess(response));
    }).catch(error => {
      cov_2f1xrto5qe().f[6]++;
      cov_2f1xrto5qe().s[11]++;
      dispatch(getResourcesFail(error));
    });
  };
};
export default getClusterResourcesCount;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMmYxeHJ0bzVxZSIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJHRVRfUkVTT1VSQ0VTX0NPVU5UIiwiR0VUX1JFU09VUkNFU19DT1VOVF9GQUlMRUQiLCJTVEFSVF9HRVRUSU5HX1JFU09VUkNFU19DT1VOVCIsInMiLCJzdGFydEZldGNoaW5nUmVzb3VyY2VzIiwiZiIsInR5cGUiLCJnZXRSZXNvdXJjZXNTdWNjZXNzIiwicmVzcG9uc2UiLCJwYXlsb2FkIiwiZGF0YSIsInJlc291cmNlX2NvdW50IiwiY2x1c3Rlck5hbWUiLCJjbHVzdGVyIiwibmFtZSIsImdldFJlc291cmNlc0ZhaWwiLCJlcnJvciIsInN0YXR1cyIsImdldENsdXN0ZXJSZXNvdXJjZXNDb3VudCIsImNsdXN0ZXJJRCIsImRpc3BhdGNoIiwiZ2V0IiwidGhlbiIsImNhdGNoIl0sInNvdXJjZXMiOlsiY2x1c3RlclJlc291cmNlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcIi4uLy4uL2F4aW9zXCI7XG5pbXBvcnQge1xuICBHRVRfUkVTT1VSQ0VTX0NPVU5ULFxuICBHRVRfUkVTT1VSQ0VTX0NPVU5UX0ZBSUxFRCxcbiAgU1RBUlRfR0VUVElOR19SRVNPVVJDRVNfQ09VTlQsXG59IGZyb20gXCIuL2FjdGlvblR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBzdGFydEZldGNoaW5nUmVzb3VyY2VzID0gKCkgPT4gKHtcbiAgdHlwZTogU1RBUlRfR0VUVElOR19SRVNPVVJDRVNfQ09VTlQsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldFJlc291cmNlc1N1Y2Nlc3MgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IEdFVF9SRVNPVVJDRVNfQ09VTlQsXG4gIHBheWxvYWQ6IHJlc3BvbnNlLmRhdGEuZGF0YS5yZXNvdXJjZV9jb3VudCxcbiAgY2x1c3Rlck5hbWU6IHJlc3BvbnNlLmRhdGEuZGF0YS5jbHVzdGVyLm5hbWUsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldFJlc291cmNlc0ZhaWwgPSAoZXJyb3IpID0+ICh7XG4gIHR5cGU6IEdFVF9SRVNPVVJDRVNfQ09VTlRfRkFJTEVELFxuICBwYXlsb2FkOiB7XG4gICAgc3RhdHVzOiBmYWxzZSxcbiAgICBlcnJvcjogZXJyb3Iuc3RhdHVzLFxuICB9LFxufSk7XG5cbmNvbnN0IGdldENsdXN0ZXJSZXNvdXJjZXNDb3VudCA9IChjbHVzdGVySUQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaChzdGFydEZldGNoaW5nUmVzb3VyY2VzKCkpO1xuICByZXR1cm4gYXhpb3NcbiAgICAuZ2V0KGAvY2x1c3RlcnMvJHtjbHVzdGVySUR9YClcbiAgICAudGhlbigocmVzcG9uc2UpID0+IGRpc3BhdGNoKGdldFJlc291cmNlc1N1Y2Nlc3MocmVzcG9uc2UpKSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBkaXNwYXRjaChnZXRSZXNvdXJjZXNGYWlsKGVycm9yKSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRDbHVzdGVyUmVzb3VyY2VzQ291bnQ7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixPQUFPRSxLQUFLLE1BQU0sYUFBYTtBQUMvQixTQUNFQyxtQkFBbUIsRUFDbkJDLDBCQUEwQixFQUMxQkMsNkJBQTZCLFFBQ3hCLGVBQWU7QUFBQ0wsY0FBQSxHQUFBTSxDQUFBO0FBRXZCLE9BQU8sTUFBTUMsc0JBQXNCLEdBQUdBLENBQUEsS0FBTztFQUFBUCxjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUE7SUFDM0NHLElBQUksRUFBRUo7RUFDUixDQUFDO0FBQUQsQ0FBRTtBQUFDTCxjQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1JLG1CQUFtQixHQUFJQyxRQUFRLElBQU07RUFBQVgsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ2hERyxJQUFJLEVBQUVOLG1CQUFtQjtJQUN6QlMsT0FBTyxFQUFFRCxRQUFRLENBQUNFLElBQUksQ0FBQ0EsSUFBSSxDQUFDQyxjQUFjO0lBQzFDQyxXQUFXLEVBQUVKLFFBQVEsQ0FBQ0UsSUFBSSxDQUFDQSxJQUFJLENBQUNHLE9BQU8sQ0FBQ0M7RUFDMUMsQ0FBQztBQUFELENBQUU7QUFBQ2pCLGNBQUEsR0FBQU0sQ0FBQTtBQUVILE9BQU8sTUFBTVksZ0JBQWdCLEdBQUlDLEtBQUssSUFBTTtFQUFBbkIsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQzFDRyxJQUFJLEVBQUVMLDBCQUEwQjtJQUNoQ1EsT0FBTyxFQUFFO01BQ1BRLE1BQU0sRUFBRSxLQUFLO01BQ2JELEtBQUssRUFBRUEsS0FBSyxDQUFDQztJQUNmO0VBQ0YsQ0FBQztBQUFELENBQUU7QUFBQ3BCLGNBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1lLHdCQUF3QixHQUFJQyxTQUFTLElBQUs7RUFBQXRCLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQSxPQUFDaUIsUUFBUSxJQUFLO0lBQUF2QixjQUFBLEdBQUFRLENBQUE7SUFBQVIsY0FBQSxHQUFBTSxDQUFBO0lBQzVEaUIsUUFBUSxDQUFDaEIsc0JBQXNCLEVBQUUsQ0FBQztJQUFDUCxjQUFBLEdBQUFNLENBQUE7SUFDbkMsT0FBT0osS0FBSyxDQUNUc0IsR0FBRyxDQUFFLGFBQVlGLFNBQVUsRUFBQyxDQUFDLENBQzdCRyxJQUFJLENBQUVkLFFBQVEsSUFBSztNQUFBWCxjQUFBLEdBQUFRLENBQUE7TUFBQVIsY0FBQSxHQUFBTSxDQUFBO01BQUEsT0FBQWlCLFFBQVEsQ0FBQ2IsbUJBQW1CLENBQUNDLFFBQVEsQ0FBQyxDQUFDO0lBQUQsQ0FBQyxDQUFDLENBQzNEZSxLQUFLLENBQUVQLEtBQUssSUFBSztNQUFBbkIsY0FBQSxHQUFBUSxDQUFBO01BQUFSLGNBQUEsR0FBQU0sQ0FBQTtNQUNoQmlCLFFBQVEsQ0FBQ0wsZ0JBQWdCLENBQUNDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztFQUNOLENBQUM7QUFBRCxDQUFDO0FBRUQsZUFBZUUsd0JBQXdCIn0=