import styles from "./ImageSlide.module.css";

export function ImageSlide({ img, imgNum, imagesCount, alt }) {
    return (
        <div id={styles.container}>
            <div className={styles.numberText}>{imgNum} / {imagesCount}</div>
            <img className={styles.image} src={img} alt={alt} />
        </div>
    );
};
