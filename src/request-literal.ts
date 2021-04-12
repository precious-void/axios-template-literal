import axios, { AxiosInstance, AxiosPromise, Method } from "axios";
import { Headers, Options, BodyParameters } from "./types";

const line0Regex = /^([A-z]+) ([\S]+)/;

const axiosTemplateLiteral = <T = any>(
	axiosInstance: AxiosInstance,
	method: Method | undefined = undefined,
	strings: TemplateStringsArray,
	...values: any[]
): AxiosPromise<T> => {
	try {
		const requestConfig = getRequestConfig(method, strings, ...values);

		const opts: Options = {
			url: requestConfig.url,
			method: requestConfig.method!,
			headers: requestConfig.headers,
		};

		return axiosInstance.request({
			...opts,
			data: requestConfig.body
		});
	} catch (err) {
		return Promise.reject(err);
	}
};

const getRequestConfig = (
	method: Method | undefined,
	strings: TemplateStringsArray,
	...values: any[]
) => {
	// Split out the lines
	const lines = String.raw(strings, ...values)
		.trim()
		.split("\n");

	// Separate the header and body lines
	const line0 = lines.shift()!;
	const headerLines: string[] = [];
	const bodyLines: string[] = [];

	let isConsumingHeaders = true;
	lines.forEach((line) => {
		if (!line.trim()) {
			isConsumingHeaders = false;
			return;
		}

		if (isConsumingHeaders) headerLines.push(line);
		else bodyLines.push(line.trim());
	});

	// Parse
	const params = parseLine0(line0);
	const headers = parseHeaders(headerLines);
	const body = bodyLines.length > 0 ? bodyLines.join("\n") : undefined;

	return {
		method: method || params.method || 'GET',
		url: params.url,
		headers,
		body,
	};
};

const parseLine0 = (str: string): BodyParameters => {
	try {
		const match = line0Regex.exec(str)!;
		const method = match[1] as Method;
		const url = match[2];
		return { method, url };
	} catch (e) {
		throw new Error(
			`Parse error: ${str} is invalid, must be "{METHOD} {URL}". ${e.toString()}`
		);
	}
};

const parseHeaders = (lines: string[]): Headers => {
	const headers = lines.reduce<Headers>((acc, line) => {
		const parts: string[] = line.split(":");
		if (parts.length <= 1)
			throw new Error(`Parsing error: ${line} is not a valid header K/V`);

		acc[parts[0].trim()] = parts.slice(1).join(":").trim();
		return acc;
	}, {});

	return headers;
};

export default axiosTemplateLiteral;
