import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";
import { Row, Col } from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner";
import { useMemo } from "react";

function FriendCollection(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const records = useSelector((store) => store.recordReducer);
  const socialReducer = useSelector((store) => store.socialReducer);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [filterParam, setFilterParam] = useState("date_addedNewest");

  const friend = socialReducer.find(
    (friend) => friend.friend_id.toString() === id
  );

  useEffect(() => {
    dispatch({ type: "FETCH_FRIENDS_RECORDS", payload: id });

    return () => {
      dispatch({ type: `CLEAR_RECORDS` });
    };
  }, [socialReducer]);

  function deleteFriend() {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion, proceed with the delete operation
        dispatch({
          type: "DELETE_FRIENDSHIP",
          payload: id,
        });
        history.push(`/social`); // takes user back to home

        // Show deletion success message
        Swal.fire("Deleted!", "The friendship has been ended.", "success");
      }
      // If result.isConfirmed is false, user canceled, do nothing
    });
  }

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
      friend_id: id,
    };

    dispatch({
      type: "SEARCH_FRIENDS_RECORDS",
      payload: searchObject,
    });
    setHasSearched(true);
  }

  function clearSearch() {
    dispatch({
      type: "FETCH_FRIENDS_RECORDS",
      payload: id,
    });
    setSearchQuery("");
    setHasSearched(false);
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
          return a.title.localeCompare(b.title);
        case "albumZA":
          return b.title.localeCompare(a.title);
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
      <h2 className="header-tabs">{friend.friend_username}'s milkcrate.</h2>
      <div className="form-group">
        <div className="form-floating mb-3" id="filterBtns">
          <div
            id="filterLabel"
            className="btn-group"
            role="group"
            aria-label="Filter options"
          >
            <input
              type="radio"
              className="btn-check"
              name="filterParam"
              id="date_addedNewest"
              value="date_addedNewest"
              onChange={(e) => setFilterParam(e.target.value)}
              checked={filterParam === "date_addedNewest"}
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="date_addedNewest"
            >
              Newest Records
            </label>

            <input
              type="radio"
              className="btn-check"
              name="filterParam"
              id="date_addedOldest"
              value="date_addedOldest"
              onChange={(e) => setFilterParam(e.target.value)}
              checked={filterParam === "date_addedOldest"}
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="date_addedOldest"
            >
              Oldest Records
            </label>

            <input
              type="radio"
              className="btn-check"
              name="filterParam"
              id="artistAZ"
              value="artistAZ"
              onChange={(e) => setFilterParam(e.target.value)}
              checked={filterParam === "artistAZ"}
            />
            <label className="btn btn-outline-primary" htmlFor="artistAZ">
              Artist [A-Z]
            </label>

            <input
              type="radio"
              className="btn-check"
              name="filterParam"
              id="artistZA"
              value="artistZA"
              onChange={(e) => setFilterParam(e.target.value)}
              checked={filterParam === "artistZA"}
            />
            <label className="btn btn-outline-primary" htmlFor="artistZA">
              Artist [Z-A]
            </label>

            <input
              type="radio"
              className="btn-check"
              name="filterParam"
              id="albumAZ"
              value="albumAZ"
              onChange={(e) => setFilterParam(e.target.value)}
              checked={filterParam === "albumAZ"}
            />
            <label className="btn btn-outline-primary" htmlFor="albumAZ">
              Album [A-Z]
            </label>

            <input
              type="radio"
              className="btn-check"
              name="filterParam"
              id="albumZA"
              value="albumZA"
              onChange={(e) => setFilterParam(e.target.value)}
              checked={filterParam === "albumZA"}
            />
            <label className="btn btn-outline-primary" htmlFor="albumZA">
              Album [Z-A]
            </label>
          </div>
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
            {/* responsive bootstrap grid to adjust columns on width */}
            {sortedRecords.map((record, i) => (
              <Col key={i}>
                <img
                  onClick={() =>
                    history.push(`/social/friends/${id}/${record.id}`)
                  }
                  src={record.coverart}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
      <div className="container-gallery">
        <div class="d-grid gap-2">
          <button
            className="btn btn-lg btn-dark dlt-btn"
            onClick={() => deleteFriend()}
          >
            delete friend
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendCollection;
