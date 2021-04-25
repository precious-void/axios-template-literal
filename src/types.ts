import { AxiosInstance, AxiosPromise, Method } from "axios";

export type Headers = {
  [key: string]: string;
};

export type BodyParameters = {
  url: string;
  method: Method;
};

export type Options = BodyParameters & {
  data?: string;
  params?: string;
  headers: Headers;
};

export interface AxiosInstanceLiteral {
  <R = any>(strings: TemplateStringsArray, ...values: any[]): AxiosPromise<R>;

  axiosInstance?: AxiosInstance;

  get?: ProxyFunctionType;
  delete?: ProxyFunctionType;
  head?: ProxyFunctionType;
  post?: ProxyFunctionType;
  put?: ProxyFunctionType;
  patch?: ProxyFunctionType;
  request?: ProxyFunctionType;
}

export type ProxyFunctionType = <R = any>(
  this: AxiosInstanceLiteral,
  strings: TemplateStringsArray,
  ...values: any[]
) => AxiosPromise<R>;
