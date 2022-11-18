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

test("popup initializes", () => {
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  expect(mockDocument.addEventListener).toHaveBeenCalledWith("DOMContentLoaded", expect.any(Function), false);
  var mockEventListener = jest.fn();
  mockDocument.getElementById.mockReturnValue({addEventListener: mockEventListener});
  p.init();
  expect(mockDocument.getElementById).toHaveBeenCalledWith("backgroundButton");
  expect(mockEventListener).toHaveBeenCalledWith("click", expect.any(Function));
  expect(mockStorage.get).toHaveBeenCalledWith(["darkMode", "backgroundImg"], expect.any(Function));
  var mockElements = {checked: undefined, value: undefined}
  mockDocument.getElementById.mockReturnValue(mockElements);
  mockStorage.get.mock.calls[0][1]({darkMode: true, backgroundImg: "https://example.com/pic.jpg"});
  expect(mockElements.checked).toEqual(true);
  expect(mockElements.value).toEqual("https://example.com/pic.jpg");
  
});

test("toggle dark mode", () => {
  var element = { checked: true };
  mockDocument.getElementById.mockReturnValue(element);
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);

  p.onDarkModeToggle();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(1);
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    target: expectedTarget,
    func: expect.any(Function),
  });

  element.checked = false;
  p.onDarkModeToggle();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(2);
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    target: expectedTarget,
    func: expect.any(Function),
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
  expect(mockScripting.executeScript.mock.calls.length).toEqual(1);
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    target: expectedTarget,
    args: ["https://example.com/pic.jpg"],
    func: expect.any(Function),
  });

  expect(mockStorage.set).toHaveBeenCalledWith({
    backgroundImg: "https://example.com/pic.jpg",
  });
});
test("rmHistoryClick", () => {
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  p.rmHistoryClick();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(1);
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    target: expectedTarget,
    func: expect.any(Function),
  });
});
test("rmHelpClick", () => {
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  p.rmHelpClick();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(1);
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    target: expectedTarget,
    func: expect.any(Function),
  });
});
test("rmCommonsClick", () => {
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  p.rmCommonsClick();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(1);
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    target: expectedTarget,
    func: expect.any(Function),
  });
});
test("rmInboxClick", () => {
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  p.rmInboxClick();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(1);
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    target: expectedTarget,
    func: expect.any(Function),
  });
});
test("rmCalendarClick", () => {
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  p.rmCalendarClick();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(1);
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    target: expectedTarget,
    func: expect.any(Function),
  });
});
test("rmGroupsClick", () => {
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  p.rmInboxClick();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(1);
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    target: expectedTarget,
    func: expect.any(Function),
  });
});
test("rmGroupsClick", () => {
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  p.rmGroupsClick();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(1);
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    target: expectedTarget,
    func: expect.any(Function),
  });
});
test("rmCoursesClick", () => {
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  p.rmCoursesClick();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(1);
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    target: expectedTarget,
    func: expect.any(Function),
  });
});
test("rmAccountClick", () => {
  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  p.rmAccountClick();
  expect(mockScripting.executeScript.mock.calls.length).toEqual(1);
  expect(mockScripting.executeScript).toHaveBeenCalledWith({
    target: expectedTarget,
    func: expect.any(Function),
  });
});
