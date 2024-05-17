const express = require("express");

let acasa = {};

acasa.start = async function () {
  acasa.router = express.Router();
};

acasa.init = function (app, collection) {
  acasa.router.get("/home", (req, res) => {
    res.render("home.ejs");
  });
  acasa.router.get("/post", (req, res) => {
    res.render("post.ejs");
  });
  acasa.router.get("/notifications", (req, res) => {
    res.render("notifications.ejs");
  });
  acasa.router.get("/auth", (req, res) => {
    res.render("auth.ejs");
  });
  acasa.router.get("/messages", (req, res) => {
    res.render("messages.ejs");
  });
  acasa.router.get("/search", (req, res) => {
    res.render("search.ejs");
  });
  acasa.router.get("/profile", (req, res) => {
    res.render("profile.ejs");
  });
  acasa.router.get("/settings", (req, res) => {
    res.render("settings.ejs");
  });
  acasa.router.get("/", (req, res) => {
    res.redirect("/home");
  });

  app.use("/", acasa.router);
};

module.exports = acasa;
