import { useEffect, useState } from "react";

import { useRoomForms } from "../../../../../hooks/useRoomForms";
import { createRoom, updateRoom, removeRoom, getHotelRooms } from "./roomsService";

import { PrimaryButton } from "../../../../../components/Buttons/PrimaryButton";
import { WarningButton } from "../../../../../components/Buttons/WarningButton";
import { AddEditRoomDiv } from "./AddEditRoomDiv";

import styles from "./RoomsSection.module.css";

export function RoomsSection({
    hotelId,
    roomsCount,
    onDoneClickHandler,
    increaseRoomsCountHandler,
    decreaseRoomsCountHandler,
    token
}) {
    const [showEditRoomsBtn, setShowEditRoomsBtn] = useState(false);
    const { forms, setForms, addRoomToForm, formsChangeHandler } = useRoomForms([]);

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
        <section>
            <div className={styles.forms}>
                {forms.map((room, roomIdx) =>
                    <form
                        key={roomIdx}
                        onSubmit={(e) => createUpdateRoomSubmitHandler(e, roomIdx)}
                        className={styles.form}
                    >
                        <AddEditRoomDiv
                            key={roomIdx}
                            roomIdx={roomIdx}
                            room={room}
                            onChangeHandler={formsChangeHandler}
                            onDeleteRoomClickHandler={() => deleteRoomClickHandler(room.id)}
                        />
                    </form>
                )}
            </div>

            <div className={styles.buttons}>
                {showEditRoomsBtn && <WarningButton onClick={editRoomsClickHandler} name="Edit Rooms" />}
                <PrimaryButton onClick={addRoomClickHandler} name="Add Room" />
                <PrimaryButton onClick={onDoneClickHandler} name="Done" />
            </div>
        </section>
    );
};