const fetchJSON = async <T = unknown>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  // const session = await getSessionCookie();

  const { headers = {} } = options;
  const { body } = options;
  delete options.headers;
  delete options.body;

  const res = await fetch(url, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      // ...(session.jwt && {
      //   Authorization: `Bearer ${session.jwt}`,
      // }),
      ...headers,
    },
    body: JSON.stringify(body),
    ...options,
  });

  if (!res.ok) {
    console.log(`Error occured on route: ${url}`);
    throw new Error(`${res.status} ${res.statusText} ${await res.text()}`);
  }

  return (await res.json()) as T;
};

export const post = async <T = unknown>(
  url: string,
  body: RequestInit["body"],
  options?: RequestInit,
): Promise<T> => {
  return await fetchJSON<T>(url, { method: "POST", body, ...options });
};

export const put = async <T = unknown>(
  url: string,
  body: RequestInit["body"],
  options?: RequestInit,
): Promise<T> => {
  return await fetchJSON(url, { method: "PUT", body, ...options });
};

export const get = async <T = unknown>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  return await fetchJSON(url, { method: "GET", ...options });
};

export const _delete = async <T = unknown>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  return await fetchJSON(url, { method: "DELETE", ...options });
};
