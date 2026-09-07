import type { Notification } from "../types/notification";

const STORAGE_KEY = "notifications";

export type NotificationStorage = Record<
  string,
  Notification[]
>;

export const loadNotifications = (): NotificationStorage => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return {};
    }

    const parsed = JSON.parse(data);

    // ساختار صحیح:
    // {
    //   customerId: Notification[]
    // }

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
      return parsed;
    }

    return {};
  } catch {
    return {};
  }
};

export const saveNotifications = (
  data: NotificationStorage
) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
};

export const clearNotificationsStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};