import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import Modal from "./MilkmanModal";

function Footer() {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <footer className="footer">
      <div className="container">
        <nav aria-label="Footer navigation">
          <Link
            className="badge rounded-pill bg-primary me-2"
            to="/info"
            aria-label="Information Page"
          >
            Info
          </Link>
          <span>&copy; MILKCRATE. (v1.3.1)</span>
          <Link
            className="badge rounded-pill bg-primary ms-2"
            to="/about"
            aria-label="About Page"
          >
            About
          </Link>
          <br />
          <Link
            className="badge rounded-pill bg-primary ms-2 mt-3"
            to="#"
            aria-label="Show modal"
            onClick={handleShowModal}
          >
            ✨🥛 THE MILKMAN 🥛✨
          </Link>
        </nav>
      </div>
      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <iframe
          src="https://milkcratechatbot-6419.chipp.ai"
          height="800px"
          width="100%"
          frameBorder="0"
          title="MILKCRATE Chat Bot"
        />
      </Modal>
    </footer>
  );
}

export default Footer;
