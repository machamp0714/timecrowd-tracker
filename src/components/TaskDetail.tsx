import { List, Icon } from "@raycast/api";
import type { Task } from "../api/dailyActivity";

interface TaskDetailProps {
  task: Task;
}

const categoryColors = [
  "#c8eca4",
  "#fcc7dc",
  "#e2cce9",
  "#bad7f5",
  "#fcf6a7",
  "#acd9c1",
  "#f9cfcc",
  "#cecef2",
  "#b0e7ea",
  "#ffd0a6",
  "#badcad",
  "#f3a9a4",
  "#94bae3",
  "#99c4d6",
  "#e2d6b7",
  "#b3c185",
  "#dd9bb3",
  "#829ece",
  "#d3d3d3",
  "#ccb38b",
] as const;

export const TaskDetail = ({ task }: TaskDetailProps) => {
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
    />
  );
};
