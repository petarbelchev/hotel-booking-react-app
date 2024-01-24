import { put } from "../../../../../services/api";

export async function setHotelRating(hotelId, data, token) {
    return await put(`/api/hotels/${hotelId}/ratings`, { data, token });
};

export async function setCommentRating(commentId, data, token) {
    return await put(`/api/comments/${commentId}/ratings`, { data, token });
};

export async function setReplyRating(replyId, data, token) {
    return await put(`/api/replies/${replyId}/ratings`, { data, token });
};