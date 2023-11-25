const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "title is required"],
  },
  snippet: {
    type: String,
    trim: true,
    required: [true, "snippet is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "author is required"],
  },
  image: {
    type: [String],
    default: "",
  },
  ratings: {
    type: Number,
    default: 1,
    validator: {
      validate: function (value) {
        return value >= 1 && value <= 5;
      },
      message: "ratings should be between 1 and 5",
    },
  },
});

module.exports = model("blog", blogSchema);
