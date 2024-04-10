import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ThemeContext } from "../../components/App/ThemeContext";


function Blindbag() {
  const dispatch = useDispatch();
  const randomRecord = useSelector((store) => store.blindbagReducer);
  const [currentCoverArt, setCurrentCoverArt] = useState("TheRecord.svg");
  const [coverArtClicked, setCoverArtClicked] = useState(false);
  const { theme } = useContext(ThemeContext);


  useEffect(() => {
    if (!coverArtClicked) {
      getBlindBag();
    }
  }, [coverArtClicked]);

  function getBlindBag() {
    dispatch({ type: "FETCH_BLINDBAG" });
  }

  useEffect(() => {
    if (coverArtClicked) {
      setCurrentCoverArt(randomRecord.coverart);
    }
  }, [randomRecord, coverArtClicked]);

  function handleCoverArtClick() {
    if (!coverArtClicked) {
      setCurrentCoverArt(randomRecord.coverart);
      setCoverArtClicked(true);
    } else {
      getBlindBag();
    }
  }

  return (
    <div>
      <h1 className="header-tabs">blindbag</h1>
      <br></br>
      <div className="container">
        <div className="d-grid gap-2"></div>
      </div>
      <div className="blindbag-img">
        {!coverArtClicked && (
          <motion.img
            id="shuffle-img"
            src={theme === 'light' ? "TheRecord.svg" : "WhiteRecord.svg"}
            alt={randomRecord.title || "Record Logo"}
            onClick={handleCoverArtClick}
            animate={{ rotate: 720 }}
            transition={{ ease: "linear", duration: 3, repeat: Infinity }}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
      {coverArtClicked && (
        <>
          <div className="blindbag-img">
            <img
              id="shuffle-img"
              src={currentCoverArt}
              alt={randomRecord.title || "Record Logo"}
              onClick={handleCoverArtClick}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div style={{ textAlign: "center", paddingTop: "4em" }}>
            <h2>
              {randomRecord.title} by <em>{randomRecord.artist}</em>
            </h2>
          </div>
        </>
      )}
    </div>
  );
}

export default Blindbag;
