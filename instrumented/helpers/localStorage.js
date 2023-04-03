function cov_2fhblot12s() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/helpers/localStorage.js";
  var hash = "20c183a83e4001a61d5d304f69377fa6bf3e66c0";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/helpers/localStorage.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 25
        },
        end: {
          line: 13,
          column: 1
        }
      },
      "1": {
        start: {
          line: 2,
          column: 2
        },
        end: {
          line: 12,
          column: 3
        }
      },
      "2": {
        start: {
          line: 3,
          column: 28
        },
        end: {
          line: 3,
          column: 57
        }
      },
      "3": {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 7,
          column: 5
        }
      },
      "4": {
        start: {
          line: 6,
          column: 6
        },
        end: {
          line: 6,
          column: 23
        }
      },
      "5": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 39
        }
      },
      "6": {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 11,
          column: 21
        }
      },
      "7": {
        start: {
          line: 15,
          column: 25
        },
        end: {
          line: 22,
          column: 1
        }
      },
      "8": {
        start: {
          line: 16,
          column: 2
        },
        end: {
          line: 21,
          column: 3
        }
      },
      "9": {
        start: {
          line: 17,
          column: 28
        },
        end: {
          line: 17,
          column: 49
        }
      },
      "10": {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 51
        }
      },
      "11": {
        start: {
          line: 24,
          column: 24
        },
        end: {
          line: 26,
          column: 1
        }
      },
      "12": {
        start: {
          line: 25,
          column: 2
        },
        end: {
          line: 25,
          column: 23
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 1,
            column: 25
          },
          end: {
            line: 1,
            column: 26
          }
        },
        loc: {
          start: {
            line: 1,
            column: 31
          },
          end: {
            line: 13,
            column: 1
          }
        },
        line: 1
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 15,
            column: 25
          },
          end: {
            line: 15,
            column: 26
          }
        },
        loc: {
          start: {
            line: 15,
            column: 36
          },
          end: {
            line: 22,
            column: 1
          }
        },
        line: 15
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 24,
            column: 24
          },
          end: {
            line: 24,
            column: 25
          }
        },
        loc: {
          start: {
            line: 24,
            column: 30
          },
          end: {
            line: 26,
            column: 1
          }
        },
        line: 24
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 5,
            column: 4
          },
          end: {
            line: 7,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 5,
            column: 4
          },
          end: {
            line: 7,
            column: 5
          }
        }, {
          start: {
            line: 5,
            column: 4
          },
          end: {
            line: 7,
            column: 5
          }
        }],
        line: 5
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
      "11": 0,
      "12": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "20c183a83e4001a61d5d304f69377fa6bf3e66c0"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2fhblot12s = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2fhblot12s();
