import express from "express";
import "dotenv/config";
import http from "http";
import monRouter from "./routes/Router.js";

const app = express();

const server = http.createServer(app);

app.use('/', monRouter);

// const ws = process.env.DB_URI
app.use(express.static("public"));

app.use(express.json());

app.all("*", (req, res) => {
  res.json({
    success: true,
    message: "Hello World",
    ReferenceError: "ReferenceError",
  });
})

//Server listening
server.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
/*********************************************** */

//Statics files
app.use(express.static("public"));

// Connect to MongoDB
const mongoUrl = process.env.DB_URI;
MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to MongoDB");
  const db = client.db("subscriptions");

  //Get all subscriptionss
  app.get("/subscriptions", (req, res) => {
    db.collection("subscriptions")
      .find()
      .toArray()
      .then((subscriptionss) => res.json(subscriptionss))
      .catch((err) => console.log(err));
  });

  //Get single subscriptions
  app.get("/subscriptions/:id", (req, res) => {
    const id = req.params.id;
    db.collection("subscriptions")
      .find({ _id: new MongoDB.ObjectID(id) })
      .toArray()
      .then((subscriptionss) => res.json(subscriptionss))
      .catch((err) => console.log(err));
  });

  //Add new subscriptions
  app.post("/subscriptions", (req, res) => {
    const subscriptions = req.body;
    db.collection("subscriptions").insertOne(subscriptions, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(result.ops[0]);
    });
  });

  //Update subscriptions
  app.put("/subscriptions/:id", (req, res) => {
    const id = req.params.id;
    const subscriptions = req.body;
    db.collection("subscriptions")
      .findOneAndUpdate(
        { _id: new MongoDB.ObjectID(id) },
        { $set: { completed: subscriptions.completed } },
        { returnOriginal: false }
      )
      .then((result) => res.json(result.value))
      .catch((err) => console.log(err));
  });

  //Delete subscriptions
  app.delete("/subscriptions/:id", (req, res) => {
    const id = req.params.id;
    db.collection("subscriptions")
      .deleteOne({ _id: new MongoDB.ObjectID(id) })
      .then((result) => res.json(result.value))
      .catch((err) => console.log(err));
  })

  //Start server
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);

  });
});
