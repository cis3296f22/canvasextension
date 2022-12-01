const content = require("./js/content.js");

var mockDocument;
var mockStorage;
var mockWindow;

beforeEach(() => {
  mockDocument = {
    body: {
      style: {},
    },
    querySelector: jest.fn(),
  };

  mockStorage = {
    get: jest.fn(),
    set: jest.fn(),
  };

  mockWindow = {
    location: { origin: "https://templeu.instructure.com" },
  };
});

test("Test Loading With Darkmode ", () => {
  var mockHTML = { style: { filter: undefined } };
  mockDocument.querySelector.mockReturnValueOnce(mockHTML);
  var c = content(mockStorage, mockDocument, mockWindow);
  c.init();
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
  mockStorage.get.mock.calls[0][1]({
    darkMode: true,
    backgroundImg: "https://example.com/pic.jpg",
  });
  expect(mockDocument.body.style.backgroundImage).toEqual(
    "url('https://example.com/pic.jpg')"
  );
  expect(mockDocument.body.style.backgroundRepeat).toEqual("no-repeat");
  expect(mockDocument.body.style.backgroundSize).toEqual("contain");
  expect(mockDocument.querySelector).toHaveBeenCalledWith("html");
  expect(mockHTML.style.filter).toEqual("invert(1) hue-rotate(180deg)");
});
test("Test Loading Without Darkmode", () => {
  var mockHTML = { style: { filter: undefined } };
  mockDocument.querySelector.mockReturnValueOnce(mockHTML);
  var c = content(mockStorage, mockDocument, mockWindow);
  c.init();
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
  mockStorage.get.mock.calls[0][1]({
    darkMode: false,
    backgroundImg: "https://example2.com/pic.jpg",
  });
  expect(mockDocument.body.style.backgroundImage).toEqual(
    "url('https://example2.com/pic.jpg')"
  );
  expect(mockDocument.body.style.backgroundRepeat).toEqual("no-repeat");
  expect(mockDocument.body.style.backgroundSize).toEqual("contain");
  expect(mockDocument.querySelector).toHaveBeenCalledWith("html");
  expect(mockHTML.style.filter).toEqual("");
});
