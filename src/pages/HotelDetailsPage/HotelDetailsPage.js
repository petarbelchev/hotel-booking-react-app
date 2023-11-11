import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import { AddEditHotelForm } from "../../components/HotelRoom/AddEditHotelForm";
import { Hotel } from "../../components/HotelRoom/Hotel";
import { RatingDiv } from "../../components/RatingDiv";
import { ManageRoomsSection } from "../../components/HotelRoom/ManageRoomsSection";
import { CommentsDiv } from "../../components/CommentReply/CommentsDiv";
import { UploadHotelImagesForm } from "../../components/UploadHotelImagesForm";

import { useImages } from "../../hooks/useImages";
import { useForm } from "../../hooks/useForm";
import { useCities } from "../../hooks/useCities";

import { getHotel, updateHotel, removeHotel, markAsFavorite } from "../../services/hotelsService";
import { setHotelRating } from "../../services/ratingsService";

import { AuthContext } from "../../contexts/AuthContext";
import styles from "./HotelDetailsPage.module.css";

export function HotelDetailsPage() {
    const [hotel, setHotel] = useState({});
    const [showEditHotelForm, setShowEditHotelForm] = useState(false);
    const [showRoomsSection, setShowRoomsSection] = useState(false);
    const [showUploadImageForm, setShowUploadImageForm] = useState(false);

    const { user } = useContext(AuthContext);
    const { hotelId } = useParams();
    const cities = useCities();
    const { imageGallery, imagesModal, showModal } = useImages(
        hotel,
        hotel.owner?.id === user.id,
        user.token,
    );
    const hotelForm = useForm({});
    const navigate = useNavigate();

    useEffect(() => {
        hotelId && getHotel(hotelId, user?.token)
            .then(hotelData => setHotel(state => ({ ...state, ...hotelData })))
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [hotelId, user?.token, setHotel]);

    const editHotelClickHandler = () => {
        hotelForm.setForm({
            name: hotel.name,
            address: hotel.address,
            cityId: hotel.city.id,
            description: hotel.description,
        });
        setShowEditHotelForm(true);
    };

    const manageRoomsClickHandler = () => setShowRoomsSection(true);
    const cancelClickHandler = () => setShowEditHotelForm(false);
    const doneClickHandler = () => setShowRoomsSection(false);

    const updateHotelSubmitHandler = async (e) => {
        e.preventDefault();

        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to update the hotel?')) {
            try {
                const data = await updateHotel(hotelId, hotelForm.form, user.token);
                setHotel(state => ({ ...state, ...data }));
                setShowEditHotelForm(false);
            } catch (error) {
                alert(`${error.status} ${error.title}!`);
            }
        }
    };

    const increaseRoomsCountHandler = () => {
        setHotel(state => ({ ...state, roomsCount: state.roomsCount + 1 }));
    };

    const increaseCommentsCountHandler = () => {
        setHotel({ ...hotel, commentsCount: hotel.commentsCount + 1 });
    };

    const decreaseRoomsCountHandler = () => {
        setHotel({ ...hotel, roomsCount: hotel.roomsCount - 1 });
    };

    const decreaseCommentsCountHandler = () => {
        setHotel({ ...hotel, commentsCount: hotel.commentsCount - 1 });
    };

    const deleteHotelClickHandler = async () => {
        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete your hotel?')) {
            try {
                await removeHotel(hotelId, user.token);
                navigate('/');
            } catch (error) {
                alert(`${error.status} ${error.title}`);
            }
        }
    };

    const favoriteClickHandler = async () => {
        try {
            const response = await markAsFavorite(hotelId, user.token);

            setHotel({
                ...hotel,
                isUserFavoriteHotel: response.isFavorite,
                usersWhoFavoritedCount: hotel.usersWhoFavoritedCount + (response.isFavorite ? 1 : - 1),
            });
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    const hotelRatingClickHandler = async (ratingValue) => {
        try {
            const response = await setHotelRating(hotelId, ratingValue, user.token);
            setHotel({ ...hotel, ratings: response });
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    const addImageClickHandler = () => setShowUploadImageForm(true);

    const uploadHotelImagesSubmitHandler = async (newImageIds) => {
        // TODO: If the images are 7 do not change the state!
        setHotel(state => {
            const newState = { ...state };
            if (!newState.mainImageId) {
                newState.mainImageId = newImageIds.shift();
            }
            newState.imageIds = [...state.imageIds, ...newImageIds];
            return newState;
        });

        setShowUploadImageForm(false);
    };

    return (
        <>
            <section>
                {showModal && imagesModal}

                <div className={styles.hotel}>
                    {imageGallery}

                    <div className={styles.content} >
                        {showEditHotelForm
                            ? <AddEditHotelForm
                                hotel={hotelForm.form}
                                onChangeHandler={hotelForm.formChangeHandler}
                                onSubmit={updateHotelSubmitHandler}
                                cities={cities}
                            >
                                <div>
                                    <PrimaryButton onClick={cancelClickHandler} name="Cancel" />
                                    <PrimaryButton type="submit" name="Update Hotel" />
                                </div>
                            </AddEditHotelForm>
                            : <Hotel
                                hotel={hotel}
                                onFavoriteClickHandler={favoriteClickHandler}
                                onEditHotelClickHandler={editHotelClickHandler}
                                onDeleteHotelClickHandler={deleteHotelClickHandler}
                                onAddImageClickHandler={addImageClickHandler}
                                onManageRoomsClickHandler={manageRoomsClickHandler}
                                RatingDiv={user &&
                                    <RatingDiv
                                        userRating={hotel.ratings?.userRating}
                                        onRatingClickHandler={hotelRatingClickHandler}
                                    />
                                }
                                userId={user?.id}
                            />
                        }

                        <CommentsDiv
                            hotelId={hotelId}
                            commentsCount={hotel.commentsCount}
                            increaseCommentsCountHandler={increaseCommentsCountHandler}
                            decreaseCommentsCountHandler={decreaseCommentsCountHandler}
                        />
                    </div>
                </div>
            </section >

            {showUploadImageForm &&
                <> {/* TODO: Use modal. */}
                    <hr />
                    <section>
                        <UploadHotelImagesForm
                            hotelId={hotelId}
                            token={user.token}
                            onSubmitHandler={uploadHotelImagesSubmitHandler}
                        />
                    </section>
                </>
            }

            {showRoomsSection &&
                <>
                    <hr />
                    <ManageRoomsSection
                        hotelId={hotelId}
                        roomsCount={hotel.roomsCount}
                        onDoneClickHandler={doneClickHandler}
                        increaseRoomsCountHandler={increaseRoomsCountHandler}
                        decreaseRoomsCountHandler={decreaseRoomsCountHandler}
                        token={user.token}
                    />
                </>
            }
        </>
    );
};
