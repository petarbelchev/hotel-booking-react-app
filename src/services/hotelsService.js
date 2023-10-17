import { get, post, put } from "./api";

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