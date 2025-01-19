import { MenuBarExtra } from "@raycast/api";
import { useUser } from "@/hooks";
import { useCurrentTime } from "@/hooks";
import { stopTimeEntry } from "@/api/timeEntry";
import { formatElapsedTime } from "@/helpers";

export default function Command() {
  const currentTime = useCurrentTime();
  const { isLoadingUser, user } = useUser();

  return (
    <MenuBarExtra
      icon="command-icon.png"
      title={user?.time_entry?.task.title}
      tooltip="Current Time Entry"
      isLoading={isLoadingUser}
    >
      {user?.time_entry && (
        <MenuBarExtra.Section title="Running Time Entry">
          <MenuBarExtra.Item
            title={user.time_entry.task.title}
            subtitle={formatElapsedTime(user.time_entry.started_at, currentTime)}
            onAction={() => stopTimeEntry(user.time_entry.id)}
          />
        </MenuBarExtra.Section>
      )}
    </MenuBarExtra>
  );
}
