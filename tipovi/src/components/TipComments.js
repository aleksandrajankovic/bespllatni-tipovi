import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentToTip,
  getComments,
  deleteComment,
} from "../redux/features/tipSlice";
import {
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/sr";

const TipComments = ({ tipId, createdAtComment }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [comment, setComment] = useState("");
  const [localComments, setLocalComments] = useState([]);
  const { comments } = useSelector((state) => state.tip);
  const [expandedComments, setExpandedComments] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedComments, setSelectedComments] = useState([]);
  moment.locale("sr");
  useEffect(() => {
    dispatch(getComments(tipId));
  }, [dispatch, tipId]);

  useEffect(() => {
    setLocalComments(comments[tipId] ? [...comments[tipId]] : []);
  }, [comments, tipId]);

  const handleAddComment = async () => {
    const now = moment();
    await dispatch(
      addCommentToTip({
        id: tipId,
        commentData: { text: comment, user: user?.result?.name },
      })
    );
    setComment("");
    setLocalComments([
      {
        _id: Math.random().toString(),
        text: comment,
        user: user?.result?.name,
        createdAt: now,
      },
      ...localComments,
    ]);
  };

  const handleDeleteComment = async () => {
    if (!selectedComments.length) {
      console.error("No comments selected for deletion");
      return;
    }

    console.log("Deleting selected comments:", selectedComments);

    try {
      await Promise.all(
        selectedComments.map((commentId) =>
          dispatch(deleteComment({ tipId, commentId }))
        )
      );
      console.log("Comments deleted successfully.");
      setLocalComments(
        localComments.filter(
          (comment) => !selectedComments.includes(comment._id)
        )
      );
      setSelectedComments([]);
      setSelectMode(false);
    } catch (error) {
      console.error("Error deleting comments:", error);
    }
  };

  const toggleCommentSelection = (commentId) => {
    if (selectedComments.includes(commentId)) {
      setSelectedComments(selectedComments.filter((id) => id !== commentId));
    } else {
      setSelectedComments([...selectedComments, commentId]);
    }
  };

  const handleSelectModeToggle = () => {
    setSelectMode(!selectMode);
    setSelectedComments([]);
  };
  const handleReadMore = (commentId) => {
    if (!expandedComments.includes(commentId)) {
      setExpandedComments([...expandedComments, commentId]);
    } else {
      setExpandedComments(expandedComments.filter((id) => id !== commentId));
    }
  };
  const handleClearSelection = () => {
    setSelectedComments([]);
    setSelectMode(false);
  };

  const [selectAllComments, setSelectAllComments] = useState(false);

  const handleSelectAllCommentsToggle = () => {
    setSelectAllComments(!selectAllComments);
    if (!selectAllComments) {
      setSelectedComments(localComments.map((comment) => comment._id));
    } else {
      setSelectedComments([]);
    }
  };
  const isAtLeastOneCommentSelected = () => {
    return selectedComments.length > 0;
  };
  return (
    <MDBModalDialog className="tipComments">
      <MDBModalContent>
        <MDBModalHeader className="flex-spaceB">
          {!selectMode && <h5 className="comment-delete">Komentari</h5>}
          {user?.result?.role === "admin" && (
            <>
              {selectMode ? (
                <>
                  <MDBBtn
                    className="mx-2 comment-delete"
                    color="tertiary"
                    rippleColor="light"
                    onClick={handleClearSelection}
                  >
                    Otkaži
                  </MDBBtn>
                  <div className="flex-spaceB pe-2">
                    <MDBBtn
                      className="mx-2 comment-delete"
                      color="tertiary"
                      rippleColor="light"
                      onClick={handleDeleteComment}
                    >
                      Izbriši
                    </MDBBtn>
                    <input
                      type="checkbox"
                      checked={selectAllComments}
                      onChange={handleSelectAllCommentsToggle}
                    />
                  </div>
                </>
              ) : (
                <MDBBtn
                  className="mx-2 comment-delete"
                  color="tertiary"
                  rippleColor="light"
                  onClick={handleSelectModeToggle}
                >
                  Opcije
                </MDBBtn>
              )}
            </>
          )}
        </MDBModalHeader>

        <MDBModalBody>
          <div className="comment-container">
            {localComments.map((comment, index) => (
              <div key={index} className="comment">
                <div className="flex-spaceB">
                  <span className="flex">
                    <img src="/UserCircle.svg" alt="avatar" />
                    <small>{comment.user}</small>
                  </span>
                  <p className="time-comment">
                    {moment(comment.createdAtComment).fromNow()}
                  </p>
                </div>
                <div className="comment-box">
                  <p className="comment-text">
                    {comment.text.length > 50
                      ? expandedComments.includes(comment._id)
                        ? comment.text
                        : `${comment.text.substring(0, 50)}...`
                      : comment.text}
                    {comment.text.length > 50 && (
                      <MDBBtn
                        className="mx-2 comment-btn"
                        color="tertiary"
                        rippleColor="light"
                        onClick={() => handleReadMore(comment._id)}
                        style={{ marginLeft: "5px" }}
                      >
                        {expandedComments.includes(comment._id)
                          ? "Manje"
                          : "Više"}
                      </MDBBtn>
                    )}
                  </p>

                  {selectMode && (
                    <input
                      type="checkbox"
                      checked={selectedComments.includes(comment._id)}
                      onChange={() => toggleCommentSelection(comment._id)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </MDBModalBody>

        <MDBModalFooter className="flex-spaceB">
          <input
            className="text-field wd-80"
            placeholder="Dodaj komentar..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!user}
          />
          {user ? (
            <button className="send-btn" onClick={handleAddComment}>
              <img src="/PaperPlaneRight.svg" alt="sendBtn" />
            </button>
          ) : (
            <Link to="/login" className="btn-style disabled-link">
              <p>Uloguj se</p>
            </Link>
          )}
        </MDBModalFooter>
      </MDBModalContent>
    </MDBModalDialog>
  );
};

export default TipComments;
