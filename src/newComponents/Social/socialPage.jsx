import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function SocialPage(props) {
  const friends = useSelector((store) => store.socialReducer)
  const dispatch = useDispatch();
  console.log('what is in friends?', friends);
  useEffect(() => {
    dispatch({ type: "FETCH_FRIENDS" });
  }, [dispatch]);
const history = useHistory()
  return (
    <div>
      <h2>In socialPage</h2>
      <ul>
        {friends.map((friend, i) => (
          <li>
            <p key={i} onClick={()=>history.push(`/social/friends/${friend.friend_id}`)}>{friend.friend_username}</p>
          </li>
        ))}
      </ul>
      <button onClick={()=>history.push("/social/add")}>ADD FRIEND</button>
      {/* <button>View Friends Collection</button> */}

    </div>
  );
}

export default SocialPage;