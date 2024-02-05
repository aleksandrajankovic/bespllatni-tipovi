import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBCardTitle,
  MDBModalBody,
  MDBCardHeader,
  MDBModalFooter,
  MDBCardText,
} from "mdb-react-ui-kit";
import TipComments from "./TipComments";
import moment from "moment";

const TipModal = ({
  isActive,
  tipDate,
  createdAt,
  sport,
  country,
  league,
  rival1,
  rival2,
  tipsAndQuotes,
  tipsAndQuotesLink,
  description,
  likeCount,
  handleLike,
  closeModal,
  centredModal,
  user,
  _id,
}) => (
  <MDBModal tabIndex="-1" show={centredModal} onHide={closeModal}>
    <MDBModalDialog centered>
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
        <MDBModalBody>
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
          <p className="decription">{description}</p>
          <TipComments tipId={_id} />
        </MDBModalBody>
        <MDBModalFooter className="flex-spaceB">
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
          <button onClick={closeModal} className="btn-style">
            Close
          </button>
        </MDBModalFooter>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
);

export default TipModal;
