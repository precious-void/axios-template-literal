const Axios = require("axios");
const createAxiosTemplateLiteral = require("./dist/cjs/index");

/**
 * Create you default axios instance
 */
const instance = Axios.create({
	baseURL: "https://api.github.com",
	timeout: 1000,
	headers: { "X-Custom-Header": "foobar" },
});

/**
 * Pass axios instance to axiosTemplateLiteral function
 */
const axios = createAxiosTemplateLiteral(instance);

axios.get`
	/orgs/octokit/repos
	Content-Type: application/json
	Accept: application/vnd.github.v3+json

	${JSON.stringify({
		hello: "world",
		awesome: true,
	})}
`.then((res) => console.log(res));
