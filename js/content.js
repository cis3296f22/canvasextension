function content(storage, doc, win) {
  const domain = win.location.origin;

  function init() {
    if (domain.includes("canvas") || domain.includes("instructure")) {
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
        function (result) {
          setDarkMode(result.darkMode);
          setHistorySideBar(result.rmHistory);
          setHelpSideBar(result.rmHelp);
          setCommonsSideBar(result.rmCommons);
          setInboxSideBar(result.rmInbox);
          setCalendarSideBar(result.rmCalendar);
          setGroupsSideBar(result.rmGroups);
          setCoursesSideBar(result.rmCourses);
          setAccountSideBar(result.rmAccount);

          if (result.backgroundImg) {
            doc.body.style.backgroundImage =
              "url('" + result.backgroundImg + "')";
            doc.body.style.backgroundRepeat = "no-repeat";
            doc.body.style.backgroundSize = "contain";
          }
        }
      );
    }
  }

  function setDarkMode(enabled) {
    doc.querySelector("html").style.filter = enabled
      ? "invert(1) hue-rotate(180deg)"
      : "";
  }

  function setHistorySideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById("global_nav_history_link");
      if (menuList) menuList.style.display = "none";
    }
  }

  function setHelpSideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById("global_nav_help_link");
      if (menuList) menuList.style.display = "none";
    }
  }

  function setCommonsSideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById(
        "context_external_tool_9_menu_item"
      );
      if (menuList) menuList.style.display = "none";
    }
  }

  function setInboxSideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById("global_nav_conversations_link");
      if (menuList) menuList.style.display = "none";
    }
  }

  function setCalendarSideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById("global_nav_calendar_link");
      if (menuList) menuList.style.display = "none";
    }
  }

  function setGroupsSideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById("global_nav_groups_link");
      if (menuList) menuList.style.display = "none";
    }
  }

  function setCoursesSideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById("global_nav_courses_link");
      if (menuList) menuList.style.display = "none";
    }
  }

  function setAccountSideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById("global_nav_profile_link");
      if (menuList) menuList.style.display = "none";
    }
  }
  return {
    init: init,
    setDarkMode: setDarkMode,
    setHistorySideBar: setHistorySideBar,
    setHelpSideBar: setHelpSideBar,
    setCommonsSideBar: setCommonsSideBar,
    setInboxSideBar: setInboxSideBar,
    setCalendarSideBar: setCalendarSideBar,
    setGroupsSideBar: setGroupsSideBar,
    setCoursesSideBar: setCoursesSideBar,
    setAccountSideBar: setAccountSideBar,
  };
}

// testing
if (typeof exports !== "undefined") {
  module.exports = content;
} else {
  content(chrome.storage.sync, document, window).init();
}