function cov_q1d6a8p19() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getDatabases.js";
  var hash = "9ba329067c69d5b53d7de2f98d16614dac8f571d";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getDatabases.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 23
        },
        end: {
          line: 12,
          column: 3
        }
      },
      "1": {
        start: {
          line: 14,
          column: 27
        },
        end: {
          line: 42,
          column: 3
        }
      },
      "2": {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 41,
          column: 5
        }
      },
      "3": {
        start: {
          line: 17,
          column: 8
        },
        end: {
          line: 23,
          column: 10
        }
      },
      "4": {
        start: {
          line: 26,
          column: 8
        },
        end: {
          line: 30,
          column: 10
        }
      },
      "5": {
        start: {
          line: 33,
          column: 8
        },
        end: {
          line: 38,
          column: 10
        }
      },
      "6": {
        start: {
          line: 40,
          column: 8
        },
        end: {
          line: 40,
          column: 21
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 14,
            column: 27
          },
          end: {
            line: 14,
            column: 28
          }
        },
        loc: {
          start: {
            line: 14,
            column: 61
          },
          end: {
            line: 42,
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
            line: 14,
            column: 28
          },
          end: {
            line: 14,
            column: 48
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 36
          },
          end: {
            line: 14,
            column: 48
          }
        }],
        line: 14
      },
      "1": {
        loc: {
          start: {
            line: 15,
            column: 4
          },
          end: {
            line: 41,
            column: 5
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 16,
            column: 6
          },
          end: {
            line: 23,
            column: 10
          }
        }, {
          start: {
            line: 25,
            column: 6
          },
          end: {
            line: 30,
            column: 10
          }
        }, {
          start: {
            line: 32,
            column: 6
          },
          end: {
            line: 38,
            column: 10
          }
        }, {
          start: {
            line: 39,
            column: 6
          },
          end: {
            line: 40,
            column: 21
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
    hash: "9ba329067c69d5b53d7de2f98d16614dac8f571d"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_q1d6a8p19 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_q1d6a8p19();
import { GETTING_ALL_DATABASES, ALL_DATABASES_SUCCESS, ALL_DATABASES_FAIL } from "../actions/actionTypes";
const initialState = (cov_q1d6a8p19().s[0]++, {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Database information Not Available"
});
cov_q1d6a8p19().s[1]++;
const databasesReducer = (state = (cov_q1d6a8p19().b[0][0]++, initialState), action) => {
  cov_q1d6a8p19().f[0]++;
  cov_q1d6a8p19().s[2]++;
  switch (action.type) {
    case ALL_DATABASES_SUCCESS:
      cov_q1d6a8p19().b[1][0]++;
      cov_q1d6a8p19().s[3]++;
      return {
        ...state,
        databases: action.payload,
        isFetchingDatabases: false,
        databasesFetched: true,
        databasesMessage: "Fetched databases"
      };
    case GETTING_ALL_DATABASES:
      cov_q1d6a8p19().b[1][1]++;
      cov_q1d6a8p19().s[4]++;
      return {
        ...state,
        databasesFetched: false,
        isFetchingDatabases: true
      };
    case ALL_DATABASES_FAIL:
      cov_q1d6a8p19().b[1][2]++;
      cov_q1d6a8p19().s[5]++;
      return {
        ...state,
        isFetchingDatabases: false,
        databasesFetched: false,
        databasesMessage: "Error fetching databases"
      };
    default:
      cov_q1d6a8p19().b[1][3]++;
      cov_q1d6a8p19().s[6]++;
      return state;
  }
};
export default databasesReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfcTFkNmE4cDE5IiwiYWN0dWFsQ292ZXJhZ2UiLCJHRVRUSU5HX0FMTF9EQVRBQkFTRVMiLCJBTExfREFUQUJBU0VTX1NVQ0NFU1MiLCJBTExfREFUQUJBU0VTX0ZBSUwiLCJpbml0aWFsU3RhdGUiLCJzIiwiZGF0YWJhc2VzIiwiaXNGZXRjaGluZ0RhdGFiYXNlcyIsImRhdGFiYXNlc0ZldGNoZWQiLCJkYXRhYmFzZXNNZXNzYWdlIiwiZGF0YWJhc2VzUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicGF5bG9hZCJdLCJzb3VyY2VzIjpbImdldERhdGFiYXNlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEdFVFRJTkdfQUxMX0RBVEFCQVNFUyxcbiAgICBBTExfREFUQUJBU0VTX1NVQ0NFU1MsXG4gICAgQUxMX0RBVEFCQVNFU19GQUlMLFxuICB9IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG4gIFxuICBjb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgZGF0YWJhc2VzOiBbXSxcbiAgICBpc0ZldGNoaW5nRGF0YWJhc2VzOiBmYWxzZSxcbiAgICBkYXRhYmFzZXNGZXRjaGVkOiBmYWxzZSxcbiAgICBkYXRhYmFzZXNNZXNzYWdlOiBcIkRhdGFiYXNlIGluZm9ybWF0aW9uIE5vdCBBdmFpbGFibGVcIixcbiAgfTtcbiAgXG4gIGNvbnN0IGRhdGFiYXNlc1JlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgQUxMX0RBVEFCQVNFU19TVUNDRVNTOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIGRhdGFiYXNlczogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgICAgaXNGZXRjaGluZ0RhdGFiYXNlczogZmFsc2UsXG4gICAgICAgICAgZGF0YWJhc2VzRmV0Y2hlZDogdHJ1ZSxcbiAgICAgICAgICBkYXRhYmFzZXNNZXNzYWdlOiBcIkZldGNoZWQgZGF0YWJhc2VzXCIsXG4gICAgICAgIH07XG4gIFxuICAgICAgY2FzZSBHRVRUSU5HX0FMTF9EQVRBQkFTRVM6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgZGF0YWJhc2VzRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgICAgaXNGZXRjaGluZ0RhdGFiYXNlczogdHJ1ZSxcbiAgICAgICAgfTtcbiAgXG4gICAgICBjYXNlIEFMTF9EQVRBQkFTRVNfRkFJTDpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBpc0ZldGNoaW5nRGF0YWJhc2VzOiBmYWxzZSxcbiAgICAgICAgICBkYXRhYmFzZXNGZXRjaGVkOiBmYWxzZSxcbiAgICAgICAgICBkYXRhYmFzZXNNZXNzYWdlOiBcIkVycm9yIGZldGNoaW5nIGRhdGFiYXNlc1wiLFxuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfTtcbiAgZXhwb3J0IGRlZmF1bHQgZGF0YWJhc2VzUmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsYUFBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsYUFBQTtBQWZaLFNBQ0lFLHFCQUFxQixFQUNyQkMscUJBQXFCLEVBQ3JCQyxrQkFBa0IsUUFDYix3QkFBd0I7QUFFL0IsTUFBTUMsWUFBWSxJQUFBTCxhQUFBLEdBQUFNLENBQUEsT0FBRztFQUNuQkMsU0FBUyxFQUFFLEVBQUU7RUFDYkMsbUJBQW1CLEVBQUUsS0FBSztFQUMxQkMsZ0JBQWdCLEVBQUUsS0FBSztFQUN2QkMsZ0JBQWdCLEVBQUU7QUFDcEIsQ0FBQztBQUFDVixhQUFBLEdBQUFNLENBQUE7QUFFRixNQUFNSyxnQkFBZ0IsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBWixhQUFBLEdBQUFhLENBQUEsVUFBR1IsWUFBWSxHQUFFUyxNQUFNLEtBQUs7RUFBQWQsYUFBQSxHQUFBZSxDQUFBO0VBQUFmLGFBQUEsR0FBQU0sQ0FBQTtFQUN6RCxRQUFRUSxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS2IscUJBQXFCO01BQUFILGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDeEIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsU0FBUyxFQUFFTyxNQUFNLENBQUNHLE9BQU87UUFDekJULG1CQUFtQixFQUFFLEtBQUs7UUFDMUJDLGdCQUFnQixFQUFFLElBQUk7UUFDdEJDLGdCQUFnQixFQUFFO01BQ3BCLENBQUM7SUFFSCxLQUFLUixxQkFBcUI7TUFBQUYsYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUN4QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSSCxnQkFBZ0IsRUFBRSxLQUFLO1FBQ3ZCRCxtQkFBbUIsRUFBRTtNQUN2QixDQUFDO0lBRUgsS0FBS0osa0JBQWtCO01BQUFKLGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDckIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkosbUJBQW1CLEVBQUUsS0FBSztRQUMxQkMsZ0JBQWdCLEVBQUUsS0FBSztRQUN2QkMsZ0JBQWdCLEVBQUU7TUFDcEIsQ0FBQztJQUNIO01BQUFWLGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUNELGVBQWVELGdCQUFnQiJ9