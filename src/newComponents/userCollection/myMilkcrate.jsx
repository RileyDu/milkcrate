import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
function MyMilkcrate(props) {
  const dispatch = useDispatch();
  const records = useSelector((store) => store.recordReducer)
  const history = useHistory();
console.log('whats in the crate mate?', records);

  useEffect(() => {
    dispatch({ type: "FETCH_RECORDS" });
  }, [dispatch]);

  return (
    <div>
      <h2>In myMilkcrate</h2>
      {records?.length > 0 && (
      <ul>
        {records?.map((record, i) => (
          <li>
            <p key={i} onClick={()=>history.push("/user/details")}>{record.title}</p>
          </li>
        ))}
      </ul>
      )}
      <button onClick={()=>history.push("/user/add")}>Add record</button>
      <button onClick={()=>history.push("/user/edit")}>edit record</button>
      {/* THE EDIT NEEDS TO GO IN THE DETAILS PAGE */}
      <button onClick={()=>history.push("/user/details")}>record details</button>

    </div>
  );
}

export default MyMilkcrate;