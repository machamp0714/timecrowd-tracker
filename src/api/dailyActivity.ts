import { get } from "./timecrowdClient";
import type { Dayjs } from "dayjs";

export interface Category {
  id: number;
  title: string;
  color: number;
}

interface Team {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  team_id: string;
  category: Category;
  team: Team;
  total_time: string;
  total_time_seconds: number;
}

export interface DailyActivity {
  date: string;
  total: {
    hours: number;
    minutes: number;
    duration: number;
  };
  tasks: Task[];
}

export const getDailyActivity = async (date: Dayjs): Promise<DailyActivity> => {
  return await get<DailyActivity>(`/api/v2/daily_activity?date=${date.format("YYYY-MM-DD")}`);
};
