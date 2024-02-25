import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AsyncSelect from "react-select/async";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import localeEn from "air-datepicker/locale/en";
import Swal from 'sweetalert2'

function AddSpinForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [spinDetails, setSpinDetails] = useState("");
  const [spinDate, setSpinDate] = useState("");
  const [spinRecords, setSpinRecords] = useState("");
  const [spinHours, setSpinHours] = useState("");
  const [spinMins, setSpinMins] = useState("");
  const usersRecords = useSelector((store) => store.recordReducer);

  const handleInputChangeDetails = (e) => {
    setSpinDetails(e.target.value);
  };
  // const handleInputChangeDate = (e) => {
  //   setSpinDate(e.target.value);
  // };

  const handleInputChangeRecords = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSpinRecords(selectedValues);
  };
  // console.log('whats in the crate mate?', spinRecords);

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

  // new AirDatepicker("#datePicker", {
  //   locale: localeEn,
  //   onSelect: function(formattedDate, date, inst) {
  //     setSpinDate(formattedDate);
  //   }
  // });

  useEffect(() => {
    const datepicker = new AirDatepicker("#datePicker", {
      locale: localeEn,
      onSelect: function (formattedDate) {
        setSpinDate(formattedDate);
      },
    });
    return () => datepicker.destroy();
  }, []);
  console.log("spin date", spinDate);

  function postSpin(event) {
    event.preventDefault();
    if (!spinHours || !spinMins || !spinDetails || !spinRecords || !spinDate) {
      Swal.fire({
        title: "Attention!",
        text: "Please fill form before submit",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const formattedTimeSpent = spinHours + ":" + spinMins;

    const addSpinObject = {
      timeSpent: formattedTimeSpent,
      listenedAt: spinDate.formattedDate,
      details: spinDetails,
      albums: spinRecords,
    };
    console.log("checking payload of submit", addSpinObject);
    dispatch({
      type: "POST_SPINS",
      payload: addSpinObject,
    });
    setSpinDate("");
    setSpinDetails("");
    setSpinHours("");
    setSpinMins("");
    setSpinRecords("");
    history.push("/spins");
  }

  useEffect(() => {
    dispatch({ type: "FETCH_RECORDS" });
    return () => dispatch({ type: `CLEAR_RECORDS` });
  }, [dispatch]);

  return (
    <div>
      <h2 className="header-tabs"> add a spin</h2>
      <button onClick={() => history.push("/spins")}>back</button>
      <form onSubmit={(event) => postSpin(event)}>
        <label htmlFor="datePicker">Pick Date:</label>
        <span id="datePicker" />

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
        <label htmlFor="multiSelectRecords">Select Spun Records:</label>
        <AsyncSelect
          isMulti
          cacheOptions
          defaultOptions={mappedAlbums}
          loadOptions={promiseOptions}
          id="multiSelectRecords"
          value={mappedAlbums.filter((album) =>
            spinRecords.includes(album.value)
          )}
          onChange={handleInputChangeRecords}
        />
        <button type="submit">ADD SPIN</button>
      </form>
    </div>
  );
}

export default AddSpinForm;
