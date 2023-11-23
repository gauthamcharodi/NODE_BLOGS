const router = require("express").Router();
const { postBlog,getBlog,getBlogs,updateBlog,deleteBlog,getByAuthor} = require("../controllers/blogcontroller");
const auth = require("../middlewares/authMiddleware");

// router.get("/", auth, (req, res) => {
//   let user = req.user;
//   res.send(`Welcome ${user.name}`);
// });

router.post("/", auth, postBlog);
router.get("/", auth, getBlogs);
router.get("/author",auth,getByAuthor)
router.get("/:id", auth, getBlog);
router.patch("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);

module.exports = router;
