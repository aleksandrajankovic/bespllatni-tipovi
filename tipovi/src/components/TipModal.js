import React from "react";
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
import TipComments from "./TipComments";
import moment from "moment";
import useTipActions from "../utilis/tipActions";

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

  const handleModalClick = (event) => {
    if (event.target.classList.contains("flex-i")) {
      closeModal();
    }
  };

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
                <img src="/dots-vertical.png" alt="" />
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
                <div className="col-md-12 links flex-start">
                  <p>
                    {" "}
                    Naš tip:{" "}
                    <span>
                      {tipsAndQuotesLink ? (
                        <a
                          href={tipsAndQuotesLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tipsAndQuotes}
                        </a>
                      ) : (
                        { tipsAndQuotes }
                      )}
                    </span>
                  </p>
                  {!isActive && user?.result?.role !== "admin" && (
                    <div className="success-box">
                      {(isSuccess || isFailed) && (
                        <div>
                          {isSuccess && (
                            <img src="/CheckCircle.png" alt="success" />
                          )}
                          {isFailed && <img src="/XCircle.png" alt="failed" />}
                        </div>
                      )}
                    </div>
                  )}
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
