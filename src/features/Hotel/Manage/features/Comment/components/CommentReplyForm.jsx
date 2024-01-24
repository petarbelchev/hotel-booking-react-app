import { PrimaryButton } from "../../../../../../components/Buttons/PrimaryButton";

export function CommentReplyForm({ content, onChangeHandler, onSubmitHandler }) {
    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <textarea
                    placeholder="Write your comment here..."
                    name="content"
                    value={content}
                    onChange={onChangeHandler}
                    rows="5"
                    cols="50"
                    required={true}
                />
            </div>

            <PrimaryButton type="submit" name="Send" />
        </form>
    );
};