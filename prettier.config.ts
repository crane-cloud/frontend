import { type Config } from "prettier";

const config: Config = {
  // Basic formatting
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",

  // Override specific file types
  overrides: [
    {
      files: "*.ts,*.tsx",
      options: {
        parser: "typescript",
      },
    },
    {
      files: "*.json",
      options: {
        printWidth: 100,
      },
    },
  ],
};

export default config;
