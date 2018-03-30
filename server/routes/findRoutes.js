var router = require("express").Router();
var request = require('request');


var options = {
    hostname: '127.0.0.1',
    port: 5000,
    path: '/quote',
    method: 'GET',
    json:true
}
// URL: "/"
module.exports = function (client) {

    // "index.ejs" page
    router.get("/", function (req, res) {

        request('http://127.0.0.1:5000/quote', function (err, response, body) {
            if (err) return console.log(err);

            var quote = JSON.parse(body);

            console.log("Quote found: ")
            console.log(quote)

            client.keys('*', function (err, keys) {
                if (err) return console.log(err);

                var id = keys.length

                client.hmset("id"+id, {
                    'about_url': quote.about_url,
                    'author': quote.author,
                    'quote': quote.quote
                }, function (err, res2) {
                    if (err) return console.log(err);
                    res.redirect('/question/'+id)
                });
            });
        });
    });

    return router;
};