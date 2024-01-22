//Function to handle navBar size as screen size changes
function setNavSize() {
    //Set variables for Height and Width for simplified use
    var navBarHeight = window.innerHeight * 0.015233949945593036;
    var navBarWidth = (98/100) * window.innerWidth;

    // Set Width of navBar
    document.querySelector('.navBar').style.width = navBarWidth + 'px';

    // Set navBar Button Padding
    if (window.innerWidth < 700) {
        document.querySelectorAll('.navBar a').forEach(function (anchor) {
            anchor.style.padding = navBarHeight + 'px ' + navBarWidth / 15 + 'px';
        });
    } else {
        document.querySelectorAll('.navBar a').forEach(function (anchor) {
            anchor.style.padding = navBarHeight + 'px ' + navBarWidth / 10 + 'px';
        });
    }
}
// Call the function on page load
window.addEventListener('load', setNavSize);
// Call the function when the window is resized
window.addEventListener('resize', setNavSize);