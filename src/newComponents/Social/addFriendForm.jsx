import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function AddFriendForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [friendUsername, setFriendUsername] = useState("");

  const handleInputChangeFriend = (e) => {
    setFriendUsername(e.target.value);
  };

  function postFriendship(event) {
    event.preventDefault();
    console.log("checking payload of submit", friendUsername);

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
      <form onSubmit={(event) => postFriendship(event)}>
        <input
          type="text"
          value={friendUsername}
          onChange={handleInputChangeFriend}
          placeholder="ENTER FRIENDS USERNAME"
        />
        <button type="submit">ADD FRIEND</button>
      </form>
    </div>
  );
}

export default AddFriendForm;
