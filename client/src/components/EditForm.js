import React, { useState } from "react";
import parse from "html-react-parser";
import TextEditor from "./RichTextEditor/TextEditor";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthContext from "../hooks/useAuthContext";

const EditForm = (blog) => {
  const [title, setTitle] = useState(`${blog.title}`);
  const [img, setImg] = useState(`${blog.img}`);
  const [author, setAuthor] = useState(`${blog.author}`);
  const [tags, setTags] = useState([...blog.tags]);
  const [text, setText] = useState(`${blog.text}`);
  const { user } = useAuthContext();

  const createUpdateBlogObject = () => {
    let update = {};
    if (blog.title !== title) {
      update = { ...update, title };
    }
    if (blog.author !== author) {
      update = { ...update, author };
    }
    if (blog.img !== img) {
      update = { ...update, img };
    }
    if (blog.text !== text) {
      update = { ...update, text };
    }
    if (JSON.stringify(blog.tags) !== JSON.stringify(tags)) {
      update = { ...update, tags };
    }
    return update;
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const imageChange = (e) => {
    setImg(e.target.value);
  };

  const authorChange = (e) => {
    setAuthor(e.target.value);
  };

  const tagsChange = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      tags.push(e.target.value);
      setTags([...tags]);
      e.target.value = "";
      console.log(tags);
    }
  };

  const deleteTag = (e) => {
    console.log(e);
    if (tags.indexOf(e.target.outerText) !== -1) {
      tags.splice(tags.indexOf(e.target.outerText), 1);
      e.target.outerText = "";
      console.log(tags);
    }
  };

  const handleClick = async () => {
    if (!user) {
      // setError("You must be logged in");
      return;
    }
    const update = createUpdateBlogObject();
    console.log(update);
    if (JSON.stringify(update) === "{}") {
      console.log("done nothing");
      return;
    }
    const response = await fetch("/blogs/" + blog._id + "/edit", {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      console.log("okay");
    }
  };

  return (
    <div>
      {/* <div className="text-3xl font-bold text-center opacity-50">
        Blog form here
      </div> */}
      <form className="flex flex-col text-center text-xl max-w-[45rem] ml-auto mr-auto">
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          placeholder="Title..."
          defaultValue={blog.title}
          onChange={titleChange}
          className="p-2 rounded-sm bg-transparent mb-4 outline-gray-700 border-gray-700 border-[2px]"
        ></motion.input>
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          placeholder="Author..."
          defaultValue={blog.author}
          onChange={authorChange}
          className="p-2 rounded-sm bg-transparent mb-4 outline-gray-700 border-gray-700 border-[2px]"
        ></motion.input>
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          placeholder="Image URL..."
          defaultValue={blog.img}
          onChange={imageChange}
          className="p-2 rounded-sm bg-transparent mb-4 outline-gray-700 border-gray-700 border-[2px]"
        ></motion.input>
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          placeholder="Enter new tags..."
          onKeyDown={tagsChange}
          className="p-2 rounded-sm bg-transparent mb-4 focus:outline-gray-700 border-gray-700 border-[2px]"
        ></motion.input>
      </form>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-center max-w-[60rem] ml-auto mr-auto mt-12"
      >
        <div className="text-4xl font-bold mb-3 mt-3 max-w-[30rem] ml-auto mr-auto">
          {title}
        </div>
        <div className="text-sm mb-6 ">{author}</div>
        <img
          src={img}
          className="h-full rounded-xl max-w-[45rem] min-w-[45rem] mb-16 ml-auto mr-auto"
          alt={title}
        />
        <div className="max-w-[45rem] ml-auto mr-auto mt-10 text-start justify-start [&_*]:my-6">
          {parse(text)}
        </div>
        <div className="flex flex-row gap-2 justify-center flex-wrap max-w-[45rem] ml-auto mr-auto mt-10 mb-10">
          {tags.map((tag) => {
            return (
              <>
                <h3
                  onClick={deleteTag}
                  className="text-xs px-2 py-[0.1rem] rounded-xl border-2 border-gray-700 transition-all hover:opacity-60"
                >
                  {tag}
                </h3>
              </>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <TextEditor setText={setText} content={blog.text} />
      </motion.div>

      <Link to="/blogs">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleClick}
          className="text-center justify-center items-center font-bold bg-slate-900 text-gray-50 rounded-2xl mx-auto mb-20 max-w-[10rem] transition-all py-3 hover:max-w-[20rem] mt-10 hover:bg-slate-800 duration-500"
        >
          Update
        </motion.div>
        {/* need to style this */}
      </Link>
    </div>
  );
};

export default EditForm;
