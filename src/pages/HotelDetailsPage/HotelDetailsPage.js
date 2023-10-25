import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import { DangerButton } from "../../components/Buttons/DangerButton";
import { Image } from "../../components/Image";
import { AddEditHotelForm } from "../../components/HotelRoom/AddEditHotelForm";
import { AddEditRoomDiv } from "../../components/HotelRoom/AddEditRoomDiv";
import { CommentInfoDiv } from "../../components/CommentReply/CommentInfoDiv";
import { TextArea } from "../../components/TextArea";

import { useImage } from "../../hooks/useImage";
import { useForm } from "../../hooks/useForm";
import { useRoomForms } from "../../hooks/useRoomForms";
import { useCities } from "../../hooks/useCities";
import { useComments } from "../../hooks/useComments";

import { getHotel, updateHotel } from "../../services/hotelsService";
import { getHotelRooms, createRoom, updateRoom, removeRoom } from "../../services/roomsService";

import { AuthContext } from "../../contexts/AuthContext";
import styles from "./HotelDetailsPage.module.css";

export function HotelDetailsPage() {
    const [hotel, setHotel] = useState({});
    const [hideEditHotelForm, setHideEditHotelForm] = useState(true);
    const [showEditHotelBtn, setShowEditHotelBtn] = useState(true);
    const [showEditRoomsBtn, setShowEditRoomsBtn] = useState(false);
    const [showCommentsBtn, setShowCommentsBtn] = useState(false);
    const [showAddCommentBtn, setShowAddCommentBtn] = useState(true);

    const { user } = useContext(AuthContext);
    const { hotelId } = useParams();
    
    const hooks = {
        cities: useCities(),
        mainImage: useImage(hotel.mainImageId),
        hotelForm: useForm({}),
        roomForms: useRoomForms([]),
        commentsActions: useComments(hotelId),
        commentForm: useForm({ content: '' }),
    };

    const isOwner = hotel.owner?.id === user?.id;

    useEffect(() => {
        hotelId && getHotel(hotelId)
            .then(hotelData => {
                setHotel(state => ({ ...state, ...hotelData }));
                hotelData.roomsCount > 0 && setShowEditRoomsBtn(true);
                hotelData.commentsCount > 0 && setShowCommentsBtn(true);
            })
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [hotelId, setHotel]);

    const editHotelClickHandler = () => {
        hooks.hotelForm.setForm({
            name: hotel.name,
            address: hotel.address,
            cityId: hotel.city.id,
            description: hotel.description,
        });
        setHideEditHotelForm(false);
        setShowEditHotelBtn(false);
    };

    const cancelClickHandler = () => {
        setHideEditHotelForm(true);
        setShowEditHotelBtn(true);
    };

    const updateHotelSubmitHandler = async (e) => {
        e.preventDefault();

        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to update the hotel?')) {
            try {
                const data = await updateHotel(hotelId, hooks.hotelForm.form, user.token);
                setHotel(state => ({ ...state, ...data }));
                setHideEditHotelForm(true);
                setShowEditHotelBtn(true);
            } catch (error) {
                alert(`${error.status} ${error.title}!`);
            }
        }
    };

    const addRoomClickHandler = () => hooks.roomForms.addRoomToForm();

    const editRoomsClickHandler = async () => {
        try {
            hooks.roomForms.setForms(await getHotelRooms(hotelId, user.token));
            setShowEditRoomsBtn(false);
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const createUpdateRoomSubmitHandler = async (e, roomIdx) => {
        e.preventDefault();
        const room = hooks.roomForms.forms[roomIdx];

        try {
            let roomData;

            if (room.id) {
                roomData = await updateRoom(room.id, room, user.token)
            } else {
                roomData = await createRoom(hotel.id, room, user.token);
                setHotel(state => ({ ...state, roomsCount: state.roomsCount + 1 }));
            }

            hooks.roomForms.setForms(state => {
                const newState = [...state];
                newState[roomIdx] = roomData;
                return newState;
            });

            alert('The room was successfully updated!');
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const deleteRoomClickHandler = async (roomId) => {
        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this room?')) {
            try {
                await removeRoom(roomId, user.token);
                hooks.roomForms.setForms(
                    hooks.roomForms.forms.filter(room => room.id !== roomId)
                );
                setHotel({ ...hotel, roomsCount: hotel.roomsCount - 1 });
            } catch (error) {
                alert(`${error.status} ${error.title}!`);
            }            
        }
    };

    const commentsClickHandler = () => {
        hooks.commentsActions.loadComments(hotelId);
        setShowCommentsBtn(false);
    };

    const addCommentClickHandler = () => setShowAddCommentBtn(false);

    const sendCommentSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            await hooks.commentsActions.sendComment(hotelId, hooks.commentForm.form, user.token);
            hooks.commentForm.setForm({ content: '' });
            setHotel({ ...hotel, commentsCount: hotel.commentsCount + 1 });
            setShowAddCommentBtn(true);
        } catch (error) {
            // TODO: Render validation errors.
            alert(`${error.status} ${error.title}`);
        }
    };

    const deleteCommentClickHandler = async (commentId) => {
        await hooks.commentsActions.deleteComment(commentId, user.token);
        setHotel({ ...hotel, commentsCount: hotel.commentsCount - 1 });
    };

    const sendReplySubmitHandler = async (commentId, reply) => {
        await hooks.commentsActions.sendReply(commentId, reply, user.token);
    };

    const repliesClickHandler = async (commendId) => {
        await hooks.commentsActions.loadReplies(commendId);
    };

    const deleteReplyClickHandler = async (replyId, commentId) => {
        await hooks.commentsActions.deleteReply(replyId, commentId, user.token);
    };

    return (
        <main>
            <section>
                <h1>Hotel Details</h1>

                {hotel && (
                    <div className={styles.mainDiv}>
                        <div className={styles.hotelDiv}>
                            {hooks.mainImage && <div><Image src={hooks.mainImage} alt={hotel.name} /></div>}

                            <div>
                                {hideEditHotelForm
                                    ? <div>
                                        <h2>{hotel.name}</h2>

                                        <div>
                                            <p>{hotel.description}</p>
                                            <span>Rating: {hotel.ratings?.rating} from {hotel.ratings?.ratingsCount} votes</span>
                                            <span> | Favorited from {hotel.usersWhoFavoritedCount} people</span>
                                            {hotel.isUserFavoriteHotel && <p>You mark this hotel as favorite.</p>}
                                        </div>

                                        <div>
                                            <span>{hotel.city?.name}, {hotel.address}</span>
                                            <span> | Owner: {hotel.owner?.firstName} {hotel.owner?.lastName}</span>
                                            <span> | Rooms: {hotel.roomsCount}</span>
                                        </div>
                                    </div>
                                    : <AddEditHotelForm
                                        hotel={hooks.hotelForm.form}
                                        onChange={hooks.hotelForm.formChangeHandler}
                                        onSubmit={updateHotelSubmitHandler}
                                        cities={hooks.cities}
                                    >
                                        <div>
                                            <PrimaryButton onClick={cancelClickHandler} name="Cancel" />
                                            <PrimaryButton type="submit" name="Update Hotel" />
                                        </div>
                                    </AddEditHotelForm>
                                }

                                {hooks.commentsActions.comments && <div>
                                    <h3>Comments:</h3>

                                    {hooks.commentsActions.comments.map(comment =>
                                        <CommentInfoDiv
                                            key={comment.id}
                                            comment={comment}
                                            onSendReplySubmitHandler={sendReplySubmitHandler}
                                            onRepliesClickHandler={repliesClickHandler}
                                            onDeleteCommentClickHandler={deleteCommentClickHandler}
                                            onDeleteReplyClickHandler={deleteReplyClickHandler}
                                            userId={user.id}
                                        />
                                    )}
                                </div>}

                                <div>
                                    {showAddCommentBtn && <PrimaryButton
                                        onClick={addCommentClickHandler}
                                        name="Add Comment"
                                    />}
                                    {showCommentsBtn && <PrimaryButton
                                        onClick={commentsClickHandler}
                                        name="Comments"
                                    />}
                                    <span>{hotel.commentsCount} comments</span>
                                </div>

                                {!showAddCommentBtn && <form onSubmit={sendCommentSubmitHandler}>
                                    <div>
                                        <TextArea
                                            placeHolder="Write your comment here..."
                                            paramName="content"
                                            value={hooks.commentForm.form.content}
                                            onChange={hooks.commentForm.formChangeHandler}
                                            rows="5"
                                            cols="50"
                                            required={true}
                                        />
                                    </div>
                                    <PrimaryButton type="submit" name="Send Comment" />
                                </form>}
                            </div>
                        </div>

                        <div className={styles.roomsDiv}>
                            {hooks.roomForms.forms.map((room, roomIdx) =>
                                <form
                                    key={roomIdx}
                                    onSubmit={(e) => createUpdateRoomSubmitHandler(e, roomIdx)}
                                >
                                    <AddEditRoomDiv
                                        key={roomIdx}
                                        roomIdx={roomIdx}
                                        room={room}
                                        onChange={(e) => hooks.roomForms.formsChangeHandler(e, roomIdx)}
                                    >
                                        <PrimaryButton
                                            type="submit"
                                            name={room.id ? "Update Room" : "Create Room"}
                                        />

                                        {room.id && <DangerButton
                                            onClick={() => deleteRoomClickHandler(room.id)}
                                            name="Delete Room"
                                        />}
                                    </AddEditRoomDiv>
                                </form>
                            )}
                        </div>

                        {isOwner && <div>
                            {showEditHotelBtn && <PrimaryButton
                                onClick={editHotelClickHandler}
                                name="Edit Hotel"
                            />}
                            {hotel.roomsCount > 0 && showEditRoomsBtn && <PrimaryButton
                                onClick={editRoomsClickHandler}
                                name="Edit Rooms"
                            />}
                            <PrimaryButton onClick={addRoomClickHandler} name="Add Room" />
                        </div>}
                    </div>
                )}
            </section>
        </main>
    );
};
