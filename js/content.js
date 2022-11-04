const domain = window.location.origin;
const url = window.location.href;

isDomain();
function isDomain(){
    if (domain.includes("canvas") || domain.includes("instructure")) {
       //alert("On Canvas!")
       //darkMode();
    }
}

isCourses();
function isCourses(){
    if ((domain.includes("canvas") || domain.includes("instructure")) && url.includes("courses")) {
            // alert("On Courses!")
        }
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