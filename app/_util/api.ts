export const get = (url: string, headers?: Record<string, string>) =>
  fetch(url, { method: "GET", headers }).then((res) => res.json());

export const post = (
  url: string,
  body?: object,
  headers?: Record<string, string>,
) =>
  fetch(url, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
    headers,
  });

export const put = (
  url: string,
  body?: object,
  headers?: Record<string, string>,
) =>
  fetch(url, {
    method: "PUT",
    body: body ? JSON.stringify(body) : undefined,
    headers,
  });

export const del = (url: string, headers?: Record<string, string>) =>
  fetch(url, { method: "DELETE", headers });
