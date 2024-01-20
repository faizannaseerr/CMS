require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogs");
const userRoutes = require("./routes/user");
const cors = require("cors");
// const { mongoURI } = require("./config/dev");
// PORT = 4000;

// express app
const app = express();

// middleware
app.use(cors());

app.use(express.json()); // access req.body json passed on
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/blogs", blogRoutes);
app.use("", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening to port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
