function cov_wq9g0qvtj() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/creditsPayments.js";
  var hash = "4ef0b69b1b80721a7ab3c957313fdf8c756d5753";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/creditsPayments.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 23
        },
        end: {
          line: 14,
          column: 3
        }
      },
      "1": {
        start: {
          line: 16,
          column: 32
        },
        end: {
          line: 62,
          column: 3
        }
      },
      "2": {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 61,
          column: 5
        }
      },
      "3": {
        start: {
          line: 19,
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
          line: 36,
          column: 10
        }
      },
      "5": {
        start: {
          line: 39,
          column: 8
        },
        end: {
          line: 47,
          column: 10
        }
      },
      "6": {
        start: {
          line: 50,
          column: 8
        },
        end: {
          line: 57,
          column: 10
        }
      },
      "7": {
        start: {
          line: 60,
          column: 8
        },
        end: {
          line: 60,
          column: 21
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 16,
            column: 32
          },
          end: {
            line: 16,
            column: 33
          }
        },
        loc: {
          start: {
            line: 16,
            column: 66
          },
          end: {
            line: 62,
            column: 3
          }
        },
        line: 16
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 16,
            column: 33
          },
          end: {
            line: 16,
            column: 53
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 16,
            column: 41
          },
          end: {
            line: 16,
            column: 53
          }
        }],
        line: 16
      },
      "1": {
        loc: {
          start: {
            line: 17,
            column: 4
          },
          end: {
            line: 61,
            column: 5
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 18,
            column: 6
          },
          end: {
            line: 26,
            column: 10
          }
        }, {
          start: {
            line: 28,
            column: 6
          },
          end: {
            line: 36,
            column: 10
          }
        }, {
          start: {
            line: 38,
            column: 6
          },
          end: {
            line: 47,
            column: 10
          }
        }, {
          start: {
            line: 49,
            column: 6
          },
          end: {
            line: 57,
            column: 10
          }
        }, {
          start: {
            line: 59,
            column: 6
          },
          end: {
            line: 60,
            column: 21
          }
        }],
        line: 17
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
    hash: "4ef0b69b1b80721a7ab3c957313fdf8c756d5753"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_wq9g0qvtj = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_wq9g0qvtj();
