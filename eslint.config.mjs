import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Type-aware rules on top of Next's. recommendedTypeChecked rather than the strict
  // presets: those mostly flag React's `() => setX(v)` shorthand and style nits.
  // no-deprecated is added on its own, since it catches API renames (React 19's
  // ElementRef -> ComponentRef) before they become removals.
  {
    files: ["**/*.{ts,tsx}"],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      "@typescript-eslint/no-deprecated": "error",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local tool folders (editor and assistant state), never part of the site.
    ".remember/**",
    ".claude/**",
  ]),
]);

export default eslintConfig;
