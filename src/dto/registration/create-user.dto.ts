
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  otp: string;
  token: string;
  googleId?: string;
}

export interface CreateUserResponseDTO {
  message: string;
  isAdmin?: boolean;
  isActive?: boolean
}