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
      <h2 className='header-tabs'> spins </h2>
      {spins?.length > 0 && (
      <ul>
        {spins.map((spin, i) => (
          <li key={i}>
            <p onClick={()=>history.push(`/spins/details/${spin.id}`)}>{spin.spin_details} {formattedDate}</p>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default SpinSessions;