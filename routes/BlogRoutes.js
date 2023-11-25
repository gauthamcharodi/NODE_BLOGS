const router = require("express").Router();
const {
  postBlog,
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog,

} = require("../controllers/blogcontroller");
const { auth, verifyRole } = require("../middlewares/authMiddleware");

// router.get("/", auth, (req, res) => {
//   let user = req.user;
//   res.send(`Welcome ${user.name}`);
// });

router.post("/", auth, verifyRole(["author"]), postBlog);
router.get("/", auth, getBlogs);
// router.get("/author",auth,getByAuthor)
router.get("/:id", auth, getBlog);
router.patch("/:id", auth, verifyRole(["author"]), updateBlog);
router.patch("/ratings/:id", auth, verifyRole(["user"]), updateBlog);
router.delete("/:id", auth, verifyRole(["admin", "author"]), deleteBlog);

module.exports = router;
