import React, { useState, useEffect, useRef } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBCardTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCardText,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import TipComments from "./TipComments";
import moment from "moment";
import useTipActions from "../utilis/tipActions";
import Popup from "../utilis/updateDelete";
import { Link } from "react-router-dom";
import TipStatusInfo from "../utilis/tipStatusInfo";
import { getTips, deleteTip } from "../redux/features/tipSlice";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
const TipModal = ({
  isActive,
  tipDate,
  timeRemaining,
  sport,
  country,
  league,
  rival1,
  rival2,
  tipsAndQuotes,
  tipsAndQuotesLink,
  description,
  likeCount,
  dislikeCount,
  closeModal,
  centredModal,
  user,
  _id,
  isSuccess,
  isFailed,
}) => {
  const { likeButton, dislikeButton } = useTipActions();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const handleModalClick = (event) => {
    if (event.target.classList.contains("flex-i")) {
      closeModal();
    }
  };
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const handleDelete = (id) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete tip ?")) {
      dispatch(deleteTip({ id, toast }));
    }
  };

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);
  return (
    <MDBModal tabIndex="-1" show={centredModal} onHide={closeModal}>
      <div className="flex-i" onClick={handleModalClick}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader className="flex-spaceB">
              <div>
                {isActive ? (
                  <span className="greenLabel">Active</span>
                ) : (
                  <span className="redLabel">Expired</span>
                )}
              </div>
              <div>
                <img src="/dots-vertical.png" alt="" onClick={togglePopup} />
              </div>
            </MDBModalHeader>

            <MDBModalBody>
              <div className="bigmodal-container">
                <MDBCardTitle className="flex-start mb-3">
                  <div className="flex">
                    <img src="/calendar.png" alt="" />{" "}
                    <p className="time-text">
                      {" "}
                      {` ${moment(tipDate).format("DD.MM.YYYY")}`}
                    </p>
                  </div>
                  <div className="flex">
                    <img src="/icon.png" alt="" />{" "}
                    <p className="time-text">
                      {timeRemaining
                        ? `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m`
                        : "Utakmica je završena"}
                    </p>
                  </div>
                  {user?.result?.role === "admin" && (
                    <div className="popup-position">
                      {isPopupOpen && (
                        <div ref={popupRef}>
                          <Popup>
                            <div className="flex popup-text">
                              <img src="/user-01.png" alt="" />
                              <a href="#" onClick={() => handleDelete(_id)}>
                                Izbriši
                              </a>
                            </div>
                            <div className="flex popup-text">
                              <img src="/settings-01.png" alt="" />
                              <Link to={`/editTip/${_id}`}> Ažuriraj</Link>
                            </div>
                          </Popup>
                        </div>
                      )}
                    </div>
                  )}
                </MDBCardTitle>
                <MDBCardTitle>
                  <span>
                    {" "}
                    {sport} - {country} -{league}
                  </span>
                </MDBCardTitle>
                <div className="box">
                  <div className="flex-spaceB">
                    <MDBCardText>{rival1}</MDBCardText>
                  </div>
                  <div className="flex-spaceB">
                    <MDBCardText>{rival2}</MDBCardText>
                  </div>
                </div>
                <div className="col-md-12 links flex-start mb-2">
                  <p>
                    {" "}
                    Naš tip:{" "}
                    <span>
                      {tipsAndQuotesLink ? (
                        <a
                          href={tipsAndQuotesLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="my-anchor-element-class"
                        >
                          {tipsAndQuotes}
                        </a>
                      ) : (
                        { tipsAndQuotes }
                      )}
                    </span>
                    <Tooltip
                      anchorSelect=".my-anchor-element-class"
                      content="Posetite meridianbet.rs"
                    />
                  </p>
                  <div>
                    {!isActive && (
                      <div className="flex">
                        <TipStatusInfo
                          isSuccess={isSuccess}
                          isFailed={isFailed}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <p className="decription">{description}</p>
              </div>
            </MDBModalBody>
            <MDBModalFooter className="flex-spaceB">
              <div className="flex space-1 p-8">
                <div>{likeButton(likeCount, _id)}</div>
                <div>{dislikeButton(dislikeCount, _id)}</div>
              </div>
              <button onClick={closeModal} className="btn-style">
                Close
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>

        <TipComments tipId={_id} />
      </div>
    </MDBModal>
  );
};

export default TipModal;
