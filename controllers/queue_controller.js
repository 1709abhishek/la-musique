var Queue = require('../models/queue');
var Song = require('../models/song');

module.exports.addToQueue = async function (req, res) {
    try {
        var queue = await Queue.findOne({ user: req.user._id });
        var song = await Song.findOne({ name: req.query.song });
        queue.songs.push(song.id);
        queue.save();
        if (req.xhr) {
            return res.json(200, {
                message: "Added to queue"
            })
        }
        return res.redirect('back');
    } catch (err) {

    }
}

module.exports.showQueue = async function (req, res) {
    try {
        var queue = await Queue.findOne({ user: req.user._id });
        return res.render('show_queue', {
            title: "queue",
            queue: queue.songs
        })
    } catch (err) {
        console.log(err);
    }
}