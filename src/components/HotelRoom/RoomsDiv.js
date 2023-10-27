import { useEffect, useState } from "react";

import { useRoomForms } from "../../hooks/useRoomForms";
import { createRoom, updateRoom, removeRoom, getHotelRooms } from "../../services/roomsService";

import { DangerButton } from "../Buttons/DangerButton";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import { AddEditRoomDiv } from "./AddEditRoomDiv";

import styles from "./RoomsDiv.module.css";

export function RoomsDiv({
    hotelId,
    roomsCount,
    increaseRoomsCountHandler,
    decreaseRoomsCountHandler,
    token,
}) {
    const [showEditRoomsBtn, setShowEditRoomsBtn] = useState(false);
    const {
        forms,
        setForms,
        addRoomToForm,
        formsChangeHandler,
    } = useRoomForms([]);

    useEffect(() => {
        roomsCount > 0 && roomsCount > forms.length && setShowEditRoomsBtn(true);
    }, [roomsCount, forms.length]);

    const addRoomClickHandler = () => addRoomToForm();

    const createUpdateRoomSubmitHandler = async (e, roomIdx) => {
        e.preventDefault();
        const room = forms[roomIdx];

        try {
            let roomData;

            if (room.id) {
                roomData = await updateRoom(room.id, room, token)
            } else {
                roomData = await createRoom(hotelId, room, token);
                increaseRoomsCountHandler();
            }

            setForms(state => {
                const newState = [...state];
                newState[roomIdx] = roomData;
                return newState;
            });

            alert('The room was successfully updated!');
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const editRoomsClickHandler = async () => {
        try {
            setForms(await getHotelRooms(hotelId, token));
            setShowEditRoomsBtn(false);
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const deleteRoomClickHandler = async (roomId) => {
        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this room?')) {
            try {
                await removeRoom(roomId, token);
                setForms(forms.filter(room => room.id !== roomId));
                decreaseRoomsCountHandler();
            } catch (error) {
                alert(`${error.status} ${error.title}!`);
            }
        }
    };

    return (
        <div>
            <div className={styles.flexWrap}>
                {forms.map((room, roomIdx) =>
                    <form
                        key={roomIdx}
                        onSubmit={(e) => createUpdateRoomSubmitHandler(e, roomIdx)}
                    >
                        <AddEditRoomDiv
                            key={roomIdx}
                            roomIdx={roomIdx}
                            room={room}
                            onChange={(e) => formsChangeHandler(e, roomIdx)}
                        >
                            <PrimaryButton
                                type="submit"
                                name={room.id ? "Update Room" : "Create Room"}
                            />

                            {room.id &&
                                <DangerButton
                                    onClick={() => deleteRoomClickHandler(room.id)}
                                    name="Delete Room"
                                />
                            }
                        </AddEditRoomDiv>
                    </form>
                )}
            </div>

            <div>
                {showEditRoomsBtn &&
                    <PrimaryButton
                        onClick={editRoomsClickHandler}
                        name="Edit Rooms"
                    />
                }

                <PrimaryButton onClick={addRoomClickHandler} name="Add Room" />
            </div>
        </div>
    );
};