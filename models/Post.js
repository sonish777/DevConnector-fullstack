const mongoose = require("mongoose");
const User = require("./User");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: [true, "A post must have text"],
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  like: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: [true, "A comment must have text"],
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

postSchema.pre(/^find/, function (next) {
  // console.log(this);
  this.populate({
    path: "like.user",
  });
  next();
});

// postSchema.post("find", async function (docs, next) {
//   for (let doc of docs) {
//     await doc.populate("like.user").execPopulate();
//   }
//   next();
// });

postSchema.post("save", async function (doc, next) {
  await doc.populate("like.user").execPopulate();
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
