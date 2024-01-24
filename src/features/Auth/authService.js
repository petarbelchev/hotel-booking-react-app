import { post } from "../../services/api";

const basePath = '/api/users';

export async function register(data) {
    const path = basePath + '/register';
    return await post(path, { data });
}

export async function login(credentials) {
    const path = basePath + '/login';
    return await post(path, { data: credentials });
};