import { useState } from "react";
import { ImagesModal } from "../components/ImagesModal";

import styles from "../components/ImagesModal.module.css";

export function useImagesModal() {
    const [showModal, setShowModal] = useState(false);
    const [slides, setSlides] = useState([]);
    const [thumbnails, setThumbnails] = useState([]);
    const [currIdx, setCurrIdx] = useState(null);

    const onImageClickHandler = (imgIdx, images, alt) => {
        setCurrIdx(imgIdx);

        setSlides(images.map((img, i) =>
            <div key={i}>
                <div className={styles.numberText}>{i + 1} / {images.length}</div>
                <img src={img} alt={alt} style={{ width: "100%" }} />
            </div>
        ));

        setThumbnails(images.map((img, i) =>
            <div key={i} className={styles.column}>
                <img
                    className={styles.demo}
                    src={img}
                    alt={alt}
                    onClick={() => setCurrIdx(i)}
                />
            </div>
        ));

        setShowModal(true);
    };

    const modal = <ImagesModal
        slide={slides[currIdx]}
        thumbnails={thumbnails}
        onCloseClickHandler={() => setShowModal(false)}
        onPreviousClickHandler={() => setCurrIdx(state => state - 1)}
        onNextClickHandler={() => setCurrIdx(state => state + 1)}
        isFirstSlide={currIdx === 0}
        isLastSlide={currIdx === slides.length - 1}
    />;

    return {
        modal,
        showModal,
        onImageClickHandler,
    };
};