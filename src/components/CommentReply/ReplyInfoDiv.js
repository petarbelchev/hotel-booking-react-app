import { useState } from "react";
import { DangerButton } from "../Buttons/DangerButton";
import { BaseCommentReplyContent } from "./BaseCommentReplyContent";

import styles from "./ReplyInfoDiv.module.css";

export function ReplyInfoDiv({
    reply,
    onDeleteReplyBtnClick,
    userId,
}) {
    const [showDeleteBtn, setShowDeleteBtn] = useState(userId === reply.author.id);

    const clickHandler = () => {
        setShowDeleteBtn(false);
        onDeleteReplyBtnClick();
    };

    return (
        <div className={styles.reply}>
            <BaseCommentReplyContent content={reply}>
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
