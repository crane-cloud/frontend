function cov_1qkq9zuw6o() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/savePayment.js";
  var hash = "e5f88db347f4ee9bf2953ba048af88358951cd73";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/savePayment.js",
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
          column: 27
        },
        end: {
          line: 57,
          column: 1
        }
      },
      "2": {
        start: {
          line: 16,
          column: 2
        },
        end: {
          line: 56,
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
          line: 33,
          column: 8
        }
      },
      "5": {
        start: {
          line: 36,
          column: 6
        },
        end: {
          line: 43,
          column: 8
        }
      },
      "6": {
        start: {
          line: 46,
          column: 6
        },
        end: {
          line: 52,
          column: 8
        }
      },
      "7": {
        start: {
          line: 55,
          column: 6
        },
        end: {
          line: 55,
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
            column: 27
          },
          end: {
            line: 15,
            column: 28
          }
        },
        loc: {
          start: {
            line: 15,
            column: 61
          },
          end: {
            line: 57,
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
            column: 28
          },
          end: {
            line: 15,
            column: 48
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 15,
            column: 36
          },
          end: {
            line: 15,
            column: 48
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
            line: 56,
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
            line: 33,
            column: 8
          }
        }, {
          start: {
            line: 35,
            column: 4
          },
          end: {
            line: 43,
            column: 8
          }
        }, {
          start: {
            line: 45,
            column: 4
          },
          end: {
            line: 52,
            column: 8
          }
        }, {
          start: {
            line: 54,
            column: 4
          },
          end: {
            line: 55,
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
    hash: "e5f88db347f4ee9bf2953ba048af88358951cd73"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1qkq9zuw6o = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1qkq9zuw6o();
import { SAVE_PAYMENT_SUCCESS, SAVE_PAYMENT_FAIL, START_SAVING_PAYMENT, CLEAR_SAVE_PAYMENT_STATE } from "../actions/actionTypes";
const initialState = (cov_1qkq9zuw6o().s[0]++, {
  payment: null,
  isSaved: false,
  isSaving: false,
  message: ""
});
cov_1qkq9zuw6o().s[1]++;
const savePaymentReducer = (state = (cov_1qkq9zuw6o().b[0][0]++, initialState), action) => {
  cov_1qkq9zuw6o().f[0]++;
  cov_1qkq9zuw6o().s[2]++;
  switch (action.type) {
    case SAVE_PAYMENT_SUCCESS:
      cov_1qkq9zuw6o().b[1][0]++;
      cov_1qkq9zuw6o().s[3]++;
      return {
        ...state,
        payment: action.payload,
        isSaving: false,
        isSaved: true,
        message: "Success! Your payment has been saved."
      };
    case START_SAVING_PAYMENT:
      cov_1qkq9zuw6o().b[1][1]++;
      cov_1qkq9zuw6o().s[4]++;
      return {
        ...state,
        payment: null,
        isSaving: true,
        isSaved: false,
        message: ""
      };
    case SAVE_PAYMENT_FAIL:
      cov_1qkq9zuw6o().b[1][2]++;
      cov_1qkq9zuw6o().s[5]++;
      return {
        ...state,
        payment: null,
        isSaving: false,
        isSaved: false,
        message: "Payment failed. Please try again",
        error: action.payload?.error
      };
    case CLEAR_SAVE_PAYMENT_STATE:
      cov_1qkq9zuw6o().b[1][3]++;
      cov_1qkq9zuw6o().s[6]++;
      return {
        ...state,
        payment: null,
        isSaved: false,
        isSaving: false,
        message: ""
      };
    default:
      cov_1qkq9zuw6o().b[1][4]++;
      cov_1qkq9zuw6o().s[7]++;
      return state;
  }
};
export default savePaymentReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMXFrcTl6dXc2byIsImFjdHVhbENvdmVyYWdlIiwiU0FWRV9QQVlNRU5UX1NVQ0NFU1MiLCJTQVZFX1BBWU1FTlRfRkFJTCIsIlNUQVJUX1NBVklOR19QQVlNRU5UIiwiQ0xFQVJfU0FWRV9QQVlNRU5UX1NUQVRFIiwiaW5pdGlhbFN0YXRlIiwicyIsInBheW1lbnQiLCJpc1NhdmVkIiwiaXNTYXZpbmciLCJtZXNzYWdlIiwic2F2ZVBheW1lbnRSZWR1Y2VyIiwic3RhdGUiLCJiIiwiYWN0aW9uIiwiZiIsInR5cGUiLCJwYXlsb2FkIiwiZXJyb3IiXSwic291cmNlcyI6WyJzYXZlUGF5bWVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBTQVZFX1BBWU1FTlRfU1VDQ0VTUyxcbiAgU0FWRV9QQVlNRU5UX0ZBSUwsXG4gIFNUQVJUX1NBVklOR19QQVlNRU5ULFxuICBDTEVBUl9TQVZFX1BBWU1FTlRfU1RBVEUsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgcGF5bWVudDogbnVsbCxcbiAgaXNTYXZlZDogZmFsc2UsXG4gIGlzU2F2aW5nOiBmYWxzZSxcbiAgbWVzc2FnZTogXCJcIixcbn07XG5cbmNvbnN0IHNhdmVQYXltZW50UmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFNBVkVfUEFZTUVOVF9TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBheW1lbnQ6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpc1NhdmluZzogZmFsc2UsXG4gICAgICAgIGlzU2F2ZWQ6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiU3VjY2VzcyEgWW91ciBwYXltZW50IGhhcyBiZWVuIHNhdmVkLlwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgU1RBUlRfU0FWSU5HX1BBWU1FTlQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGF5bWVudDogbnVsbCxcbiAgICAgICAgaXNTYXZpbmc6IHRydWUsXG4gICAgICAgIGlzU2F2ZWQ6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgfTtcblxuICAgIGNhc2UgU0FWRV9QQVlNRU5UX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGF5bWVudDogbnVsbCxcbiAgICAgICAgaXNTYXZpbmc6IGZhbHNlLFxuICAgICAgICBpc1NhdmVkOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJQYXltZW50IGZhaWxlZC4gUGxlYXNlIHRyeSBhZ2FpblwiLFxuICAgICAgICBlcnJvcjogYWN0aW9uLnBheWxvYWQ/LmVycm9yLFxuICAgICAgfTtcblxuICAgIGNhc2UgQ0xFQVJfU0FWRV9QQVlNRU5UX1NUQVRFOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBheW1lbnQ6IG51bGwsXG4gICAgICAgIGlzU2F2ZWQ6IGZhbHNlLFxuICAgICAgICBpc1NhdmluZzogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6IFwiXCIsXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2F2ZVBheW1lbnRSZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUNFRSxvQkFBb0IsRUFDcEJDLGlCQUFpQixFQUNqQkMsb0JBQW9CLEVBQ3BCQyx3QkFBd0IsUUFDbkIsd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQU4sY0FBQSxHQUFBTyxDQUFBLE9BQUc7RUFDbkJDLE9BQU8sRUFBRSxJQUFJO0VBQ2JDLE9BQU8sRUFBRSxLQUFLO0VBQ2RDLFFBQVEsRUFBRSxLQUFLO0VBQ2ZDLE9BQU8sRUFBRTtBQUNYLENBQUM7QUFBQ1gsY0FBQSxHQUFBTyxDQUFBO0FBRUYsTUFBTUssa0JBQWtCLEdBQUdBLENBQUNDLEtBQUssSUFBQWIsY0FBQSxHQUFBYyxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFmLGNBQUEsR0FBQWdCLENBQUE7RUFBQWhCLGNBQUEsR0FBQU8sQ0FBQTtFQUMzRCxRQUFRUSxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS2Ysb0JBQW9CO01BQUFGLGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDdkIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsT0FBTyxFQUFFTyxNQUFNLENBQUNHLE9BQU87UUFDdkJSLFFBQVEsRUFBRSxLQUFLO1FBQ2ZELE9BQU8sRUFBRSxJQUFJO1FBQ2JFLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSCxLQUFLUCxvQkFBb0I7TUFBQUosY0FBQSxHQUFBYyxDQUFBO01BQUFkLGNBQUEsR0FBQU8sQ0FBQTtNQUN2QixPQUFPO1FBQ0wsR0FBR00sS0FBSztRQUNSTCxPQUFPLEVBQUUsSUFBSTtRQUNiRSxRQUFRLEVBQUUsSUFBSTtRQUNkRCxPQUFPLEVBQUUsS0FBSztRQUNkRSxPQUFPLEVBQUU7TUFDWCxDQUFDO0lBRUgsS0FBS1IsaUJBQWlCO01BQUFILGNBQUEsR0FBQWMsQ0FBQTtNQUFBZCxjQUFBLEdBQUFPLENBQUE7TUFDcEIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkwsT0FBTyxFQUFFLElBQUk7UUFDYkUsUUFBUSxFQUFFLEtBQUs7UUFDZkQsT0FBTyxFQUFFLEtBQUs7UUFDZEUsT0FBTyxFQUFFLGtDQUFrQztRQUMzQ1EsS0FBSyxFQUFFSixNQUFNLENBQUNHLE9BQU8sRUFBRUM7TUFDekIsQ0FBQztJQUVILEtBQUtkLHdCQUF3QjtNQUFBTCxjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQzNCLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JMLE9BQU8sRUFBRSxJQUFJO1FBQ2JDLE9BQU8sRUFBRSxLQUFLO1FBQ2RDLFFBQVEsRUFBRSxLQUFLO1FBQ2ZDLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSDtNQUFBWCxjQUFBLEdBQUFjLENBQUE7TUFBQWQsY0FBQSxHQUFBTyxDQUFBO01BQ0UsT0FBT00sS0FBSztFQUFDO0FBRW5CLENBQUM7QUFFRCxlQUFlRCxrQkFBa0IifQ==