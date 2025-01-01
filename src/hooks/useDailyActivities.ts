import { useCachedPromise } from "@raycast/utils";
import { fetchDailyActivity } from "../api/dailyActivity";

import type { Dayjs } from "dayjs";

export const useDailyActivities = (dates: Dayjs[]) => {
  return useCachedPromise(async () => {
    const dailyActivities = await Promise.all(dates.map((date) => fetchDailyActivity(date)));

    return dailyActivities;
  });
};
