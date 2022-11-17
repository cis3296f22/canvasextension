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

    doc
      .getElementById("darkModeToggle")
      .addEventListener("click", onDarkModeToggle, false);

    storage.get(["darkMode", "backgroundImg"], function (result) {
      var backgroundTextBox = doc.getElementById("url_textbox");
      var darkModeToggle = doc.getElementById("darkModeToggle");

      darkModeToggle.checked = result.darkMode;
      backgroundTextBox.value = result.backgroundImg;
    });
  }

  function onDarkModeToggle() {
    var checked = doc.getElementById("darkModeToggle").checked;
    if (checked) {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
          doc.querySelector("html").style.filter = "invert(1) hue-rotate(180deg)";
        }
      });
    } else {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: function(){
          doc.querySelector("html").style.filter = "";
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
        doc.body.style.backgroundImage = "url('" + input + "')";
        doc.body.style.backgroundRepeat = "no-repeat";
        doc.body.style.backgroundSize = "contain";
      },
      args: [url],
    });
    storage.set({ backgroundImg: url });
  }

  function rmHistoryClick() {
    scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      func: function(){
        var meunList = document.getElementById("global_nav_history_link")
        meunList.remove();
      }
    });
  }

  function rmHelpClick(){
    scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      func: function(){
        var meunList = document.getElementById("global_nav_help_link")
        meunList.remove();
      }
    });
  }

  function rmCommonsClick(){
    scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      func: function(){
        var meunList = document.getElementById("context_external_tool_9_menu_item")
        meunList.remove();
      }
    });
  }

  function rmInboxClick(){
    scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      func: function(){
        var meunList = document.getElementById("global_nav_conversations_link")
        meunList.remove();
      }
    });
  }

  function rmCalendarClick(){
    scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      func: function(){
        var meunList = document.getElementById("global_nav_calendar_link")
        meunList.remove();
      }
    });
  }

  function rmGroupsClick(){
    scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      func: function(){
        var meunList = document.getElementById("global_nav_groups_link")
        meunList.remove();
      }
    });
  }

  function rmCoursesClick(){
    scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      func: function(){
        var meunList = document.getElementById("global_nav_courses_link")
        meunList.remove();
      }
    });
  }

  function rmAccountClick(){
    scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      func: function(){
        var meunList = document.getElementById("global_nav_profile_link")
        meunList.remove();
      }
    });
  }

  // function colorChoice() {
  //   var x = document.getElementById("colorpicker").value;
  //   document.body.style.backgroundColor = x;
  // }

  return {
    onDarkModeToggle: onDarkModeToggle,
    onBackgroundClick: onBackgroundClick,
    init:init
  };
}

// testing
if (typeof exports !== "undefined") {
  module.exports = popup;
} else {
  popup(chrome.tabs, chrome.storage.sync, chrome.scripting, document).init();
}
