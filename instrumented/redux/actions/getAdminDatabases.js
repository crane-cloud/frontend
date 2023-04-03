function cov_1cxz3haned() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/getAdminDatabases.js";
  var hash = "75dcd28a52c2c2d749d6bfe2eeca76871b4a3adc";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/getAdminDatabases.js",
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
          column: 33
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 48
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "4": {
        start: {
          line: 17,
          column: 32
        },
        end: {
          line: 23,
          column: 2
        }
      },
      "5": {
        start: {
          line: 17,
          column: 44
        },
        end: {
          line: 23,
          column: 1
        }
      },
      "6": {
        start: {
          line: 25,
          column: 26
        },
        end: {
          line: 36,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 32
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
          column: 51
        }
      },
      "11": {
        start: {
          line: 34,
          column: 6
        },
        end: {
          line: 34,
          column: 47
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
            column: 33
          },
          end: {
            line: 12,
            column: 34
          }
        },
        loc: {
          start: {
            line: 12,
            column: 48
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
            column: 32
          },
          end: {
            line: 17,
            column: 33
          }
        },
        loc: {
          start: {
            line: 17,
            column: 44
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
            column: 26
          },
          end: {
            line: 25,
            column: 27
          }
        },
        loc: {
          start: {
            line: 25,
            column: 32
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
            column: 32
          },
          end: {
            line: 25,
            column: 33
          }
        },
        loc: {
          start: {
            line: 25,
            column: 46
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
    hash: "75dcd28a52c2c2d749d6bfe2eeca76871b4a3adc"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1cxz3haned = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1cxz3haned();
import axios from "../../axios";
import { ADMIN_GETTING_ALL_DATABASES, ADMIN_ALL_DATABASES_SUCCESS, ADMIN_ALL_DATABASES_FAIL } from "./actionTypes";
cov_1cxz3haned().s[0]++;
const startFetchingDatabases = () => {
  cov_1cxz3haned().f[0]++;
  cov_1cxz3haned().s[1]++;
  return {
    type: ADMIN_GETTING_ALL_DATABASES
  };
};
cov_1cxz3haned().s[2]++;
const adminGetDatabasesSuccess = response => {
  cov_1cxz3haned().f[1]++;
  cov_1cxz3haned().s[3]++;
  return {
    type: ADMIN_ALL_DATABASES_SUCCESS,
    payload: response.data.data.databases
  };
};
cov_1cxz3haned().s[4]++;
const adminGetDatabasesFailed = error => {
  cov_1cxz3haned().f[2]++;
  cov_1cxz3haned().s[5]++;
  return {
    type: ADMIN_ALL_DATABASES_FAIL,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_1cxz3haned().s[6]++;
const adminGetDatabases = () => {
  cov_1cxz3haned().f[3]++;
  cov_1cxz3haned().s[7]++;
  return dispatch => {
    cov_1cxz3haned().f[4]++;
    cov_1cxz3haned().s[8]++;
    dispatch(startFetchingDatabases());
    cov_1cxz3haned().s[9]++;
    return axios.get(`/databases`).then(response => {
      cov_1cxz3haned().f[5]++;
      cov_1cxz3haned().s[10]++;
      dispatch(adminGetDatabasesSuccess(response));
    }).catch(error => {
      cov_1cxz3haned().f[6]++;
      cov_1cxz3haned().s[11]++;
      dispatch(adminGetDatabasesFailed(error));
    });
  };
};
export default adminGetDatabases;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMWN4ejNoYW5lZCIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJBRE1JTl9HRVRUSU5HX0FMTF9EQVRBQkFTRVMiLCJBRE1JTl9BTExfREFUQUJBU0VTX1NVQ0NFU1MiLCJBRE1JTl9BTExfREFUQUJBU0VTX0ZBSUwiLCJzIiwic3RhcnRGZXRjaGluZ0RhdGFiYXNlcyIsImYiLCJ0eXBlIiwiYWRtaW5HZXREYXRhYmFzZXNTdWNjZXNzIiwicmVzcG9uc2UiLCJwYXlsb2FkIiwiZGF0YSIsImRhdGFiYXNlcyIsImFkbWluR2V0RGF0YWJhc2VzRmFpbGVkIiwiZXJyb3IiLCJzdGF0dXMiLCJhZG1pbkdldERhdGFiYXNlcyIsImRpc3BhdGNoIiwiZ2V0IiwidGhlbiIsImNhdGNoIl0sInNvdXJjZXMiOlsiZ2V0QWRtaW5EYXRhYmFzZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCIuLi8uLi9heGlvc1wiO1xuaW1wb3J0IHtcbiAgICBBRE1JTl9HRVRUSU5HX0FMTF9EQVRBQkFTRVMsXG4gICAgQURNSU5fQUxMX0RBVEFCQVNFU19TVUNDRVNTLFxuICAgIEFETUlOX0FMTF9EQVRBQkFTRVNfRkFJTCxcbn0gZnJvbSBcIi4vYWN0aW9uVHlwZXNcIjtcblxuY29uc3Qgc3RhcnRGZXRjaGluZ0RhdGFiYXNlcyA9ICgpID0+ICh7XG4gIHR5cGU6IEFETUlOX0dFVFRJTkdfQUxMX0RBVEFCQVNFUyxcbn0pO1xuXG5jb25zdCBhZG1pbkdldERhdGFiYXNlc1N1Y2Nlc3MgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IEFETUlOX0FMTF9EQVRBQkFTRVNfU1VDQ0VTUyxcbiAgcGF5bG9hZDogcmVzcG9uc2UuZGF0YS5kYXRhLmRhdGFiYXNlcyxcbn0pO1xuXG5jb25zdCBhZG1pbkdldERhdGFiYXNlc0ZhaWxlZCA9IChlcnJvcikgPT4gKHtcbiAgdHlwZTogQURNSU5fQUxMX0RBVEFCQVNFU19GQUlMLFxuICBwYXlsb2FkOiB7XG4gICAgc3RhdHVzOiBmYWxzZSxcbiAgICBlcnJvcjogZXJyb3Iuc3RhdHVzLFxuICB9LFxufSk7XG5cbmNvbnN0IGFkbWluR2V0RGF0YWJhc2VzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHN0YXJ0RmV0Y2hpbmdEYXRhYmFzZXMoKSk7XG5cbiAgcmV0dXJuIGF4aW9zXG4gICAgLmdldChgL2RhdGFiYXNlc2ApXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBkaXNwYXRjaChhZG1pbkdldERhdGFiYXNlc1N1Y2Nlc3MocmVzcG9uc2UpKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGRpc3BhdGNoKGFkbWluR2V0RGF0YWJhc2VzRmFpbGVkKGVycm9yKSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZG1pbkdldERhdGFiYXNlczsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixPQUFPRSxLQUFLLE1BQU0sYUFBYTtBQUMvQixTQUNJQywyQkFBMkIsRUFDM0JDLDJCQUEyQixFQUMzQkMsd0JBQXdCLFFBQ3JCLGVBQWU7QUFBQ0wsY0FBQSxHQUFBTSxDQUFBO0FBRXZCLE1BQU1DLHNCQUFzQixHQUFHQSxDQUFBLEtBQU87RUFBQVAsY0FBQSxHQUFBUSxDQUFBO0VBQUFSLGNBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ3BDRyxJQUFJLEVBQUVOO0VBQ1IsQ0FBQztBQUFELENBQUU7QUFBQ0gsY0FBQSxHQUFBTSxDQUFBO0FBRUgsTUFBTUksd0JBQXdCLEdBQUlDLFFBQVEsSUFBTTtFQUFBWCxjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUE7SUFDOUNHLElBQUksRUFBRUwsMkJBQTJCO0lBQ2pDUSxPQUFPLEVBQUVELFFBQVEsQ0FBQ0UsSUFBSSxDQUFDQSxJQUFJLENBQUNDO0VBQzlCLENBQUM7QUFBRCxDQUFFO0FBQUNkLGNBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1TLHVCQUF1QixHQUFJQyxLQUFLLElBQU07RUFBQWhCLGNBQUEsR0FBQVEsQ0FBQTtFQUFBUixjQUFBLEdBQUFNLENBQUE7RUFBQTtJQUMxQ0csSUFBSSxFQUFFSix3QkFBd0I7SUFDOUJPLE9BQU8sRUFBRTtNQUNQSyxNQUFNLEVBQUUsS0FBSztNQUNiRCxLQUFLLEVBQUVBLEtBQUssQ0FBQ0M7SUFDZjtFQUNGLENBQUM7QUFBRCxDQUFFO0FBQUNqQixjQUFBLEdBQUFNLENBQUE7QUFFSCxNQUFNWSxpQkFBaUIsR0FBR0EsQ0FBQSxLQUFNO0VBQUFsQixjQUFBLEdBQUFRLENBQUE7RUFBQVIsY0FBQSxHQUFBTSxDQUFBO0VBQUEsT0FBQ2EsUUFBUSxJQUFLO0lBQUFuQixjQUFBLEdBQUFRLENBQUE7SUFBQVIsY0FBQSxHQUFBTSxDQUFBO0lBQzVDYSxRQUFRLENBQUNaLHNCQUFzQixFQUFFLENBQUM7SUFBQ1AsY0FBQSxHQUFBTSxDQUFBO0lBRW5DLE9BQU9KLEtBQUssQ0FDVGtCLEdBQUcsQ0FBRSxZQUFXLENBQUMsQ0FDakJDLElBQUksQ0FBRVYsUUFBUSxJQUFLO01BQUFYLGNBQUEsR0FBQVEsQ0FBQTtNQUFBUixjQUFBLEdBQUFNLENBQUE7TUFDbEJhLFFBQVEsQ0FBQ1Qsd0JBQXdCLENBQUNDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUMsQ0FBQyxDQUNEVyxLQUFLLENBQUVOLEtBQUssSUFBSztNQUFBaEIsY0FBQSxHQUFBUSxDQUFBO01BQUFSLGNBQUEsR0FBQU0sQ0FBQTtNQUNoQmEsUUFBUSxDQUFDSix1QkFBdUIsQ0FBQ0MsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDO0VBQ04sQ0FBQztBQUFELENBQUM7QUFFRCxlQUFlRSxpQkFBaUIifQ==