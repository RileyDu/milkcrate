import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Row, Col } from "react-bootstrap";
import { ThemeContext } from "../../components/App/ThemeContext";


function SpinSessions(props) {
  const dispatch = useDispatch();
  const spins = useSelector((store) => store.spinsReducer);
  const { theme } = useContext(ThemeContext);


  useEffect(() => {
    dispatch({ type: "FETCH_SPINS" });
  }, [dispatch]);

  const history = useHistory();
  return (
    <div>
      <h2 className="header-tabs">spins</h2>
      <div class="d-grid gap-2 d-md-flex justify-content-center mt-4">
      <button
            className="btn btn-outline-primary"
            onClick={() => history.push("/spins/add")}
            id="addRecordBtn"
            style={{ width: '400px' }}
          >
            Add Spin
          </button>
          </div>
      {spins?.length > 0 && (
        <div className="spinPageContainer">
          <Row xs={1} sm={2} md={3} className="g-0">
            {spins.map((spin, i) => {
              const formattedDate = spin.listened_at
                ? dayjs(spin.listened_at).format("MM/DD/YYYY")
                : "Unknown date";
              return (
                <Col key={i}>
                  <img
                    className="social-crate mx-auto d-block"
                    src={theme === 'light' ? "TheRecord.svg" : "WhiteRecord.svg"}
                    onClick={() => history.push(`/spins/details/${spin.id}`)}
                  />
                  <div className="spinPageText">{formattedDate}</div>
                  <div className="spinDetailsText">{spin.spin_details}</div>
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
