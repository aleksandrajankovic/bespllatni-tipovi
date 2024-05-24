import { useDispatch, useSelector } from "react-redux";
import { likeTip, dislikeTip } from "../redux/features/tipSlice";
import { MDBBtn } from "mdb-react-ui-kit";

const useTipActions = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLike = (tipId) => {
    dispatch(likeTip({ id: tipId }));
  };

  const handleDislike = (tipId) => {
    dispatch(dislikeTip({ id: tipId }));
  };

  const likeButton = (likeCount, tipId) => (
    <div>
      {!user && (
        <p className="flex likeCount">
          <img src="/Like.svg" alt="" /> {likeCount}
        </p>
      )}
      {user?.result?.role === "admin" && (
        <p className="flex likeCount">
          <img src="/Like.svg" alt="" /> {likeCount}
        </p>
      )}
      {user?.result?.role === "user" && (
        <div className="flex">
          <MDBBtn
            onClick={() => handleLike(tipId)}
            style={{
              background: "transparent",
              boxShadow: "none",
              padding: "0px",
            }}
          >
            <img src="/Like.svg" alt="" />{" "}
          </MDBBtn>
          <p className="likeCount">{likeCount}</p>
        </div>
      )}
    </div>
  );

  const dislikeButton = (dislikeCount, tipId) => (
    <div>
      {!user && (
        <p className="flex likeCount">
          <img src="/dislike.svg" alt="" /> {dislikeCount}
        </p>
      )}
      {user?.result?.role === "admin" && (
        <p className="flex likeCount">
          <img src="/dislike.svg" alt="" /> {dislikeCount}
        </p>
      )}
      {user?.result?.role === "user" && (
        <div className="flex">
          <MDBBtn
            onClick={() => handleDislike(tipId)}
            style={{
              background: "transparent",
              boxShadow: "none",
              padding: "0px",
            }}
          >
            <img src="/dislike.svg" alt="" />{" "}
          </MDBBtn>
          <p className="likeCount">{dislikeCount}</p>
        </div>
      )}
    </div>
  );

  return { handleLike, handleDislike, likeButton, dislikeButton };
};

export default useTipActions;
