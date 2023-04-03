function cov_jsee3bga() {
  var path = "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/helpers/flutterwaveconfig.js";
  var hash = "e0365c9980d5c7dc58370ee64afa52ca21573241";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/greatest/Desktop/code/cranecloud/frontend/em/frontend/src/helpers/flutterwaveconfig.js",
    statementMap: {
      "0": {
        start: {
          line: 2,
          column: 22
        },
        end: {
          line: 21,
          column: 5
        }
      },
      "1": {
        start: {
          line: 3,
          column: 19
        },
        end: {
          line: 19,
          column: 7
        }
      },
      "2": {
        start: {
          line: 20,
          column: 6
        },
        end: {
          line: 20,
          column: 19
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 2,
            column: 22
          },
          end: {
            line: 2,
            column: 23
          }
        },
        loc: {
          start: {
            line: 2,
            column: 43
          },
          end: {
            line: 21,
            column: 5
          }
        },
        line: 2
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "e0365c9980d5c7dc58370ee64afa52ca21573241"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_jsee3bga = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_jsee3bga();
import { FLUTTER_WAVE_PUBLIC_KEY } from "../config";
cov_jsee3bga().s[0]++;
export const Config = (amount, customer) => {
  cov_jsee3bga().f[0]++;
  const config = (cov_jsee3bga().s[1]++, {
    public_key: FLUTTER_WAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount,
    currency: 'UGX',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: customer.email,
      phonenumber: '',
      name: customer.name
    },
    customizations: {
      title: 'Crane Cloud bill Payment',
      description: 'Payment for project overall usage',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg'
    }
  });
  cov_jsee3bga().s[2]++;
  return config;
};
export default Config;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfanNlZTNiZ2EiLCJhY3R1YWxDb3ZlcmFnZSIsIkZMVVRURVJfV0FWRV9QVUJMSUNfS0VZIiwicyIsIkNvbmZpZyIsImFtb3VudCIsImN1c3RvbWVyIiwiZiIsImNvbmZpZyIsInB1YmxpY19rZXkiLCJ0eF9yZWYiLCJEYXRlIiwibm93IiwiY3VycmVuY3kiLCJwYXltZW50X29wdGlvbnMiLCJlbWFpbCIsInBob25lbnVtYmVyIiwibmFtZSIsImN1c3RvbWl6YXRpb25zIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImxvZ28iXSwic291cmNlcyI6WyJmbHV0dGVyd2F2ZWNvbmZpZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGTFVUVEVSX1dBVkVfUFVCTElDX0tFWX0gZnJvbSBcIi4uL2NvbmZpZ1wiXG5leHBvcnQgY29uc3QgQ29uZmlnID0gKGFtb3VudCxjdXN0b21lcikgPT4ge1xuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgcHVibGljX2tleTogRkxVVFRFUl9XQVZFX1BVQkxJQ19LRVksXG4gICAgICAgIHR4X3JlZjogRGF0ZS5ub3coKSxcbiAgICAgICAgYW1vdW50LFxuICAgICAgICBjdXJyZW5jeTogJ1VHWCcsXG4gICAgICAgIHBheW1lbnRfb3B0aW9uczogJ2NhcmQsbW9iaWxlbW9uZXksdXNzZCcsXG4gICAgICAgIGN1c3RvbWVyOiB7XG4gICAgICAgICAgZW1haWw6IGN1c3RvbWVyLmVtYWlsLFxuICAgICAgICAgIHBob25lbnVtYmVyOiAnJyxcbiAgICAgICAgICBuYW1lOiBjdXN0b21lci5uYW1lLFxuICAgICAgICB9LFxuICAgICAgICBjdXN0b21pemF0aW9uczoge1xuICAgICAgICAgIHRpdGxlOiAnQ3JhbmUgQ2xvdWQgYmlsbCBQYXltZW50JyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1BheW1lbnQgZm9yIHByb2plY3Qgb3ZlcmFsbCB1c2FnZScsXG4gICAgICAgICAgbG9nbzogJ2h0dHBzOi8vc3QyLmRlcG9zaXRwaG90b3MuY29tLzQ0MDMyOTEvNzQxOC92LzQ1MC9kZXBvc2l0cGhvdG9zXzc0MTg5NjYxLXN0b2NrLWlsbHVzdHJhdGlvbi1vbmxpbmUtc2hvcC1sb2cuanBnJyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICByZXR1cm4gY29uZmlnXG4gICAgfVxuXG4gIGV4cG9ydCBkZWZhdWx0IENvbmZpZzsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLFlBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELFlBQUE7QUFmWixTQUFTRSx1QkFBdUIsUUFBTyxXQUFXO0FBQUFGLFlBQUEsR0FBQUcsQ0FBQTtBQUNsRCxPQUFPLE1BQU1DLE1BQU0sR0FBR0EsQ0FBQ0MsTUFBTSxFQUFDQyxRQUFRLEtBQUs7RUFBQU4sWUFBQSxHQUFBTyxDQUFBO0VBQ3ZDLE1BQU1DLE1BQU0sSUFBQVIsWUFBQSxHQUFBRyxDQUFBLE9BQUc7SUFDWE0sVUFBVSxFQUFFUCx1QkFBdUI7SUFDbkNRLE1BQU0sRUFBRUMsSUFBSSxDQUFDQyxHQUFHLEVBQUU7SUFDbEJQLE1BQU07SUFDTlEsUUFBUSxFQUFFLEtBQUs7SUFDZkMsZUFBZSxFQUFFLHVCQUF1QjtJQUN4Q1IsUUFBUSxFQUFFO01BQ1JTLEtBQUssRUFBRVQsUUFBUSxDQUFDUyxLQUFLO01BQ3JCQyxXQUFXLEVBQUUsRUFBRTtNQUNmQyxJQUFJLEVBQUVYLFFBQVEsQ0FBQ1c7SUFDakIsQ0FBQztJQUNEQyxjQUFjLEVBQUU7TUFDZEMsS0FBSyxFQUFFLDBCQUEwQjtNQUNqQ0MsV0FBVyxFQUFFLG1DQUFtQztNQUNoREMsSUFBSSxFQUFFO0lBQ1I7RUFDRixDQUFDO0VBQUNyQixZQUFBLEdBQUFHLENBQUE7RUFDRixPQUFPSyxNQUFNO0FBQ2YsQ0FBQztBQUVILGVBQWVKLE1BQU0ifQ==