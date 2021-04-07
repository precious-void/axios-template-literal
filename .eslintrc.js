module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "prettier", "import"],
	parserOptions: {
		sourceType: "module",
	},
	rules: {
		quotes: ["error", "double", { avoidEscape: true }],
		indent: "off",
		"max-len": ["error", 120],
	},
};
