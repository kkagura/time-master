import { getNearestHoliday } from "./holiday";
import dayjs from "dayjs";
import { getNearestWeekend } from "./week";
import config from "./config";
import { secondToString } from "./utils";

export async function holiday() {
  const h = await getNearestHoliday();
  const d = dayjs(h.date).diff(dayjs(), "day");
  return {
    name: h.name,
    value: d,
  };
}

export function weekend() {
  const day = getNearestWeekend();
  if ([0, 6].includes(day)) {
    return 0;
  }
  return 5 - day;
}

export function noWorkTime() {
  const time = dayjs();
  const noWorkTime = dayjs(`${time.format("YYYY-MM-DD")} ${config.noWorkTime}`);
  const diffTime = noWorkTime.diff(time, "second");
  return diffTime;
}

export function salaryDay() {
  const time = dayjs();
  let y = time.get("year");
  let m = time.get("month") + 1;
  let d = time.get("date");
  if (d > 15) {
    if (m === 12) {
      y++;
      m = 1;
    } else {
      m++;
    }
  }
  const salaryDate = dayjs(`${y}-${m}-${config.salaryDay}`);
  const days = salaryDate.diff(time, "day");
  return days;
}
