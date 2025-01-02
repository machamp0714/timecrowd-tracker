import { post } from "./timecrowdClient";

export const startTask = async (teamId: number, taskId: number) => {
  return await post(`https://timecrowd.net/api/v1/teams/${teamId}/tasks/${taskId}/start`);
};
