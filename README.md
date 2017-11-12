
node-paperclip-audio
=========

This is a plugin that works with node-paperclip.  I takes wav files and encodes them to mp3 and adds tags. 

To install 

```bash
sudo apt-get install lame 
```
Or for windows, maybe try http://kb.madcapsoftware.com/mobile/Basic/Content/Mimic/General/GEN1004M_-_Installing_LAME_MP3_Encoder_on_Windows_Vista.htm ?  I haven't tested the windows installation.  If you are successful at installing lame on windows and want to help out, submit a pull request and I will add that information here.

```bash
npm install node-paperclip-audio --save
```

Here is an example of a model that uses the mongoose plugin.

```javascript
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const Paperclip    = require('node-paperclip');

const Track = new Schema({
  title:       String,
  artist:      String,
  album:       String,
  year:        String,
  trackNumber: String,
  genre:       String
});

Track.plugin(Paperclip.plugins.mongoose, {
  track: {
    recording: { 
      parameterize_field: 'title',
      class_name: 'track',
      has_attached_file: 'song', 
      styles: [
        { original: true },
        { normal:   { extension: 'mp3', bitrate: 192,  task: require('node-paperclip-lame') } }
      ],
      prefix:      '{{class_name}}/{{plural}}/{{document._id}}',
      name_format: '{{style}}/{{document.trackNumber}}-{{parameterize}}.{{extension}}',
      storage: 'file'
    }
  }
})

module.exports     = mongoose.model('Track', Track);
```

Here is an example of an express route that uses that Track model.

```javascript
const express      = require('express');
const router       = express.Router();

const Track        = require('track');
const middleware   = require('paperclip').middleware

router.post('/post_track',

    middleware.parse({stream: true}), 

  function (req, res) {  
    Track.create(req.body.track, function(err, doc) {
      res.redirect('/');
    });
})

```

```html
    <form  class="form-horizontal" enctype="multipart/form-data" action="/post_track" method="post">

    <div>
      <label>Title</label>
      <input type="text" name="track[title]" id="title">
    </div>

    <div>
      <label>Artist</label>
      <input type="text" name="track[artist]" id="artist">
    </div>

    <div>
      <label>Album</label>
      <input type="text" name="track[album]" id="album">
    </div>

    <div>
      <label>Year</label>
      <input type="text" name="track[year]" id="year">
    </div>

    <div>
      <label>Track</label>
      <input type="text" name="track[trackNumber]" id="track">
    </div>

    <div>
      <label>Genre</label>
      <input type="text" name="track[genre]" id="genre">
    </div>

    <div>
      <label>File</label>
      <input type="file" name="track[recording]" id="file">
    </div>

    <div  class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <input class='btn btn-default' type="submit" value="Save"/>
      </div>
    </div>
    </form>

```

This module uses s3 by default, but can use a file system if you want.  The example above is configured to use the file system.  If you plan to use s3 you will need the following environment variables set the AWS_BUCKET, AWS_REGION, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.

Contributing
------------

If you'd like to contribute a feature or bugfix: Thanks! To make sure your
fix/feature has a high chance of being included, please read the following
guidelines:

1. Post a [pull request](https://github.com/ballantyne/node-paperclip-lame/compare/).
2. Make sure there are tests! We will not accept any patch that is not tested.
   It's a rare time when explicit tests aren't needed. If you have questions
   about writing tests for paperclip, please open a
   [GitHub issue](https://github.com/ballantyne/node-paperclip-lame/issues/new).


And once there are some contributors, then I would like to thank all of [the contributors](https://github.com/ballantyne/node-paperclip-lame/graphs/contributors)!

License
-------

It is free software, and may be redistributed under the terms specified in the MIT-LICENSE file.

Copyright 
-------
© 2017 Scott Ballantyne. See LICENSE for details.

