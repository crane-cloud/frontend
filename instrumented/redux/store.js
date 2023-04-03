function cov_25sbmk0ada() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/store.js";
  var hash = "6016e7cc4791d7c7e5e8ce5b900d76c357b157f5";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/redux/store.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 23
        },
        end: {
          line: 7,
          column: 34
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "6016e7cc4791d7c7e5e8ce5b900d76c357b157f5"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_25sbmk0ada = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_25sbmk0ada();
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { loadState } from "../helpers/localStorage";
const persistedState = (cov_25sbmk0ada().s[0]++, loadState());
export default createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjVzYm1rMGFkYSIsImFjdHVhbENvdmVyYWdlIiwiY3JlYXRlU3RvcmUiLCJhcHBseU1pZGRsZXdhcmUiLCJjb21wb3NlV2l0aERldlRvb2xzIiwidGh1bmsiLCJyb290UmVkdWNlciIsImxvYWRTdGF0ZSIsInBlcnNpc3RlZFN0YXRlIiwicyJdLCJzb3VyY2VzIjpbInN0b3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tIFwicmVkdXhcIjtcbmltcG9ydCB7IGNvbXBvc2VXaXRoRGV2VG9vbHMgfSBmcm9tIFwicmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uXCI7XG5pbXBvcnQgdGh1bmsgZnJvbSBcInJlZHV4LXRodW5rXCI7XG5pbXBvcnQgcm9vdFJlZHVjZXIgZnJvbSBcIi4vcmVkdWNlcnNcIjtcbmltcG9ydCB7IGxvYWRTdGF0ZSB9IGZyb20gXCIuLi9oZWxwZXJzL2xvY2FsU3RvcmFnZVwiO1xuXG5jb25zdCBwZXJzaXN0ZWRTdGF0ZSA9IGxvYWRTdGF0ZSgpO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShcbiAgcm9vdFJlZHVjZXIsXG4gIHBlcnNpc3RlZFN0YXRlLFxuICBjb21wb3NlV2l0aERldlRvb2xzKGFwcGx5TWlkZGxld2FyZSh0aHVuaykpXG4pO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUFTRSxXQUFXLEVBQUVDLGVBQWUsUUFBUSxPQUFPO0FBQ3BELFNBQVNDLG1CQUFtQixRQUFRLDBCQUEwQjtBQUM5RCxPQUFPQyxLQUFLLE1BQU0sYUFBYTtBQUMvQixPQUFPQyxXQUFXLE1BQU0sWUFBWTtBQUNwQyxTQUFTQyxTQUFTLFFBQVEseUJBQXlCO0FBRW5ELE1BQU1DLGNBQWMsSUFBQVIsY0FBQSxHQUFBUyxDQUFBLE9BQUdGLFNBQVMsRUFBRTtBQUVsQyxlQUFlTCxXQUFXLENBQ3hCSSxXQUFXLEVBQ1hFLGNBQWMsRUFDZEosbUJBQW1CLENBQUNELGVBQWUsQ0FBQ0UsS0FBSyxDQUFDLENBQUMsQ0FDNUMifQ==