const baseUrl = 'https://localhost:7247/api/users';

export async function register(credentials) {
    const response = await fetch(baseUrl + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });

    if (response.status !== 204) {
        throw await response.json();
    }
}

export async function login(credentials) {
    const response = await fetch(baseUrl + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (response.status === 200) {
        return data;
    } else {
        throw data;
    }
};