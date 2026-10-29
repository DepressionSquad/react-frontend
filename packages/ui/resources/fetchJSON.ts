type JsonRequestInit = Omit<RequestInit, "body"> & {
  body?: unknown;
};

const fetchJSON = async <T = unknown>(
  url: string,
  options: JsonRequestInit,
): Promise<T> => {
  // const session = await getSessionCookie();

  const { headers = {}, body, ...requestOptions } = options;

  const res = await fetch(url, {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
      // ...(session.jwt && {
      //   Authorization: `Bearer ${session.jwt}`,
      // }),
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.log(`Error occured on route: ${url}`);
    throw new Error(`${res.status} ${res.statusText} ${await res.text()}`);
  }

  return (await res.json()) as T;
};

export const post = async <T = unknown>(
  url: string,
  body: unknown,
  options?: RequestInit,
): Promise<T> => {
  return await fetchJSON<T>(url, { method: "POST", body, ...options });
};

export const put = async <T = unknown>(
  url: string,
  body: unknown,
  options?: RequestInit,
): Promise<T> => {
  return await fetchJSON<T>(url, { method: "PUT", body, ...options });
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

export const getParamsString = (params: Record<string, unknown>) => {
  const urlParams = new URLSearchParams();

  const flattenParams = (obj: object, prefix = "") => {
    for (const [key, value] of Object.entries(obj)) {
      const propName = prefix ? `${prefix}[${key}]` : key;
      if (typeof value === "object" && value !== null) {
        flattenParams(value, propName);
      } else {
        urlParams.append(propName, String(value));
      }
    }
  };

  flattenParams(params);

  return urlParams.toString();
};
