import request, { AxiosPromise, Method } from "axios";

type Headers = {
	[key: string]: string;
};

type Parameters = {
	url: string;
	method: Method;
};

type Options = Parameters & {
	resolveWithFullResponse: boolean;
	simple: boolean;
	body?: string;
	headers: Headers;
};

const line0Regex = /^([A-z]+) ([\S]+)/;

const axiosTemplateLiteral = <T = any>(
	strings: TemplateStringsArray,
	...values: any[]
): AxiosPromise<T> => {
	try {
		// split out the lines
		const lines = String.raw(strings, ...values)
			.trim()
			.split("\n");

		// separate the header and body lines
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

		// parse
		const params = parseLine0(line0);
		const headers = parseHeaders(headerLines);
		const body = bodyLines.length > 0 ? bodyLines.join("\n") : undefined;

		return axiosRequest<T>({ params, headers, body });
	} catch (err) {
		return Promise.reject(err);
	}
};

const axiosRequest = <T>({
	params,
	headers,
	body,
}: {
	params: Parameters;
	headers: Headers;
	body?: string;
}): AxiosPromise<T> => {
	const opts: Options = {
		resolveWithFullResponse: true,
		simple: false,

		url: params.url,
		method: params.method,
		headers,
	};

	if (body) opts.body = body;
	return request(opts);
};

const parseLine0 = (str: string): Parameters => {
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

module.exports = axiosTemplateLiteral;