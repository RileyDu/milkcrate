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
  const activeUser = useSelector((store) => store.user);
  const recordReducer = useSelector((store) => store.recordReducer);
  const record = recordReducer.find(
    (record) => record.id.toString() === recordId
  );
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
    return <h2>Loading...</h2>;
  }

  const tagsArray = JSON.parse(record.tags);

  return (
    <div>
      <h2>In recordDetails</h2>
      {friendId ? (
        <button onClick={() => history.push(`/social/friends/${friendId}`)}>
          back
        </button>
      ) : (
        <button onClick={() => history.push("/user")}>home</button>
      )}
      <p>Record ID: {record.id}</p>
      <img src={record.coverart} alt={record.title} />
      <p>
        <strong>ALBUM TITLE:</strong> {record.title}
      </p>
      <p>
        <strong>ALBUM ARTIST:</strong> {record.artist}
      </p>
      <p>
        <strong>MOOD:</strong> {record.mood}
      </p>
      <p>
        <strong>TAGS</strong>
      </p>
      {console.log("what is a tag anyways?", tagsArray)}

      {tagsArray.length > 0 ? (
        <ul>
          {tagsArray.map((tag, i) => (
            <li key={i}>
              <p>{tag}</p>
            </li>
          ))}
        </ul>
      ) : null}
      <p>
        <strong>DETAILS:</strong> {record.details}
      </p>

      {record.user_id === activeUser.id && (
        <>
          <button onClick={() => deleteRecord()}>delete record</button>
          <button onClick={() => history.push(`/user/edit/${record.id}`)}>
            edit record
          </button>
        </>
      )}
    </div>
  );
}

export default RecordDetails;
