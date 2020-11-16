// Add dependencies

const express = require("express");
var path = require("path");
var fs = require("fs");
var rootObj = __dirname

//Express Variable 

const app = express();

// Define the ports to listen for requests

const PORT = process.env.PORT || 5454;

//Set up app to handle data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/assets")));

app.get("/", (req, res) => res.sendFile("/assets/index.html", rootObj));

app.get("/assets/notes.html", (req, res) => res.sendFile("/assets/notes.html", rootObj));


// Notes API Route 
app.get("/api/notes", (req, res) => {
    console.log("/api/notesget")
    let json = getJson();
    console.log(json);
    res.json(json);
});

//app.get("*", (req, res) => {
    //console.log("/assets/index.html");
    //let json = getJson();
    //console.log(json);
    //res.json(json);
//});

// Index API Route
app.post("/api/notes", (req, res) => {
    console.log("api/notespost")
    console.log(req.body);
    addNotesToJSON(req.body);
    res.json(getJson());
});

// Delete ID 
app.delete("/notes.html/:id", (req, res) => {
    console.log("/api/notes/:iddelete")
    deleteNotesFromJSON(req.params.id);
    res.json(getJson());
});

// Start server
app.listen(PORT, function (){
    console.log("server is listening on: http://localhost" + PORT);
});

function getJson() {
    let data = fs.readFileSync(__dirname + "/db/db.json");
    let json = JSON.parse(data);
    // test to see if if we got the data
    // log
    //console.log("Got it!");
    return json;
}

function createNotesObject(data) {
    let obj = { title: data.title,
                text: data.text,
                complete: false,
                hidden: false}
    return obj
}

function addNotesToJSON(note) {
    let json = getJson();
    let newNote = createNotesObject(note);
    json.push(newNote);
    saveJSON(json);
}

function saveJSON(jsonData) {
    let data = JSON.stringify(jsonData);
    fs.writeFileSync(__dirname + "/db/db.json", data);
}

function deleteNotesFromJSON(id) {
    let json = getJson();
    json(id).hide = true
    saveJSON(json);
}