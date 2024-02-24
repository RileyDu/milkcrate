import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import dayjs from "dayjs";
import Swal from 'sweetalert2'


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
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the spin. You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion, proceed with the delete operation
        dispatch({
          type: "DELETE_SPIN",
          payload: id,
        });
        history.push(`/spins`); // Redirects user back to the spins page
  
        // Show deletion success message
        Swal.fire(
          'Deleted!',
          'Your spin has been deleted.',
          'success'
        );
      }
      // If result.isConfirmed is false, user canceled, do nothing
    });
  }

  const formattedDate = dayjs(spins[0].listened_at).format('MM/DD/YYYY')
  const takeOffSeconds = spins[0].time_spent.split(":")
  const formattedTime = takeOffSeconds[0] + ":" + takeOffSeconds[1]

  return (
    <div>
      <h2>In singleSpin</h2>
      <button onClick={() => history.push("/spins")}>back</button>
      <button onClick={() => deleteSpin()}>delete spin</button>
      <p>listened on {formattedDate} </p>
      <p>{formattedTime} spent listening</p>
      <p><strong> DETAILS</strong></p>
      <p>{spins[0].spin_details}</p>
      <p><strong> albums listened to</strong></p>
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
