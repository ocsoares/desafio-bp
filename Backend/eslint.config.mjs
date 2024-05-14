import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import typeScriptParser from "@typescript-eslint/parser";
import typeScriptPlugin from "@typescript-eslint/eslint-plugin";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import sonarLintPlugin from "eslint-plugin-sonarjs";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    prettierRecommended,
    sonarLintPlugin.configs.recommended,
    {
        languageOptions: {
            parser: typeScriptParser,
            parserOptions: {
                project: "tsconfig.json",
                tsconfigRootDir: ".",
                ecmaVersion: 2020,
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": typeScriptPlugin,
        },
        files: ["src/**/*.ts", "apps/**/*.ts", "libs/**/*.ts", "test/**/*.ts"],
        ignores: ["eslint.config.mjs", "/*.js", "node_modules", "dist"],
        rules: {
            "prefer-template": "error",
            "prettier/prettier": [
                "error",
                { endOfLine: "auto", singleQuote: false },
            ],
            "prefer-destructuring": [
                "error",
                {
                    array: true,
                    object: true,
                },
                {},
            ],
            "@typescript-eslint/linebreak-style": "off",
            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "object-property-newline": [
                "error",
                { allowAllPropertiesOnSameLine: true },
            ],
            "no-multiple-empty-lines": ["error", { max: 1 }],
            "space-before-blocks": ["error", "always"],
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "*", next: "return" },
                { blankLine: "always", prev: "*", next: "function" },
                {
                    blankLine: "always",
                    prev: ["const", "let", "var"],
                    next: "*",
                },
                {
                    blankLine: "any",
                    prev: ["const", "let", "var"],
                    next: ["const", "let", "var"],
                },
            ],
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "variable",
                    format: [
                        "camelCase",
                        "PascalCase",
                        "UPPER_CASE",
                        "snake_case",
                    ],
                    leadingUnderscore: "forbid",
                    trailingUnderscore: "allow",
                },
                {
                    selector: "parameter",
                    format: ["camelCase", "snake_case"],
                },
                {
                    selector: "property",
                    format: ["camelCase", "UPPER_CASE", "snake_case"],
                    leadingUnderscore: "allow",
                    trailingUnderscore: "allow",
                    filter: {
                        regex: "^(Allow-a-Word|Authorization)$",
                        match: false,
                    },
                },
                {
                    selector: "memberLike",
                    modifiers: ["private"],
                    format: ["camelCase"],
                    leadingUnderscore: "allow",
                },
                {
                    selector: "property",
                    modifiers: ["private"],
                    format: ["camelCase"],
                    leadingUnderscore: "require",
                },
            ],
        },
    },
);
