var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var fs = require('fs');
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

//function that dictates how to sort the id
function sortID(a, b) {
        //sort the ids by ascending order
        return  (a.resource.id) -  parseFloat(b.resource.id);
    }

//receive GET request from anywhere
app.get('/', function(req, res) {
    //send homepage
    res.sendFile(__dirname + "/" + "homepage.html");
})

app.post('/process_post', function(req, res) {
    //get the unformatted json submitted
    response = {
        body_json: req.body.body_json,
    }
    //parse the given json string as a proper json object
    var rawJSON = JSON.parse(response["body_json"]);
    //get entry key
    var unformattedEntry = rawJSON.entry;
    //sort the unformatted JSON's immunization
    unformattedEntry.sort(sortID);
    
    //put the now ordered immunizations back and send the formatted json back
    rawJSON.entry = unformattedEntry;

    res.end(JSON.stringify(rawJSON, null, 4));

})


//start server at port 8081
var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port
        //print to console server address and port
    console.log("Server listening at http://%s:%s", host, port)

})