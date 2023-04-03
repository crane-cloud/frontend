function cov_1u8g7x8xdm() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/pvcs.js";
  var hash = "e6c59c8823ff0e0e63f977045236e8f810e6c55b";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/pvcs.js",
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
    hash: "e6c59c8823ff0e0e63f977045236e8f810e6c55b"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1u8g7x8xdm = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1u8g7x8xdm();
import { FETCH_PVCS_SUCCESS, FETCH_PVCS_FAILED, IS_FETCHING } from "../actions/actionTypes";
const initialState = (cov_1u8g7x8xdm().s[0]++, {
  pvcs: [],
  isRetrieving: false,
  isFetched: false,
  message: "Cluster pvcs Not Available"
});
cov_1u8g7x8xdm().s[1]++;
const pvcsReducer = (state = (cov_1u8g7x8xdm().b[0][0]++, initialState), action) => {
  cov_1u8g7x8xdm().f[0]++;
  cov_1u8g7x8xdm().s[2]++;
  switch (action.type) {
    case FETCH_PVCS_SUCCESS:
      cov_1u8g7x8xdm().b[1][0]++;
      cov_1u8g7x8xdm().s[3]++;
      return {
        ...state,
        pvcs: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "All Cluster Pvcs fetched"
      };
    case IS_FETCHING:
      cov_1u8g7x8xdm().b[1][1]++;
      cov_1u8g7x8xdm().s[4]++;
      return {
        ...state,
        isRetrieving: true
      };
    case FETCH_PVCS_FAILED:
      cov_1u8g7x8xdm().b[1][2]++;
      cov_1u8g7x8xdm().s[5]++;
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isRetrieving: false
      };
    default:
      cov_1u8g7x8xdm().b[1][3]++;
      cov_1u8g7x8xdm().s[6]++;
      return state;
  }
};
export default pvcsReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMXU4Zzd4OHhkbSIsImFjdHVhbENvdmVyYWdlIiwiRkVUQ0hfUFZDU19TVUNDRVNTIiwiRkVUQ0hfUFZDU19GQUlMRUQiLCJJU19GRVRDSElORyIsImluaXRpYWxTdGF0ZSIsInMiLCJwdmNzIiwiaXNSZXRyaWV2aW5nIiwiaXNGZXRjaGVkIiwibWVzc2FnZSIsInB2Y3NSZWR1Y2VyIiwic3RhdGUiLCJiIiwiYWN0aW9uIiwiZiIsInR5cGUiLCJwYXlsb2FkIl0sInNvdXJjZXMiOlsicHZjcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBGRVRDSF9QVkNTX1NVQ0NFU1MsXG4gIEZFVENIX1BWQ1NfRkFJTEVELFxuICBJU19GRVRDSElORyxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBwdmNzOiBbXSxcbiAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgaXNGZXRjaGVkOiBmYWxzZSxcbiAgbWVzc2FnZTogXCJDbHVzdGVyIHB2Y3MgTm90IEF2YWlsYWJsZVwiLFxufTtcblxuY29uc3QgcHZjc1JlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBGRVRDSF9QVkNTX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcHZjczogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICAgIGlzRmV0Y2hlZDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogXCJBbGwgQ2x1c3RlciBQdmNzIGZldGNoZWRcIixcbiAgICAgIH07XG5cbiAgICBjYXNlIElTX0ZFVENISU5HOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzUmV0cmlldmluZzogdHJ1ZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIEZFVENIX1BWQ1NfRkFJTEVEOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1lc3NhZ2U6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc0ZldGNoZWQ6IGZhbHNlLFxuICAgICAgICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBwdmNzUmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLFNBQ0VFLGtCQUFrQixFQUNsQkMsaUJBQWlCLEVBQ2pCQyxXQUFXLFFBQ04sd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQUwsY0FBQSxHQUFBTSxDQUFBLE9BQUc7RUFDbkJDLElBQUksRUFBRSxFQUFFO0VBQ1JDLFlBQVksRUFBRSxLQUFLO0VBQ25CQyxTQUFTLEVBQUUsS0FBSztFQUNoQkMsT0FBTyxFQUFFO0FBQ1gsQ0FBQztBQUFDVixjQUFBLEdBQUFNLENBQUE7QUFFRixNQUFNSyxXQUFXLEdBQUdBLENBQUNDLEtBQUssSUFBQVosY0FBQSxHQUFBYSxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFkLGNBQUEsR0FBQWUsQ0FBQTtFQUFBZixjQUFBLEdBQUFNLENBQUE7RUFDcEQsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtkLGtCQUFrQjtNQUFBRixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQ3JCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JMLElBQUksRUFBRU8sTUFBTSxDQUFDRyxPQUFPO1FBQ3BCVCxZQUFZLEVBQUUsS0FBSztRQUNuQkMsU0FBUyxFQUFFLElBQUk7UUFDZkMsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtOLFdBQVc7TUFBQUosY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUNkLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JKLFlBQVksRUFBRTtNQUNoQixDQUFDO0lBRUgsS0FBS0wsaUJBQWlCO01BQUFILGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDcEIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkYsT0FBTyxFQUFFSSxNQUFNLENBQUNHLE9BQU87UUFDdkJSLFNBQVMsRUFBRSxLQUFLO1FBQ2hCRCxZQUFZLEVBQUU7TUFDaEIsQ0FBQztJQUVIO01BQUFSLGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUNELGVBQWVELFdBQVcifQ==