const blogModel = require("../models/Blogs");
const Rating = require("../models/Rating");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const postBlog = asyncErrorHandler(async (req, res) => {
  let user = req.user;
  const newBlog = await blogModel.create({
    title: req.body.title,
    snippet: req.body.snippet,
    description: req.body.description,
    image: req.body.image,
    author: user._id,
  });
  res.status(201).json({
    status: "success",
    data: {
      newBlog,
    },
  });
});

const getByAuthor = async (req, res) => {
  try {
    let user = req.user;
    const blogs = await blogModel.find({ author: user._id });
    res.status(201).json({
      status: "success",
      data: {
        blogs,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      data: {
        msg: error.message,
      },
    });
  }
};

const getBlog = asyncErrorHandler(async (req, res) => {
  let blog = await blogModel.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      blog,
    },
  });
});

const getBlogs = asyncErrorHandler(async (req, res) => {
  let search = req.query.search || "";
  let page = req.query.page * 1 || 1;
  let limit = req.query.limit * 1 || 3;
  let sort = req.query.sort || "rating";
  let skip = (page - 1) * limit;
  //ratings,year //ratings year
  sort && sort.split(",").join(" ");

  const blogs = await blogModel
    .find({ title: { $regex: search, $options: "i" } })
    .skip(skip)
    .limit(limit)
    .sort(sort);

  let totalBlogs = await blogModel.countDocuments();
  res.status(200).json({
    status: "success",
    page,
    limit,
    totalBlogs,
    data: {
      blogs,
    },
  });
});

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, snippet, image } = req.body;
    if (req.user.role === "author") {
      const updatedBlog = await blogModel.findByIdAndUpdate(
        { _id: id },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: "success",
        data: {
          updatedBlog,
        },
      });
    }
    if (req.user.role === "user") {
      const updatedBlog = await blogModel.findByIdAndUpdate(
        { _id: id },
        { $set: { ratings: ratings } },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: "success",
        data: {
          updatedBlog,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    let id = req.params.id;
    await blogModel.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      data: {
        msg: error.message,
      },
    });
  }
};

let postRating = asyncErrorHandler(async (req, res) => {
  let user = req.user._id;
  let blogId = req.params.id;
  let rating = await Rating.create({
    ratings: req.body.ratings,
    userId: user,
    blogId: blogId,
  });
  res.status(201).json({
    status: "success",
    blogId,
    data: {
      rating,
    },
  });
});

let getRating = asyncErrorHandler(async (req, res) => {
  let blogId = req.params.id;
  let rating = await Rating.find({ blogId: blogId });
  res.status(200).json({
    status: "success",
    blogId,
    data: {
      rating,
    },
  });
});
module.exports = {
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  postBlog,
  getByAuthor,
  postRating,
  getRating,
};
