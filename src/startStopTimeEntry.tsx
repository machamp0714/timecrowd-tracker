import { List } from "@raycast/api";
import dayjs from "dayjs";

import { useDailyActivities } from "./hooks/useDailyActivities";
import { useUser } from "./hooks/useUser";
import { DailySection } from "./components/DailySection";
import { RunningTimeEntry } from "./components/RunningTimeEntry";

export default function StartStopTimeEntry() {
  const today = dayjs();
  const weeklyDates = Array.from({ length: 7 }, (_, i) => today.subtract(i, "day"));

  const { isLoading: isUserLoading, data: user, revalidate: revalidateUser } = useUser();
  const { isLoading: isDailyActivitiesLoading, data: dailyActivities } = useDailyActivities(weeklyDates);

  return (
    <List isLoading={isUserLoading && isDailyActivitiesLoading}>
      {user?.time_entry && <RunningTimeEntry timeEntry={user.time_entry} />}
      {dailyActivities?.map((dailyActivity) => (
        <DailySection key={dailyActivity.date} dailyActivity={dailyActivity} revalidateUser={revalidateUser} />
      ))}
    </List>
  );
}
