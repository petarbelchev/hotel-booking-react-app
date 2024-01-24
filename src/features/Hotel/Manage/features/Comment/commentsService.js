import { get, post, remove } from "../../../../../services/api";

const commentsService = {
    getHotelComments: async (hotelId, token) => {
        const path = `/api/hotels/${hotelId}/comments`;
        return await get(path, { token });
    },    
    getCommentReplies: async (commentId, token) => {
        const path = `/api/comments/${commentId}/replies`;
        return await get(path, { token });
    },    
    createComment: async (hotelId, data, token) => {
        const path = `/api/hotels/${hotelId}/comments`;
        return await post(path, { data, token });
    },    
    removeComment: async (commendId, token) => {
        const path = `/api/comments/${commendId}`;
        return await remove(path, { token });
    },    
    createReply: async (commentId, data, token) => {
        const path = `/api/comments/${commentId}/replies`;
        return await post(path, { data, token });
    },    
    removeReply: async (replyId, token) => {
        const path = `/api/replies/${replyId}`;
        return await remove(path, { token });
    }
};

export default commentsService;