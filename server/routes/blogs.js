const express = require("express");
const {
  createBlog,
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
// require auth for all blog routes
router.use(requireAuth);

// GET all blogs
router.get("/", getBlogs);

// GET single blog
router.get("/:id", getBlog);

// POST a new blog
router.post("/create", createBlog);

// DELETE a blog
router.delete("/:id", deleteBlog);

// UPDATE a blog
router.patch("/:id/edit", updateBlog);

module.exports = router;
