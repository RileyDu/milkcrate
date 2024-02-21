import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchRecords() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/record', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_RECORDS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* postRecord(action) {
    try {
      const response = yield axios.post('/api/record/add', action.payload);
      yield put({ type: 'FETCH_RECORDS' });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

  function* editRecord(action) {
    try {
      const response = yield axios.put('/api/record/edit', action.payload);
      yield put({ type: 'FETCH_RECORDS' });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

  function* deleteRecord(action) {
    try {
      const response = yield axios.delete(`/api/record/${action.payload}`);
      yield put({ type: 'FETCH_RECORDS' });
    } catch (error) {
      console.error('DELETE record FAILURE', error);
    }
  }

  //STILL NEEDS THE STUPID SEARCH FEATURE

function* recordSaga() {
  yield takeLatest('FETCH_RECORDS', fetchRecords);
  yield takeLatest('POST_RECORD', postRecord);
  yield takeLatest('EDIT_RECORD', editRecord);
  yield takeLatest('DELETE_RECORD', deleteRecord);
}

export default recordSaga;
