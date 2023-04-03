function cov_10nr02z1kz() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/projectNetwork.js";
  var hash = "4d04bd8e9059a27fd238d54c088655b1ad11311f";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/reducers/projectNetwork.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
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
          line: 55,
          column: 1
        }
      },
      "2": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 54,
          column: 3
        }
      },
      "3": {
        start: {
          line: 17,
          column: 6
        },
        end: {
          line: 25,
          column: 8
        }
      },
      "4": {
        start: {
          line: 28,
          column: 6
        },
        end: {
          line: 36,
          column: 8
        }
      },
      "5": {
        start: {
          line: 39,
          column: 6
        },
        end: {
          line: 42,
          column: 8
        }
      },
      "6": {
        start: {
          line: 45,
          column: 6
        },
        end: {
          line: 50,
          column: 8
        }
      },
      "7": {
        start: {
          line: 53,
          column: 6
        },
        end: {
          line: 53,
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
            line: 55,
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
            line: 54,
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
            line: 25,
            column: 8
          }
        }, {
          start: {
            line: 27,
            column: 4
          },
          end: {
            line: 36,
            column: 8
          }
        }, {
          start: {
            line: 38,
            column: 4
          },
          end: {
            line: 42,
            column: 8
          }
        }, {
          start: {
            line: 44,
            column: 4
          },
          end: {
            line: 50,
            column: 8
          }
        }, {
          start: {
            line: 52,
            column: 4
          },
          end: {
            line: 53,
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
    hash: "4d04bd8e9059a27fd238d54c088655b1ad11311f"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_10nr02z1kz = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_10nr02z1kz();
import { FETCH_PROJECT_NETWORK_SUCCESS, FETCH_PROJECT_NETWORK_FAILED, IS_FETCHING_PROJECT_NETWORK, CLEAR_PROJECT_NETWORK } from "../actions/actionTypes";
const initialState = (cov_10nr02z1kz().s[0]++, {
  networkMetrics: [],
  isFetchingNetwork: false,
  networkMessage: ""
});
cov_10nr02z1kz().s[1]++;
const projectNetworkReducer = (state = (cov_10nr02z1kz().b[0][0]++, initialState), action) => {
  cov_10nr02z1kz().f[0]++;
  cov_10nr02z1kz().s[2]++;
  switch (action.type) {
    case FETCH_PROJECT_NETWORK_SUCCESS:
      cov_10nr02z1kz().b[1][0]++;
      cov_10nr02z1kz().s[3]++;
      return {
        ...state,
        networkMetrics: [...state.networkMetrics, {
          project: action.payload?.project,
          metrics: action.payload?.metrics
        }],
        isFetchingNetwork: false,
        networkMessage: "Fetched project network metrics"
      };
    case FETCH_PROJECT_NETWORK_FAILED:
      cov_10nr02z1kz().b[1][1]++;
      cov_10nr02z1kz().s[4]++;
      return {
        ...state,
        networkMetrics: [...state.networkMetrics, {
          project: action.payload?.project,
          metrics: action.payload?.metrics
        }],
        isFetchingNetwork: false,
        networkMessage: "Error fetching project network metrics"
      };
    case IS_FETCHING_PROJECT_NETWORK:
      cov_10nr02z1kz().b[1][2]++;
      cov_10nr02z1kz().s[5]++;
      return {
        ...state,
        isFetchingNetwork: true
      };
    case CLEAR_PROJECT_NETWORK:
      cov_10nr02z1kz().b[1][3]++;
      cov_10nr02z1kz().s[6]++;
      return {
        ...state,
        networkMetrics: [],
        isFetchingNetwork: false,
        networkMessage: ""
      };
    default:
      cov_10nr02z1kz().b[1][4]++;
      cov_10nr02z1kz().s[7]++;
      return state;
  }
};
export default projectNetworkReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTBucjAyejFreiIsImFjdHVhbENvdmVyYWdlIiwiRkVUQ0hfUFJPSkVDVF9ORVRXT1JLX1NVQ0NFU1MiLCJGRVRDSF9QUk9KRUNUX05FVFdPUktfRkFJTEVEIiwiSVNfRkVUQ0hJTkdfUFJPSkVDVF9ORVRXT1JLIiwiQ0xFQVJfUFJPSkVDVF9ORVRXT1JLIiwiaW5pdGlhbFN0YXRlIiwicyIsIm5ldHdvcmtNZXRyaWNzIiwiaXNGZXRjaGluZ05ldHdvcmsiLCJuZXR3b3JrTWVzc2FnZSIsInByb2plY3ROZXR3b3JrUmVkdWNlciIsInN0YXRlIiwiYiIsImFjdGlvbiIsImYiLCJ0eXBlIiwicHJvamVjdCIsInBheWxvYWQiLCJtZXRyaWNzIl0sInNvdXJjZXMiOlsicHJvamVjdE5ldHdvcmsuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRkVUQ0hfUFJPSkVDVF9ORVRXT1JLX1NVQ0NFU1MsXG4gIEZFVENIX1BST0pFQ1RfTkVUV09SS19GQUlMRUQsXG4gIElTX0ZFVENISU5HX1BST0pFQ1RfTkVUV09SSyxcbiAgQ0xFQVJfUFJPSkVDVF9ORVRXT1JLLFxufSBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25UeXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIG5ldHdvcmtNZXRyaWNzOiBbXSxcbiAgaXNGZXRjaGluZ05ldHdvcms6IGZhbHNlLFxuICBuZXR3b3JrTWVzc2FnZTogXCJcIixcbn07XG5cbmNvbnN0IHByb2plY3ROZXR3b3JrUmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEZFVENIX1BST0pFQ1RfTkVUV09SS19TVUNDRVNTOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG5ldHdvcmtNZXRyaWNzOiBbXG4gICAgICAgICAgLi4uc3RhdGUubmV0d29ya01ldHJpY3MsXG4gICAgICAgICAgeyBwcm9qZWN0OiBhY3Rpb24ucGF5bG9hZD8ucHJvamVjdCwgbWV0cmljczogYWN0aW9uLnBheWxvYWQ/Lm1ldHJpY3MgfSxcbiAgICAgICAgXSxcbiAgICAgICAgaXNGZXRjaGluZ05ldHdvcms6IGZhbHNlLFxuICAgICAgICBuZXR3b3JrTWVzc2FnZTogXCJGZXRjaGVkIHByb2plY3QgbmV0d29yayBtZXRyaWNzXCIsXG4gICAgICB9O1xuXG4gICAgY2FzZSBGRVRDSF9QUk9KRUNUX05FVFdPUktfRkFJTEVEOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG5ldHdvcmtNZXRyaWNzOiBbXG4gICAgICAgICAgLi4uc3RhdGUubmV0d29ya01ldHJpY3MsXG4gICAgICAgICAgeyBwcm9qZWN0OiBhY3Rpb24ucGF5bG9hZD8ucHJvamVjdCwgbWV0cmljczogYWN0aW9uLnBheWxvYWQ/Lm1ldHJpY3MgfSxcbiAgICAgICAgXSxcbiAgICAgICAgaXNGZXRjaGluZ05ldHdvcms6IGZhbHNlLFxuICAgICAgICBuZXR3b3JrTWVzc2FnZTogXCJFcnJvciBmZXRjaGluZyBwcm9qZWN0IG5ldHdvcmsgbWV0cmljc1wiLFxuICAgICAgfTtcblxuICAgIGNhc2UgSVNfRkVUQ0hJTkdfUFJPSkVDVF9ORVRXT1JLOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzRmV0Y2hpbmdOZXR3b3JrOiB0cnVlLFxuICAgICAgfTtcblxuICAgIGNhc2UgQ0xFQVJfUFJPSkVDVF9ORVRXT1JLOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG5ldHdvcmtNZXRyaWNzOiBbXSxcbiAgICAgICAgaXNGZXRjaGluZ05ldHdvcms6IGZhbHNlLFxuICAgICAgICBuZXR3b3JrTWVzc2FnZTogXCJcIixcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5leHBvcnQgZGVm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