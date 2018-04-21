var router = require("express").Router();

// URL: "/questioncheck"
module.exports = function (client) {

    // Check's if the question if correct
    router.get("/:id", function (req, res) {
        var id = parseInt(req.params.id)

        // Get's match from ID
        client.hgetall("id"+id, function(err, reply) {
            if (err) return console.log(err);

            // Check's if the author is the same in the posted one
            var isCorrect = reply.author == req.query.author;

            if(isCorrect){

                // Deletes the match as the player won
                client.del("id"+id, function(err, reply) {
                    console.log("Deleted: "+reply);
                });
            }
            
            // Return's if the player won or not
            res.send(isCorrect)
        });
    });

    return router;
};