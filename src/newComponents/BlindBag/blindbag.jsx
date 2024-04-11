import React, { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ThemeContext } from "../../components/App/ThemeContext";

function Blindbag() {
  const dispatch = useDispatch();
  const randomRecord = useSelector((store) => store.blindbagReducer);
  const [currentCoverArt, setCurrentCoverArt] = useState("TheRecord.svg");
  const [coverArtClicked, setCoverArtClicked] = useState(false);
  const [filter, setFilter] = useState("");
  const { theme } = useContext(ThemeContext);
  const initialRender = useRef(true);


  function getBlindBag() {
    dispatch({ type: "FETCH_BLINDBAG", payload: filter });
    setCoverArtClicked(true);
  }

  function handleCoverArtClick() {
    if (!coverArtClicked) {
      getBlindBag();
      setCurrentCoverArt(randomRecord.coverart);
      setCoverArtClicked(true);
    } else {
      getBlindBag();
    }
  }

  function clearFilter() {
    setFilter("");
  }

  useEffect(() => {
    if (!coverArtClicked && !initialRender.current) {
      getBlindBag();
    }
    initialRender.current = false;
  }, [coverArtClicked]);

  useEffect(() => {
    if (coverArtClicked) {
      setCurrentCoverArt(randomRecord.coverart);
    }
  }, [randomRecord, coverArtClicked]);


  useEffect(() => {
    return () => {
      // Dispatch an action to clear the reducer
      dispatch({ type: "CLEAR_BLINDBAG" });
      // Clear the filter state
      setFilter("");
      console.log('Cleanup executed on unmount');
    };
  }, []);



  return (
    <div>
      <h2 className="header-tabs mb-4">blindbag</h2>
      <br></br>
      <div className="blindbag-img">
        {!coverArtClicked && (
          <motion.img
            id="shuffle-img"
            src={theme === "light" ? "TheRecord.svg" : "WhiteRecord.svg"}
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
              src={currentCoverArt || "BLISS.png"}
              alt={randomRecord.title || "Record Logo"}
              onClick={handleCoverArtClick}
              style={{ cursor: "pointer" }}
            />
          </div>
          {randomRecord.title && (
            
          <div style={{ textAlign: "center", paddingTop: "4em" }}>
            <h2>
              {randomRecord.title} by <em>{randomRecord.artist}</em>
            </h2>
          </div>
          )}
        </>
      )}
      <div className="container">
      <div className="d-grid gap-2 d-md-flex justify-content-center mt-3">
        <input
          className="form-control"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by title, artist, tags, or mood..."
        />
        <button className="btn btn-outline-primary" onClick={getBlindBag}>
          Filter
        </button>
        <button className="btn btn-outline-danger" onClick={clearFilter}>
          Clear
        </button>
      </div>
      </div>
    </div>
  );
}

export default Blindbag;
