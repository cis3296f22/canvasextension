const domain = window.location.origin;
const url = window.location.href;

isDomain();
function isDomain(){
    if (domain.includes("canvas") || domain.includes("instructure")) {
        alert("On Canvas!")
        darkMode();
    }
}

isCourses();
function isCourses(){
    if ((domain.includes("canvas") || domain.includes("instructure")) && url.includes("courses")) {
            alert("On Courses!")
        }
}


function darkMode() {

    document.querySelector("html").style.filter = "invert(1) hue-rotate(180deg)";
    let media = document.querySelectorAll("img, picture, video");
    media.forEach((mediaItem) => {
        mediaItem.style.filter = "invert(1) hue-rotate(180deg)"
    })
    

}
