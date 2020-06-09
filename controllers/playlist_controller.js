const Playlist = require('../models/playlist');
const Song = require('../models/song');

module.exports.create = async function (req, res) {
    try {
        var new_playlist = await new Playlist();
        new_playlist.name = req.body.name;
        new_playlist.user = req.user._id;
        await new_playlist.save();
        return res.redirect("back");
    } catch (error) {
        console.log("******", error);
    }
}

module.exports.addSong = async function (req, res) {
    try {
        console.log("****");
        var playlist = await Playlist.findOne({ name: req.query.playlist });
        var song = await Song.findOne({ name: req.query.song });
        await playlist.songs.push(song.id);
        console.log(playlist);
        await playlist.save();
        return res.redirect('back');
    } catch (err) {
        console.log("******", err);
    }
}

module.exports.show = async function (req, res) {
    try {
        var playlist = await Playlist.find({ user: req.user._id });
        return res.render('user_playlist', {
            title: "playlists",
            playlist: playlist
        })
    } catch (err) {
        console.log("******", err);
        return res.redirect('back');
    }
}

module.exports.showParticular = async function (req, res) {
    try {
        var playlist = await Playlist.findOne({ name: req.query.name });
        let songs = await playlist.populate({ path: 'songs' }).execPopulate();
        return res.render('show_each_playlist', {
            title: "playlists",
            playlist: songs.songs
        })
    } catch (err) {
        console.log("******", err);
        return res.redirect('back');
    }
}