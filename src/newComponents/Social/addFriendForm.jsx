import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

function AddFriendForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [friendUsername, setFriendUsername] = useState("");

  const handleInputChangeFriend = (e) => {
    setFriendUsername(e.target.value);
  };

  function postFriendship(event) {
    event.preventDefault();

    if (!friendUsername) {
      Swal.fire({
        title: "Attention!",
        text: "Please fill form before submit",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const addFriendObject = {
      friend_username: friendUsername,
    };

    dispatch({
      type: "POST_FRIENDSHIP",
      payload: addFriendObject,
    });
    setFriendUsername("");
    history.push(`/social`);
  }

  return (
    <div>
      <h2 className="header-tabs"> add a friend</h2>
      <div className="container">
        <form onSubmit={(event) => postFriendship(event)}>
          <div class="form-floating mb-3">
            <input
              type="text"
              value={friendUsername}
              onChange={handleInputChangeFriend}
              placeholder=""
              className="form-control"
              id="addFriendInput"
            />
            <label htmlFor="addFriendInput"> Enter Friend's Username</label>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-lg btn-primary" type="submit">
              ADD FRIEND
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFriendForm;
