function cov_1g79v3y8cy() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/namespaces.js";
  var hash = "9de96f0485fea9ab151b1ab31fdea6fad0cb9124";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/namespaces.js",
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
          column: 35
        },
        end: {
          line: 23,
          column: 2
        }
      },
      "5": {
        start: {
          line: 17,
          column: 47
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
          column: 37
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
          column: 43
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
            column: 35
          },
          end: {
            line: 17,
            column: 36
          }
        },
        loc: {
          start: {
            line: 17,
            column: 47
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
            column: 37
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
            column: 37
          },
          end: {
            line: 25,
            column: 38
          }
        },
        loc: {
          start: {
            line: 25,
            column: 51
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
    hash: "9de96f0485fea9ab151b1ab31fdea6fad0cb9124"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1g79v3y8cy = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1g79v3y8cy();
import axios from "../../axios";
import { IS_FETCHING, FETCH_NAMESPACES_SUCCESS, FETCH_NAMESPACES_FAILED } from "./actionTypes";
cov_1g79v3y8cy().s[0]++;
export const initiateFetch = () => {
  cov_1g79v3y8cy().f[0]++;
  cov_1g79v3y8cy().s[1]++;
  return {
    type: IS_FETCHING
  };
};
cov_1g79v3y8cy().s[2]++;
export const getNamespacesSuccess = response => {
  cov_1g79v3y8cy().f[1]++;
  cov_1g79v3y8cy().s[3]++;
  return {
    type: FETCH_NAMESPACES_SUCCESS,
    payload: response.data.data.namespaces
  };
};
cov_1g79v3y8cy().s[4]++;
export const getNamespacesFailed = error => {
  cov_1g79v3y8cy().f[2]++;
  cov_1g79v3y8cy().s[5]++;
  return {
    type: FETCH_NAMESPACES_FAILED,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_1g79v3y8cy().s[6]++;
const getNamespaces = clusterID => {
  cov_1g79v3y8cy().f[3]++;
  cov_1g79v3y8cy().s[7]++;
  return dispatch => {
    cov_1g79v3y8cy().f[4]++;
    cov_1g79v3y8cy().s[8]++;
    dispatch(initiateFetch());
    cov_1g79v3y8cy().s[9]++;
    return axios.get(`/clusters/${clusterID}/namespaces`).then(response => {
      cov_1g79v3y8cy().f[5]++;
      cov_1g79v3y8cy().s[10]++;
      return dispatch(getNamespacesSuccess(response));
    }).catch(error => {
      cov_1g79v3y8cy().f[6]++;
      cov_1g79v3y8cy().s[11]++;
      dispatch(getNamespacesFailed(error));
    });
  };
};
export default getNamespaces;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMWc3OXYzeThjeSIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJJU19GRVRDSElORyIsIkZFVENIX05BTUVTUEFDRVNfU1VDQ0VTUyIsIkZFVENIX05BTUVTUEFDRVNfRkFJTEVEIiwicyIsImluaXRpYXRlRmV0Y2giLCJmIiwidHlwZSIsImdldE5hbWVzcGFjZXNTdWNjZXNzIiwicmVzcG9uc2UiLCJwYXlsb2FkIiwiZGF0YSIsIm5hbWVzcGFjZXMiLCJnZXROYW1lc3BhY2VzRmFpbGVkIiwiZXJyb3IiLCJzdGF0dXMiLCJnZXROYW1lc3BhY2VzIiwiY2x1c3RlcklEIiwiZGlzcGF0Y2giLCJnZXQiLCJ0aGVuIiwiY2F0Y2giXSwic291cmNlcyI6WyJuYW1lc3BhY2VzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiLi4vLi4vYXhpb3NcIjtcbmltcG9ydCB7XG4gIElTX0ZFVENISU5HLFxuICBGRVRDSF9OQU1FU1BBQ0VTX1NVQ0NFU1MsXG4gIEZFVENIX05BTUVTUEFDRVNfRkFJTEVELFxufSBmcm9tIFwiLi9hY3Rpb25UeXBlc1wiO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhdGVGZXRjaCA9ICgpID0+ICh7XG4gIHR5cGU6IElTX0ZFVENISU5HLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXROYW1lc3BhY2VzU3VjY2VzcyA9IChyZXNwb25zZSkgPT4gKHtcbiAgdHlwZTogRkVUQ0hfTkFNRVNQQUNFU19TVUNDRVNTLFxuICBwYXlsb2FkOiByZXNwb25zZS5kYXRhLmRhdGEubmFtZXNwYWNlcyxcbn0pO1xuXG5leHBvcnQgY29uc3QgZ2V0TmFtZXNwYWNlc0ZhaWxlZCA9IChlcnJvcikgPT4gKHtcbiAgdHlwZTogRkVUQ0hfTkFNRVNQQUNFU19GQUlMRUQsXG4gIHBheWxvYWQ6IHtcbiAgICBzdGF0dXM6IGZhbHNlLFxuICAgIGVycm9yOiBlcnJvci5zdGF0dXMsXG4gIH0sXG59KTtcblxuY29uc3QgZ2V0TmFtZXNwYWNlcyA9IChjbHVzdGVySUQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaChpbml0aWF0ZUZldGNoKCkpO1xuICByZXR1cm4gYXhpb3NcbiAgICAuZ2V0KGAvY2x1c3RlcnMvJHtjbHVzdGVySUR9L25hbWVzcGFjZXNgKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gZGlzcGF0Y2goZ2V0TmFtZXNwYWNlc1N1Y2Nlc3MocmVzcG9uc2UpKSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBkaXNwYXRjaChnZXROYW1lc3BhY2VzRmFpbGVkKGVycm9yKSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXROYW1lc3BhY2VzO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosT0FBT0UsS0FBSyxNQUFNLGFBQWE7QUFDL0IsU0FDRUMsV0FBVyxFQUNYQyx3QkFBd0IsRUFDeEJDLHVCQUF1QixRQUNsQixlQUFlO0FBQUNMLGNBQUEsR0FBQU0sQ0FBQTtBQUV2QixPQUFPLE1BQU1DLGFBQWEsR0FBR0EsQ0FBQSxLQUFPO0VBQUFQLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQTtJQUNsQ0csSUFBSSxFQUFFTjtFQUNSLENBQUM7QUFBRCxDQUFFO0FBQUNILGNBQUEsR0FBQU0sQ0FBQTtBQUVILE9BQU8sTUFBTUksb0JBQW9CLEdBQUlDLFFBQVEsSUFBTTtFQUFBWCxjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUE7SUFDakRHLElBQUksRUFBRUwsd0JBQXdCO0lBQzlCUSxPQUFPLEVBQUVELFFBQVEsQ0FBQ0UsSUFBSSxDQUFDQSxJQUFJLENBQUNDO0VBQzlCLENBQUM7QUFBRCxDQUFFO0FBQUNkLGNBQUEsR0FBQU0sQ0FBQTtBQUVILE9BQU8sTUFBTVMsbUJBQW1CLEdBQUlDLEtBQUssSUFBTTtFQUFBaEIsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQzdDRyxJQUFJLEVBQUVKLHVCQUF1QjtJQUM3Qk8sT0FBTyxFQUFFO01BQ1BLLE1BQU0sRUFBRSxLQUFLO01BQ2JELEtBQUssRUFBRUEsS0FBSyxDQUFDQztJQUNmO0VBQ0YsQ0FBQztBQUFELENBQUU7QUFBQ2pCLGNBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1ZLGFBQWEsR0FBSUMsU0FBUyxJQUFLO0VBQUFuQixjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUEsT0FBQ2MsUUFBUSxJQUFLO0lBQUFwQixjQUFBLEdBQUFRLENBQUE7SUFBQVIsY0FBQSxHQUFBTSxDQUFBO0lBQ2pEYyxRQUFRLENBQUNiLGFBQWEsRUFBRSxDQUFDO0lBQUNQLGNBQUEsR0FBQU0sQ0FBQTtJQUMxQixPQUFPSixLQUFLLENBQ1RtQixHQUFHLENBQUUsYUFBWUYsU0FBVSxhQUFZLENBQUMsQ0FDeENHLElBQUksQ0FBRVgsUUFBUSxJQUFLO01BQUFYLGNBQUEsR0FBQVEsQ0FBQTtNQUFBUixjQUFBLEdBQUFNLENBQUE7TUFBQSxPQUFBYyxRQUFRLENBQUNWLG9CQUFvQixDQUFDQyxRQUFRLENBQUMsQ0FBQztJQUFELENBQUMsQ0FBQyxDQUM1RFksS0FBSyxDQUFFUCxLQUFLLElBQUs7TUFBQWhCLGNBQUEsR0FBQVEsQ0FBQTtNQUFBUixjQUFBLEdBQUFNLENBQUE7TUFDaEJjLFFBQVEsQ0FBQ0wsbUJBQW1CLENBQUNDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztFQUNOLENBQUM7QUFBRCxDQUFDO0FBRUQsZUFBZUUsYUFBYSJ9