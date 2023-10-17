import { get, put, remove } from "./api";

const path = '/api/users';

export async function getUserProfile(userId, token) {
    return await get(`${path}/${userId}`, { token });
};

export async function updateUserProfile(userId, data, token) {
    return await put(`${path}/${userId}`, { data, token });
};

export async function deleteUserProfile(userId, token) {
    return await remove(`${path}/${userId}`, { token });
};
