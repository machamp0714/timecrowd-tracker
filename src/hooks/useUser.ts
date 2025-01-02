import { getUser } from "../api/user";
import { useCachedPromise } from "@raycast/utils";

export const useUser = () => {
  return useCachedPromise(getUser);
};
