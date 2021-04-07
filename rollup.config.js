import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";
import bundleSize from "rollup-plugin-bundle-size";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import json from "@rollup/plugin-json";

const IS_PROD = process.env.NODE_ENV === "production";

const INPUT_FILE = "src/index.ts";

const getPlugins = (tsDeclaration = false) => [
	json(),
	nodeResolve({ mainFields: ["module", "jsnext"] }),
	typescript(
		tsDeclaration
			? {
					useTsconfigDeclarationDir: true,
					tsconfigOverride: {
						compilerOptions: {
							declaration: true,
							declarationDir: "dist/types",
						},
					},
			  }
			: {}
	),
	babel(),
	commonjs({ include: "node_modules/**" }),
	bundleSize(),
];

const cjs = {
	plugins: getPlugins(true),
	input: INPUT_FILE,
	output: {
		file: pkg.main,
		format: "cjs",
	},
};

const umdAndEs = {
	plugins: getPlugins(),
	input: INPUT_FILE,
	output: [
		{
			name: pkg.umdName,
			file: pkg.browser,
			format: "umd",
		},
		{
			file: pkg.module,
			format: "es",
		},
	],
};

const umdMin = {
	plugins: [...getPlugins(), uglify()],
	input: INPUT_FILE,
	output: {
		name: pkg.umdName,
		file: pkg.browser.split(".").reduce((acc, item, i, arr) => {
			return i === arr.length - 1 ? acc + "min." + item : acc + item + ".";
		}, ""),
		format: "umd",
	},
};

export default IS_PROD ? [cjs, umdAndEs, umdMin] : cjs;
