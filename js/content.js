const domain = window.location.origin;
const url = window.location.href;

isDomain();
function isDomain() {
  if (domain.includes("canvas") || domain.includes("instructure")) {
    chrome.storage.sync.get(["darkMode", "backgroundImg"], function (result) {
      setDarkMode(result.darkMode);
      if (result.backgroundImg) {
        document.body.style.backgroundImage = "url('" + result.backgroundImg + "')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "contain";
      }
    });
  }
}

function setDarkMode(enabled) {
  document.querySelector("html").style.filter = enabled
    ? "invert(1) hue-rotate(180deg)"
    : "";
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
