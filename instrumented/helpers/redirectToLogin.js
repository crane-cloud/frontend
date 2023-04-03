function cov_11h98w9rm3() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/helpers/redirectToLogin.js";
  var hash = "144bde06a7092df78ec2d142064173917ee847cb";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/helpers/redirectToLogin.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 24
        },
        end: {
          line: 8,
          column: 1
        }
      },
      "1": {
        start: {
          line: 5,
          column: 2
        },
        end: {
          line: 5,
          column: 25
        }
      },
      "2": {
        start: {
          line: 6,
          column: 2
        },
        end: {
          line: 6,
          column: 23
        }
      },
      "3": {
        start: {
          line: 7,
          column: 2
        },
        end: {
          line: 7,
          column: 29
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 4,
            column: 24
          },
          end: {
            line: 4,
            column: 25
          }
        },
        loc: {
          start: {
            line: 4,
            column: 38
          },
          end: {
            line: 8,
            column: 1
          }
        },
        line: 4
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "144bde06a7092df78ec2d142064173917ee847cb"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_11h98w9rm3 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_11h98w9rm3();
// This function clears out the current user state and token
import removeUser from "../redux/actions/removeUser";
cov_11h98w9rm3().s[0]++;
const redirectToLogin = dispatch => {
  cov_11h98w9rm3().f[0]++;
  cov_11h98w9rm3().s[1]++;
  dispatch(removeUser());
  cov_11h98w9rm3().s[2]++;
  localStorage.clear();
  cov_11h98w9rm3().s[3]++;
  window.location.href = "/";
};
export default redirectToLogin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTFoOTh3OXJtMyIsImFjdHVhbENvdmVyYWdlIiwicmVtb3ZlVXNlciIsInMiLCJyZWRpcmVjdFRvTG9naW4iLCJkaXNwYXRjaCIsImYiLCJsb2NhbFN0b3JhZ2UiLCJjbGVhciIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiJdLCJzb3VyY2VzIjpbInJlZGlyZWN0VG9Mb2dpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZ1bmN0aW9uIGNsZWFycyBvdXQgdGhlIGN1cnJlbnQgdXNlciBzdGF0ZSBhbmQgdG9rZW5cbmltcG9ydCByZW1vdmVVc2VyIGZyb20gXCIuLi9yZWR1eC9hY3Rpb25zL3JlbW92ZVVzZXJcIjtcblxuY29uc3QgcmVkaXJlY3RUb0xvZ2luID0gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHJlbW92ZVVzZXIoKSk7XG4gIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVkaXJlY3RUb0xvZ2luO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWjtBQUNBLE9BQU9FLFVBQVUsTUFBTSw2QkFBNkI7QUFBQ0YsY0FBQSxHQUFBRyxDQUFBO0FBRXJELE1BQU1DLGVBQWUsR0FBSUMsUUFBUSxJQUFLO0VBQUFMLGNBQUEsR0FBQU0sQ0FBQTtFQUFBTixjQUFBLEdBQUFHLENBQUE7RUFDcENFLFFBQVEsQ0FBQ0gsVUFBVSxFQUFFLENBQUM7RUFBQ0YsY0FBQSxHQUFBRyxDQUFBO0VBQ3ZCSSxZQUFZLENBQUNDLEtBQUssRUFBRTtFQUFDUixjQUFBLEdBQUFHLENBQUE7RUFDckJNLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLEdBQUcsR0FBRztBQUM1QixDQUFDO0FBRUQsZUFBZVAsZUFBZSJ9