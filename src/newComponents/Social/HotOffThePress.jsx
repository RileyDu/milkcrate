import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import "./HOTP.css";
import { Row, Col } from "react-bootstrap";

function HotOffThePress(props) {
  const dispatch = useDispatch();
  const records = useSelector((store) => store.hotpReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_HOTP" });
  }, [dispatch]);

  return (
    <>
      <h2 className="header-tabs" style={{ marginBottom: "1em" }}>hot off the press</h2>
      <div className="HOTPContainer">
        {records.length > 0 ? (
          <div className="container-gallery">
                      <Row xs={1} sm={3} md={6} className="g-4">

            {records.map((record, i) => {
              const formattedDate = record.date_added
                ? dayjs(record.date_added).format("M/DD/YYYY")
                : "Unknown date";
              return (
                    <Col key={i}>
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <img
                        src={record.coverart}
                        alt={record.title}
                        className="HOTPImg"
                        />
                    </div>
                    <div class="flip-card-back">
                      <h1 style={{ color: "white", paddingTop: "1em" }}>{record.title}</h1>
                      <p>{record.artist}</p>
                      <p>{record.username}</p>
                      <p>{formattedDate}</p>
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
