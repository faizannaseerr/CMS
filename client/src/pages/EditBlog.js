import React from "react";
import { motion } from "framer-motion";
import EditForm from "../components/EditForm";
import { useLocation } from "react-router-dom";

const EditBlog = () => {
  const location = useLocation();
  const blog = location.state;
  return (
    <div className="mb-40">
      <div className="text-6xl font-bold my-12 flex flex-row gap-3 ml-auto mr-auto justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Edit
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className=""
        >
          your blog. 🖊️
        </motion.div>
      </div>
      <EditForm {...blog} />
    </div>
  );
};

export default EditBlog;
