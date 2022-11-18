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

    doc.getElementById("sideMenuButton1").addEventListener("click", rmAccountClick);
    doc.getElementById("sideMenuButton2").addEventListener("click", rmCalendarClick);
    doc.getElementById("sideMenuButton3").addEventListener("click", rmCommonsClick);
    doc.getElementById("sideMenuButton4").addEventListener("click", rmCoursesClick);
    doc.getElementById("sideMenuButton5").addEventListener("click", rmGroupsClick);
    doc.getElementById("sideMenuButton6").addEventListener("click", rmHelpClick);
    doc.getElementById("sideMenuButton7").addEventListener("click", rmHistoryClick);
    doc.getElementById("sideMenuButton8").addEventListener("click", rmInboxClick);
    doc.getElementById("colorPicker").addEventListener("click", colorChoice);

    doc
      .getElementById("darkModeToggle")
      .addEventListener("click", onDarkModeToggle, false);

    storage.get(["darkMode", "backgroundImg", "rmHistory", "rmHelp", "rmCommons", "rmInbox", "rmCalendar", "rmGroups", "rmCourses", "rmAccount"],
	 function (result) {
      var backgroundTextBox = doc.getElementById("url_textbox");
      var darkModeToggle = doc.getElementById("darkModeToggle");
	  var history = doc.getElementById("sideMenuButton7");
	  var help = doc.getElementById("sideMenuButton6");
	  var commons = doc.getElementById("sideMenuButton3");
	  var inbox = doc.getElementById("sideMenuButton8");
	  var calendar = doc.getElementById("sideMenuButton2");
	  var groups = doc.getElementById("sideMenuButton5");
	  var courses = doc.getElementById("sideMenuButton4");
	  var account = doc.getElementById("sideMenuButton1");
	  

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
    });
  }

  function onDarkModeToggle() {
    var checked = doc.getElementById("darkModeToggle").checked;
    if (checked) {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
          document.querySelector("html").style.filter = "invert(1) hue-rotate(180deg)";
        }
      });
    } else {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
          document.querySelector("html").style.filter = "";
        }
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

  function rmHistoryClick() {
	var checked = doc.getElementById("sideMenuButton7").checked;
    if (checked) {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
			var meunList = document.getElementById("global_nav_history_link")
			meunList.remove();
        }
      });
    } else {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
          //TODO: add option back
        }
      });
    }
    storage.set({ rmHistory: checked });
  }
    
	


  function rmHelpClick(){
    var checked = doc.getElementById("sideMenuButton6").checked;
    if (checked) {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
			var meunList = document.getElementById("global_nav_help_link")
			meunList.remove();
        }
      });
    } else {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
          //TODO: add option back
        }
      });
    }
    storage.set({ rmHelp: checked });
  }

  function rmCommonsClick(){
    var checked = doc.getElementById("sideMenuButton3").checked;
    if (checked) {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
			var meunList = document.getElementById("context_external_tool_9_menu_item")
			meunList.remove();
        }
      });
    } else {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
          //TODO: add option back
        }
      });
    }
    storage.set({ rmCommons: checked });
  }

  function rmInboxClick(){
    var checked = doc.getElementById("sideMenuButton8").checked;
    if (checked) {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
			var meunList = document.getElementById("global_nav_conversations_link")
			meunList.remove();
        }
      });
    } else {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
          //TODO: add option back
        }
      });
    }
    storage.set({ rmInbox: checked });
  }

  function rmCalendarClick(){
    var checked = doc.getElementById("sideMenuButton2").checked;
    if (checked) {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
			var meunList = document.getElementById("global_nav_calendar_link")
			meunList.remove();
        }
      });
    } else {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
          //TODO: add option back
        }
      });
    }
    storage.set({ rmCalendar: checked });
  }

  function rmGroupsClick(){
    var checked = doc.getElementById("sideMenuButton5").checked;
    if (checked) {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
			var meunList = document.getElementById("global_nav_groups_link")
			meunList.remove();
        }
      });
    } else {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
          //TODO: add option back
        }
      });
    }
    storage.set({ rmGroups: checked });
  }

  function rmCoursesClick(){
    var checked = doc.getElementById("sideMenuButton4").checked;
    if (checked) {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
			var meunList = document.getElementById("global_nav_courses_link")
			meunList.remove();
        }
      });
    } else {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
          //TODO: add option back
        }
      });
    }
    storage.set({ rmCourses: checked });
  }

  function rmAccountClick(){
    var checked = doc.getElementById("sideMenuButton1").checked;
    if (checked) {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
			var meunList = document.getElementById("global_nav_profile_link")
			meunList.remove();
        }
      });
    } else {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
          //TODO: add option back
        }
      });
    }
    storage.set({ rmAccount: checked });
  }

  function colorChoice() {
     let color = document.getElementById('chooser').value;
     document.body.style.backgroundColor = color;
  }

  return {
    onDarkModeToggle: onDarkModeToggle,
    onBackgroundClick: onBackgroundClick,
    init:init,
    rmAccountClick: rmAccountClick,
    rmCalendarClick: rmCalendarClick,
    rmCommonsClick: rmCommonsClick,
    rmCoursesClick: rmCoursesClick,
    rmGroupsClick: rmGroupsClick,
    rmHelpClick: rmHelpClick,
    rmHistoryClick: rmHistoryClick,
    rmInboxClick: rmInboxClick,
  };
}

// testing
if (typeof exports !== "undefined") {
  module.exports = popup;
} else {
  popup(chrome.tabs, chrome.storage.sync, chrome.scripting, document).init();
}
