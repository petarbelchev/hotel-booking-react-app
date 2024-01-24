import { useState } from "react";
import { CommentReplyForm } from "../components/CommentReplyForm";

export function useCommentReplyForm(onSubmitHandler) {
    const [formContent, setFormContent] = useState({ content: '' });
    const [showForm, setShowForm] = useState(false);

    const changeHandler = (e) => setFormContent({ content: e.target.value });

    const sendCommentSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            await onSubmitHandler(formContent);
            setFormContent({ content: '' });
            setShowForm(false);
        } catch (error) {
            // TODO: Render validation errors.
            alert(`${error.status} ${error.title}`);
        }
    };

    const form = <CommentReplyForm
        content={formContent.content}
        onChangeHandler={changeHandler}
        onSubmitHandler={sendCommentSubmitHandler}
    />;

    return { form, showForm, setShowForm };
};