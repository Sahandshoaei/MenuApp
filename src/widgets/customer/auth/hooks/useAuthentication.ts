import { useState } from "react";
import { useAppDispatch } from "../../../../app/store/hooks";
import { setActiveCustomer } from "../../../../entities/customer/state/customerSlice";
import { authenticationService } from "../service/authenticationService";
import type { AuthStep } from "../types/authentication";
import type { Customer } from "../../../../entities/customer/types/customer";

export const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<AuthStep>("phone");

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [verifiedCustomer, setVerifiedCustomer] = useState<Customer | null>(
    null
  );

  const sendOtp = async (phoneNumber: string) => {
    const normalizedPhone = phoneNumber.replace(/\D/g, "");

    if (normalizedPhone.length < 10) {
      setError("شماره موبایل نامعتبر است");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await authenticationService.sendOtp(normalizedPhone);

      if (!result.success) {
        setError(result.message ?? "ارسال کد تأیید ناموفق بود");
        return false;
      }

      setPhone(normalizedPhone);
      setStep("otp");
      return true;
    } catch {
      setError("مشکلی پیش آمد. دوباره تلاش کنید.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    if (!phone) {
      setError("شماره موبایل موجود نیست");
      return false;
    }

    if (otp.length !== 6) {
      setError("لطفاً کد ۶ رقمی را وارد کنید");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await authenticationService.verifyOtp(phone, otp);

      if (!result.success || !result.customer) {
        setError(result.message ?? "کد تأیید نامعتبر است");
        return false;
      }

      const customer = result.customer;
      setVerifiedCustomer(customer);

      if (!customer.name) {
        setIsNewCustomer(true);
        setStep("name");
        return true;
      }

      setIsNewCustomer(false);
      dispatch(setActiveCustomer(customer));
      return true;
    } catch {
      setError("مشکلی پیش آمد. دوباره تلاش کنید.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const completeRegistration = (name: string) => {
    if (!verifiedCustomer) {
      setError("اطلاعات کاربر موجود نیست");
      return false;
    }

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("لطفاً نام خود را وارد کنید");
      return false;
    }

    const customer: Customer = {
      ...verifiedCustomer,
      name: trimmedName,
    };

    const savedCustomer = authenticationService.createCustomer(customer);
    dispatch(setActiveCustomer(savedCustomer));
    return true;
  };

  const backToPhone = () => {
    setStep("phone");
    setError(null);
    setIsNewCustomer(false);
    setVerifiedCustomer(null);
  };

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
