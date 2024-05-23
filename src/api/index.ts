import HTTPTransport from '../utils/api/Api.ts';

export default class Api {
  http: HTTPTransport;
  constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }
  create?(data: unknown): Promise<unknown>;
  read?(identifier?: string | number): Promise<unknown>;
  update?(identifier: string | number, data: unknown): Promise<unknown>;
  delete?(identifier: string | number): Promise<unknown>;
}
