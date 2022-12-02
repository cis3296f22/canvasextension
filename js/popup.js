"use strict";

/** 
 * The function used to set up and run the popup menu used when the user is editing the settings of the extension. 
 * @constructor
 * @param tabs - The object used to manage the tabs in the Chrome browser. 
 * @param storage - The object used to manage the storage and saved settings of the browser. 
 * @param scripting - The library used to run scripts in the Chrome browser.
 * @param doc - The object used to change elements of the (Canvas) webpage.
 * @return The functions used within the popup to be used in accordance with the extension (Another way to call of functions in js). 
*/
function popup(tabs, storage, scripting, doc) {
  var tabId;
  tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    tabId = activeTab.id;
  });

  doc.addEventListener("DOMContentLoaded", init, false);

/**
 * The function used to initialize the popup menun with the saved settings and prepares functionality to extension menu.
 */
  function init() {
    doc
      .getElementById("backgroundButton")
      .addEventListener("click", onBackgroundClick);

    setupNavLink("sideMenuButton1", "global_nav_profile_link", "rmAccount");
    setupNavLink("sideMenuButton2", "global_nav_calendar_link", "rmCalendar");
    setupNavLink("sideMenuButton3", "context_external_tool_9_menu_item", "rmCommons");
    setupNavLink("sideMenuButton4", "global_nav_courses_link", "rmCourses");
    setupNavLink("sideMenuButton5", "global_nav_groups_link", "rmGroups");
    setupNavLink("sideMenuButton6", "global_nav_help_link", "rmHelp");
    setupNavLink("sideMenuButton7", "global_nav_history_link", "rmHistory");
    setupNavLink("sideMenuButton8", "global_nav_conversations_link", "rmInbox");

    doc.getElementById("colorPicker").addEventListener("click", colorChoice);

    doc
      .getElementById("darkModeToggle")
      .addEventListener("click", onDarkModeToggle, false);

    storage.get(
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
      (result) => {
        var backgroundTextBox = doc.getElementById("url_textbox");
        var darkModeToggle = doc.getElementById("darkModeToggle");

        var account = doc.getElementById("sideMenuButton1");
        var calendar = doc.getElementById("sideMenuButton2");
        var commons = doc.getElementById("sideMenuButton3");
        var courses = doc.getElementById("sideMenuButton4");
        var groups = doc.getElementById("sideMenuButton5");
        var help = doc.getElementById("sideMenuButton6");
        var history = doc.getElementById("sideMenuButton7");
        var inbox = doc.getElementById("sideMenuButton8");

        darkModeToggle.checked = result.darkMode;
        backgroundTextBox.value = result.backgroundImg;

        history.checked = !result.rmHistory;
        help.checked = !result.rmHelp;
        commons.checked = !result.rmCommons;
        inbox.checked = !result.rmInbox;
        calendar.checked = !result.rmCalendar;
        groups.checked = !result.rmGroups;
        courses.checked = !result.rmCourses;
        account.checked = !result.rmAccount;
      }
    );
  }
  /**
   * The function used when the toggle is used to turn dark mode on and off. Afterwards, it saves the setting to the storage object.
   */
  function onDarkModeToggle() {
    var checked = doc.getElementById("darkModeToggle").checked;
    if (checked) {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function () {
          document.querySelector("html").style.filter =
            "invert(1) hue-rotate(180deg)";
        },
      });
    } else {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function () {
          document.querySelector("html").style.filter = "";
        },
      });
    }
    storage.set({ darkMode: checked });
  }

  /**
   * The function used when the 'change background' button is clicked. It takes the image address provided in the text box and replaces the webpage's background with the image linked to the image address. It then saves the address so future openings of Canvas webpages do the same.
   */
  function onBackgroundClick() {
    var url = doc.getElementById("url_textbox").value;
    scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      func: function (input) {
        document.body.style.backgroundImage = "url('" + input + "')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "contain";
      },
      args: [url],
    });
    storage.set({ backgroundImg: url });
  }

  /**
   * The function used for setting up the add/hide buttons for unwanted Canvas side menu options, such as 'History' and 'Inbox'.
   */
  function setupNavLink(buttonId, elementId, storageId) {
    var button = doc.getElementById(buttonId);
    button.addEventListener("click", () => {
    var checked = button.checked;
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function (id, show) {
          var menulist = document.getElementById(id);
          menulist.style.display = show ? null : "none";
        },
        args: [elementId, checked]
      });
      storage.set({ [storageId] : !checked });
    });
  }

  /**
   * The function used for the background color change functionality. It takes the color value determined by the color picker and changes the background to that color.
   */
  function colorChoice() {
    let color = doc.getElementById("chooser").value;
    doc.body.style.backgroundColor = color;
  }

  return {
    onDarkModeToggle: onDarkModeToggle,
    onBackgroundClick: onBackgroundClick,
    init: init,
    setupNavLink: setupNavLink,
    colorChoice: colorChoice,
  };
}

// testing
if (typeof exports !== "undefined") {
  module.exports = popup;
} else {
  popup(chrome.tabs, chrome.storage.sync, chrome.scripting, document).init();
}