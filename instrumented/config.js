function cov_14kvqgrnd8() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/config.js";
  var hash = "cdf3cbb1c90bad349efe91326bc71631eac79b86";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/config.js",
    statementMap: {
      "0": {
        start: {
          line: 2,
          column: 28
        },
        end: {
          line: 2,
          column: 62
        }
      },
      "1": {
        start: {
          line: 4,
          column: 24
        },
        end: {
          line: 4,
          column: 54
        }
      },
      "2": {
        start: {
          line: 5,
          column: 24
        },
        end: {
          line: 5,
          column: 54
        }
      },
      "3": {
        start: {
          line: 7,
          column: 28
        },
        end: {
          line: 7,
          column: 62
        }
      },
      "4": {
        start: {
          line: 9,
          column: 32
        },
        end: {
          line: 9,
          column: 153
        }
      },
      "5": {
        start: {
          line: 11,
          column: 2
        },
        end: {
          line: 11,
          column: 54
        }
      },
      "6": {
        start: {
          line: 13,
          column: 38
        },
        end: {
          line: 13,
          column: 135
        }
      },
      "7": {
        start: {
          line: 16,
          column: 2
        },
        end: {
          line: 16,
          column: 52
        }
      },
      "8": {
        start: {
          line: 18,
          column: 2
        },
        end: {
          line: 18,
          column: 73
        }
      },
      "9": {
        start: {
          line: 19,
          column: 32
        },
        end: {
          line: 19,
          column: 63
        }
      },
      "10": {
        start: {
          line: 21,
          column: 2
        },
        end: {
          line: 21,
          column: 57
        }
      },
      "11": {
        start: {
          line: 23,
          column: 2
        },
        end: {
          line: 23,
          column: 59
        }
      }
    },
    fnMap: {},
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
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "cdf3cbb1c90bad349efe91326bc71631eac79b86"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_14kvqgrnd8 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_14kvqgrnd8();
// Staging Url
export const API_BASE_URL = (cov_14kvqgrnd8().s[0]++, process.env.REACT_APP_API_BASE_URL);
// docs Url
export const DOCS_URL = (cov_14kvqgrnd8().s[1]++, process.env.REACT_APP_DOCS_URL);
export const BLOG_URL = (cov_14kvqgrnd8().s[2]++, process.env.REACT_APP_BLOG_URL);
//mira Url
export const MIRA_API_URL = (cov_14kvqgrnd8().s[3]++, process.env.REACT_APP_MIRA_API_URL);
//github auth urls
export const GIT_REDIRECT_URL = (cov_14kvqgrnd8().s[4]++, `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLEINT_ID}&scope=read:user,user:email`);
export const FLUTTER_WAVE_PUBLIC_KEY = (cov_14kvqgrnd8().s[5]++, process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY_TESTING);
//for live exchange rate
export const LIVE_EXCHANGE_RATE_API = (cov_14kvqgrnd8().s[6]++, `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_EXCHANGE_RATE_KEY}`);
//crane cloud status
export const CRANE_CLOUD_STATUS = (cov_14kvqgrnd8().s[7]++, "https://status-api.cranecloud.io/api/v1/statuses");
export const GITLAB_URL = (cov_14kvqgrnd8().s[8]++, "https://gitlab-ce-32b64b3f-fc91-4331-bf7e.cranecloud.io/users/sign_in");
export const GOPLAYGROUND_URL = (cov_14kvqgrnd8().s[9]++, "https://go.dev.cranecloud.io/");
export const JUPYTERHUB_URL = (cov_14kvqgrnd8().s[10]++, "https://jupiter-a13faf8e-83e0-4930-8898.cranecloud.io");
export const MIRA_DOCS_URL = (cov_14kvqgrnd8().s[11]++, "https://docs.cranecloud.io/applications/deployWithMira/");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTRrdnFncm5kOCIsImFjdHVhbENvdmVyYWdlIiwiQVBJX0JBU0VfVVJMIiwicyIsInByb2Nlc3MiLCJlbnYiLCJSRUFDVF9BUFBfQVBJX0JBU0VfVVJMIiwiRE9DU19VUkwiLCJSRUFDVF9BUFBfRE9DU19VUkwiLCJCTE9HX1VSTCIsIlJFQUNUX0FQUF9CTE9HX1VSTCIsIk1JUkFfQVBJX1VSTCIsIlJFQUNUX0FQUF9NSVJBX0FQSV9VUkwiLCJHSVRfUkVESVJFQ1RfVVJMIiwiUkVBQ1RfQVBQX0dJVEhVQl9DTEVJTlRfSUQiLCJGTFVUVEVSX1dBVkVfUFVCTElDX0tFWSIsIlJFQUNUX0FQUF9GTFVUVEVSV0FWRV9QVUJMSUNfS0VZX1RFU1RJTkciLCJMSVZFX0VYQ0hBTkdFX1JBVEVfQVBJIiwiUkVBQ1RfQVBQX0VYQ0hBTkdFX1JBVEVfS0VZIiwiQ1JBTkVfQ0xPVURfU1RBVFVTIiwiR0lUTEFCX1VSTCIsIkdPUExBWUdST1VORF9VUkwiLCJKVVBZVEVSSFVCX1VSTCIsIk1JUkFfRE9DU19VUkwiXSwic291cmNlcyI6WyJjb25maWcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gU3RhZ2luZyBVcmxcbmV4cG9ydCBjb25zdCBBUElfQkFTRV9VUkwgPSBwcm9jZXNzLmVudi5SRUFDVF9BUFBfQVBJX0JBU0VfVVJMO1xuLy8gZG9jcyBVcmxcbmV4cG9ydCBjb25zdCBET0NTX1VSTCA9IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9ET0NTX1VSTDtcbmV4cG9ydCBjb25zdCBCTE9HX1VSTCA9IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9CTE9HX1VSTDtcbi8vbWlyYSBVcmxcbmV4cG9ydCBjb25zdCBNSVJBX0FQSV9VUkwgPSBwcm9jZXNzLmVudi5SRUFDVF9BUFBfTUlSQV9BUElfVVJMO1xuLy9naXRodWIgYXV0aCB1cmxzXG5leHBvcnQgY29uc3QgR0lUX1JFRElSRUNUX1VSTCA9IGBodHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgvYXV0aG9yaXplP2NsaWVudF9pZD0ke3Byb2Nlc3MuZW52LlJFQUNUX0FQUF9HSVRIVUJfQ0xFSU5UX0lEfSZzY29wZT1yZWFkOnVzZXIsdXNlcjplbWFpbGA7XG5leHBvcnQgY29uc3QgRkxVVFRFUl9XQVZFX1BVQkxJQ19LRVkgPVxuICBwcm9jZXNzLmVudi5SRUFDVF9BUFBfRkxVVFRFUldBVkVfUFVCTElDX0tFWV9URVNUSU5HO1xuLy9mb3IgbGl2ZSBleGNoYW5nZSByYXRlXG5leHBvcnQgY29uc3QgTElWRV9FWENIQU5HRV9SQVRFX0FQSSA9IGBodHRwczovL29wZW5leGNoYW5nZXJhdGVzLm9yZy9hcGkvbGF0ZXN0Lmpzb24/YXBwX2lkPSR7cHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0VYQ0hBTkdFX1JBVEVfS0VZfWA7XG4vL2NyYW5lIGNsb3VkIHN0YXR1c1xuZXhwb3J0IGNvbnN0IENSQU5FX0NMT1VEX1NUQVRVUyA9XG4gIFwiaHR0cHM6Ly9zdGF0dXMtYXBpLmNyYW5lY2xvdWQuaW8vYXBpL3YxL3N0YXR1c2VzXCI7XG5leHBvcnQgY29uc3QgR0lUTEFCX1VSTCA9XG4gIFwiaHR0cHM6Ly9naXRsYWItY2UtMzJiNjRiM2YtZmM5MS00MzMxLWJmN2UuY3JhbmVjbG91ZC5pby91c2Vycy9zaWduX2luXCI7XG5leHBvcnQgY29uc3QgR09QTEFZR1JPVU5EX1VSTCA9IFwiaHR0cHM6Ly9nby5kZXYuY3JhbmVjbG91ZC5pby9cIjtcbmV4cG9ydCBjb25zdCBKVVBZVEVSSFVCX1VSTCA9XG4gIFwiaHR0cHM6Ly9qdXBpdGVyLWExM2ZhZjhlLTgzZTAtNDkzMC04ODk4LmNyYW5lY2xvdWQuaW9cIjtcbmV4cG9ydCBjb25zdCBNSVJBX0RPQ1NfVVJMID1cbiAgXCJodHRwczovL2RvY3MuY3JhbmVjbG91ZC5pby9hcHBsaWNhdGlvbnMvZGVwbG95V2l0aE1pcmEvXCI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWjtBQUNBLE9BQU8sTUFBTUUsWUFBWSxJQUFBRixjQUFBLEdBQUFHLENBQUEsT0FBR0MsT0FBTyxDQUFDQyxHQUFHLENBQUNDLHNCQUFzQjtBQUM5RDtBQUNBLE9BQU8sTUFBTUMsUUFBUSxJQUFBUCxjQUFBLEdBQUFHLENBQUEsT0FBR0MsT0FBTyxDQUFDQyxHQUFHLENBQUNHLGtCQUFrQjtBQUN0RCxPQUFPLE1BQU1DLFFBQVEsSUFBQVQsY0FBQSxHQUFBRyxDQUFBLE9BQUdDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSyxrQkFBa0I7QUFDdEQ7QUFDQSxPQUFPLE1BQU1DLFlBQVksSUFBQVgsY0FBQSxHQUFBRyxDQUFBLE9BQUdDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTyxzQkFBc0I7QUFDOUQ7QUFDQSxPQUFPLE1BQU1DLGdCQUFnQixJQUFBYixjQUFBLEdBQUFHLENBQUEsT0FBSSxzREFBcURDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDUywwQkFBMkIsNkJBQTRCO0FBQ3pKLE9BQU8sTUFBTUMsdUJBQXVCLElBQUFmLGNBQUEsR0FBQUcsQ0FBQSxPQUNsQ0MsT0FBTyxDQUFDQyxHQUFHLENBQUNXLHdDQUF3QztBQUN0RDtBQUNBLE9BQU8sTUFBTUMsc0JBQXNCLElBQUFqQixjQUFBLEdBQUFHLENBQUEsT0FBSSx3REFBdURDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDYSwyQkFBNEIsRUFBQztBQUN2STtBQUNBLE9BQU8sTUFBTUMsa0JBQWtCLElBQUFuQixjQUFBLEdBQUFHLENBQUEsT0FDN0Isa0RBQWtEO0FBQ3BELE9BQU8sTUFBTWlCLFVBQVUsSUFBQXBCLGNBQUEsR0FBQUcsQ0FBQSxPQUNyQix1RUFBdUU7QUFDekUsT0FBTyxNQUFNa0IsZ0JBQWdCLElBQUFyQixjQUFBLEdBQUFHLENBQUEsT0FBRywrQkFBK0I7QUFDL0QsT0FBTyxNQUFNbUIsY0FBYyxJQUFBdEIsY0FBQSxHQUFBRyxDQUFBLFFBQ3pCLHVEQUF1RDtBQUN6RCxPQUFPLE1BQU1vQixhQUFhLElBQUF2QixjQUFBLEdBQUFHLENBQUEsUUFDeEIseURBQXlEIn0=