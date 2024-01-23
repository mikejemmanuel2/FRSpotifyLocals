function setPlaylist() {
    var playlistName = new URLSearchParams(window.location.search).get('playlist');
    console.log(playlistName)
    var dataLink = "https://mikejemmanuel.pythonanywhere.com/api/" + playlistName;
    var socket = io.connect(dataLink);

    console.log("Socket Should Have Connected")
    const fetchData = async () => {
        const response = await fetch(dataLink);
    };
    console.log("Going to Fetch")
    fetchData()
    console.log("Data has been Fetched")
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', setPlaylist);

socket.on('message', function(data) {
    console.log('Received message:', data.data);
});
socket.on('update', function(data) {
    console.log('Received update:', data.message);
});
