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
