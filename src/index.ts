import { AxiosInstance, Method } from "axios";
import axiosTemplateLiteral from "./request-literal";
import { AxiosInstanceLiteral, ProxyFunctionType } from "./types";

function createAxiosTemplateLiteral(
	axiosInstance: AxiosInstance
): AxiosInstanceLiteral {
	const newInstance: AxiosInstanceLiteral = proxyFunction.call({ axiosInstance } as AxiosInstanceLiteral, undefined)

	newInstance.axiosInstance = axiosInstance;
	newInstance.get = proxyFunction.call(newInstance, "GET");
	newInstance.delete = proxyFunction.call(newInstance, "DELETE");
	newInstance.head = proxyFunction.call(newInstance, "HEAD");
	newInstance.post = proxyFunction.call(newInstance, "POST");
	newInstance.put = proxyFunction.call(newInstance, "PUT");
	newInstance.patch = proxyFunction.call(newInstance, "PATCH");
	newInstance.request = proxyFunction.call(newInstance, undefined);

	return newInstance;
}

function proxyFunction(
	this: AxiosInstanceLiteral,
	method: Method | undefined
): ProxyFunctionType {
	return function (
		this: AxiosInstanceLiteral,
		strings: TemplateStringsArray,
		...values: any[]
	) {
		return axiosTemplateLiteral(
			this.axiosInstance!,
			method,
			strings,
			...values
		);
	}.bind(this);
}

module.exports = createAxiosTemplateLiteral;
