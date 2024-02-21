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

  useEffect(() => {
    dispatch({ type: "FETCH_FRIENDS_RECORDS", payload: id });
  }, [dispatch]);

  return (
    <div>
      <h2>In friendCollection</h2>
      {records?.length > 0 && (
        <ul>
          {records.map((record, i) => (
            <li key={i}>
              {console.log("whats the record?", record)}
              <img
                onClick={() => history.push(`/user/details/${record.id}`)}
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
