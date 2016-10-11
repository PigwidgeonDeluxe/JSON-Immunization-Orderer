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
        //console.log(parseFloat(a.resource.id), parseFloat(b.resource.id))
        return  parseFloat(a.resource.id) -  parseFloat(b.resource.id);
    }

//function that dictates how to sort the names
function sortName(a, b) {
        //sort the names by ascending order
        var name_a = (a.resource.vaccineCode.coding[0].display);
        var name_b = (b.resource.vaccineCode.coding[0].display);

        //if the two immunizations are the same, sort by id number
        if (name_a == name_b){
            return sortID(a, b);
        } else {
            return (name_a).localeCompare(name_b);
        }

    }

//receive GET request from anywhere
app.get('/', function(req, res) {
    //send homepage
    res.sendFile(__dirname + "/" + "homepage.html");
})

app.post('/process_post', function(req, res) {
    // catch any errors caused by improper input JSON formatting
        //get the unformatted json submitted
        response = {
            body_json: req.body.body_json,
        }
        //parse the given json string as a proper json object
        var rawJSON = JSON.parse(response["body_json"]);
        //get entry key
        var unformattedEntry = rawJSON.entry;
    //console.log(unformattedEntry);
        //list of keys to not be sorted
        var noSort = [];
        //temporarily remove all keys that will not be sorted
        for (var k in unformattedEntry){
            if (unformattedEntry[k].resource.resourceType != "Immunization"){
                noSort.push(unformattedEntry[k]);
                delete unformattedEntry[k];
                //console.log("noSort", noSort);
            }
        }

        //sort the sorted ids by name
        var formattedName = unformattedEntry.sort(sortName);

        //put the temporarily removed keys back into the now sorted array
        for (var k in noSort){
            formattedName.push(noSort[k]);
        }

        //remove all null values from the array
        var resultSort = formattedName.filter(Boolean);
        
        //put the now ordered immunizations back and send the formatted json back
        rawJSON.entry = resultSort;

        res.end(JSON.stringify(rawJSON, null, 4));
        

})


//start server at port 8081
var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port
        //print to console server address and port
    console.log("Server listening at http://%s:%s", host, port)

})