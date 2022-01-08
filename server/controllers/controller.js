let mongoose = require("mongoose");
const User = require("../models/userModel");
const Friends = require("../models/friendsModel");

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
  let result = await User.find({ $text: { $search: searchStr } }).limit(10);
  res.json(result);
};
module.exports.people = async (req, res) => {
  let email = req.params["email"];
  let result = await User.findOne({ email: email });
  let friend = await Friends.findOne({
    $or: [
      { $and: [{ sender: result._id }, { receiver: req.user._id }] },
      { $and: [{ sender: req.user._id }, { receiver: result._id }] },
    ],
  });
  //console.log(req.user._id,result._id )
  if (friend) {
    if (friend.friendStatus === "friends")
      friend = { friendStatus: "unfriend" };
    else if (friend.sender.equals(req.user._id))
      friend = { friendStatus: "cancel request" };
    else friend = { friendStatus: "accept request" };
  } else friend = { friendStatus: "Add Friend" };
  res.json([result, friend]);
};

module.exports.profileEdit = async (req, res) => {
  let buffer = null;
  let mimetype = null;
  if (req.file) {
    buffer = req.file.buffer;
    mimetype = req.file.mimetype;
  }
  try {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        firstname: req.body.firstname,
        surename: req.body.surename,
        email: req.body.email,
        twitterURL: req.body.twitterURL || "",
        instgramURL: req.body.instgramURL || "",
        facebookURL: req.body.facebookURL || "",
        bio: req.body.bio || "",
        img: {
          data: buffer || req.user.img.data,
          contentType: mimetype || req.user.img.contentType,
        },
      }
    );
    res.sendStatus(200);
  } catch (err) {
    if (err.code === 11000) res.sendStatus(400);
    else res.sendStatus(500);
  }
};
module.exports.addFriendREQ = async (req, res) => {
  if (req.body.friendStatus === "Add Friend") {
    let addFriend = new Friends({
      sender: req.user._id,
      receiver: req.body.people,
      friendStatus: "pending",
    });
    try {
      await addFriend.save();
      res.json("cancel request").status(200);
    } catch (err) {
      res.sendStatus(500);
    }
  } else if (req.body.friendStatus === "accept request") {
    try {
      await Friends.findOneAndUpdate(
        {
          $or: [
            { $and: [{ sender: req.body.people }, { receiver: req.user._id }] },
            { $and: [{ sender: req.user._id }, { receiver: req.body.people }] },
          ],
        },
        { friendStatus: "friends" }
      );
      res.json("unfriend").status(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  } else {
    try {
      await Friends.findOneAndDelete({
        $or: [
          { $and: [{ sender: req.body.people }, { receiver: req.user._id }] },
          { $and: [{ sender: req.user._id }, { receiver: req.body.people }] },
        ],
      });
      res.json("Add Friend").status(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
};

module.exports.allFriends = async (req, res) => {
  try {
    let friends = await Friends.find({
      $or: [{ receiver: req.user._id }, { sender: req.user._id }],
      friendStatus: "friends",
    });
    friends = await Promise.all(
      friends.map(async (friend) => {
        let id = friend.sender;
        if (req.user._id.equals(id)) id = friend.receiver;

        let data = await User.findOne({ _id: id });
        return data;
      })
    );
    res.json(friends);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
module.exports.pendingFrindes = async (req, res) => {
  try {
    let PendingFriends = await Friends.find({
      receiver: req.user._id,
      friendStatus: "pending",
    });
    PendingFriends.map(async (friend) => {
      return await User.findOne({ _id: friend.sender });
    });
    res.json(PendingFriends);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
module.exports.addPost = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { posts: { content: req.body.post } } }
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};
// module.exports.GETPosts = async (req, res) => {
//   let id = req.body.id;
//   if (id === undefined) id = req.user._id;
//   try{
//   let posts = await User.find({ _if: id }).populate({
//     path: "posts",
//   })
//   console.log(posts)
//   //res.status(200).json(posts)
// }catch(err){
//   console.log(err)
// }
// };
module.exports.LikeAndUnlike = async (req, res) => {
  try {
    if (req.body.likeStates === "UnLike") {
      result = await User.findOneAndUpdate(
        { _id: req.body.PostWriterID, "posts._id": req.body.postID },
        {
          $pull: { "posts.$.likes": req.user.id },
        },
        { new: true }
      );
    } else {
      result = await User.findOneAndUpdate(
        { _id: req.body.PostWriterID, "posts._id": req.body.postID },
        {
          $push: { "posts.$.likes": req.user.id },
        },
        { new: true }
      );
    }
    res.json(result.posts);
  } catch (err) {
    console.log(err);
  }
};
module.exports.comments = async (req, res) => {
  try {
      result = await User.findOneAndUpdate(
        { _id: req.body.PostWriterID, "posts._id": req.body.postID },
        {
          $push: { "posts.$.comments": req.user.id },
        },
        { new: true }
      );
    
    res.json(result.posts);
  } catch (err) {
    console.log(err);
  }
};

