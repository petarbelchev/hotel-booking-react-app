import { post } from 'services/api';

const basePath = '/api/users';

export const register = async (data) => await post(basePath + '/register', { data });

export const login = async (credentials) => await post(basePath + '/login', { data: credentials });