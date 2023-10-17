import { get, put } from "./api";

export async function getHotelRooms(hotelId, token) {
    const path = `/api/hotels/${hotelId}/rooms`;
    return await get(path, { token });
};

export async function updateRoom(roomId, data, token) {
    const path = `/api/rooms/${roomId}`;
    return await put(path, { data, token });
}