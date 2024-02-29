import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


function RecentlySpun(props) {
  const dispatch = useDispatch();
  const records = useSelector((store) => store.latestListensReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_LATEST_LISTENS" });
  }, [dispatch]);

  return (
    <div>
      <h2 className="header-tabs">latest listens</h2>
    </div>
  );
}

export default RecentlySpun;
