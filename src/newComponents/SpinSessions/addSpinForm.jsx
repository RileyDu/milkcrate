import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AsyncSelect from "react-select/async";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import localeEn from "air-datepicker/locale/en";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import '@sweetalert2/theme-dark/dark.css';

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


  const handleInputChangeRecords = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSpinRecords(selectedValues);
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



  useEffect(() => {
    const datepicker = new AirDatepicker("#datePicker", {
      isMobile: true,
      autoClose: true,
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
      <form onSubmit={(event) => postSpin(event)}>
        <div className="container">
          <div class="form-floating mb-3">
            <input id="datePicker" className="form-control" placeholder="" />
            <label htmlFor="datePicker">Pick Date:</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="number"
              id="hours"
              min="0"
              value={spinHours}
              onChange={handleInputChangeHours}
              className="form-control"
              placeholder=""
            />
            <label htmlFor="hours">Hours:</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="number"
              id="minutes"
              min="0"
              max="59"
              value={spinMins}
              onChange={handleInputChangeMinutes}
              className="form-control"
              placeholder=""
            />
            <label htmlFor="minutes">Minutes:</label>
          </div>

          {/* Details about the spin session they are adding */}
          <div class="form-floating mb-3">
            <textarea
              type="text"
              value={spinDetails}
              onChange={handleInputChangeDetails}
              placeholder=""
              id="spinDetails"
              className="form-control"
              style={{ height: "10em" }}
            />
            <label htmlFor="spinDetails"> Spin Details: </label>
          </div>

          <div class="form-floating mb-3">
            <AsyncSelect
              unstyled
              isMulti
              cacheOptions
              defaultOptions={mappedAlbums}
              loadOptions={promiseOptions}
              id="multiSelectRecords"
              value={mappedAlbums.filter((album) =>
                spinRecords.includes(album.value)
              )}
              onChange={handleInputChangeRecords}
              className="form-control mb-3"
              placeholder=''
              styles={{
                menu: (base) => ({
                  ...base,
                  backgroundColor: 'darkgrey',
                }),
                option: (base, state) => ({
                  ...base,
                  color: 'white',
                  padding: '8px 12px', 
                }),
                control: (base) => ({
                  ...base,
                  padding: '10px',
                }),
                multiValue: (base) => ({
                  ...base,
                  marginRight: '8px',
                }),
              }}
            />
            <label htmlFor="multiSelectRecords">Select Spun Records:</label>
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-lg btn-primary" type="submit">
              ADD SPIN
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddSpinForm;
