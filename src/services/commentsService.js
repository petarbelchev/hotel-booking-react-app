import { get, post } from "./api";

export async function getHotelComments(hotelId) {
    const path = `/api/hotels/${hotelId}/comments`;
    return await get(path, {});
};

export async function getCommentReplies(commentId) {
    const path = `/api/comments/${commentId}/replies`;
    return await get(path, {});
};

export async function createComment(hotelId, data, token) {
    const path = `/api/hotels/${hotelId}/comments`;
    return await post(path, { data, token });
};

export async function createReply(commentId, data, token) {
    const path = `/api/comments/${commentId}/replies`;
    return await post(path, { data, token });
};