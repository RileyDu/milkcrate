import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function FriendCollection(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const records = useSelector((store) => store.recordReducer);
  const socialReducer = useSelector((store) => store.socialReducer);
  const friend = socialReducer.find(
    (friend) => friend.friend_id.toString() === id
  );
  console.log("what is the friend?", friend);
  useEffect(() => {
    dispatch({ type: "FETCH_FRIENDS_RECORDS", payload: id });
    // return a function to run it when this component unmounts
    return () => dispatch({type: `CLEAR_RECORDS`});
  }, [socialReducer]);

  function deleteFriend() {
    //delete button triggers this and sends a DELETE request to db w/id
    dispatch({
      type: "DELETE_FRIENDSHIP",
      payload: id,
    });
    history.push(`/social`); // takes user back to home
  }

  if (!friend) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <h2>{friend.friend_username}'s milkcrate</h2>
      <button onClick={() => history.push("/social")}>back</button>
      <hr/>
      <button onClick={() => deleteFriend()}>delete friend</button>
      {records?.length > 0 && (
        <ul>
          {records.map((record, i) => (
            <li key={i}>
              {console.log("whats the record?", record)}
              <img
                onClick={() =>
                  history.push(`/social/friends/${id}/${record.id}`)
                }
                src={record.coverart}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FriendCollection;
