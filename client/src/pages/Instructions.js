import React from "react";
import { motion } from "framer-motion";

const Instructions = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-6xl font-bold text-center my-12 mb-[80rem]"
    >
      Instructions.
    </motion.div>
  );
};

export default Instructions;
