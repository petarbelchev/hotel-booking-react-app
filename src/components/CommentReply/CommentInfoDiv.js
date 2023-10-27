import { useState } from "react";

import { PrimaryButton } from "../Buttons/PrimaryButton";
import { DangerButton } from "../Buttons/DangerButton";
import { TextArea } from "../TextArea";
import { ReplyInfoDiv } from "./ReplyInfoDiv";
import { BaseCommentReplyContent } from "./BaseCommentReplyContent";

import { useForm } from "../../hooks/useForm";
import styles from "./CommentInfoDiv.module.css";

export function CommentInfoDiv({
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
        comment.repliesCount > 0 && (
            !comment.replies ||
            comment.repliesCount > comment.replies.length
        )
    );
    const [showAddReplyBtn, setShowAddReplyBtn] = useState(true);
    const { form, setForm, formChangeHandler } = useForm({ content: '' });

    const isOwner = userId === comment.author.id;

    const sendReplySubmitHandler = async (e) => {
        e.preventDefault();

        try {
            await onSendReplySubmitHandler(comment.id, form);
            setForm({ content: '' });
            setShowAddReplyBtn(true);
        } catch (error) {
            // TODO: Render validation errors.
            alert(`${error.status} ${error.title}`);
        }
    };

    const repliesClickHandler = () => {
        setShowRepliesBtn(false);
        onRepliesClickHandler(comment.id);
    };

    const deleteCommentClickHandler = async () => {
        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this comment?')) {
            await onDeleteCommentClickHandler(comment.id);
        }
    };

    const addReplyClickHandler = () => setShowAddReplyBtn(false);

    const deleteReplyClickHandler = async (replyId, setIsDeleting) => {
        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this reply?')) {
            await onDeleteReplyClickHandler(replyId, comment.id);
        } else {
            setIsDeleting(false);
        }
    };

    const replyRatingClickHandler = (replyId, ratingValue) => {
        onReplyRatingClickHandler(comment.id, replyId, ratingValue);
    };

    return (
        <div className={styles.comment}>
            <BaseCommentReplyContent
                content={comment}
                onRatingClickHandler={onCommentRatingClickHandler}
            >
                {comment.replies && <div>
                    <h4>Replies:</h4>

                    {comment.replies.map(reply =>
                        <ReplyInfoDiv
                            key={reply.id}
                            reply={reply}
                            onDeleteClickHandler={deleteReplyClickHandler}
                            onRatingClickHandler={replyRatingClickHandler}
                            userId={userId}
                        />
                    )}
                </div>}

                <div>
                    {showAddReplyBtn && userId && <PrimaryButton onClick={addReplyClickHandler} name="Add Reply" />}
                    {showRepliesBtn && <PrimaryButton onClick={repliesClickHandler} name="Replies" />}
                    <span>{comment.repliesCount} replies</span>
                    {isOwner && <DangerButton onClick={deleteCommentClickHandler} name="Delete Comment" />}
                </div>

                {!showAddReplyBtn &&
                    <form onSubmit={sendReplySubmitHandler}>
                        <div>
                            <TextArea
                                placeHolder="Write your reply here..."
                                paramName="content"
                                value={form.content}
                                onChange={formChangeHandler}
                                rows="5"
                                cols="50"
                                required={true}
                            />
                        </div>

                        <PrimaryButton type="submit" name="Send Reply" />
                    </form>
                }
            </BaseCommentReplyContent>
        </div>
    );
};
