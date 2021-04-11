import Axios from "axios";
import axiosTemplateLiteral from "./dist/cjs/index";

/**
 * Create you default axios instance
 */
const instance = Axios.create({
	baseURL: "https://some-domain.com/api/",
	timeout: 1000,
	headers: { "X-Custom-Header": "foobar" },
});

/**
 * Pass axios instance to axiosTemplateLiteral function
 */
const axios = createAxiosTemplateLiteral(instance);

axios.get`
	/get
	Content-Type: application/json

	${JSON.stringify({
		hello: "world",
		awesome: true,
	})}
`;
