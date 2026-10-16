import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Componentes gerados pelo shadcn CLI: código de terceiros que é
    // sobrescrito a cada `shadcn add`, por isso a regra é desligada aqui
    // em vez de comentada dentro do arquivo. O carousel sincroniza estado
    // com o Embla no mount, o que a regra sinaliza como falso positivo.
    files: ["src/components/ui/**"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
