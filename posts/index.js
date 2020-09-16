const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  //emit an event that new post is created to newly created event bus
  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });
  res.send(posts[id]);
});

//handling the events coming from event bus
app.post("/events", (req, res) => {
  console.log("event recieved: ", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
