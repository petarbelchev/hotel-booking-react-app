import { get } from './api';

export const getCities = async () => await get('/api/cities', {});