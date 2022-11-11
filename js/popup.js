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
            files: ["js/undoDarkMode.js"],
          });
		    }
		    else{
			    chrome.scripting.executeScript({
				    target: { tabId: tabId, allFrames: true },
            files: ["js/darkMode.js"],
			    });
		    }
    },
      false
    );
  },
  false
);


function change_img(input){
  console.log(input);
  document.body.style.backgroundImage = "url('"+input+"')";
  
  //document.querySelector("background").style.filter = ""; 
  //Need to re-filter background image in the event of dark mode is on
  
}

//document.getElementById("backgroundButton").addEventListener("click", change_img);

document.addEventListener('DOMContentLoaded', readyBackground  , false);

function readyBackground(){
  document.getElementById('backgroundButton').addEventListener('click', 
  function(){
    //change_img(document.getElementById('url_textbox').value)
    chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      func: change_img,
      args: [(document.getElementById('url_textbox').value)]
    });
  }
  )
}

