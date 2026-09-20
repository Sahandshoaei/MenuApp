import { useNotification } from "@/entities/notification/hooks/useNotification";

const NotificationHeader = () => {
  const { unreadCount, markAllAsRead } = useNotification();

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="text-right">
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
          اعلان‌ها
        </h1>

        {unreadCount > 0 && (
          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            {unreadCount} خوانده‌نشده
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={unreadCount === 0}
        className="
          text-xs text-[var(--color-accent)] transition-opacity
          disabled:cursor-not-allowed disabled:opacity-30
        "
        onClick={markAllAsRead}
      >
        همه را خوانده‌شده کن
      </button>
    </div>
  );
};

export default NotificationHeader;
