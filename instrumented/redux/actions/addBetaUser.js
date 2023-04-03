function cov_sycy1z2t9() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/addBetaUser.js";
  var hash = "b062e53850927d02147a1f5c19dc834a20d683c2";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/actions/addBetaUser.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 28
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 35
        },
        end: {
          line: 10,
          column: 1
        }
      },
      "2": {
        start: {
          line: 12,
          column: 27
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "3": {
        start: {
          line: 12,
          column: 42
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "4": {
        start: {
          line: 17,
          column: 24
        },
        end: {
          line: 22,
          column: 2
        }
      },
      "5": {
        start: {
          line: 17,
          column: 36
        },
        end: {
          line: 22,
          column: 1
        }
      },
      "6": {
        start: {
          line: 24,
          column: 20
        },
        end: {
          line: 33,
          column: 1
        }
      },
      "7": {
        start: {
          line: 24,
          column: 34
        },
        end: {
          line: 33,
          column: 1
        }
      },
      "8": {
        start: {
          line: 25,
          column: 2
        },
        end: {
          line: 25,
          column: 34
        }
      },
      "9": {
        start: {
          line: 27,
          column: 2
        },
        end: {
          line: 32,
          column: 7
        }
      },
      "10": {
        start: {
          line: 29,
          column: 24
        },
        end: {
          line: 29,
          column: 62
        }
      },
      "11": {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 31,
          column: 39
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 8,
            column: 28
          },
          end: {
            line: 8,
            column: 29
          }
        },
        loc: {
          start: {
            line: 8,
            column: 35
          },
          end: {
            line: 10,
            column: 1
          }
        },
        line: 8
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 12,
            column: 27
          },
          end: {
            line: 12,
            column: 28
          }
        },
        loc: {
          start: {
            line: 12,
            column: 42
          },
          end: {
            line: 15,
            column: 1
          }
        },
        line: 12
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 17,
            column: 24
          },
          end: {
            line: 17,
            column: 25
          }
        },
        loc: {
          start: {
            line: 17,
            column: 36
          },
          end: {
            line: 22,
            column: 1
          }
        },
        line: 17
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 24,
            column: 20
          },
          end: {
            line: 24,
            column: 21
          }
        },
        loc: {
          start: {
            line: 24,
            column: 34
          },
          end: {
            line: 33,
            column: 1
          }
        },
        line: 24
      },
      "4": {
        name: "(anonymous_4)",
        decl: {
          start: {
            line: 24,
            column: 34
          },
          end: {
            line: 24,
            column: 35
          }
        },
        loc: {
          start: {
            line: 24,
            column: 48
          },
          end: {
            line: 33,
            column: 1
          }
        },
        line: 24
      },
      "5": {
        name: "(anonymous_5)",
        decl: {
          start: {
            line: 29,
            column: 10
          },
          end: {
            line: 29,
            column: 11
          }
        },
        loc: {
          start: {
            line: 29,
            column: 24
          },
          end: {
            line: 29,
            column: 62
          }
        },
        line: 29
      },
      "6": {
        name: "(anonymous_6)",
        decl: {
          start: {
            line: 30,
            column: 11
          },
          end: {
            line: 30,
            column: 12
          }
        },
        loc: {
          start: {
            line: 30,
            column: 22
          },
          end: {
            line: 32,
            column: 5
          }
        },
        line: 30
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "b062e53850927d02147a1f5c19dc834a20d683c2"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_sycy1z2t9 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_sycy1z2t9();
import axios from "../../axios";
import { ADDING_BETA_USER, ADD_BETA_USER_SUCCESS, ADD_BETA_USER_FAIL } from "./actionTypes";
cov_sycy1z2t9().s[0]++;
const startAddingBetaUser = () => {
  cov_sycy1z2t9().f[0]++;
  cov_sycy1z2t9().s[1]++;
  return {
    type: ADDING_BETA_USER
  };
};
cov_sycy1z2t9().s[2]++;
const addBetaUserSuccess = response => {
  cov_sycy1z2t9().f[1]++;
  cov_sycy1z2t9().s[3]++;
  return {
    type: ADD_BETA_USER_SUCCESS,
    payload: response.data
  };
};
cov_sycy1z2t9().s[4]++;
const addBetaUserFail = error => {
  cov_sycy1z2t9().f[2]++;
  cov_sycy1z2t9().s[5]++;
  return {
    type: ADD_BETA_USER_FAIL,
    payload: {
      error: error.response
    }
  };
};
cov_sycy1z2t9().s[6]++;
const addBetaUser = userData => {
  cov_sycy1z2t9().f[3]++;
  cov_sycy1z2t9().s[7]++;
  return dispatch => {
    cov_sycy1z2t9().f[4]++;
    cov_sycy1z2t9().s[8]++;
    dispatch(startAddingBetaUser());
    cov_sycy1z2t9().s[9]++;
    return axios.patch(`/users/admin_update`, userData).then(response => {
      cov_sycy1z2t9().f[5]++;
      cov_sycy1z2t9().s[10]++;
      return dispatch(addBetaUserSuccess(response));
    }).catch(error => {
      cov_sycy1z2t9().f[6]++;
      cov_sycy1z2t9().s[11]++;
      dispatch(addBetaUserFail(error));
    });
  };
};
export default addBetaUser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3Zfc3ljeTF6MnQ5IiwiYWN0dWFsQ292ZXJhZ2UiLCJheGlvcyIsIkFERElOR19CRVRBX1VTRVIiLCJBRERfQkVUQV9VU0VSX1NVQ0NFU1MiLCJBRERfQkVUQV9VU0VSX0ZBSUwiLCJzIiwic3RhcnRBZGRpbmdCZXRhVXNlciIsImYiLCJ0eXBlIiwiYWRkQmV0YVVzZXJTdWNjZXNzIiwicmVzcG9uc2UiLCJwYXlsb2FkIiwiZGF0YSIsImFkZEJldGFVc2VyRmFpbCIsImVycm9yIiwiYWRkQmV0YVVzZXIiLCJ1c2VyRGF0YSIsImRpc3BhdGNoIiwicGF0Y2giLCJ0aGVuIiwiY2F0Y2giXSwic291cmNlcyI6WyJhZGRCZXRhVXNlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcIi4uLy4uL2F4aW9zXCI7XG5pbXBvcnQge1xuICBBRERJTkdfQkVUQV9VU0VSLFxuICBBRERfQkVUQV9VU0VSX1NVQ0NFU1MsXG4gIEFERF9CRVRBX1VTRVJfRkFJTCxcbn0gZnJvbSBcIi4vYWN0aW9uVHlwZXNcIjtcblxuY29uc3Qgc3RhcnRBZGRpbmdCZXRhVXNlciA9ICgpID0+ICh7XG4gIHR5cGU6IEFERElOR19CRVRBX1VTRVIsXG59KTtcblxuY29uc3QgYWRkQmV0YVVzZXJTdWNjZXNzID0gKHJlc3BvbnNlKSA9PiAoe1xuICB0eXBlOiBBRERfQkVUQV9VU0VSX1NVQ0NFU1MsXG4gIHBheWxvYWQ6IHJlc3BvbnNlLmRhdGEsXG59KTtcblxuY29uc3QgYWRkQmV0YVVzZXJGYWlsID0gKGVycm9yKSA9PiAoe1xuICB0eXBlOiBBRERfQkVUQV9VU0VSX0ZBSUwsXG4gIHBheWxvYWQ6IHtcbiAgICBlcnJvcjogZXJyb3IucmVzcG9uc2UsXG4gIH0sXG59KTtcblxuY29uc3QgYWRkQmV0YVVzZXIgPSAodXNlckRhdGEpID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaChzdGFydEFkZGluZ0JldGFVc2VyKCkpO1xuXG4gIHJldHVybiBheGlvc1xuICAgIC5wYXRjaChgL3VzZXJzL2FkbWluX3VwZGF0ZWAsIHVzZXJEYXRhKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gZGlzcGF0Y2goYWRkQmV0YVVzZXJTdWNjZXNzKHJlc3BvbnNlKSkpXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgZGlzcGF0Y2goYWRkQmV0YVVzZXJGYWlsKGVycm9yKSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGRCZXRhVXNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsYUFBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsYUFBQTtBQWZaLE9BQU9FLEtBQUssTUFBTSxhQUFhO0FBQy9CLFNBQ0VDLGdCQUFnQixFQUNoQkMscUJBQXFCLEVBQ3JCQyxrQkFBa0IsUUFDYixlQUFlO0FBQUNMLGFBQUEsR0FBQU0sQ0FBQTtBQUV2QixNQUFNQyxtQkFBbUIsR0FBR0EsQ0FBQSxLQUFPO0VBQUFQLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQTtJQUNqQ0csSUFBSSxFQUFFTjtFQUNSLENBQUM7QUFBRCxDQUFFO0FBQUNILGFBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1JLGtCQUFrQixHQUFJQyxRQUFRLElBQU07RUFBQVgsYUFBQSxHQUFBUSxDQUFBO0VBQUFSLGFBQUEsR0FBQU0sQ0FBQTtFQUFBO0lBQ3hDRyxJQUFJLEVBQUVMLHFCQUFxQjtJQUMzQlEsT0FBTyxFQUFFRCxRQUFRLENBQUNFO0VBQ3BCLENBQUM7QUFBRCxDQUFFO0FBQUNiLGFBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1RLGVBQWUsR0FBSUMsS0FBSyxJQUFNO0VBQUFmLGFBQUEsR0FBQVEsQ0FBQTtFQUFBUixhQUFBLEdBQUFNLENBQUE7RUFBQTtJQUNsQ0csSUFBSSxFQUFFSixrQkFBa0I7SUFDeEJPLE9BQU8sRUFBRTtNQUNQRyxLQUFLLEVBQUVBLEtBQUssQ0FBQ0o7SUFDZjtFQUNGLENBQUM7QUFBRCxDQUFFO0FBQUNYLGFBQUEsR0FBQU0sQ0FBQTtBQUVILE1BQU1VLFdBQVcsR0FBSUMsUUFBUSxJQUFLO0VBQUFqQixhQUFBLEdBQUFRLENBQUE7RUFBQVIsYUFBQSxHQUFBTSxDQUFBO0VBQUEsT0FBQ1ksUUFBUSxJQUFLO0lBQUFsQixhQUFBLEdBQUFRLENBQUE7SUFBQVIsYUFBQSxHQUFBTSxDQUFBO0lBQzlDWSxRQUFRLENBQUNYLG1CQUFtQixFQUFFLENBQUM7SUFBQ1AsYUFBQSxHQUFBTSxDQUFBO0lBRWhDLE9BQU9KLEtBQUssQ0FDVGlCLEtBQUssQ0FBRSxxQkFBb0IsRUFBRUYsUUFBUSxDQUFDLENBQ3RDRyxJQUFJLENBQUVULFFBQVEsSUFBSztNQUFBWCxhQUFBLEdBQUFRLENBQUE7TUFBQVIsYUFBQSxHQUFBTSxDQUFBO01BQUEsT0FBQVksUUFBUSxDQUFDUixrQkFBa0IsQ0FBQ0MsUUFBUSxDQUFDLENBQUM7SUFBRCxDQUFDLENBQUMsQ0FDMURVLEtBQUssQ0FBRU4sS0FBSyxJQUFLO01BQUFmLGFBQUEsR0FBQVEsQ0FBQTtNQUFBUixhQUFBLEdBQUFNLENBQUE7TUFDaEJZLFFBQVEsQ0FBQ0osZUFBZSxDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7RUFDTixDQUFDO0FBQUQsQ0FBQztBQUVELGVBQWVDLFdBQVcifQ==