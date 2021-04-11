module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "prettier", "import"],
	parserOptions: {
		sourceType: "module",
	},
	rules: {
		indent: "off",
		"max-len": ["error", 120],
	},
};
