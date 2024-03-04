import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome to milkcrate.");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", paddingTop: "1em" }}>{heading}</h1>

      <div className="landingContainer">
        <div className="landingLogoContainer">
          <img className="record-clipart" src="milkcrateLogo.svg" />
        </div>
        <div className="landingLoginContainer">
          <LoginForm />
        </div>
      </div>

      {/* <div className="grid">
        <div className="grid-col grid-col_6">
          <p>
            test
          </p>

          <p>
            test
          </p>

          <p>
            test
          </p>
        </div>
        <div className="grid-col grid-col_6">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div> */}
    </div>
  );
}

export default LandingPage;
