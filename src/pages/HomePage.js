import { useNavigate } from "react-router-dom";

export function HomePage() {
    const navigate = useNavigate();

    function onSearchSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchParams = encodeURIComponent(new URLSearchParams(formData).toString());
        navigate(`/search-result?${searchParams}`);
    }

    return (
        <>
            <h1>Home Page</h1>

            <form onSubmit={onSearchSubmit}>
                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" />
                <label htmlFor="checkIn">From:</label>
                <input type="datetime-local" id="checkIn" name="checkInUtc" />
                <label htmlFor="checkOut">To:</label>
                <input type="datetime-local" id="checkOut" name="checkOutUtc" />
                <button type="submit">Search</button>
            </form>
        </>
    );
};