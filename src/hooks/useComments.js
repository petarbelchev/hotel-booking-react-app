import { useState } from "react";
import {
    getHotelComments,
    getCommentReplies,
    createComment,
    removeComment,
    createReply,
    removeReply,
} from "../services/commentsService";

export function useComments() {
    const [comments, setComments] = useState([]);

    const loadComments = (hotelId) => {
        getHotelComments(hotelId)
            .then(setComments)
            .catch(error => alert(`${error.status} ${error.title}!`));
    };

    const sendComment = async (hotelId, comment, token) => {
        const commentData = await createComment(hotelId, comment, token);
        setComments([...comments, commentData]);
    };

    const deleteComment = async (commentId, token) => {
        await removeComment(commentId, token);
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    const loadReplies = (commentId) => {
        getCommentReplies(commentId)
            .then(replies => {
                setComments(state => {
                    const newState = [...state];
                    newState.find(comment => comment.id === commentId).replies = replies;
                    return newState;
                });
            })
            .catch(error => alert(`${error.status} ${error.title}!`));
    };

    const sendReply = async (commentId, reply, token) => {
        const replyData = await createReply(commentId, reply, token);

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

    const deleteReply = (replyId, commendId, token) => {
        removeReply(replyId, token)
            .then(() => {
                setComments(state => {
                    const newState = [...state];
                    const comment = newState.find(comment => comment.id === commendId);
                    comment.replies = comment.replies.filter(reply => reply.id !== replyId);
                    comment.repliesCount--;
                    return newState;
                });
            })
            .catch(error => alert(`${error.status} ${error.title}!`));
    };

    return {
        comments,
        loadComments,
        loadReplies,
        sendComment,
        deleteComment,
        sendReply,
        deleteReply,
    };
};