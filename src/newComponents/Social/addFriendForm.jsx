import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function AddFriendForm(props) {
const [friendUsername, setFriendUsername] = useState('')

const handleInputChangeFriend = (e) => {
  setFriendUsername(e.target.value)
}
  return (
    <div>
      <h2>In addFriendForm</h2>
      <input
              type="text"
              value={friendUsername}
              onChange={handleInputChangeFriend}
            />
    </div>
  );
}

export default AddFriendForm;