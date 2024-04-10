import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";
import { Row, Col } from "react-bootstrap";
import { ThemeContext } from "../../components/App/ThemeContext";

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

  const { theme } = useContext(ThemeContext);

  console.log("theme is social", theme);
  // const [milkcrateLogo, setMilkcrateLogo] = useState(theme === 'light' ? "milkcrateLogo.svg" : "WhiteMilkcrate.svg");

  // useEffect(() => {
  //   setMilkcrateLogo(theme === 'light' ? "milkcrateLogo.svg" : "WhiteMilkcrate.svg");
  // }, [theme]);

  return (
    <>
      <h2 className="header-tabs"> social </h2>
      <div class="d-grid gap-2 d-md-flex justify-content-center mb-4 mt-3">
      <button
            className="btn btn-outline-primary"
            onClick={() => history.push("/social/add")}
            id="addRecordBtn"
            style={{ width: '200px' }}
          >
            Add friend
          </button>

      <button
            className="btn btn-outline-primary"
            onClick={() => history.push("/social/recentlySpun")}
            id="addRecordBtn"
            style={{ width: '200px' }}
          >
            Latest Listens
          </button>

      <button
            className="btn btn-outline-primary"
            onClick={() => history.push("/social/hotp")}
            id="addRecordBtn"
            style={{ width: '200px' }}
          >
            Hot Off The Press
          </button>
          </div>
      <div className="socialPageContainer">
        <Row xs={1} sm={2} md={3} className="g-6">
          {friends.map((friend, i) => (
            <Col key={i}>
              <img
                src={theme === 'light' ? "milkcrateLogo.svg" : "WhiteMilkcrate.svg"}
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
