const request = require('request');
const Artist = require('../models/artist');
const User = require('../models/user');

module.exports.info = async function (req, res) {
    try {
        let URL = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${req.query.name}&api_key=ec1751e485c62a6e3459d93c7f0bfd7f&format=json`;
        request({ url: URL, json: true }, async function (err, r, tra) {
            if (err) {
                console.log(err);
                return;
            }

            // You should use a templating engine to render the postings list.
            var page = "<!DOCTYPE html>\n";
            page += "<h1>Here is some music</h1>\n"

            for (var i = 0; i < tra.results.artistmatches.artist.length; i++) {
                var artist = tra.results.artistmatches.artist[i];
                var new_artist = await new Artist();
                var ispresent = await Artist.findOne({ name: artist.name });
                if (!ispresent) {
                    new_artist.name = artist.name;
                    new_artist.url = artist.url;
                    await new_artist.save();
                }
                var artist = await Artist.findOne({ name: req.query.name });
                return res.render('artist_page', {
                    title: "artist page",
                    artist: artist
                })
            }
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.markArtist = async function (req, res) {
    try {
        let user = await User.findOne({ _id: req.user._id });
        let artist = await Artist.findOne({ name: req.query.artist });
        await artist.favorites.push(req.user._id);
        await user.artists.push(artist.id);
        await artist.save();
        await user.save();
        if (req.xhr) {
            return res.json(200, {
                message: "Added to queue"
            })
        }
        return res.redirect('back');
    } catch (err) {
        console.log(err);
    }
}