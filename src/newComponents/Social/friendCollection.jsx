import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


function FriendCollection(props) {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_FRIENDS_RECORDS", payload: id});
  }, [dispatch]);

  return (
    <div>
      <h2>In friendCollection</h2>
      <p>{id}</p>
    </div>
  );
}

export default FriendCollection;