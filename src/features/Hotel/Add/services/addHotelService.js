import { post } from 'services/api';

export const addHotel = async (data, token) => await post('/api/hotels', { data, token });