cov_2fhblot12s().s[0]++;
export const loadState = () => {
  cov_2fhblot12s().f[0]++;
  cov_2fhblot12s().s[1]++;
  try {
    const serializedState = (cov_2fhblot12s().s[2]++, localStorage.getItem("state"));
    cov_2fhblot12s().s[3]++;
    if (serializedState === null) {
      cov_2fhblot12s().b[0][0]++;
      cov_2fhblot12s().s[4]++;
      return undefined;
    } else {
      cov_2fhblot12s().b[0][1]++;
    }
    cov_2fhblot12s().s[5]++;
    return JSON.parse(serializedState);
  } catch (err) {
    cov_2fhblot12s().s[6]++;
    return undefined;
  }
};
cov_2fhblot12s().s[7]++;
export const saveState = state => {
  cov_2fhblot12s().f[1]++;
  cov_2fhblot12s().s[8]++;
  try {
    const serializedState = (cov_2fhblot12s().s[9]++, JSON.stringify(state));
    cov_2fhblot12s().s[10]++;
    localStorage.setItem("state", serializedState);
  } catch (err) {
    // ingore
  }
};
cov_2fhblot12s().s[11]++;
export const onUnload = () => {
  cov_2fhblot12s().f[2]++;
  cov_2fhblot12s().s[12]++;
  localStorage.clear();
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMmZoYmxvdDEycyIsImFjdHVhbENvdmVyYWdlIiwicyIsImxvYWRTdGF0ZSIsImYiLCJzZXJpYWxpemVkU3RhdGUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYiIsInVuZGVmaW5lZCIsIkpTT04iLCJwYXJzZSIsImVyciIsInNhdmVTdGF0ZSIsInN0YXRlIiwic3RyaW5naWZ5Iiwic2V0SXRlbSIsIm9uVW5sb2FkIiwiY2xlYXIiXSwic291cmNlcyI6WyJsb2NhbFN0b3JhZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGxvYWRTdGF0ZSA9ICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXJpYWxpemVkU3RhdGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN0YXRlXCIpO1xuXG4gICAgaWYgKHNlcmlhbGl6ZWRTdGF0ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShzZXJpYWxpemVkU3RhdGUpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZVN0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2VyaWFsaXplZFN0YXRlID0gSlNPTi5zdHJpbmdpZnkoc3RhdGUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3RhdGVcIiwgc2VyaWFsaXplZFN0YXRlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gaW5nb3JlXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBvblVubG9hZCA9ICgpID0+IHtcbiAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQUFBQSxjQUFBLEdBQUFFLENBQUE7QUFmWixPQUFPLE1BQU1DLFNBQVMsR0FBR0EsQ0FBQSxLQUFNO0VBQUFILGNBQUEsR0FBQUksQ0FBQTtFQUFBSixjQUFBLEdBQUFFLENBQUE7RUFDN0IsSUFBSTtJQUNGLE1BQU1HLGVBQWUsSUFBQUwsY0FBQSxHQUFBRSxDQUFBLE9BQUdJLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUFDUCxjQUFBLEdBQUFFLENBQUE7SUFFdEQsSUFBSUcsZUFBZSxLQUFLLElBQUksRUFBRTtNQUFBTCxjQUFBLEdBQUFRLENBQUE7TUFBQVIsY0FBQSxHQUFBRSxDQUFBO01BQzVCLE9BQU9PLFNBQVM7SUFDbEIsQ0FBQztNQUFBVCxjQUFBLEdBQUFRLENBQUE7SUFBQTtJQUFBUixjQUFBLEdBQUFFLENBQUE7SUFFRCxPQUFPUSxJQUFJLENBQUNDLEtBQUssQ0FBQ04sZUFBZSxDQUFDO0VBQ3BDLENBQUMsQ0FBQyxPQUFPTyxHQUFHLEVBQUU7SUFBQVosY0FBQSxHQUFBRSxDQUFBO0lBQ1osT0FBT08sU0FBUztFQUNsQjtBQUNGLENBQUM7QUFBQ1QsY0FBQSxHQUFBRSxDQUFBO0FBRUYsT0FBTyxNQUFNVyxTQUFTLEdBQUlDLEtBQUssSUFBSztFQUFBZCxjQUFBLEdBQUFJLENBQUE7RUFBQUosY0FBQSxHQUFBRSxDQUFBO0VBQ2xDLElBQUk7SUFDRixNQUFNRyxlQUFlLElBQUFMLGNBQUEsR0FBQUUsQ0FBQSxPQUFHUSxJQUFJLENBQUNLLFNBQVMsQ0FBQ0QsS0FBSyxDQUFDO0lBQUNkLGNBQUEsR0FBQUUsQ0FBQTtJQUM5Q0ksWUFBWSxDQUFDVSxPQUFPLENBQUMsT0FBTyxFQUFFWCxlQUFlLENBQUM7RUFDaEQsQ0FBQyxDQUFDLE9BQU9PLEdBQUcsRUFBRTtJQUNaO0VBQUE7QUFFSixDQUFDO0FBQUNaLGNBQUEsR0FBQUUsQ0FBQTtBQUVGLE9BQU8sTUFBTWUsUUFBUSxHQUFHQSxDQUFBLEtBQU07RUFBQWpCLGNBQUEsR0FBQUksQ0FBQTtFQUFBSixjQUFBLEdBQUFFLENBQUE7RUFDNUJJLFlBQVksQ0FBQ1ksS0FBSyxFQUFFO0FBQ3RCLENBQUMifQ==