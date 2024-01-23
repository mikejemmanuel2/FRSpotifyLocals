var socket;
function setPlaylist() {
    var playlistName = new URLSearchParams(window.location.search).get('playlist');
    console.log(playlistName)
    var dataLink = "https://mikejemmanuel.pythonanywhere.com/api/" + playlistName;

    const fetchData = async () => {
        const response = await fetch(dataLink);
    };
    console.log("Starting Fetch")
    fetchData()

}

// Call the function on page load
document.addEventListener('DOMContentLoaded', setPlaylist);


