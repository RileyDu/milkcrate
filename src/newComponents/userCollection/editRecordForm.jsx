import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from "react-redux";


function EditRecordForm(props) {
  const dispatch = useDispatch();
  const record = useSelector((store) => store.record)
  const [recordArtist, setRecordArtist] = useState(record.artist);
  const [recordTitle, setRecordTitle] = useState(record.title);
  const [recordMood, setRecordMood] = useState(record.mood);
  const [recordDetails, setRecordDetails] = useState(record.details);

  const handleInputChangeArtist = (e) => {
    setRecordArtist(e.target.value);
  };


  const handleInputChangeTitle = (e) => {
    setRecordTitle(e.target.value);
  };


  const handleInputChangeDetails = (e) => {
    setRecordDetails(e.target.value);
  };

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
      type: "EDIT_RECORD",
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