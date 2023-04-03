function cov_1ojha2txb4() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/adminGetUserCredits.js";
  var hash = "55725411569e9bbc9d8c25aa4a94fd165f15d06c";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/adminGetUserCredits.js",
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
          column: 35
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
            column: 35
          },
          end: {
            line: 15,
            column: 36
          }
        },
        loc: {
          start: {
            line: 15,
            column: 69
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
            column: 36
          },
          end: {
            line: 15,
            column: 56
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 15,
            column: 44
          },
          end: {
            line: 15,
            column: 56
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
    hash: "55725411569e9bbc9d8c25aa4a94fd165f15d06c"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1ojha2txb4 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1ojha2txb4();
import { ADMIN_GET_USER_CREDITS_FAIL, ADMIN_GET_USER_CREDITS_SUCCESS, ADMIN_GETTING_USER_CREDITS, ADMIN_CLEAR_USER_CREDITS } from "../actions/actionTypes";
const initialState = (cov_1ojha2txb4().s[0]++, {
  userCredits: [],
  creditsFetched: false,
  isFetchingCredits: false,
  message: ""
});
cov_1ojha2txb4().s[1]++;
const adminGetUserCreditsReducer = (state = (cov_1ojha2txb4().b[0][0]++, initialState), action) => {
  cov_1ojha2txb4().f[0]++;
  cov_1ojha2txb4().s[2]++;
  switch (action.type) {
    case ADMIN_GET_USER_CREDITS_SUCCESS:
      cov_1ojha2txb4().b[1][0]++;
      cov_1ojha2txb4().s[3]++;
      return {
        ...state,
        userCredits: action.payload,
        isFetchingCredits: false,
        creditsFetched: true,
        message: "User credits fetched"
      };
    case ADMIN_GETTING_USER_CREDITS:
      cov_1ojha2txb4().b[1][1]++;
      cov_1ojha2txb4().s[4]++;
      return {
        ...state,
        isFetchingCredits: true,
        creditsFetched: false
      };
    case ADMIN_GET_USER_CREDITS_FAIL:
      cov_1ojha2txb4().b[1][2]++;
      cov_1ojha2txb4().s[5]++;
      return {
        ...state,
        message: action.payload,
        isFetchingCredits: false,
        creditsFetched: false
      };
    case ADMIN_CLEAR_USER_CREDITS:
      cov_1ojha2txb4().b[1][3]++;
      cov_1ojha2txb4().s[6]++;
      return {
        ...state,
        userCredits: [],
        isFetchingCredits: false,
        creditsFetched: false,
        message: ""
      };
    default:
      cov_1ojha2txb4().b[1][4]++;
      cov_1ojha2txb4().s[7]++;
      return state;
  }
};
export default adminGetUserCreditsReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMW9qaGEydHhiNCIsImFjdHVhbENvdmVyYWdlIiwiQURNSU5fR0VUX1VTRVJfQ1JFRElUU19GQUlMIiwiQURNSU5fR0VUX1VTRVJfQ1JFRElUU19TVUNDRVNTIiwiQURNSU5fR0VUVElOR19VU0VSX0NSRURJVFMiLCJBRE1JTl9DTEVBUl9VU0VSX0NSRURJVFMiLCJpbml0aWFsU3RhdGUiLCJzIiwidXNlckNyZWRpdHMiLCJjcmVkaXRzRmV0Y2hlZCIsImlzRmV0Y2hpbmdDcmVkaXRzIiwibWVzc2FnZSIsImFkbWluR2V0VXNlckNyZWRpdHNSZWR1Y2VyIiwic3RhdGUiLCJiIiwiYWN0aW9uIiwiZiIsInR5cGUiLCJwYXlsb2FkIl0sInNvdXJjZXMiOlsiYWRtaW5HZXRVc2VyQ3JlZGl0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBRE1JTl9HRVRfVVNFUl9DUkVESVRTX0ZBSUwsXG4gIEFETUlOX0dFVF9VU0VSX0NSRURJVFNfU1VDQ0VTUyxcbiAgQURNSU5fR0VUVElOR19VU0VSX0NSRURJVFMsXG4gIEFETUlOX0NMRUFSX1VTRVJfQ1JFRElUUyxcbn0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICB1c2VyQ3JlZGl0czogW10sXG4gIGNyZWRpdHNGZXRjaGVkOiBmYWxzZSxcbiAgaXNGZXRjaGluZ0NyZWRpdHM6IGZhbHNlLFxuICBtZXNzYWdlOiBcIlwiLFxufTtcblxuY29uc3QgYWRtaW5HZXRVc2VyQ3JlZGl0c1JlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBRE1JTl9HRVRfVVNFUl9DUkVESVRTX1NVQ0NFU1M6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgdXNlckNyZWRpdHM6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc0ZldGNoaW5nQ3JlZGl0czogZmFsc2UsXG4gICAgICAgIGNyZWRpdHNGZXRjaGVkOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiBcIlVzZXIgY3JlZGl0cyBmZXRjaGVkXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBBRE1JTl9HRVRUSU5HX1VTRVJfQ1JFRElUUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc0ZldGNoaW5nQ3JlZGl0czogdHJ1ZSxcbiAgICAgICAgY3JlZGl0c0ZldGNoZWQ6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGNhc2UgQURNSU5fR0VUX1VTRVJfQ1JFRElUU19GQUlMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1lc3NhZ2U6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc0ZldGNoaW5nQ3JlZGl0czogZmFsc2UsXG4gICAgICAgIGNyZWRpdHNGZXRjaGVkOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIEFETUlOX0NMRUFSX1VTRVJfQ1JFRElUUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB1c2VyQ3JlZGl0czogW10sXG4gICAgICAgIGlzRmV0Y2hpbmdDcmVkaXRzOiBmYWxzZSxcbiAgICAgICAgY3JlZGl0c0ZldGNoZWQ6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBhZG1pbkdldFVzZXJDcmVkaXRzUmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FDRUUsMkJBQTJCLEVBQzNCQyw4QkFBOEIsRUFDOUJDLDBCQUEwQixFQUMxQkMsd0JBQXdCLFFBQ25CLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFOLGNBQUEsR0FBQU8sQ0FBQSxPQUFHO0VBQ25CQyxXQUFXLEVBQUUsRUFBRTtFQUNmQyxjQUFjLEVBQUUsS0FBSztFQUNyQkMsaUJBQWlCLEVBQUUsS0FBSztFQUN4QkMsT0FBTyxFQUFFO0FBQ1gsQ0FBQztBQUFDWCxjQUFBLEdBQUFPLENBQUE7QUFFRixNQUFNSywwQkFBMEIsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBYixjQUFBLEdBQUFjLENBQUEsVUFBR1IsWUFBWSxHQUFFUyxNQUFNLEtBQUs7RUFBQWYsY0FBQSxHQUFBZ0IsQ0FBQTtFQUFBaEIsY0FBQSxHQUFBTyxDQUFBO0VBQ25FLFFBQVFRLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLZCw4QkFBOEI7TUFBQUgsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUNqQyxPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxXQUFXLEVBQUVPLE1BQU0sQ0FBQ0csT0FBTztRQUMzQlIsaUJBQWlCLEVBQUUsS0FBSztRQUN4QkQsY0FBYyxFQUFFLElBQUk7UUFDcEJFLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSCxLQUFLUCwwQkFBMEI7TUFBQUosY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUM3QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSSCxpQkFBaUIsRUFBRSxJQUFJO1FBQ3ZCRCxjQUFjLEVBQUU7TUFDbEIsQ0FBQztJQUVILEtBQUtQLDJCQUEyQjtNQUFBRixjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQzlCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JGLE9BQU8sRUFBRUksTUFBTSxDQUFDRyxPQUFPO1FBQ3ZCUixpQkFBaUIsRUFBRSxLQUFLO1FBQ3hCRCxjQUFjLEVBQUU7TUFDbEIsQ0FBQztJQUVILEtBQUtKLHdCQUF3QjtNQUFBTCxjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQzNCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JMLFdBQVcsRUFBRSxFQUFFO1FBQ2ZFLGlCQUFpQixFQUFFLEtBQUs7UUFDeEJELGNBQWMsRUFBRSxLQUFLO1FBQ3JCRSxPQUFPLEVBQUU7TUFDWCxDQUFDO0lBRUg7TUFBQVgsY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUNFLE9BQU9NLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBQ0QsZUFBZUQsMEJBQTBCIn0=