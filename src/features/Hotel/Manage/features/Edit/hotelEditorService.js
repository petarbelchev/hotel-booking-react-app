import { put, remove } from "../../../../../services/api";

const path = '/api/hotels';

export async function updateHotel(hotelId, data, token) {
    return await put(`${path}/${hotelId}`, { data, token });
};

export async function removeHotel(hotelId, token) {
    return await remove(`${path}/${hotelId}`, { token });
};