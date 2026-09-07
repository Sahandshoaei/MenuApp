import Container from "../../shared/Container";

import NotificationHeader from "@/widgets/customer/notification/NotificationHeader";
import NotificationList from "@/widgets/customer/notification/NotificationList";

const NotificationPage = () => {
  return (
    <Container className="px-4 py-6 pb-32">
      <NotificationHeader />
      <NotificationList />
    </Container>
  );
};

export default NotificationPage;


// هر Notification چیزی شبیه این است:

// {
//   id: "...",
//   title: "Order Accepted",
//   message: "The restaurant accepted your order 👍",
//   type: "info",
//   read: false,
//   createdAt: "2026-08-17T..."
// }