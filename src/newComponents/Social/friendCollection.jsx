import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";
import { Row, Col } from "react-bootstrap";

function FriendCollection(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const records = useSelector((store) => store.recordReducer);
  const socialReducer = useSelector((store) => store.socialReducer);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const friend = socialReducer.find(
    (friend) => friend.friend_id.toString() === id
  );
  console.log("what is the friend?", friend);
  useEffect(() => {
    dispatch({ type: "FETCH_FRIENDS_RECORDS", payload: id });
    // return a function to run it when this component unmounts
    return () => dispatch({ type: `CLEAR_RECORDS` });
  }, [socialReducer]);

  function deleteFriend() {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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

  if (!friend) {
    return <h2>Loading...</h2>;
  }

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

  return (
    <div>
      <h2 className="header-tabs">{friend.friend_username}'s milkcrate.</h2>
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
            <label htmlFor="searchInput">
              {" "}
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
      {records?.length > 0 && (
        <div className="container-gallery">
          <Row xs={1} sm={3} md={6} className="g-4">
            {/* responsive bootstrap grid to adjust columns on width */}
            {records.map((record, i) => (
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
          <div class="d-grid gap-2">
            <button
              className="btn btn-lg btn-dark dlt-btn"
              onClick={() => deleteFriend()}
            >
              delete friend
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FriendCollection;
