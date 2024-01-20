import React from "react";
import BlogForm from "../components/BlogForm";
import { motion } from "framer-motion";

const CreateBlog = () => {
  return (
    <div className="mb-28">
      <div className="text-6xl font-bold my-12 flex flex-row gap-3 ml-auto mr-auto justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Write
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className=""
        >
          away. 🖊️
        </motion.div>
      </div>
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-6xl font-bold text-center my-12"
      >
        Write <div className="inline">away. 🖊️</div>
      </motion.div> */}
      <BlogForm />
    </div>
  );
};

export default CreateBlog;
