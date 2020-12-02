const express = require("express");
const bodyParser = require("body-parser");

const { sendSlackMessage } = require("./post");

const app = express();
const staticOptions = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["js", "css"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res) {
    res.set("x-timestamp", Date.now());
  },
};

app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public", staticOptions));
app.get("/", function (_, res) {
  res.render("index", { title: "Hey", message: "" });
});

const onDone = (res, data) => {
    if (!data.ok) error(res, {message: data.error})
    else success(res)
}
const success = (res) => res.render("index", { title: "Success", message: "Worked okay" })
const error = (res, err) => {
    console.error(err);
    res.render("index", { title: "Failed", message: err.message });
}

app.post("/", function (req, res) {
  try {
    req.body.blocks = JSON.parse(req.body.blocks)
    req.body.blocks = req.body.blocks.blocks || req.body.blocks
    sendSlackMessage(req.body)
      .then((result) => onDone(res, result))
      .catch((err) => error(res, err));
  } catch (err) {
    error(res, err)
  }
});

app
  .listen(1337)
  .on("listening", () =>
    console.log("Server running on http://localhost:1337")
  );
