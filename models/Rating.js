const { Schema, model } = require("mongoose");

let ratingSchema = new Schema(
  {
    rating: {
      type: Number,
      min: [1, "please provide ratings above 1"],
      max: [5, "please provide ratings below 5"],
      default: 1,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("rating", ratingSchema);
