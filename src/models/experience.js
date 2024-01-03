const mongoose = require("mongoose");
const expirenceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: String,
  location: String,
  category_theme: String,
  description: {
    short_des: String,
    detail_dec: String,
  },
  video_link: String,
  img_link: {
    filename: String,
    path: String,
    mimetype: {
      type: String,
      default: "image/png",
    },
  },
  inclusions: {
    included: String,
    detail_des: String,
  },
  exclusions: {
    included: String, ////,
    detail_des: String,
  },
});

const experience = mongoose.model("experience", expirenceSchema);
module.exports = experience;
