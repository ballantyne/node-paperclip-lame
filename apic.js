// These are the ids that go along with the different image types, I haven't tried to 
// the ones with letters yet, if that doesn't work maybe this should just be the index 
// of the array on this page here.
//
// https://github.com/Zazama/node-id3/blob/master/index.js#L78-L100
//
// If you find that it isn't working as expected, let me know and I will adjust the code.
//
// $00     Other
// $01     32x32 pixels 'file icon' (PNG only)
// $02     Other file icon
// $03     Cover (front)
// $04     Cover (back)
// $05     Leaflet page
// $06     Media (e.g. label side of CD)
// $07     Lead artist/lead performer/soloist
// $08     Artist/performer
// $09     Conductor
// $0A     Band/Orchestra
// $0B     Composer
// $0C     Lyricist/text writer
// $0D     Recording Location
// $0E     During recording
// $0F     During performance
// $10     Movie/video screen capture
// $11     A bright coloured fish
// $12     Illustration
// $13     Band/artist logotype
// $14     Publisher/Studio logotype

module.exports = function(id) {
  switch(id) {
    case 0:
      return {id: 0, name: 'Other'};
      
    case 1:
      return {id: 1, name: 'file icon'};
    
    case 2:
      return {id: 2, name: 'Other file icon'};
    
    case 3:
      return {id: 3, name: 'Cover (front)'};
 
    case 4:
      return {id: 4, name: 'Cover (back)'};

    case 5:
      return {id: 5, name: 'Leaflet page'};
    
    case 6:
      return {id: 6, name: 'Media'};
    
    case 7:
      return {id: 7, name: 'Lead Artist/lead performer/soloist'};
     
    case 8:
      return {id: 8, name: 'Artist/performer'};

    case 9:
      return {id: 9, name: 'Conductor'};
    
    case "A":
      return {id: 10, name: 'Band/Orchestra'};
    
    case "B":
      return {id: 11, name: 'Composer'};
     
    case "C":
      return {id: 12, name: 'Lyracist/text writer'};

    case "D":
      return {id: 13, name: 'Recording Location'};
    
    case "E":
      return {id: 14, name: 'During Recording'};

    case "F":
      return {id: 14, name: 'During Performance'};

    case 10:
      return {id: 10, name: 'Movie/video screen capture'};
    
    case 11:
      return {id: 11, name: 'A bright coloured fish'};
     
    case 12:
      return {id: 12, name: 'Illustration'};

    case 13:
      return {id: 13, name: 'Band/artist logotype'};
    
    case 14:
      return {id: 14, name: 'Publisher/Studio logotype'};
    
    default: 
      return {id: 3, name: 'Cover Front'};
  }
}

