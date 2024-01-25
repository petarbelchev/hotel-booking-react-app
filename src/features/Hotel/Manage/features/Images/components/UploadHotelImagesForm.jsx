import { useContext, useState } from "react";

import { uploadHotelImages } from "../services/imagesService";
import { PrimaryButton } from "../../../../../../UI/Buttons/PrimaryButton";
import { AuthContext } from "../../../../../../contexts/AuthContext";

import styles from './UploadHotelImagesForm.module.css';

export function UploadHotelImagesForm({ hotelId, onSubmitHandler }) {
    const { user } = useContext(AuthContext);
    const [selectedImages, setSelectedImages] = useState(null);

    const onChange = (e) => setSelectedImages([...e.target.files]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        selectedImages.forEach((img) => {
            formData.append(`images`, img);
        });

        try {
            const { ids } = await uploadHotelImages(hotelId, formData, user.token);
            onSubmitHandler(ids);
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <input
                type="file"
                onChange={onChange}
                multiple
                accept="image/*"
                required
            />

            <PrimaryButton type="submit" name="Upload Images" />
        </form>
    );
};