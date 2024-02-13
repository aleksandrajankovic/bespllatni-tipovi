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
            onClick={() => handleLike(tipId)}
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
  );

  const dislikeButton = (dislikeCount, tipId) => (
    <div>
      {!user && (
        <p className="flex">
          <img src="/dislike.png" alt="" /> {dislikeCount}
        </p>
      )}
      {user?.result?.role === "admin" && (
        <p className="flex">
          <img src="/dislike.png" alt="" /> {dislikeCount}
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
            <img src="/dislike.png" alt="" />{" "}
          </MDBBtn>
          <p>{dislikeCount}</p>
        </div>
      )}
    </div>
  );

  return { handleLike, handleDislike, likeButton, dislikeButton };
};

export default useTipActions;
