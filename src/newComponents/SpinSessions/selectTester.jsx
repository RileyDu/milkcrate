import AsyncSelect from "react-select/async";
import { useSelector } from "react-redux";
// import { ColourOption, colourOptions } from '../data';
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function TestSite() {
  const dispatch = useDispatch();
  const usersRecords = useSelector((store) => store.recordReducer);

  const mappedAlbums = usersRecords.map(album => ({
    value: album.id.toString(), // Ensure the value is a string
    label: album.title // Use the album title for the label
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

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions={mappedAlbums}
      loadOptions={promiseOptions}
    />
  );
}
export default TestSite;

/* Let's user pick time and date when the spin occured */
/* <DateTimePicker
  onChange={handleDateChange}
  format="YYYY-MM-DD HH:mm"
  inputProps={{ placeholder: "Select Date and Time" }}
  sideBySide
/> */

// const [selectedDate, setSelectedDate] = useState(null);

// const handleDateChange = (date) => {
//   setSelectedDate(date);
// };
