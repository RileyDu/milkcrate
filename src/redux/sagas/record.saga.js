import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchRecords() {
  try {
    const response = yield axios.get('/api/record', );
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

  function* searchRecords(action) {
    try {
      const response = yield axios.get('/api/record/search', action.payload );
      yield put({ type: 'SET_RECORDS', payload: response.data });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

  //STILL NEEDS THE STUPID SEARCH FEATURE

function* recordSaga() {
  yield takeLatest('FETCH_RECORDS', fetchRecords);
  yield takeLatest('POST_RECORD', postRecord);
  yield takeLatest('EDIT_RECORD', editRecord);
  yield takeLatest('DELETE_RECORD', deleteRecord);
  yield takeLatest('SEARCH_RECORDS', searchRecords);
}

export default recordSaga;
