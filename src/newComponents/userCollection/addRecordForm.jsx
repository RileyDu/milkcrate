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


  return (
    <div>
      <h2>In addRecordForm</h2>
      <form>
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
        <input
          type="text"
          value={friendUsername}
          onChange={handleInputChangeFriend}
          placeholder="Select Record Mood"
        />
        <input
          type="text"
          value={recordDetails}
          onChange={handleInputChangeDetails}
          placeholder="Enter Record Details"
        />
      </form>
    </div>
  );
}

export default AddRecordForm;
