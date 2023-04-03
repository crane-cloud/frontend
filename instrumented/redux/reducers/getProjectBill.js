function cov_1pnic0mvb7() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getProjectBill.js";
  var hash = "fad0727fd72dba74ba5c74011c0dccc2c497ce0e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/getProjectBill.js",
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
    hash: "fad0727fd72dba74ba5c74011c0dccc2c497ce0e"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1pnic0mvb7 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1pnic0mvb7();
import { GETTING_PROJECT_BILLING_INFO, PROJECT_BILLING_INFO_SUCCESS, PROJECT_BILLING_INFO_FAIL } from "../actions/actionTypes";
const initialState = (cov_1pnic0mvb7().s[0]++, {
  projectBill: [],
  isRetrieving: false,
  isFetched: false,
  message: "Project Bill Information Not Available"
});
cov_1pnic0mvb7().s[1]++;
const getProjectBillReducer = (state = (cov_1pnic0mvb7().b[0][0]++, initialState), action) => {
  cov_1pnic0mvb7().f[0]++;
  cov_1pnic0mvb7().s[2]++;
  switch (action.type) {
    case PROJECT_BILLING_INFO_SUCCESS:
      cov_1pnic0mvb7().b[1][0]++;
      cov_1pnic0mvb7().s[3]++;
      return {
        ...state,
        projectBill: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "Project Bill fetched"
      };
    case GETTING_PROJECT_BILLING_INFO:
      cov_1pnic0mvb7().b[1][1]++;
      cov_1pnic0mvb7().s[4]++;
      return {
        ...state,
        isRetrieving: true
      };
    case PROJECT_BILLING_INFO_FAIL:
      cov_1pnic0mvb7().b[1][2]++;
      cov_1pnic0mvb7().s[5]++;
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isRetrieving: false
      };
    default:
      cov_1pnic0mvb7().b[1][3]++;
      cov_1pnic0mvb7().s[6]++;
      return state;
  }
};
export default getProjectBillReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMXBuaWMwbXZiNyIsImFjdHVhbENvdmVyYWdlIiwiR0VUVElOR19QUk9KRUNUX0JJTExJTkdfSU5GTyIsIlBST0pFQ1RfQklMTElOR19JTkZPX1NVQ0NFU1MiLCJQUk9KRUNUX0JJTExJTkdfSU5GT19GQUlMIiwiaW5pdGlhbFN0YXRlIiwicyIsInByb2plY3RCaWxsIiwiaXNSZXRyaWV2aW5nIiwiaXNGZXRjaGVkIiwibWVzc2FnZSIsImdldFByb2plY3RCaWxsUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicGF5bG9hZCJdLCJzb3VyY2VzIjpbImdldFByb2plY3RCaWxsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEdFVFRJTkdfUFJPSkVDVF9CSUxMSU5HX0lORk8sXG4gIFBST0pFQ1RfQklMTElOR19JTkZPX1NVQ0NFU1MsXG4gIFBST0pFQ1RfQklMTElOR19JTkZPX0ZBSUwsXG59IGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvblR5cGVzXCI7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgcHJvamVjdEJpbGw6IFtdLFxuICBpc1JldHJpZXZpbmc6IGZhbHNlLFxuICBpc0ZldGNoZWQ6IGZhbHNlLFxuICBtZXNzYWdlOiBcIlByb2plY3QgQmlsbCBJbmZvcm1hdGlvbiBOb3QgQXZhaWxhYmxlXCIsXG59O1xuXG5jb25zdCBnZXRQcm9qZWN0QmlsbFJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBQUk9KRUNUX0JJTExJTkdfSU5GT19TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHByb2plY3RCaWxsOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgaXNSZXRyaWV2aW5nOiBmYWxzZSxcbiAgICAgICAgaXNGZXRjaGVkOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiBcIlByb2plY3QgQmlsbCBmZXRjaGVkXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBHRVRUSU5HX1BST0pFQ1RfQklMTElOR19JTkZPOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzUmV0cmlldmluZzogdHJ1ZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIFBST0pFQ1RfQklMTElOR19JTkZPX0ZBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVzc2FnZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlzRmV0Y2hlZDogZmFsc2UsXG4gICAgICAgIGlzUmV0cmlldmluZzogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGdldFByb2plY3RCaWxsUmVkdWNlcjsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUNFRSw0QkFBNEIsRUFDNUJDLDRCQUE0QixFQUM1QkMseUJBQXlCLFFBQ3BCLHdCQUF3QjtBQUUvQixNQUFNQyxZQUFZLElBQUFMLGNBQUEsR0FBQU0sQ0FBQSxPQUFHO0VBQ25CQyxXQUFXLEVBQUUsRUFBRTtFQUNmQyxZQUFZLEVBQUUsS0FBSztFQUNuQkMsU0FBUyxFQUFFLEtBQUs7RUFDaEJDLE9BQU8sRUFBRTtBQUNYLENBQUM7QUFBQ1YsY0FBQSxHQUFBTSxDQUFBO0FBRUYsTUFBTUsscUJBQXFCLEdBQUdBLENBQUNDLEtBQUssSUFBQVosY0FBQSxHQUFBYSxDQUFBLFVBQUdSLFlBQVksR0FBRVMsTUFBTSxLQUFLO0VBQUFkLGNBQUEsR0FBQWUsQ0FBQTtFQUFBZixjQUFBLEdBQUFNLENBQUE7RUFDOUQsUUFBUVEsTUFBTSxDQUFDRSxJQUFJO0lBQ2pCLEtBQUtiLDRCQUE0QjtNQUFBSCxjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQy9CLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JMLFdBQVcsRUFBRU8sTUFBTSxDQUFDRyxPQUFPO1FBQzNCVCxZQUFZLEVBQUUsS0FBSztRQUNuQkMsU0FBUyxFQUFFLElBQUk7UUFDZkMsT0FBTyxFQUFFO01BQ1gsQ0FBQztJQUVILEtBQUtSLDRCQUE0QjtNQUFBRixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTSxDQUFBO01BQy9CLE9BQU87UUFDTCxHQUFHTSxLQUFLO1FBQ1JKLFlBQVksRUFBRTtNQUNoQixDQUFDO0lBRUgsS0FBS0oseUJBQXlCO01BQUFKLGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDNUIsT0FBTztRQUNMLEdBQUdNLEtBQUs7UUFDUkYsT0FBTyxFQUFFSSxNQUFNLENBQUNHLE9BQU87UUFDdkJSLFNBQVMsRUFBRSxLQUFLO1FBQ2hCRCxZQUFZLEVBQUU7TUFDaEIsQ0FBQztJQUVIO01BQUFSLGNBQUEsR0FBQWEsQ0FBQTtNQUFBYixjQUFBLEdBQUFNLENBQUE7TUFDRSxPQUFPTSxLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUNELGVBQWVELHFCQUFxQiJ9