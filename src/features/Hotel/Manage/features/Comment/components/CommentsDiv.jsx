import { useContext } from 'react';

import { PrimaryButton } from 'components/Buttons/PrimaryButton';
import { AuthContext } from 'contexts/AuthContext';

export function CommentsDiv({
    commentsList,
    commentsCount,
    commentForm,
    showCommentForm,
    onAddCommentClickHandler,
    showCommentsBtn,
    onCommentsClickHandler
}) {
    const { user } = useContext(AuthContext);    

    return (
        <div>
            {commentsList.length > 0 &&
                <div>
                    <h3>Comments:</h3>

                    {commentsList}
                </div>
            }

            <div>
                {!showCommentForm && user &&
                    <PrimaryButton
                        onClick={onAddCommentClickHandler}
                        name="Add Comment"
                    />
                }

                {showCommentsBtn &&
                    <PrimaryButton
                        onClick={onCommentsClickHandler}
                        name="Comments"
                    />
                }

                <span>{commentsCount} comments</span>
            </div>

            {showCommentForm && commentForm}
        </div>
    );
};