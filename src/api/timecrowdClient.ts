import { getToken } from "../oauth";
import fetch from "node-fetch";

export const get = <T>(url: string) => timecrowdFetch<T>("GET", url);
export const post = <T>(url: string) => timecrowdFetch<T>("POST", url);

const timecrowdFetch = async <T>(method: string, url: string) => {
  const token = await getToken();
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error();
  }

  return (await response.json()) as T;
};
