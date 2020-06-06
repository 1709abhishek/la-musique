const mongoose = require('mongoose');

//defining schema
const queueSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include the array of ids of all options in this questionSchema itself
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        }
    ]
}, {
    timestamps: true
});

//defining variable
const Queue = mongoose.model('Queue', queueSchema);

//exporting module
module.exports = Queue;