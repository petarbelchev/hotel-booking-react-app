import { get } from "./api";

export async function getImage(imageId) {
    const path = '/api/images/' + imageId;
    return await get(path, {});
}