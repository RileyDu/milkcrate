import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function AddFriendForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [friendUsername, setFriendUsername] = useState("");

  const handleInputChangeFriend = (e) => {
    setFriendUsername(e.target.value);
  };

function postFriendship(event) {
  event.preventDefault()
  console.log('checking payload of submit', friendUsername);
  
  if (!friendUsername) {
    alert('PLEASE FILL FORM BEFORE SUBMIT')
    return;
  }

  const addFriendObject = {
    friend_username: friendUsername
  }

  dispatch({
    type: "POST_FRIENDSHIP",
    payload: addFriendObject
  })
  setFriendUsername('');
  history.push(`/social`)
}

  return (
    <div>
      <h2>In addFriendForm</h2>
      <form onSubmit={(event) => postFriendship(event)}>
      <input
        type="text"
        value={friendUsername}
        onChange={handleInputChangeFriend}
        placeholder="ENTER FRIENDS USERNAME"
      />
      <button type='submit'>ADD FRIEND</button>
</form>
    </div>
  );
}

export default AddFriendForm;
