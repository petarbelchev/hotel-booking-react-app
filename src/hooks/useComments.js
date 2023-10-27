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

    const loadComments = async (hotelId, token) => {
        try {
            const comments = await getHotelComments(hotelId, token);
            setComments(comments);
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const loadReplies = async (commentId, token) => {
        try {
            const replies = await getCommentReplies(commentId, token);

            setComments(state => {
                const newState = [...state];
                newState.find(comment => comment.id === commentId).replies = replies;
                return newState;
            });
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const sendComment = async (hotelId, comment, token) => {
        const commentData = await createComment(hotelId, comment, token);
        setComments([...comments, commentData]);
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

    const deleteComment = async (commentId, token) => {
        await removeComment(commentId, token);
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    const deleteReply = async (replyId, commentId, token) => {
        try {
            await removeReply(replyId, token)

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

    const setCommentRatings = (commentId, ratings) => {
        setComments(state => {
            const newState = [...state];
            const comment = newState.find(comment => comment.id === commentId);
            comment.ratings = ratings
            return newState;
        });
    };

    const setReplyRatings = (commentId, replyId, ratings) => {
        setComments(state => {
            const newState = [...state];
            const comment = newState.find(comment => comment.id === commentId);
            const reply = comment.replies.find(reply => reply.id === replyId);
            reply.ratings = ratings;
            return newState;
        });
    };

    return {
        comments,
        loadComments,
        loadReplies,
        sendComment,
        deleteComment,
        setCommentRatings,
        setReplyRatings,
        sendReply,
        deleteReply,
    };
};