const host = 'https://localhost:7247';

async function request(method, path, { token, body }) {
    const options = { method, headers: {} };

    if (token) {
        options.headers.Authorization = `Bearer ` + token;
    }

    if (method !== 'GET') {
        options.headers['Content-Type'] = 'application/json';
        options.body = body;
    }

    const response = await fetch(host + path, options);
    return await responseHandler(response);
}

async function responseHandler(response) {
    const responsesWithoutBody = [
        { status: 204, title: 'No Content.' },
        { status: 401, title: 'Unauthorized!' },
        { status: 403, title: 'Forbidden!' },
    ];

    const responseWithoutBody = responsesWithoutBody.find(x => x.status === response.status);

    if (responseWithoutBody) {
        if (response.ok) {
            return responseWithoutBody;
        }

        throw responseWithoutBody;
    } else {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.startsWith('image/')) {
            return await response.blob();
        }

        const responseBody = await response.json();

        if (response.ok) {
            return responseBody;
        }

        throw responseBody;
    }

}

async function get(path, { token }) {
    return await request('GET', path, { token });
}

async function post(path, { body, token }) {
    return await request('POST', path, { body, token });
}

async function put(path, { body, token }) {
    return await request('PUT', path, { body, token })
}

export { get, post, put };