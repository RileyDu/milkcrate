import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function MyMilkcrate(props) {
  const dispatch = useDispatch();
  const records = useSelector((store) => store.recordReducer)
  const history = useHistory();
  const username = useSelector((store) => store.user.username)
// console.log('whats in the crate mate?', records);

  useEffect(() => {
    dispatch({ type: "FETCH_RECORDS" });
  }, [dispatch]);

  return (
    <div>
      <h2>In {username}'s milkcrate</h2>
      {records?.length > 0 && (
      <ul>
        {records.map((record, i) => (
          <li key={i}>
            {/* {console.log('whats the record?', record)} */}
            <img  onClick={()=>history.push(`/user/details/${record.id}`)} src={record.coverart}/>
          </li>
        ))}
      </ul>
      )}
      <button onClick={()=>history.push("/user/add")}>Add record</button>
      {/* THE EDIT NEEDS TO GO IN THE DETAILS PAGE */}
    </div>
  );
}
<img />
export default MyMilkcrate;