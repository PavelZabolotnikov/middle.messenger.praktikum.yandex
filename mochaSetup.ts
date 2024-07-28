import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<body></body>', { url: "https://example.org/" });

//@ts-expect-error unknown types for window jsdom
global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
