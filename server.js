// Add dependencies

const express = require("express");

//Express Variable 

const app = express();

// Define the ports to listen for requests

const PORT = process.env.PORT || 5454;

//Set up app to habndle data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use (express.static("assests"));
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

// Start server
app.listen(PORT, function (){
    console.log("server is listening on: http://localhost" + PORT);
});
