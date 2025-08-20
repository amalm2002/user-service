
export interface ResendOtpDto {
  email: string;
  name: string;
}

export interface ResendOtpResponseDTO {
  token: string;
  message: string;
}