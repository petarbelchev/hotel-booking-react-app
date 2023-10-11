import { post } from "./api";

const basePath = '/api/users';

export async function register(credentials) {
    const path = basePath + '/register';
    const body = JSON.stringify(credentials);
    return await post(path, { body });
}

export async function login(credentials) {
    const path = basePath + '/login';
    const body = JSON.stringify(credentials);
    return await post(path, { body });
};