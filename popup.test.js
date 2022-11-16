const popup = require("./js/popup.js");

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

test("toggle dark mode", () => {
  var element = { checked: true };
  mockDocument.getElementById.mockReturnValue(element);
  var expectedTarget = { allFrames: true, tabId: 100 };

  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  p.onDarkModeToggle();
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    files: ["js/darkMode.js"],
    target: expectedTarget,
  });

  element.checked = false;
  p.onDarkModeToggle();
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    files: ["js/undoDarkMode.js"],
    target: expectedTarget,
  });

  expect(mockDocument.getElementById.mock.calls.length).toBe(2);
  expect(mockDocument.getElementById).toHaveBeenCalledWith("darkModeToggle");
});

test("set background", () => {
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  mockDocument.getElementById.mockReturnValueOnce({
    value: "https://example.com/pic.jpg",
  });
  p.onBackgroundClick();
  expect(mockScripting.executeScript).toHaveBeenCalledWith();
  expect(mockStorage.set).toHaveBeenCalledWith();
});
