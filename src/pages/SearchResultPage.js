import { useSearchParams } from "react-router-dom";

const baseUrl = 'https://localhost:7247/api/rooms';

export function SearchResultPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    fetch(`${baseUrl}?${searchParams.toString()}`)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                return 'You are not authorized!';
            }
        })
        .then(data => console.log(data))

    return (
        <>
            <h1>Search Page</h1>
        </>
    );
}