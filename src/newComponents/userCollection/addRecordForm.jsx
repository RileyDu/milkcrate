import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function AddRecordForm(props) {
  const dispatch = useDispatch();
  const [recordArtist, setRecordArtist] = useState('');
  const [recordTitle, setRecordTitle] = useState('');
  const [recordMood, setRecordMood] = useState('');
  const [recordDetails, setRecordDetails] = useState('');


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
    event.preventDefault()
    console.log('checking payload of submit', recordArtist, recordTitle, recordDetails, recordMood,);
    
    if (!recordArtist || !recordTitle || !recordMood || !recordDetails) {
      alert('PLEASE FILL FORM BEFORE SUBMIT')
      return;
    }
  
    const newRecord = {
      artist: recordArtist,
      title: recordTitle,
      mood: recordMood,
      details: recordDetails
    }

    dispatch({
      type: "POST_RECORD",
      payload: newRecord
    })
    setRecordArtist('');
    setRecordTitle('');
    setRecordMood('');
    setRecordDetails('');
  }

  return (
    <div>
      <h2>In addRecordForm</h2>
      <form onSubmit={(event) => postRecord(event)}>
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
        <button type='submit'>ADD RECORD</button>
      </form>
    </div>
  );
}

export default AddRecordForm;
