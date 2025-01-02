import { List, Icon, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { startTask, type Task } from "@/api";
import { categoryColors } from "@/helpers";

interface TaskDetailProps {
  task: Task;
  revalidateUser: () => void;
}

export const TaskDetail = ({ task, revalidateUser }: TaskDetailProps) => {
  const handleStartTask = async () => {
    try {
      await startTask(task.team.id, task.id);
      revalidateUser();
      showToast(Toast.Style.Success, "Started task");
    } catch {
      showToast(Toast.Style.Failure, "Failed to start task");
    }
  };

  return (
    <List.Item
      key={task.id}
      icon={{
        source: Icon.Circle,
        tintColor: categoryColors[task.category.color - 1],
      }}
      title={task.title}
      subtitle={task.category.title}
      accessories={[{ text: task.total_time }]}
      actions={
        <ActionPanel>
          <Action title="Start Task" onAction={handleStartTask} />
        </ActionPanel>
      }
    />
  );
};
