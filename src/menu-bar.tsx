import { MenuBarExtra } from "@raycast/api";
import { useUser } from "@/hooks";
import { useCurrentTime } from "@/hooks";
import { stopTimeEntry } from "@/api/timeEntry";
import { formatElapsedTime } from "@/helpers";
import { useRecentTasks } from "@/hooks";
import { startTask } from "@/api/task";

export default function Command() {
  const currentTime = useCurrentTime();
  const { isLoadingUser, user } = useUser();
  const { recentTasks, isLoadingRecentTasks } = useRecentTasks();

  return (
    <MenuBarExtra
      icon="command-icon.png"
      title={user?.time_entry?.task.title}
      tooltip="Current Time Entry"
      isLoading={isLoadingUser && isLoadingRecentTasks}
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
      {recentTasks && recentTasks.length > 0 && (
        <MenuBarExtra.Section title="Recent Tasks">
          {recentTasks.map((task) => (
            <MenuBarExtra.Item key={task.id} title={task.title} onAction={() => startTask(task.team_id, task.id)} />
          ))}
        </MenuBarExtra.Section>
      )}
    </MenuBarExtra>
  );
}
