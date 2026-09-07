import CustomersManager from "@/widgets/admin/customers/ui/CustomersManager";

const AdminCustomersPage = () => {
  return <CustomersManager />;
};

export default AdminCustomersPage;



// Customer Management باید داده‌ها را از چند Entity جمع کند.
// انتیتی ها با کاستومر آیدی ارتباط دارن

// مثلاً:

//                 Customer
//                    │
//        ┌───────────┼───────────┐
//        ↓           ↓           ↓
//      Orders     Loyalty     Favorites
//        │           │
//        ↓           ↓
//    orderCount   rank/spent
//        │
//        └───────────┐
//                    ↓
//           useCustomersTableData
//                    ↓
//              CustomersTable



//  مدل اطلاعات جدول

// | ستون        | منبع     |
// | ----------- | -------- |
// | Customer    | Customer |
// | Phone       | Customer |
// | Orders      | Order    |
// | Total Spent | Order    |
// | Loyalty     | Loyalty  |
// | Status      | Customer |
// | Actions     | UI       |
