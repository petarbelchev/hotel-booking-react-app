import { useState, useEffect } from "react";

import { getImage } from "../services/imagesService";

export function useImage(imageId) {
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        imageId && getImage(imageId)
            .then(image => setMainImage(URL.createObjectURL(image)))
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [imageId]);

    return mainImage;
}