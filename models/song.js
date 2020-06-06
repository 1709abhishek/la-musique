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
    listener: {
        type: Number
    },
    url: {
        type: String
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
});

//defining variable
const Song = mongoose.model('Song', songSchema);

//exporting module
module.exports = Song;