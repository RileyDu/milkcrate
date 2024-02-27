import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import '@sweetalert2/theme-dark/dark.css';

function SocialPage(props) {
  const friends = useSelector((store) => store.socialReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_FRIENDS" });
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (friends.length === 0) {
        Swal.fire({
          icon: "info",
          title: "New to MILKCRATE.? Need a friend? Add the creator, RileyDu!",
          showConfirmButton: false,
          timer: 2750,
        });
      }
    }, 1000); 


    return () => clearTimeout(timer);
  }, [friends.length]);

  const history = useHistory();
  return (
    <div>
      <h2 className="header-tabs"> social </h2>
      <div className="socialPageContainer">
        {friends.map((friend, i) => (
          <div className="socialPageItems" key={i}>
            <img
              src="milkcrateLogo.svg"
              className="social-crate"
              onClick={() =>
                history.push(`/social/friends/${friend.friend_id}`)
              }
            />
            <p className="socialPageText">
              {friend.friend_username}'s milkcrate.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialPage;
