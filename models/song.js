const mongoose = require('mongoose');

//defining schema
const songSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    playcount: {
        type: Number
    },
    duration: {
        type: Number
    },
    listeners: {
        type: Number
    },
    url: {
        type: String
    }
}, {
    timestamps: true
});

//defining variable
const Song = mongoose.model('Song', songSchema);

//exporting module
module.exports = Song;