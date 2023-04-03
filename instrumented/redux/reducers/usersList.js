function cov_1wntm7jpf9() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/usersList.js";
  var hash = "c133f2ec7e86a54e2c4d930417d91753f1c46aca";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/usersList.js",
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
          column: 25
        },
        end: {
          line: 43,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 42,
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
          line: 41,
          column: 6
        },
        end: {
          line: 41,
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
            column: 25
          },
          end: {
            line: 14,
            column: 26
          }
        },
        loc: {
          start: {
            line: 14,
            column: 59
          },
          end: {
            line: 43,
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
            column: 26
          },
          end: {
            line: 14,
            column: 46
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 34
          },
          end: {
            line: 14,
            column: 46
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
            line: 42,
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
            line: 40,
            column: 4
          },
          end: {
            line: 41,
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
    hash: "c133f2ec7e86a54e2c4d930417d91753f1c46aca"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1wntm7jpf9 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1wntm7jpf9();
import { GET_USERS_SUCCESS, GET_USERS_FAIL, START_GETTING_USERS } from "../actions/actionTypes";
const initialState = (cov_1wntm7jpf9().s[0]++, {
  users: [],
  isFetched: false,
  isFetching: false,
  message: "No users yet."
});
cov_1wntm7jpf9().s[1]++;
const usersListReducer = (state = (cov_1wntm7jpf9().b[0][0]++, initialState), action) => {
  cov_1wntm7jpf9().f[0]++;
  cov_1wntm7jpf9().s[2]++;
  switch (action.type) {
    case GET_USERS_SUCCESS:
      cov_1wntm7jpf9().b[1][0]++;
      cov_1wntm7jpf9().s[3]++;
      return {
        ...state,
        users: action.payload,
        isFetching: false,
        isFetched: true,
        message: "Users successfully fetched"
      };
    case START_GETTING_USERS:
      cov_1wntm7jpf9().b[1][1]++;
      cov_1wntm7jpf9().s[4]++;
      return {
        ...state,
        isFetching: true,
        isFetched: false
      };
    case GET_USERS_FAIL:
      cov_1wntm7jpf9().b[1][2]++;
      cov_1wntm7jpf9().s[5]++;
      return {
        ...state,
        message: action.payload,
        isFetching: false,
        isFetched: false
      };
    default:
      cov_1wntm7jpf9().b[1][3]++;
      cov_1wntm7jpf9().s[6]++;
      return state;
  }
};
export default usersListReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMXdudG03anBmOSIsImFjdHVhbENvdmVyYWdlIiwiR0VUX1VTRVJTX1NVQ0NFU1MiLCJHRVRfVVNFUlNfRkFJTCIsIlNUQVJUX0dFVFRJTkdfVVNFUlMiLCJpbml0aWFsU3RhdGUiLCJzIiwidXNlcnMiLCJpc0ZldGNoZWQiLCJpc0ZldGNoaW5nIiwibWVzc2FnZSIsInVzZXJzTGlzdFJlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJ1c2Vyc0xpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgR0VUX1VTRVJTX1NVQ0NFU1MsXG4gIEdFVF9VU0VSU19GQUlMLFxuICBTVEFSVF9HRVRUSU5HX1VTRVJTLFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHVzZXJzOiBbXSxcbiAgaXNGZXRjaGVkOiBmYWxzZSxcbiAgaXNGZXRjaGluZzogZmFsc2UsXG4gIG1lc3NhZ2U6IFwiTm8gdXNlcnMgeWV0LlwiLFxufTtcblxuY29uc3QgdXNlcnNMaXN0UmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEdFVF9VU0VSU19TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHVzZXJzOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaXNGZXRjaGluZzogZmFsc2UsXG4gICAgICAgIGlzRmV0Y2hlZDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogXCJVc2VycyBzdWNjZXNzZnVsbHkgZmV0Y2hlZFwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgU1RBUlRfR0VUVElOR19VU0VSUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc0ZldGNoaW5nOiB0cnVlLFxuICAgICAgICBpc0ZldGNoZWQ6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGNhc2UgR0VUX1VTRVJTX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVzc2FnZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzRmV0Y2hpbmc6IGZhbHNlLFxuICAgICAgICBpc0ZldGNoZWQ6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCB1c2Vyc0xpc3RSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FDRUUsaUJBQWlCLEVBQ2pCQyxjQUFjLEVBQ2RDLG1CQUFtQixRQUNkLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFMLGNBQUEsR0FBQU0sQ0FBQSxPQUFHO0VBQ25CQyxLQUFLLEVBQUUsRUFBRTtFQUNUQyxTQUFTLEVBQUUsS0FBSztFQUNoQkMsVUFBVSxFQUFFLEtBQUs7RUFDakJDLE9BQU8sRUFBRTtBQUNYLENBQUM7QUFBQ1YsY0FBQSxHQUFBTSxDQUFBO0FBRUYsTUFBTUssZ0JBQWdCLEdBQUdBLENBQUNDLEtBQUssSUFBQVosY0FBQSxHQUFBYSxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFkLGNBQUEsR0FBQWUsQ0FBQTtFQUFBZixjQUFBLEdBQUFNLENBQUE7RUFDekQsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtkLGlCQUFpQjtNQUFBRixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQ3BCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JMLEtBQUssRUFBRU8sTUFBTSxDQUFDRyxPQUFPO1FBQ3JCUixVQUFVLEVBQUUsS0FBSztRQUNqQkQsU0FBUyxFQUFFLElBQUk7UUFDZkUsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtOLG1CQUFtQjtNQUFBSixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQ3RCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JILFVBQVUsRUFBRSxJQUFJO1FBQ2hCRCxTQUFTLEVBQUU7TUFDYixDQUFDO0lBRUgsS0FBS0wsY0FBYztNQUFBSCxjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQ2pCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JGLE9BQU8sRUFBRUksTUFBTSxDQUFDRyxPQUFPO1FBQ3ZCUixVQUFVLEVBQUUsS0FBSztRQUNqQkQsU0FBUyxFQUFFO01BQ2IsQ0FBQztJQUVIO01BQUFSLGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUNELGVBQWVELGdCQUFnQiJ9