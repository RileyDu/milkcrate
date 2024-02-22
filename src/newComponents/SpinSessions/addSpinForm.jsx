import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import DateTimePicker from "react-bootstrap-datetimepicker";
// import AsyncSelect from 'react-select/async';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css";

function AddSpinForm(props) {
  const dispatch = useDispatch();
  const [spinDetails, setSpinDetails] = useState('')

  const handleInputChangeDetails = (e) => {
    setSpinDetails(e.target.value);
  };

  return (
    <div>
      <h2>In addSpinForm</h2>
      <form onSubmit={(event) => postSpin(event)}>
        {/* hours and minutes for how long the spin session was */}
        <label htmlFor="hours">Hours:</label>
        <input type="number" id="hours" min="0" placeholder="Hours Listened" />
        <label htmlFor="minutes">Minutes:</label>
        <input
          type="number"
          id="minutes"
          min="0"
          max="59"
          placeholder="Minutes Listened"
        />
        {/* Details about the spin session they are adding */}
        <input
          type="text"
          value={spinDetails}
          onChange={handleInputChangeDetails}
          placeholder="Enter Spin Details"
        />
        <button type="submit">ADD SPIN</button>
      </form>
    </div>
  );
}

export default AddSpinForm;
