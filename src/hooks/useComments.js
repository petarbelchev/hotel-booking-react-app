import { useState } from "react";
import { getHotelComments, getCommentReplies } from "../services/commentsService";

export function useComments() {
    const [comments, setComments] = useState(null);

    const loadComments = (hotelId, token) => {
        getHotelComments(hotelId, token)
            .then(setComments)
            .catch(error => alert(`${error.status} ${error.title}!`));
    };

    const loadReplies = (commentId, token) => {
        getCommentReplies(commentId, token)
            .then(replies => {
                setComments(state => {
                    const newState = [...state];
                    newState.find(comment => comment.id === commentId).replies = replies;
                    return newState;
                });
            })
            .catch(error => alert(`${error.status} ${error.title}!`));
    };

    return {
        comments,
        loadComments,
        loadReplies
    };
};