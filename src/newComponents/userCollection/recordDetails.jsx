import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

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
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "The record will be gone forever!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion, proceed with the delete operation
        dispatch({
          type: "DELETE_RECORD",
          payload: record.id,
        });
        history.push(`/user/profile`); // takes user back to home

        // Show deletion success message
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
      // If result.isConfirmed is false, user canceled, do nothing
    });
  }

  if (!record) {
    return <h2>Loading...</h2>;
  }

  const tagsArray = JSON.parse(record.tags);

  return (
    <div>
      <h2 className="header-tabs"> {record.title} Details</h2>
      <div class="d-grid gap-2 d-md-flex justify-content-center mt-5">
      <button
            className="btn btn-outline-primary"
            onClick={() => history.push("/user/profile")}
            id="addRecordBtn"
            style={{ width: '400px' }}
          >
            Back to home
          </button>
          </div>
      <div className="recordDetailsContainer">
        <div className="coverArtContainer">
          <img src={record.coverart} alt={record.title} className="coverArt" />
        </div>
        <div className="textContent">
          <p>
            <strong>TITLE:</strong> {record.title}
          </p>
          <p>
            <strong> ARTIST:</strong> {record.artist}
          </p>
          <p>
            <strong>MOOD:</strong> {record.mood}
          </p>
          {console.log("what is a tag anyways?", tagsArray)}
          <p>
            <strong>DETAILS:</strong> {record.details}
          </p>

          {tagsArray.length > 0 ? (
            <div className="container">
              {tagsArray.map((tag, i) => (
                <div key={i} className="badge bg-primary rounded-pill">
                  {tag}
                </div>
              ))}
            </div>
          ) : null}
          <hr />
          {record.user_id === activeUser.id && (
            <div className="buttonBar">
              <button
                onClick={() => history.push(`/user/edit/${record.id}`)}
                className="btn btn-outline-warning editRecordBtn"
              >
                edit record
              </button>
              <button
                onClick={() => deleteRecord()}
                className="btn btn-outline-danger deleteRecordBtn"
              >
                delete record
              </button>
            </div>
          )}
          {friendId && (
            <button
              onClick={() => history.push(`/social/friends/${friendId}`)}
              className="btn btn-outline-secondary btn-sm"
              id="friendBackBtn"
            >
              back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecordDetails;
