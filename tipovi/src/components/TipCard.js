import React, { useState } from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { likeTip } from "../redux/features/tipSlice";
import TipModal from "./TipModal";
import moment from "moment";

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
  createdAt,
  handleAddComment,
  localComments,
  handleDeleteComment,
  comment,
  setComment,
}) => {
  const [currentDate] = useState(new Date());
  const tipDateObj = new Date(tipDate);
  const isActive = currentDate < tipDateObj;
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state.auth }));

  const handleLike = () => {
    dispatch(likeTip({ id: _id }));
  };

  const shortDescription = description.slice(0, 120);

  const openModal = () => setCentredModal(true);
  const closeModal = () => setCentredModal(false);
  const [centredModal, setCentredModal] = useState(false);
  return (
    <MDBCard alignment="center" className="homeCard">
      <MDBCardHeader>
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
      </MDBCardHeader>
      <MDBCardHeader className="flex-start">
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
            {` ${moment(createdAt).format("HH:mm")}`}
          </p>
        </div>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>
          <span>
            {" "}
            {sport} - {country} -{league}
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
        <div className="col-md-12 links">
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
        </div>
        <TipModal
          isActive={isActive}
          tipDate={tipDate}
          createdAt={createdAt}
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
          handleLike={handleLike}
          closeModal={closeModal}
          centredModal={centredModal}
          user={user}
          setComment={setComment}
          _id={_id}
        />
      </MDBCardBody>
      <MDBCardFooter className="flex-spaceB">
        <div>
          {!user && (
            <p className="flex">
              <img src="/thumbs-up.png" alt="" /> {likeCount}
            </p>
          )}
          {user?.result?.role === "admin" && (
            <p className="flex">
              <img src="/thumbs-up.png" alt="" /> {likeCount}
            </p>
          )}
          {user?.result?.role === "user" && (
            <div className="flex">
              <MDBBtn
                onClick={handleLike}
                style={{
                  background: "transparent",
                  boxShadow: "none",
                  padding: "0px",
                }}
              >
                <img src="/thumbs-up.png" alt="" />{" "}
              </MDBBtn>
              <p>{likeCount}</p>
            </div>
          )}
        </div>
        <button onClick={openModal} className="btn-style">
          Read more
        </button>
      </MDBCardFooter>
    </MDBCard>
  );
};

export default TipCard;
