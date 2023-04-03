function cov_g9bbn3thj() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/jobs.js";
  var hash = "f9c691e85a4df831879263d2c865d1b78d46712e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/jobs.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 21
        },
        end: {
          line: 12,
          column: 1
        }
      },
      "1": {
        start: {
          line: 14,
          column: 20
        },
        end: {
          line: 42,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 41,
          column: 3
        }
      },
      "3": {
        start: {
          line: 17,
          column: 6
        },
        end: {
          line: 23,
          column: 8
        }
      },
      "4": {
        start: {
          line: 26,
          column: 6
        },
        end: {
          line: 29,
          column: 8
        }
      },
      "5": {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 37,
          column: 8
        }
      },
      "6": {
        start: {
          line: 40,
          column: 6
        },
        end: {
          line: 40,
          column: 19
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 14,
            column: 20
          },
          end: {
            line: 14,
            column: 21
          }
        },
        loc: {
          start: {
            line: 14,
            column: 54
          },
          end: {
            line: 42,
            column: 1
          }
        },
        line: 14
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 14,
            column: 21
          },
          end: {
            line: 14,
            column: 41
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 29
          },
          end: {
            line: 14,
            column: 41
          }
        }],
        line: 14
      },
      "1": {
        loc: {
          start: {
            line: 15,
            column: 2
          },
          end: {
            line: 41,
            column: 3
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 16,
            column: 4
          },
          end: {
            line: 23,
            column: 8
          }
        }, {
          start: {
            line: 25,
            column: 4
          },
          end: {
            line: 29,
            column: 8
          }
        }, {
          start: {
            line: 31,
            column: 4
          },
          end: {
            line: 37,
            column: 8
          }
        }, {
          start: {
            line: 39,
            column: 4
          },
          end: {
            line: 40,
            column: 19
          }
        }],
        line: 15
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0],
      "1": [0, 0, 0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "f9c691e85a4df831879263d2c865d1b78d46712e"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_g9bbn3thj = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_g9bbn3thj();
import { FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILED, IS_FETCHING } from "../actions/actionTypes";
const initialState = (cov_g9bbn3thj().s[0]++, {
  pvcs: [],
  isRetrieving: false,
  isFetched: false,
  message: "Cluster Jobs Not Available"
});
cov_g9bbn3thj().s[1]++;
const jobsReducer = (state = (cov_g9bbn3thj().b[0][0]++, initialState), action) => {
  cov_g9bbn3thj().f[0]++;
  cov_g9bbn3thj().s[2]++;
  switch (action.type) {
    case FETCH_JOBS_SUCCESS:
      cov_g9bbn3thj().b[1][0]++;
      cov_g9bbn3thj().s[3]++;
      return {
        ...state,
        jobs: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "All Cluster Jobs fetched"
      };
    case IS_FETCHING:
      cov_g9bbn3thj().b[1][1]++;
      cov_g9bbn3thj().s[4]++;
      return {
        ...state,
        isRetrieving: true
      };
    case FETCH_JOBS_FAILED:
      cov_g9bbn3thj().b[1][2]++;
      cov_g9bbn3thj().s[5]++;
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isRetrieving: false
      };
    default:
      cov_g9bbn3thj().b[1][3]++;
      cov_g9bbn3thj().s[6]++;
      return state;
  }
};
export default jobsReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfZzliYm4zdGhqIiwiYWN0dWFsQ292ZXJhZ2UiLCJGRVRDSF9KT0JTX1NVQ0NFU1MiLCJGRVRDSF9KT0JTX0ZBSUxFRCIsIklTX0ZFVENISU5HIiwiaW5pdGlhbFN0YXRlIiwicyIsInB2Y3MiLCJpc1JldHJpZXZpbmciLCJpc0ZldGNoZWQiLCJtZXNzYWdlIiwiam9ic1JlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsImpvYnMiLCJwYXlsb2FkIl0sInNvdXJjZXMiOlsiam9icy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBGRVRDSF9KT0JTX1NVQ0NFU1MsXG4gIEZFVENIX0pPQlNfRkFJTEVELFxuICBJU19GRVRDSElORyxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBwdmNzOiBbXSxcbiAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgaXNGZXRjaGVkOiBmYWxzZSxcbiAgbWVzc2FnZTogXCJDbHVzdGVyIEpvYnMgTm90IEF2YWlsYWJsZVwiLFxufTtcblxuY29uc3Qgam9ic1JlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBGRVRDSF9KT0JTX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgam9iczogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICAgIGlzRmV0Y2hlZDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogXCJBbGwgQ2x1c3RlciBKb2JzIGZldGNoZWRcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIElTX0ZFVENISU5HOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzUmV0cmlldmluZzogdHJ1ZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIEZFVENIX0pPQlNfRkFJTEVEOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1lc3NhZ2U6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc0ZldGNoZWQ6IGZhbHNlLFxuICAgICAgICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBqb2JzUmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsYUFBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsYUFBQTtBQWZaLFNBQ0VFLGtCQUFrQixFQUNsQkMsaUJBQWlCLEVBQ2pCQyxXQUFXLFFBQ04sd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQUwsYUFBQSxHQUFBTSxDQUFBLE9BQUc7RUFDbkJDLElBQUksRUFBRSxFQUFFO0VBQ1JDLFlBQVksRUFBRSxLQUFLO0VBQ25CQyxTQUFTLEVBQUUsS0FBSztFQUNoQkMsT0FBTyxFQUFFO0FBQ1gsQ0FBQztBQUFDVixhQUFBLEdBQUFNLENBQUE7QUFFRixNQUFNSyxXQUFXLEdBQUdBLENBQUNDLEtBQUssSUFBQVosYUFBQSxHQUFBYSxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFkLGFBQUEsR0FBQWUsQ0FBQTtFQUFBZixhQUFBLEdBQUFNLENBQUE7RUFDcEQsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtkLGtCQUFrQjtNQUFBRixhQUFBLEdBQUFhLENBQUE7TUFBQWIsYUFBQSxHQUFBTSxDQUFBO01BQ3JCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JLLElBQUksRUFBRUgsTUFBTSxDQUFDSSxPQUFPO1FBQ3BCVixZQUFZLEVBQUUsS0FBSztRQUNuQkMsU0FBUyxFQUFFLElBQUk7UUFDZkMsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtOLFdBQVc7TUFBQUosYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUNkLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JKLFlBQVksRUFBRTtNQUNoQixDQUFDO0lBRUgsS0FBS0wsaUJBQWlCO01BQUFILGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDcEIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkYsT0FBTyxFQUFFSSxNQUFNLENBQUNJLE9BQU87UUFDdkJULFNBQVMsRUFBRSxLQUFLO1FBQ2hCRCxZQUFZLEVBQUU7TUFDaEIsQ0FBQztJQUVIO01BQUFSLGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUNELGVBQWVELFdBQVcifQ==