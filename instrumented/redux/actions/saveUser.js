function cov_24a1djrbfj() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/saveUser.js";
  var hash = "53129e330507732ed66010e076d250c6064e84d9";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/saveUser.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 17
        },
        end: {
          line: 6,
          column: 2
        }
      },
      "1": {
        start: {
          line: 3,
          column: 28
        },
        end: {
          line: 6,
          column: 1
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 3,
            column: 17
          },
          end: {
            line: 3,
            column: 18
          }
        },
        loc: {
          start: {
            line: 3,
            column: 28
          },
          end: {
            line: 6,
            column: 1
          }
        },
        line: 3
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "53129e330507732ed66010e076d250c6064e84d9"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_24a1djrbfj = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_24a1djrbfj();
import { SAVE_USER } from "./actionTypes";
cov_24a1djrbfj().s[0]++;
const saveUser = user => {
  cov_24a1djrbfj().f[0]++;
  cov_24a1djrbfj().s[1]++;
  return {
    type: SAVE_USER,
    payload: user
  };
};
export default saveUser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjRhMWRqcmJmaiIsImFjdHVhbENvdmVyYWdlIiwiU0FWRV9VU0VSIiwicyIsInNhdmVVc2VyIiwidXNlciIsImYiLCJ0eXBlIiwicGF5bG9hZCJdLCJzb3VyY2VzIjpbInNhdmVVc2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNBVkVfVVNFUiB9IGZyb20gXCIuL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IHNhdmVVc2VyID0gKHVzZXIpID0+ICh7XG4gIHR5cGU6IFNBVkVfVVNFUixcbiAgcGF5bG9hZDogdXNlcixcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBzYXZlVXNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUFTRSxTQUFTLFFBQVEsZUFBZTtBQUFDRixjQUFBLEdBQUFHLENBQUE7QUFFMUMsTUFBTUMsUUFBUSxHQUFJQyxJQUFJLElBQU07RUFBQUwsY0FBQSxHQUFBTSxDQUFBO0VBQUFOLGNBQUEsR0FBQUcsQ0FBQTtFQUFBO0lBQzFCSSxJQUFJLEVBQUVMLFNBQVM7SUFDZk0sT0FBTyxFQUFFSDtFQUNYLENBQUM7QUFBRCxDQUFFO0FBRUYsZUFBZUQsUUFBUSJ9