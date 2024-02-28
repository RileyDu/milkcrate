import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

function LoadingSpinner(props) {
  const dispatch = useDispatch();
  const randomRecord = useSelector((store) => store.blindbagReducer);

  return (
    <motion.img
      src="milkcrateLogo.svg"
      alt="Milkcrate Logo"
      className="block"
      whileHover={{ rotate: 1080 }}
      transition={{ duration: 1 }}
    />
  );
}

export default LoadingSpinner;
