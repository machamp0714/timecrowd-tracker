import { useCachedPromise } from "@raycast/utils";
import { getDailyActivity } from "../api";

import type { Dayjs } from "dayjs";

export const useDailyActivities = (dates: Dayjs[]) => {
  return useCachedPromise(async () => {
    const dailyActivities = await Promise.all(dates.map((date) => getDailyActivity(date)));

    return dailyActivities;
  });
};
