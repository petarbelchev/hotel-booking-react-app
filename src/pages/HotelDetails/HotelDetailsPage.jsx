import { useParams } from "react-router-dom";

import { useHotelManager } from "../../features/Hotel/Manage/useHotelManager";
import styles from "./HotelDetailsPage.module.css";

export function HotelDetailsPage() {
    const { hotelId } = useParams();
    const manager = useHotelManager(hotelId)

    return (
        <>
            {manager.images.showModal && manager.images.modal}

            <section>
                <div id={styles.hotel}>
                    {manager.images.gallery}

                    <div id={styles.hotelContent} >
                        {manager.editor.showEditHotelForm ? manager.editor.editHotelForm : manager.hotelDiv}

                        {manager.commentsDiv}
                    </div>
                </div>
            </section >

            {manager.imageUploader.showUploadImageForm &&
                <> {/* TODO: Use modal. */}
                    <hr />

                    <section>
                        {manager.imageUploader.uploadHotelImageForm}
                    </section>
                </>
            }

            {manager.rooms.showRoomsSection && <><hr />{manager.rooms.roomsSection}</>}
        </>
    );
};
