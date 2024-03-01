import React from "react";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div>
      <h2 className="header-tabs">about</h2>

      <div className="infoPageContainer">
        <div className="infoLogoContainer">
          <img src="TheRecord.svg" alt="Milkcrate Logo" className="infoLogo" />
        </div>

        <div className="infoTextContainer">
          <div className="infoHeaders">
            <strong>milkcrate. features</strong>
          </div>
          <ul>
            <li>digitizes your record collection</li>
            <li>lets you see your friends' collections</li>
            <li>keep a log of records you have played</li>
            <li>lets you easily search through hundreds of records</li>
            <li>and more!</li>
          </ul>

          <div className="infoHeaders">
            <strong>Why milkcrate.</strong>
          </div>
          <div>
            milkcrate. was created out of a personal need to simplify the
            process of managing vinyl collections. It's easy to forget which
            records we own when it comes to purchase another! By digitizing
            physical collections, we eliminate the frustration of losing track
            of owned records and enhance the experience by fostering a community
            around a shared passion for vinyl.
          </div>

          <div className="infoHeaders">
            <strong>Socials:</strong>
          </div>
          <div>
            <a href="https://github.com/RileyDu/milkcrate">
              <span
                id="infoPills"
                className="badge rounded-pill bg-primary infoPills"
              >
                GitHub
              </span>
            </a>
            <a href="https://www.linkedin.com/in/rileydu">
              <span
                id="infoPills"
                className="badge rounded-pill bg-primary infoPills"
              >
                LinkedIn
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
