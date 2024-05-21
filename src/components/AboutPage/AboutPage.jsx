import React from 'react';
import { Container, Row, Col, Image, ListGroup, Badge } from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext } from '../../components/App/ThemeContext';


function AboutPage() {
  const { theme } = useContext(ThemeContext);


  return (
    <>
      <iframe src="https://milkcratechatbot-6419.chipp.ai" height="800px" width="100%" frameborder="0" title="MILKCRATE. Chat Bot"/>
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12}>
          <h2 className="header-tabs text-center">about</h2>
        </Col>
      </Row>

      <Row className="infoPageContainer mt-5">
        <Col xs={12} lg={6} className="infoLogoContainer d-flex justify-content-center align-items-start">
          <Image src={theme === 'light' ? "TheRecord.svg" : "WhiteRecord.svg"} alt="Milkcrate Logo" className="infoLogo" />
        </Col>

        <Col xs={12} lg={6} className="infoTextContainer">
          <div className="infoHeaders mt-3">
            <strong>milkcrate. features</strong>
          </div>
          <ListGroup as="ul">
            <ListGroup.Item>digitizes your record collection</ListGroup.Item>
            <ListGroup.Item>lets you see your friends' collections</ListGroup.Item>
            <ListGroup.Item>keep a log of records you have played</ListGroup.Item>
            <ListGroup.Item>lets you easily search through hundreds of records</ListGroup.Item>
            <ListGroup.Item>and more!</ListGroup.Item>
          </ListGroup>

          <div className="infoHeaders mt-3">
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
    </>
  );
}

export default AboutPage;
