import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Row, Col } from "react-bootstrap";

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
    event.preventDefault();
    console.log("checking payload of submit", searchQuery);

    if (!searchQuery) {
      Swal.fire({
        title: "Attention!",
        text: "Please submit something to search",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const searchObject = {
      search: searchQuery,
    };

    dispatch({
      type: "SEARCH_RECORDS",
      payload: searchObject,
    });
  }

  function clearSearch() {
    dispatch({
      type: "FETCH_RECORDS",
    });
    setSearchQuery("");
  }

  return (
    <div>
      <h2 className="milkcrate-header">{username}'s milkcrate</h2>

      <button onClick={() => history.push("/user/add")}>Add record</button>
      <form onSubmit={(event) => searchRecords(event)}>
        <input
          type="text"
          placeholder="Search milkcrate"
          value={searchQuery}
          onChange={handleInputChangeSearch}
        />
        <button type="submit">SEARCH</button>
      </form>
      <button onClick={clearSearch}>CLEAR</button>
      {records?.length > 0 && (
        <div className="container-gallery">
          <Row xs={1} sm={3} md={6} className="g-4">
            {/* responsive bootstrap grid to adjust columns on width */}
            {records.map((record, i) => (
              <Col key={i}>
                <img
                  onClick={() => history.push(`/user/details/${record.id}`)}
                  src={record.coverart}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
      {/* THE EDIT NEEDS TO GO IN THE DETAILS PAGE */}
    </div>
  );
}
<img />;
export default MyMilkcrate;
