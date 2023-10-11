import { get } from "./api";

export async function getHotelsWithAvailableRooms(searchParams) {
    const path = `/api/rooms?${searchParams.toString()}`;
    return await get(path, {});
}