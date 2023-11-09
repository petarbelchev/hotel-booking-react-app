import styles from "./ImageThumbnail.module.css";

export function ImageThumbnail({
    img,
    alt,
    onClickHandler,
}) {
    return (
        <div className={styles.thumbnail}>
            <img
                className={styles.image}
                src={img}
                alt={alt}
                onClick={onClickHandler}
            />
        </div>
    );
};
