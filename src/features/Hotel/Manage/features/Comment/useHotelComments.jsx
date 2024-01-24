import { useContext, useState, useEffect } from "react";

import commentsService from "./commentsService";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { CommentsDiv } from "./components/CommentsDiv";
import { CommentDiv } from "./components/CommentDiv";
import { useCommentReplyForm } from "./hooks/useCommentReplyForm";
import { useCommentReplyRating } from "../Rating/useCommentReplyRating";

export function useHotelComments(hotel, setHotel) {
    const [comments, setComments] = useState([]);
    const { user } = useContext(AuthContext);
    const [showCommentsBtn, setShowCommentsBtn] = useState(false);
    const { commentRatingClickHandler, replyRatingClickHandler } = useCommentReplyRating(setComments);

    useEffect(() => {
        setShowCommentsBtn(hotel.commentsCount > 0 && hotel.commentsCount > comments.length ? true : false);
    }, [hotel.commentsCount, comments.length]);

    const onSubmitCommentHandler = async (commentFormData) => {
        const commentResponse = await commentsService.createComment(hotel.id, commentFormData, user.token);
        setComments([...comments, commentResponse]);
        setHotel({ ...hotel, commentsCount: hotel.commentsCount + 1 });
    };
    const {
        form: commentForm,
        showForm: showCommentForm,
        setShowForm: setShowCommentForm
    } = useCommentReplyForm(onSubmitCommentHandler);

    const commentsClickHandler = async () => {
        try {
            const comments = await commentsService.getHotelComments(hotel.id, user?.token);
            setComments(comments);
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
        setShowCommentsBtn(false);
    };

    const loadRepliesClickHandler = async (commentId) => {
        try {
            const replies = await commentsService.getCommentReplies(commentId, user?.token);

            setComments(state => {
                const newState = [...state];
                newState.find(comment => comment.id === commentId).replies = replies;
                return newState;
            });
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const sendReplyClickHandler = async (commentId, reply) => {
        const replyData = await commentsService.createReply(commentId, reply, user.token);

        setComments(state => {
            const newState = [...state];
            const comment = newState.find(comment => comment.id === commentId);

            if (!comment.replies) {
                comment.replies = [];
            }

            comment.replies.push(replyData);
            comment.repliesCount++;

            return newState;
        });
    };

    const deleteCommentClickHandler = async (commentId) => {
        await commentsService.removeComment(commentId, user.token);
        setHotel({ ...hotel, commentsCount: hotel.commentsCount - 1 });
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    const deleteReplyClickHandler = async (replyId, commentId) => {
        try {
            await commentsService.removeReply(replyId, user.token)

            setComments(state => {
                const newState = [...state];
                const comment = newState.find(comment => comment.id === commentId);
                comment.replies = comment.replies.filter(reply => reply.id !== replyId);
                comment.repliesCount--;

                return newState;
            });
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const commentsList = comments.map(comment => <CommentDiv
        key={comment.id}
        comment={comment}
        onSendReplySubmitHandler={sendReplyClickHandler}
        onRepliesClickHandler={loadRepliesClickHandler}
        onDeleteCommentClickHandler={deleteCommentClickHandler}
        onDeleteReplyClickHandler={deleteReplyClickHandler}
        onCommentRatingClickHandler={commentRatingClickHandler}
        onReplyRatingClickHandler={replyRatingClickHandler}
        userId={user?.id}
    />);

    return <CommentsDiv
        hotelId={hotel.id}
        commentsList={commentsList}
        commentsCount={hotel.commentsCount}
        commentForm={commentForm}
        showCommentForm={showCommentForm}
        onAddCommentClickHandler={() => setShowCommentForm(true)}
        showCommentsBtn={showCommentsBtn}
        onCommentsClickHandler={commentsClickHandler}
    />;
};