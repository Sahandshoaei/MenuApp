import { useNotification } from "@/entities/notification/hooks/useNotification";
import NotificationCard from "@/features/customer/notification/NotificationCard";


const NotificationList = () => {

  const {
    notifications,
  } = useNotification();


  if (!notifications.length) {

    return (
      <div className="py-12 text-center text-sm text-zinc-500">
        No notifications yet.
      </div>
    );

  }


  return (

    <div className="space-y-3">

      {notifications.map(
        (notification) => (

          <NotificationCard
            key={notification.id}
            notification={notification}
          />

        )
      )}

    </div>

  );

};


export default NotificationList;