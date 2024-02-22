import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AsyncSelect from "react-select/async";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import localeEn from "air-datepicker/locale/en";

function AddSpinForm(props) {
  const dispatch = useDispatch();
  const [spinDetails, setSpinDetails] = useState("");
  const [spinDate, setSpinDate] = useState("");
  const [spinRecords, setSpinRecords] = useState("");
  const [spinHours, setSpinHours] = useState("");
  const [spinMins, setSpinMins] = useState("");
  const usersRecords = useSelector((store) => store.recordReducer);

  const handleInputChangeDetails = (e) => {
    setSpinDetails(e.target.value);
  };
  const handleInputChangeDate = (e) => {
    setSpinDate(e.target.value);
  };

  const handleInputChangeRecords = (e) => {
    setSpinRecords(e.target.value);
  };

  const handleInputChangeHours = (e) => {
    setSpinHours(e.target.value);
  };

  const handleInputChangeMinutes = (e) => {
    setSpinMins(e.target.value);
  };

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

  new AirDatepicker("#datePicker", {
    locale: localeEn,
  });

  useEffect(() => {
    dispatch({ type: "FETCH_RECORDS" });
    return () => dispatch({ type: `CLEAR_RECORDS` });
  }, [dispatch]);

  return (
    <div>
      <h2>In addSpinForm</h2>
      <form onSubmit={(event) => postSpin(event)}>
        <label htmlFor="multiSelectRecords">Select Spun Records:</label>
        <AsyncSelect
          isMulti
          cacheOptions
          defaultOptions={mappedAlbums}
          loadOptions={promiseOptions}
          id="multiSelectRecords"
          value={spinRecords}
          onChange={handleInputChangeRecords}
        />
        <label htmlFor="datePicker">Pick Date:</label>
        <input
          type="text"
          id="datePicker"
          placeholder="Pick Date of Session"
          value={spinDate}
          onChange={handleInputChangeDate}
        />

        <label htmlFor="hours">Hours:</label>
        <input
          type="number"
          id="hours"
          min="0"
          value={spinHours}
          onChange={handleInputChangeHours}
        />
        <label htmlFor="minutes">Minutes:</label>
        <input
          type="number"
          id="minutes"
          min="0"
          max="59"
          value={spinMins}
          onChange={handleInputChangeMinutes}
        />

        {/* Details about the spin session they are adding */}
        <label htmlFor="spinDetails"> Spin Details: </label>
        <input
          type="text"
          value={spinDetails}
          onChange={handleInputChangeDetails}
          placeholder="Enter Spin Details"
          id="spinDetails"
        />
        <button type="submit">ADD SPIN</button>
      </form>
    </div>
  );
}

export default AddSpinForm;
