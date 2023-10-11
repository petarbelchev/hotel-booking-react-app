import { get } from "./api";

export async function getUserInfo(userId, token) {
    const path = '/api/users/' + userId;
    return await get(path, { token });
}
