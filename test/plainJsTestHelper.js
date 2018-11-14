import { JSDOM } from 'jsdom';

const dom = new JSDOM(
    `<!doctype html><html><body><div id="beforeRow"></div><div id="row"></div><div id="1"></div></body></html>`
);
export const win = dom.window;
export const document = dom.window.document;

global.window = win;
global.document = document;
