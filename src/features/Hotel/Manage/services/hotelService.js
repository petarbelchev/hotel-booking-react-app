import { get } from 'services/api';

export const getHotel = async (hotelId, token) => await get(`/api/hotels/${hotelId}`, { token });