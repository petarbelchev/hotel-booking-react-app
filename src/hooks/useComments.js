import { useState } from "react";
import { getHotelComments, getCommentReplies } from "../services/commentsService";

export function useComments() {
    const [comments, setComments] = useState(null);

    const loadComments = (hotelId) => {
        getHotelComments(hotelId)
            .then(setComments)
            .catch(error => alert(`${error.status} ${error.title}!`));
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

    return {
        comments,
        loadComments,
        loadReplies
    };
};