import { List, Icon } from "@raycast/api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import type { User } from "../api/user";
import { useCurrentTime } from "../hooks/useCurrentTime";
import { categoryColors } from "../helpers";

dayjs.extend(duration);

interface RunningTimeEntryProps {
  timeEntry: User["time_entry"];
}

export const RunningTimeEntry = ({ timeEntry }: RunningTimeEntryProps) => {
  const { task, category } = timeEntry;
  const currentTime = useCurrentTime();

  return (
    <List.Item
      key={task.id}
      icon={{
        source: Icon.Circle,
        tintColor: categoryColors[category.color - 1],
      }}
      title={task.title}
      subtitle={category.title}
      accessories={[{ text: dayjs.duration(currentTime.diff(dayjs(timeEntry.started_at))).format("HH:mm:ss") }]}
    />
  );
};
