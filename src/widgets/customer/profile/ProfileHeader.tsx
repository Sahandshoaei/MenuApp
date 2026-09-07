import { useCustomer } from "@/entities/customer/hooks/useCustomer";
import { useAppSelector } from "@/app/store/hooks";
import { selectCurrentLoyalty } from "@/entities/loyalty/state/loyaltySelector";
import { Avatar } from "../../../features/customer/profile/Avatar";
import { Info } from "../../../features/customer/profile/Info";
import { Status } from "../../../features/customer/profile/Status";
import { LoyaltyLevel } from "@/features/customer/profile/LoyaltyLevel";

export default function ProfileHeader() {

  const { customer } = useCustomer();
  const loyalty = useAppSelector(selectCurrentLoyalty);

  return (
    <div className="text-center">
      <Avatar name={customer?.name} />
      <Info name={customer?.name} phone={customer?.phone} />
      {customer && (
        <>
          <LoyaltyLevel loyalty={loyalty} />
          <Status loyalty={loyalty} />
          
        </>
      )}
    </div>
  );
}

