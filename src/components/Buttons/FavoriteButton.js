export function FavoriteButton({
    hotelId,
    isPressed,
    onClick,
}) {
    return (
        <button
            style={{ cursor: "pointer", background: "none", border: "none" }}
            onClick={() => onClick(hotelId)}
        >
            <img
                src={process.env.PUBLIC_URL + (isPressed ? '/full-heart.png' : '/empty-heart.png')}
                alt="Favorite hotel icon"
                width="25px"
            />
        </button>
    );
};
