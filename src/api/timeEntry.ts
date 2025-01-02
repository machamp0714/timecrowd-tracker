import { patch } from "./timecrowdClient";

export const stopTimeEntry = (timeEntryId: number) => {
  return patch(`https://timecrowd.net/api/v1/time_entries/${timeEntryId}`, {});
};
