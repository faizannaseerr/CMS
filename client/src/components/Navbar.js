import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const location = useLocation();
  // const { logout } = useLogout();

  if (location.pathname === "/" || location.pathname === "/signup") {
    return null;
  }

  // const handleClick = () => {
  //   logout();
  // };
  return (
    <header className="h-20 p-4 items-center flex">
      <div className="font-bold text-left pl-8 flex flex-row items-center w-full justify-between">
        {/* <div> */}
        <Link to="/blogs" className="hover:opacity-60 transition-all">
          <h1 className="text-2xl"> Blogs </h1>
        </Link>
        {/* </div> */}

        {/* <Link to="/" className="hover:opacity-60 transition-all">
          <h1 onClick={handleClick} className="text-2xl">
            Logout
          </h1>
        </Link> */}

        {/* <div className="flex flex-row gap-4 items-center"> */}
        <Link to="/instructions" className="hover:opacity-60 transition-all">
          <h1 className="text-2xl"> Instructions </h1>
        </Link>
        {/* </div> */}
      </div>
    </header>
  );
};

export default Navbar;
