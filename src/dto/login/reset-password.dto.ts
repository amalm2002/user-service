
export interface ResetPasswordDto {
  email: string;
  password: string;
  token: string;
}

export interface ResetPasswordResponseDTO {
  message: string;
}