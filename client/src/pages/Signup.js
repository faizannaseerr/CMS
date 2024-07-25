import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  // add enter button click
  const handleClick = async () => {
    await signup(username, password);
    // clear accordingly based on the errors
    setUsername("");
    setPassword("");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    // if (error) {
    //   if (error === "Password not strong enough") {
    //     setPassword("");
    //     document.getElementById("password").value = "";
    //   } else if (error === "Username already exists") {
    //     setUsername("");
    //     document.getElementById("username").value = "";
    //   }
    // }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    // mt-32
    <div className="mt-24 mb-[20rem] text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-6xl font-bold text-center my-12"
      >
        Sign Up.
      </motion.div>

      <motion.div
        // flex flex-col
        className="bg-gradient-to-r mb-12 from-stone-100 via-stone-50 to-stone-100 h-[32rem] shadow-md w-[40rem] p-4 px-24 justify-center mx-auto rounded-xl border-[1px] border-[#889397] shadow-[0px_1px_rgba(211, 211, 211, 1)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <form className="flex flex-col mt-10">
          <label className="text-4xl text-left mb-6 font-bold">
            Create your account ✍🏼
          </label>
          <label className="text-left text-lg font-bold mb-1">Username</label>
          <input
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            placeholder="e.g. FaizanN"
            className="bg-gray-50 py-3 px-4 border-[1px] mb-6 border-[#889397] focus:shadow-[0px_0px_0px_3px_rgba(232,236,235)] focus:outline-none rounded-md active:outline-none"
          ></input>
          <label className="text-left text-lg font-bold mb-1">Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            className="bg-gray-50 py-3 px-4 border-[1px] border-[#889397] rounded-md focus:shadow-[0px_0px_0px_3px_rgba(232,236,235)] focus:outline-none"
            placeholder="e.g. 123456"
          ></input>
        </form>
        <motion.button
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          disabled={isLoading}
          className="text-2xl justify-center font-semibold bg-gray-50 text-left items-center hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 mt-10 hover:px-20 duration-500 rounded-xl border-[1px] border-[#889397] shadow-[0px_1px_rgba(211, 211, 211, 1)] hover:shadow-[0px_0px_0px_3px_rgba(232,236,235)] transition-all px-8 py-2 mx-auto"
        >
          Sign up
        </motion.button>
        {error && (
          <motion.div
            className="mt-6 text-lg text-center font-semibold text-rose-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.div>
        )}
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="block text-2xl font-semibold justify-center"
      >
        Already have an account?{" "}
        <Link to="/">
          <h1 className="inline group text-2xl text-orange-900 hover:text-orange-950 transition-all cursor-pointer max-w-fit mx-auto">
            Log in here.{" "}
            <h1 className="inline text-2xl opacity-0 group-hover:opacity-100 transition-all">
              🪵
            </h1>
          </h1>
        </Link>
      </motion.h1>
    </div>
  );
};

export default Signup;
