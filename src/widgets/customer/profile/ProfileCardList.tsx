import ProfileCard from "@/features/customer/profile/ProfileCard"
import { Bell, Gift, Heart, Package } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoyaltyModal from "../loyalty/LoyaltyModal";

export default function ProfileCardList (){

     const [loyaltyOpen, setLoyaltyOpen] = useState(false);
     const navigate = useNavigate();

    return(

        <section className="space-y-3">
         
                <ProfileCard
                    icon={<Package size={18} />}
                    title="Order History"
                    subtitle="View your previous orders"
                    onClick={() =>
                    navigate("/orders")
                    }
                />

                <ProfileCard
                    icon={<Heart size={18} />}
                    title="Saved Items"
                    subtitle="Your favorite dishes"
                    onClick={() =>
                    navigate("/favorites")
                    }
                    />

                <ProfileCard
                    icon={<Gift size={18} />}
                    title="Loyalty Rewards"
                    subtitle="View your rewards"
                    badge="VIP"
                     onClick={() =>
                    setLoyaltyOpen(true)
                    }
                />

                <ProfileCard
                    icon={<Bell size={18} />}
                    title="Notifications"
                    subtitle="Order updates & rewards"
                   onClick={() =>
                   navigate("/notifications")
            }
                />

                    <LoyaltyModal
                    open={loyaltyOpen}
                    onClose={() =>
                    setLoyaltyOpen(false)
                    }
                />
        </section>

        

    )
}