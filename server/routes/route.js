const controller = require("../controllers/controller");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const app = express();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    proxy: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/signup", controller.creatAccountPost);
app.post("/login", (req, res, next) => {
  passport.authenticate("user", (err, user, info) => {
    console.log(info);
    if (err) throw err;
    if (!user) res.status(401).json(info);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.sendStatus(200);
      });
    }
  })(req, res, next);
});
app.get("/user", controller.userget);
app.get("/search/:str", controller.search);

app.post("/profile", upload.single("avatar"), controller.profile);

module.exports = app;
