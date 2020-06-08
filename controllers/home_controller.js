const request = require('request');
const Song = require('../models/song');
const User = require('../models/user');

module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};

// Change this to your postings site shortname.

var BASE = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=ec1751e485c62a6e3459d93c7f0bfd7f&format=json';

module.exports.fetch = function (req, res) {
  // Get postings from REST api.
  request({ url: BASE, json: true }, async function (err, r, tra) {
    if (err) {
      next(err);
      return;
    }

    // You should use a templating engine to render the postings list.
    var page = "<!DOCTYPE html>\n";
    page += "<h1>Here is some music</h1>\n"

    for (var i = 0; i < tra.tracks.track.length; i++) {
      var song = tra.tracks.track[i];
      var new_song = await new Song();
      var ispresent = await Song.findOne({ name: song.name });
      if (!ispresent) {
        new_song.name = song.name;
        new_song.duration = song.duration;
        new_song.playcount = song.playcount;
        new_song.listener = song.listeners;
        new_song.url = song.url;
        await new_song.save();
      }

      // page += "<div>";
      // page += "<a href='" + song.url + "'>" + song.name + "</a>";
      // page += "</div>\n";
    }
    // res.render('user_profile', {
    //   title: "user page",
    //   songs: tra.tracks.track
    // })
  });

}

module.exports.mark = async function (req, res) {
  try {
    console.log(req.user._id);
    let user = await User.findOne({ _id: req.user._id });
    let song = await Song.findOne({ name: req.query.song });
    await song.favorites.push(req.user._id);
    await user.songs.push(song.id);
    await song.save();
    await user.save();
    return res.redirect('back');
  } catch (err) {
    console.log(err);
  }
}

module.exports.showFavorite = async function (req, res) {
  try {
    console.log(req.user._id);
    let user = await User.findOne({ _id: req.user._id });
    return res.render('favorite_songs', {
      title: "favorite songs",
      songs: user.songs
    })
  } catch (err) {
    console.log(err);
  }
}

