function cov_2mx9esi7bn() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/clusters.js";
  var hash = "49ee18c9bdd1623c819a3d3dd37bef2d67df4286";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/clusters.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 37
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 44
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
          column: 31
        },
        end: {
          line: 23,
          column: 2
        }
      },
      "5": {
        start: {
          line: 17,
          column: 43
        },
        end: {
          line: 23,
          column: 1
        }
      },
      "6": {
        start: {
          line: 25,
          column: 24
        },
        end: {
          line: 35,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 30
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
          column: 36
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
          column: 62
        }
      },
      "11": {
        start: {
          line: 33,
          column: 6
        },
        end: {
          line: 33,
          column: 39
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 8,
            column: 37
          },
          end: {
            line: 8,
            column: 38
          }
        },
        loc: {
          start: {
            line: 8,
            column: 44
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
            column: 31
          },
          end: {
            line: 17,
            column: 32
          }
        },
        loc: {
          start: {
            line: 17,
            column: 43
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
            column: 24
          },
          end: {
            line: 25,
            column: 25
          }
        },
        loc: {
          start: {
            line: 25,
            column: 30
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
            column: 30
          },
          end: {
            line: 25,
            column: 31
          }
        },
        loc: {
          start: {
            line: 25,
            column: 44
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
            column: 62
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
    hash: "49ee18c9bdd1623c819a3d3dd37bef2d67df4286"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2mx9esi7bn = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2mx9esi7bn();
import axios from "../../axios";
import { GET_CLUSTERS, GET_CLUSTERS_FAIL, START_GETTING_CLUSTERS } from "./actionTypes";
cov_2mx9esi7bn().s[0]++;
export const startFetchingClusters = () => {
  cov_2mx9esi7bn().f[0]++;
  cov_2mx9esi7bn().s[1]++;
  return {
    type: START_GETTING_CLUSTERS
  };
};
cov_2mx9esi7bn().s[2]++;
export const getClustersSuccess = response => {
  cov_2mx9esi7bn().f[1]++;
  cov_2mx9esi7bn().s[3]++;
  return {
    type: GET_CLUSTERS,
    payload: response.data.data
  };
};
cov_2mx9esi7bn().s[4]++;
export const getClustersFail = error => {
  cov_2mx9esi7bn().f[2]++;
  cov_2mx9esi7bn().s[5]++;
  return {
    type: GET_CLUSTERS_FAIL,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_2mx9esi7bn().s[6]++;
const getClustersList = () => {
  cov_2mx9esi7bn().f[3]++;
  cov_2mx9esi7bn().s[7]++;
  return dispatch => {
    cov_2mx9esi7bn().f[4]++;
    cov_2mx9esi7bn().s[8]++;
    dispatch(startFetchingClusters());
    cov_2mx9esi7bn().s[9]++;
    return axios.get("/clusters").then(response => {
      cov_2mx9esi7bn().f[5]++;
      cov_2mx9esi7bn().s[10]++;
      return dispatch(getClustersSuccess(response));
    }).catch(error => {
      cov_2mx9esi7bn().f[6]++;
      cov_2mx9esi7bn().s[11]++;
      dispatch(getClustersFail(error));
    });
  };
};
export default getClustersList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMm14OWVzaTdibiIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJHRVRfQ0xVU1RFUlMiLCJHRVRfQ0xVU1RFUlNfRkFJTCIsIlNUQVJUX0dFVFRJTkdfQ0xVU1RFUlMiLCJzIiwic3RhcnRGZXRjaGluZ0NsdXN0ZXJzIiwiZiIsInR5cGUiLCJnZXRDbHVzdGVyc1N1Y2Nlc3MiLCJyZXNwb25zZSIsInBheWxvYWQiLCJkYXRhIiwiZ2V0Q2x1c3RlcnNGYWlsIiwiZXJyb3IiLCJzdGF0dXMiLCJnZXRDbHVzdGVyc0xpc3QiLCJkaXNwYXRjaCIsImdldCIsInRoZW4iLCJjYXRjaCJdLCJzb3VyY2VzIjpbImNsdXN0ZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiLi4vLi4vYXhpb3NcIjtcbmltcG9ydCB7XG4gIEdFVF9DTFVTVEVSUyxcbiAgR0VUX0NMVVNURVJTX0ZBSUwsXG4gIFNUQVJUX0dFVFRJTkdfQ0xVU1RFUlMsXG59IGZyb20gXCIuL2FjdGlvblR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBzdGFydEZldGNoaW5nQ2x1c3RlcnMgPSAoKSA9PiAoe1xuICB0eXBlOiBTVEFSVF9HRVRUSU5HX0NMVVNURVJTLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRDbHVzdGVyc1N1Y2Nlc3MgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IEdFVF9DTFVTVEVSUyxcbiAgcGF5bG9hZDogcmVzcG9uc2UuZGF0YS5kYXRhLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRDbHVzdGVyc0ZhaWwgPSAoZXJyb3IpID0+ICh7XG4gIHR5cGU6IEdFVF9DTFVTVEVSU19GQUlMLFxuICBwYXlsb2FkOiB7XG4gICAgc3RhdHVzOiBmYWxzZSxcbiAgICBlcnJvcjogZXJyb3Iuc3RhdHVzLFxuICB9LFxufSk7XG5cbmNvbnN0IGdldENsdXN0ZXJzTGlzdCA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaChzdGFydEZldGNoaW5nQ2x1c3RlcnMoKSk7XG5cbiAgcmV0dXJuIGF4aW9zXG4gICAgLmdldChcIi9jbHVzdGVyc1wiKVxuXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiBkaXNwYXRjaChnZXRDbHVzdGVyc1N1Y2Nlc3MocmVzcG9uc2UpKSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBkaXNwYXRjaChnZXRDbHVzdGVyc0ZhaWwoZXJyb3IpKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldENsdXN0ZXJzTGlzdDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLE9BQU9FLEtBQUssTUFBTSxhQUFhO0FBQy9CLFNBQ0VDLFlBQVksRUFDWkMsaUJBQWlCLEVBQ2pCQyxzQkFBc0IsUUFDakIsZUFBZTtBQUFDTCxjQUFBLEdBQUFNLENBQUE7QUFFdkIsT0FBTyxNQUFNQyxxQkFBcUIsR0FBR0EsQ0FBQSxLQUFPO0VBQUFQLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQTtJQUMxQ0csSUFBSSxFQUFFSjtFQUNSLENBQUM7QUFBRCxDQUFFO0FBQUNMLGNBQUEsR0FBQU0sQ0FBQTtBQUVILE9BQU8sTUFBTUksa0JBQWtCLEdBQUlDLFFBQVEsSUFBTTtFQUFBWCxjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUE7SUFDL0NHLElBQUksRUFBRU4sWUFBWTtJQUNsQlMsT0FBTyxFQUFFRCxRQUFRLENBQUNFLElBQUksQ0FBQ0E7RUFDekIsQ0FBQztBQUFELENBQUU7QUFBQ2IsY0FBQSxHQUFBTSxDQUFBO0FBRUgsT0FBTyxNQUFNUSxlQUFlLEdBQUlDLEtBQUssSUFBTTtFQUFBZixjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUE7SUFDekNHLElBQUksRUFBRUwsaUJBQWlCO0lBQ3ZCUSxPQUFPLEVBQUU7TUFDUEksTUFBTSxFQUFFLEtBQUs7TUFDYkQsS0FBSyxFQUFFQSxLQUFLLENBQUNDO0lBQ2Y7RUFDRixDQUFDO0FBQUQsQ0FBRTtBQUFDaEIsY0FBQSxHQUFBTSxDQUFBO0FBRUgsTUFBTVcsZUFBZSxHQUFHQSxDQUFBLEtBQU07RUFBQWpCLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQSxPQUFDWSxRQUFRLElBQUs7SUFBQWxCLGNBQUEsR0FBQVEsQ0FBQTtJQUFBUixjQUFBLEdBQUFNLENBQUE7SUFDMUNZLFFBQVEsQ0FBQ1gscUJBQXFCLEVBQUUsQ0FBQztJQUFDUCxjQUFBLEdBQUFNLENBQUE7SUFFbEMsT0FBT0osS0FBSyxDQUNUaUIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUVoQkMsSUFBSSxDQUFFVCxRQUFRLElBQUs7TUFBQVgsY0FBQSxHQUFBUSxDQUFBO01BQUFSLGNBQUEsR0FBQU0sQ0FBQTtNQUFBLE9BQUFZLFFBQVEsQ0FBQ1Isa0JBQWtCLENBQUNDLFFBQVEsQ0FBQyxDQUFDO0lBQUQsQ0FBQyxDQUFDLENBQzFEVSxLQUFLLENBQUVOLEtBQUssSUFBSztNQUFBZixjQUFBLEdBQUFRLENBQUE7TUFBQVIsY0FBQSxHQUFBTSxDQUFBO01BQ2hCWSxRQUFRLENBQUNKLGVBQWUsQ0FBQ0MsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0VBQ04sQ0FBQztBQUFELENBQUM7QUFFRCxlQUFlRSxlQUFlIn0=