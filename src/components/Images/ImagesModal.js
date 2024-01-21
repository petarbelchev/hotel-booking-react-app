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
        <section className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.buttonsDiv}>
                    {showDeleteBtn && <button className={styles.delete} onClick={onDeleteClickHandler}>Delete</button>}
                    <span className={styles.close} onClick={onCloseClickHandler}>&times;</span>
                </div>
                {slide}

                {!isFirstSlide && <button className={styles.prev} onClick={onPreviousClickHandler}>&#10094;</button>}
                {!isLastSlide && <button className={styles.next} onClick={onNextClickHandler}>&#10095;</button>}

                {thumbnails}
            </div>
        </section>
    );
};
