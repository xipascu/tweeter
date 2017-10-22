"use strict";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app   = express();
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.log("Failed to connect: ${MONGODB_URI}");
    throw err;
  } 
  console.log(db);
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
   
  
console.log("here");
  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});

