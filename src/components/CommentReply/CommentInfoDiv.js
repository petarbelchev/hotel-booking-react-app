import { useState } from "react";

import { SmallButton } from "../Buttons/SmallButton";
import { SubmitButton } from "../Buttons/SubmitButton";
import { TextArea } from "../TextArea";
import { ReplyInfoDiv } from "./ReplyInfoDiv";
import { BaseCommentReplyContent } from "./BaseCommentReplyContent";

import { useForm } from "../../hooks/useForm";
import styles from "./CommentInfoDiv.module.css";

export function CommentInfoDiv({
    comment,
    onSendReplySubmit,
    onRepliesClick,
}) {
    const [showRepliesBtn, setShowRepliesBtn] = useState(
        comment.repliesCount > 0 && (
            !comment.replies ||
            comment.repliesCount > comment.replies.length
        )
    );
    const [showAddReplyBtn, setShowAddReplyBtn] = useState(true);
    const { form, setForm, changeHandler } = useForm({ content: '' });

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

    return (
        <div className={styles.comment}>
            <BaseCommentReplyContent content={comment}>
                {comment.replies &&
                    <div>
                        <h4>Replies:</h4>
                        {comment.replies.map(reply => <ReplyInfoDiv key={reply.id} reply={reply} />)}
                    </div>
                }

                <div>
                    {showAddReplyBtn && <SmallButton onClick={() => setShowAddReplyBtn(false)} name="Add Reply" />}
                    {showRepliesBtn && <SmallButton onClick={repliesClickHandler} name="Replies" />}
                    <span>{comment.repliesCount} replies</span>
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

                        <SubmitButton name="Send Reply" />
                    </form>
                }
            </BaseCommentReplyContent>
        </div>
    );
};
