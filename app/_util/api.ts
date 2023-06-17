export const get = (url: string, headers?: Record<string, string>) =>
    fetch(url, { method: 'GET', headers }).then((res) => res.json());

export const post = (
    url: string,
    body?: object,
    headers?: Record<string, string>
) =>
    fetch(url, {
        method: 'POST',
        body: body ? JSON.stringify(body) : undefined,
        headers,
    });
