import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function HotOffThePress(props) {
    const dispatch = useDispatch();
    const records = useSelector((store) => store.hotpReducer);

    useEffect(() => {
        dispatch({ type: "FETCH_HOTP"});
      }, [dispatch]);

  return (
    <div>
      <h2 className="header-tabs">hot off the press</h2>
      {records.length > 0 ? (
            <div className="container">
              {records.map((record, i) => (
                <div key={i} className="">
                  {record.username} bought {record.title} on {record.date_added}
                </div>
              ))}
            </div>
          ) : null}
    </div>
  );
}

export default HotOffThePress;
