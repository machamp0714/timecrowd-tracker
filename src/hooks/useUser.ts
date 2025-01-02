import { getUser } from "../api";
import { useCachedPromise } from "@raycast/utils";

export const useUser = () => {
  return useCachedPromise(getUser);
};
