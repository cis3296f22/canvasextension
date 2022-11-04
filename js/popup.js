"use strict";

//gets id of current tab so you can edit style
var tabId;
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var activeTab = tabs[0];
  tabId = activeTab.id; // or do whatever you need
});

//functionality of dark mode button
document.addEventListener("DOMContentLoaded", function () {
    var darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click",
      function () {
        if (this.checked){
          chrome.scripting.executeScript({
            target: { tabId: tabId, allFrames: true },
            files: ["js/darkMode.js"],
          });
		    }
		    else{
			    chrome.scripting.executeScript({
				    target: { tabId: tabId, allFrames: true },
				    files: ["js/undoDarkMode.js"],
			    });
		    }
    },
      false
    );
  },
  false
);
