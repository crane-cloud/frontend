function cov_2f1y16fpuf() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/databaseList.js";
  var hash = "5998419d7bd72a48def539fca5c27e5b7a75f3a6";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/databaseList.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 21
        },
        end: {
          line: 13,
          column: 1
        }
      },
      "1": {
        start: {
          line: 15,
          column: 32
        },
        end: {
          line: 53,
          column: 1
        }
      },
      "2": {
        start: {
          line: 16,
          column: 2
        },
        end: {
          line: 52,
          column: 3
        }
      },
      "3": {
        start: {
          line: 18,
          column: 6
        },
        end: {
          line: 24,
          column: 8
        }
      },
      "4": {
        start: {
          line: 27,
          column: 6
        },
        end: {
          line: 31,
          column: 8
        }
      },
      "5": {
        start: {
          line: 34,
          column: 6
        },
        end: {
          line: 39,
          column: 8
        }
      },
      "6": {
        start: {
          line: 42,
          column: 6
        },
        end: {
          line: 48,
          column: 8
        }
      },
      "7": {
        start: {
          line: 51,
          column: 6
        },
        end: {
          line: 51,
          column: 19
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 15,
            column: 32
          },
          end: {
            line: 15,
            column: 33
          }
        },
        loc: {
          start: {
            line: 15,
            column: 66
          },
          end: {
            line: 53,
            column: 1
          }
        },
        line: 15
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 15,
            column: 33
          },
          end: {
            line: 15,
            column: 53
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 15,
            column: 41
          },
          end: {
            line: 15,
            column: 53
          }
        }],
        line: 15
      },
      "1": {
        loc: {
          start: {
            line: 16,
            column: 2
          },
          end: {
            line: 52,
            column: 3
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 17,
            column: 4
          },
          end: {
            line: 24,
            column: 8
          }
        }, {
          start: {
            line: 26,
            column: 4
          },
          end: {
            line: 31,
            column: 8
          }
        }, {
          start: {
            line: 33,
            column: 4
          },
          end: {
            line: 39,
            column: 8
          }
        }, {
          start: {
            line: 41,
            column: 4
          },
          end: {
            line: 48,
            column: 8
          }
        }, {
          start: {
            line: 50,
            column: 4
          },
          end: {
            line: 51,
            column: 19
          }
        }],
        line: 16
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
      "7": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0],
      "1": [0, 0, 0, 0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "5998419d7bd72a48def539fca5c27e5b7a75f3a6"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2f1y16fpuf = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2f1y16fpuf();
import { FETCH_PROJECT_DATABASES_SUCCESS, FETCH_PROJECT_DATABASES_FAILED, IS_FETCHING_PROJECT_DATABASES, CLEAR_PROJECT_DATABASES } from "../actions/actionTypes";
const initialState = (cov_2f1y16fpuf().s[0]++, {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Databases Not Available"
});
cov_2f1y16fpuf().s[1]++;
const projectDatabasesReducer = (state = (cov_2f1y16fpuf().b[0][0]++, initialState), action) => {
  cov_2f1y16fpuf().f[0]++;
  cov_2f1y16fpuf().s[2]++;
  switch (action.type) {
    case FETCH_PROJECT_DATABASES_SUCCESS:
      cov_2f1y16fpuf().b[1][0]++;
      cov_2f1y16fpuf().s[3]++;
      return {
        ...state,
        databases: action.payload,
        isFetchingDatabases: false,
        databasesFetched: true,
        databasesMessage: "Fetched project databases"
      };
    case IS_FETCHING_PROJECT_DATABASES:
      cov_2f1y16fpuf().b[1][1]++;
      cov_2f1y16fpuf().s[4]++;
      return {
        ...state,
        databasesFetched: false,
        isFetchingDatabases: true
      };
    case FETCH_PROJECT_DATABASES_FAILED:
      cov_2f1y16fpuf().b[1][2]++;
      cov_2f1y16fpuf().s[5]++;
      return {
        ...state,
        isFetchingDatabases: false,
        databasesFetched: false,
        databasesMessage: "Error fetching project databases"
      };
    case CLEAR_PROJECT_DATABASES:
      cov_2f1y16fpuf().b[1][3]++;
      cov_2f1y16fpuf().s[6]++;
      return {
        ...state,
        databases: [],
        isFetchingDatabases: false,
        databasesFetched: false,
        databasesMessage: ""
      };
    default:
      cov_2f1y16fpuf().b[1][4]++;
      cov_2f1y16fpuf().s[7]++;
      return state;
  }
};
export default projectDatabasesReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMmYxeTE2ZnB1ZiIsImFjdHVhbENvdmVyYWdlIiwiRkVUQ0hfUFJPSkVDVF9EQVRBQkFTRVNfU1VDQ0VTUyIsIkZFVENIX1BST0pFQ1RfREFUQUJBU0VTX0ZBSUxFRCIsIklTX0ZFVENISU5HX1BST0pFQ1RfREFUQUJBU0VTIiwiQ0xFQVJfUFJPSkVDVF9EQVRBQkFTRVMiLCJpbml0aWFsU3RhdGUiLCJzIiwiZGF0YWJhc2VzIiwiaXNGZXRjaGluZ0RhdGFiYXNlcyIsImRhdGFiYXNlc0ZldGNoZWQiLCJkYXRhYmFzZXNNZXNzYWdlIiwicHJvamVjdERhdGFiYXNlc1JlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJkYXRhYmFzZUxpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRkVUQ0hfUFJPSkVDVF9EQVRBQkFTRVNfU1VDQ0VTUyxcbiAgRkVUQ0hfUFJPSkVDVF9EQVRBQkFTRVNfRkFJTEVELFxuICBJU19GRVRDSElOR19QUk9KRUNUX0RBVEFCQVNFUyxcbiAgQ0xFQVJfUFJPSkVDVF9EQVRBQkFTRVMsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZGF0YWJhc2VzOiBbXSxcbiAgaXNGZXRjaGluZ0RhdGFiYXNlczogZmFsc2UsXG4gIGRhdGFiYXNlc0ZldGNoZWQ6IGZhbHNlLFxuICBkYXRhYmFzZXNNZXNzYWdlOiBcIkRhdGFiYXNlcyBOb3QgQXZhaWxhYmxlXCIsXG59O1xuXG5jb25zdCBwcm9qZWN0RGF0YWJhc2VzUmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEZFVENIX1BST0pFQ1RfREFUQUJBU0VTX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGF0YWJhc2VzOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaXNGZXRjaGluZ0RhdGFiYXNlczogZmFsc2UsXG4gICAgICAgIGRhdGFiYXNlc0ZldGNoZWQ6IHRydWUsXG4gICAgICAgIGRhdGFiYXNlc01lc3NhZ2U6IFwiRmV0Y2hlZCBwcm9qZWN0IGRhdGFiYXNlc1wiLFxuICAgICAgfTtcblxuICAgIGNhc2UgSVNfRkVUQ0hJTkdfUFJPSkVDVF9EQVRBQkFTRVM6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGF0YWJhc2VzRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgIGlzRmV0Y2hpbmdEYXRhYmFzZXM6IHRydWUsXG4gICAgICB9O1xuXG4gICAgY2FzZSBGRVRDSF9QUk9KRUNUX0RBVEFCQVNFU19GQUlMRUQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNGZXRjaGluZ0RhdGFiYXNlczogZmFsc2UsXG4gICAgICAgIGRhdGFiYXNlc0ZldGNoZWQ6IGZhbHNlLFxuICAgICAgICBkYXRhYmFzZXNNZXNzYWdlOiBcIkVycm9yIGZldGNoaW5nIHByb2plY3QgZGF0YWJhc2VzXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBDTEVBUl9QUk9KRUNUX0RBVEFCQVNFUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkYXRhYmFzZXM6IFtdLFxuICAgICAgICBpc0ZldGNoaW5nRGF0YWJhc2VzOiBmYWxzZSxcbiAgICAgICAgZGF0YWJhc2VzRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgIGRhdGFiYXNlc01lc3NhZ2U6IFwiXCIsXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IHByb2plY3REYXRhYmFzZXNSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUNFRSwrQkFBK0IsRUFDL0JDLDhCQUE4QixFQUM5QkMsNkJBQTZCLEVBQzdCQyx1QkFBdUIsUUFDbEIsd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQU4sY0FBQSxHQUFBTyxDQUFBLE9BQUc7RUFDbkJDLFNBQVMsRUFBRSxFQUFFO0VBQ2JDLG1CQUFtQixFQUFFLEtBQUs7RUFDMUJDLGdCQUFnQixFQUFFLEtBQUs7RUFDdkJDLGdCQUFnQixFQUFFO0FBQ3BCLENBQUM7QUFBQ1gsY0FBQSxHQUFBTyxDQUFBO0FBRUYsTUFBTUssdUJBQXVCLEdBQUdBLENBQUNDLEtBQUssSUFBQWIsY0FBQSxHQUFBYyxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFmLGNBQUEsR0FBQWdCLENBQUE7RUFBQWhCLGNBQUEsR0FBQU8sQ0FBQTtFQUNoRSxRQUFRUSxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS2YsK0JBQStCO01BQUFGLGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDbEMsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsU0FBUyxFQUFFTyxNQUFNLENBQUNHLE9BQU87UUFDekJULG1CQUFtQixFQUFFLEtBQUs7UUFDMUJDLGdCQUFnQixFQUFFLElBQUk7UUFDdEJDLGdCQUFnQixFQUFFO01BQ3BCLENBQUM7SUFFSCxLQUFLUCw2QkFBNkI7TUFBQUosY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUNoQyxPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSSCxnQkFBZ0IsRUFBRSxLQUFLO1FBQ3ZCRCxtQkFBbUIsRUFBRTtNQUN2QixDQUFDO0lBRUgsS0FBS04sOEJBQThCO01BQUFILGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDakMsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkosbUJBQW1CLEVBQUUsS0FBSztRQUMxQkMsZ0JBQWdCLEVBQUUsS0FBSztRQUN2QkMsZ0JBQWdCLEVBQUU7TUFDcEIsQ0FBQztJQUVILEtBQUtOLHVCQUF1QjtNQUFBTCxjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQzFCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JMLFNBQVMsRUFBRSxFQUFFO1FBQ2JDLG1CQUFtQixFQUFFLEtBQUs7UUFDMUJDLGdCQUFnQixFQUFFLEtBQUs7UUFDdkJDLGdCQUFnQixFQUFFO01BQ3BCLENBQUM7SUFFSDtNQUFBWCxjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ0UsT0FBT00sS0FBSztFQUFDO0FBRW5CLENBQUM7QUFDRCxlQUFlRCx1QkFBdUIifQ==