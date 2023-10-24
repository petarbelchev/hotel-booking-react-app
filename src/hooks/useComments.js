import { useState } from "react";
import { getHotelComments, getCommentReplies, createComment, createReply } from "../services/commentsService";

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

    return {
        comments,
        loadComments,
        loadReplies,
        sendComment,
        sendReply,
    };
};