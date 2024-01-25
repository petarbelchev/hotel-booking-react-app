import { useState } from 'react';

import { PrimaryButton } from 'UI/Buttons/PrimaryButton';
import { DangerButton } from 'UI/Buttons/DangerButton';
import { CommentReplyContent } from './CommentReplyContent';
import { RepliesList } from './RepliesList';
import { useCommentReplyForm } from '../hooks/useCommentReplyForm';

import styles from './CommentDiv.module.css';

export function CommentDiv({
    comment,
    onSendReplySubmitHandler,
    onRepliesClickHandler,
    onDeleteCommentClickHandler,
    onDeleteReplyClickHandler,
    onCommentRatingClickHandler,
    onReplyRatingClickHandler,
    userId,
}) {
    const [showRepliesBtn, setShowRepliesBtn] = useState(
        comment.repliesCount > 0 && (!comment.replies || comment.repliesCount > comment.replies.length)
    );
    const isOwner = userId === comment.author.id;

    const sendReplySubmitHandler = async (form) => await onSendReplySubmitHandler(comment.id, form);
    const {
        form: replyForm,
        showForm: showReplyForm,
        setShowForm: setShowReplyForm
    } = useCommentReplyForm(sendReplySubmitHandler)

    const repliesClickHandler = () => {
        setShowRepliesBtn(false);
        onRepliesClickHandler(comment.id);
    };

    const addReplyClickHandler = () => setShowReplyForm(true);

    const deleteCommentClickHandler = async () => {
        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this comment?')) {
            await onDeleteCommentClickHandler(comment.id);
        }
    };

    return (
        <div className={styles.comment}>
            <CommentReplyContent
                content={comment}
                onRatingClickHandler={onCommentRatingClickHandler}
                userId={userId}
            >
                {comment.replies &&
                    <div>
                        <h4>Replies:</h4>

                        <RepliesList 
                            userId={userId}
                            commentId={comment.id}
                            replies={comment.replies}
                            onRatingClickHandler={onReplyRatingClickHandler}
                            onDeleteClickHandler={onDeleteReplyClickHandler}
                        />
                    </div>
                }

                <div>
                    {!showReplyForm && userId && <PrimaryButton onClick={addReplyClickHandler} name="Add Reply" />}
                    {showRepliesBtn && <PrimaryButton onClick={repliesClickHandler} name="Replies" />}
                    <span>{comment.repliesCount} replies</span>
                    {isOwner && <DangerButton onClick={deleteCommentClickHandler} name="Delete Comment" />}
                </div>

                {showReplyForm && replyForm}
            </CommentReplyContent>
        </div>
    );
};
