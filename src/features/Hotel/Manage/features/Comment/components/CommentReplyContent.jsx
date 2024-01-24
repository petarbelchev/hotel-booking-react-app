import { RatingDiv } from "../../../../../../components/Ratings/RatingDiv";
import styles from "./CommentReplyContent.module.css";

export function CommentReplyContent({ content, onRatingClickHandler, userId, children }) {
    const { id, content: textContent, author, ratings, createdOnLocal } = content;

    const ratingClickHandler = (ratingValue) => onRatingClickHandler(id, ratingValue);

    return (
        <>
            <p id={styles.authorName}>{author.firstName} {author.lastName}:</p>
            <p>{textContent}</p>
            <span>{new Date(createdOnLocal).toLocaleString()}</span>

            {ratings.rating > 0 && <span> | Rating: {ratings.rating} from {ratings.ratingsCount} votes</span>}

            {userId && <RatingDiv
                userRating={ratings.userRating}
                onRatingClickHandler={ratingClickHandler}
            />}

            {children}
        </>
    );
};