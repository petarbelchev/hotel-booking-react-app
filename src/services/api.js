const host = 'https://localhost:7247';

async function request(method, path, { data, hasDataFiles, token }) {
    const options = { method, headers: {} };

    if (token) {
        options.headers.Authorization = `Bearer ` + token;
    }

    if (method !== 'GET') {
        if (hasDataFiles) {
            options.body = data;
        } else {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }        
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
        } else if (response.status === 401) {
            localStorage.clear();
            window.location.href = '/';
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

async function post(path, { data, hasDataFiles, token }) {
    return await request('POST', path, { data, hasDataFiles, token });
}

async function put(path, { data, token }) {
    return await request('PUT', path, { data, token })
}

async function remove(path, { token }) {
    return await request('DELETE', path, { token });
}

export { get, post, put, remove };