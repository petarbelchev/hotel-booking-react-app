import { post } from "./api";

const basePath = '/api/users';

export async function register(credentials) {
    const path = basePath + '/register';
    return await post(path, { data: credentials });
}

export async function login(credentials) {
    const path = basePath + '/login';
    return await post(path, { data: credentials });
};