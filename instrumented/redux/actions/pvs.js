function cov_t8rgx7kyt() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/pvs.js";
  var hash = "97e57f04c9f1f4bb0a2e43391815e76fbe2298d8";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/pvs.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 29
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 36
        },
        end: {
          line: 10,
          column: 1
        }
      },
      "2": {
        start: {
          line: 12,
          column: 29
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 44
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "4": {
        start: {
          line: 17,
          column: 28
        },
        end: {
          line: 23,
          column: 2
        }
      },
      "5": {
        start: {
          line: 17,
          column: 40
        },
        end: {
          line: 23,
          column: 1
        }
      },
      "6": {
        start: {
          line: 25,
          column: 15
        },
        end: {
          line: 33,
          column: 1
        }
      },
      "7": {
        start: {
          line: 25,
          column: 30
        },
        end: {
          line: 33,
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
          column: 28
        }
      },
      "9": {
        start: {
          line: 27,
          column: 2
        },
        end: {
          line: 32,
          column: 7
        }
      },
      "10": {
        start: {
          line: 29,
          column: 24
        },
        end: {
          line: 29,
          column: 57
        }
      },
      "11": {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 31,
          column: 36
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 8,
            column: 29
          },
          end: {
            line: 8,
            column: 30
          }
        },
        loc: {
          start: {
            line: 8,
            column: 36
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
            column: 29
          },
          end: {
            line: 12,
            column: 30
          }
        },
        loc: {
          start: {
            line: 12,
            column: 44
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
            column: 28
          },
          end: {
            line: 17,
            column: 29
          }
        },
        loc: {
          start: {
            line: 17,
            column: 40
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
            column: 15
          },
          end: {
            line: 25,
            column: 16
          }
        },
        loc: {
          start: {
            line: 25,
            column: 30
          },
          end: {
            line: 33,
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
            column: 30
          },
          end: {
            line: 25,
            column: 31
          }
        },
        loc: {
          start: {
            line: 25,
            column: 44
          },
          end: {
            line: 33,
            column: 1
          }
        },
        line: 25
      },
      "5": {
        name: "(anonymous_5)",
        decl: {
          start: {
            line: 29,
            column: 10
          },
          end: {
            line: 29,
            column: 11
          }
        },
        loc: {
          start: {
            line: 29,
            column: 24
          },
          end: {
            line: 29,
            column: 57
          }
        },
        line: 29
      },
      "6": {
        name: "(anonymous_6)",
        decl: {
          start: {
            line: 30,
            column: 11
          },
          end: {
            line: 30,
            column: 12
          }
        },
        loc: {
          start: {
            line: 30,
            column: 22
          },
          end: {
            line: 32,
            column: 5
          }
        },
        line: 30
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
    hash: "97e57f04c9f1f4bb0a2e43391815e76fbe2298d8"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_t8rgx7kyt = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_t8rgx7kyt();
import axios from "../../axios";
import { IS_FETCHING, FETCH_PVS_SUCCESS, FETCH_PVS_FAILED } from "./actionTypes";
cov_t8rgx7kyt().s[0]++;
export const startTheFetch = () => {
  cov_t8rgx7kyt().f[0]++;
  cov_t8rgx7kyt().s[1]++;
  return {
    type: IS_FETCHING
  };
};
cov_t8rgx7kyt().s[2]++;
export const getPvsSuccess = response => {
  cov_t8rgx7kyt().f[1]++;
  cov_t8rgx7kyt().s[3]++;
  return {
    type: FETCH_PVS_SUCCESS,
    payload: response.data.data.pvs
  };
};
cov_t8rgx7kyt().s[4]++;
export const getPvsFailed = error => {
  cov_t8rgx7kyt().f[2]++;
  cov_t8rgx7kyt().s[5]++;
  return {
    type: FETCH_PVS_FAILED,
    payload: {
      status: false,
      error: error.status
    }
  };
};
cov_t8rgx7kyt().s[6]++;
const getPvs = clusterId => {
  cov_t8rgx7kyt().f[3]++;
  cov_t8rgx7kyt().s[7]++;
  return dispatch => {
    cov_t8rgx7kyt().f[4]++;
    cov_t8rgx7kyt().s[8]++;
    dispatch(startTheFetch());
    cov_t8rgx7kyt().s[9]++;
    return axios.get(`/clusters/${clusterId}/pvs`).then(response => {
      cov_t8rgx7kyt().f[5]++;
      cov_t8rgx7kyt().s[10]++;
      return dispatch(getPvsSuccess(response));
    }).catch(error => {
      cov_t8rgx7kyt().f[6]++;
      cov_t8rgx7kyt().s[11]++;
      dispatch(getPvsFailed(error));
    });
  };
};
export default getPvs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfdDhyZ3g3a3l0IiwiYWN0dWFsQ292ZXJhZ2UiLCJheGlvcyIsIklTX0ZFVENISU5HIiwiRkVUQ0hfUFZTX1NVQ0NFU1MiLCJGRVRDSF9QVlNfRkFJTEVEIiwicyIsInN0YXJ0VGhlRmV0Y2giLCJmIiwidHlwZSIsImdldFB2c1N1Y2Nlc3MiLCJyZXNwb25zZSIsInBheWxvYWQiLCJkYXRhIiwicHZzIiwiZ2V0UHZzRmFpbGVkIiwiZXJyb3IiLCJzdGF0dXMiLCJnZXRQdnMiLCJjbHVzdGVySWQiLCJkaXNwYXRjaCIsImdldCIsInRoZW4iLCJjYXRjaCJdLCJzb3VyY2VzIjpbInB2cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcIi4uLy4uL2F4aW9zXCI7XG5pbXBvcnQge1xuICBJU19GRVRDSElORyxcbiAgRkVUQ0hfUFZTX1NVQ0NFU1MsXG4gIEZFVENIX1BWU19GQUlMRUQsXG59IGZyb20gXCIuL2FjdGlvblR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBzdGFydFRoZUZldGNoID0gKCkgPT4gKHtcbiAgdHlwZTogSVNfRkVUQ0hJTkcsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldFB2c1N1Y2Nlc3MgPSAocmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6IEZFVENIX1BWU19TVUNDRVNTLFxuICBwYXlsb2FkOiByZXNwb25zZS5kYXRhLmRhdGEucHZzLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRQdnNGYWlsZWQgPSAoZXJyb3IpID0+ICh7XG4gIHR5cGU6IEZFVENIX1BWU19GQUlMRUQsXG4gIHBheWxvYWQ6IHtcbiAgICBzdGF0dXM6IGZhbHNlLFxuICAgIGVycm9yOiBlcnJvci5zdGF0dXMsXG4gIH0sXG59KTtcblxuY29uc3QgZ2V0UHZzID0gKGNsdXN0ZXJJZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHN0YXJ0VGhlRmV0Y2goKSk7XG4gIHJldHVybiBheGlvc1xuICAgIC5nZXQoYC9jbHVzdGVycy8ke2NsdXN0ZXJJZH0vcHZzYClcbiAgICAudGhlbigocmVzcG9uc2UpID0+IGRpc3BhdGNoKGdldFB2c1N1Y2Nlc3MocmVzcG9uc2UpKSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBkaXNwYXRjaChnZXRQdnNGYWlsZWQoZXJyb3IpKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFB2cztcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsYUFBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsYUFBQTtBQWZaLE9BQU9FLEtBQUssTUFBTSxhQUFhO0FBQy9CLFNBQ0VDLFdBQVcsRUFDWEMsaUJBQWlCLEVBQ2pCQyxnQkFBZ0IsUUFDWCxlQUFlO0FBQUNMLGFBQUEsR0FBQU0sQ0FBQTtBQUV2QixPQUFPLE1BQU1DLGFBQWEsR0FBR0EsQ0FBQSxLQUFPO0VBQUFQLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQTtJQUNsQ0csSUFBSSxFQUFFTjtFQUNSLENBQUM7QUFBRCxDQUFFO0FBQUNILGFBQUEsR0FBQU0sQ0FBQTtBQUVILE9BQU8sTUFBTUksYUFBYSxHQUFJQyxRQUFRLElBQU07RUFBQVgsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQzFDRyxJQUFJLEVBQUVMLGlCQUFpQjtJQUN2QlEsT0FBTyxFQUFFRCxRQUFRLENBQUNFLElBQUksQ0FBQ0EsSUFBSSxDQUFDQztFQUM5QixDQUFDO0FBQUQsQ0FBRTtBQUFDZCxhQUFBLEdBQUFNLENBQUE7QUFFSCxPQUFPLE1BQU1TLFlBQVksR0FBSUMsS0FBSyxJQUFNO0VBQUFoQixhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUE7SUFDdENHLElBQUksRUFBRUosZ0JBQWdCO0lBQ3RCTyxPQUFPLEVBQUU7TUFDUEssTUFBTSxFQUFFLEtBQUs7TUFDYkQsS0FBSyxFQUFFQSxLQUFLLENBQUNDO0lBQ2Y7RUFDRixDQUFDO0FBQUQsQ0FBRTtBQUFDakIsYUFBQSxHQUFBTSxDQUFBO0FBRUgsTUFBTVksTUFBTSxHQUFJQyxTQUFTLElBQUs7RUFBQW5CLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQSxPQUFDYyxRQUFRLElBQUs7SUFBQXBCLGFBQUEsR0FBQVEsQ0FBQTtJQUFBUixhQUFBLEdBQUFNLENBQUE7SUFDMUNjLFFBQVEsQ0FBQ2IsYUFBYSxFQUFFLENBQUM7SUFBQ1AsYUFBQSxHQUFBTSxDQUFBO0lBQzFCLE9BQU9KLEtBQUssQ0FDVG1CLEdBQUcsQ0FBRSxhQUFZRixTQUFVLE1BQUssQ0FBQyxDQUNqQ0csSUFBSSxDQUFFWCxRQUFRLElBQUs7TUFBQVgsYUFBQSxHQUFBUSxDQUFBO01BQUFSLGFBQUEsR0FBQU0sQ0FBQTtNQUFBLE9BQUFjLFFBQVEsQ0FBQ1YsYUFBYSxDQUFDQyxRQUFRLENBQUMsQ0FBQztJQUFELENBQUMsQ0FBQyxDQUNyRFksS0FBSyxDQUFFUCxLQUFLLElBQUs7TUFBQWhCLGFBQUEsR0FBQVEsQ0FBQTtNQUFBUixhQUFBLEdBQUFNLENBQUE7TUFDaEJjLFFBQVEsQ0FBQ0wsWUFBWSxDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7RUFDTixDQUFDO0FBQUQsQ0FBQztBQUVELGVBQWVFLE1BQU0ifQ==