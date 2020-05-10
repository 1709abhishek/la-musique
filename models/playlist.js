const mongoose = require('mongoose');

//defining schema
const playlistSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    // include the array of ids of all options in this questionSchema itself
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Option'
        }
    ]
}, {
    timestamps: true
});

//defining variable
const Playlist = mongoose.model('Playlist', playlistSchema);

//exporting module
module.exports = Playlist;