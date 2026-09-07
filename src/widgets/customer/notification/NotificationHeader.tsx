import { useNotification } from "@/entities/notification/hooks/useNotification";

const NotificationHeader = () => {

  const {unreadCount,markAllAsRead} = useNotification();

  return (
    
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-[#221C5E]">
          Notifications
        </h1>

        {unreadCount > 0 && (
          <p className="mt-1 text-xs text-[#4A4A52]">
            {unreadCount} unread
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={unreadCount === 0}
        className="
          text-xs
          text-[#6A689A]
          transition-opacity
          disabled:cursor-not-allowed
          disabled:opacity-30
        "
        onClick={markAllAsRead}
      >
        Mark all as read
      </button>
    </div>
  );
};

export default NotificationHeader;