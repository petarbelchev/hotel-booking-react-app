import { useState } from "react";

import { DangerButton } from "../Buttons/DangerButton";
import { BaseCommentReplyContent } from "./BaseCommentReplyContent";

import styles from "./ReplyInfoDiv.module.css";

export function ReplyInfoDiv({
    reply,
    onDeleteClickHandler,
    onRatingClickHandler,
    userId,
}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const showDeleteBtn = userId === reply.author.id;

    const clickHandler = () => {
        if (isDeleting) {
            return;
        }

        setIsDeleting(true);
        onDeleteClickHandler(reply.id, setIsDeleting);
    };

    return (
        <div className={styles.reply}>
            <BaseCommentReplyContent
                content={reply}
                onRatingClickHandler={onRatingClickHandler}
            >
                <div>
                    {showDeleteBtn &&
                        <DangerButton
                            onClick={clickHandler}
                            name="Delete Reply"
                        />
                    }
                </div>
            </BaseCommentReplyContent>
        </div>
    );
};
