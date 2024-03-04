import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Row, Col } from "react-bootstrap";

function SpinSessions(props) {
  const dispatch = useDispatch();
  const spins = useSelector((store) => store.spinsReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_SPINS" });
  }, [dispatch]);

  const history = useHistory();
  return (
    <div>
      <h2 className="header-tabs">spins</h2>
      {spins?.length > 0 && (
        <div className="spinPageContainer">
          <Row xs={1} sm={2} md={3} className="g-6">
            {spins.map((spin, i) => {
              const formattedDate = spin.listened_at
                ? dayjs(spin.listened_at).format("MM/DD/YYYY")
                : "Unknown date";
              return (
                <Col key={i}>
                  <img
                    className="record-clipart mx-auto d-block"
                    src="TheRecord.svg"
                    onClick={() => history.push(`/spins/details/${spin.id}`)}
                  />
                  <p className="spinPageText">{formattedDate}</p>
                  <p className="spinDetailsText">{spin.spin_details}</p>
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </div>
  );
}

export default SpinSessions;
