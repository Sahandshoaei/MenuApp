import SettingsHeader from "@/widgets/admin/setting/SettingsHeader";
import OrderingSettings from "@/widgets/admin/setting/OrderingSettings";
import LoyaltySettings from "@/widgets/admin/setting/LoyaltySettings";
import AdminAccountSettings from "@/widgets/admin/setting/AdminAccountSettings";

// LanguageSettings فعلاً کنار گذاشته شده (طبق تصمیم قبلی: زبان/Theme برای بعد)
// import LanguageSettings from "@/widgets/admin/setting/LanguageSettings";

const AdminSettingsPage = () => {
  return (
    <div>
      <SettingsHeader />

      <div className="mt-6 flex flex-col gap-4">
        <OrderingSettings />
        <LoyaltySettings />
        <AdminAccountSettings />
      </div>
    </div>
  );
};

export default AdminSettingsPage;