import { CREDITS_PAYMENT_SUCCESS, CREDITS_PAYMENT_FAIL, START_CREDITS_PAYMENT, CLEAR_CREDITS_PAYMENT_STATE } from "../actions/actionTypes";
const initialState = (cov_wq9g0qvtj().s[0]++, {
  payment: null,
  creditsSaved: false,
  creditsSaving: false,
  creditsSavingFailed: false,
  message: ""
});
cov_wq9g0qvtj().s[1]++;
const creditsPaymentReducer = (state = (cov_wq9g0qvtj().b[0][0]++, initialState), action) => {
  cov_wq9g0qvtj().f[0]++;
  cov_wq9g0qvtj().s[2]++;
  switch (action.type) {
    case CREDITS_PAYMENT_SUCCESS:
      cov_wq9g0qvtj().b[1][0]++;
      cov_wq9g0qvtj().s[3]++;
      return {
        ...state,
        payment: action.payload,
        creditsSaving: false,
        creditsSaved: true,
        creditsSavingFailed: false,
        message: "Success! Your payment has been saved."
      };
    case START_CREDITS_PAYMENT:
      cov_wq9g0qvtj().b[1][1]++;
      cov_wq9g0qvtj().s[4]++;
      return {
        ...state,
        payment: null,
        creditsSaving: true,
        creditsSaved: false,
        creditsSavingFailed: false,
        message: ""
      };
    case CREDITS_PAYMENT_FAIL:
      cov_wq9g0qvtj().b[1][2]++;
      cov_wq9g0qvtj().s[5]++;
      return {
        ...state,
        payment: null,
        creditsSaving: false,
        creditsSaved: false,
        creditsSavingFailed: true,
        message: "Payment failed. Please try again",
        error: action.payload?.error
      };
    case CLEAR_CREDITS_PAYMENT_STATE:
      cov_wq9g0qvtj().b[1][3]++;
      cov_wq9g0qvtj().s[6]++;
      return {
        ...state,
        payment: null,
        creditsSaved: false,
        creditsSaving: false,
        creditsSavingFailed: false,
        message: ""
      };
    default:
      cov_wq9g0qvtj().b[1][4]++;
      cov_wq9g0qvtj().s[7]++;
      return state;
  }
};
export default creditsPaymentReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3Zfd3E5ZzBxdnRqIiwiYWN0dWFsQ292ZXJhZ2UiLCJDUkVESVRTX1BBWU1FTlRfU1VDQ0VTUyIsIkNSRURJVFNfUEFZTUVOVF9GQUlMIiwiU1RBUlRfQ1JFRElUU19QQVlNRU5UIiwiQ0xFQVJfQ1JFRElUU19QQVlNRU5UX1NUQVRFIiwiaW5pdGlhbFN0YXRlIiwicyIsInBheW1lbnQiLCJjcmVkaXRzU2F2ZWQiLCJjcmVkaXRzU2F2aW5nIiwiY3JlZGl0c1NhdmluZ0ZhaWxlZCIsIm1lc3NhZ2UiLCJjcmVkaXRzUGF5bWVudFJlZHVjZXIiLCJzdGF0ZSIsImIiLCJhY3Rpb24iLCJmIiwidHlwZSIsInBheWxvYWQiLCJlcnJvciJdLCJzb3VyY2VzIjpbImNyZWRpdHNQYXltZW50cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENSRURJVFNfUEFZTUVOVF9TVUNDRVNTLFxuICAgIENSRURJVFNfUEFZTUVOVF9GQUlMLFxuICAgIFNUQVJUX0NSRURJVFNfUEFZTUVOVCxcbiAgICBDTEVBUl9DUkVESVRTX1BBWU1FTlRfU1RBVEUsXG4gIH0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9uVHlwZXNcIjtcbiAgXG4gIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICBwYXltZW50OiBudWxsLFxuICAgIGNyZWRpdHNTYXZlZDogZmFsc2UsXG4gICAgY3JlZGl0c1NhdmluZzogZmFsc2UsXG4gICAgY3JlZGl0c1NhdmluZ0ZhaWxlZDogZmFsc2UsXG4gICAgbWVzc2FnZTogXCJcIixcbiAgfTtcbiAgXG4gIGNvbnN0IGNyZWRpdHNQYXltZW50UmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBDUkVESVRTX1BBWU1FTlRfU1VDQ0VTUzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBwYXltZW50OiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICBjcmVkaXRzU2F2aW5nOiBmYWxzZSxcbiAgICAgICAgICBjcmVkaXRzU2F2ZWQ6IHRydWUsXG4gICAgICAgICAgY3JlZGl0c1NhdmluZ0ZhaWxlZDogZmFsc2UsXG4gICAgICAgICAgbWVzc2FnZTogXCJTdWNjZXNzISBZb3VyIHBheW1lbnQgaGFzIGJlZW4gc2F2ZWQuXCIsXG4gICAgICAgIH07XG4gIFxuICAgICAgY2FzZSBTVEFSVF9DUkVESVRTX1BBWU1FTlQ6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgcGF5bWVudDogbnVsbCxcbiAgICAgICAgICBjcmVkaXRzU2F2aW5nOiB0cnVlLFxuICAgICAgICAgIGNyZWRpdHNTYXZlZDogZmFsc2UsXG4gICAgICAgICAgY3JlZGl0c1NhdmluZ0ZhaWxlZDogZmFsc2UsXG4gICAgICAgICAgbWVzc2FnZTogXCJcIixcbiAgICAgICAgfTtcbiAgXG4gICAgICBjYXNlIENSRURJVFNfUEFZTUVOVF9GQUlMOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHBheW1lbnQ6IG51bGwsXG4gICAgICAgICAgY3JlZGl0c1NhdmluZzogZmFsc2UsXG4gICAgICAgICAgY3JlZGl0c1NhdmVkOiBmYWxzZSxcbiAgICAgICAgICBjcmVkaXRzU2F2aW5nRmFpbGVkOiB0cnVlLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiUGF5bWVudCBmYWlsZWQuIFBsZWFzZSB0cnkgYWdhaW5cIixcbiAgICAgICAgICBlcnJvcjogYWN0aW9uLnBheWxvYWQ/LmVycm9yXG4gICAgICAgIH07XG4gIFxuICAgICAgY2FzZSBDTEVBUl9DUkVESVRTX1BBWU1FTlRfU1RBVEU6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgcGF5bWVudDogbnVsbCxcbiAgICAgICAgICBjcmVkaXRzU2F2ZWQ6IGZhbHNlLFxuICAgICAgICAgIGNyZWRpdHNTYXZpbmc6IGZhbHNlLFxuICAgICAgICAgIGNyZWRpdHNTYXZpbmdGYWlsZWQ6IGZhbHNlLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiXCIsXG4gICAgICAgIH07XG4gIFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfTtcbiAgXG4gIGV4cG9ydCBkZWZhdWx0IGNyZWRpdHNQYXltZW50UmVkdWNlcjtcbiAgIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGFBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGFBQUE7QUFmWixTQUNJRSx1QkFBdUIsRUFDdkJDLG9CQUFvQixFQUNwQkMscUJBQXFCLEVBQ3JCQywyQkFBMkIsUUFDdEIsd0JBQXdCO0FBRS9CLE1BQU1DLFlBQVksSUFBQU4sYUFBQSxHQUFBTyxDQUFBLE9BQUc7RUFDbkJDLE9BQU8sRUFBRSxJQUFJO0VBQ2JDLFlBQVksRUFBRSxLQUFLO0VBQ25CQyxhQUFhLEVBQUUsS0FBSztFQUNwQkMsbUJBQW1CLEVBQUUsS0FBSztFQUMxQkMsT0FBTyxFQUFFO0FBQ1gsQ0FBQztBQUFDWixhQUFBLEdBQUFPLENBQUE7QUFFRixNQUFNTSxxQkFBcUIsR0FBR0EsQ0FBQ0MsS0FBSyxJQUFBZCxhQUFBLEdBQUFlLENBQUEsVUFBR1QsWUFBWSxHQUFFVSxNQUFNLEtBQUs7RUFBQWhCLGFBQUEsR0FBQWlCLENBQUE7RUFBQWpCLGFBQUEsR0FBQU8sQ0FBQTtFQUM5RCxRQUFRUyxNQUFNLENBQUNFLElBQUk7SUFDakIsS0FBS2hCLHVCQUF1QjtNQUFBRixhQUFBLEdBQUFlLENBQUE7TUFBQWYsYUFBQSxHQUFBTyxDQUFBO01BQzFCLE9BQU87UUFDTCxHQUFHTyxLQUFLO1FBQ1JOLE9BQU8sRUFBRVEsTUFBTSxDQUFDRyxPQUFPO1FBQ3ZCVCxhQUFhLEVBQUUsS0FBSztRQUNwQkQsWUFBWSxFQUFFLElBQUk7UUFDbEJFLG1CQUFtQixFQUFFLEtBQUs7UUFDMUJDLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSCxLQUFLUixxQkFBcUI7TUFBQUosYUFBQSxHQUFBZSxDQUFBO01BQUFmLGFBQUEsR0FBQU8sQ0FBQTtNQUN4QixPQUFPO1FBQ0wsR0FBR08sS0FBSztRQUNSTixPQUFPLEVBQUUsSUFBSTtRQUNiRSxhQUFhLEVBQUUsSUFBSTtRQUNuQkQsWUFBWSxFQUFFLEtBQUs7UUFDbkJFLG1CQUFtQixFQUFFLEtBQUs7UUFDMUJDLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSCxLQUFLVCxvQkFBb0I7TUFBQUgsYUFBQSxHQUFBZSxDQUFBO01BQUFmLGFBQUEsR0FBQU8sQ0FBQTtNQUN2QixPQUFPO1FBQ0wsR0FBR08sS0FBSztRQUNSTixPQUFPLEVBQUUsSUFBSTtRQUNiRSxhQUFhLEVBQUUsS0FBSztRQUNwQkQsWUFBWSxFQUFFLEtBQUs7UUFDbkJFLG1CQUFtQixFQUFFLElBQUk7UUFDekJDLE9BQU8sRUFBRSxrQ0FBa0M7UUFDM0NRLEtBQUssRUFBRUosTUFBTSxDQUFDRyxPQUFPLEVBQUVDO01BQ3pCLENBQUM7SUFFSCxLQUFLZiwyQkFBMkI7TUFBQUwsYUFBQSxHQUFBZSxDQUFBO01BQUFmLGFBQUEsR0FBQU8sQ0FBQTtNQUM5QixPQUFPO1FBQ0wsR0FBR08sS0FBSztRQUNSTixPQUFPLEVBQUUsSUFBSTtRQUNiQyxZQUFZLEVBQUUsS0FBSztRQUNuQkMsYUFBYSxFQUFFLEtBQUs7UUFDcEJDLG1CQUFtQixFQUFFLEtBQUs7UUFDMUJDLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFFSDtNQUFBWixhQUFBLEdBQUFlLENBQUE7TUFBQWYsYUFBQSxHQUFBTyxDQUFBO01BQ0UsT0FBT08sS0FBSztFQUFDO0FBRW5CLENBQUM7QUFFRCxlQUFlRCxxQkFBcUIifQ==