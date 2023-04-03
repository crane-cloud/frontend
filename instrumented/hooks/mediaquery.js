function cov_1n1m392wk8() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/hooks/mediaquery.js";
  var hash = "0f3d9a0b5979a9c98436db202d0d6a4b07ddc377";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/hooks/mediaquery.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 17
        },
        end: {
          line: 14,
          column: 1
        }
      },
      "1": {
        start: {
          line: 4,
          column: 36
        },
        end: {
          line: 4,
          column: 51
        }
      },
      "2": {
        start: {
          line: 5,
          column: 2
        },
        end: {
          line: 12,
          column: 18
        }
      },
      "3": {
        start: {
          line: 6,
          column: 18
        },
        end: {
          line: 6,
          column: 57
        }
      },
      "4": {
        start: {
          line: 7,
          column: 21
        },
        end: {
          line: 7,
          column: 54
        }
      },
      "5": {
        start: {
          line: 7,
          column: 27
        },
        end: {
          line: 7,
          column: 54
        }
      },
      "6": {
        start: {
          line: 8,
          column: 4
        },
        end: {
          line: 8,
          column: 15
        }
      },
      "7": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 48
        }
      },
      "8": {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 11,
          column: 64
        }
      },
      "9": {
        start: {
          line: 11,
          column: 17
        },
        end: {
          line: 11,
          column: 63
        }
      },
      "10": {
        start: {
          line: 13,
          column: 2
        },
        end: {
          line: 13,
          column: 19
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
            column: 23
          },
          end: {
            line: 14,
            column: 1
          }
        },
        line: 3
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 5,
            column: 12
          },
          end: {
            line: 5,
            column: 13
          }
        },
        loc: {
          start: {
            line: 5,
            column: 18
          },
          end: {
            line: 12,
            column: 3
          }
        },
        line: 5
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 7,
            column: 21
          },
          end: {
            line: 7,
            column: 22
          }
        },
        loc: {
          start: {
            line: 7,
            column: 27
          },
          end: {
            line: 7,
            column: 54
          }
        },
        line: 7
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 11,
            column: 11
          },
          end: {
            line: 11,
            column: 12
          }
        },
        loc: {
          start: {
            line: 11,
            column: 17
          },
          end: {
            line: 11,
            column: 63
          }
        },
        line: 11
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
      "10": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "0f3d9a0b5979a9c98436db202d0d6a4b07ddc377"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1n1m392wk8 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1n1m392wk8();
import { useEffect, useState } from 'react';
cov_1n1m392wk8().s[0]++;
const useMedia = () => {
  cov_1n1m392wk8().f[0]++;
  const [isDesktop, setIsDesktop] = (cov_1n1m392wk8().s[1]++, useState(false));
  cov_1n1m392wk8().s[2]++;
  useEffect(() => {
    cov_1n1m392wk8().f[1]++;
    const media = (cov_1n1m392wk8().s[3]++, window.matchMedia('(min-width: 650px)'));
    cov_1n1m392wk8().s[4]++;
    const listener = () => {
      cov_1n1m392wk8().f[2]++;
      cov_1n1m392wk8().s[5]++;
      return setIsDesktop(media.matches);
    };
    cov_1n1m392wk8().s[6]++;
    listener();
    cov_1n1m392wk8().s[7]++;
    window.addEventListener('resize', listener);
    cov_1n1m392wk8().s[8]++;
    return () => {
      cov_1n1m392wk8().f[3]++;
      cov_1n1m392wk8().s[9]++;
      return window.removeEventListener('resize', listener);
    };
  }, [isDesktop]);
  cov_1n1m392wk8().s[10]++;
  return isDesktop;
};
export default useMedia;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMW4xbTM5MndrOCIsImFjdHVhbENvdmVyYWdlIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJzIiwidXNlTWVkaWEiLCJmIiwiaXNEZXNrdG9wIiwic2V0SXNEZXNrdG9wIiwibWVkaWEiLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwibGlzdGVuZXIiLCJtYXRjaGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiXSwic291cmNlcyI6WyJtZWRpYXF1ZXJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IHVzZU1lZGlhID0gKCkgPT4ge1xuICBjb25zdCBbaXNEZXNrdG9wLCBzZXRJc0Rlc2t0b3BdID0gdXNlU3RhdGUoZmFsc2UpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG1lZGlhID0gd2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6IDY1MHB4KScpO1xuICAgIGNvbnN0IGxpc3RlbmVyID0gKCkgPT4gc2V0SXNEZXNrdG9wKG1lZGlhLm1hdGNoZXMpO1xuICAgIGxpc3RlbmVyKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGxpc3RlbmVyKTtcblxuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgbGlzdGVuZXIpO1xuICB9LCBbaXNEZXNrdG9wXSk7XG4gIHJldHVybiBpc0Rlc2t0b3A7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VNZWRpYTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FBU0UsU0FBUyxFQUFFQyxRQUFRLFFBQVEsT0FBTztBQUFDSCxjQUFBLEdBQUFJLENBQUE7QUFFNUMsTUFBTUMsUUFBUSxHQUFHQSxDQUFBLEtBQU07RUFBQUwsY0FBQSxHQUFBTSxDQUFBO0VBQ3JCLE1BQU0sQ0FBQ0MsU0FBUyxFQUFFQyxZQUFZLENBQUMsSUFBQVIsY0FBQSxHQUFBSSxDQUFBLE9BQUdELFFBQVEsQ0FBQyxLQUFLLENBQUM7RUFBQ0gsY0FBQSxHQUFBSSxDQUFBO0VBQ2xERixTQUFTLENBQUMsTUFBTTtJQUFBRixjQUFBLEdBQUFNLENBQUE7SUFDZCxNQUFNRyxLQUFLLElBQUFULGNBQUEsR0FBQUksQ0FBQSxPQUFHTSxNQUFNLENBQUNDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQztJQUFDWCxjQUFBLEdBQUFJLENBQUE7SUFDdEQsTUFBTVEsUUFBUSxHQUFHQSxDQUFBLEtBQU07TUFBQVosY0FBQSxHQUFBTSxDQUFBO01BQUFOLGNBQUEsR0FBQUksQ0FBQTtNQUFBLE9BQUFJLFlBQVksQ0FBQ0MsS0FBSyxDQUFDSSxPQUFPLENBQUM7SUFBRCxDQUFDO0lBQUNiLGNBQUEsR0FBQUksQ0FBQTtJQUNuRFEsUUFBUSxFQUFFO0lBQUNaLGNBQUEsR0FBQUksQ0FBQTtJQUNYTSxNQUFNLENBQUNJLGdCQUFnQixDQUFDLFFBQVEsRUFBRUYsUUFBUSxDQUFDO0lBQUNaLGNBQUEsR0FBQUksQ0FBQTtJQUU1QyxPQUFPLE1BQU07TUFBQUosY0FBQSxHQUFBTSxDQUFBO01BQUFOLGNBQUEsR0FBQUksQ0FBQTtNQUFBLE9BQUFNLE1BQU0sQ0FBQ0ssbUJBQW1CLENBQUMsUUFBUSxFQUFFSCxRQUFRLENBQUM7SUFBRCxDQUFDO0VBQzdELENBQUMsRUFBRSxDQUFDTCxTQUFTLENBQUMsQ0FBQztFQUFDUCxjQUFBLEdBQUFJLENBQUE7RUFDaEIsT0FBT0csU0FBUztBQUNsQixDQUFDO0FBRUQsZUFBZUYsUUFBUSJ9