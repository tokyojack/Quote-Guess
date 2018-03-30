//============================= Packages =============================

var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var colors = require('colors');

// Redis
var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('Redis has connected');
});

//============================= Letting express use them =============================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



//============================= Routes =============================

var questionRoutes = require("./routes/questionRoutes")(client);
app.use("/question", questionRoutes);

var findRoutes = require("./routes/findRoutes")(client);
app.use("/find", findRoutes);

var questionCheckRoutes = require("./routes/questionCheckRoutes")(client);
app.use("/questioncheck", questionCheckRoutes);

var indexRoutes = require("./routes/indexRoutes")();
app.use("/", indexRoutes);

//============================= Socket io =============================


//============================= Starting Server =============================

// Make sure it's "http" instead of "app" for Socket.io
app.listen(8080, function() {
    console.log("Server running".rainbow);
});