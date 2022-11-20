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
  expect(mockDocument.addEventListener).toHaveBeenCalledWith(
    "DOMContentLoaded",
    expect.any(Function),
    false
  );

  var mockElements = [];
  mockDocument.getElementById.mockImplementation((id) => {
    var element = {
      addEventListener: jest.fn(),
      id: id,
    };

    mockElements.push(element);
    return element;
  });

  var findMockElem = (id) => mockElements.find((e) => e.id === id);

  p.init();

  var testClickWasSetup = (toggleId, stop) => {
    var elem = findMockElem(toggleId);

    expect(elem).toBeTruthy();
    expect(elem.addEventListener).toHaveBeenCalledTimes(1);

    if (stop) {
      expect(elem.addEventListener).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        false
      );
    } else {
      expect(elem.addEventListener).toHaveBeenCalledWith(
        "click",
        expect.any(Function)
      );
    }
  };

  testClickWasSetup("backgroundButton");
  testClickWasSetup("colorPicker");
  testClickWasSetup("darkModeToggle", true);

  testClickWasSetup("sideMenuButton1");
  testClickWasSetup("sideMenuButton2");
  testClickWasSetup("sideMenuButton3");
  testClickWasSetup("sideMenuButton4");
  testClickWasSetup("sideMenuButton5");
  testClickWasSetup("sideMenuButton6");
  testClickWasSetup("sideMenuButton7");
  testClickWasSetup("sideMenuButton8");

  expect(mockStorage.get).toHaveBeenCalledWith(
    [
      "darkMode",
      "backgroundImg",
      "rmHistory",
      "rmHelp",
      "rmCommons",
      "rmInbox",
      "rmCalendar",
      "rmGroups",
      "rmCourses",
      "rmAccount",
    ],
    expect.any(Function)
  );

  mockElements = [];

  mockStorage.get.mock.calls[0][1]({
    backgroundImg: "https://example.com/pic.jpg",
    darkMode: true,
    rmHistory: true,
    rmHelp: true,
    rmCommons: true,
    rmInbox: true,
    rmCalendar: false,
    rmGroups: true,
    rmCourses: true,
    rmAccount: false,
  });

  expect(mockElements.length).toEqual(10);

  expect(findMockElem("sideMenuButton1").checked).toBe(false);
  expect(findMockElem("sideMenuButton2").checked).toBe(false);
  expect(findMockElem("sideMenuButton3").checked).toBe(true);
  expect(findMockElem("sideMenuButton4").checked).toBe(true);
  expect(findMockElem("sideMenuButton5").checked).toBe(true);
  expect(findMockElem("sideMenuButton6").checked).toBe(true);
  expect(findMockElem("sideMenuButton7").checked).toBe(true);
  expect(findMockElem("sideMenuButton8").checked).toBe(true);

  expect(findMockElem("url_textbox").value).toEqual(
    "https://example.com/pic.jpg"
  );
  expect(findMockElem("darkModeToggle").checked).toEqual(true);
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

test("test remove click", () => {
  var mockElements = [];
  mockDocument.getElementById.mockImplementation((id) => {
    var element = {
      addEventListener: jest.fn(),
      id: id,
    };

    if (id.startsWith("sideMenuButton")) {
      mockElements.push(element);
    }

    return element;
  });

  var p = popup(mockTabs, mockStorage, mockScripting, mockDocument);
  p.init();

  // call all click functions
  mockElements.forEach((e) => e.addEventListener.mock.calls[0][1]());

  console.log(mockStorage);

  var testIt = (id) => {
    expect(mockScripting.executeScript).toHaveBeenCalledWith({
      target: expectedTarget,
      func: expect.any(Function),
      args: [id],
    });
  };

  testIt("global_nav_profile_link");
  testIt("global_nav_calendar_link");
  testIt("context_external_tool_9_menu_item");
  testIt("global_nav_courses_link");
  testIt("global_nav_groups_link");
  testIt("global_nav_help_link");
  testIt("global_nav_history_link");
  testIt("global_nav_conversations_link");
});
