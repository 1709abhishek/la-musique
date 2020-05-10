const request = require('request');

module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};

// Change this to your postings site shortname.

var BASE = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=ec1751e485c62a6e3459d93c7f0bfd7f&format=json';

module.exports.fetch = function (req, res) {
  // Get postings from REST api.
  request({ url: BASE, json: true }, function (err, r, tra) {
    if (err) {
      next(err);
      return;
    }

    // You should use a templating engine to render the postings list.
    var page = "<!DOCTYPE html>\n";
    page += "<h1>Here is some music</h1>\n"

    for (var i = 0; i < tra.tracks.track.length; i++) {
      var song = tra.tracks.track[i];

      page += "<div>";
      page += "<a href='" + song.name + "'>" + song.name + "</a>";
      page += "</div>\n";
    }
    res.send(page);
  });
}

// module.exports.actionName = function(req, res){}
