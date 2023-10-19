import { useState } from "react";

import { SmallButton } from "../Buttons/SmallButton";
import { ReplyInfoDiv } from "./ReplyInfoDiv";
import { BaseCommentReplyContent } from "./BaseCommentReplyContent";

import styles from "./CommentInfoDiv.module.css";

export function CommentInfoDiv({
    comment,
    onRepliesClick,
}) {
    const [showRepliesBtn, setShowRepliesBtn] = useState(true);

    const onClick = () => {
        setShowRepliesBtn(false);
        onRepliesClick(comment.id);
    };

    return (
        <div className={styles.comment}>
            <BaseCommentReplyContent content={comment}>
                {comment.repliesCount > 0 &&
                    <>
                        {comment.replies &&
                            <div>
                                <h4>Replies:</h4>
                                
                                {comment.replies.map(reply => <ReplyInfoDiv key={reply.id} reply={reply} />)}
                            </div>
                        }

                        <div>
                            {showRepliesBtn && <SmallButton onClick={onClick} name="Replies" />}

                            <span>{comment.repliesCount} replies</span>
                        </div>
                    </>
                }
            </BaseCommentReplyContent>
        </div>
    );
};
