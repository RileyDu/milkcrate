import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchSpins() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/spins', config);


    yield put({ type: 'SET_SPINS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* fetchSingleSpin() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      // the config includes credentials which
      // allow the server session to recognize the user
      // If a user is logged in, this will return their information
      // from the server session (req.user)
      const response = yield axios.get('/api/spins/single', config);
  
      // now that the session has given us a user object
      // with an id and username set the client-side user object to let
      // the client-side code know the user is logged in
      yield put({ type: 'SET_SPINS', payload: response.data });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

function* addSpins(action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      // the config includes credentials which
      // allow the server session to recognize the user
      // If a user is logged in, this will return their information
      // from the server session (req.user)
      const response = yield axios.post('/api/spins/add', config, action.payload);
  
      // now that the session has given us a user object
      // with an id and username set the client-side user object to let
      // the client-side code know the user is logged in
      yield put({ type: 'FETCH_SPINS'});
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

function* spinsSaga() {
  yield takeLatest('FETCH_SPINS', fetchSpins);
  yield takeLatest('POST_SPINS', addSpins);
  yield takeLatest('FETCH_SINGLE_SPIN', fetchSingleSpin);
}

export default spinsSaga;
