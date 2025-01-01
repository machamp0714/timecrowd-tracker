import { List } from "@raycast/api";
import dayjs from "dayjs";

import { useDailyActivities } from "./hooks/useDailyActivities";
import { DailySection } from "./components/DailySection";

export default function StartStopTimeEntry() {
  const today = dayjs();
  const weeklyDates = Array.from({ length: 7 }, (_, i) => today.subtract(i, "day"));

  const { isLoading, data } = useDailyActivities(weeklyDates);

  return (
    <List isLoading={isLoading}>
      {data?.map((dailyActivity) => <DailySection key={dailyActivity.date} dailyActivity={dailyActivity} />)}
    </List>
  );
}
