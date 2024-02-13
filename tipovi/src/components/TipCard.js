import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import TipModal from "./TipModal";
import useCountdownTimer from "../utilis/CountdownTimer";
import useTipActions from "../utilis/tipActions";
import moment from "moment";
import {
  getTips,
  deleteTip,
  markTipAsSuccess,
  markTipAsFailed,
} from "../redux/features/tipSlice";
import { toast } from "react-toastify";
import Popup from "../utilis/updateDelete";
import { Link } from "react-router-dom";

const TipCard = ({
  description,
  league,
  country,
  sport,
  rival1,
  rival2,
  scoreRival1,
  scoreRival2,
  tipsAndQuotes,
  tipsAndQuotesLink,
  tipDate,
  _id,
  likeCount,
  dislikeCount,
  createdAt,
  handleAddComment,
  localComments,
  handleDeleteComment,
  comment,
  setComment,
  createdAtComment,
  success,
  failed,
}) => {
  const [currentDate] = useState(new Date());
  const tipDateObj = new Date(tipDate);
  const isActive = currentDate < tipDateObj;
  const { user } = useSelector((state) => ({ ...state.auth }));
  const timeRemaining = useCountdownTimer(tipDate);
  const { likeButton, dislikeButton } = useTipActions();

  const shortDescription = description.slice(0, 120);
  const openModal = () => setCentredModal(true);
  const closeModal = () => setCentredModal(false);
  const [centredModal, setCentredModal] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTips());
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tip ?")) {
      dispatch(deleteTip({ id, toast }));
    }
  };

  const [isSuccess, setIsSuccess] = useState(
    localStorage.getItem(`success_${_id}`) === "true" ? true : success
  );
  const [isFailed, setIsFailed] = useState(
    localStorage.getItem(`failed_${_id}`) === "true" ? true : failed
  );

  const handleSuccessChange = async () => {
    try {
      await dispatch(markTipAsSuccess(_id));
      setIsSuccess(!isSuccess);

      localStorage.setItem(`success_${_id}`, !isSuccess);
      setIsFailed(false);

      localStorage.removeItem(`failed_${_id}`);
    } catch (error) {
      console.error("Failed to mark tip as success:", error);
    }
  };

  const handleFailedChange = async () => {
    try {
      await dispatch(markTipAsFailed(_id));
      setIsFailed(!isFailed);

      localStorage.setItem(`failed_${_id}`, !isFailed);
      setIsSuccess(false);

      localStorage.removeItem(`success_${_id}`);
    } catch (error) {
      console.error("Failed to mark tip as failed:", error);
    }
  };

  return (
    <MDBCard alignment="center" className="homeCard">
      <MDBCardHeader>
        <div>
          {isActive ? (
            <span className="greenLabel">Aktivan</span>
          ) : (
            <span className="redLabel">Istekao</span>
          )}
        </div>

        <div>
          {user?.result?.role === "admin" && (
            <img src="/dots-vertical.png" alt="Options" onClick={togglePopup} />
          )}
        </div>
      </MDBCardHeader>
      <MDBCardHeader className="flex-spaceB">
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
            {" "}
            {timeRemaining
              ? `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`
              : "Utakmica je završena"}
          </p>
        </div>
        {user?.result?.role === "admin" && (
          <div style={{ position: "relative" }}>
            {isPopupOpen && (
              <div
                style={{
                  position: "absolute",
                  right: "50%",
                  zIndex: 999,
                  bottom: "-70px",
                }}
              >
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
      </MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>
          <span>
            {" "}
            {sport} - {country} - {league}
          </span>
        </MDBCardTitle>
        <div className="box">
          <div className="flex-spaceB">
            <MDBCardText>{rival1}</MDBCardText>
            <MDBCardText>{scoreRival1}</MDBCardText>
          </div>
          <div className="flex-spaceB">
            <MDBCardText>{rival2}</MDBCardText>
            <MDBCardText>{scoreRival2}</MDBCardText>
          </div>
        </div>
        <div className="decription">
          <p>{shortDescription}</p>
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
          {!isActive && user?.result?.role === "admin" && (
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={isSuccess}
                  onChange={handleSuccessChange}
                />
                Dobitno
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={isFailed}
                  onChange={handleFailedChange}
                />
                Gubitno
              </label>
            </div>
          )}

          {!isActive && user?.result?.role !== "admin" && (
            <div>
              {(isSuccess || isFailed) && (
                <div>
                  {isSuccess && <img src="/CheckCircle.png" alt="success" />}
                  {isFailed && <img src="/XCircle.png" alt="failed" />}
                </div>
              )}
            </div>
          )}
        </div>
        <TipModal
          isActive={isActive}
          tipDate={tipDate}
          timeRemaining={timeRemaining}
          sport={sport}
          country={country}
          league={league}
          rival1={rival1}
          rival2={rival2}
          tipsAndQuotes={tipsAndQuotes}
          tipsAndQuotesLink={tipsAndQuotesLink}
          description={description}
          localComments={localComments}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
          comment={comment}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
          closeModal={closeModal}
          centredModal={centredModal}
          user={user}
          setComment={setComment}
          createdAtComment={createdAtComment}
          isSuccess={isSuccess}
          isFailed={isFailed}
          _id={_id}
        />
      </MDBCardBody>
      <MDBCardFooter className="flex-spaceB">
        <div className="flex space-1">
          <div>{likeButton(likeCount, _id)}</div>
          <div>{dislikeButton(dislikeCount, _id)}</div>
        </div>
        <button onClick={openModal} className="btn-style">
          Detaljnije
        </button>
      </MDBCardFooter>
    </MDBCard>
  );
};

export default TipCard;
