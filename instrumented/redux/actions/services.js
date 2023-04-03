function cov_11h44bd462() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/services.js";
  var hash = "b55a326399c4a664a87551350de2b1a5ad10f08a";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/services.js",
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
          column: 34
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 49
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
          column: 20
        },
        end: {
          line: 33,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 35
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
          column: 62
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
            column: 34
          },
          end: {
            line: 12,
            column: 35
          }
        },
        loc: {
          start: {
            line: 12,
            column: 49
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
            column: 35
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
            column: 62
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
    hash: "b55a326399c4a664a87551350de2b1a5ad10f08a"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_11h44bd462 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_11h44bd462();
import axios from "../../axios";
import { IS_FETCHING, FETCH_SERVICES_SUCCESS, FETCH_SERVICES_FAILED } from "./actionTypes";
cov_11h44bd462().s[0]++;
export const startTheFetch = () => {
  cov_11h44bd462().f[0]++;
  cov_11h44bd462().s[1]++;
  return {
    type: IS_FETCHING
  };
};
cov_11h44bd462().s[2]++;
export const getServicesSuccess = response => {
  cov_11h44bd462().f[1]++;
  cov_11h44bd462().s[3]++;
  return {
    type: FETCH_SERVICES_SUCCESS,
    payload: response.data.data.services
  };
};
cov_11h44bd462().s[4]++;
export const getServicesFailed = error => {
  cov_11h44bd462().f[2]++;
  cov_11h44bd462().s[5]++;
  return {
    type: FETCH_SERVICES_FAILED,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_11h44bd462().s[6]++;
const getServices = clusterId => {
  cov_11h44bd462().f[3]++;
  cov_11h44bd462().s[7]++;
  return dispatch => {
    cov_11h44bd462().f[4]++;
    cov_11h44bd462().s[8]++;
    dispatch(startTheFetch());
    cov_11h44bd462().s[9]++;
    return axios.get(`/clusters/${clusterId}/services`).then(response => {
      cov_11h44bd462().f[5]++;
      cov_11h44bd462().s[10]++;
      return dispatch(getServicesSuccess(response));
    }).catch(error => {
      cov_11h44bd462().f[6]++;
      cov_11h44bd462().s[11]++;
      dispatch(getServicesFailed(error));
    });
  };
};
export default getServices;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTFoNDRiZDQ2MiIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJJU19GRVRDSElORyIsIkZFVENIX1NFUlZJQ0VTX1NVQ0NFU1MiLCJGRVRDSF9TRVJWSUNFU19GQUlMRUQiLCJzIiwic3RhcnRUaGVGZXRjaCIsImYiLCJ0eXBlIiwiZ2V0U2VydmljZXNTdWNjZXNzIiwicmVzcG9uc2UiLCJwYXlsb2FkIiwiZGF0YSIsInNlcnZpY2VzIiwiZ2V0U2VydmljZXNGYWlsZWQiLCJlcnJvciIsInN0YXR1cyIsImdldFNlcnZpY2VzIiwiY2x1c3RlcklkIiwiZGlzcGF0Y2giLCJnZXQiLCJ0aGVuIiwiY2F0Y2giXSwic291cmNlcyI6WyJzZXJ2aWNlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcIi4uLy4uL2F4aW9zXCI7XG5pbXBvcnQge1xuICBJU19GRVRDSElORyxcbiAgRkVUQ0hfU0VSVklDRVNfU1VDQ0VTUyxcbiAgRkVUQ0hfU0VSVklDRVNfRkFJTEVELFxufSBmcm9tIFwiLi9hY3Rpb25UeXBlc1wiO1xuXG5leHBvcnQgY29uc3Qgc3RhcnRUaGVGZXRjaCA9ICgpID0+ICh7XG4gIHR5cGU6IElTX0ZFVENISU5HLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRTZXJ2aWNlc1N1Y2Nlc3MgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IEZFVENIX1NFUlZJQ0VTX1NVQ0NFU1MsXG4gIHBheWxvYWQ6IHJlc3BvbnNlLmRhdGEuZGF0YS5zZXJ2aWNlcyxcbn0pO1xuXG5leHBvcnQgY29uc3QgZ2V0U2VydmljZXNGYWlsZWQgPSAoZXJyb3IpID0+ICh7XG4gIHR5cGU6IEZFVENIX1NFUlZJQ0VTX0ZBSUxFRCxcbiAgcGF5bG9hZDoge1xuICAgIHN0YXR1czogZmFsc2UsXG4gICAgZXJyb3I6IGVycm9yLnN0YXR1cyxcbiAgfSxcbn0pO1xuXG5jb25zdCBnZXRTZXJ2aWNlcyA9IChjbHVzdGVySWQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaChzdGFydFRoZUZldGNoKCkpO1xuICByZXR1cm4gYXhpb3NcbiAgICAuZ2V0KGAvY2x1c3RlcnMvJHtjbHVzdGVySWR9L3NlcnZpY2VzYClcbiAgICAudGhlbigocmVzcG9uc2UpID0+IGRpc3BhdGNoKGdldFNlcnZpY2VzU3VjY2VzcyhyZXNwb25zZSkpKVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGRpc3BhdGNoKGdldFNlcnZpY2VzRmFpbGVkKGVycm9yKSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRTZXJ2aWNlcztcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLE9BQU9FLEtBQUssTUFBTSxhQUFhO0FBQy9CLFNBQ0VDLFdBQVcsRUFDWEMsc0JBQXNCLEVBQ3RCQyxxQkFBcUIsUUFDaEIsZUFBZTtBQUFDTCxjQUFBLEdBQUFNLENBQUE7QUFFdkIsT0FBTyxNQUFNQyxhQUFhLEdBQUdBLENBQUEsS0FBTztFQUFBUCxjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUE7SUFDbENHLElBQUksRUFBRU47RUFDUixDQUFDO0FBQUQsQ0FBRTtBQUFDSCxjQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1JLGtCQUFrQixHQUFJQyxRQUFRLElBQU07RUFBQVgsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQy9DRyxJQUFJLEVBQUVMLHNCQUFzQjtJQUM1QlEsT0FBTyxFQUFFRCxRQUFRLENBQUNFLElBQUksQ0FBQ0EsSUFBSSxDQUFDQztFQUM5QixDQUFDO0FBQUQsQ0FBRTtBQUFDZCxjQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1TLGlCQUFpQixHQUFJQyxLQUFLLElBQU07RUFBQWhCLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQTtJQUMzQ0csSUFBSSxFQUFFSixxQkFBcUI7SUFDM0JPLE9BQU8sRUFBRTtNQUNQSyxNQUFNLEVBQUUsS0FBSztNQUNiRCxLQUFLLEVBQUVBLEtBQUssQ0FBQ0M7SUFDZjtFQUNGLENBQUM7QUFBRCxDQUFFO0FBQUNqQixjQUFBLEdBQUFNLENBQUE7QUFFSCxNQUFNWSxXQUFXLEdBQUlDLFNBQVMsSUFBSztFQUFBbkIsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBLE9BQUNjLFFBQVEsSUFBSztJQUFBcEIsY0FBQSxHQUFBUSxDQUFBO0lBQUFSLGNBQUEsR0FBQU0sQ0FBQTtJQUMvQ2MsUUFBUSxDQUFDYixhQUFhLEVBQUUsQ0FBQztJQUFDUCxjQUFBLEdBQUFNLENBQUE7SUFDMUIsT0FBT0osS0FBSyxDQUNUbUIsR0FBRyxDQUFFLGFBQVlGLFNBQVUsV0FBVSxDQUFDLENBQ3RDRyxJQUFJLENBQUVYLFFBQVEsSUFBSztNQUFBWCxjQUFBLEdBQUFRLENBQUE7TUFBQVIsY0FBQSxHQUFBTSxDQUFBO01BQUEsT0FBQWMsUUFBUSxDQUFDVixrQkFBa0IsQ0FBQ0MsUUFBUSxDQUFDLENBQUM7SUFBRCxDQUFDLENBQUMsQ0FDMURZLEtBQUssQ0FBRVAsS0FBSyxJQUFLO01BQUFoQixjQUFBLEdBQUFRLENBQUE7TUFBQVIsY0FBQSxHQUFBTSxDQUFBO01BQ2hCYyxRQUFRLENBQUNMLGlCQUFpQixDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUM7RUFDTixDQUFDO0FBQUQsQ0FBQztBQUVELGVBQWVFLFdBQVcifQ==