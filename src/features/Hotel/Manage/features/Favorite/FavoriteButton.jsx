import styles from "./FavoriteButton.module.css";

export function FavoriteButton({ hotelId, isPressed, onClick }) {
    return (
        <button id={styles.button} onClick={() => onClick(hotelId)}>
            <img
                src={process.env.PUBLIC_URL + (isPressed ? '/full-heart.png' : '/empty-heart.png')}
                alt="Favorite hotel icon"
                width="25px"
            />
        </button>
    );
};
