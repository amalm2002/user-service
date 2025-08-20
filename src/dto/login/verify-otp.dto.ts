
export interface VerifyOtpDto {
  email: string;
  otp: string;
  token: string;
}

export interface VerifyOtpResponseDTO {
  message: string;
}