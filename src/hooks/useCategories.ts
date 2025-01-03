import { useCachedPromise } from "@raycast/utils";
import { getCategories } from "@/api";

export const useCategories = () => {
  const { data, isLoading } = useCachedPromise(getCategories);

  return { categories: data, isLoadingCategories: isLoading };
};
