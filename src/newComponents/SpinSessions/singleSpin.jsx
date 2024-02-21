import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function SingleSpin(props) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const spin = useSelector((store) =>
    store.spinsReducer.find((spin) => spin.id.toString() === id)
  );

  console.log("whats in the single spin?", spin);

  useEffect(() => {
    if (!spin) {
      dispatch({ type: "FETCH_SPINS" });
    }
  }, [id, dispatch, spin]);

  return (
    <div>
      <h2>In singleSpin</h2>
      <p>{spin.listened_at}</p>
      <p>{spin.time_spent}</p>
      <p>{spin.details}</p>
    </div>
  );
}

export default SingleSpin;
