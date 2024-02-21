import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function RecordDetails() {
  const { recordId, friendId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const recordReducer = useSelector((store) => store.recordReducer);
  const record = recordReducer.find((record) => record.id.toString() === recordId)
  console.log("whats in the record?", record);
  useEffect(() => {
    // if (!record) {
    if (friendId) {
      dispatch({ type: "FETCH_FRIENDS_RECORDS", payload: friendId });
    } else {
      // this is not a friend route, just my milkcrate
      dispatch({ type: "FETCH_RECORDS" });
    }
    // }
  }, [dispatch, friendId]);

  function deleteRecord() {
    //delete button triggers this and sends a DELETE request to db w/id
    dispatch({
      type: "DELETE_RECORD",
      payload: record.id,
    });
    history.push(`/`); // takes user back to home
  }

  if (!record) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <h2>In recordDetails</h2>
      <button onClick={() => history.push("/user")}>back</button>
      <p>Record ID: {record.id}</p>
      <img src={record.coverart} alt={record.title} />
      <p>{record.title}</p>
      <p>{record.artist}</p>
      <p>{record.mood}</p>
      <p>{record.tags}</p>
      <p>{record.details}</p>
      <button onClick={() => deleteRecord()}>delete record</button>
      <button onClick={() => history.push(`/user/edit/${record.id}`)}>
        edit record
      </button>
    </div>
  );
}

export default RecordDetails;
