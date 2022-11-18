function content(storage, doc, win) {
  const domain = win.location.origin;

  function init() {
    if (domain.includes("canvas") || domain.includes("instructure")) {
      storage.get(["darkMode", "backgroundImg", "rmHistory", "rmHelp", "rmCommons", "rmInbox", "rmCalendar", "rmGroups", "rmCourses", "rmAccount"], function (result) {
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
          doc.body.style.backgroundImage = "url('" + result.backgroundImg + "')";
          doc.body.style.backgroundRepeat = "no-repeat";
          doc.body.style.backgroundSize = "contain";
        }
      });
    }
  }

  function setDarkMode(enabled) {
    doc.querySelector("html").style.filter = enabled
      ? "invert(1) hue-rotate(180deg)"
      : "";
  }
  return{
    init: init,
    setDarkMode: setDarkMode,
  }

  function setHistorySideBar(disabled){
	if(disabled){
		var meunList = document.getElementById("global_nav_history_link")
		meunList.remove();
	}
  }

  function setHelpSideBar(disabled){
	if(disabled){
		var meunList = document.getElementById("global_nav_help_link")
		meunList.remove();
	}
  }

  function setCommonsSideBar(disabled){
	if(disabled){
		var meunList = document.getElementById("context_external_tool_9_menu_item")
		meunList.remove();
	}
  }

  function setInboxSideBar(disabled){
	if(disabled){
		var meunList = document.getElementById("global_nav_conversations_link")
		meunList.remove();
	}
  }

  function setCalendarSideBar(disabled){
	if(disabled){
		var meunList = document.getElementById("global_nav_calendar_link")
		meunList.remove();
	}
  }

  function setGroupsSideBar(disabled){
	if(disabled){
		var meunList = document.getElementById("global_nav_groups_link")
		meunList.remove();
	}
  }

  function setCoursesSideBar(disabled){
	if(disabled){
		var meunList = document.getElementById("global_nav_courses_link")
		meunList.remove();
	}
  }

  function setAccountSideBar(disabled){
	if(disabled){
		var meunList = document.getElementById("global_nav_profile_link")
		meunList.remove();
	}
  }
}

// testing
if (typeof exports !== "undefined") {
  module.exports = content;
} else {
  content(chrome.storage.sync, document, window).init();
}

