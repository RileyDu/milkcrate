import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SingleSpin(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const spins = useSelector((store) => store.spinsReducer);

  // console.log("whats in the single spin?", spin);

  useEffect(() => {
    dispatch({ type: "FETCH_SINGLE_SPIN", payload: id });
  }, [dispatch]);

  function deleteSpin() {
    //delete button triggers this and sends a DELETE request to db w/id
    dispatch({
      type: "DELETE_SPIN",
      payload: id,
    });
    history.push(`/spins`); // takes user back to home
  }

  return (
    <div>
      <h2>In singleSpin</h2>
      <button onClick={() => history.push("/spins")}>back</button>
      <button onClick={() => deleteSpin()}>delete spin</button>
      <p>{spins[0].listened_at}</p>
      <p>{spins[0].time_spent}</p>
      <p>{spins[0].spin_details}</p>
      <ul>
        {spins.map((spin, i) => (
          <li key={i}>
            <p>
              {spin.title} by {spin.artist}
            </p>
          </li>
        ))}
      </ul>
    </div>
    // NEED TO ADD CONDITIONAL RENDERING DEPENDING ON HOW MANY ALBUMS IN A LISTENING SESSION STILL
    //NEED TO USE MOMENT TO TRANSLATE DB TIME TO READABLE FORM
  );
}

export default SingleSpin;
