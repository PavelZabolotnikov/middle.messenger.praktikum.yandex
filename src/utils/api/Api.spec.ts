import { expect } from 'chai';
import HTTPTransport from './Api.ts';
import Sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let httpTransport: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = Sinon.useFakeXMLHttpRequest();
    //@ts-expect-error чтобы не описывать типизацию xhr
    global.XMLHttpRequest = xhr as XMLHttpRequest;
    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };
    httpTransport = new HTTPTransport('/');
  });

  afterEach(() => {
    xhr.restore();
    requests = [];
  });

  it('should make a GET request', async () => {
    httpTransport.get('/test');
    const [request] = requests;

    expect(request.method).to.be.eq('Get');
    expect(request.url).to.be.eq('https://ya-praktikum.tech/api/v2//test');
  });

  it('should make a POST request', async () => {
    httpTransport.post('/test');
    const [request] = requests;

    expect(request.method).to.be.eq('Post');
    expect(request.url).to.be.eq('https://ya-praktikum.tech/api/v2//test');
  });

  it('should make a PUT request', async () => {
    httpTransport.put('/test');
    const [request] = requests;

    expect(request.method).to.be.eq('Put');
    expect(request.url).to.be.eq('https://ya-praktikum.tech/api/v2//test');
  });

  it('should make a PATCH request', async () => {
    httpTransport.patch('/test');
    const [request] = requests;

    expect(request.method).to.be.eq('Patch');
    expect(request.url).to.be.eq('https://ya-praktikum.tech/api/v2//test');
  });

  it('should make a DELETE request', async () => {
    httpTransport.delete('/test');
    const [request] = requests;

    expect(request.method).to.be.eq('Delete');
    expect(request.url).to.be.eq('https://ya-praktikum.tech/api/v2//test');
  });
});
