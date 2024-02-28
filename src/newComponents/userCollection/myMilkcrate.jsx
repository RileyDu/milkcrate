import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";
import { Row, Col } from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner";
import { useMemo } from "react";

function MyMilkcrate(props) {
  const dispatch = useDispatch();
  const records = useSelector((store) => store.recordReducer);
  const history = useHistory();
  const username = useSelector((store) => store.user.username);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterParam, setFilterParam] = useState("date_added");

  // console.log('whats in the crate mate?', records);

  useEffect(() => {
    const isFirstVisitSession =
      sessionStorage.getItem("isFirstVisitSession") === null;

    if (isFirstVisitSession) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("isFirstVisitSession", "false");
      }, 1000);
    }

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const sortedRecords = useMemo(() => {
    // Using slice to create a shallow copy of records before sorting to avoid mutating the original state
    return [...records].sort((a, b) => {
      switch (filterParam) {
        case "artistAZ":
          return a.artist.localeCompare(b.artist);
        case "artistZA":
          return b.artist.localeCompare(a.artist);
        case "albumAZ":
          return a.title.localeCompare(b.album);
        case "albumZA":
          return b.title.localeCompare(a.album);
        case "date_addedNewest":
          // Convert dates to timestamps for comparison
          return new Date(b.date_added) - new Date(a.date_added);
        case "date_addedOldest":
          // Convert dates to timestamps for comparison
          return new Date(a.date_added) - new Date(b.date_added);
        default:
          // If no filterParam is matched, do not sort
          return 0;
      }
    });
  }, [records, filterParam]);

  return (
    <div>
      <h2 className="header-tabs">{username}'s milkcrate.</h2>

      <div className="form-group">
        <div className="form-floating">
          <select
            value={filterParam}
            id="filterLabel"
            className="form-select mb-3 "
            onChange={(e) => setFilterParam(e.target.value)}
          >
            <option value="date_addedNewest">Newest Records</option>
            <option value="date_addedOldest">Oldest Records</option>
            <option value="artistAZ">Artist [A-Z]</option>
            <option value="artistZA">Artist [Z-A]</option>
            <option value="albumAZ">Album [A-Z]</option>
            <option value="albumZA">Album [Z-A]</option>
          </select>
          <label htmlFor="filterLabel">Filter your milkcrate.</label>
        </div>

        {/* search bar */}
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
            <label htmlFor="searchInput">
              Search by Album, Artist, or Tags
            </label>
          </div>
          <div class="d-grid gap-2">
            {searchQuery && !hasSearched && (
              <button
                className="btn btn-lg btn-primary search-btns"
                type="submit"
              >
                SEARCH
              </button>
            )}
            {hasSearched && (
              <button
                className="btn btn-lg btn-primary search-btns"
                onClick={clearSearch}
              >
                CLEAR
              </button>
            )}
          </div>
        </form>
      </div>

      {sortedRecords.length > 0 && (
        <div className="container-gallery">
          <Row xs={1} sm={3} md={6} className="g-4">
            {sortedRecords.map((record, i) => (
              <Col key={i}>
                <img
                  onClick={() => history.push(`/user/details/${record.id}`)}
                  src={record.coverart}
                  alt={record.title}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default MyMilkcrate;
