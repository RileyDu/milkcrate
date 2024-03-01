import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";
import { Row, Col } from "react-bootstrap";

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
    <>
      <h2 className="header-tabs"> social </h2>
      <div className="socialPageContainer">
        <Row xs={1} sm={2} md={3} className="g-6">
          {friends.map((friend, i) => (
            <Col key={i}>
              <img
                src="milkcrateLogo.svg"
                className="social-crate mx-auto d-block"
                onClick={() =>
                  history.push(`/social/friends/${friend.friend_id}`)
                }
              />
              <div className="socialPageText">
                {friend.friend_username}'s milkcrate.
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default SocialPage;
