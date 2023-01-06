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
  const name = user.username;
  avatar = user.avatar;
  if (typeof avatar !== "string" || typeof name !== "string") {
    return res.status(400).send("UNAUTHORIZED");
  } else if (avatar.length === 0 || name.length === 0) {
    return res.status(400).send("Preencha os campos vazios!");
  } else if (avatar === null || name === null) {
    return res.status(400).send("UNAUTHORIZED");
  }
  users.push(user);
  return res.status(201).send("OK");
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

  if (
    tweets.length == 0 &&
    currentUser &&
    typeof message === "string" &&
    message.length !== 0
  ) {
    tweet.avatar = avatar;
    tweets.unshift(tweet);
    return res.status(201).send("OK");
  } else if (typeof message !== "string") {
    return res.status(400).send("UNAUTHORIZED");
  } else if (message.length === 0) {
    return res.status(400).send("Tweet vazio não é permitido!");
  } else if (message === null) {
    return res.status(400).send("UNAUTHORIZED");
  } else if (currentUser) {
    tweet.avatar = avatar;
    tweets.unshift(tweet);
    return res.status(201).send("OK");
  } else {
    return res.status(400).send("UNAUTHORIZED");
  }
});

app.listen(PORT, () => {
  console.log("servidor está aberto!");
});
