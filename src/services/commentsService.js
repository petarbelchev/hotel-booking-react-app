import { get } from "./api";

export async function getHotelComments(hotelId) {
    const path = `/api/hotels/${hotelId}/comments`;
    return await get(path, {});
};

export async function getCommentReplies(commentId) {
    const path = `/api/comments/${commentId}/replies`;
    return await get(path, {});
};