import { get } from "./api";

export async function getHotelComments(hotelId, token) {
    const path = `/api/hotels/${hotelId}/comments`;
    return await get(path, { token });
};

export async function getCommentReplies(commentId, token) {
    const path = `/api/comments/${commentId}/replies`;
    return await get(path, { token });
};