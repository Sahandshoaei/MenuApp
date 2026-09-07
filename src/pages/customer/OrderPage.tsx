
import Container from "@/shared/Container";
import OrdersHeader from "@/widgets/customer/orders/OrderHeader";
import { OrderTabsContent } from "@/widgets/customer/orders/OrderTabsContent";

const OrderPage = () => {
  return (
    <Container className="space-y-6 pt-6">
      <OrdersHeader />
      <OrderTabsContent />
    </Container>
  );
};

export default OrderPage;