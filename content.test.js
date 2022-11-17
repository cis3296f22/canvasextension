const content = require("./js/content.js");

var mockTabs;
var mockDocument;
var mockScripting;
var mockStorage;

beforeEach(() => {
  mockTabs = {
    query: (q, cb) => {
      cb([{ id: 100 }]);
    },
  };

  mockDocument = {
    addEventListener: jest.fn(),
    getElementById: jest.fn(),
  };

  mockScripting = {
    executeScript: jest.fn(),
  };

  mockStorage = {
    get: jest.fn(),
    set: jest.fn(),
  };
});

test("on domain", () => {
  // TODO
});

test("toggle", () => {
  // TODO
});
