import React from "react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

const BlogScreen1 = () => {
  const location = useLocation();
  const blog = location.state;
  return (
    <div>
      <div className="text-center ml-auto mr-auto mt-12 flex flex-row gap-12 px-20 py-10">
        <div className="justify-center items-center">
          <div className="flex flex-row gap-2 justify-center flex-wrap max-w-[30rem] ml-auto mr-auto">
            {blog.tags.map((tag) => {
              return (
                <>
                  <h3 className="text-xs px-2 py-[0.1rem] rounded-xl border-2 border-gray-700 transition-all hover:opacity-60">
                    {tag}
                  </h3>
                </>
              );
            })}
          </div>
          <div className="text-4xl font-bold mb-3 mt-3 max-w-[30rem] ml-auto mr-auto">
            {blog.title}
          </div>
          <div className="text-sm mb-6">
            {new Date(blog.updatedAt).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            • {blog.author}
          </div>
          <img
            src={blog.img}
            className="h-1/2 rounded-lg mb-16 ml-auto mr-auto"
            alt={blog.title}
          />
        </div>
        <div className="max-w-[45rem] ml-auto mr-auto mt-10 text-start justify-start [&_*]:my-6">
          {parse(blog.text)}
        </div>
      </div>
    </div>
  );
};

export default BlogScreen1;
