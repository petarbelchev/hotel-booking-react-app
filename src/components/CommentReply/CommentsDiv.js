import { useState, useContext, useEffect } from "react";

import { Comment } from "./Comment";
import { TextArea } from "../TextArea";
import { PrimaryButton } from "../Buttons/PrimaryButton";

import { useComments } from "../../hooks/useComments";
import { useForm } from "../../hooks/useForm";

import { setCommentRating, setReplyRating } from "../../services/ratingsService";
import { AuthContext } from "../../contexts/AuthContext";

export function CommentsDiv({
    hotelId,
    commentsCount,
    increaseCommentsCountHandler,
    decreaseCommentsCountHandler,
}) {
    const [showAddCommentBtn, setShowAddCommentBtn] = useState(true);
    const [showCommentsBtn, setShowCommentsBtn] = useState(false);

    const { user } = useContext(AuthContext);
    const commentForm = useForm({ content: '' });

    const {
        comments,
        loadComments,
        loadReplies,
        sendComment,
        deleteComment,
        setCommentRatings,
        setReplyRatings,
        sendReply,
        deleteReply,
    } = useComments(hotelId);

    useEffect(() => {
        setShowCommentsBtn(
            commentsCount > 0 && commentsCount > comments.length
                ? true
                : false
        );
    }, [commentsCount, comments.length]);

    const addCommentClickHandler = () => setShowAddCommentBtn(false);

    const commentsClickHandler = () => {
        loadComments(hotelId, user?.token);
        setShowCommentsBtn(false);
    };

    const repliesClickHandler = async (commendId) => {
        await loadReplies(commendId, user?.token);
    };

    const sendCommentSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            await sendComment(hotelId, commentForm.form, user.token);
            commentForm.setForm({ content: '' });
            increaseCommentsCountHandler();
            setShowAddCommentBtn(true);
        } catch (error) {
            // TODO: Render validation errors.
            alert(`${error.status} ${error.title}`);
        }
    };

    const sendReplySubmitHandler = async (commentId, reply) => {
        await sendReply(commentId, reply, user.token);
    };

    const deleteCommentClickHandler = async (commentId) => {
        await deleteComment(commentId, user.token);
        decreaseCommentsCountHandler();
    };

    const deleteReplyClickHandler = async (replyId, commentId) => {
        await deleteReply(replyId, commentId, user.token);
    };

    const commentRatingClickHandler = async (commentId, ratingValue) => {
        try {
            const response = await setCommentRating(commentId, ratingValue, user.token);
            setCommentRatings(commentId, response);
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    const replyRatingClickHandler = async (commentId, replyId, ratingValue) => {
        try {
            const response = await setReplyRating(replyId, ratingValue, user.token);
            setReplyRatings(commentId, replyId, response);
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    return (
        <div>
            {comments.length > 0 &&
                <div>
                    <h3>Comments:</h3>

                    {comments.map(comment =>
                        <Comment
                            key={comment.id}
                            comment={comment}
                            onSendReplySubmitHandler={sendReplySubmitHandler}
                            onRepliesClickHandler={repliesClickHandler}
                            onDeleteCommentClickHandler={deleteCommentClickHandler}
                            onDeleteReplyClickHandler={deleteReplyClickHandler}
                            onCommentRatingClickHandler={commentRatingClickHandler}
                            onReplyRatingClickHandler={replyRatingClickHandler}
                            userId={user?.id}
                        />
                    )}
                </div>
            }

            <div>
                {showAddCommentBtn && user &&
                    <PrimaryButton
                        onClick={addCommentClickHandler}
                        name="Add Comment"
                    />
                }

                {showCommentsBtn &&
                    <PrimaryButton
                        onClick={commentsClickHandler}
                        name="Comments"
                    />
                }

                <span>{commentsCount} comments</span>
            </div>

            {!showAddCommentBtn &&
                <form onSubmit={sendCommentSubmitHandler}>
                    <div>
                        <TextArea
                            placeHolder="Write your comment here..."
                            paramName="content"
                            value={commentForm.form.content}
                            onChange={commentForm.formChangeHandler}
                            rows="5"
                            cols="50"
                            required={true}
                        />
                    </div>
                    
                    <PrimaryButton type="submit" name="Send Comment" />
                </form>
            }
        </div>
    );
};