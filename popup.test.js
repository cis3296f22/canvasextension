const popup = require("./js/popup.js");

var mockTabs;
var mockDocument;
var mockScripting;
var mockStorage;
var expectedTarget = { allFrames: true, tabId: 100 };

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
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);

  p.onDarkModeToggle();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(1);
  var param = mockScripting.executeScript.mock.calls[0][0];
  expect(param.target).toEqual(expectedTarget);
  expect(param.func).toBeTruthy();
  
  element.checked = false;
  p.onDarkModeToggle();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(2);
  param = mockScripting.executeScript.mock.calls[1][0];
  expect(param.target).toEqual(expectedTarget);
  expect(param.func).toBeTruthy();

  expect(mockDocument.getElementById.mock.calls.length).toBe(2);
  expect(mockDocument.getElementById).toHaveBeenCalledWith("darkModeToggle");
});
test("set background", () => {
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  mockDocument.getElementById.mockReturnValueOnce({
    value: "https://example.com/pic.jpg",
  });
  p.onBackgroundClick();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(1);
  var param = mockScripting.executeScript.mock.calls[0][0];
  expect(param.target).toEqual(expectedTarget);
  expect(param.func).toBeTruthy();

  expect(mockStorage.set).toHaveBeenCalledWith({backgroundImg: "https://example.com/pic.jpg"});
});
test("rmHistoryClick", () => {
  // TODO
});
test("rmHelpClick", () => {
  // TODO
});
test("rmCommonsClick", () => {
  // TODO
});
test("rmInboxClick", () => {
  // TODO
});
test("rmCalendarClick", () => {
  // TODO
});
test("rmGroupsClick", () => {
  // TODO
});
test("rmGroupsClick", () => {
  // TODO
});
test("rmCoursesClick", () => {
  // TODO
});
test("rmAccountClick", () => {
  // TODO
});