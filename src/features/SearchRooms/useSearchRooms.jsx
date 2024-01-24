import { SearchRoomsForm } from "./components/SearchRoomsForm";

const getSearchRoomsForm = (initCityId, initCheckInDate, initCheckOutDate) => <SearchRoomsForm
    initCityId={initCityId}
    initCheckInDate={initCheckInDate}
    initCheckOutDate={initCheckOutDate}
/>;

export function useSearchRooms() {
    return { getSearchRoomsForm };
};