var router = require("express").Router();

// URL: "/question"
module.exports = function (client) {

    // When the player is redirected from "/find" to a game
    router.get("/:id", function (req, res) {
        var id = parseInt(req.params.id);

        client.hgetall("id" + id, function (err, reply) {
            if (err) return console.log(err);
            if (reply == null) { // This can also catches if a match/game ID isn't avaliable
                res.redirect("/")
            }
            
            res.render("quoteQuestion.ejs", { quoteText: reply.quote });
        });
    });

    return router;
};