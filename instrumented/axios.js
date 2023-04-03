function cov_12zl524xrh() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/axios.js";
  var hash = "4ba0e69af2be53c2e422da5c94744e69b996097f";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/axios.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 17
        },
        end: {
          line: 6,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 0
        },
        end: {
          line: 10,
          column: 4
        }
      },
      "2": {
        start: {
          line: 12,
          column: 0
        },
        end: {
          line: 26,
          column: 2
        }
      },
      "3": {
        start: {
          line: 13,
          column: 16
        },
        end: {
          line: 13,
          column: 24
        }
      },
      "4": {
        start: {
          line: 15,
          column: 12
        },
        end: {
          line: 15,
          column: 17
        }
      },
      "5": {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 23,
          column: 5
        }
      },
      "6": {
        start: {
          line: 18,
          column: 6
        },
        end: {
          line: 18,
          column: 27
        }
      },
      "7": {
        start: {
          line: 19,
          column: 6
        },
        end: {
          line: 19,
          column: 33
        }
      },
      "8": {
        start: {
          line: 20,
          column: 11
        },
        end: {
          line: 23,
          column: 5
        }
      },
      "9": {
        start: {
          line: 21,
          column: 6
        },
        end: {
          line: 21,
          column: 56
        }
      },
      "10": {
        start: {
          line: 22,
          column: 6
        },
        end: {
          line: 22,
          column: 41
        }
      },
      "11": {
        start: {
          line: 24,
          column: 4
        },
        end: {
          line: 24,
          column: 29
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 13,
            column: 2
          },
          end: {
            line: 13,
            column: 3
          }
        },
        loc: {
          start: {
            line: 13,
            column: 16
          },
          end: {
            line: 13,
            column: 24
          }
        },
        line: 13
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 14,
            column: 3
          }
        },
        loc: {
          start: {
            line: 14,
            column: 13
          },
          end: {
            line: 25,
            column: 3
          }
        },
        line: 14
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 17,
            column: 4
          },
          end: {
            line: 23,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 17,
            column: 4
          },
          end: {
            line: 23,
            column: 5
          }
        }, {
          start: {
            line: 17,
            column: 4
          },
          end: {
            line: 23,
            column: 5
          }
        }],
        line: 17
      },
      "1": {
        loc: {
          start: {
            line: 17,
            column: 8
          },
          end: {
            line: 17,
            column: 70
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 17,
            column: 8
          },
          end: {
            line: 17,
            column: 37
          }
        }, {
          start: {
            line: 17,
            column: 41
          },
          end: {
            line: 17,
            column: 70
          }
        }],
        line: 17
      },
      "2": {
        loc: {
          start: {
            line: 20,
            column: 11
          },
          end: {
            line: 23,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 20,
            column: 11
          },
          end: {
            line: 23,
            column: 5
          }
        }, {
          start: {
            line: 20,
            column: 11
          },
          end: {
            line: 23,
            column: 5
          }
        }],
        line: 20
      }
    },
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
      "1": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "4ba0e69af2be53c2e422da5c94744e69b996097f"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_12zl524xrh = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_12zl524xrh();
