import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentToTip,
  getComments,
  deleteComment,
} from "../redux/features/tipSlice";

const TipComments = ({ tipId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [comment, setComment] = useState("");
  const [localComments, setLocalComments] = useState([]);
  const { comments } = useSelector((state) => state.tip);

  useEffect(() => {
    dispatch(getComments(tipId));
  }, [dispatch, tipId]);

  useEffect(() => {
    setLocalComments(comments[tipId] || []);
  }, [comments, tipId]);

  const handleAddComment = async () => {
    await dispatch(
      addCommentToTip({
        id: tipId,
        commentData: { text: comment, user: user?.result?.name },
      })
    );
    setComment("");
    setLocalComments([
      ...localComments,
      { text: comment, user: user?.result?.name },
    ]);
  };

  const handleDeleteComment = async (commentId) => {
    console.log("Deleting comment with ID:", commentId);

    try {
      await dispatch(deleteComment({ tipId, commentId }));
      console.log("Comment deleted successfully.");
      setLocalComments(
        localComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comments-section">
      <h5>Comments</h5>
      {localComments.map((comment, index) => (
        <div key={index} className="comment">
          <p>{comment.text}</p>
          <small>By {comment.user}</small>
          {user?.result?.role === "admin" && (
            <button onClick={() => handleDeleteComment(comment._id)}>
              Delete
            </button>
          )}
        </div>
      ))}
      {user && (
        <>
          <textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </>
      )}
    </div>
  );
};

export default TipComments;
