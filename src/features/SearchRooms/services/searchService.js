import { get } from '../../../services/api';

export async function getHotelsWithAvailableRooms(searchParams, token) {
    const path = `/api/rooms?${searchParams.toString()}`;
    return await get(path, { token });
}