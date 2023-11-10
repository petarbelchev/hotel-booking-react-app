import { SearchRoomsForm } from "../components/HotelRoom/SearchRoomsForm";

export function HomePage() {
    return (
        <main>
            <section style={{ textAlign: "center" }}>
                <h1>Find your next vacation</h1>
                <SearchRoomsForm />
            </section>
        </main>
    );
};