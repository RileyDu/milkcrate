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
    const response = yield axios.get(`/api/spins/single/${action.payload}`);
    console.log("response from single spin get:", response.data);
    yield put({ type: "SET_SPINS", payload: response.data });
  } catch (error) {
    console.log("single spin get request failed", error);
  }
}

function* addSpins(action) {
  try {
    const response = yield axios.post("/api/spins/add", action.payload);
    yield put({ type: "FETCH_SPINS" });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* deleteSpin(action) {
  try {
    const response = yield axios.delete(`/api/spins/${action.payload}`);
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
