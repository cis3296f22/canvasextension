"use strict";

function popup(tabs, storage, scripting, doc) {
  var tabId;
  tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    tabId = activeTab.id;
  });

  doc.addEventListener("DOMContentLoaded", init, false);

  function init() {
    doc
      .getElementById("backgroundButton")
      .addEventListener("click", onBackgroundClick);

    setupNavLink("sideMenuButton1", "global_nav_profile_link");
    setupNavLink("sideMenuButton2", "global_nav_calendar_link");
    setupNavLink("sideMenuButton3", "context_external_tool_9_menu_item");
    setupNavLink("sideMenuButton4", "global_nav_courses_link");
    setupNavLink("sideMenuButton5", "global_nav_groups_link");
    setupNavLink("sideMenuButton6", "global_nav_help_link");
    setupNavLink("sideMenuButton7", "global_nav_history_link");
    setupNavLink("sideMenuButton8", "global_nav_conversations_link");

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
        history.checked = result.rmHistory;
        help.checked = result.rmHelp;
        commons.checked = result.rmCommons;
        inbox.checked = result.rmInbox;
        calendar.checked = result.rmCalendar;
        groups.checked = result.rmGroups;
        courses.checked = result.rmCourses;
        account.checked = result.rmAccount;
      }
    );
  }

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

  function setupNavLink(buttonId, elementId) {
    var button = doc.getElementById(buttonId);

    button.addEventListener("click", () => {
      var checked = button.checked;

      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function (id, show) {
          var meunList = document.getElementById(id);
          meunList.style.display = show ? null : "none";
        },
        args: [elementId, checked]
      });
      
      storage.set({ rmHistory: checked });
    });
  }

  function colorChoice() {
    let color = doc.getElementById("chooser").value;
    doc.body.style.backgroundColor = color;
  }

  return {
    onDarkModeToggle: onDarkModeToggle,
    onBackgroundClick: onBackgroundClick,
    init: init,
    colorChoice: colorChoice,
  };
}

// testing
if (typeof exports !== "undefined") {
  module.exports = popup;
} else {
  popup(chrome.tabs, chrome.storage.sync, chrome.scripting, document).init();
}
