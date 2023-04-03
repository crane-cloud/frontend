function cov_6dtif8usn() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/getDatabases.js";
  var hash = "9188fc5918f645dab2bf9b49aa3c51fdede5c6ab";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/getDatabases.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 31
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 38
        },
        end: {
          line: 10,
          column: 1
        }
      },
      "2": {
        start: {
          line: 12,
          column: 28
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 43
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "4": {
        start: {
          line: 17,
          column: 27
        },
        end: {
          line: 23,
          column: 2
        }
      },
      "5": {
        start: {
          line: 17,
          column: 39
        },
        end: {
          line: 23,
          column: 1
        }
      },
      "6": {
        start: {
          line: 25,
          column: 21
        },
        end: {
          line: 36,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 27
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
          column: 37
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
          column: 46
        }
      },
      "11": {
        start: {
          line: 34,
          column: 6
        },
        end: {
          line: 34,
          column: 42
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 8,
            column: 31
          },
          end: {
            line: 8,
            column: 32
          }
        },
        loc: {
          start: {
            line: 8,
            column: 38
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
            column: 28
          },
          end: {
            line: 12,
            column: 29
          }
        },
        loc: {
          start: {
            line: 12,
            column: 43
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
            column: 27
          },
          end: {
            line: 17,
            column: 28
          }
        },
        loc: {
          start: {
            line: 17,
            column: 39
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
            column: 21
          },
          end: {
            line: 25,
            column: 22
          }
        },
        loc: {
          start: {
            line: 25,
            column: 27
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
            column: 27
          },
          end: {
            line: 25,
            column: 28
          }
        },
        loc: {
          start: {
            line: 25,
            column: 41
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
    hash: "9188fc5918f645dab2bf9b49aa3c51fdede5c6ab"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_6dtif8usn = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_6dtif8usn();
import axios from "../../axios";
import { GETTING_ALL_DATABASES, ALL_DATABASES_SUCCESS, ALL_DATABASES_FAIL } from "./actionTypes";
cov_6dtif8usn().s[0]++;
const startFetchingDatabases = () => {
  cov_6dtif8usn().f[0]++;
  cov_6dtif8usn().s[1]++;
  return {
    type: GETTING_ALL_DATABASES
  };
};
cov_6dtif8usn().s[2]++;
const getDatabasesSuccess = response => {
  cov_6dtif8usn().f[1]++;
  cov_6dtif8usn().s[3]++;
  return {
    type: ALL_DATABASES_SUCCESS,
    payload: response.data.data.databases
  };
};
cov_6dtif8usn().s[4]++;
const getDatabasesFailed = error => {
  cov_6dtif8usn().f[2]++;
  cov_6dtif8usn().s[5]++;
  return {
    type: ALL_DATABASES_FAIL,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_6dtif8usn().s[6]++;
const getDatabases = () => {
  cov_6dtif8usn().f[3]++;
  cov_6dtif8usn().s[7]++;
  return dispatch => {
    cov_6dtif8usn().f[4]++;
    cov_6dtif8usn().s[8]++;
    dispatch(startFetchingDatabases());
    cov_6dtif8usn().s[9]++;
    return axios.get(`/databases/stats`).then(response => {
      cov_6dtif8usn().f[5]++;
      cov_6dtif8usn().s[10]++;
      dispatch(getDatabasesSuccess(response));
    }).catch(error => {
      cov_6dtif8usn().f[6]++;
      cov_6dtif8usn().s[11]++;
      dispatch(getDatabasesFailed(error));
    });
  };
};
export default getDatabases;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfNmR0aWY4dXNuIiwiYWN0dWFsQ292ZXJhZ2UiLCJheGlvcyIsIkdFVFRJTkdfQUxMX0RBVEFCQVNFUyIsIkFMTF9EQVRBQkFTRVNfU1VDQ0VTUyIsIkFMTF9EQVRBQkFTRVNfRkFJTCIsInMiLCJzdGFydEZldGNoaW5nRGF0YWJhc2VzIiwiZiIsInR5cGUiLCJnZXREYXRhYmFzZXNTdWNjZXNzIiwicmVzcG9uc2UiLCJwYXlsb2FkIiwiZGF0YSIsImRhdGFiYXNlcyIsImdldERhdGFiYXNlc0ZhaWxlZCIsImVycm9yIiwic3RhdHVzIiwiZ2V0RGF0YWJhc2VzIiwiZGlzcGF0Y2giLCJnZXQiLCJ0aGVuIiwiY2F0Y2giXSwic291cmNlcyI6WyJnZXREYXRhYmFzZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCIuLi8uLi9heGlvc1wiO1xuaW1wb3J0IHtcbiAgICBHRVRUSU5HX0FMTF9EQVRBQkFTRVMsXG4gICAgQUxMX0RBVEFCQVNFU19TVUNDRVNTLFxuICAgIEFMTF9EQVRBQkFTRVNfRkFJTCxcbn0gZnJvbSBcIi4vYWN0aW9uVHlwZXNcIjtcblxuY29uc3Qgc3RhcnRGZXRjaGluZ0RhdGFiYXNlcyA9ICgpID0+ICh7XG4gIHR5cGU6IEdFVFRJTkdfQUxMX0RBVEFCQVNFUyxcbn0pO1xuXG5jb25zdCBnZXREYXRhYmFzZXNTdWNjZXNzID0gKHJlc3BvbnNlKSA9PiAoe1xuICB0eXBlOiBBTExfREFUQUJBU0VTX1NVQ0NFU1MsXG4gIHBheWxvYWQ6IHJlc3BvbnNlLmRhdGEuZGF0YS5kYXRhYmFzZXMsXG59KTtcblxuY29uc3QgZ2V0RGF0YWJhc2VzRmFpbGVkID0gKGVycm9yKSA9PiAoe1xuICB0eXBlOiBBTExfREFUQUJBU0VTX0ZBSUwsXG4gIHBheWxvYWQ6IHtcbiAgICBzdGF0dXM6IGZhbHNlLFxuICAgIGVycm9yOiBlcnJvci5zdGF0dXMsXG4gIH0sXG59KTtcblxuY29uc3QgZ2V0RGF0YWJhc2VzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHN0YXJ0RmV0Y2hpbmdEYXRhYmFzZXMoKSk7XG5cbiAgcmV0dXJuIGF4aW9zXG4gICAgLmdldChgL2RhdGFiYXNlcy9zdGF0c2ApXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBkaXNwYXRjaChnZXREYXRhYmFzZXNTdWNjZXNzKHJlc3BvbnNlKSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBkaXNwYXRjaChnZXREYXRhYmFzZXNGYWlsZWQoZXJyb3IpKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldERhdGFiYXNlczsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGFBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGFBQUE7QUFmWixPQUFPRSxLQUFLLE1BQU0sYUFBYTtBQUMvQixTQUNJQyxxQkFBcUIsRUFDckJDLHFCQUFxQixFQUNyQkMsa0JBQWtCLFFBQ2YsZUFBZTtBQUFDTCxhQUFBLEdBQUFNLENBQUE7QUFFdkIsTUFBTUMsc0JBQXNCLEdBQUdBLENBQUEsS0FBTztFQUFBUCxhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUE7SUFDcENHLElBQUksRUFBRU47RUFDUixDQUFDO0FBQUQsQ0FBRTtBQUFDSCxhQUFBLEdBQUFNLENBQUE7QUFFSCxNQUFNSSxtQkFBbUIsR0FBSUMsUUFBUSxJQUFNO0VBQUFYLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQTtJQUN6Q0csSUFBSSxFQUFFTCxxQkFBcUI7SUFDM0JRLE9BQU8sRUFBRUQsUUFBUSxDQUFDRSxJQUFJLENBQUNBLElBQUksQ0FBQ0M7RUFDOUIsQ0FBQztBQUFELENBQUU7QUFBQ2QsYUFBQSxHQUFBTSxDQUFBO0FBRUgsTUFBTVMsa0JBQWtCLEdBQUlDLEtBQUssSUFBTTtFQUFBaEIsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ3JDRyxJQUFJLEVBQUVKLGtCQUFrQjtJQUN4Qk8sT0FBTyxFQUFFO01BQ1BLLE1BQU0sRUFBRSxLQUFLO01BQ2JELEtBQUssRUFBRUEsS0FBSyxDQUFDQztJQUNmO0VBQ0YsQ0FBQztBQUFELENBQUU7QUFBQ2pCLGFBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1ZLFlBQVksR0FBR0EsQ0FBQSxLQUFNO0VBQUFsQixhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUEsT0FBQ2EsUUFBUSxJQUFLO0lBQUFuQixhQUFBLEdBQUFRLENBQUE7SUFBQVIsYUFBQSxHQUFBTSxDQUFBO0lBQ3ZDYSxRQUFRLENBQUNaLHNCQUFzQixFQUFFLENBQUM7SUFBQ1AsYUFBQSxHQUFBTSxDQUFBO0lBRW5DLE9BQU9KLEtBQUssQ0FDVGtCLEdBQUcsQ0FBRSxrQkFBaUIsQ0FBQyxDQUN2QkMsSUFBSSxDQUFFVixRQUFRLElBQUs7TUFBQVgsYUFBQSxHQUFBUSxDQUFBO01BQUFSLGFBQUEsR0FBQU0sQ0FBQTtNQUNsQmEsUUFBUSxDQUFDVCxtQkFBbUIsQ0FBQ0MsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQ0RXLEtBQUssQ0FBRU4sS0FBSyxJQUFLO01BQUFoQixhQUFBLEdBQUFRLENBQUE7TUFBQVIsYUFBQSxHQUFBTSxDQUFBO01BQ2hCYSxRQUFRLENBQUNKLGtCQUFrQixDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7RUFDTixDQUFDO0FBQUQsQ0FBQztBQUVELGVBQWVFLFlBQVkifQ==