import React from 'react';
import { Container, Row, Col, Image, ListGroup, Badge } from 'react-bootstrap';

function InfoPage() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={12}>
          <h2 className="header-tabs text-center">Info</h2>
        </Col>
      </Row>

      <Row className="infoPageContainer">
        <Col md={6} className="infoLogoContainer d-flex justify-content-center align-items-start">
          <Image src="milkcrateLogo.svg" alt="Milkcrate Logo" className="infoLogo" />
        </Col>

        <Col md={6} className="infoTextContainer">
          <div className="infoHeaders mt-3">
            <strong>How to use:</strong>
          </div>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">Log in or register.</ListGroup.Item>
            <ListGroup.Item as="li">Add records to your milkcrate.</ListGroup.Item>
            <ListGroup.Item as="li">Add friends to see their milkcrate.</ListGroup.Item>
            <ListGroup.Item as="li">Create spin sessions to log what you've been listening to.</ListGroup.Item>
          </ListGroup>

          <div className="infoHeaders mt-3">
            <strong>Feature request or bug:</strong>
          </div>
          <div>
            We value your feedback! If you have any feature requests, encounter
            bugs, or need assistance, please don't hesitate to reach out. You
            can submit your requests or report issues through GitHub. Your input
            helps us improve and tailor Milkcrate to better serve you, the user.
          </div>

          <div className="infoHeaders mt-3">
            <strong>Socials:</strong>
          </div>
          <div>
            <a href="https://github.com/RileyDu/milkcrate">
              <Badge bg="primary" className="infoPills">GitHub</Badge>
            </a>
            {' '}
            <a href="https://www.linkedin.com/in/rileydu">
              <Badge bg="primary" className="infoPills">LinkedIn</Badge>
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default InfoPage;