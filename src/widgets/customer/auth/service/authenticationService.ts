import type {AuthenticationResult} from "../types/authentication";
import type { Customer } from "../../../../entities/customer/types/customer";



const OTP_LENGTH = 6;
const MOCK_OTP = "123456";
const CUSTOMERS_STORAGE_KEY = "customers";

const normalizePhone = (phone: string) => {
  return phone.replace(/\D/g, "");
};

const loadCustomers = (): Record<string,Customer> => {

  try {
    const data = localStorage.getItem(
      CUSTOMERS_STORAGE_KEY,
    );

    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

const saveCustomers = (
  customers: Record<string, Customer>,
) => {
  localStorage.setItem(
    CUSTOMERS_STORAGE_KEY,
    JSON.stringify(customers),
  );
};

export const authenticationService = {

  sendOtp(
    phone: string,
  ): Promise<AuthenticationResult> {

    const normalizedPhone =
      normalizePhone(phone);

    if (normalizedPhone.length < 10) {
      return Promise.resolve({
        success: false,
        message:
          "Invalid phone number",
      });
    }

    console.log(
      `[MOCK OTP] ${normalizedPhone} -> ${MOCK_OTP}`,
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message:
            "OTP sent successfully",
        });
      }, 500);
    });
  },

  verifyOtp(
    phone: string,
    otp: string,
  ): Promise<AuthenticationResult> {

    const normalizedPhone =
      normalizePhone(phone);

    if (otp.length !== OTP_LENGTH) {
      return Promise.resolve({
        success: false,
        message:
          "Invalid OTP",
      });
    }

    if (otp !== MOCK_OTP) {
      return Promise.resolve({
        success: false,
        message:
          "Incorrect OTP",
      });
    }

    const customers =
      loadCustomers();

    const existingCustomer =
      customers[normalizedPhone];

    /*
     * Customer قبلاً وجود دارد
     */
    if (existingCustomer) {
      return Promise.resolve({
        success: true,
        customer: existingCustomer,
        message:
          "Welcome back",
      });
    }

    /*
     * Customer جدید است.
     *
     * هنوز ذخیره نمی‌کنیم چون
     * Name را در مرحله بعد می‌گیریم.
     */
    return Promise.resolve({
      success: true,
      customer: {
        id: normalizedPhone,
        name: "",
        phone: normalizedPhone,
      },
      message:
        "Phone verified successfully",
    });
  },

  createCustomer(
    customer: Customer,
  ): Customer {

    const customers =
      loadCustomers();

    customers[customer.id] =
      customer;

    saveCustomers(customers);

    return customer;
  },

};



// این نسخه از localStorage پروفایل‌های قبلی را بررسی می‌کند:

// sendOtp()
//    ↓
// OTP
//    ↓
// verifyOtp()
//    ↓
// ┌─────────────────────┐
// │ Customer exists?    │
// └─────────────────────┘
//        │
//    ┌───┴────┐
//    ↓        ↓
//   Yes       No
//    ↓        ↓
// Login    NameStep
//    │        ↓
//    │    createCustomer
//    │        ↓
//    └───────→ Customer
//                 ↓
//         setActiveCustomer()