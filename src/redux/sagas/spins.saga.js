import axios from "axios";
import { put, take, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchSpins() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const response = yield axios.get("/api/spins", config);

    yield put({ type: "SET_SPINS", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* fetchSingleSpin(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get(
      `/api/spins/single?id=${action.payload}`,
      config
    );

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_SPINS", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* addSpins(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.post("/api/spins/add", config, action.payload);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "FETCH_SPINS" });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* deleteSpin(action) {
  try {
    const response = yield axios.delete(
      `/api/spins/${action.payload}`
    );
    yield put({ type: "FETCH_SPINS" });
  } catch (error) {
    console.error("User get request failed", error);
  }
}

function* spinsSaga() {
  yield takeLatest("FETCH_SPINS", fetchSpins);
  yield takeLatest("POST_SPINS", addSpins);
  yield takeLatest("FETCH_SINGLE_SPIN", fetchSingleSpin);
  yield takeLatest("DELETE_SPIN", deleteSpin);
}

export default spinsSaga;
