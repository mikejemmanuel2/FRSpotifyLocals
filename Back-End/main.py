import DBXAPI

def updateVDogDB():
  songsList = DBXAPI.getVDog()
  with open('V-Dog.txt', 'w') as file:
    # Write content to the file
    for song in songsList:
      file.write(song.name + '\t' + song.previewLink+ '\t' + song.downloadLink + '\n')
def updateChillVDogDB():
  songsList = DBXAPI.getChillVDog()
  with open('Chill_(V-Dog).txt', 'w') as file:
    # Write content to the file
    for song in songsList:
      file.write(song.name + '\t' + song.previewLink+ '\t' + song.downloadLink + '\n')
def updateHyperVDogDB():
  songsList = DBXAPI.getHyperVDog()
  with open('Hyper_(V-Dog).txt', 'w') as file:
    # Write content to the file
    for song in songsList:
      file.write(song.name + '\t' + song.previewLink+ '\t' + song.downloadLink + '\n')

if __name__ == '__main__':
  updateVDogDB()
  updateChillVDogDB()
  updateHyperVDogDB()
