import React, { useState, useEffect, useRef } from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import TipStatus from "../utilis/TipStatus";
import TipStatusInfo from "../utilis/tipStatusInfo";
import { useSelector, useDispatch } from "react-redux";
import TipModal from "./TipModal";
import useCountdownTimer from "../utilis/CountdownTimer";
import useTipActions from "../utilis/tipActions";
import moment from "moment";
import { getTips, deleteTip } from "../redux/features/tipSlice";
import { toast } from "react-toastify";
import Popup from "../utilis/updateDelete";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTips());
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDelete = (id) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete tip ?")) {
      dispatch(deleteTip({ id, toast }));
    }
  };

  const [isSuccess, setIsSuccess] = useState(
    localStorage.getItem(`success_${_id}`) === "true" ? true : success
  );
  const [isFailed, setIsFailed] = useState(
    localStorage.getItem(`failed_${_id}`) === "true" ? true : failed
  );

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
      <MDBCardHeader className="flex-spaceB box-position">
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
                  {!isActive && user?.result?.role === "admin" && (
                    <TipStatus
                      isSuccess={isSuccess}
                      isFailed={isFailed}
                      _id={_id}
                      setIsSuccess={setIsSuccess}
                      setIsFailed={setIsFailed}
                    />
                  )}
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
              <div>
                <TipStatusInfo isSuccess={isSuccess} isFailed={isFailed} />
              </div>
            )}
          </div>
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
