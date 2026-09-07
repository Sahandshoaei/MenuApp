
export type AuthStep =
  | "phone"
  | "otp"
  | "name";

export interface SendOtpPayload {
  phone: string;
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
}

export interface AuthenticationResult {
  success: boolean;
  customer?: {
    id: string;
    name: string;
    phone: string;
  };
  message?: string;
}

