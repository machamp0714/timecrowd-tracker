import { get } from "./timecrowdClient";
import type { Category } from "./dailyActivity";

export interface User {
  id: number;
  time_entry: {
    id: number;
    started_at: string;
    duration: number;
    category: Category;
    task: {
      id: number;
      title: string;
      team_id: number;
    };
  };
}

export const getUser = async (): Promise<User> => {
  return await get<User>("/api/v2/user");
};
