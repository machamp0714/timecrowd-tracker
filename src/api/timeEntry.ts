import { patch } from "./timecrowdClient";

export const stopTimeEntry = (timeEntryId: number) => {
  return patch(`/api/v1/time_entries/${timeEntryId}`);
};
