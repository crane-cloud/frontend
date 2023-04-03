function cov_27utfzlch5() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/updateProfile.js";
  var hash = "d057e733b3ba27d45decb9d23ec8047e9aec0f6d";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/updateProfile.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 23
        },
        end: {
          line: 11,
          column: 3
        }
      },
      "1": {
        start: {
          line: 13,
          column: 31
        },
        end: {
          line: 52,
          column: 3
        }
      },
      "2": {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 51,
          column: 5
        }
      },
      "3": {
        start: {
          line: 16,
          column: 8
        },
        end: {
          line: 22,
          column: 10
        }
      },
      "4": {
        start: {
          line: 25,
          column: 8
        },
        end: {
          line: 30,
          column: 10
        }
      },
      "5": {
        start: {
          line: 32,
          column: 8
        },
        end: {
          line: 38,
          column: 10
        }
      },
      "6": {
        start: {
          line: 41,
          column: 8
        },
        end: {
          line: 47,
          column: 10
        }
      },
      "7": {
        start: {
          line: 50,
          column: 8
        },
        end: {
          line: 50,
          column: 21
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 13,
            column: 31
          },
          end: {
            line: 13,
            column: 32
          }
        },
        loc: {
          start: {
            line: 13,
            column: 65
          },
          end: {
            line: 52,
            column: 3
          }
        },
        line: 13
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 13,
            column: 32
          },
          end: {
            line: 13,
            column: 52
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 13,
            column: 40
          },
          end: {
            line: 13,
            column: 52
          }
        }],
        line: 13
      },
      "1": {
        loc: {
          start: {
            line: 14,
            column: 4
          },
          end: {
            line: 51,
            column: 5
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 15,
            column: 6
          },
          end: {
            line: 23,
            column: 7
          }
        }, {
          start: {
            line: 24,
            column: 6
          },
          end: {
            line: 30,
            column: 10
          }
        }, {
          start: {
            line: 31,
            column: 6
          },
          end: {
            line: 38,
            column: 10
          }
        }, {
          start: {
            line: 40,
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
            line: 50,
            column: 21
          }
        }],
        line: 14
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
    hash: "d057e733b3ba27d45decb9d23ec8047e9aec0f6d"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_27utfzlch5 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_27utfzlch5();
