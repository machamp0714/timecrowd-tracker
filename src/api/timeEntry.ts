import { patch } from "@/api/timecrowdClient";

export const stopTimeEntry = (timeEntryId: number) => {
  return patch(`/api/v1/time_entries/${timeEntryId}`);
};
