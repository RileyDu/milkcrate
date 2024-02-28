import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

function LoadingSpinner(props) {
  return (
    <div className="LoadingSpinnerContainer">
      <motion.img
        src="milkcrateLogo.svg"
        alt="Milkcrate Logo"
        className="loading-spinner"
        animate={{ rotate: 720 }}
        transition={{ ease: "linear", duration: 1 }}
      />
    </div>
  );
}

export default LoadingSpinner;
