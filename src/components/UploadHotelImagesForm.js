import { useState } from "react";
import { uploadHotelImages } from "../services/imagesService";

export function UploadHotelImagesForm({
    hotelId,
    onSubmitHandler,
    token
}) {
    const [selectedImages, setSelectedImages] = useState(null);

    const onChange = (e) => setSelectedImages([...e.target.files]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        selectedImages.forEach((img) => {
            formData.append(`images`, img);
        });

        try {
            const { ids } = await uploadHotelImages(hotelId, formData, token);
            onSubmitHandler(ids);
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="file"
                onChange={onChange}
                multiple
                accept="image/*"
                required
            />

            <button type="submit">Upload Images</button>
        </form>
    );
};