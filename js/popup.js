"use strict";

//gets id of current tab so you can edit style
var tabId;
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	var activeTab = tabs[0];
	tabId = activeTab.id; // or do whatever you need

 });

//functionality of dark mode button
document.addEventListener('DOMContentLoaded', function() {
	var checkButton = document.getElementById('darkModeButton');
	checkButton.addEventListener('click', function() {
	chrome.scripting.executeScript({
		target: {tabId: tabId, allFrames: true},
		files: ['js/darkMode.js'],
	},);
	}, false);
  }, false);