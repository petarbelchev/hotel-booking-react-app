import { useState, useEffect, useContext } from 'react';

import { ImageSlide } from '../components/ImageSlide';
import { ImageThumbnail } from '../components/ImageThumbnail';
import { ImagesModal } from '../components/ImagesModal';
import { ImageGallery } from '../components/ImageGallery';

import { getImage, deleteImage } from 'features/Hotel/Manage/features/Images/services/imagesService';
import { AuthContext } from 'contexts/AuthContext';

export function useHotelImages(hotel) {
    const { user } = useContext(AuthContext);
    const { name, mainImageId, imageIds } = hotel;
    const [images, setImages] = useState([]);
    const [slides, setSlides] = useState([]);
    const [thumbnails, setThumbnails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currIdx, setCurrIdx] = useState(null);
    const isOwner = hotel.owner?.id === user?.id;

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
            imagesCount={images.length}
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
            await deleteImage(imageId, user.token);
            setImages(images.filter(image => image.id !== imageId));
            setShowModal(false);
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    const gallery = images.length > 0 && <ImageGallery
        entityName={name}
        images={images}
        onImageClickHandler={imageClickHandler}
    />;

    const modal = <ImagesModal
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
        gallery,
        modal,
        showModal,
    };
};