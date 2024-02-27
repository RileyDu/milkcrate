import React from "react";

function InfoPage() {
  return (
    <div>
      <h2 className="header-tabs">Info</h2>

      <div className="infoPageContainer">
        <div className="infoLogoContainer">
          <img
            src="milkcrateLogo.svg"
            alt="Milkcrate Logo"
            className="infoLogo"
          />
        </div>

        <div className="infoTextContainer">
          <div className="infoHeaders">
            <strong>How to use:</strong>
          </div>
          <ol>
            <li>Log in or register.</li>
            <li>Add records to your milkcrate.</li>
            <li>Add friends to see their milkcrate.</li>
            <li>Create spin sessions to log what you've been listening to.</li>
          </ol>

          <div className="infoHeaders">
            <strong>Feature request or bug:</strong>
          </div>
          <div>
            We value your feedback! If you have any feature requests, encounter
            bugs, or need assistance, please don't hesitate to reach out. You
            can submit your requests or report issues through GitHub. Your input
            helps us improve and tailor Milkcrate to better serve you, the user.
          </div>

          <div className="infoHeaders">
            <strong>Socials:</strong>
          </div>
          <div>
          <a href="https://github.com/RileyDu/milkcrate">
          <span id="infoPills" className="badge rounded-pill bg-primary infoPills">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/rileydu">
          <span id="infoPills" className="badge rounded-pill bg-primary infoPills">LinkedIn</span>
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
