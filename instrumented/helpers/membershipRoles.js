function cov_fucldcp8m() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/helpers/membershipRoles.js";
  var hash = "e544def14c9b9ee15b458316a376f3030b00e8c1";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/helpers/membershipRoles.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 39
        },
        end: {
          line: 8,
          column: 1
        }
      },
      "1": {
        start: {
          line: 2,
          column: 16
        },
        end: {
          line: 5,
          column: 3
        }
      },
      "2": {
        start: {
          line: 7,
          column: 2
        },
        end: {
          line: 7,
          column: 15
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 1,
            column: 39
          },
          end: {
            line: 1,
            column: 40
          }
        },
        loc: {
          start: {
            line: 1,
            column: 45
          },
          end: {
            line: 8,
            column: 1
          }
        },
        line: 1
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "e544def14c9b9ee15b458316a376f3030b00e8c1"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_fucldcp8m = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_fucldcp8m();
cov_fucldcp8m().s[0]++;
export const retrieveMembershipRoles = () => {
  cov_fucldcp8m().f[0]++;
  const roles = (cov_fucldcp8m().s[1]++, [{
    id: 1,
    name: "Adminstrator",
    value: "admin"
  }, {
    id: 2,
    name: "Member",
    value: "member"
  }]);
  cov_fucldcp8m().s[2]++;
  return roles;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfZnVjbGRjcDhtIiwiYWN0dWFsQ292ZXJhZ2UiLCJzIiwicmV0cmlldmVNZW1iZXJzaGlwUm9sZXMiLCJmIiwicm9sZXMiLCJpZCIsIm5hbWUiLCJ2YWx1ZSJdLCJzb3VyY2VzIjpbIm1lbWJlcnNoaXBSb2xlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcmV0cmlldmVNZW1iZXJzaGlwUm9sZXMgPSAoKSA9PiB7XG4gIGNvbnN0IHJvbGVzID0gW1xuICAgIHsgaWQ6IDEsIG5hbWU6IFwiQWRtaW5zdHJhdG9yXCIsIHZhbHVlOiBcImFkbWluXCIgfSxcbiAgICB7IGlkOiAyLCBuYW1lOiBcIk1lbWJlclwiLCB2YWx1ZTogXCJtZW1iZXJcIiB9LFxuICBdO1xuXG4gIHJldHVybiByb2xlcztcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGFBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGFBQUE7QUFBQUEsYUFBQSxHQUFBRSxDQUFBO0FBZlosT0FBTyxNQUFNQyx1QkFBdUIsR0FBR0EsQ0FBQSxLQUFNO0VBQUFILGFBQUEsR0FBQUksQ0FBQTtFQUMzQyxNQUFNQyxLQUFLLElBQUFMLGFBQUEsR0FBQUUsQ0FBQSxPQUFHLENBQ1o7SUFBRUksRUFBRSxFQUFFLENBQUM7SUFBRUMsSUFBSSxFQUFFLGNBQWM7SUFBRUMsS0FBSyxFQUFFO0VBQVEsQ0FBQyxFQUMvQztJQUFFRixFQUFFLEVBQUUsQ0FBQztJQUFFQyxJQUFJLEVBQUUsUUFBUTtJQUFFQyxLQUFLLEVBQUU7RUFBUyxDQUFDLENBQzNDO0VBQUNSLGFBQUEsR0FBQUUsQ0FBQTtFQUVGLE9BQU9HLEtBQUs7QUFDZCxDQUFDIn0=