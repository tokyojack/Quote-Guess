var router = require("express").Router();

// URL: "/"
module.exports = function (client) {

    // "index.ejs" page
    router.get("/:id", function (req, res) {
        var id = parseInt(req.params.id)
        client.hgetall("id"+id, function(err, reply) {
            if (err) return console.log(err);

            var isCorrect = reply.author == req.query.author;

            if(isCorrect){
                client.del("id"+id, function(err, reply) {
                    console.log("Deleted: "+reply);
                });
            }

            res.send(isCorrect)
        });
    });

    return router;
};