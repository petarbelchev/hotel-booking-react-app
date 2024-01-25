import { useContext } from 'react';
import { setCommentRating, setReplyRating } from '../services/ratingsService';
import { AuthContext } from 'contexts/AuthContext';

export function useCommentReplyRating(setComments) {
    const { user } = useContext(AuthContext);

    const commentRatingClickHandler = async (commentId, ratingValue) => {
        try {
            const response = await setCommentRating(commentId, ratingValue, user.token);

            setComments(state => {
                const newState = [...state];
                const comment = newState.find(comment => comment.id === commentId);
                comment.ratings = response;
                return newState;
            });
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    const replyRatingClickHandler = async (commentId, replyId, ratingValue) => {
        try {
            const response = await setReplyRating(replyId, ratingValue, user.token);

            setComments(state => {
                const newState = [...state];
                const comment = newState.find(comment => comment.id === commentId);
                const reply = comment.replies.find(reply => reply.id === replyId);
                reply.ratings = response;
                return newState;
            });
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    return { commentRatingClickHandler, replyRatingClickHandler };
};