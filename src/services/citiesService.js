import { get } from "./api";

export async function getCities() {
    const path = '/api/cities';
    return await get(path, {});
}