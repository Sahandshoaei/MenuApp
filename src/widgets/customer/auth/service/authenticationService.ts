import type { AuthenticationResult } from "../types/authentication";
import type { Customer } from "../../../../entities/customer/types/customer";

const OTP_LENGTH = 6;
const MOCK_OTP = "123456";
const CUSTOMERS_STORAGE_KEY = "customers";

const normalizePhone = (phone: string) => {
  return phone.replace(/\D/g, "");
};

const loadCustomers = (): Record<string, Customer> => {
  try {
    const data = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

const saveCustomers = (customers: Record<string, Customer>) => {
  localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers));
};

export const authenticationService = {
  sendOtp(phone: string): Promise<AuthenticationResult> {
    const normalizedPhone = normalizePhone(phone);

    if (normalizedPhone.length < 10) {
      return Promise.resolve({
        success: false,
        message: "شماره موبایل نامعتبر است",
      });
    }

    console.log(`[MOCK OTP] ${normalizedPhone} -> ${MOCK_OTP}`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "کد تأیید ارسال شد",
        });
      }, 500);
    });
  },

  verifyOtp(phone: string, otp: string): Promise<AuthenticationResult> {
    const normalizedPhone = normalizePhone(phone);

    if (otp.length !== OTP_LENGTH) {
      return Promise.resolve({
        success: false,
        message: "کد تأیید نامعتبر است",
      });
    }

    if (otp !== MOCK_OTP) {
      return Promise.resolve({
        success: false,
        message: "کد تأیید اشتباه است",
      });
    }

    const customers = loadCustomers();
    const existingCustomer = customers[normalizedPhone];

    if (existingCustomer) {
      return Promise.resolve({
        success: true,
        customer: existingCustomer,
        message: "خوش آمدید",
      });
    }

    return Promise.resolve({
      success: true,
      customer: {
        id: normalizedPhone,
        name: "",
        phone: normalizedPhone,
      },
      message: "شماره موبایل تأیید شد",
    });
  },

  createCustomer(customer: Customer): Customer {
    const customers = loadCustomers();
    customers[customer.id] = customer;
    saveCustomers(customers);
    return customer;
  },
};
