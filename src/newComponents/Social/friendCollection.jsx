import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

function FriendCollection(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const records = useSelector((store) => store.recordReducer);
  const [searchQuery, setSearchQuery] = useState("");
  const socialReducer = useSelector((store) => store.socialReducer);
  const friend = socialReducer.find(
    (friend) => friend.friend_id.toString() === id
  );
  console.log("what is the friend?", friend);
  useEffect(() => {
    dispatch({ type: "FETCH_FRIENDS_RECORDS", payload: id });
    // return a function to run it when this component unmounts
    return () => dispatch({type: `CLEAR_RECORDS`});
  }, [socialReducer]);

function deleteFriend() {
  // Show SweetAlert confirmation dialog
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed deletion, proceed with the delete operation
      dispatch({
        type: "DELETE_FRIENDSHIP",
        payload: id,
      });
      history.push(`/social`); // takes user back to home

      // Show deletion success message
      Swal.fire(
        'Deleted!',
        'The friendship has been ended.',
        'success'
      );
    }
    // If result.isConfirmed is false, user canceled, do nothing
  });
}


  const handleInputChangeSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (!friend) {
    return <h2>Loading...</h2>
  }

  function searchRecords(event) {
    event.preventDefault()
    console.log('checking payload of submit', searchQuery);
    
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
      friend_id: id
    }

    dispatch({
      type: "SEARCH_FRIENDS_RECORDS",
      payload: searchObject
    })
  }

  function clearSearch(){
    dispatch({
      type: "FETCH_FRIENDS_RECORDS",
      payload: id
    })
    setSearchQuery('');
  }

  return (
    <div>
      <h2>{friend.friend_username}'s milkcrate</h2>
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

      <hr/>
      <button onClick={() => history.push("/social")}>back</button>
      <button onClick={() => deleteFriend()}>delete friend</button>
      {records?.length > 0 && (
        <ul>
          {records.map((record, i) => (
            <li key={i}>
              {console.log("whats the record?", record)}
              <img
                onClick={() =>
                  history.push(`/social/friends/${id}/${record.id}`)
                }
                src={record.coverart}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FriendCollection;
