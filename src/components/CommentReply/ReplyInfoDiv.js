import { BaseCommentReplyContent } from "./BaseCommentReplyContent";
import styles from "./ReplyInfoDiv.module.css";

export function ReplyInfoDiv({ reply }) {
    return (
        <div className={styles.reply}>
            <BaseCommentReplyContent content={reply} />
        </div>
    );
};
