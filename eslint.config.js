import mantine from "eslint-config-mantine";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import typescriptEslintParser from "@typescript-eslint/parser";

export default tseslint.config(...mantine, {
  ignores: [
    "**/*.{mjs,cjs,js,d.ts,d.mts}",
    "./.storybook/main.ts",
    "node_modules",
    "build",
    "dist",
    "public",
  ],
  languageOptions: {
    parser: typescriptEslintParser,
    ecmaVersion: 2020,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    prettier: eslintPluginPrettier,
    react: eslintPluginReact,
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
});
