import { AxiosInstance, AxiosPromise, Method } from "axios";

export type Headers = {
	[key: string]: string;
};

export type BodyParameters = {
	url: string;
	method: Method;
};

export type Options = BodyParameters & {
	body?: string;
	headers: Headers;
};

export interface AxiosInstanceLiteral {
	(strings: TemplateStringsArray, ...values: any[]): ProxyFunctionType<Method>;

	axiosInstance?: AxiosInstance;

	get?: RequestFunction<"GET">;
	delete?: RequestFunction<"DELETE">;
	head?: RequestFunction<"HEAD">;
	post?: RequestFunction<"POST">;
	put?: RequestFunction<"PUT">;
	patch?: RequestFunction<"PATCH">;
	request?: RequestFunction<Method>;
}

type RequestFunction<M = Method | undefined> = <R = any>(
	this: AxiosInstanceLiteral,
	strings: TemplateStringsArray,
	...values: any[]
) => ProxyFunctionType<M, R>;

export type ProxyFunctionType<M = Method | undefined, R = any> = (
	axiosInstance: AxiosInstance,
	method: M
) => Promise<R>;
