import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import bundleSize from "rollup-plugin-bundle-size";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { main, module } from "./package.json";
import dts from "rollup-plugin-dts";

const IS_PROD = process.env.NODE_ENV === "production";
const INPUT_FILE = "src/index.ts";

const getPlugins = (tsDeclaration = false) => [
  commonjs({ include: "node_modules/**", extensions: [".ts"] }),
  nodeResolve({ preferBuiltins: true, extensions: [".ts"] }),
  typescript({ useTsconfigDeclarationDir: true }),
  babel({ babelHelpers: "bundled" }),
  bundleSize(),
];

const cjs = {
  plugins: getPlugins(),
  input: INPUT_FILE,
  output: {
    file: main,
    format: "cjs",
    exports: "default",
  },
  external: ["axios"],
};

const Es = {
  plugins: getPlugins(),
  input: INPUT_FILE,
  output: {
    file: module,
    format: "es",
    exports: "default",
  },
  external: ["axios"],
};

const tsDeclaration = {
  input: "./dist/types/index.d.ts",
  output: [{ file: "dist/index.d.ts", format: "es" }],
  plugins: [dts()],
};

export default IS_PROD ? [cjs, Es, tsDeclaration] : cjs;
