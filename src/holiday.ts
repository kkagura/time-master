import { http } from "@tauri-apps/api";
import { invoke } from "@tauri-apps/api/tauri";
import config from "./config";
import { Holiday } from "./types";
import dayjs from "dayjs";

const { url, resourceId } = config;
const fetch = () => {
  return http
    .fetch(`${url}&resource_id=${resourceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res: any) => {
      const result: Holiday[] = [];
      const { data } = res;
      if (data.status == 0) {
        const holidays = data.data[0]?.holiday;
        if (Array.isArray(holidays) && holidays.length > 0) {
          holidays.forEach((item) => {
            if (new Date().getFullYear() >= Number(item.year)) {
              item.list.forEach((holiday: any) => {
                const d1 = dayjs(holiday.date).format("YYYY-MM-DD");
                const d2 = dayjs().format("YYYY-MM-DD");
                if (new Date(d1) >= new Date(d2)) {
                  result.push(holiday);
                }
              });
            }
          });
        }
        return result;
      } else {
        return Promise.reject(new Error("请求错误"));
      }
    });
};

export const getNearestHoliday = () => {
  return fetch().then((result) => {
    return result[0];
  });
};
