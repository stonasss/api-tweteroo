import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

const users = [];
const tweets = [];
let avatar = "";

app.post("/sign-up", (req, res) => {
  avatar = [];
  const user = req.body;
  avatar = user.avatar;
  users.push(user);
  console.log(user);
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  if (tweets.length >= 10) {
    res.send(tweets.slice(0, 10));
  }
  res.send(tweets);
});

app.post("/tweets", (req, res) => {
  console.log(tweets);

  const tweet = req.body;
  const message = tweet.tweet;
  const currentUser = users.find((item) => item.username === tweet.username);

  if (tweets.length == 0 && currentUser) {
    tweet.avatar = avatar;
    tweets.unshift(tweet);
    return res.status(201).send("OK");
  } else if (message.length == 0) {
    return res.status(401).send("Tweet vazio não é permitido");
  } else if (currentUser) {
    tweet.avatar = avatar;
    tweets.unshift(tweet);
    return res.status(201).send("OK");
  } else {
    return res.status(401).send("UNAUTHORIZED");
  }
});

app.listen(PORT, () => {
  console.log("servidor está aberto!");
});