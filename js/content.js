function content(storage, doc, win) {
  const domain = win.location.origin;

  function init() {
    if (domain.includes("canvas") || domain.includes("instructure")) {
      storage.get(["darkMode", "backgroundImg"], function (result) {
        setDarkMode(result.darkMode);
        if (result.backgroundImg) {
          doc.body.style.backgroundImage = "url('" + result.backgroundImg + "')";
          doc.body.style.backgroundRepeat = "no-repeat";
          doc.body.style.backgroundSize = "contain";
        }
      });
    }
  }

  function setDarkMode(enabled) {
    doc.querySelector("html").style.filter = enabled
      ? "invert(1) hue-rotate(180deg)"
      : "";
  }
  return{
    init: init,
    setDarkMode: setDarkMode,
  }
}

// testing
if (typeof exports !== "undefined") {
  module.exports = content;
} else {
  content(chrome.storage.sync, document, window).init();
}

