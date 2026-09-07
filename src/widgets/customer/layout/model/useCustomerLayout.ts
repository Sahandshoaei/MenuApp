import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useCustomerLayout() {

  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return {
    cartOpen,

    registerOpen,

    openCart: () => setCartOpen(true),

    closeCart: () => setCartOpen(false),

    openRegister: () => setRegisterOpen(true),

    closeRegister: () => setRegisterOpen(false),

    handleRegisterSuccess() {
      setRegisterOpen(false);

      navigate("/profile");
    },
  };
}