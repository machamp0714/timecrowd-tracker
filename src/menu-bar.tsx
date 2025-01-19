import { MenuBarExtra } from "@raycast/api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useUser } from "@/hooks";
import { useCurrentTime } from "@/hooks";
import { stopTimeEntry } from "@/api/timeEntry";
dayjs.extend(duration);

export default function Command() {
  const currentTime = useCurrentTime();
  const { isLoadingUser, user } = useUser();

  const elapsedTime = dayjs.duration(currentTime.diff(dayjs(user?.time_entry.started_at))).format("HH:mm:ss");

  return (
    <MenuBarExtra
      icon="command-icon.png"
      title={user?.time_entry.task.title}
      tooltip="Current Time Entry"
      isLoading={isLoadingUser}
    >
      {user?.time_entry && (
        <MenuBarExtra.Section title="Running Time Entry">
          <MenuBarExtra.Item
            title={`${user.time_entry.task.title} ${elapsedTime}`}
            onAction={() => stopTimeEntry(user.time_entry.id)}
          />
        </MenuBarExtra.Section>
      )}
    </MenuBarExtra>
  );
}
