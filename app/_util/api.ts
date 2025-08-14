export const get = (url: string, headers?: Record<string, string>) =>
  fetch(url, { method: "GET", headers })
    .then((res) => res.json())
    .catch((e) => {
      if (e.status === 401) {
        window.location.href = "/login";
      } else {
        throw e;
      }
    });

export const post = (
  url: string,
  body?: object | string,
  headers?: Record<string, string>,
) =>
  fetch(url, {
    method: "POST",
    body:
      typeof body === "string" ? body : body ? JSON.stringify(body) : undefined,
    headers,
  }).catch((err) => {
    if (err.statusCode === 401) {
      window.location.href = "/login";
      return null;
    } else {
      throw err;
    }
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
  }).catch((err) => {
    if (err.statusCode === 401) {
      window.location.href = "/login";
    } else {
      throw err;
    }
  });

export const del = async (url: string, headers?: Record<string, string>) => {
  const res = await fetch(url, { method: "DELETE", headers });

  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = "/login";
      return;
    }
    throw new Error(`Request failed with status ${res.status}: ${res.body}`);
  }

  return res;
};
