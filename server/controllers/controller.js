let mongoose = require("mongoose");
const User = require("../models/userModel");

module.exports.creatAccountPost = async (req, res) => {
  //console.log(req.body)
  let user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    surename: req.body.surename,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    await user.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};
module.exports.userget = (req, res) => {
  const user = req.user;
  if (user) res.json(user);
  else res.json(404);
};

module.exports.search = async (req, res) => {
  let searchStr = req.params["str"];
  console.log(searchStr);
  let result = await User.find({ $text: { $search: searchStr } }).limit(10);
  res.json(result);
};

module.exports.profile = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        img: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
