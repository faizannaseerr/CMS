// import React from "react";
// import { useLocation } from "react-router-dom";
// import parse from "html-react-parser";

// const BlogScreen1 = () => {
//   const location = useLocation();
//   const blog = location.state;
//   return (
//     <div>
//       <div className="text-center ml-auto mr-auto mt-12 flex flex-row gap-12 px-10 py-10">
//         <div className="justify-center items-center">
//           <div className="text-4xl font-bold mb-3 mt-3 max-w-[30rem] ml-auto mr-auto">
//             {blog.title}
//           </div>
//           <div className="text-sm mb-6">
//             {new Date(blog.updatedAt).toLocaleDateString("en-us", {
//               weekday: "long",
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//             })}{" "}
//             • {blog.author}
//           </div>
//           <img
//             src={blog.img}
//             className="rounded-lg mb-16 ml-auto mr-auto"
//             alt={blog.title}
//           />
//         </div>
//         <div className="max-w-[45rem] ml-auto mr-auto mt-10 text-start justify-start [&_*]:my-6">
//           {parse(blog.text)}
//           <div className="flex flex-row gap-2 justify-center flex-wrap max-w-[30rem] ml-auto mr-auto">
//             {blog.tags.map((tag) => {
//               return (
//                 <>
//                   <h3 className="text-xs px-2 py-[0.1rem] rounded-xl border-2 border-gray-700 transition-all hover:opacity-60">
//                     {tag}
//                   </h3>
//                 </>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogScreen1;

// import React from "react";
// import { useLocation } from "react-router-dom";
// import parse from "html-react-parser";

// const BlogScreen1 = () => {
//   const location = useLocation();
//   const blog = location.state;

//   return (
//     <div className="flex flex-row gap-12 px-10 py-10">
//       {/* Left Component */}
//       <div className="fixed top-0 left-0 bottom-0 w-1/2 p-10 mt-40 overflow-auto">
//         <div className="text-center">
//           <div className="text-4xl font-bold mb-3 mt-3 max-w-[30rem] ml-auto mr-auto">
//             {blog.title}
//           </div>
//           <div className="text-sm mb-6">
//             {new Date(blog.updatedAt).toLocaleDateString("en-us", {
//               weekday: "long",
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//             })}{" "}
//             • {blog.author}
//           </div>
//           <img
//             src={blog.img}
//             className="rounded-lg mb-16 ml-auto mr-auto"
//             alt={blog.title}
//           />
//         </div>
//       </div>

//       {/* Right Component */}
//       <div className="ml-auto mr-auto mt-10 text-start justify-start w-1/2 ml-[50%]">
//         <div className="[&_*]:my-6">
//           {parse(blog.text)}
//           <div className="flex flex-row gap-2 justify-center flex-wrap max-w-[30rem] ml-auto mr-auto">
//             {blog.tags.map((tag, index) => (
//               <h3
//                 key={index}
//                 className="text-xs px-2 py-[0.1rem] rounded-xl border-2 border-gray-700 transition-all hover:opacity-60"
//               >
//                 {tag}
//               </h3>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogScreen1;

import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

const BlogScreen1 = () => {
  const location = useLocation();
  const blog = location.state;
  const [isFixed, setIsFixed] = useState(true);
  const rightComponentRef = useRef(null);

  const handleScroll = () => {
    if (rightComponentRef.current) {
      const rightComponentBottom =
        rightComponentRef.current.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      if (rightComponentBottom <= windowHeight) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-row gap-12 px-10 py-10">
      {/* Left Component */}
      <div
        className={`p-10 mt-28 overflow-auto ${isFixed ? "fixed top-0 left-0 bottom-0 w-1/2" : "w-1/2"
          }`}
      >
        <div className="text-center">
          <div className="text-4xl font-bold mb-3 mt-3 max-w-[30rem] mx-auto">
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
            className="rounded-lg mb-16 mx-auto"
            alt={blog.title}
          />
        </div>
      </div>

      {/* Right Component */}
      <div
        ref={rightComponentRef}
        className="ml-auto mt-10 text-start justify-start w-1/2 ml-[50%]"
      >
        <div className="[&_*]:my-6">
          {parse(blog.text)}
          <div className="flex flex-row gap-2 justify-center flex-wrap max-w-[30rem] mx-auto">
            {blog.tags.map((tag, index) => (
              <h3
                key={index}
                className="text-xs px-2 py-[0.1rem] rounded-xl border-2 border-gray-700 transition-all hover:opacity-60"
              >
                {tag}
              </h3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogScreen1;

