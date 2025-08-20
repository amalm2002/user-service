
export interface ForgotPasswordDto {
  email: string;
}

export interface ForgotPasswordResponseDTO {
  message: string;
  token?: string;
}