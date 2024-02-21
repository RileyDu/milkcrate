import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function RecordDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const record = useSelector((store) =>
    store.recordReducer.find((record) => record.id.toString() === id)
  );
console.log('whats in the record?', record);
  useEffect(() => {
    if (!record) {
      dispatch({ type: "FETCH_RECORDS"});
    }
  }, [id, dispatch, record]);

  return (
    <div>
      <h2>In recordDetails</h2>
      <p>Record ID: {record.id}</p>
      <img src={record.coverart} alt={record.title} />
      <p>{record.title}</p>
      <p>{record.artist}</p>
      <p>{record.mood}</p>
      <p>{record.tags}</p>
      <p>{record.details}</p>

{/* {record?.length > 0 && ()} */}
    </div>
  );
}

export default RecordDetails;
