import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchMoods() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const response = yield axios.get("/api/mood", config);

    yield put({ type: "SET_MOOD", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* moodSaga() {
  yield takeLatest("FETCH_MOOD", fetchMoods);
}

export default moodSaga;