import axios from "axios";
import { API_BASE_URL } from "./config";
const instance = (cov_12zl524xrh().s[0]++, axios.create({
  baseURL: API_BASE_URL
}));
cov_12zl524xrh().s[1]++;
instance.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
cov_12zl524xrh().s[2]++;
instance.interceptors.response.use(response => {
  cov_12zl524xrh().f[0]++;
  cov_12zl524xrh().s[3]++;
  return response;
}, error => {
  cov_12zl524xrh().f[1]++;
  let e = (cov_12zl524xrh().s[4]++, error);
  // this checks for when a token is not verified and logs you out
  cov_12zl524xrh().s[5]++;
  if ((cov_12zl524xrh().b[1][0]++, error.response.status === 401) || (cov_12zl524xrh().b[1][1]++, error.response.status === 422)) {
    cov_12zl524xrh().b[0][0]++;
    cov_12zl524xrh().s[6]++;
    localStorage.clear();
    cov_12zl524xrh().s[7]++;
    window.location.href = "/";
  } else {
    cov_12zl524xrh().b[0][1]++;
    cov_12zl524xrh().s[8]++;
    if (error.response.status === 502) {
      cov_12zl524xrh().b[2][0]++;
      cov_12zl524xrh().s[9]++;
      e = "Your request too long possible Server Error.";
      cov_12zl524xrh().s[10]++;
      window.location.href = "/projects";
    } else {
      cov_12zl524xrh().b[2][1]++;
    }
  }
  cov_12zl524xrh().s[11]++;
  return Promise.reject(e);
});
export default instance;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTJ6bDUyNHhyaCIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJBUElfQkFTRV9VUkwiLCJpbnN0YW5jZSIsInMiLCJjcmVhdGUiLCJiYXNlVVJMIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJpbnRlcmNlcHRvcnMiLCJyZXNwb25zZSIsInVzZSIsImVycm9yIiwiZiIsImUiLCJiIiwic3RhdHVzIiwiY2xlYXIiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJQcm9taXNlIiwicmVqZWN0Il0sInNvdXJjZXMiOlsiYXhpb3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IHsgQVBJX0JBU0VfVVJMIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5cbmNvbnN0IGluc3RhbmNlID0gYXhpb3MuY3JlYXRlKHtcbiAgYmFzZVVSTDogQVBJX0JBU0VfVVJMLFxufSk7XG5cbmluc3RhbmNlLmRlZmF1bHRzLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcbiAgXCJ0b2tlblwiXG4pfWA7XG5cbmluc3RhbmNlLmludGVyY2VwdG9ycy5yZXNwb25zZS51c2UoXG4gIChyZXNwb25zZSkgPT4gcmVzcG9uc2UsXG4gIChlcnJvcikgPT4ge1xuICAgIGxldCBlID0gZXJyb3I7XG4gICAgLy8gdGhpcyBjaGVja3MgZm9yIHdoZW4gYSB0b2tlbiBpcyBub3QgdmVyaWZpZWQgYW5kIGxvZ3MgeW91IG91dFxuICAgIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSB8fCBlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQyMikge1xuICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgIH0gZWxzZSBpZihlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDUwMil7XG4gICAgICBlID0gXCJZb3VyIHJlcXVlc3QgdG9vIGxvbmcgcG9zc2libGUgU2VydmVyIEVycm9yLlwiXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3Byb2plY3RzXCI7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixPQUFPRSxLQUFLLE1BQU0sT0FBTztBQUN6QixTQUFTQyxZQUFZLFFBQVEsVUFBVTtBQUV2QyxNQUFNQyxRQUFRLElBQUFKLGNBQUEsR0FBQUssQ0FBQSxPQUFHSCxLQUFLLENBQUNJLE1BQU0sQ0FBQztFQUM1QkMsT0FBTyxFQUFFSjtBQUNYLENBQUMsQ0FBQztBQUFDSCxjQUFBLEdBQUFLLENBQUE7QUFFSEQsUUFBUSxDQUFDSSxRQUFRLENBQUNDLE9BQU8sQ0FBQ0MsYUFBYSxHQUFJLFVBQVNDLFlBQVksQ0FBQ0MsT0FBTyxDQUN0RSxPQUFPLENBQ1AsRUFBQztBQUFDWixjQUFBLEdBQUFLLENBQUE7QUFFSkQsUUFBUSxDQUFDUyxZQUFZLENBQUNDLFFBQVEsQ0FBQ0MsR0FBRyxDQUMvQkQsUUFBUSxJQUFLQTtFQUFBQSx1QkFBQTtFQUFBQSx1QkFBQTtFQUFBQSxNQUFBLENBQUFBLFFBQVE7QUFBRCxDQUFDLEVBQ3JCRSxLQUFLLElBQUs7RUFBQWhCLGNBQUEsR0FBQWlCLENBQUE7RUFDVCxJQUFJQyxDQUFDLElBQUFsQixjQUFBLEdBQUFLLENBQUEsT0FBR1csS0FBSztFQUNiO0VBQUFoQixjQUFBLEdBQUFLLENBQUE7RUFDQSxJQUFJLENBQUFMLGNBQUEsR0FBQW1CLENBQUEsVUFBQUgsS0FBSyxDQUFDRixRQUFRLENBQUNNLE1BQU0sS0FBSyxHQUFHLE1BQUFwQixjQUFBLEdBQUFtQixDQUFBLFVBQUlILEtBQUssQ0FBQ0YsUUFBUSxDQUFDTSxNQUFNLEtBQUssR0FBRyxHQUFFO0lBQUFwQixjQUFBLEdBQUFtQixDQUFBO0lBQUFuQixjQUFBLEdBQUFLLENBQUE7SUFDbEVNLFlBQVksQ0FBQ1UsS0FBSyxFQUFFO0lBQUNyQixjQUFBLEdBQUFLLENBQUE7SUFDckJpQixNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxHQUFHLEdBQUc7RUFDNUIsQ0FBQyxNQUFNO0lBQUF4QixjQUFBLEdBQUFtQixDQUFBO0lBQUFuQixjQUFBLEdBQUFLLENBQUE7SUFBQSxJQUFHVyxLQUFLLENBQUNGLFFBQVEsQ0FBQ00sTUFBTSxLQUFLLEdBQUcsRUFBQztNQUFBcEIsY0FBQSxHQUFBbUIsQ0FBQTtNQUFBbkIsY0FBQSxHQUFBSyxDQUFBO01BQ3RDYSxDQUFDLEdBQUcsOENBQThDO01BQUFsQixjQUFBLEdBQUFLLENBQUE7TUFDbERpQixNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxHQUFHLFdBQVc7SUFDcEMsQ0FBQztNQUFBeEIsY0FBQSxHQUFBbUIsQ0FBQTtJQUFBO0VBQUQ7RUFBQ25CLGNBQUEsR0FBQUssQ0FBQTtFQUNELE9BQU9vQixPQUFPLENBQUNDLE1BQU0sQ0FBQ1IsQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FDRjtBQUVELGVBQWVkLFFBQVEifQ==