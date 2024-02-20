import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function AddFriendForm(props) {
  const dispatch = useDispatch()
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

  dispatch({
    type: "POST_FRIENDSHIP",
    payload: friendUsername
  })
  setFriendUsername('');
}

  return (
    <div>
      <h2>In addFriendForm</h2>
      <form onSubmit={(event) => postFriendship(event)}>
      <input
        type="text"
        value={friendUsername}
        onChange={handleInputChangeFriend}
      />
      <button type='submit'>ADD FRIEND</button>
</form>
    </div>
  );
}

export default AddFriendForm;
