import { get, post, put, remove } from "./api";

const path = '/api/hotels';

export async function addHotel(data, token) {
    return await post(path, { data, token });
};

export async function getHotel(hotelId, token) {
    return await get(`${path}/${hotelId}`, { token });
};

export async function updateHotel(hotelId, data, token) {
    return await put(`${path}/${hotelId}`, { data, token });
};

export async function removeHotel(hotelId, token) {
    return await remove(`${path}/${hotelId}`, { token });
};

export async function markAsFavorite(hotelId, token) {
    return await put(`${path}/${hotelId}/favorites`, { token });
};