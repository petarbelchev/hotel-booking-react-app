import styles from './ImageGallery.module.css';

export function ImageGallery({ entityName, images, onImageClickHandler }) {
    return (
        <div className={styles.images}>
            {images.length > 0 &&
                <div>
                    <img
                        src={images[0].blob}
                        alt={entityName}
                        className={styles.mainImage}
                        onClick={() => onImageClickHandler(0)}
                    />
                </div>
            }

            {images.length > 1 &&
                <div>
                    {images.slice(1).map((image, i) =>
                        <img
                            key={i}
                            src={image.blob}
                            alt={entityName}
                            className={styles.otherImages}
                            onClick={() => onImageClickHandler(i + 1)}
                        />)
                    }
                </div>
            }
        </div>
    );
};
