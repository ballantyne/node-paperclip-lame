const lame            = require("lame");
const fs              = require('fs');
const randomstring    = require('randomstring');
const NodeID3         = require('node-id3')
const wav             = require('wav');
const apic            = require('./apic');


module.exports        = function(paperclip) {
  var obj             = {};

  obj.paperclip       = paperclip;

  obj.perform         = function(options, next) {
    var self          = this;

    var supportedMeta = [ 'album','bpm','composer','genre','copyright','date',
                          'playlistDelay','encodedBy','textWriter','fileType',
                          'time','contentGroup','title','subtitle','initialKey',
                          'language','length','mediaType','originalTitle',
                          'originalFilename','originalTextwriter','originalArtist',
                          'originalYear','fileOwner','artist','performerInfo',
                          'conductor','remixArtist','partOfSet','publisher',
                          'trackNumber','recordingDates','internetRadioName',
                          'internetRadioOwner','size','ISRC','encodingTechnology',
                          'year','comment', 'image' ];

    // https://en.wikipedia.org/wiki/ID3#ID3v2_embedded_image_extension
    // image: { 
    //   mime: "png/jpeg"/undefined, 
    //   type: { 
    //     id: 3,
    //     name: "front cover
    //   }, 
    //   description: "image description", 
    //   imageBuffer: (file buffer)
    // }


    var tags = {};

    for (i = 0; i < supportedMeta.length; i++) {
      var tag         = supportedMeta[i]
      if (self.paperclip.class().document[tag]) {
        tags[tag] = self.paperclip.class().document[tag];
      }
    }
    if (self.paperclip.class().document.comment != undefined) {
      tags.comment    = {
        language: (self.paperclip.class().document.language ? self.paperclip.class().document.language : 'eng'),
        text: self.paperclip.class().document.comment
      }
    }

    // if (self.paperclip.document.image != undefined) {
    //   tags.image = {
    //     mime: self.paperclip.document.image.content_type,
    //     imageBuffer: self.paperclip.document.image.buffer,

    //   }
      
    //   tags.image.type = apic(self.paperclip.image_type)
      
    //   if (self.paperclip.document.image_description) {
    //     tags.image.description = self.paperclip.document.image_description;
    //   }
    // }

    tags.encodingTechnology = 'lame';

    var outfile = self.paperclip.file().file.path + randomstring.generate() +".mp3"
    input = fs.createReadStream(self.paperclip.file().file.path);
    output = fs.createWriteStream(outfile);

    output.on('finish', function() {
      NodeID3.write(tags, outfile, function(err) {
        fs.readFile(outfile, function(err, buffer) {
          fs.unlink(outfile, function(err) {
            next(null, buffer);
          });
        });
      });
    })

    var reader = new wav.Reader();
    reader.on('format', onFormat);

    function onFormat (format) {

      var encoder = new lame.Encoder(format);
      reader.pipe(encoder).pipe(output);
    
    }
    
    input.pipe(reader);
  
  }
  
  return obj;

};

