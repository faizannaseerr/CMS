import React from "react";
// import useBlogsContext from "../hooks/useBlogsContext";
// import formatDistancetoNow from "date-fns/formatDistancetoNow";
import { Link } from "react-router-dom";

const BlogDetails = ({ blog }) => {
  // const { dispatch } = useBlogsContext();

  return (
    <Link
      to={`/blogs/${blog.title.replace(/\s/g, "-").toLowerCase()}`}
      state={blog}
    >
      <div className="p-4 w-full bg-stone-200 rounded-lg hover:bg-stone-300 transition-all group cursor-pointer">
        <div className="flex flex-row h-full w-full justify-start">
          <div>
            <img
              src={blog.img}
              className="rounded-2xl block h-[160px] max-w-md object-contain group-hover:scale-105 transition duration-700"
              alt="blog img"
            />
          </div>

          <div className="flex flex-col justify-between ml-8">
            <div>
              <h1 className="text-xl font-bold leading-6 mb-1">{blog.title}</h1>
              <h2 className="text-sm">{blog.author}</h2>
              <h2 className="text-sm opacity-75">
                {/* {formatDistancetoNow(new Date(blog.updatedAt), {
                  addSuffix: true,
                })} */}
              </h2>
            </div>

            <div className="flex flex-row gap-2 items-center flex-wrap">
              {blog.tags.slice(0, 3).map((tag) => {
                return (
                  <>
                    <h3 className="text-xs px-2 py-[0.1rem] rounded-xl border-2 border-gray-700 opacity-75 group-hover:opacity-95 cursor-pointer">
                      {tag}
                    </h3>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogDetails;
