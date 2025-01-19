import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const formatElapsedTime = (startedAt: string | undefined, currentTime: dayjs.Dayjs): string => {
  return dayjs.duration(currentTime.diff(dayjs(startedAt))).format("HH:mm:ss");
};
