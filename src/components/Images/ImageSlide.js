import styles from "./ImageSlide.module.css";

export function ImageSlide({ img, imgNum, imgsCount, alt }) {
    return (
        <div id={styles.container}>
            <div className={styles.numberText}>{imgNum} / {imgsCount}</div>
            <img className={styles.image} src={img} alt={alt} />
        </div>
    );
};
