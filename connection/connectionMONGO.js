const { MongoClient } = require('mongodb');

var db;
require('dotenv').config();


try {
    // MongoDB Atlas connection URL with database name
    const uri = process.env.MONGO_URI;

    // Create a new MongoClient
    const client = new MongoClient(uri);

    // Connect to MongoDB Atlas
    client.connect();

    // Access the 'ml' database
    db = client.db('test');

    console.log("Connected To MONGO-DB - mongodb");

} catch (error) {

    console.log("ERROR FROM connectionMONGO.js")
    console.log(error);
}

module.exports = db;
