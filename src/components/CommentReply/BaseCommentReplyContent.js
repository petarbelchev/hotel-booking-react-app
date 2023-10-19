export function BaseCommentReplyContent({ content, children }) {
    return (
        <>
            <p><b>{content.author.firstName} {content.author.lastName}:</b></p>
            <p>{content.content}</p>
            <span>{new Date(content.createdOnLocal).toLocaleString()}</span>
            <span> | Rating: {content.ratings.rating} from {content.ratings.ratingsCount} votes</span>

            {children}
        </>
    );
};