import { put } from 'services/api';

export async function markAsFavorite(hotelId, token) {
    return await put(`/api/hotels/${hotelId}/favorites`, { token });
};