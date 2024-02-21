import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchFriends() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    console.log("Fetching friends...");
    const response = yield axios.get("/api/social/friends", config);
    console.log('friends response from backend:', response)
    yield put({ type: "SET_FRIENDS", payload: response.data });
  } catch (error) {
    console.error("User get request failed", error);
  }
}

function* postFriendship() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.post("/api/social/add", config);
    yield put({ type: "FETCH_FRIENDS" });
  } catch (error) {
    console.error("User get request failed", error);
  }
}

function* deleteFriendship() {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const response = yield axios.delete("/api/social/delete", config);
      yield put({ type: "FETCH_FRIENDS" });
    } catch (error) {
      console.error("User get request failed", error);
    }
  }

  function* fetchFriendsRecords() {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const response = yield axios.get("/api/social/friends/collection", config);
      yield put({ type: "SET_RECORDS", payload: response.data });
    } catch (error) {
      console.error("User get request failed", error);
    }
  }


//   NEED TO IMPLEMENT SEARCH STILL

function* socialSaga() {
  console.log("Social saga started...");
  yield takeLatest("FETCH_FRIENDS", fetchFriends);
  yield takeLatest("POST_FRIENDSHIP", postFriendship);
  yield takeLatest("DELETE_FRIENDSHIP", deleteFriendship);
  yield takeLatest("FETCH_FRIENDS_RECORDS", fetchFriendsRecords);

}

export default socialSaga;
