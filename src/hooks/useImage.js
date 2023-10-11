import { useState, useEffect } from "react";

import { getImage } from "../services/imagesService";

export function useImage(imageId) {
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        async function fetchData(imageId) {
            return await getImage(imageId);
        };

        if (imageId) {
            fetchData(imageId)
                .then(image => setMainImage(URL.createObjectURL(image)))
                .catch(error => alert(`${error.status} ${error.title}`));
        }
    }, []);

    return mainImage;
}