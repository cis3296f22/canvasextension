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
    myFunction();
    var darkModeToggle = document.getElementById("darkModeToggle");
    var backgroundTextBox = document.getElementById("url_textbox");
    chrome.storage.sync.get(["darkMode", "backgroundImg"], function (result) {
      darkModeToggle.checked = result.darkMode;
      backgroundTextBox.value = result.backgroundImg;
    });

    colorpicker.addEventListener(
          "click",
          function () {
            document.body.style.backgroundColor = "#0000ff";
          }

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
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "contain";
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

function myFunction(){
    var x = document.getElementById("myColor").value;
    document.body.style.backgroundColor = "#0000ff";
}