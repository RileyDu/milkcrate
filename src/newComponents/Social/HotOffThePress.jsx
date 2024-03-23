import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import "./HOTP.css";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function HotOffThePress(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const records = useSelector((store) => store.hotpReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_HOTP" });
  }, [dispatch]);

  return (
    <>
      <h2 className="header-tabs">hot off the press</h2>
      <div class="d-grid gap-2 d-md-flex justify-content-center mb-3">
      <button
            className="btn btn-outline-primary"
            onClick={() => history.push("/social")}
            id="addRecordBtn"
            style={{ width: '400px' }}
          >
            Back to social
          </button>
          </div>
      <p style={{ marginBottom: "1em", textAlign: "center" }}>
        what your friends have picked up lately
      </p>

      <div className="HOTPContainer">
        {records.length > 0 ? (
          <div className="container-gallery">
            <Row xs={1} sm={3} md={6} className="g-0">
              {records.map((record, i) => {
                const formattedDate = record.date_added
                  ? dayjs(record.date_added).format("M/DD/YY")
                  : "Unknown date";
                return (
                  <Col key={i}>
                    <div className="flip-card" tabIndex="0">
                      <div className="flip-card-inner">
                        <div className="flip-card-front">
                          <img
                            src={record.coverart}
                            alt={record.title}
                            className="HOTPImg"
                          />
                        </div>
                        <div
                          className="flip-card-back"
                          style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${record.coverart})`,
                          }}
                        >
                          <h1 style={{ color: "white", paddingTop: "2em" }}>
                            {record.title}
                          </h1>
                          <p>
                            <em>{record.artist}</em>
                          </p>
                          <p>{record.username}'s milkcrate</p>
                          <p>added {formattedDate}</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default HotOffThePress;
