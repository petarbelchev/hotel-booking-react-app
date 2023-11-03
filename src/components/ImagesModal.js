import styles from "./ImagesModal.module.css";

export function ImagesModal({
    slide,
    thumbnails,
    onCloseClickHandler,
    onPreviousClickHandler,
    onNextClickHandler,
    isFirstSlide,
    isLastSlide,
}) {

    return (
        <div className={styles.modal}>
            <span
                className={`${styles.close} ${styles.cursor}`}
                onClick={onCloseClickHandler}
            >
                &times;
            </span>

            <div className={styles.modalContent}>
                {slide}

                {!isFirstSlide &&
                    <button
                        className={styles.prev}
                        onClick={onPreviousClickHandler}
                    >
                        &#10094;
                    </button>
                }

                {!isLastSlide &&
                    <button
                        className={styles.next}
                        onClick={onNextClickHandler}
                    >
                        &#10095;
                    </button>
                }

                {thumbnails}
            </div>
        </div>
    );
};