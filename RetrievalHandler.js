function setPlaylist() {
    var playlistName = new URLSearchParams(window.location.search).get('playlist');
    console.log(playlistName)
    var dataLink = "https://tinyurl.com/httpVDog";

    const fetchData = async () => {
        const response = await fetch(dataLink);
    };
    console.log("Going to Fetch")
    fetchData()
    console.log("Data has been Fetched")
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', setPlaylist);
