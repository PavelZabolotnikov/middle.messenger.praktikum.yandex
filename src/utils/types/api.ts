export type RequestUrlType = string;

export type RequestOptionsType = {
  method: FetchMethodsEnum;
  data?: Record<string, string | number>;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
};

export enum FetchMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
