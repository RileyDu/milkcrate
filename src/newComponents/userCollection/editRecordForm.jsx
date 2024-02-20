import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from "react-redux";
const dispatch = useDispatch();


function EditRecordForm(props) {

  function editRecord(event) {
    event.preventDefault()
    console.log('checking payload of submit', recordArtist, recordTitle, recordDetails, recordMood,);
    
    if (!recordArtist || !recordTitle || !recordMood || !recordDetails) {
      alert('PLEASE FILL FORM BEFORE SUBMIT')
      return;
    }
  
    const newEdits = {
      artist: recordArtist,
      title: recordTitle,
      mood: recordMood,
      details: recordDetails
    }

    dispatch({
      type: "POST_RECORD",
      payload: newEdits
    })
    setRecordArtist('');
    setRecordTitle('');
    setRecordMood('');
    setRecordDetails('');
  }


  return (
    <div>
      <h2>In editRecordForm</h2>
      <form onSubmit={(event) => editRecord(event)}>
        <input
          type="text"
          value={recordArtist}
          onChange={handleInputChangeArtist}
          placeholder="Enter Record Artist"
        />
        <input
          type="text"
          value={recordTitle}
          onChange={handleInputChangeTitle}
          placeholder="Enter Record Title"
        />
          <select
            value={recordMood}
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
        <input
          type="text"
          value={recordDetails}
          onChange={handleInputChangeDetails}
          placeholder="Enter Record Details"
        />
        <button type='submit'>EDIT RECORD</button>
      </form>
    </div>
  );
}

export default EditRecordForm;