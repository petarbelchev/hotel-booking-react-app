import { ReplyDiv } from "./ReplyDiv";

export function RepliesList({ userId, commentId, replies, onDeleteClickHandler, onRatingClickHandler }) {
    const deleteReplyClickHandler = async (replyId, setIsDeleting) => {
        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this reply?')) {
            await onDeleteClickHandler(replyId, commentId);
        } else {
            setIsDeleting(false);
        }
    };

    const replyRatingClickHandler = (replyId, ratingValue) => onRatingClickHandler(commentId, replyId, ratingValue);

    return replies.map(reply => <ReplyDiv
        key={reply.id}
        reply={reply}
        onDeleteClickHandler={deleteReplyClickHandler}
        onRatingClickHandler={replyRatingClickHandler}
        userId={userId}
    />);
};