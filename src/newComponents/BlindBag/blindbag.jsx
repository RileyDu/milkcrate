import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Blindbag(props) {
  const dispatch = useDispatch();
  const randomRecord = useSelector((store) => store.blindbagReducer);

  function getBlindBag() {
    dispatch({ type: "FETCH_BLINDBAG" });
  }

  return (
    <div>
      <h2 className="header-tabs">blindbag</h2>
      {/* <img src="milkcrateLogo.svg" className="blingbag-crate"/> */}
      <div className="container">
      <div className="d-grid gap-2">
      <button className='btn btn-lg btn-primary' onClick={() => getBlindBag()}>SHUFFLE</button>
    </div>
    </div>
    <div className="blindbag-img">
      <img id="shuffle-img" src={randomRecord.coverart} alt={randomRecord.title} />
  </div>
  </div>
  );
}

export default Blindbag;
