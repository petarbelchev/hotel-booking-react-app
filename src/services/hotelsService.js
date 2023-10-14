import { get, post } from "./api";

const path = '/api/hotels';

export async function addHotel(hotel, token) {
    return await post(path, {
        body: JSON.stringify(hotel),
        token
    });
};

export async function getHotel(hotelId, token) {
    return await get(`${path}/${hotelId}`, { token });
}