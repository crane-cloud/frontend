// Staging Url
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// docs Url
export const DOCS_URL = "https://docs.cranecloud.io";
export const BLOG_URL = "https://medium.com/cranecloud";
export const APP_URL = "https://app.cranecloud.io";
//github auth urls
export const GIT_REDIRECT_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLEINT_ID}&scope=read:user,user:email`;
export const FLUTTER_WAVE_PUBLIC_KEY = process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY_TESTING
//for live exchange rate
export const LIVE_EXCHANGE_RATE_API = `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_EXCHANGE_RATE_KEY}`
