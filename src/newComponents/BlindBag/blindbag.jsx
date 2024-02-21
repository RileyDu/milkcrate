import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Blindbag(props) {
  const dispatch = useDispatch();
  const randomRecord = useSelector((store) => store.blindbagReducer)

  function getBlindBag(){
    dispatch({ type: "FETCH_BLINDBAG" });
  }

  return (
    <div>
      <h2>In blindbag</h2>
      <button onClick={()=>getBlindBag()}>SHUFFLE</button>
      <img src={randomRecord.coverart} alt={randomRecord.title} />
    </div>
  );
}

export default Blindbag;