import { START_UPDATING_PROFILE, CLEAR_UPDATE_PROFILE_STATE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL } from "../actions/actionTypes";
const initialState = (cov_27utfzlch5().s[0]++, {
  profileUpdated: false,
  profileUpdating: false,
  errorMessage: ""
});
cov_27utfzlch5().s[1]++;
const updateProfileReducer = (state = (cov_27utfzlch5().b[0][0]++, initialState), action) => {
  cov_27utfzlch5().f[0]++;
  cov_27utfzlch5().s[2]++;
  switch (action.type) {
    case UPDATE_PROFILE_SUCCESS:
      cov_27utfzlch5().b[1][0]++;
      {
        cov_27utfzlch5().s[3]++;
        return {
          ...state,
          profileUpdateFailed: false,
          profileUpdated: true,
          profileUpdating: false,
          errorMessage: ""
        };
      }
    case START_UPDATING_PROFILE:
      cov_27utfzlch5().b[1][1]++;
      cov_27utfzlch5().s[4]++;
      return {
        ...state,
        profileUpdated: false,
        profileUpdating: true,
        profileUpdateFailed: false
      };
    case UPDATE_PROFILE_FAIL:
      cov_27utfzlch5().b[1][2]++;
      cov_27utfzlch5().s[5]++;
      return {
        ...state,
        profileUpdateFailed: true,
        profileUpdated: false,
        profileUpdating: false,
        errorMessage: "Failed to update profile"
      };
    case CLEAR_UPDATE_PROFILE_STATE:
      cov_27utfzlch5().b[1][3]++;
      cov_27utfzlch5().s[6]++;
      return {
        ...state,
        profileUpdateFailed: false,
        profileUpdated: false,
        profileUpdating: false,
        errorMessage: ""
      };
    default:
      cov_27utfzlch5().b[1][4]++;
      cov_27utfzlch5().s[7]++;
      return state;
  }
};
export default updateProfileReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjd1dGZ6bGNoNSIsImFjdHVhbENvdmVyYWdlIiwiU1RBUlRfVVBEQVRJTkdfUFJPRklMRSIsIkNMRUFSX1VQREFURV9QUk9GSUxFX1NUQVRFIiwiVVBEQVRFX1BST0ZJTEVfU1VDQ0VTUyIsIlVQREFURV9QUk9GSUxFX0ZBSUwiLCJpbml0aWFsU3RhdGUiLCJzIiwicHJvZmlsZVVwZGF0ZWQiLCJwcm9maWxlVXBkYXRpbmciLCJlcnJvck1lc3NhZ2UiLCJ1cGRhdGVQcm9maWxlUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicHJvZmlsZVVwZGF0ZUZhaWxlZCJdLCJzb3VyY2VzIjpbInVwZGF0ZVByb2ZpbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBTVEFSVF9VUERBVElOR19QUk9GSUxFLFxuICAgIENMRUFSX1VQREFURV9QUk9GSUxFX1NUQVRFLFxuICAgIFVQREFURV9QUk9GSUxFX1NVQ0NFU1MsXG4gICAgVVBEQVRFX1BST0ZJTEVfRkFJTCxcbiAgfSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuICBjb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgcHJvZmlsZVVwZGF0ZWQ6IGZhbHNlLFxuICAgIHByb2ZpbGVVcGRhdGluZzogZmFsc2UsXG4gICAgZXJyb3JNZXNzYWdlOiBcIlwiLFxuICB9O1xuICBcbiAgY29uc3QgdXBkYXRlUHJvZmlsZVJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgVVBEQVRFX1BST0ZJTEVfU1VDQ0VTUzoge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHByb2ZpbGVVcGRhdGVGYWlsZWQ6IGZhbHNlLFxuICAgICAgICAgIHByb2ZpbGVVcGRhdGVkOiB0cnVlLFxuICAgICAgICAgIHByb2ZpbGVVcGRhdGluZzogZmFsc2UsXG4gICAgICAgICAgZXJyb3JNZXNzYWdlOiBcIlwiLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgY2FzZSBTVEFSVF9VUERBVElOR19QUk9GSUxFOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHByb2ZpbGVVcGRhdGVkOiBmYWxzZSxcbiAgICAgICAgICBwcm9maWxlVXBkYXRpbmc6IHRydWUsXG4gICAgICAgICAgcHJvZmlsZVVwZGF0ZUZhaWxlZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICBjYXNlIFVQREFURV9QUk9GSUxFX0ZBSUw6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgcHJvZmlsZVVwZGF0ZUZhaWxlZDogdHJ1ZSxcbiAgICAgICAgICBwcm9maWxlVXBkYXRlZDogZmFsc2UsXG4gICAgICAgICAgcHJvZmlsZVVwZGF0aW5nOiBmYWxzZSxcbiAgICAgICAgICBlcnJvck1lc3NhZ2U6IFwiRmFpbGVkIHRvIHVwZGF0ZSBwcm9maWxlXCIsXG4gICAgICAgIH07XG4gIFxuICAgICAgY2FzZSBDTEVBUl9VUERBVEVfUFJPRklMRV9TVEFURTpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBwcm9maWxlVXBkYXRlRmFpbGVkOiBmYWxzZSxcbiAgICAgICAgICBwcm9maWxlVXBkYXRlZDogZmFsc2UsXG4gICAgICAgICAgcHJvZmlsZVVwZGF0aW5nOiBmYWxzZSxcbiAgICAgICAgICBlcnJvck1lc3NhZ2U6IFwiXCIsXG4gICAgICAgIH07XG4gIFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfTtcbiAgXG4gIGV4cG9ydCBkZWZhdWx0IHVwZGF0ZVByb2ZpbGVSZWR1Y2VyO1xuICAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLFNBQ0lFLHNCQUFzQixFQUN0QkMsMEJBQTBCLEVBQzFCQyxzQkFBc0IsRUFDdEJDLG1CQUFtQixRQUNkLHdCQUF3QjtBQUMvQixNQUFNQyxZQUFZLElBQUFOLGNBQUEsR0FBQU8sQ0FBQSxPQUFHO0VBQ25CQyxjQUFjLEVBQUUsS0FBSztFQUNyQkMsZUFBZSxFQUFFLEtBQUs7RUFDdEJDLFlBQVksRUFBRTtBQUNoQixDQUFDO0FBQUNWLGNBQUEsR0FBQU8sQ0FBQTtBQUVGLE1BQU1JLG9CQUFvQixHQUFHQSxDQUFDQyxLQUFLLElBQUFaLGNBQUEsR0FBQWEsQ0FBQSxVQUFHUCxZQUFZLEdBQUVRLE1BQU0sS0FBSztFQUFBZCxjQUFBLEdBQUFlLENBQUE7RUFBQWYsY0FBQSxHQUFBTyxDQUFBO0VBQzdELFFBQVFPLE1BQU0sQ0FBQ0UsSUFBSTtJQUNqQixLQUFLWixzQkFBc0I7TUFBQUosY0FBQSxHQUFBYSxDQUFBO01BQUU7UUFBQWIsY0FBQSxHQUFBTyxDQUFBO1FBQzNCLE9BQU87VUFDTCxHQUFHSyxLQUFLO1VBQ1JLLG1CQUFtQixFQUFFLEtBQUs7VUFDMUJULGNBQWMsRUFBRSxJQUFJO1VBQ3BCQyxlQUFlLEVBQUUsS0FBSztVQUN0QkMsWUFBWSxFQUFFO1FBQ2hCLENBQUM7TUFDSDtJQUNBLEtBQUtSLHNCQUFzQjtNQUFBRixjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTyxDQUFBO01BQ3pCLE9BQU87UUFDTCxHQUFHSyxLQUFLO1FBQ1JKLGNBQWMsRUFBRSxLQUFLO1FBQ3JCQyxlQUFlLEVBQUUsSUFBSTtRQUNyQlEsbUJBQW1CLEVBQUU7TUFDdkIsQ0FBQztJQUNILEtBQUtaLG1CQUFtQjtNQUFBTCxjQUFBLEdBQUFhLENBQUE7TUFBQWIsY0FBQSxHQUFBTyxDQUFBO01BQ3RCLE9BQU87UUFDTCxHQUFHSyxLQUFLO1FBQ1JLLG1CQUFtQixFQUFFLElBQUk7UUFDekJULGNBQWMsRUFBRSxLQUFLO1FBQ3JCQyxlQUFlLEVBQUUsS0FBSztRQUN0QkMsWUFBWSxFQUFFO01BQ2hCLENBQUM7SUFFSCxLQUFLUCwwQkFBMEI7TUFBQUgsY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU8sQ0FBQTtNQUM3QixPQUFPO1FBQ0wsR0FBR0ssS0FBSztRQUNSSyxtQkFBbUIsRUFBRSxLQUFLO1FBQzFCVCxjQUFjLEVBQUUsS0FBSztRQUNyQkMsZUFBZSxFQUFFLEtBQUs7UUFDdEJDLFlBQVksRUFBRTtNQUNoQixDQUFDO0lBRUg7TUFBQVYsY0FBQSxHQUFBYSxDQUFBO01BQUFiLGNBQUEsR0FBQU8sQ0FBQTtNQUNFLE9BQU9LLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBRUQsZUFBZUQsb0JBQW9CIn0=