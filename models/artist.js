const mongoose = require('mongoose');

//defining schema
const artistSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
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
const Artist = mongoose.model('Artist', artistSchema);

//exporting module
module.exports = Artist;