import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
      history.push("/user/profile");
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <>
      <form onSubmit={login}>
        <div className="loginFormcontainer">
          <h2 style={{ textAlign: "center" }}>Login</h2>
          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
            </h3>
          )}
          <div className="form-floating mb-3">
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="form-control"
              placeholder=""
            />
            <label htmlFor="username">Username:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              placeholder=""
            />
            <label htmlFor="password">Password:</label>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit">
              login
            </button>
          </div>
        </div>
      </form>
      <div className="d-grid gap-2">
        <button
          className="btn btn-outline-secondary mt-3"
          onClick={() => history.push("/registration")}
        >
          register
        </button>
      </div>
    </>
  );
}

export default LoginForm;
