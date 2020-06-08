const Tag = require('../models/tag');
const request = require('request');
const User = require('../models/user');

module.exports.fetch = async function (req, res) {
    try {
        let URL = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=ec1751e485c62a6e3459d93c7f0bfd7f&format=json';
        request({ url: URL, json: true }, async function (err, r, tra) {
            if (err) {
                console.log(err);
                return;
            }

            // You should use a templating engine to render the postings list.
            var page = "<!DOCTYPE html>\n";
            page += "<h1>Here is some music</h1>\n"

            for (var i = 0; i < tra.tags.tag.length; i++) {
                var Tags = tra.tags.tag[i];
                var new_tag = await new Tag();
                var ispresent = await Tag.findOne({ name: Tags.name });
                if (!ispresent) {
                    new_tag.name = Tags.name;
                    new_tag.url = Tags.reach;
                    await new_tag.save();
                }
            }
            var genres = await Tag.find({});
            return res.render('genre_page', {
                title: "Genre page",
                genres: genres
            })
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.storeGenre = async function (req, res) {
    try {
        let user = await User.findOne({ _id: req.user._id });
        let x = req.body.tag;
        for (var i = 0; i < x.length; i++) {
            let gen = await Tag({ name: x[i] });
            user.genre.push(gen.id);
        }
        user.save();
        return res.redirect('back');
    } catch (err) {
        console.log(err);
    }
}