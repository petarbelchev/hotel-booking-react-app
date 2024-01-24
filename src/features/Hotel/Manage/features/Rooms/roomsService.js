import { get, post, put, remove } from "../../../../../services/api";

export async function getHotelRooms(hotelId, token) {
    const path = `/api/hotels/${hotelId}/rooms`;
    return await get(path, { token });
};

export async function createRoom(hotelId, data, token) {
    const path = `/api/hotels/${hotelId}/rooms`;
    return await post(path, { data, token });
};

export async function updateRoom(roomId, data, token) {
    const path = `/api/rooms/${roomId}`;
    return await put(path, { data, token });
};

export async function removeRoom(roomId, token) {
    const path = `/api/rooms/${roomId}`;
    return await remove(path, { token });
};