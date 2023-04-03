function cov_2b8ncgq4jc() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/updateCluster.js";
  var hash = "a5b27b1d0e9c39ca1a4b9b465089e43edece4971";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/updateCluster.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 23
        },
        end: {
          line: 13,
          column: 3
        }
      },
      "1": {
        start: {
          line: 15,
          column: 31
        },
        end: {
          line: 59,
          column: 3
        }
      },
      "2": {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 58,
          column: 5
        }
      },
      "3": {
        start: {
          line: 18,
          column: 8
        },
        end: {
          line: 26,
          column: 10
        }
      },
      "4": {
        start: {
          line: 29,
          column: 8
        },
        end: {
          line: 35,
          column: 10
        }
      },
      "5": {
        start: {
          line: 37,
          column: 8
        },
        end: {
          line: 44,
          column: 10
        }
      },
      "6": {
        start: {
          line: 47,
          column: 8
        },
        end: {
          line: 54,
          column: 10
        }
      },
      "7": {
        start: {
          line: 57,
          column: 8
        },
        end: {
          line: 57,
          column: 21
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 15,
            column: 31
          },
          end: {
            line: 15,
            column: 32
          }
        },
        loc: {
          start: {
            line: 15,
            column: 65
          },
          end: {
            line: 59,
            column: 3
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
            column: 32
          },
          end: {
            line: 15,
            column: 52
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 15,
            column: 40
          },
          end: {
            line: 15,
            column: 52
          }
        }],
        line: 15
      },
      "1": {
        loc: {
          start: {
            line: 16,
            column: 4
          },
          end: {
            line: 58,
            column: 5
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 17,
            column: 6
          },
          end: {
            line: 27,
            column: 7
          }
        }, {
          start: {
            line: 28,
            column: 6
          },
          end: {
            line: 35,
            column: 10
          }
        }, {
          start: {
            line: 36,
            column: 6
          },
          end: {
            line: 44,
            column: 10
          }
        }, {
          start: {
            line: 46,
            column: 6
          },
          end: {
            line: 54,
            column: 10
          }
        }, {
          start: {
            line: 56,
            column: 6
          },
          end: {
            line: 57,
            column: 21
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
    hash: "a5b27b1d0e9c39ca1a4b9b465089e43edece4971"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2b8ncgq4jc = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2b8ncgq4jc();
import { START_UPDATING_CLUSTER, CLEAR_CLUSTER_UPDATE_STATE, UPDATE_CLUSTER_SUCCESS, UPDATE_CLUSTER_FAILED } from "../actions/actionTypes";
const initialState = (cov_2b8ncgq4jc().s[0]++, {
  isUpdated: false,
  isUpdating: false,
  errorMessage: "",
  errorCode: null
});
cov_2b8ncgq4jc().s[1]++;
const updateClusterReducer = (state = (cov_2b8ncgq4jc().b[0][0]++, initialState), action) => {
  cov_2b8ncgq4jc().f[0]++;
  cov_2b8ncgq4jc().s[2]++;
  switch (action.type) {
    case UPDATE_CLUSTER_SUCCESS:
      cov_2b8ncgq4jc().b[1][0]++;
      {
        cov_2b8ncgq4jc().s[3]++;
        return {
          ...state,
          project: action.payload,
          isFailed: false,
          isUpdated: true,
          isUpdating: false,
          errorMessage: "",
          errorCode: null
        };
      }
    case START_UPDATING_CLUSTER:
      cov_2b8ncgq4jc().b[1][1]++;
      cov_2b8ncgq4jc().s[4]++;
      return {
        ...state,
        isUpdated: false,
        isUpdating: true,
        errorCode: null,
        isFailed: false
      };
    case UPDATE_CLUSTER_FAILED:
      cov_2b8ncgq4jc().b[1][2]++;
      cov_2b8ncgq4jc().s[5]++;
      return {
        ...state,
        isFailed: true,
        isUpdated: false,
        isUpdating: false,
        errorCode: action.payload?.errorCode,
        errorMessage: "Failed to update Cluster"
      };
    case CLEAR_CLUSTER_UPDATE_STATE:
      cov_2b8ncgq4jc().b[1][3]++;
      cov_2b8ncgq4jc().s[6]++;
      return {
        ...state,
        isFailed: false,
        isUpdated: false,
        isUpdating: false,
        errorCode: null,
        errorMessage: ""
      };
    default:
      cov_2b8ncgq4jc().b[1][4]++;
      cov_2b8ncgq4jc().s[7]++;
      return state;
  }
};
export default updateClusterReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMmI4bmNncTRqYyIsImFjdHVhbENvdmVyYWdlIiwiU1RBUlRfVVBEQVRJTkdfQ0xVU1RFUiIsIkNMRUFSX0NMVVNURVJfVVBEQVRFX1NUQVRFIiwiVVBEQVRFX0NMVVNURVJfU1VDQ0VTUyIsIlVQREFURV9DTFVTVEVSX0ZBSUxFRCIsImluaXRpYWxTdGF0ZSIsInMiLCJpc1VwZGF0ZWQiLCJpc1VwZGF0aW5nIiwiZXJyb3JNZXNzYWdlIiwiZXJyb3JDb2RlIiwidXBkYXRlQ2x1c3RlclJlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInByb2plY3QiLCJwYXlsb2FkIiwiaXNGYWlsZWQiXSwic291cmNlcyI6WyJ1cGRhdGVDbHVzdGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgU1RBUlRfVVBEQVRJTkdfQ0xVU1RFUixcbiAgICBDTEVBUl9DTFVTVEVSX1VQREFURV9TVEFURSxcbiAgICBVUERBVEVfQ0xVU1RFUl9TVUNDRVNTLFxuICAgIFVQREFURV9DTFVTVEVSX0ZBSUxFRCxcbiAgfSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuICBcbiAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgIGlzVXBkYXRlZDogZmFsc2UsXG4gICAgaXNVcGRhdGluZzogZmFsc2UsXG4gICAgZXJyb3JNZXNzYWdlOiBcIlwiLFxuICAgIGVycm9yQ29kZTogbnVsbCxcbiAgfTtcbiAgXG4gIGNvbnN0IHVwZGF0ZUNsdXN0ZXJSZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICBjYXNlIFVQREFURV9DTFVTVEVSX1NVQ0NFU1M6IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBwcm9qZWN0OiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICBpc0ZhaWxlZDogZmFsc2UsXG4gICAgICAgICAgaXNVcGRhdGVkOiB0cnVlLFxuICAgICAgICAgIGlzVXBkYXRpbmc6IGZhbHNlLFxuICAgICAgICAgIGVycm9yTWVzc2FnZTogXCJcIixcbiAgICAgICAgICBlcnJvckNvZGU6IG51bGwsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBjYXNlIFNUQVJUX1VQREFUSU5HX0NMVVNURVI6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgaXNVcGRhdGVkOiBmYWxzZSxcbiAgICAgICAgICBpc1VwZGF0aW5nOiB0cnVlLFxuICAgICAgICAgIGVycm9yQ29kZTogbnVsbCxcbiAgICAgICAgICBpc0ZhaWxlZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICBjYXNlIFVQREFURV9DTFVTVEVSX0ZBSUxFRDpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBpc0ZhaWxlZDogdHJ1ZSxcbiAgICAgICAgICBpc1VwZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgIGlzVXBkYXRpbmc6IGZhbHNlLFxuICAgICAgICAgIGVycm9yQ29kZTogYWN0aW9uLnBheWxvYWQ/LmVycm9yQ29kZSxcbiAgICAgICAgICBlcnJvck1lc3NhZ2U6IFwiRmFpbGVkIHRvIHVwZGF0ZSBDbHVzdGVyXCIsXG4gICAgICAgIH07XG4gIFxuICAgICAgY2FzZSBDTEVBUl9DTFVTVEVSX1VQREFURV9TVEFURTpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBpc0ZhaWxlZDogZmFsc2UsXG4gICAgICAgICAgaXNVcGRhdGVkOiBmYWxzZSxcbiAgICAgICAgICBpc1VwZGF0aW5nOiBmYWxzZSxcbiAgICAgICAgICBlcnJvckNvZGU6IG51bGwsXG4gICAgICAgICAgZXJyb3JNZXNzYWdlOiBcIlwiLFxuICAgICAgICB9O1xuICBcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH07XG4gIFxuICBleHBvcnQgZGVmYXVsdCB1cGRhdGVDbHVzdGVyUmVkdWNlcjtcbiAgIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUNJRSxzQkFBc0IsRUFDdEJDLDBCQUEwQixFQUMxQkMsc0JBQXNCLEVBQ3RCQyxxQkFBcUIsUUFDaEIsd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQU4sY0FBQSxHQUFBTyxDQUFBLE9BQUc7RUFDbkJDLFNBQVMsRUFBRSxLQUFLO0VBQ2hCQyxVQUFVLEVBQUUsS0FBSztFQUNqQkMsWUFBWSxFQUFFLEVBQUU7RUFDaEJDLFNBQVMsRUFBRTtBQUNiLENBQUM7QUFBQ1gsY0FBQSxHQUFBTyxDQUFBO0FBRUYsTUFBTUssb0JBQW9CLEdBQUdBLENBQUNDLEtBQUssSUFBQWIsY0FBQSxHQUFBYyxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFmLGNBQUEsR0FBQWdCLENBQUE7RUFBQWhCLGNBQUEsR0FBQU8sQ0FBQTtFQUM3RCxRQUFRUSxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS2Isc0JBQXNCO01BQUFKLGNBQUEsR0FBQWMsQ0FBQTtNQUFFO1FBQUFkLGNBQUEsR0FBQU8sQ0FBQTtRQUMzQixPQUFPO1VBQ0wsR0FBR00sS0FBSztVQUNSSyxPQUFPLEVBQUVILE1BQU0sQ0FBQ0ksT0FBTztVQUN2QkMsUUFBUSxFQUFFLEtBQUs7VUFDZlosU0FBUyxFQUFFLElBQUk7VUFDZkMsVUFBVSxFQUFFLEtBQUs7VUFDakJDLFlBQVksRUFBRSxFQUFFO1VBQ2hCQyxTQUFTLEVBQUU7UUFDYixDQUFDO01BQ0g7SUFDQSxLQUFLVCxzQkFBc0I7TUFBQUYsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUN6QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxTQUFTLEVBQUUsS0FBSztRQUNoQkMsVUFBVSxFQUFFLElBQUk7UUFDaEJFLFNBQVMsRUFBRSxJQUFJO1FBQ2ZTLFFBQVEsRUFBRTtNQUNaLENBQUM7SUFDSCxLQUFLZixxQkFBcUI7TUFBQUwsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUN4QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTyxRQUFRLEVBQUUsSUFBSTtRQUNkWixTQUFTLEVBQUUsS0FBSztRQUNoQkMsVUFBVSxFQUFFLEtBQUs7UUFDakJFLFNBQVMsRUFBRUksTUFBTSxDQUFDSSxPQUFPLEVBQUVSLFNBQVM7UUFDcENELFlBQVksRUFBRTtNQUNoQixDQUFDO0lBRUgsS0FBS1AsMEJBQTBCO01BQUFILGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDN0IsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUk8sUUFBUSxFQUFFLEtBQUs7UUFDZlosU0FBUyxFQUFFLEtBQUs7UUFDaEJDLFVBQVUsRUFBRSxLQUFLO1FBQ2pCRSxTQUFTLEVBQUUsSUFBSTtRQUNmRCxZQUFZLEVBQUU7TUFDaEIsQ0FBQztJQUVIO01BQUFWLGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUVELGVBQWVELG9CQUFvQiJ9