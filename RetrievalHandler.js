var socket;
function setPlaylist() {
    var playlistName = new URLSearchParams(window.location.search).get('playlist');
    console.log(playlistName)
    var dataLink = "https://mikejemmanuel.pythonanywhere.com/api/" + playlistName;
    socket = io.connect(dataLink);

    const fetchData = async () => {
        const response = await fetch(dataLink);
    };
    console.log("Starting Fetch")
    fetchData()

    socket.on('message', function(data) {
        console.log('Received message:', data.data);
    });
    socket.on('update', function(data) {
        console.log('Received update:', data.message);
    });
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', setPlaylist);


