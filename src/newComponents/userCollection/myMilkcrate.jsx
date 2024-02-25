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
  const [hasSearched, setHasSearched] = useState(false);

  // console.log('whats in the crate mate?', records);

  useEffect(() => {
    dispatch({ type: "FETCH_RECORDS" });
    return () => dispatch({ type: `CLEAR_RECORDS` });
  }, [dispatch]);

  const handleInputChangeSearch = (e) => {
    setSearchQuery(e.target.value);
    if (hasSearched) setHasSearched(false);
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
    setHasSearched(true);
  }

  function clearSearch() {
    dispatch({
      type: "FETCH_RECORDS",
    });
    setSearchQuery("");
    setHasSearched(false);
  }

  return (
    <div>
      <h2 className="header-tabs">{username}'s milkcrate</h2>

<div className="form-group">
      <form onSubmit={(event) => searchRecords(event)}>
      <div className="form-floating mb-3">
        <input
          type="text"
          placeholder=""
          value={searchQuery}
          onChange={handleInputChangeSearch}
          id="searchInput"
          className="form-control"
        />
        <label htmlFor="searchInput"> Search by Album, Artist, or Tags</label>
        </div>
        <div class="d-grid gap-2">
        {searchQuery && !hasSearched && <button className="btn btn-lg btn-primary search-btns" type="submit">SEARCH</button>}
      {hasSearched && <button className="btn btn-lg btn-primary search-btns" onClick={clearSearch}>CLEAR</button>}
      </div>
      </form>
      </div>

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
