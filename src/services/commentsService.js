import { get, post, remove } from "./api";

export async function getHotelComments(hotelId, token) {
    const path = `/api/hotels/${hotelId}/comments`;
    return await get(path, { token });
};

export async function getCommentReplies(commentId, token) {
    const path = `/api/comments/${commentId}/replies`;
    return await get(path, { token });
};

export async function createComment(hotelId, data, token) {
    const path = `/api/hotels/${hotelId}/comments`;
    return await post(path, { data, token });
};

export async function removeComment(commendId, token) {
    const path = `/api/comments/${commendId}`;
    return await remove(path, { token });
}

export async function createReply(commentId, data, token) {
    const path = `/api/comments/${commentId}/replies`;
    return await post(path, { data, token });
};

export async function removeReply(replyId, token) {
    const path = `/api/replies/${replyId}`;
    return await remove(path, { token });
};