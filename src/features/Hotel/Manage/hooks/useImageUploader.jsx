import { useState } from "react";
import { UploadHotelImagesForm } from "../../../../components/Forms/UploadHotelImagesForm";

export function useImageUploader(hotelId, setHotel) {
    const [showUploadImageForm, setShowUploadImageForm] = useState(false);

    const uploadHotelImagesSubmitHandler = async (newImageIds) => {
        // TODO: If the images are 7 do not change the state!
        setHotel(state => {
            const newState = { ...state };
            if (!newState.mainImageId) {
                newState.mainImageId = newImageIds.shift();
            }
            newState.imageIds = [...state.imageIds, ...newImageIds];
            return newState;
        });

        setShowUploadImageForm(false);
    };

    const uploadHotelImageForm = <UploadHotelImagesForm
        hotelId={hotelId}
        onSubmitHandler={uploadHotelImagesSubmitHandler}
    />;

    return { uploadHotelImageForm, showUploadImageForm, setShowUploadImageForm };
};