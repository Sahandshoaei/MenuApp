import Container from "../../shared/Container";
import ProfileHeader from "../../widgets/customer/profile/ProfileHeader";
import ProfileCardList from "@/widgets/customer/profile/ProfileCardList";
import Button from "@/shared/Button";
import { LogOut } from "lucide-react";
import { logout } from "@/entities/customer/state/customerSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store/hooks";
import LoyaltyModal from "@/widgets/customer/loyalty/LoyaltyModal";






const ProfilePage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

   const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  return (
    <>
      <Container className="space-y-8 py-8 pb-28">
        
        <ProfileHeader/>
        <ProfileCardList/>

        <Button
            onClick={handleLogout}
            className="
            mt-8
            flex
            w-full
            items-center
            gap-3
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            px-5
            py-4
            text-red-400
            transition
            hover:bg-red-500/20
          "
          >
          <LogOut size={18} />
          <span>Log out</span>
        </Button>
      </Container>

    </>
  );
};

export default ProfilePage;