const Blog = require("../models/blogModel");
const mongoose = require("mongoose");

// get all workouts
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ updatedAt: -1 });
  res.status(200).json(blogs);
};

// get single workout
const getBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid blog id" });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ error: "No such blog" });
  }

  res.status(200).json(blog);
};

// create a new workout
const createBlog = async (req, res) => {
  let emptyFields = [];
  const { title, img, text, author, tags } = req.body;
  console.log(req.body);

  if (!title) {
    emptyFields.push("title");
  }
  if (!img) {
    emptyFields.push("img");
  }
  if (!text) {
    emptyFields.push("text");
  }
  if (!author) {
    emptyFields.push("author");
  }
  if (!tags) {
    emptyFields.push("tags");
  }
  if (emptyFields.length > 0) {
    res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
    // return;
  }

  // add doc to db
  try {
    const blog = await Blog.create({ title, img, text, author, tags });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid blog id" });
  }

  const blog = await Blog.findOneAndDelete({ _id: id });
  if (!blog) {
    return res.status(404).json({ error: "No such blog" });
  }

  res.status(200).json(blog);
};

// update a workout
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid blog id" });
  }

  const blog = await Blog.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!blog) {
    return res.status(404).json({ error: "No such blog" });
  }

  res.status(200).json(blog);
};

module.exports = {
  createBlog,
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
};
