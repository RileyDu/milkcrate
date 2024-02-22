import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AsyncSelect from 'react-select/async';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';

function AddSpinForm(props) {
  const dispatch = useDispatch();
  const [spinDetails, setSpinDetails] = useState("");

  const handleInputChangeDetails = (e) => {
    setSpinDetails(e.target.value);
  };

  const usersRecords = useSelector((store) => store.recordReducer);

  const mappedAlbums = usersRecords.map((album) => ({
    value: album.id.toString(), // Ensure the value is a string
    label: album.title, // Use the album title for the label
  }));

  const filterRecords = (inputValue) => {
    return mappedAlbums.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterRecords(inputValue));
      }, 1000);
    });

    new AirDatepicker('#datePicker',{
      locale: localeEn
  })

  useEffect(() => {
    dispatch({ type: "FETCH_RECORDS" });
    return () => dispatch({ type: `CLEAR_RECORDS` });
  }, [dispatch]);

  return (
    <div>
      <h2>In addSpinForm</h2>
      <form onSubmit={(event) => postSpin(event)}>
        {/* hours and minutes for how long the spin session was */}
        <AsyncSelect
          isMulti
          cacheOptions
          defaultOptions={mappedAlbums}
          loadOptions={promiseOptions}
        />
        <input type="text" id="datePicker" placeholder="Pick Date of Session" />
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
