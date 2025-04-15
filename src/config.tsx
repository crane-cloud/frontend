// Staging Url
export const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
// docs Url
export const DOCS_URL = import.meta.env.VITE_APP_DOCS_URL;
export const BLOG_URL = import.meta.env.VITE_APP_BLOG_URL;
export const STATUS_MONITORING_URL = import.meta.env.VITE_APP_MONITORING_APP;
//mira Url
export const MIRA_API_URL = import.meta.env.VITE_APP_MIRA_API_URL;
//github auth urls
export const GIT_REDIRECT_URL = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_APP_GITHUB_CLEINT_ID}&scope=read:user,user:email`;
export const FLUTTER_WAVE_PUBLIC_KEY = import.meta.env
  .VITE_APP_FLUTTERWAVE_PUBLIC_KEY_TESTING;
//for live exchange rate
export const LIVE_EXCHANGE_RATE_API = `https://openexchangerates.org/api/latest.json?app_id=${import.meta.env.VITE_APP_EXCHANGE_RATE_KEY}`;
export const GITLAB_URL =
  "https://gitlab-ce-32b64b3f-fc91-4331-bf7e.cranecloud.io/users/sign_in";
export const GOPLAYGROUND_URL = "https://go.dev.cranecloud.io/";
export const MIRA_DOCS_URL =
  "https://docs.cranecloud.io/applications/deployWithMira/";

// microservices
export const DATABASE_API_URL = import.meta.env.VITE_APP_DATABASE_API_URL;
export const ACTIVITY_LOGS_API_URL = import.meta.env
  .VITE_APP_ACTIVITY_LOGS_API_URL;
export const MONITORING_API_URL = import.meta.env.VITE_APP_MONITORING_API_URL;
export const MLOPS_API_URL = import.meta.env.VITE_APP_MLOPS_API_URL;
