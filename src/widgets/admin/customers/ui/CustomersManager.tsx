import Modal from "@/entities/common/ui/Modal";
import CustomerDetails from "@/features/admin/customers/CustomerDetails";
import CustomersStats from "./CustomersStats";
import CustomersTable from "./CustomersTable";
import { useCustomersData } from "../lib/useCustomersData";

const CustomersManager = () => {
  const {
    rows,
    stats,
    selectedCustomer,
    selectedCustomerOrders,
    openCustomer,
    closeCustomer,
  } = useCustomersData();

  return (
    <div dir="rtl" className="flex flex-col gap-5">
      <CustomersStats stats={stats} />

      <CustomersTable customers={rows} onSelect={openCustomer} />

      <Modal
        open={!!selectedCustomer}
        onClose={closeCustomer}
        title="جزئیات مشتری"
      >
        {selectedCustomer && (
          <CustomerDetails
            customer={selectedCustomer}
            orders={selectedCustomerOrders}
          />
        )}
      </Modal>
    </div>
  );
};

export default CustomersManager;
