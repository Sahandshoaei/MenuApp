import {Bell,Check} from "lucide-react";
import type { Notification } from "@/entities/notification/types/notification";
import { useNotification } from "@/entities/notification/hooks/useNotification";

type NotificationCardProps = {
  notification: Notification;
};

const NotificationCard = ({
  notification,
}: NotificationCardProps) => {
  const { markAsRead } =
    useNotification();

  const handleClick = () => {
    if (notification.read) return;

    markAsRead(notification.id);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        w-full
        rounded-2xl
        p-4
        text-left
        transition-all
        duration-200
      "
      style={{
        background: notification.read
          ? "#FFFFFF"
          : "rgba(145,158,203,0.12)",

        border: notification.read
          ? "0.5px solid rgba(145,158,203,0.15)"
          : "0.5px solid rgba(145,158,203,0.35)",
      }}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
          "
          style={{
            background:
              "rgba(145,158,203,0.18)",
          }}
        >
          {notification.read ? (
            <Check
              size={17}
              style={{
                color: "#4A4A52",
              }}
            />
          ) : (
            <Bell
              size={17}
              style={{
                color: "#6A689A",
              }}
            />
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3
              className="text-sm font-semibold"
              style={{
                color: "#221C5E",
              }}
            >
              {notification.title}
            </h3>

            {!notification.read && (
              <span
                className="
                  mt-1
                  h-2
                  w-2
                  shrink-0
                  rounded-full
                  bg-[#6A689A]
                "
              />
            )}
          </div>

          <p
            className="mt-1 text-sm leading-5"
            style={{
              color: "#4A4A52",
            }}
          >
            {notification.message}
          </p>

          <p
            className="mt-2 text-[11px]"
            style={{
              color: "#919ECB",
            }}
          >
            {new Date(
              notification.createdAt,
            ).toLocaleString()}
          </p>
        </div>
      </div>
    </button>
  );
};

export default NotificationCard;