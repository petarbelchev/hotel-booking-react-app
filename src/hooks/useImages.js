import { useState, useEffect } from "react";

import { ImageSlide } from "../components/Images/ImageSlide";
import { ImageThumbnail } from "../components/Images/ImageThumbnail";
import { ImagesModal } from "../components/Images/ImagesModal";
import { ImageGallery } from "../components/Images/ImageGallery";

import { getImage, deleteImage } from "../services/imagesService";

export function useImages(entity, isOwner, token) {
    const { name, mainImageId, imageIds } = entity;
    const [images, setImages] = useState([]);
    const [slides, setSlides] = useState([]);
    const [thumbnails, setThumbnails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currIdx, setCurrIdx] = useState(null);

    useEffect(() => {
        const imagesToFetch = [];
        mainImageId && imagesToFetch.push(mainImageId);
        imageIds && imagesToFetch.push(...imageIds.slice(0, 6));

        if (imagesToFetch.length > 0) {
            const promises = imagesToFetch.map(async (imageId) => {
                try {
                    const image = await getImage(imageId);
                    return {
                        id: imageId,
                        blob: URL.createObjectURL(image),
                    };
                } catch (error) {
                    // Do nothing...
                }
            });

            Promise.all(promises).then(setImages);
        }
    }, [mainImageId, imageIds]);

    const imageClickHandler = (imgIdx) => {
        setCurrIdx(imgIdx);

        setSlides(images.map((img, i) => <ImageSlide
            key={i}
            img={img.blob}
            imgNum={i + 1}
            imgsCount={images.length}
            alt={name}
        />));

        setThumbnails(images.map((img, i) => <ImageThumbnail
            key={i}
            img={img.blob}
            alt={name}
            onClickHandler={() => setCurrIdx(i)}
        />));

        setShowModal(true);
    };

    const deleteClickHandler = async () => {
        const imageId = images[currIdx].id;

        try {
            await deleteImage(imageId, token);
            setImages(images.filter(image => image.id !== imageId));
            setShowModal(false);
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    const imageGallery = images.length > 0 && <ImageGallery
        entityName={name}
        images={images}
        onImageClickHandler={imageClickHandler}
    />;

    const imagesModal = <ImagesModal
        slide={slides[currIdx]}
        thumbnails={thumbnails}
        onCloseClickHandler={() => setShowModal(false)}
        onDeleteClickHandler={deleteClickHandler}
        onPreviousClickHandler={() => setCurrIdx(state => state - 1)}
        onNextClickHandler={() => setCurrIdx(state => state + 1)}
        isFirstSlide={currIdx === 0}
        isLastSlide={currIdx === slides.length - 1}
        showDeleteBtn={isOwner}
    />;

    return {
        imageGallery,
        imagesModal,
        showModal,
    };
};