import { get, put } from "./api";

const path = '/api/users';

export async function getUserInfo(userId, token) {
    return await get(`${path}/${userId}`, { token });
}

export async function updateUserProfile(userId, body, token) {
    return await put(`${path}/${userId}`, { body, token });
}
