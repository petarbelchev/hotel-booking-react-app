export function RatingDiv({
    userRating,
    onRatingClickHandler,
}) {
    const content = [];

    for (let i = 0; i < 10; i++) {
        const imageName = i < userRating ? '/full-star.png' : '/empty-star.png';
        const ratingValue = { value: i + 1 };

        content[i] = <span key={i} onClick={() => onRatingClickHandler(ratingValue)} style={{ cursor: "pointer" }}>
            <img
                style={{ width: "20px" }}
                src={process.env.PUBLIC_URL + imageName}
                alt="Rating star icon"
            />
        </span>;
    }

    return (
        <div>
            {content}
        </div>
    );
};