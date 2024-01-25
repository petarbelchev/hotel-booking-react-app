import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { updateHotel, removeHotel } from '../services/hotelEditorService';
import { EditHotelForm } from '../components/EditHotelForm';

import { AuthContext } from 'contexts/AuthContext';

export function useHotelEditor(hotel, setHotel) {
    const { user } = useContext(AuthContext);
    const [showEditHotelForm, setShowEditHotelForm] = useState(false);
    const navigate = useNavigate();

    const editHotelClickHandler = () => setShowEditHotelForm(true);

    const updateHotelSubmitHandler = async (e, hotelForm) => {
        e.preventDefault();

        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to update the hotel?')) {
            try {
                const data = await updateHotel(hotel.id, hotelForm, user.token);
                setHotel(state => ({ ...state, ...data }));
                setShowEditHotelForm(false);
            } catch (error) {
                alert(`${error.status} ${error.title}!`);
            }
        }
    };

    const deleteHotelClickHandler = async () => {
        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete your hotel?')) {
            try {
                await removeHotel(hotel.id, user.token);
                navigate('/');
            } catch (error) {
                alert(`${error.status} ${error.title}`);
            }
        }
    };

    const editHotelForm = <EditHotelForm
        hotel={hotel}
        onCancelClickHandler={() => setShowEditHotelForm(false)}
        onSubmitHandler={updateHotelSubmitHandler}
    />;

    return {
        editHotelForm,
        showEditHotelForm,
        editHotelClickHandler,
        deleteHotelClickHandler
    };
};