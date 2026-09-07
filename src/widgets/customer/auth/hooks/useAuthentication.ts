import { useState } from "react";
import { useAppDispatch } from "../../../../app/store/hooks";
import { setActiveCustomer } from "../../../../entities/customer/state/customerSlice";
import { authenticationService } from "../service/authenticationService";
import type { AuthStep } from "../types/authentication";
import type { Customer } from "../../../../entities/customer/types/customer";

export const useAuthentication = () => {

  const dispatch = useAppDispatch();
  const [step, setStep] =
    useState<AuthStep>("phone");

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] =
    useState<string | null>(null);

  const [isNewCustomer, setIsNewCustomer] =
    useState(false);

  const [verifiedCustomer, setVerifiedCustomer] =
    useState<Customer | null>(null);

  // -------------------------
  // Send OTP
  // -------------------------

  const sendOtp = async (
    phoneNumber: string,
  ) => {
    const normalizedPhone =
      phoneNumber.replace(/\D/g, "");

    if (normalizedPhone.length < 10) {
      setError("Invalid phone number");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const result =
        await authenticationService.sendOtp(
          normalizedPhone,
        );

      if (!result.success) {
        setError(
          result.message ??
            "Failed to send OTP",
        );

        return false;
      }

      setPhone(normalizedPhone);
      setStep("otp");

      return true;
    } catch {
      setError(
        "Something went wrong",
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Verify OTP
  // -------------------------

  const verifyOtp = async (
    otp: string,
  ) => {
    if (!phone) {
      setError("Phone number is missing");
      return false;
    }

    if (otp.length !== 6) {
      setError(
        "Please enter the 6-digit OTP",
      );

      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const result =
        await authenticationService.verifyOtp(
          phone,
          otp,
        );

      if (
        !result.success ||
        !result.customer
      ) {
        setError(
          result.message ??
            "Invalid OTP",
        );

        return false;
      }

      const customer =
        result.customer;

      setVerifiedCustomer(customer);

      /*
       * Customer جدید
       */
      if (!customer.name) {
        setIsNewCustomer(true);
        setStep("name");

        return true;
      }

      /*
       * Customer موجود
       */
      setIsNewCustomer(false);

      dispatch(
        setActiveCustomer(customer),
      );

      return true;
    } catch {
      setError(
        "Something went wrong",
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Complete Registration
  // -------------------------

  const completeRegistration = (
    name: string,
  ) => {
    if (!verifiedCustomer) {
      setError(
        "Customer information is missing",
      );

      return false;
    }

    const trimmedName =
      name.trim();

    if (!trimmedName) {
      setError(
        "Please enter your name",
      );

      return false;
    }

    const customer: Customer = {
      ...verifiedCustomer,
      name: trimmedName,
    };

    const savedCustomer =
      authenticationService.createCustomer(
        customer,
      );

    dispatch(
      setActiveCustomer(
        savedCustomer,
      ),
    );

    return true;
  };

  // -------------------------
  // Back
  // -------------------------

  const backToPhone = () => {
    setStep("phone");
    setError(null);
    setIsNewCustomer(false);
    setVerifiedCustomer(null);
  };

  // -------------------------
  // Reset
  // -------------------------

  const reset = () => {
    setStep("phone");
    setPhone("");
    setLoading(false);
    setError(null);
    setIsNewCustomer(false);
    setVerifiedCustomer(null);
  };

  return {
    step,
    phone,
    loading,
    error,
    isNewCustomer,
    verifiedCustomer,

    sendOtp,
    verifyOtp,
    completeRegistration,

    backToPhone,
    reset,
  };
};

