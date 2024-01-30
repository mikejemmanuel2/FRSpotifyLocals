var playlistName = new URLSearchParams(window.location.search).get('playlist');
var filePath = playlistName + '.txt'

const request = new XMLHttpRequest();
request.open("GET", filePath, false);
request.send();
var playlistData= request.responseText.split(/\t|\n/)

var songNames = [];
var songPreviews = [];
var songDownloads = [];
for (let i = 0; i < playlistData.length; i++) {
    var condition = i % 3
    if (condition == 0) {
        songNames.push(playlistData[i])
    } else if (condition == 1) {
        songPreviews.push(playlistData[i])
    } else {
        songDownloads.push(playlistData[i])
    }
}
songNames.pop(songNames.length - 1)

for (let i = 0; i < songNames.length; i++) {
    var paragraph = document.createElement("p");
    var node = document.createElement("a")
    node.href = songPreviews[i]
    node.text = songNames[i]
    node.target = "_blank"
    paragraph.appendChild(node)
    const textBox = document.getElementById("playlistParagraphs")
    textBox.appendChild(paragraph)
    paragraph = document.createElement("audio")
    paragraph.controls = true
    paragraph.src = songPreviews[i]
    textBox.appendChild(paragraph)
}

