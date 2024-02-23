import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs'

function SpinSessions(props) {
  const dispatch = useDispatch();
  const spins = useSelector((store) => store.spinsReducer)
// console.log('what is in the spins?', spins);
  useEffect(() => {
    dispatch({ type: "FETCH_SPINS" });
  }, [dispatch]);

const formattedDate = dayjs(spins.listened_at).format('MM/DD/YYYY')

const history = useHistory();
  return (
    <div>
      <h2>In spin session</h2>
      {spins?.length > 0 && (
      <ul>
        {spins.map((spin, i) => (
          <li key={i}>
            {/* {console.log('whats the spin?', spin)} */}
            <p onClick={()=>history.push(`/spins/details/${spin.id}`)}>{spin.spin_details} {formattedDate}</p>
          </li>
        ))}
      </ul>
      )}
      <button onClick={()=>history.push("/spins/add")}>Add Spins</button>
      {/* <button onClick={()=>history.push("/spins/details")}>Single Spins Details</button> */}
    </div>
  );
}

export default SpinSessions;