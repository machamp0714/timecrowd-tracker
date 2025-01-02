import { getToken } from "../oauth";
import fetch from "node-fetch";

export const get = <T>(url: string) => timecrowdFetch<T>("GET", url);
export const post = <T>(url: string, body?: unknown) => timecrowdFetch<T>("POST", url, body);
export const patch = <T>(url: string, body?: unknown) => timecrowdFetch<T>("PATCH", url, body);

const baseUrl = "https://timecrowd.net";

const timecrowdFetch = async <T>(method: string, url: string, body?: unknown) => {
  const token = await getToken();
  const response = await fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    throw new Error();
  }

  return (await response.json()) as T;
};
