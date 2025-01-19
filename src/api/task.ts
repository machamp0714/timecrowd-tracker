import { get, post } from "@/api/timecrowdClient";

export interface Task {
  id: number;
  title: string;
  url: string;
  safe_url: string;
  parent_id: number;
  team_id: number;
  root_id: number;
  category: boolean;
  html_url: string;
  total_time: string;
  amount: number;
  formatted_amount: string;
}

export const startTask = async (teamId: number, taskId: number) => {
  return await post(`/api/v1/teams/${teamId}/tasks/${taskId}/start`);
};

export const getRecentTasks = async (): Promise<{ tasks: Task[] }> => {
  return await get("/api/v2/recent_tasks");
};
