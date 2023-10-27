import { RatingDiv } from "../RatingDiv";

export function BaseCommentReplyContent({
    content,
    onRatingClickHandler,
    children,
}) {
    const {
        id,
        content: textContent,
        author,
        ratings,
        createdOnLocal
    } = content;

    const ratingClickHandler = (ratingValue) => {
        onRatingClickHandler(id, ratingValue);
    };

    return (
        <>
            <p><b>{author.firstName} {author.lastName}:</b></p>
            <p>{textContent}</p>
            <span>{new Date(createdOnLocal).toLocaleString()}</span>
            {ratings.rating > 0 && <span> | Rating: {ratings.rating} from {ratings.ratingsCount} votes</span>}
            <RatingDiv
                userRating={ratings.userRating}
                onRatingClickHandler={ratingClickHandler}
            />
            {children}
        </>
    );
};