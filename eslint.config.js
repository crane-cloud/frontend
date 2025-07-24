import mantine from "eslint-config-mantine";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import typescriptEslintParser from "@typescript-eslint/parser";

export default tseslint.config(
  {
    ignores: [
      "dist/",
      "dist/**",
      "build/",
      "build/**",
      "node_modules/",
      "node_modules/**",
      "public/",
      "public/**",
      "**/*.{mjs,cjs,js,d.ts,d.mts}",
      ".storybook/main.ts",
      "vite-env.d.ts",
      "*.config.js",
    ],
  },
  ...mantine,
  {
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
  }
);
