import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function SingleSpin(props) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const spin = useSelector((store) => store.spinsReducer[0])

  console.log("whats in the single spin?", spin);

  useEffect(() => {
      dispatch({ type: "FETCH_SINGLE_SPIN", payload: id });
  }, [dispatch]);

  return (
    <div>
      <h2>In singleSpin</h2>
      <p>{spin.listened_at}</p>
      <p>{spin.time_spent}</p>
      <p>{spin.artist}</p>
      <p>{spin.title}</p>
      <p>{spin.details}</p>
    </div>
    // NEED TO ADD CONDITIONAL RENDERING DEPENDING ON HOW MANY ALBUMS IN A LISTENING SESSION STILL
    //NEED TO USE MOMENT TO TRANSLATE DB TIME TO READABLE FORM
  );
}

export default SingleSpin;
