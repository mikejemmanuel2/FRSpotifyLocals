function setPlaylist() {
    var playlistName = new URLSearchParams(window.location.search).get('playlist');
    console.log(playlistName)
    var dataLink = "http://nl2-2.deploy.sbs:2066/api/" + playlistName;

    const fetchData = async () => {
        const response = await fetch(dataLink);
        //$('body').append(`<p><a href=${song.name}>${song.name}</a></p>`);
    };
    var jsonData = fetchData()
    console.log(jsonData)

    /*
    $.ajax({
        url: dataLink,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Handle the data returned from the Flask server
            data.result.forEach(function(song) {
                // Access song properties and display them as needed
                $('body').append(`<p><a href=${song.name}>${song.name}</a></p>`);
            });
        },
        error: function(error) {
            console.error('Error:', error);
        }
    })
    */
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', setPlaylist);
