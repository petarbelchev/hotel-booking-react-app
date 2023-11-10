import styles from "./ImagesModal.module.css";

export function ImagesModal({
    slide,
    thumbnails,
    onCloseClickHandler,
    onDeleteClickHandler,
    onPreviousClickHandler,
    onNextClickHandler,
    isFirstSlide,
    isLastSlide,
    showDeleteBtn,
}) {
    return (
        <div className={styles.modal}>
            <div className={styles.buttonsDiv}>
                {showDeleteBtn && <button className={styles.delete} onClick={onDeleteClickHandler}>Delete</button>}
                <span className={styles.close} onClick={onCloseClickHandler}>&times;</span>
            </div>

            <div className={styles.modalContent}>
                {slide}

                {!isFirstSlide && <button className={styles.prev} onClick={onPreviousClickHandler}>&#10094;</button>}
                {!isLastSlide && <button className={styles.next} onClick={onNextClickHandler}>&#10095;</button>}

                {thumbnails}
            </div>
        </div>
    );
};
