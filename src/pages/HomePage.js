import { useNavigate } from "react-router-dom";

export function HomePage() {
    const navigate = useNavigate();

    function onSearchSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchParams = new URLSearchParams(formData).toString();
        navigate(`/search-result?${searchParams}`);
    }

    return (
        <main>
            <section>
                <h1>Home Page</h1>

                <form onSubmit={onSearchSubmit}>
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="city" />
                    <label htmlFor="checkInUtc">From:</label>
                    <input type="datetime-local" id="checkInUtc" name="checkInUtc" />
                    <label htmlFor="checkOutUtc">To:</label>
                    <input type="datetime-local" id="checkOutUtc" name="checkOutUtc" />
                    <button type="submit">Search</button>
                </form>
            </section>
        </main>
    );
};