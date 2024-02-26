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
      <h2 className='header-tabs'> social </h2>
      <div className='socialPageContainer'>
        {friends.map((friend, i) => (
          <div className='socialPageItems'>
                  <img src="milkcrateLogo.svg" className="social-crate" onClick={()=>history.push(`/social/friends/${friend.friend_id}`)}/>
            <p key={i} className='socialPageText'>{friend.friend_username}'s milkcrate.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialPage;