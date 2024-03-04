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
    console.log("friends response from backend:", response);
    yield put({ type: "SET_FRIENDS", payload: response.data });
  } catch (error) {
    console.error("User get request failed", error);
  }
}

function* postFriendship(action) {
  try {
    const response = yield axios.post("/api/social/add", action.payload);
    yield put({ type: "FETCH_FRIENDS" });
  } catch (error) {
    console.error("User get request failed", error);
  }
}

function* deleteFriendship(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.delete(
      `/api/social/${action.payload}`,
      config
    );
    yield put({ type: "FETCH_FRIENDS" });
  } catch (error) {
    console.error("User get request failed", error);
  }
}

function* fetchFriendsRecords(action) {
  try {
    const response = yield axios.get(
      `/api/social/friends/collection?id=${action.payload}`
    );
    yield put({ type: "SET_RECORDS", payload: response.data });
  } catch (error) {
    console.error("User get request failed", error);
  }
}

function* searchFriendsRecords(action) {
  try {
    const searchTerm = encodeURIComponent(action.payload.search);
    const response = yield axios.get(
      `/api/social/friends/collection/search?search=${searchTerm}&id=${action.payload.friend_id}`
    );
    yield put({ type: "SET_RECORDS", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* fetchHOTP(action) {
  try {
    const response = yield axios.get(`/api/social/hotp`);
    yield put({ type: "SET_HOTP", payload: response.data });
  } catch (error) {
    console.error("HOTP GET failed", error);
  }
}

function* fetchLatestListens(action) {
  try {
    const response = yield axios.get(`/api/social/latestListens`);
    yield put({ type: "SET_LATEST_LISTENS", payload: response.data });
  } catch (error) {
    console.error("Lastest listens GET failed", error);
  }
}

function* socialSaga() {
  console.log("Social saga started...");
  yield takeLatest("FETCH_FRIENDS", fetchFriends);
  yield takeLatest("POST_FRIENDSHIP", postFriendship);
  yield takeLatest("DELETE_FRIENDSHIP", deleteFriendship);
  yield takeLatest("FETCH_FRIENDS_RECORDS", fetchFriendsRecords);
  yield takeLatest("SEARCH_FRIENDS_RECORDS", searchFriendsRecords);
  yield takeLatest("FETCH_HOTP", fetchHOTP);
  yield takeLatest("FETCH_LATEST_LISTENS", fetchLatestListens);
}

export default socialSaga;
