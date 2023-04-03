function cov_13dshh9zm1() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/userDetails.js";
  var hash = "e5fc90767766d6b78bf59ecced59834d0b2ddcba";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/userDetails.js",
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
          column: 26
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
            column: 26
          },
          end: {
            line: 14,
            column: 27
          }
        },
        loc: {
          start: {
            line: 14,
            column: 60
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
            column: 27
          },
          end: {
            line: 14,
            column: 47
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 14,
            column: 35
          },
          end: {
            line: 14,
            column: 47
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
    hash: "e5fc90767766d6b78bf59ecced59834d0b2ddcba"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_13dshh9zm1 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_13dshh9zm1();
import { GET_USER_DETAIL_SUCCESS, GET_USER_DETAIL_FAIL, START_GETTING_USER_DETAIL } from "../actions/actionTypes";
const initialState = (cov_13dshh9zm1().s[0]++, {
  user: {},
  isFetched: false,
  isFetching: false,
  message: ""
});
cov_13dshh9zm1().s[1]++;
const userDetailReducer = (state = (cov_13dshh9zm1().b[0][0]++, initialState), action) => {
  cov_13dshh9zm1().f[0]++;
  cov_13dshh9zm1().s[2]++;
  switch (action.type) {
    case GET_USER_DETAIL_SUCCESS:
      cov_13dshh9zm1().b[1][0]++;
      cov_13dshh9zm1().s[3]++;
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        isFetched: true,
        message: "User detail fetched"
      };
    case START_GETTING_USER_DETAIL:
      cov_13dshh9zm1().b[1][1]++;
      cov_13dshh9zm1().s[4]++;
      return {
        ...state,
        isFetching: true,
        isFetched: false
      };
    case GET_USER_DETAIL_FAIL:
      cov_13dshh9zm1().b[1][2]++;
      cov_13dshh9zm1().s[5]++;
      return {
        ...state,
        message: action.payload,
        isFetching: false,
        isFetched: false
      };
    default:
      cov_13dshh9zm1().b[1][3]++;
      cov_13dshh9zm1().s[6]++;
      return state;
  }
};
export default userDetailReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTNkc2hoOXptMSIsImFjdHVhbENvdmVyYWdlIiwiR0VUX1VTRVJfREVUQUlMX1NVQ0NFU1MiLCJHRVRfVVNFUl9ERVRBSUxfRkFJTCIsIlNUQVJUX0dFVFRJTkdfVVNFUl9ERVRBSUwiLCJpbml0aWFsU3RhdGUiLCJzIiwidXNlciIsImlzRmV0Y2hlZCIsImlzRmV0Y2hpbmciLCJtZXNzYWdlIiwidXNlckRldGFpbFJlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlcyI6WyJ1c2VyRGV0YWlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBHRVRfVVNFUl9ERVRBSUxfU1VDQ0VTUyxcbiAgR0VUX1VTRVJfREVUQUlMX0ZBSUwsXG4gIFNUQVJUX0dFVFRJTkdfVVNFUl9ERVRBSUwsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgdXNlcjoge30sXG4gIGlzRmV0Y2hlZDogZmFsc2UsXG4gIGlzRmV0Y2hpbmc6IGZhbHNlLFxuICBtZXNzYWdlOiBcIlwiLFxufTtcblxuY29uc3QgdXNlckRldGFpbFJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBHRVRfVVNFUl9ERVRBSUxfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB1c2VyOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaXNGZXRjaGluZzogZmFsc2UsXG4gICAgICAgIGlzRmV0Y2hlZDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogXCJVc2VyIGRldGFpbCBmZXRjaGVkXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBTVEFSVF9HRVRUSU5HX1VTRVJfREVUQUlMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzRmV0Y2hpbmc6IHRydWUsXG4gICAgICAgIGlzRmV0Y2hlZDogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgY2FzZSBHRVRfVVNFUl9ERVRBSUxfRkFJTDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBtZXNzYWdlOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaXNGZXRjaGluZzogZmFsc2UsXG4gICAgICAgIGlzRmV0Y2hlZDogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IHVzZXJEZXRhaWxSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FDRUUsdUJBQXVCLEVBQ3ZCQyxvQkFBb0IsRUFDcEJDLHlCQUF5QixRQUNwQix3QkFBd0I7QUFFL0IsTUFBTUMsWUFBWSxJQUFBTCxjQUFBLEdBQUFNLENBQUEsT0FBRztFQUNuQkMsSUFBSSxFQUFFLENBQUMsQ0FBQztFQUNSQyxTQUFTLEVBQUUsS0FBSztFQUNoQkMsVUFBVSxFQUFFLEtBQUs7RUFDakJDLE9BQU8sRUFBRTtBQUNYLENBQUM7QUFBQ1YsY0FBQSxHQUFBTSxDQUFBO0FBRUYsTUFBTUssaUJBQWlCLEdBQUdBLENBQUNDLEtBQUssSUFBQVosY0FBQSxHQUFBYSxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFkLGNBQUEsR0FBQWUsQ0FBQTtFQUFBZixjQUFBLEdBQUFNLENBQUE7RUFDMUQsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtkLHVCQUF1QjtNQUFBRixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQzFCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JMLElBQUksRUFBRU8sTUFBTSxDQUFDRyxPQUFPO1FBQ3BCUixVQUFVLEVBQUUsS0FBSztRQUNqQkQsU0FBUyxFQUFFLElBQUk7UUFDZkUsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtOLHlCQUF5QjtNQUFBSixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQzVCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JILFVBQVUsRUFBRSxJQUFJO1FBQ2hCRCxTQUFTLEVBQUU7TUFDYixDQUFDO0lBRUgsS0FBS0wsb0JBQW9CO01BQUFILGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDdkIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkYsT0FBTyxFQUFFSSxNQUFNLENBQUNHLE9BQU87UUFDdkJSLFVBQVUsRUFBRSxLQUFLO1FBQ2pCRCxTQUFTLEVBQUU7TUFDYixDQUFDO0lBRUg7TUFBQVIsY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU0sQ0FBQTtNQUNFLE9BQU9NLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBQ0QsZUFBZUQsaUJBQWlCIn0=