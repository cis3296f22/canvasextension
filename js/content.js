const domain = window.location.origin;
const url = window.location.href;

isDomain();
function isDomain() {
  if (domain.includes("canvas") || domain.includes("instructure")) {
    chrome.storage.sync.get(["darkMode"], function (result) {
      if (result.darkMode) {
        darkMode();
      } else {
        undoDarkMode();
      }
    });
  }
}

function darkMode() {
  document.querySelector("html").style.filter = "invert(1) hue-rotate(180deg)";
}

function toggle() {
  var lightMode = document.getElementById("style1"),
    darkMode = document.getElementById("style2");
  if (lightMode.disabled === "disabled") {
    lightMode.disabled = undefined;
    darkMode.disabled = "disabled";
  } else {
    lightMode.disabled = "disabled";
    darkMode.disabled = undefined;
  }
}
