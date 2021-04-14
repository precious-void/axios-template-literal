const Axios = require("axios");
const createAxiosTemplateLiteral = require("./dist/cjs/index");

/**
 * Create you default axios instance
 */
const instance = Axios.create({
	baseURL: "https://gorest.co.in/public-api/",
	timeout: 5000,
	headers: { "X-Custom-Header": "foobar" },
});

/**
 * Pass axios instance to axiosTemplateLiteral function
 */
const axios = createAxiosTemplateLiteral(instance);

/**
 * Make your request!
 */
axios`
 	GET /users

 	{ "page": 5 }
`.then((res) => console.log(res));

/**
 * Or you can do it like that
 */

axios.get`
	/users

	{ "page": 5 }
`.then((res) => console.log(res));
