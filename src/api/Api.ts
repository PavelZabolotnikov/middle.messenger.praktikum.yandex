import BASE_API from '../utils/api';

export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
}

type Options = {
  method: string;
  data?: unknown;
};

type HTTPMethod = <R = unknown>(url: string, data?: unknown) => Promise<R>;

export default class HTTPTransport {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${BASE_API}${endpoint}`;
  }

  public get: HTTPMethod = (url = '/') => this.request(this.endpoint + url);

  public post: HTTPMethod = (url, data) =>
    this.request(this.endpoint + url, {
      method: Method.Post,
      data,
    });

  public put: HTTPMethod = (url, data) =>
    this.request(this.endpoint + url, {
      method: Method.Put,
      data,
    });

  public patch: HTTPMethod = (url, data) =>
    this.request(this.endpoint + url, {
      method: Method.Patch,
      data,
    });

  public delete: HTTPMethod = (url, data) =>
    this.request(this.endpoint + url, {
      method: Method.Delete,
      data,
    });

  private request<Response>(url: string, options: Options = { method: Method.Get }): Promise<Response> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject(xhr.response);
      xhr.onerror = () => reject(xhr.response);
      xhr.ontimeout = () => reject(xhr.response);

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.Get || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
