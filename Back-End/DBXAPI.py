import os, dropbox

access_token = my_secret = os.environ['dbxToken']

dbx = dropbox.Dropbox(access_token)

class Song:
  def __init__(self, name, type, previewLink, downloadLink):
    self.name = name
    self.type = type
    self.previewLink = previewLink
    self.downloadLink = downloadLink

def getSongs(path): 
  songsList = []
  folder = dbx.files_list_folder(path)
  for entry in folder.entries:
    if isinstance(entry, dropbox.files.FileMetadata):
      print(entry.name)
      previewURL = dbx.sharing_create_shared_link(entry.path_display).url
      downloadURL = previewURL.replace('dl=0', 'dl=1')
      print(previewURL)
      print(downloadURL)
      newSong = Song(entry.name, "File", previewURL, downloadURL)
      songsList.append(newSong)
    else:
      getSongs(entry.path_display)
  return songsList      
  
def getVDog():
  path = '/V-Dog'
  return getSongs(path)
