import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  if (location.pathname === "/" || location.pathname === "/signup") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-full bg-neutral-900 text-neutral-500 py-32 text-center"
      >
        <div className="text-neutral-200 text-4xl font-bold text-center justify-center mb-8">
          Made By Faizan.
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="w-full bg-neutral-900 text-neutral-500 py-32 text-center"
    >
      <div className="text-neutral-200 text-4xl font-bold text-center justify-center mb-8"></div>
      <Link to="/" className="">
        <button
          onClick={handleClick}
          className="text-2xl font-bold hover:px-20 transition-all duration-500 rounded-2xl bg-slate-50 px-8 py-3 text-gray-800 max-w-fit"
        >
          Logout
        </button>
      </Link>
    </motion.div>
  );
};

export default Footer;
