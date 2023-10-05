//server.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
let mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
app.use(bodyParser.json());
app.use(cors());

let collection = null;
(async () => {
  //mongodb://localhost:27017
  try {
    const url =
      "mongodb+srv://hazshilo:1234@cluster1.ifbyw.mongodb.net/?tlsAllowInvalidCertificates=true";
    const connection = await mongo.connect(url);
    const db = connection.db("mydb1");
    collection = db.collection("file1");
  } catch (error) {
    console.log("tovim", error);
  }
})();

app.get("/", async (req, res) => {
  let data = await collection.find({}).toArray();
  res.json(data);
});
app.post("/reqData", async (req, res) => {
  let products = req.body;
  let data = await collection.find({}).toArray();
  console.log(data.length);
  if (data.length === 0) {
    await collection.insertMany(products);
  }
  res.json(data);
});
{
}
// git add .
// git commit -am ";"
// git push -u origino main

app.post("/ashrai", async (req, res) => {
  console.log(req.body);
  res.send("ok");
});
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
