import { useContext, useState } from "react";

import { ManageRoomsSection } from "../components/ManageRoomsSection";
import { AuthContext } from "../../../../contexts/AuthContext";

export function useHotelRooms(hotel, setHotel) {
    const { user } = useContext(AuthContext);
    const [showRoomsSection, setShowRoomsSection] = useState(false);

    const roomsSection = <ManageRoomsSection
        hotelId={hotel.id}
        roomsCount={hotel.roomsCount}
        onDoneClickHandler={() => setShowRoomsSection(false)}
        increaseRoomsCountHandler={() => setHotel({ ...hotel, roomsCount: hotel.roomsCount + 1 })}
        decreaseRoomsCountHandler={() => setHotel({ ...hotel, roomsCount: hotel.roomsCount - 1 })}
        token={user?.token}
    />;

    return { roomsSection, showRoomsSection, setShowRoomsSection };
};