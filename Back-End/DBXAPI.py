import dropbox, requests
from dropbox.oauth import DropboxOAuth2FlowNoRedirect

APP_KEY = "k3i6dmik2tpcy70"
APP_SECRET = "0y2019jz6pq9acn"

'''
# One time use access code
ACCESS_CODE = "eWAEEoLViuwAAAAAAAACs0F_voVDp6Ns-9OWk18fOI0"

# Exchange Authorization Code for Tokens
token_url = 'https://api.dropbox.com/oauth2/token'
token_data = {
  'code': ACCESS_CODE,
  'grant_type': 'authorization_code',
}
token_auth = (APP_KEY, APP_SECRET)
token_response = requests.post(token_url, data=token_data, auth=token_auth)

token_data = token_response.json()
print(token_data)
ACCESS_TOKEN = token_data['access_token']
print("ACCESS: " + str(ACCESS_TOKEN))
REFRESH_TOKEN = token_data['refresh_token']
print("REFRESH: " + str(REFRESH_TOKEN))
'''

ACCESS_TOKEN = "sl.BucdcWtpH6HXO3U3S2hnmluZjMYgsWiDRBqvBbARGcS4KGTFaG1y9Zo9k2SOdNVtgVTwwazKO4EY1Nv-5CSc3Tm70HruJDEgV0G2kwi7NkKPjSKKx-qAkCS-lSMwYw_v-sckVX8Avs9368k"
REFRESH_TOKEN = "ILJuqvHOajsAAAAAAAAAAa6eHpclNC2nBJ0FCkg3NUP1zLi0VfigmH0lY2gcEDmX"

def getNewToken():
  global ACCESS_TOKEN
  # Retrieve a New Access Token with Refresh Token when Access Token Expires
  refresh_url = 'https://api.dropbox.com/oauth2/token'
  refresh_data = {
    'refresh_token': REFRESH_TOKEN,
    'grant_type': 'refresh_token',
    'client_id': APP_KEY,
    'client_secret': APP_SECRET,
  }
  refresh_response = requests.post(refresh_url, data=refresh_data)

  ACCESS_TOKEN = refresh_response.json()['access_token']

# Initialize Dropbox client with the new access token
dbx = dropbox.Dropbox(oauth2_refresh_token=REFRESH_TOKEN, app_key=APP_KEY, app_secret=APP_SECRET)

class Song:
  def __init__(self, name, previewLink, downloadLink):
    self.name = name
    self.previewLink = previewLink
    self.downloadLink = downloadLink

def getSongs(path, songsList):
  folder = dbx.files_list_folder(path)
  for entry in folder.entries:
    if isinstance(entry, dropbox.files.FileMetadata):
      dbxPreviewURL = dbx.sharing_create_shared_link(entry.path_display).url
      previewURL = dbxPreviewURL.replace('dl=0', 'raw=1')
      downloadURL = dbxPreviewURL.replace('dl=0', 'dl=1')
      newSong = Song(entry.name, previewURL, downloadURL)
      songsList.append(newSong)
    else:
      getSongs(entry.path_display, songsList)
  print(str(len(songsList)) + ' Songs Retrieved')
  return songsList      
  
def getVDog():
  path = '/V-Dog'
  print("Gathering Songs...")
  songsList = getSongs(path, [])
  print("Done.")
  return songsList
def getChillVDog():
  path = '/V-Dog/Chill_(V-Dog)'
  print("Gathering Songs...")
  songsList = getSongs(path, [])
  print("Done.")
  return songsList
def getHyperVDog():
  path = '/V-Dog/Hyper_(V-Dog)'
  print("Gathering Songs...")
  songsList = getSongs(path, [])
  print("Done.")
  return songsList
