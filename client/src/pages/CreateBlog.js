import React, { useEffect, useState } from "react";
import BlogForm from "../components/BlogForm";
import { motion } from "framer-motion";
import useAuthContext from "../hooks/useAuthContext";
import getSocket from "../components/socket";
import { io } from "socket.io-client"

// gets state variable of none or room name, if room name that means subcollaber and so no need to have addCollab button or submit
// else have both those things (additonally if room name then no need to join its own room, else join own room to)!!!
// if room name that is also passed on to editor to send back to server to updating text changes

const CreateBlog = () => {
  const [collaborate, setCollaborate] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [collaborator, setCollaborator] = useState("")
  const { user } = useAuthContext();


  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      console.log('hello')
      if (collaborator === user.username) {
        setError(true)
        setErrorMessage("Cannot collaborate with yourself, dummy")
        console.log("here")
        return
      }

      if (!user) {
        // setError("You must be logged in");
        return;
      }

      // call PATCH call to give collab user original user id, when that user logs in he can join that user's room instantly
      const response = await fetch("/blogs/create", {
        method: "PATCH",
        body: JSON.stringify({ mainCollaborator: user.username, subCollaborator: collaborator }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.error);
        setError(true)
        setErrorMessage(json.error)
      }
      if (response.ok) {
        console.log(json)
        console.log("Collaborator added")
      }
    }
  };

  const enableUserSelection = () => {
    if (collaborate === true) {
      setCollaborate(false)
    }
    else {
      setCollaborate(true)
    }
  }

  return (
    <div className="mb-28">
      <div className="text-6xl font-bold my-12 flex flex-row gap-3 ml-auto mr-auto justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Write
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className=""
        >
          away. 🖊️
        </motion.div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <motion.div
          onClick={enableUserSelection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-4 px-12 py-4 border-2 teçxt-center font-medium max-w-fit border-black bg-gray-100 shadow-md cursor-pointer hover:px-24 transition-all duration-500"
        >
          Add Collaborator
        </motion.div>
        <div>
          {collaborate && <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onChange={(e) => {
              setCollaborator(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            className="mt-4 mb-8 px-12 py-4 border-2 text-center font-medium max-w-fit border-black bg-gray-50 shadow-md cursor-pointer transition-all duration-300"
          >
          </motion.input>}
          {error && <div> {errorMessage} </div>}
        </div>

      </div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-6xl font-bold text-center my-12"
      >
        Write <div className="inline">away. 🖊️</div>
      </motion.div> */}
      <BlogForm />
    </div>
  );
};

export default CreateBlog;
