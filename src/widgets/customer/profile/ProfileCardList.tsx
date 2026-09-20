import ProfileCard from "@/features/customer/profile/ProfileCard";
import { Bell, Gift, Heart, Package } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoyaltyModal from "../loyalty/LoyaltyModal";

export default function ProfileCardList() {
  const [loyaltyOpen, setLoyaltyOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="space-y-3">
      <ProfileCard
        icon={<Package size={18} />}
        title="تاریخچه سفارش"
        subtitle="سفارش‌های قبلی خود را ببینید"
        onClick={() => navigate("/orders")}
      />

      <ProfileCard
        icon={<Heart size={18} />}
        title="موارد ذخیره‌شده"
        subtitle="غذاهای مورد علاقه‌تان"
        onClick={() => navigate("/favorites")}
      />

      <ProfileCard
        icon={<Gift size={18} />}
        title="جوایز وفاداری"
        subtitle="جوایز خود را ببینید"
        badge="ویژه"
        onClick={() => setLoyaltyOpen(true)}
      />

      <ProfileCard
        icon={<Bell size={18} />}
        title="اعلان‌ها"
        subtitle="به‌روزرسانی سفارش و جوایز"
        onClick={() => navigate("/notifications")}
      />

      <LoyaltyModal open={loyaltyOpen} onClose={() => setLoyaltyOpen(false)} />
    </section>
  );
}
