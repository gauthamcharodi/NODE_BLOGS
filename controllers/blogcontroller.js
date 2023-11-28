const blogModel = require("../models/Blogs");

const postBlog = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(401).json({
      status: "failed",
      data: {
        msg: error.message,
      },
    });
  }
};
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

const getBlog = async (req, res) => {
  try {
    let blog = await blogModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "failed",
      data: {
        msg: err.message,
      },
    });
  }
};

const getBlogs = async (req, res) => {
  try {
    let search = req.query.search || "";
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 3;
    let sort=req.query.sort || "rating"
    let skip = (page - 1) * limit;
  //ratings,year //ratings year
    sort && sort.split(",").join(" ")

    const blogs = await blogModel
      .find({ title: { $regex: search, $options: "i" } })
      .skip(skip) .limit(limit).sort(sort);
      
      let totalBlogs=await blogModel.countDocuments()
      res.status(200).json({
      status: "success",
      page,
      limit,
      totalBlogs,
      data: {
        blogs,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateBlog=async(req,res)=>{
  try {
      const {id}=req.params
      const {title,description,snippet,image,ratings}=req.body
      if(req.user.role==='author'){
          const updatedBlog=await blogModel.findByIdAndUpdate({_id:id},{$set:{title:title,snippet:snippet,description:description,image:image,}},{new:true,runValidators:true})
      res.status(200).json({
          status:'success',
          data:{
              updatedBlog
          }
      })
      }
      if(req.user.role==='user'){
          const updatedBlog=await .findByIdAndUpdate({_id:id},{$set:{ratings:ratings}},{new:true,runValidators:true})
      res.status(200).json({
          status:'success',
          data:{
              updatedBlog
          }
      })
      }

  } catch (error) {
      res.status(400).json({
          status:'fail',
          message:error.message
      })
  }
}



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
module.exports = {
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  postBlog,
  getByAuthor,
};
