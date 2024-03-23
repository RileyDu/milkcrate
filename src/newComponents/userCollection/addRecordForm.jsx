import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

function AddRecordForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [recordArtist, setRecordArtist] = useState("");
  const [recordTitle, setRecordTitle] = useState("");
  const [recordMood, setRecordMood] = useState("");
  const [recordDetails, setRecordDetails] = useState("");

  const moods = useSelector((store) => store.moodReducer);

  const handleInputChangeArtist = (e) => {
    setRecordArtist(e.target.value);
  };

  const handleInputChangeTitle = (e) => {
    setRecordTitle(e.target.value);
  };

  const handleInputChangeDetails = (e) => {
    setRecordDetails(e.target.value);
  };

  function postRecord(event) {
    event.preventDefault();
    console.log(
      "checking payload of submit",
      recordArtist,
      recordTitle,
      recordDetails,
      recordMood
    );

    if (!recordArtist || !recordTitle || !recordMood) {
      Swal.fire({
        title: "Attention!",
        text: "Please fill form before submit",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const newRecord = {
      artist: recordArtist,
      title: recordTitle,
      mood: recordMood,
      details: recordDetails,
    };

    dispatch({
      type: "POST_RECORD",
      payload: newRecord,
    });
    setRecordArtist("");
    setRecordTitle("");
    setRecordMood("");
    setRecordDetails("");

    Swal.fire({
      position: "center",
      icon: "success",
      title: "The record has been added to your milkcrate",
      showConfirmButton: false,
      timer: 1000,
    });
  }

  useEffect(() => {
    dispatch({ type: "FETCH_MOOD" });
  }, [dispatch]);

  return (
    <div>
      <h2 className="header-tabs"> Add to milkcrate </h2>
      <div className="container">
        <form onSubmit={(event) => postRecord(event)}>
          <div class="form-floating mb-3">
            <input
              type="text"
              value={recordArtist}
              onChange={handleInputChangeArtist}
              placeholder=""
              id="artistFormInput"
              className="form-control"
            />
            <label for="artistFormInput">Enter Record Artist</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              value={recordTitle}
              onChange={handleInputChangeTitle}
              placeholder=""
              id="titleFormInput"
              className="form-control"
            />
            <label for="titleFormInput">Enter Record Title</label>
          </div>

          <select
            value={recordMood}
            id="moodDropDown"
            className="form-select mb-3"
            onChange={(e) => {
              const selectedMood = e.target.value;
              console.log("Selected Mood from user:", selectedMood);
              setRecordMood(selectedMood);
            }}
          >
            {/* onChange assigns the selected value to local state */}
            <option value=""> Select Record Mood </option>
            {/* make shift placeholder above */}
            {moods.map((mood) => (
              <option key={mood.id} value={mood.id}>
                {mood.mood}
              </option>
            ))}
          </select>

          <div class="form-floating mb-3">
            <textarea
              className="form-control"
              type="text"
              value={recordDetails}
              onChange={handleInputChangeDetails}
              placeholder=""
              rows={3}
              id="detailsFormInput"
              style={{ height: "10em" }}
            />
            <label htmlFor="detailsFormInput">Enter Record Details </label>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-lg btn-primary" type="submit">
              ADD RECORD
            </button>
            <button className="btn btn-lg btn-outline-primary" onClick={() => history.push("/user/profile") }>
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecordForm;
