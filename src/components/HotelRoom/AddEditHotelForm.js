import styles from "./AddEditHotelForm.module.css";

export function AddEditHotelForm({ hotel, onChangeHandler, onSubmit, cities, children }) {
    return (
        <form onSubmit={onSubmit}>
            <div className={styles.hotelContent}>
                <label htmlFor="name">Hotel Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={hotel.name}
                    onChange={onChangeHandler}
                    required
                />

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={hotel.address}
                    onChange={onChangeHandler}
                    required
                />

                <label htmlFor="cityId">City:</label>
                <select id="cityId" name="cityId" value={hotel.cityId} onChange={onChangeHandler}>
                    {cities.map(city => <option key={city.id} value={city.id}> {city.name}</option>)}
                </select>

                <label htmlFor="description">Description:</label>
                <textarea
                    type="textarea"
                    id="description"
                    name="description"
                    value={hotel.description}
                    onChange={onChangeHandler}
                    rows="5"
                    required
                />
            </div>

            <div>{children}</div>
        </form>
    );
};