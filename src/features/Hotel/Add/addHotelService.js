import { post } from "../../../services/api";

export async function addHotel(data, token) {
    return await post('/api/hotels', { data, token });
};