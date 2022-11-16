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

    doc.getElementById("sideMenuButton").addEventListener("click", onMenuClick);

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
        files: ["js/darkMode.js"],
      });
    } else {
      scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        files: ["js/undoDarkMode.js"],
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

  function onMenuClick() {
    scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      files: ["js/sideMenu.js"],
    });
  }

  // function colorChoice() {
  //   var x = document.getElementById("colorpicker").value;
  //   document.body.style.backgroundColor = x;
  // }

  return {
    onDarkModeToggle: onDarkModeToggle,
    onBackgroundClick: onBackgroundClick,
    onMenuClick: onMenuClick,
    init:init
  };
}

// testing
if (typeof exports !== "undefined") {
  module.exports = popup;
} else {
  popup(chrome.tabs, chrome.storage.sync, chrome.scripting, document).init();
}
