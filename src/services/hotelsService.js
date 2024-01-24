import { get } from "./api";

const path = '/api/hotels';

export async function getHotel(hotelId, token) {
    return await get(`${path}/${hotelId}`, { token });
};