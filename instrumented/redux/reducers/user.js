function cov_2mlt7309ye() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/user.js";
  var hash = "3d9820a24fe705b465736d46db3f3fa90e88de8a";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/user.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 13
        },
        end: {
          line: 27,
          column: 1
        }
      },
      "1": {
        start: {
          line: 4,
          column: 2
        },
        end: {
          line: 26,
          column: 3
        }
      },
      "2": {
        start: {
          line: 6,
          column: 6
        },
        end: {
          line: 16,
          column: 8
        }
      },
      "3": {
        start: {
          line: 19,
          column: 6
        },
        end: {
          line: 22,
          column: 8
        }
      },
      "4": {
        start: {
          line: 25,
          column: 6
        },
        end: {
          line: 25,
          column: 18
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 3,
            column: 13
          },
          end: {
            line: 3,
            column: 14
          }
        },
        loc: {
          start: {
            line: 3,
            column: 63
          },
          end: {
            line: 27,
            column: 1
          }
        },
        line: 3
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 3,
            column: 14
          },
          end: {
            line: 3,
            column: 50
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 3,
            column: 21
          },
          end: {
            line: 3,
            column: 50
          }
        }],
        line: 3
      },
      "1": {
        loc: {
          start: {
            line: 4,
            column: 2
          },
          end: {
            line: 26,
            column: 3
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 5,
            column: 4
          },
          end: {
            line: 16,
            column: 8
          }
        }, {
          start: {
            line: 18,
            column: 4
          },
          end: {
            line: 22,
            column: 8
          }
        }, {
          start: {
            line: 24,
            column: 4
          },
          end: {
            line: 25,
            column: 18
          }
        }],
        line: 4
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0],
      "1": [0, 0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "3d9820a24fe705b465736d46db3f3fa90e88de8a"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2mlt7309ye = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2mlt7309ye();
import { SAVE_USER, REMOVE_USER } from "../actions/actionTypes";
cov_2mlt7309ye().s[0]++;
const user = (user = (cov_2mlt7309ye().b[0][0]++, {
  accessToken: "",
  data: {}
}), action) => {
  cov_2mlt7309ye().f[0]++;
  cov_2mlt7309ye().s[1]++;
  switch (action.type) {
    case SAVE_USER:
      cov_2mlt7309ye().b[1][0]++;
      cov_2mlt7309ye().s[2]++;
      return {
        accessToken: action.payload.access_token,
        data: {
          name: action.payload.name,
          username: action.payload.username,
          email: action.payload.email,
          verified: action.payload.verified,
          id: action.payload.id,
          beta: action.payload.is_beta_user
        }
      };
    case REMOVE_USER:
      cov_2mlt7309ye().b[1][1]++;
      cov_2mlt7309ye().s[3]++;
      return {
        accessToken: false,
        data: {}
      };
    default:
      cov_2mlt7309ye().b[1][2]++;
      cov_2mlt7309ye().s[4]++;
      return user;
  }
};
export default user;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMm1sdDczMDl5ZSIsImFjdHVhbENvdmVyYWdlIiwiU0FWRV9VU0VSIiwiUkVNT1ZFX1VTRVIiLCJzIiwidXNlciIsImIiLCJhY2Nlc3NUb2tlbiIsImRhdGEiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiLCJhY2Nlc3NfdG9rZW4iLCJuYW1lIiwidXNlcm5hbWUiLCJlbWFpbCIsInZlcmlmaWVkIiwiaWQiLCJiZXRhIiwiaXNfYmV0YV91c2VyIl0sInNvdXJjZXMiOlsidXNlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTQVZFX1VTRVIsIFJFTU9WRV9VU0VSIH0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgdXNlciA9ICh1c2VyID0geyBhY2Nlc3NUb2tlbjogXCJcIiwgZGF0YToge30gfSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFNBVkVfVVNFUjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuOiBhY3Rpb24ucGF5bG9hZC5hY2Nlc3NfdG9rZW4sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBuYW1lOiBhY3Rpb24ucGF5bG9hZC5uYW1lLFxuICAgICAgICAgIHVzZXJuYW1lOiBhY3Rpb24ucGF5bG9hZC51c2VybmFtZSxcbiAgICAgICAgICBlbWFpbDogYWN0aW9uLnBheWxvYWQuZW1haWwsXG4gICAgICAgICAgdmVyaWZpZWQ6IGFjdGlvbi5wYXlsb2FkLnZlcmlmaWVkLFxuICAgICAgICAgIGlkOiBhY3Rpb24ucGF5bG9hZC5pZCxcbiAgICAgICAgICBiZXRhOiBhY3Rpb24ucGF5bG9hZC5pc19iZXRhX3VzZXJcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICBjYXNlIFJFTU9WRV9VU0VSOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNjZXNzVG9rZW46IGZhbHNlLFxuICAgICAgICBkYXRhOiB7fSxcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVzZXI7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLFNBQVNFLFNBQVMsRUFBRUMsV0FBVyxRQUFRLHdCQUF3QjtBQUFDSCxjQUFBLEdBQUFJLENBQUE7QUFFaEUsTUFBTUMsSUFBSSxHQUFHQSxDQUFDQSxJQUFJLElBQUFMLGNBQUEsR0FBQU0sQ0FBQSxVQUFHO0VBQUVDLFdBQVcsRUFBRSxFQUFFO0VBQUVDLElBQUksRUFBRSxDQUFDO0FBQUUsQ0FBQyxHQUFFQyxNQUFNLEtBQUs7RUFBQVQsY0FBQSxHQUFBVSxDQUFBO0VBQUFWLGNBQUEsR0FBQUksQ0FBQTtFQUM3RCxRQUFRSyxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS1QsU0FBUztNQUFBRixjQUFBLEdBQUFNLENBQUE7TUFBQU4sY0FBQSxHQUFBSSxDQUFBO01BQ1osT0FBTztRQUNMRyxXQUFXLEVBQUVFLE1BQU0sQ0FBQ0csT0FBTyxDQUFDQyxZQUFZO1FBQ3hDTCxJQUFJLEVBQUU7VUFDSk0sSUFBSSxFQUFFTCxNQUFNLENBQUNHLE9BQU8sQ0FBQ0UsSUFBSTtVQUN6QkMsUUFBUSxFQUFFTixNQUFNLENBQUNHLE9BQU8sQ0FBQ0csUUFBUTtVQUNqQ0MsS0FBSyxFQUFFUCxNQUFNLENBQUNHLE9BQU8sQ0FBQ0ksS0FBSztVQUMzQkMsUUFBUSxFQUFFUixNQUFNLENBQUNHLE9BQU8sQ0FBQ0ssUUFBUTtVQUNqQ0MsRUFBRSxFQUFFVCxNQUFNLENBQUNHLE9BQU8sQ0FBQ00sRUFBRTtVQUNyQkMsSUFBSSxFQUFFVixNQUFNLENBQUNHLE9BQU8sQ0FBQ1E7UUFDdkI7TUFDRixDQUFDO0lBRUgsS0FBS2pCLFdBQVc7TUFBQUgsY0FBQSxHQUFBTSxDQUFBO01BQUFOLGNBQUEsR0FBQUksQ0FBQTtNQUNkLE9BQU87UUFDTEcsV0FBVyxFQUFFLEtBQUs7UUFDbEJDLElBQUksRUFBRSxDQUFDO01BQ1QsQ0FBQztJQUVIO01BQUFSLGNBQUEsR0FBQU0sQ0FBQTtNQUFBTixjQUFBLEdBQUFJLENBQUE7TUFDRSxPQUFPQyxJQUFJO0VBQUM7QUFFbEIsQ0FBQztBQUVELGVBQWVBLElBQUkifQ==