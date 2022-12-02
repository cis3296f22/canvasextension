/**
 * The main function for the content scripts used every time a new webpage is opened in the Chrome browser while the extension is on.
 * @param storage - The object used to manage the storage and saved settings of the browser.  
 * @param doc - The object used to change elements of the (Canvas) webpage.
 * @param win - The object used for performing operations on the browser's active window.
 * @returns The content script functions used (Another way to call of functions in js).
 */

function content(storage, doc, win) {
  const domain = win.location.origin;

  /**
   * The function used to initialize the content scripts that happen every time the newly opened webpage is a Canvas page. It takes the saved settings from chrome.storage and automatically applies settings saved from the popup menu.
   */
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
  /**
   * The function used to set dark mode on or off, depending on the setting saved.
   */
  function setDarkMode(enabled) {
    doc.querySelector("html").style.filter = enabled
      ? "invert(1) hue-rotate(180deg)"
      : "";
  }

  /**
   * The function used to automatically hide the 'History' side menu option.
   * @param disabled - The status of the saved settings. If 'disabled' is true, remove the 'History' side menu option. 
   */
  function setHistorySideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById("global_nav_history_link");
      if (menuList) menuList.style.display = "none";
    }
  }

  /**
   * The function used to automatically hide the 'Help' side menu option.
   * @param disabled - The status of the saved settings. If 'disabled' is true, remove the 'Help' side menu option. 
   */
  function setHelpSideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById("global_nav_help_link");
      if (menuList) menuList.style.display = "none";
    }
  }

  /**
   * The function used to automatically hide the 'Commons' side menu option.
   * @param disabled - The status of the saved settings. If 'disabled' is true, remove the 'Commons' side menu option. 
   */
  function setCommonsSideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById(
        "context_external_tool_9_menu_item"
      );
      if (menuList) menuList.style.display = "none";
    }
  }

  /**
   * The function used to automatically hide the 'Inbox' side menu option.
   * @param disabled - The status of the saved settings. If 'disabled' is true, remove the 'Inbox' side menu option. 
   */
  function setInboxSideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById("global_nav_conversations_link");
      if (menuList) menuList.style.display = "none";
    }
  }

  /**
   * The function used to automatically hide the 'Calendar' side menu option.
   * @param disabled - The status of the saved settings. If 'disabled' is true, remove the 'Calendar' side menu option. 
   */
  function setCalendarSideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById("global_nav_calendar_link");
      if (menuList) menuList.style.display = "none";
    }
  }

  /**
   * The function used to automatically hide the 'Groups' side menu option.
   * @param disabled - The status of the saved settings. If 'disabled' is true, remove the 'Groups' side menu option. 
   */
  function setGroupsSideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById("global_nav_groups_link");
      if (menuList) menuList.style.display = "none";
    }
  }

  /**
   * The function used to automatically hide the 'Courses' side menu option.
   * @param disabled - The status of the saved settings. If 'disabled' is true, remove the 'Courses' side menu option. 
   */
  function setCoursesSideBar(disabled) {
    if (disabled) {
      var menuList = document.getElementById("global_nav_courses_link");
      if (menuList) menuList.style.display = "none";
    }
  }

  /**
   * The function used to automatically hide the 'Account' side menu option.
   * @param disabled - The status of the saved settings. If 'disabled' is true, remove the 'Account' side menu option. 
   */
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
