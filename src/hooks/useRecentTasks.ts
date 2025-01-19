import { useCachedPromise } from "@raycast/utils";
import { getRecentTasks } from "@/api/task";

export const useRecentTasks = () => {
  const { data, isLoading } = useCachedPromise(getRecentTasks);

  return { recentTasks: data, isLoadingRecentTasks: isLoading };
};
