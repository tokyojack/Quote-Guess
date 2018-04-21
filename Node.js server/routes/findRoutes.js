var router = require("express").Router();
var request = require('request');


// URL: "/find"
module.exports = function (client) {

    // Put's the player into a game
    router.get("/", function (req, res) {

        // Get's the random quote from the Flask server
        request('http://127.0.0.1:5000/quote', function (err, response, body) {
            if (err) return console.log(err);

            var quote = JSON.parse(body);

            console.log("Quote found: ")
            console.log(quote)

            client.keys('*', function (err, keys) {
                if (err) return console.log(err);

                // Getting the currentLength so the items become unique
                var id = keys.length
                
                // Add's match to Redis
                client.hmset("id"+id, {
                    'about_url': quote.about_url,
                    'author': quote.author,
                    'quote': quote.quote
                }, function (err, res2) {
                    if (err) return console.log(err);
                    res.redirect('/question/'+id); // Redirect's player to game
                });
            });
        });
    });

    return router;
};