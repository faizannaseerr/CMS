import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import useBlogsContext from "../hooks/useBlogsContext";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
  },
  animate: (index) => ({
    opacity: 1,
    transition: {
      delay: 0.1 * index,
    },
  }),
};

const BlogScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { dispatch } = useBlogsContext();
  const { user } = useAuthContext();
  const location = useLocation();
  const blog = location.state;
  const handleClick = async () => {
    if (!user) {
      // setError("You must be logged in");
      return;
    }
    const response = await fetch("/blogs/" + blog._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BLOGS", payload: json });
    }
  };

  return (
    <div className="text-center max-w-[60rem] ml-auto mr-auto mt-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold mb-3 mt-3 max-w-[30rem] ml-auto mr-auto"
      >
        {blog.title}
      </motion.div>
      <motion.div
        className="text-sm mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {new Date(blog.updatedAt).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}{" "}
        • {blog.author}
      </motion.div>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        src={blog.img}
        className="h-full rounded-xl max-w-[45rem] min-w-[45rem] mb-16 ml-auto mr-auto"
        alt={blog.title}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-[45rem] ml-auto mr-auto mt-10 text-start justify-start [&_*]:my-6"
      >
        {parse(blog.text)}
      </motion.div>
      <div className="flex flex-row gap-2 justify-center flex-wrap max-w-[45rem] ml-auto mr-auto mt-10 mb-10">
        {blog.tags.map((tag, index) => {
          return (
            <>
              <motion.h3
                key={index}
                custom={index}
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-xs px-2 py-[0.1rem] mb-1 rounded-xl border-2 border-gray-700 transition-all hover:opacity-75"
              >
                {tag}
              </motion.h3>
            </>
          );
        })}
      </div>
      <div className="flex flex-row gap-4 mx-auto justify-center">
        <Link
          // fix ? at the end of link bug
          to={`/blogs/${blog.title.replace(/\s/g, "-").toLowerCase()}/edit`}
          state={blog}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center justify-center items-center font-bold text-gray-50 rounded-2xl mb-20 w-[10rem] transition-all py-3 hover:w-[20rem] bg-cyan-950 hover:bg-cyan-900 duration-500"
          >
            Edit
          </motion.div>
          {/* need to style this */}
        </Link>
        <Link to="/blogs">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            onClick={handleClick}
            className="text-center justify-center items-center font-bold text-gray-50 rounded-2xl mb-20 w-[10rem] transition-all py-3 hover:w-[20rem] bg-red-700 hover:bg-red-600 duration-500"
          >
            Delete
          </motion.div>
          {/* need to style this */}
        </Link>
      </div>
    </div>
  );
};

export default BlogScreen;
