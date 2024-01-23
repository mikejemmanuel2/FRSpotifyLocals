function setPlaylist() {
    var playlistName = new URLSearchParams(window.location.search).get('playlist');
    console.log(playlistName)
    // Assuming you want to connect to the Flask API
    const fetchData = async () => {
        const response = await fetch("http://nl2-2.deploy.sbs:2066/api/" + playlistName);
        const data = await response.json();
        // Use the 'data' received from the API as needed in your JavaScript code
    };
    fetchData();
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', setPlaylist);
