import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import dayjs from "dayjs";
import "./HOTP.css";

function RecentlySpun(props) {
  const dispatch = useDispatch();
  const records = useSelector((store) => store.latestListensReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_LATEST_LISTENS" });
  }, [dispatch]);

  return (
    <div>
      <h2 className="header-tabs">latest listens</h2>
      <p style={{ marginBottom: "1em", textAlign: "center" }}>
        what your friends have been listening to
      </p>
      <div className="HOTPContainer">
        {records.length > 0 ? (
          <div className="container-gallery">
            <Row xs={1} sm={3} md={6} className="g-0">
              {records.map((record, i) => {
                const formattedDate = record.listened_at
                  ? dayjs(record.listened_at).format("M/DD/YY")
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
                          <p>
                            {record.friend_username} spun on {formattedDate}
                          </p>
                          <p>{record.spin_details}</p>
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
    </div>
  );
}

export default RecentlySpun;
