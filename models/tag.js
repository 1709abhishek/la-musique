const mongoose = require('mongoose');

//defining schema
const tagSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    reach: {
        type: String
    },
    selectable: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
});

//defining variable
const Tag = mongoose.model('Tag', tagSchema);

//exporting module
module.exports = Tag;