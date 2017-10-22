"use strict";

//const MongoClient = require("mongodb").MongoClient;
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  

//refactor and making a new, tweet-specific function
// function getTweets(callback) {
//   db.collection("tweets").find().toArray((err, results) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(null, tweets)
//   });
// }

//same as above:
function getTweets(callback) {
  db.collection("tweets").find().toArray(callback)
}

getTweets((err, tweets) => {
  if (err) throw err;

  console.log("Logging each tweet:");
  for (let tweet of tweets) {
    console.log(tweet);
  }

    db.close();
  });
});;