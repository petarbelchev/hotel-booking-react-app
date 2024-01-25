import { get, put, remove } from './api';

const path = '/api/users';

export const getUserProfile = async (userId, token) => await get(`${path}/${userId}`, { token });

export const updateUserProfile = async (userId, data, token) => await put(`${path}/${userId}`, { data, token });

export const deleteUserProfile = async (userId, token) => await remove(`${path}/${userId}`, { token });