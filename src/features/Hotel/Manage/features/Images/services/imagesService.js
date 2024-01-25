import { get, post, remove } from '../../../../../../services/api';

export async function getImage(imageId) {
    const path = '/api/images/' + imageId;
    return await get(path, {});
};

export async function deleteImage(imageId, token) {
    const path = '/api/images/' + imageId;
    return await remove(path, { token });
};

export async function uploadHotelImages(hotelId, data, token) {
    const path = `/api/hotels/${hotelId}/images`;
    return await post(path, { data, hasDataFiles: true, token });
};