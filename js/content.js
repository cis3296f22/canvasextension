const domain = window.location.origin;
const url = window.location.href;

//this takes over other webpages as well, for instance popup shows on "https://www.w3schools.com/js/js_window_location.asp"

isDomain();
function isDomain(){
    if (domain.includes("canvas") || domain.includes("instructure") || domain.includes("learn") || domain.includes("school")) {
        alert("On Canvas!")
    }
}

isCourses();
function isCourses(){
    if ((domain.includes("canvas") || domain.includes("instructure")) && url.includes("courses")) {
            alert("On Courses!")
        }
}

