function cov_26hpx7lp8() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/adminGetDatabases.js";
  var hash = "d5d87e79fbdb136724330c5241907f0110af0434";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/adminGetDatabases.js",
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
          column: 30
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
          line: 30,
          column: 8
        }
      },
      "5": {
        start: {
          line: 33,
          column: 6
        },
        end: {
          line: 38,
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
            column: 30
          },
          end: {
            line: 14,
            column: 31
          }
        },
        loc: {
          start: {
            line: 14,
            column: 64
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
            column: 31
          },
          end: {
            line: 14,
            column: 51
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 39
          },
          end: {
            line: 14,
            column: 51
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
            line: 30,
            column: 8
          }
        }, {
          start: {
            line: 32,
            column: 4
          },
          end: {
            line: 38,
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
    hash: "d5d87e79fbdb136724330c5241907f0110af0434"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_26hpx7lp8 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_26hpx7lp8();
import { ADMIN_GETTING_ALL_DATABASES, ADMIN_ALL_DATABASES_SUCCESS, ADMIN_ALL_DATABASES_FAIL } from "../actions/actionTypes";
const initialState = (cov_26hpx7lp8().s[0]++, {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Database information Not Available"
});
cov_26hpx7lp8().s[1]++;
const adminDatabasesReducer = (state = (cov_26hpx7lp8().b[0][0]++, initialState), action) => {
  cov_26hpx7lp8().f[0]++;
  cov_26hpx7lp8().s[2]++;
  switch (action.type) {
    case ADMIN_ALL_DATABASES_SUCCESS:
      cov_26hpx7lp8().b[1][0]++;
      cov_26hpx7lp8().s[3]++;
      return {
        ...state,
        databases: action.payload,
        isFetchingDatabases: false,
        databasesFetched: true,
        databasesMessage: "Fetched databases"
      };
    case ADMIN_GETTING_ALL_DATABASES:
      cov_26hpx7lp8().b[1][1]++;
      cov_26hpx7lp8().s[4]++;
      return {
        ...state,
        databasesFetched: false,
        isFetchingDatabases: true
      };
    case ADMIN_ALL_DATABASES_FAIL:
      cov_26hpx7lp8().b[1][2]++;
      cov_26hpx7lp8().s[5]++;
      return {
        ...state,
        isFetchingDatabases: false,
        databasesFetched: false,
        databasesMessage: "Error fetching databases"
      };
    default:
      cov_26hpx7lp8().b[1][3]++;
      cov_26hpx7lp8().s[6]++;
      return state;
  }
};
export default adminDatabasesReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjZocHg3bHA4IiwiYWN0dWFsQ292ZXJhZ2UiLCJBRE1JTl9HRVRUSU5HX0FMTF9EQVRBQkFTRVMiLCJBRE1JTl9BTExfREFUQUJBU0VTX1NVQ0NFU1MiLCJBRE1JTl9BTExfREFUQUJBU0VTX0ZBSUwiLCJpbml0aWFsU3RhdGUiLCJzIiwiZGF0YWJhc2VzIiwiaXNGZXRjaGluZ0RhdGFiYXNlcyIsImRhdGFiYXNlc0ZldGNoZWQiLCJkYXRhYmFzZXNNZXNzYWdlIiwiYWRtaW5EYXRhYmFzZXNSZWR1Y2VyIiwic3RhdGUiLCJiIiwiYWN0aW9uIiwiZiIsInR5cGUiLCJwYXlsb2FkIl0sInNvdXJjZXMiOlsiYWRtaW5HZXREYXRhYmFzZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQURNSU5fR0VUVElOR19BTExfREFUQUJBU0VTLFxuICBBRE1JTl9BTExfREFUQUJBU0VTX1NVQ0NFU1MsXG4gIEFETUlOX0FMTF9EQVRBQkFTRVNfRkFJTCxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBkYXRhYmFzZXM6IFtdLFxuICBpc0ZldGNoaW5nRGF0YWJhc2VzOiBmYWxzZSxcbiAgZGF0YWJhc2VzRmV0Y2hlZDogZmFsc2UsXG4gIGRhdGFiYXNlc01lc3NhZ2U6IFwiRGF0YWJhc2UgaW5mb3JtYXRpb24gTm90IEF2YWlsYWJsZVwiLFxufTtcblxuY29uc3QgYWRtaW5EYXRhYmFzZXNSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQURNSU5fQUxMX0RBVEFCQVNFU19TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRhdGFiYXNlczogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzRmV0Y2hpbmdEYXRhYmFzZXM6IGZhbHNlLFxuICAgICAgICBkYXRhYmFzZXNGZXRjaGVkOiB0cnVlLFxuICAgICAgICBkYXRhYmFzZXNNZXNzYWdlOiBcIkZldGNoZWQgZGF0YWJhc2VzXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBBRE1JTl9HRVRUSU5HX0FMTF9EQVRBQkFTRVM6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGF0YWJhc2VzRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgIGlzRmV0Y2hpbmdEYXRhYmFzZXM6IHRydWUsXG4gICAgICB9O1xuXG4gICAgY2FzZSBBRE1JTl9BTExfREFUQUJBU0VTX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNGZXRjaGluZ0RhdGFiYXNlczogZmFsc2UsXG4gICAgICAgIGRhdGFiYXNlc0ZldGNoZWQ6IGZhbHNlLFxuICAgICAgICBkYXRhYmFzZXNNZXNzYWdlOiBcIkVycm9yIGZldGNoaW5nIGRhdGFiYXNlc1wiLFxuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgYWRtaW5EYXRhYmFzZXNSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosU0FDRUUsMkJBQTJCLEVBQzNCQywyQkFBMkIsRUFDM0JDLHdCQUF3QixRQUNuQix3QkFBd0I7QUFFL0IsTUFBTUMsWUFBWSxJQUFBTCxhQUFBLEdBQUFNLENBQUEsT0FBRztFQUNuQkMsU0FBUyxFQUFFLEVBQUU7RUFDYkMsbUJBQW1CLEVBQUUsS0FBSztFQUMxQkMsZ0JBQWdCLEVBQUUsS0FBSztFQUN2QkMsZ0JBQWdCLEVBQUU7QUFDcEIsQ0FBQztBQUFDVixhQUFBLEdBQUFNLENBQUE7QUFFRixNQUFNSyxxQkFBcUIsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBWixhQUFBLEdBQUFhLENBQUEsVUFBR1IsWUFBWSxHQUFFUyxNQUFNLEtBQUs7RUFBQWQsYUFBQSxHQUFBZSxDQUFBO0VBQUFmLGFBQUEsR0FBQU0sQ0FBQTtFQUM5RCxRQUFRUSxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS2IsMkJBQTJCO01BQUFILGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDOUIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsU0FBUyxFQUFFTyxNQUFNLENBQUNHLE9BQU87UUFDekJULG1CQUFtQixFQUFFLEtBQUs7UUFDMUJDLGdCQUFnQixFQUFFLElBQUk7UUFDdEJDLGdCQUFnQixFQUFFO01BQ3BCLENBQUM7SUFFSCxLQUFLUiwyQkFBMkI7TUFBQUYsYUFBQSxHQUFBYSxDQUFBO01BQUFiLGFBQUEsR0FBQU0sQ0FBQTtNQUM5QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSSCxnQkFBZ0IsRUFBRSxLQUFLO1FBQ3ZCRCxtQkFBbUIsRUFBRTtNQUN2QixDQUFDO0lBRUgsS0FBS0osd0JBQXdCO01BQUFKLGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDM0IsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkosbUJBQW1CLEVBQUUsS0FBSztRQUMxQkMsZ0JBQWdCLEVBQUUsS0FBSztRQUN2QkMsZ0JBQWdCLEVBQUU7TUFDcEIsQ0FBQztJQUNIO01BQUFWLGFBQUEsR0FBQWEsQ0FBQTtNQUFBYixhQUFBLEdBQUFNLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUNELGVBQWVELHFCQUFxQiJ9