import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";
import Carousel from "react-bootstrap/Carousel";

function SingleSpin(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [fadeEffect, setFadeEffect] = useState(true);


  const spins = useSelector((store) => store.spinsReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_SINGLE_SPIN", payload: id });
    const checkFade = () => {
      setFadeEffect(window.innerWidth >= 768);
    };

    checkFade();
    window.addEventListener('resize', checkFade); 

    return () => {
      window.removeEventListener('resize', checkFade); 
    };
  }, [dispatch, id]);

  function deleteSpin() {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the spin. You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion, proceed with the delete operation
        dispatch({
          type: "DELETE_SPIN",
          payload: id,
        });
        history.push(`/spins`); // Redirects user back to the spins page

        // Show deletion success message
        Swal.fire("Deleted!", "Your spin has been deleted.", "success");
      }
      // If result.isConfirmed is false, user canceled, do nothing
    });
  }

  const spinExists = spins && spins.length > 0;
  const formattedDate = spinExists
    ? dayjs(spins[0].listened_at).format("MM/DD/YYYY")
    : "";
  const takeOffSeconds = spinExists
    ? spins[0].time_spent.split(":")
    : ["00", "00"];
  const formattedTime = `${takeOffSeconds[0]}:${takeOffSeconds[1]}`;

  return (
    <div>
      <h2 className="header-tabs">spin details</h2>
      <div class="d-grid gap-2 d-md-flex justify-content-center mt-3">
      <button
          className="btn btn-outline-primary"
          onClick={() => history.push( `/spins` )}
          id="addRecordBtn"
          style={{ width: '400px' }}
          
        >
          Back
        </button>
      </div>
      {spinExists ? (
        <>
          <div className="spinDetailsContainer">
            <div className="spinCarouselContainer">
              <Carousel
                interval={1500}
                fade={fadeEffect}
                controls={false}
                indicators={false}
              >
                {spins.map((spin, i) => (
                  <Carousel.Item>
                    <img className="spinCoverArt" src={spin.coverart} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div className="spinTextContainer">
              <p>
                <strong> LISTENED on: </strong>
                {formattedDate}
              </p>
              <p>
                <strong> LENGTH of SPIN:</strong> {formattedTime}
              </p>
              <p>
                <strong> DETAILS:</strong> {spins[0].spin_details}
              </p>
              <p>
                <strong> ALBUMS:</strong>
              </p>
              <ul>
                {spins.map((spin, i) => (
                  <li className="spinsListItem" key={i}>
                    <p>
                      <em>{spin.title}</em> by {spin.artist}
                    </p>
                  </li>
                ))}
              </ul>
              <hr />
              <div class="d-grid gap-2">
                <button
                  onClick={() => deleteSpin()}
                  className="btn btn-outline-danger"
                >
                  delete spin
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading spin details...</p>
      )}
    </div>
  );
}

export default SingleSpin;
