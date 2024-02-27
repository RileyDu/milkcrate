import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <div className='container'>
    <form className="formPanel" onSubmit={registerUser}>
      <h2 style={{ textAlign: "center", paddingTop: "1em", paddingBottom: '1em' }}>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className="form-floating mb-3">
          <input
            type="text"
            id="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            placeholder=''
            className='form-control'
          />
        <label htmlFor="username">
          Username:
        </label>
      </div>
      <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            placeholder=''
            className='form-control'
          />
        <label htmlFor="password">
          Password:
        </label>
      </div>
      <div className="d-grid gap-2">
      <button className="btn btn-primary" type="submit">register</button>
      </div>
    </form>
        <div className="d-grid gap-2">
        <button className="btn btn-outline-secondary mt-3" onClick={() => history.push("/home")}>home</button>
        </div>
        </div>
  );
}

export default RegisterForm;
