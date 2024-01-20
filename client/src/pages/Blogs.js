import React, { useEffect } from "react";
import useBlogsContext from "../hooks/useBlogsContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BlogDetails from "../components/BlogDetails";
import useAuthContext from "../hooks/useAuthContext";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.025 * index + 0.5,
    },
  }),
};

const Blogs = () => {
  const { blogs, dispatch } = useBlogsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("https://cmsback.vercel.app/blogs", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_BLOGS", payload: json });
      }
    };
    if (user) {
      fetchBlogs();
    }
  }, [dispatch, user]);
  return (
    <div>
      <div className="text-center mb-12">
        <div className="text-6xl font-bold my-12 flex flex-row gap-3 ml-auto mr-auto justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Blogs
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className=""
          >
            Created.
          </motion.div>
        </div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-bold my-12"
        >
          Blogs <motion.div className="inline">Created.</motion.div>
        </motion.div> */}

        <Link to="/blogs/create">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl bg-neutral-900 text-gray-50 font-semibold py-3 px-10 text-center rounded-xl hover:px-20 duration-500 transition-all w-min inline cursor-pointer"
          >
            Write a new article ✍🏼
          </motion.h1>
        </Link>
      </div>

      <div className="grid xl:grid-cols-2 p-16 gap-4 mb-40 lg:grid-cols-1">
        {blogs &&
          blogs.map((blog, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeInAnimationVariants}
              initial="initial"
              animate="animate"
              viewport={{ once: true }}
            >
              <BlogDetails key={blog._id} blog={blog} />
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
