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
    onSendReplySubmit,
    onRepliesClick,
    onDeleteCommentClick,
    onDeleteReplyClick,
    userId,
}) {
    const [showRepliesBtn, setShowRepliesBtn] = useState(
        comment.repliesCount > 0 && (
            !comment.replies ||
            comment.repliesCount > comment.replies.length
        )
    );
    const [showAddReplyBtn, setShowAddReplyBtn] = useState(true);
    const { form, setForm, changeHandler } = useForm({ content: '' });

    const isOwner = userId === comment.author.id;

    const onSubmitHandler = (e) => {
        e.preventDefault();

        onSendReplySubmit(comment.id, form)
            .then(() => {
                setForm({ content: '' });
                setShowAddReplyBtn(true);
            })
            .catch(error => alert(`${error.status} ${error.title}`));
    };

    const repliesClickHandler = () => {
        setShowRepliesBtn(false);
        onRepliesClick(comment.id);
    };

    const deleteCommentClickHandler = async () => {
        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this comment?')) {
            await onDeleteCommentClick(comment.id);
        }
    };

    return (
        <div className={styles.comment}>
            <BaseCommentReplyContent content={comment}>
                {comment.replies &&
                    <div>
                        <h4>Replies:</h4>
                        {comment.replies.map(reply =>
                            <ReplyInfoDiv
                                key={reply.id}
                                reply={reply}
                                onDeleteReplyBtnClick={() => onDeleteReplyClick(reply.id, comment.id)}
                                userId={userId}
                            />
                        )}
                    </div>
                }

                <div>
                    {showAddReplyBtn && <PrimaryButton onClick={() => setShowAddReplyBtn(false)} name="Add Reply" />}
                    {showRepliesBtn && <PrimaryButton onClick={repliesClickHandler} name="Replies" />}
                    <span>{comment.repliesCount} replies</span>
                    {isOwner && <DangerButton onClick={deleteCommentClickHandler} name="Delete Comment" />}
                </div>

                {!showAddReplyBtn &&
                    <form onSubmit={onSubmitHandler}>
                        <div>
                            <TextArea
                                placeHolder="Write your reply here..."
                                paramName="content"
                                value={form.content}
                                onChange={changeHandler}
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
