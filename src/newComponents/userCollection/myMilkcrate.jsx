import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function MyMilkcrate(props) {
  const dispatch = useDispatch();
  const records = useSelector((store) => store.recordReducer);
  const history = useHistory();
  const username = useSelector((store) => store.user.username);
  const [searchQuery, setSearchQuery] = useState("");
  // console.log('whats in the crate mate?', records);

  useEffect(() => {
    dispatch({ type: "FETCH_RECORDS" });
    return () => dispatch({ type: `CLEAR_RECORDS` });
  }, [dispatch]);

  const handleInputChangeSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  function searchRecords(event) {
    event.preventDefault()
    console.log('checking payload of submit', searchQuery);
    
    if (!searchQuery) {
      alert('PLEASE SUBMIT A SEARCH')
      return;
    }

    const searchObject = {
      search: searchQuery
    }

    dispatch({
      type: "SEARCH_RECORDS",
      payload: searchObject
    })
  }

  return (
    <div>
      <h2>{username}'s milkcrate</h2>

      <form onSubmit={(event) => searchRecords(event)}>
        <input
          type="text"
          placeholder="Search milkcrate"
          value={searchQuery}
          onChange={handleInputChangeSearch}
        />
        <button type="submit">SEARCH</button>
      </form>

      {records?.length > 0 && (
        <ul>
          {records.map((record, i) => (
            <li key={i}>
              {/* {console.log('whats the record?', record)} */}
              <img
                onClick={() => history.push(`/user/details/${record.id}`)}
                src={record.coverart}
              />
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => history.push("/user/add")}>Add record</button>
      {/* THE EDIT NEEDS TO GO IN THE DETAILS PAGE */}
    </div>
  );
}
<img />;
export default MyMilkcrate;
