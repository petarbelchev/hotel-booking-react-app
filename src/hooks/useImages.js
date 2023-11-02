import { useState, useEffect } from "react";

import { getImage } from "../services/imagesService";

export function useImages({ mainImageId, imageIds }) {
    const [mainImage, setMainImage] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            if (mainImageId) {
                try {
                    const image = await getImage(mainImageId);
                    setMainImage(URL.createObjectURL(image));
                } catch (error) {
                    alert(`${error.status} ${error.title}`);
                }
            }

            if (imageIds) {
                const imagesToFetch = imageIds.slice(0, 6);
                const promises = imagesToFetch.map(async (imageId) => {
                    try {
                        const image = await getImage(imageId);
                        return URL.createObjectURL(image);
                    } catch (error) {
                        alert(`${error.status} ${error.title}`);
                    }
                });

                const fetchedImages = await Promise.all(promises);
                setImages(fetchedImages);
            }
        };

        fetchImages();
    }, [mainImageId, imageIds]);

    return { mainImage, images };
};