"use strict";

var tabId;
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var activeTab = tabs[0];
  tabId = activeTab.id;
});

document.addEventListener(
  "DOMContentLoaded",
  function () {
    readyBackground();
    var darkModeToggle = document.getElementById("darkModeToggle");
    var backgroundTextBox = document.getElementById("url_textbox");
    chrome.storage.sync.get(["darkMode", "backgroundImg"], function (result) {
      darkModeToggle.checked = result.darkMode;
      backgroundTextBox.value = result.backgroundImg;
    });

    darkModeToggle.addEventListener(
      "click",
      function () {
        if (this.checked) {
          chrome.scripting.executeScript({
            target: { tabId: tabId, allFrames: true },
            files: ["js/darkMode.js"],
          });
        } else {
          chrome.scripting.executeScript({
            target: { tabId: tabId, allFrames: true },
            files: ["js/undoDarkMode.js"],
          });
        }
        chrome.storage.sync.set({ darkMode: this.checked });
      },
      false
    );
  },
  false
);

function changeImg(input) {
  document.body.style.backgroundImage = "url('" + input + "')";
}

function readyBackground() {
  document
    .getElementById("backgroundButton")
    .addEventListener("click", function () {
      var url = document.getElementById("url_textbox").value;
      chrome.scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: changeImg,
        args: [url],
      });
      chrome.storage.sync.set({backgroundImg: url});
    });
}
