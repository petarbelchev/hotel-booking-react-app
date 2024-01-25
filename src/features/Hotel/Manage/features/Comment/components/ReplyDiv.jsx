import { useState } from 'react';

import { DangerButton } from 'components/Buttons/DangerButton';
import { CommentReplyContent } from './CommentReplyContent';

import styles from './ReplyDiv.module.css';

export function ReplyDiv({ reply, onDeleteClickHandler, onRatingClickHandler, userId }) {
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
            <CommentReplyContent
                content={reply}
                onRatingClickHandler={onRatingClickHandler}
                userId={userId}
            >
                <div>
                    {showDeleteBtn && <DangerButton onClick={clickHandler} name="Delete Reply" />}
                </div>
            </CommentReplyContent>
        </div>
    );
};
