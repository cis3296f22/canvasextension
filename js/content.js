const domain = window.location.origin;

isDomain();
function isDomain(){
    if (domain.includes("canvas") || domain.includes("instructure") || domain.includes("learn") || domain.includes("school")) {
        alert("On Canvas!")
    }
}