import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_BLINDBAG" actions
function* fetchBlindbag(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      params: { search: action.payload },
    };
    const response = yield axios.get("/api/blindbag", config);
    yield put({ type: "SET_BLINDBAG", payload: response.data });
  } catch (error) {
    console.error("User get request failed", error);
  }
}

// watcher Saga: handles blindbag actions
function* blindbagSaga() {
  yield takeLatest("FETCH_BLINDBAG", fetchBlindbag);
}

export default blindbagSaga;
