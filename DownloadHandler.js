var ownedSongs = []
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
var missingSongs = songNames.slice()
var missingSongsDL = songDownloads.slice()

const textBox = document.getElementById("downloadToolBox")
var paragraph = document.createElement("p");
textBox.appendChild(paragraph)
paragraph.innerText = missingSongs.length + " songs to download." + "\n" + "Please provide folders that have playlist mp3 files"
textBox.appendChild(paragraph)

function resetData() {
    console.log("Data Reset")
    ownedSongs = []
    missingSongs = songNames.slice()
    textBox.removeChild(textBox.lastElementChild)
    paragraph.innerText = missingSongs.length + " songs to download." + "\n" + "Please Choose Folders to Check."
    textBox.appendChild(paragraph)
}
function searchFolderContents() {
    const folderInput = document.getElementById('folderInput');
    // Check if files are selected
    if (folderInput.files.length > 0) {
        // Display each selected file
        for (const file of folderInput.files) {
            if (songNames.includes(file.name)) {
                if (!ownedSongs.includes(file.name)) {
                    ownedSongs.push(file.name)
                }
            }
        }
        missingSongs = []
        missingSongsDL = []
        for (let i = 0; i < songNames.length; i++) {
            if (!ownedSongs.includes(songNames[i])) {
                if (!missingSongs.includes(songNames[i])) {
                    missingSongs.push(songNames[i])
                    missingSongsDL.push(songDownloads[i])
                }
            }
        }
        console.log("Owned Songs: " + ownedSongs.length)
        console.log("Missing Songs: " + missingSongs.length)

        textBox.removeChild(textBox.lastElementChild)
        paragraph.innerText = missingSongs.length + " songs to download."
            if (missingSongs.length != 0) {
                paragraph.innerText += "\n" + "Are there any mp3 files in folders you missed?"
            } else {
                paragraph.innerText += "\n" + "You are not missing any songs from this Playlist."
            }
        textBox.appendChild(paragraph)
        //Next up. Send Missing Song Names and ask if they want to download
    } else {
        console.log("No folder selected.")
    }
}
async function downloadMissingSongs() {
    if (missingSongs.length == 0) {
        textBox.removeChild(textBox.lastElementChild)
        paragraph.innerText = missingSongs.length + " songs to download." + "\n" + "No need to Download."
        textBox.appendChild(paragraph)

    } else {
        console.log("Getting Downloads Ready");
        textBox.removeChild(textBox.lastElementChild)
        paragraph.innerText = "Gathering Songs for Download"
        textBox.appendChild(paragraph)

        var zip = new JSZip();
        var fileCount = 0

        for (var i = 0; i < missingSongs.length; i++) {
            var songName = missingSongs[i];
            var downloadURL = missingSongsDL[i];

            // Replace www.dropbox.com with dl.dropboxusercontent.com
            downloadURL = downloadURL.replace("www.dropbox.com", "dl.dropboxusercontent.com");

            try {
                // Await the result of each fetch call
                const response = await fetch(downloadURL);
                const blob = await response.blob();
                fileCount++
                var songsLeft = missingSongs.length - fileCount

                zip.file(songName, blob);
                console.log("Missing Song Processed");

                textBox.removeChild(textBox.lastElementChild)
                paragraph.innerText = songsLeft + " songs left to load." + "\n" + "Please Wait."
                textBox.appendChild(paragraph)

            } catch (error) {
                console.error("Error fetching song:", error);
            }
        }

        console.log("All fetch promises resolved. Generating Zip");
        textBox.removeChild(textBox.lastElementChild)
        paragraph.innerText = "Loading Complete." + "\n" + "Downloading Playlist Zip File." + "\n"
        textBox.appendChild(paragraph)

        zip.generateAsync({ type: "blob" })
            .then(content => {
                var link = document.createElement('a');
                link.href = URL.createObjectURL(content);
                link.download = "MissingSongs.zip";
                link.textContent = "If on IOS or download wont start, Click Here";
                link.click();

                textBox.removeChild(textBox.lastElementChild)
                paragraph.appendChild(link);
                textBox.appendChild(paragraph)
            });

        console.log("Done");
    }
}