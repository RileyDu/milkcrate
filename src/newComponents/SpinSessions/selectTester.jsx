import AsyncSelect from "react-select/async";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import localeEn from "air-datepicker/locale/en";

function TestSite() {
  const dispatch = useDispatch();
  const usersRecords = useSelector((store) => store.recordReducer);
  const [date, setDate] = useState(new Date());
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
    dispatch({ type: "FETCH_RECORDS" });
    return () => dispatch({ type: `CLEAR_RECORDS` });
  }, [dispatch]);

  new AirDatepicker("#input", {
    locale: localeEn,
  });

  return (
    <>
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions={mappedAlbums}
        loadOptions={promiseOptions}
      />
      <form action="">
        <input type="text" id="input" placeholder="test" />
      </form>
    </>
  );
}
export default TestSite;
