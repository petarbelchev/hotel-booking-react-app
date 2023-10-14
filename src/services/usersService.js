import { get, put, remove } from "./api";

const path = '/api/users';

export async function getUserInfo(userId, token) {
    return await get(`${path}/${userId}`, { token });
};

export async function updateUserProfile(userId, userData, token) {
    return await put(`${path}/${userId}`, {
        body: JSON.stringify(userData),
        token
    });
};

export async function deleteUserProfile(userId, token) {
    return await remove(`${path}/${userId}`, { token });
};
