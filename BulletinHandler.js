//Function to handle bulletin size as screen size changes
function setBulletinSize() {
    // Set bulletin Width and Height
    document.querySelector('.bulletin').style.width = (50/100) * window.innerWidth + 'px';
    document.querySelector('.bulletin').style.height = (50/100) * window.innerHeight + 'px';


    //Sets size of text relative to screen size
    if (window.innerWidth > window.innerHeight) {
        document.querySelector('.bulletin h1').style.fontSize = (1.5/100) * window.innerWidth + 'px';
        document.querySelectorAll('.bulletin p').forEach(function (paragraph) {
            paragraph.style.fontSize = (1.25/100) * window.innerWidth + 'px';
        });
    } else {
        document.querySelector('.bulletin h1').style.fontSize = (2/100) * window.innerHeight + 'px';
        document.querySelectorAll('.bulletin p').forEach(function (paragraph) {
            paragraph.style.fontSize = (1.75/100) * window.innerHeight + 'px';
        });
    }
}
// Call the function on page load
setBulletinSize();
// Call the function when the window is resized
window.addEventListener('resize', setBulletinSize);